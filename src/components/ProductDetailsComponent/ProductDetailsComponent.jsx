import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/details1.jpg'
import imageProductSmall from '../../assets/images/details2.jpg'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
    const onChange = () => {

    }
    return (
        <Row style={{ padding:'16px', background:'#fff', borderRadius:'4px'}}>
            <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight:'8px'}}>
                <Image src={imageProduct} alt='image product' preview={false}/>
                <Row style={{ paddingTop: '10px', justifyContent:'space-between'}}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}/>
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft:'10px'}}>
                <WrapperStyleNameProduct>Điện Thoại Samsung Galaxy A16 LTE (4GB/128GB) - Hàng Chính Hãng</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{fontSize:"12px", color:'rgb(253,216,54)'}}/>
                    <StarFilled style={{fontSize:"12px", color:'rgb(253,216,54)'}}/>
                    <StarFilled style={{fontSize:"12px", color:'rgb(253,216,54)'}}/>
                    <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>200.000đ</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến</span>
                    <span className='address'>Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>-
                    <span className='change-address'>Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin:'10px 0 15px', padding: '10px 0', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}}>
                    <div style={{marginBottom:'6px'}}>Số lượng</div>
                    <WrapperQualityProduct>
                        <button style={{ cursor: 'pointer', border:'none', background:'transparent', padding: '5px 0 5px 5px'}}>
                            <MinusOutlined style={{ color:'#000', fontSize:'20px'}}/>
                        </button>
                        <WrapperInputNumber defaultValue={1} onChange={onChange} size='small'/>
                        <button style={{ cursor: 'pointer', border:'none', background:'transparent', padding: '5px 5px 5px 0'}}>
                            <PlusOutlined style={{ color:'#000', fontSize:'20px'}}/>
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <ButtonComponent
                        size={40}
                        styleButton={{background: 'rgb(255,57,69)', width:'220px', height: '48px', border:'none'}}
                        textButton='Chọn mua'
                        styleTextButton={{color:'#fff', fontSize:'15px'}}
                    ></ButtonComponent>
                    <ButtonComponent
                        size={40}
                        styleButton={{background: '#fff', width:'220px', height: '48px', border:'1px solid rgb(13,92,182)'}}
                        textButton='Mua trả sau'
                        styleTextButton={{color:'rgb(13,92,182)', fontSize:'15px'}}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent