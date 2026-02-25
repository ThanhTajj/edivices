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
import * as message from '../../components/Message/Message'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { loadCart } from '../../redux/slides/orderSlide'
import { updateUser } from '../../redux/slides/userSlide'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    if (data?.access_token) {
      message.success('Đăng ký thành công!')

      localStorage.setItem('access_token', JSON.stringify(data.access_token))

      const decoded = jwtDecode(data.access_token)

      if (decoded?.id) {
        handleGetDetailsUser(decoded.id, data.access_token)
      }
    } else if (data?.status === 'ERR') {
      message.error(data?.message)
    }
  }, [data])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    dispatch(loadCart({ userId: id }))
    navigate('/')
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'rgb(0,0,0,0.53)', height:'100vh' }}>
      <div style={{ width:'800px', height:'445px', borderRadius:'6px', background:'#fff', display:'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào,</h1>
          <p style={{ fontSize: '13px'}}>Đăng nhập hoặc tạo tài khoản</p>

          <InputForm
            style={{ marginBottom:'10px' }}
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

          <InputForm
            style={{ marginTop:'10px' }}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(value) => setConfirmPassword(value)}
          />
          
          {data?.status === 'ERR' && <span style={{ color: 'red'}}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled = {!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background:'rgb(255,57,69)',
                width:'100%',
                height:'48px',
                border:'none',
                marginTop:'10px'
              }}
              textButton="Đăng ký"
              styleTextButton={{ color:'#fff', fontSize:'15px' }}
            />
          </Loading>
          <p style={{ fontSize: '13px', margin: "15px 0 0 0" }}>
            Bạn đã có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="logo" height="203px" width="203px" 
            onClick={() => navigate('/')}
          />
          <div style={{fontSize:'20px', cursor:'pointer'}} onClick={() => navigate('/')}>Trang chủ</div>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage