import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { WrapperTypeProduct } from './style'
import { useEffect } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import * as ProductService from '../../services/ProductService'

const ProductDetailsPage = () => {
  const [typeProducts, setTypeProducts] = useState([])

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ width: '100%', background: '#efefef', height: '100%' }}>
      <div style={{background:'#f4f6f8', width:'100%', height: '54px'}}>
        <div style={{ width: '1310px', margin: '0 auto', backgroundColor: '#f4f6f8' }}>
          <WrapperTypeProduct>
            {typeProducts.map((item) => {
              return (
                <TypeProduct style={{backgroundColor:'none', width: '100%'}} name={item} key={item} />
              )
            })}
          </WrapperTypeProduct>
        </div>
      </div>
      <div style={{ width: '1310px', height: '100%', margin: '0 auto' }} >
        <Breadcrumb
          style={{ padding: '16px 0', fontSize: '16px' }}
          items={[
            {
              title: (
                <Link
                  to="/"
                >
                  Trang chủ
                </Link>
              ),
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