import React from 'react'
import {
    StyleNameProduct, WrapperCardStyle, WrapperReportText, WrapperPriceText,
    BadgeTopLeft, BadgeTopRight, ProductCategory, BottomRow, PriceSection, OriginalPrice, CartButton
} from './style'
import { StarFilled, ShoppingCartOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { message } from 'antd'

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
    
    const handleAddToCart = () => {
        if (!user?.id) {
            navigate('/sign-in', {
                state: {
                    redirectAddToCart: {
                        product: id,
                        name,
                        image,
                        price: finalPrice,
                        amount: 1,
                        countInStock: countInStock
                    }
                }
            })
            return
        }

        dispatch(addOrderProduct({
            orderItem: {
                product: id,
                name,
                image,
                price: finalPrice,
                amount: 1,
                countInStock: countInStock
            },
            userId: user.id
        }))
        message.success('Đã thêm vào giỏ hàng')
    }

    return (
        <WrapperCardStyle
            hoverable
            cover={<img alt={name} src={image} />}
            onClick={() => handleDetailsProduct(id)}
        >
            {discount > 0 && <BadgeTopLeft>-{discount}%</BadgeTopLeft>}
            {/* <BadgeTopRight>Featured</BadgeTopRight> */}

            <ProductCategory>{type}</ProductCategory>
            <StyleNameProduct>{name}</StyleNameProduct>

            <WrapperReportText>
                {Array.from({ length: 5 }).map((_, index) => (
                    <StarFilled key={index} style={{ color: index < Math.floor(rating || 0) ? '#f59e0b' : '#e2e8f0' }} />
                ))}
                <span className="review-count">({selled || 0})</span>
            </WrapperReportText>

            <BottomRow>
                <PriceSection>
                    {discount > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <WrapperPriceText>{convertPrice(finalPrice)}</WrapperPriceText>
                            <OriginalPrice>{convertPrice(price)}</OriginalPrice>
                        </div>
                    ) : (
                        <WrapperPriceText>{convertPrice(price)}</WrapperPriceText>
                    )}
                </PriceSection>

                <CartButton
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart()
                    }}
                >
                    <ShoppingCartOutlined />
                </CartButton>
            </BottomRow>
        </WrapperCardStyle>
    )
}

export default CardComponent