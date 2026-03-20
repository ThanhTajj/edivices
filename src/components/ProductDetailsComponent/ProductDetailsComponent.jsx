import { Button, Col, Image, Rate, Row } from 'antd'
import React from 'react'
import { WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { Input, Modal } from 'antd'
const { TextArea } = Input
import CardComponent from '../CardComponent/CardComponent'
import defaultAvatar from '../../assets/images/default-avatar.jfif'

const ProductDetailsComponent = ({ idProduct }) => {
    const [myComment, setMyComment] = useState("")
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const [myRating, setMyRating] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const fetchGetDetailsProduct = async ({ queryKey }) => {
        const [, id] = queryKey
        const res = await ProductService.getDetailsProduct(id)
        return res.data
    }
    const { isLoading, data: productDetails, refetch } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct })

    const onChange = (value) => {
        setNumProduct(Number(value))
    }

    useEffect(() => {
        if (productDetails?.rating) {
            setMyRating(productDetails?.rating)
        }
    }, [productDetails])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find(
            (item) => item.product === productDetails?._id
        )
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else {
            setErrorLimitOrder(true)
        }
    }, [numProduct, order, productDetails])

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1)
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = ProductService.rateProduct(id, token, { ...rests })
            return res
        },
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, reviewId, token } = data
            return ProductService.deleteReview(id, reviewId, token)
        }
    )

    // Query kiểm tra user đã mua sản phẩm này chưa (đơn hàng DELIVERED)
    const { data: userOrders } = useQuery(
        ['user-orders-check', user?.id],
        () => OrderService.getOrderByUserId(user.id, user.access_token),
        { enabled: !!user?.id && !!user?.access_token }
    )

    const hasBought = React.useMemo(() => {
        if (!userOrders?.data || !idProduct) return false
        return userOrders.data.some(
            order =>
                order.status === 'DELIVERED' &&
                order.orderItems.some(item => item.product === idProduct || item.product?._id === idProduct)
        )
    }, [userOrders, idProduct])

    const handleDeleteReview = (reviewId) => {
        mutationDelete.mutate(
            { id: idProduct, reviewId, token: user.access_token },
            {
                onSuccess: () => {
                    message.success("Đã xoá đánh giá")
                    refetch()
                }
            }
        )
    }

    const handleRateChange = (value) => {
        if (!user?.access_token) {
            navigate('/sign-in', { state: location?.pathname })
            return
        }

        Modal.confirm({
            title: 'Xác nhận đánh giá',
            content: `Bạn có chắc muốn đánh giá ${value} sao không?`,
            okText: 'Đồng ý',
            cancelText: 'Huỷ',
            onOk: () => {
                setMyRating(value)
                mutationUpdate.mutate({
                    id: idProduct,
                    token: user.access_token,
                    rating: value,
                    comment: myComment
                }, {
                    onSuccess: (data) => {
                        if (data?.status === 'OK') {
                            message.success("Đánh giá thành công")
                            refetch()
                        } else {
                            message.error(data?.message || "Đánh giá thất bại")
                            setMyRating(productDetails?.rating)
                        }
                    },
                    onError: () => {
                        message.error("Đánh giá thất bại")
                        setMyRating(productDetails?.rating)
                    }
                })
            }
        })
    }

    const handleChangeAddress = () => {
        if (!user?.id) {
            navigate('/sign-in')
        } else {
            navigate('/profile-user')
        }
    }

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInStock: productDetails?.countInStock
                    }, userId: user.id
                }))
                message.success('Đã thêm vào giỏ hàng')
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
    
    const finalPrice =
        productDetails?.discount > 0
            ? Math.round(
                productDetails.price * (1 - productDetails.discount / 100)
            )
            : productDetails?.price
    const sortedReviews = React.useMemo(() => {
        if (!productDetails?.ratedUsers) return []
        const mine = []
        const others = []
        productDetails.ratedUsers.forEach(r => {
            if (r.user?._id === user.id) {
                mine.push(r)
            } else {
                others.push(r)
            }
        })
        return [...mine, ...others]
    }, [productDetails, user.id])

    const fetchRelatedProducts = async () => {
        const res = await ProductService.getProductType(productDetails?.type?._id)
        return res.data
    }

    const fetchOtherProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res.data
    }

    const { data: relatedProducts } = useQuery(
        ['related-products', productDetails?.type],
        fetchRelatedProducts,
        { enabled: !!productDetails?.type }
    )

    const { data: otherProducts } = useQuery(
        ['other-products'],
        fetchOtherProducts
    )

    const mergedProducts = React.useMemo(() => {
        if (!relatedProducts || !otherProducts) return []

        const related = relatedProducts
            .filter(p => p._id !== idProduct)

        const others = otherProducts
            .filter(p =>
                p.type?._id !== productDetails?.type?._id &&
                p._id !== idProduct
            )

        return [...related, ...others].slice(0, 8)
    }, [relatedProducts, otherProducts, productDetails, idProduct])

    const specs = productDetails?.description
        ? productDetails.description.split('\n')
        : []

    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: '100%' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt="image product" preview={true} style={{width: '500px', height: '330px', objectFit: 'cover'}}/>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <span style={{ fontWeight: 600, marginRight: 6, fontSize: '18px' }}>
                            {productDetails?.rating?.toFixed(1)}
                        </span>
                        <Rate
                            allowHalf
                            defaultValue={productDetails?.rating}
                            value={myRating}
                            onChange={hasBought ? handleRateChange : undefined}
                            disabled={!hasBought}
                            style={{ opacity: hasBought ? 1 : 0.5 }}
                        />
                        <WrapperStyleTextSell> | Đã bán {productDetails?.selled || '0'}</WrapperStyleTextSell>
                        <WrapperStyleTextSell> | Tồn kho {productDetails?.countInStock}</WrapperStyleTextSell>
                    </div>
                    {hasBought ? (
                        <TextArea
                            rows={3}
                            placeholder="Viết nhận xét của bạn..."
                            value={myComment}
                            onChange={(e) => setMyComment(e.target.value)}
                            style={{ marginTop: 10 }}
                        />
                    ) : (
                        <div style={{
                            marginTop: 10,
                            padding: '8px 12px',
                            background: '#fff7e6',
                            border: '1px solid #ffd591',
                            borderRadius: 4,
                            color: '#d46b08',
                            fontSize: 13
                        }}>
                            {user?.id
                                ? '🛒 Bạn cần mua và nhận hàng thành công để đánh giá sản phẩm này'
                                : '🔑 Vui lòng đăng nhập và mua hàng để đánh giá'}
                        </div>
                    )}
                    <WrapperPriceProduct>
                        {productDetails?.discount > 0 ? (
                            <WrapperPriceTextProduct>
                                {convertPrice(finalPrice)}
                                <span
                                    style={{
                                        textDecoration: 'line-through',
                                        color: '#999',
                                        fontSize: '20px',
                                    }}
                                >
                                {convertPrice(productDetails?.price)}
                                </span>
                                <span
                                    style={{
                                        color: '#ff3945',
                                        fontSize: '20px',
                                    }}
                                    >
                                    -{productDetails?.discount}%
                                </span>
                            </WrapperPriceTextProduct>
                        ) : (
                            <WrapperPriceTextProduct>
                            {convertPrice(productDetails?.price)}
                            </WrapperPriceTextProduct>
                        )}
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span> -
                        <span className='change-address' style={{ color: 'rgb(11, 116, 229)', cursor: 'pointer' }} onClick={handleChangeAddress}>Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                onClick={handleAddOrderProduct}
                                textButton={'Thêm vào giỏ hàng'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {errorLimitOrder && <div style={{ color: 'red', textAlign: 'center' }}>Sản phẩm đã hết hàng!</div>}
                        </div>
                    </div>
                </Col>
                <Row gutter={16} style={{ marginTop: 20 }}>
                    <Col span={15}>
                        <div style={{ fontWeight: 700, marginBottom: 12 }}>
                            <div>Thông tin sản phẩm</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
                                <tbody>
                                    {specs?.map((item, index) => {
                                        const parts = item.split(':')
                                        const key = parts[0]
                                        const value = parts.slice(1).join(':')
                                        if(!value?.trim()) return null
                                        return (
                                            <tr key={index}>
                                                <td
                                                    style={{
                                                        width: '40%',
                                                        padding: '8px',
                                                        background: '#f5f5f5',
                                                        fontWeight: 500,
                                                        border: '1px solid #eee'
                                                    }}
                                                >
                                                    {key}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '8px',
                                                        border: '1px solid #eee'
                                                    }}
                                                >
                                                    {value}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ fontWeight: 700, marginBottom: 12 }}>
                            Danh sách đánh giá ({productDetails?.ratedUsers?.length})
                        </div>
                        {sortedReviews.map(r => {
                            const isMine = r.user?._id === user.id
                            return (
                                <div
                                    key={r._id}
                                    style={{
                                        padding:12,
                                        borderBottom:'1px solid #eee',
                                        background: isMine ? '#eaf5ff' : 'transparent',
                                        marginTop: 10,
                                        display:'flex',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}
                                >
                                <div style={{display: 'flex', flexDirection:'column', gap: '5px'}}>
                                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                                        <img
                                            src={r.user?.avatar || defaultAvatar}
                                            onError={(e) => {
                                                e.target.src = defaultAvatar
                                            }}
                                            alt="avatar"
                                            style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                        <b>{r.user?.name}</b>
                                    </div>
                                    <Rate disabled allowHalf value={r.rating} />
                                    <div>{r.comment}</div>
                                </div>
                                {isMine && (
                                    <Button
                                        danger
                                        size="small"
                                        onClick={()=>handleDeleteReview(r._id)}
                                    >
                                        Xoá đánh giá
                                    </Button>
                                )}
                            </div>
                            )
                        })}
                    </Col>
                    <Col span={9}>
                        <div style={{ fontWeight: 700, marginBottom: 12 }}>
                            Sản phẩm khác
                        </div>
                        <Row gutter={[12,12]}>
                            {mergedProducts.map(product => (
                                <Col span={12} key={product._id}>
                                    <CardComponent
                                        id={product._id}
                                        name={product.name}
                                        image={product.image}
                                        price={product.price}
                                        rating={product.rating}
                                        discount={product.discount}
                                        selled={product.selled}
                                        countInStock={product.countInStock}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Row >
        </Loading>
    )
}

export default ProductDetailsComponent