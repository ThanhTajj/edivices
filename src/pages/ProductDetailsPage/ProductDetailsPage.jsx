import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ width: '100%', background: '#efefef', height: '100%' }}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto' }} >
        <Breadcrumb
          style={{ padding: '16px 0', fontSize: '16px' }}
          items={[
            {
              title: 'Trang chủ',
              onClick: () => navigate('/'),
              className: 'cursor-pointer hover:text-blue-500',
            },
            {
              title: 'Chi tiết sản phẩm',
            },
          ]}
        />
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage