import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
import { loadCart } from '../../redux/slides/orderSlide'
import * as message from '../../components/Message/Message'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )

  const {data, isPending, isSuccess} = mutation

  const decodeTokenSafe = (token) => {
    try {
      if (!token || token === 'undefined' || token === 'null') return null
      return jwtDecode(token)
    } catch (error) {
      console.log('Token decode error:', error)
      return null
    }
  }

  useEffect(() => {
    if (!data) return

    if (data?.status !== 'OK') return
    if (!data?.access_token) return

    localStorage.setItem('access_token', data.access_token)

    const decoded = decodeTokenSafe(data.access_token)

    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, data.access_token)
    }
  }, [data])

  const handleGetDetailsUser = async (id, token) => {
    if (!token) return
    try {
      const res = await UserService.getDetailsUser(id, token)
      dispatch(updateUser({ ...res?.data, access_token: token }))
      dispatch(loadCart({ userId: id }))
      message.success('Đăng nhập thành công')
      if (res?.data?.isAdmin) {
        navigate('/system/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log('Get details error:', error)
    }
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(0,0,0,0.53)',
        height: '100vh'
      }}
    >
      <div
        style={{
          width: '800px',
          height: '445px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex'
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào,</h1>
          <p style={{ fontSize: '13px'}}>Đăng nhập hoặc tạo tài khoản</p>

          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={(value) => setEmail(value)}
          />

          <InputForm
            placeholder="password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />

          {data?.status === 'ERR' && <span style={{ color: 'red'}}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              styleButton={{
                background: 'rgb(255,57,69)',
                width: '100%',
                height: '48px',
                border: 'none',
                marginTop: '10px'
              }}
              textButton="Đăng nhập"
              styleTextButton={{ color: '#fff', fontSize: '15px' }}
            />
          </Loading>
          <p style={{margin: "15px 0 0 0"}}>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>

          <p style={{ fontSize: '13px', margin: "5px 0 0 0" }}>
            Chưa có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="logo"
            height="203px"
            width="203px"
            style={{cursor: 'pointer'}}
            onClick={() => navigate('/')}
          />
          <div style={{fontSize:'20px', cursor:'pointer'}} onClick={() => navigate('/')}>Trang chủ</div>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage