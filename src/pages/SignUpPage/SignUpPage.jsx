import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/Message/Message'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const mutation = useMutationHook(
    data => UserService.signupUser(data)
  )

  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

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
          <p>Đăng nhập hoặc tạo tài khoản</p>

          <InputForm
            style={{ marginBottom:'10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputForm
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputForm
            style={{ marginTop:'10px' }}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <p>
            Bạn đã có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="logo" height="203px" width="203px" />
          <h4>Mua sắm tại EDIVCES</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage
