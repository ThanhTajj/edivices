import { Input } from 'antd'
import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = ({ type, placeholder = 'Nhập...', value, onChange, ...rests }) => {
  if (type === 'password') {
    return (
      <WrapperInputStyle
        as={Input.Password}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rests}
      />
    )
  }

  return (
    <WrapperInputStyle
      as={Input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rests}
    />
  )
}

export default InputForm
