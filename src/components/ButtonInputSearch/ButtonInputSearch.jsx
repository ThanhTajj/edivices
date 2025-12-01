import { Button, Input } from 'antd'
import React from 'react'
import { RadiusBottomleftOutlined, SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton,
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(13,92,182)', colorButton = '#fff'
    } = props;
    return (
    <div style={{display:'flex'}}>
        <InputComponent
            size={size}
            bordered={bordered}
            placeholder={placeholder}
            style={{backgroundColor: backgroundColorInput, borderRadius:"5px 0 0px 5px", border:'none'}}
        />
        <ButtonComponent
            size={size}
            styleButton={{backgroundColor: backgroundColorButton, borderRadius:"0 5px 5px 0", border:'none'}}
            icon={<SearchOutlined style={{color:colorButton}}/>}
            textButton={textButton}
            styleTextButton={{color:colorButton}}
        />
    </div>
  )
}

export default ButtonInputSearch