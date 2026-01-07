import { Badge, Col, Popover } from 'antd'
import React, { useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/LoadingComponent';

const HeaderComponent = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  const content = (
    <div>
      <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  )

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
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: '25px'}}/>
              {user?.name ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{cursor:'pointer'}}>{user?.name}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản<CaretDownOutlined /></WrapperTextHeaderSmall>
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
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