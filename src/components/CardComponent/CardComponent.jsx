import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'
import styled from 'styled-components'

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    const finalPrice =
        discount > 0 ? price - (price * discount) / 100 : price;
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} />}
            onClick={() =>  handleDetailsProduct(id)}
        >
            <img
                src={logo}
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating.toFixed(1)} </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán {selled || '0'}</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                {discount > 0 ? (
                    <>
                    <div style={{ fontWeight: 700 }}>
                        {convertPrice(finalPrice)}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span
                            style={{
                                textDecoration: 'line-through',
                                color: '#999',
                                fontSize: '13px'
                            }}
                        >
                        {convertPrice(price)}
                        </span>

                        <WrapperDiscountText>
                        - {discount} %
                        </WrapperDiscountText>
                    </div>
                    </>
                ) : (
                    <span>{convertPrice(price)}</span>
                )}
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent