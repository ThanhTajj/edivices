import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:'200px', height:'200px'}}
        style={{ width: 200 }}
        bodyStyle={{padding: '10px'}}
        cover={
        <img
            draggable={false}
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
        }
    >
        <StyleNameProduct>Iphone</StyleNameProduct>
        <WrapperReportText>
            <span style={{marginRight: '4px'}}>
                <span>4.96</span>
                <StarFilled style={{fontSize:"12px", color:'rgb(253,216,54)'}}/>
            </span>
            <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>
            <span style={{marginRight:'8px'}}>1.000.000đ</span>
            <WrapperDiscountText>
                -5%
            </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent