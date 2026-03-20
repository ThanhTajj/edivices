import React from 'react'
import { ThunderboltFilled, LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { resetOrder } from '../../redux/slides/orderSlide'
import * as message from '../Message/Message'

const AdminHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLogout = async () => {
    await UserService.logoutUser()
    localStorage.removeItem('access_token')
    dispatch(resetUser())
    dispatch(resetOrder())
    message.success('Đăng xuất thành công')
    navigate('/sign-in')
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: '56px',
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32,
          background: '#3b82f6',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff',
          transform: 'rotate(-10deg)'
        }}>
          <ThunderboltFilled style={{ fontSize: 18 }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Edivices</span>
        <span style={{
          marginLeft: 8,
          padding: '2px 8px',
          background: '#eff6ff',
          color: '#3b82f6',
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600
        }}>
          Admin Panel
        </span>
      </div>

      {/* User info + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: '#555', fontSize: 14 }}>
          {user?.name || user?.email}
        </span>
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          danger
          size="small"
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}

export default AdminHeader
