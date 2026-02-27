import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperType, IconWrapper, TypeName } from './styled'
import {
  LaptopOutlined,
  MobileOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  TabletOutlined,
  AppstoreOutlined,
  ApiOutlined
} from '@ant-design/icons'

const getIconForType = (type) => {
  const normType = type.toLowerCase()
  if (normType.includes('latop') || normType.includes('laptop')) return <LaptopOutlined />
  if (normType.includes('phone') || normType.includes('điện thoại')) return <MobileOutlined />
  if (normType.includes('headphone') || normType.includes('tai nghe')) return <CustomerServiceOutlined />
  if (normType.includes('watch') || normType.includes('đồng hồ')) return <ClockCircleOutlined />
  if (normType.includes('tablet') || normType.includes('ipad')) return <TabletOutlined />
  if (normType.includes('phụ kiện') || normType.includes('accessories')) return <ApiOutlined />
  return <AppstoreOutlined />
}

const getColorForType = (type) => {
  const normType = type.toLowerCase()
  if (normType.includes('latop') || normType.includes('laptop')) return '#e0f2fe' // blue
  if (normType.includes('phone') || normType.includes('điện thoại')) return '#f3e8ff' // purple
  if (normType.includes('headphone') || normType.includes('tai nghe')) return '#dcfce7' // green
  if (normType.includes('watch') || normType.includes('đồng hồ')) return '#ffedd5' // orange
  if (normType.includes('tablet') || normType.includes('ipad')) return '#ffe4e6' // rose
  return '#f1f5f9' // slate
}

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()
  const handleNavigatetype = (type) => {
    navigate('/products', { state: type })
  }

  return (
    <WrapperType onClick={() => handleNavigatetype(name)}>
      <IconWrapper color={getColorForType(name)}>
        {getIconForType(name)}
      </IconWrapper>
      <TypeName>{name}</TypeName>
    </WrapperType>
  )
}

export default TypeProduct