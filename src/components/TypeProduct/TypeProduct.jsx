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
  const typeName = typeof type === "string" ? type : type?.type || ""
  const normType = typeName.toLowerCase()

  if (normType.includes('laptop') || normType.includes('latop')) return <LaptopOutlined />
  if (normType.includes('phone') || normType.includes('điện thoại')) return <MobileOutlined />
  if (normType.includes('earphones') || normType.includes('tai nghe')) return <CustomerServiceOutlined />
  if (normType.includes('watch') || normType.includes('đồng hồ')) return <ClockCircleOutlined />
  if (normType.includes('tablet') || normType.includes('ipad')) return <TabletOutlined />
  if (normType.includes('phụ kiện') || normType.includes('accessories')) return <ApiOutlined />
  return <AppstoreOutlined />
}

const getColorForType = (type) => {
  const typeName = typeof type === "string" ? type : type?.type || ""
  const normType = typeName.toLowerCase()

  if (normType.includes('latop') || normType.includes('laptop')) return '#e0f2fe'
  if (normType.includes('phone') || normType.includes('điện thoại')) return '#f3e8ff'
  if (normType.includes('headphone') || normType.includes('tai nghe')) return '#dcfce7'
  if (normType.includes('watch') || normType.includes('đồng hồ')) return '#ffedd5'
  if (normType.includes('tablet') || normType.includes('ipad')) return '#ffe4e6'
  return '#f1f5f9'
}

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()

  const typeName = typeof name === "string" ? name : name?.type || ""

  const handleNavigatetype = (type) => {
    navigate('/products', { state: type })
  }

  return (
    <WrapperType onClick={() => handleNavigatetype(typeName)}>
      <IconWrapper color={getColorForType(typeName)}>
        {getIconForType(typeName)}
      </IconWrapper>
      <TypeName>{typeName}</TypeName>
    </WrapperType>
  )
}

export default TypeProduct