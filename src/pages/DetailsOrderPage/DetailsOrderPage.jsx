import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import logo from '../../assets/images/logo.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Breadcrumb } from 'antd'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params
  const navigate = useNavigate()

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  })
  const { isLoading, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])

  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }

  return (
   <Loading isLoading={isLoading}>
     <div style={{width: '100%', height: '100vh', background: '#f5f5fa'}}>
      <div style={{ width: '1310px', margin: '0 auto', height: '1310px'}}>
        <Breadcrumb
          style={{ padding: '16px 0', fontSize: '16px', fontWeight: '500' }}
          items={[
            {
              title: (
                <Link
                  to="/"
                >
                  Trang chủ
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to="/my-order"
                >
                  Đơn hàng của tôi
                </Link>
              ),
            },
            {
              title: 'Chi tiết đơn hàng',
            },
          ]}
        />
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>{data?.shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} - ${data?.shippingAddress?.city}`}</div>
              <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Trang thái đơn hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant?.status?.[data?.status] || 'Không xác định'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Thời gian đặt hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{data?.createdAt && new Date(data.createdAt).toLocaleString('vi-VN')}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{flex:1, display: 'flex', alignItems: 'center'}}>
            <div style={{width: '670px', fontSize: '16px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            <WrapperItemLabel>Thành tiền</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            const price = order?.price || 0
            const amount = order?.amount || 0
            const discountPercent = Number(order?.discount) || 0
            const discountPrice = (price * discountPercent) / 100
            const finalUnitPrice = price - discountPrice
            const total = finalUnitPrice * amount
            return (
              <WrapperProduct key={order?._id}>
                <WrapperNameProduct>
                  <img
                    src={order?.image}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px',
                      cursor: 'pointer'
                    }}
                    onClick={() =>  handleDetailsProduct(order?.product)}
                  />
                  <div
                    style={{
                      width: 260,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginLeft: '10px',
                      height: '70px',
                      cursor: 'pointer'
                    }}
                    onClick={() =>  handleDetailsProduct(order?.product)}
                  >
                    {order?.name}
                  </div>
                </WrapperNameProduct>

                <WrapperItem>{convertPrice(price)}</WrapperItem>

                <WrapperItem>{amount}</WrapperItem>

                <WrapperItem style={{ color: '#52c41a' }}>
                  {`${convertPrice(discountPrice)} (${discountPercent}%)`}
                </WrapperItem>

                <WrapperItem style={{ color: '#ff4d4f', fontWeight: '600' }}>
                  {convertPrice(total)}
                </WrapperItem>
              </WrapperProduct>
            )
          })}
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
          </WrapperAllPrice>
      </WrapperStyleContent>
      </div>
    </div>
   </Loading>
  )
}

export default DetailsOrderPage