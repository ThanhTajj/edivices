import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:'200px', height:'200px'}}
        style={{ width: 240 }}
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
                <StarFilled style={{fontSize:"12px", color:'yellow'}}/>
            </span>
            <span>| Đã bán 1000+</span>
        </WrapperReportText>
        <WrapperPriceText>
            1.000.000đ
            <WrapperDiscountText>
                -5%
            </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent