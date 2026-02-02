import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import { message } from 'antd'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { updateUser } from '../../redux/slides/userSlide'

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState('')

  const mutation = useMutationHook(
    (id, data) => UserService.updateUser(id, data)
  )

  const dispatch = useDispatch()

  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    setEmail(user?.email)
    setName(user?.name)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  },[user])

  useEffect(() => {
    if(isSuccess) {
      message.success()
      handleGetDetailsUser(user?.id, user?.access_token)
    } else if (isError) {
      message.error()
    }
  },[isSuccess, isError])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }
  
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleOnChangeName = (e) => {
    setName(e.target.value)
  }

  const handleOnChangePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleOnChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleOnChangeAvatar = (e) => {
    setAvatar(e.target.value)
  }
  
  const handleUpdate = () => {
    mutation.mutate(user?.id, {email, name, phone, address, avatar})
    
  }

  return (
    <div style={{padding: '10px 120px', margin:'0 auto', height: '500px'}}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLable htmlFor="name">Name</WrapperLable>
            <InputForm style= {{width: '300px'}} id="name" value={name} onChange={handleOnChangeName}/>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                width:'fit-content',
                height:'30px',
                border:'1px solid rgb(26,148,255)',
                borderRadius:'4px',
              }}
              textButton="Cập nhật"
              styleTextButton={{ color:'rgb(26,148,255)', fontSize:'15px', fontWeight:'700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="email">Email</WrapperLable>
            <InputForm style= {{width: '300px'}} id="email" value={email} onChange={handleOnChangeEmail}/>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                width:'fit-content',
                height:'30px',
                border:'1px solid rgb(26,148,255)',
                borderRadius:'4px',
              }}
              textButton="Cập nhật"
              styleTextButton={{ color:'rgb(26,148,255)', fontSize:'15px', fontWeight:'700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="phone">Phone</WrapperLable>
            <InputForm style= {{width: '300px'}} id="phone" value={phone} onChange={handleOnChangePhone}/>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                width:'fit-content',
                height:'30px',
                border:'1px solid rgb(26,148,255)',
                borderRadius:'4px',
              }}
              textButton="Cập nhật"
              styleTextButton={{ color:'rgb(26,148,255)', fontSize:'15px', fontWeight:'700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="address">Address</WrapperLable>
            <InputForm style= {{width: '300px'}} id="address" value={address} onChange={handleOnChangeAddress}/>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                width:'fit-content',
                height:'30px',
                border:'1px solid rgb(26,148,255)',
                borderRadius:'4px',
              }}
              textButton="Cập nhật"
              styleTextButton={{ color:'rgb(26,148,255)', fontSize:'15px', fontWeight:'700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="avatar">Avatar</WrapperLable>
            <InputForm style= {{width: '300px'}} id="avatar" value={avatar} onChange={handleOnChangeAvatar}/>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                width:'fit-content',
                height:'30px',
                border:'1px solid rgb(26,148,255)',
                borderRadius:'4px',
              }}
              textButton="Cập nhật"
              styleTextButton={{ color:'rgb(26,148,255)', fontSize:'15px', fontWeight:'700' }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  )
}

export default ProfilePage