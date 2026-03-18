import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { WrapperTypeProduct } from './style'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'

const ProductDetailsPage = () => {
  const { data: sortData } = useQuery({
    queryKey: ['type-sort-setting'],
    queryFn: ProductService.getTypeSortSetting
  })

  const { data: typeData } = useQuery({
    queryKey: ['product-types', sortData?.value],
    queryFn: () =>
      ProductService.getAllTypeProduct(sortData?.value),
    enabled: !!sortData?.value
  })

  const typeProducts = typeData?.data?.map(item => item.type) || []

  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ width: '100%', background: '#efefef', height: '100%' }}>
      <div style={{ background: '#fff', width: '100%', padding: '20px 0' }}>
        <div style={{ width: '1310px', margin: '0 auto', backgroundColor: '#fff' }}>
          <WrapperTypeProduct>
            {typeProducts.map((item) => {
              return (
                <TypeProduct style={{ backgroundColor: 'none', width: '100%' }} name={item} key={item} />
              )
            })}
          </WrapperTypeProduct>
        </div>
      </div>
      <div style={{ width: '1310px', height: '100%', margin: '0 auto' }} >
        <Breadcrumb
          style={{ padding: '16px 0', fontSize: '16px', fontWeight: '500' }}
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