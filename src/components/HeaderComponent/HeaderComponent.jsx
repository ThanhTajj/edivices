import { Badge, Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/es/transfer/search'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
  return (
    <div style={{ width:'100%' }}>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>EDIVCES</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            placeholder="input search text"
            textButton="Tìm kiếm"
            size="large"
            // onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '20px', alignItems:'center'}}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: '25px'}}/>
            <div>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản<CaretDownOutlined /></WrapperTextHeaderSmall>
              </div>
            </div>
          </WrapperHeaderAccount>
          <div style={{display:'flex', flexWrap:'nowrap'}}>
            <Badge count={4} size='small'>
              <ShoppingCartOutlined style={{ fontSize: '25px', color: '#fff'}}/>
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent