import { Input } from 'antd'
import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = ({
  type,
  placeholder = 'Nhập...',
  value,
  onChange,
  ...rests
}) => {

  const handleChange = (e) => {
    onChange?.(e.target.value)
  }

  if (type === 'password') {
    return (
      <WrapperInputStyle
        as={Input.Password}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...rests}
      />
    )
  }

  return (
    <WrapperInputStyle
      as={Input}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      {...rests}
    />
  )
}

export default InputForm
