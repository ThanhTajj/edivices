import { Badge, Popover } from 'antd'
import React, { useState, useEffect } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperNavLinks, NavLink, WrapperRight } from './style'
import {
  UserOutlined,
  ShoppingCartOutlined,
  ThunderboltFilled
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';
import { resetOrder } from '../../redux/slides/orderSlide';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)

  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    localStorage.removeItem('access_token')
    dispatch(resetUser())
    dispatch(resetOrder())
    setLoading(false)
    navigate('/')
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    } else if (type === 'admin') {
      navigate('/system/admin')
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      handleLogout()
    }
    setIsOpenPopup(false)
  };

  return (
    <div style={{ width: '100%', display: 'flex', background: '#ffffff', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
      <WrapperHeader>
        <WrapperTextHeader to='/'>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#3b82f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transform: 'rotate(-10deg)'
          }}>
            <ThunderboltFilled style={{ fontSize: '18px' }} />
          </div>
          Edivices
        </WrapperTextHeader>

        <WrapperNavLinks>
          <NavLink active={location.pathname === '/'} onClick={() => navigate('/')}>Trang chủ</NavLink>
          <NavLink active={location.pathname === '/products'} onClick={() => navigate('/products')}>Sản phẩm</NavLink>
        </WrapperNavLinks>

        <WrapperRight>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: '16px' }}>
              <Badge count={order?.orderItems?.length} size="small" offset={[-2, 2]}>
                <ShoppingCartOutlined style={{ fontSize: '22px', color: '#333' }} />
              </Badge>
            </div>
          )}

          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {user?.access_token ? (
                <Popover
                  content={content}
                  trigger="click"
                  open={isOpenPopup}
                  onOpenChange={(open) => setIsOpenPopup(open)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt="avatar"
                        style={{
                          height: '32px',
                          width: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <UserOutlined style={{ fontSize: '20px' }} />
                    )}

                    <div style={{ maxWidth: 120, overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {userName?.length ? userName : user?.email || 'User'}
                    </div>
                  </div>
                </Popover>
              ) : (
                <div onClick={handleNavigateLogin} style={{ fontSize: '14px', cursor: 'pointer' }}>
                  Login
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
        </WrapperRight>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent