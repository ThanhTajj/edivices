import React, { useState, useEffect } from 'react'
import { Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { PageWrapper, PageHeader, PageTitle, PageSubtitle, ControlsWrapper, FilterPills, Pill, ProductGrid, SearchInputWrapper } from './style'
import CardComponent from '../../components/CardComponent/CardComponent'
import Loading from '../../components/LoadingComponent/Loading'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'

const ProductsPage = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state || 'All')
  const [typeProducts, setTypeProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')

  const fetchProductAll = async (context) => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(['All', ...res?.data])
    }
  }

  const { isLoading, data: products } = useQuery(['products'], fetchProductAll, { retry: 3 })

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  useEffect(() => {
    if (location.state) {
      setActiveTab(location.state)
    }
  }, [location.state])

  const allProducts = products?.data || []

  let filteredProducts = allProducts.filter(item => {
    if (activeTab !== 'All' && item.type?.type !== activeTab) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  })

  const getFinalPrice = (product) => {
    if (product.discount > 0) {
      return Math.round(product.price * (1 - product.discount / 100))
    }
    return product.price
  }

  if (sortOrder === 'Highest Price') {
    filteredProducts.sort((a, b) => getFinalPrice(b) - getFinalPrice(a))
  } else if (sortOrder === 'Lowest Price') {
    filteredProducts.sort((a, b) => getFinalPrice(a) - getFinalPrice(b))
  }

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: '100%', background: '#ffffff', minHeight: '100vh' }}>
        <PageWrapper>
          <PageHeader>
            <PageTitle>Tất cả sản phẩm</PageTitle>
            <PageSubtitle>{filteredProducts.length} sản phẩm</PageSubtitle>
          </PageHeader>

          <ControlsWrapper>
            <SearchInputWrapper>
              <Input
                size="large"
                placeholder="Tìm kiếm..."
                prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </SearchInputWrapper>
            <div>
              <Select
                defaultValue="Newest"
                style={{ width: 160 }}
                size="large"
                onChange={(value) => setSortOrder(value)}
                options={[
                  { value: 'Newest', label: 'Mới nhất' },
                  { value: 'Highest Price', label: 'Giá: Cao đến Thấp' },
                  { value: 'Lowest Price', label: 'Giá: Thấp đến Cao' },
                ]}
              />
            </div>
          </ControlsWrapper>

          <FilterPills>
            {typeProducts.map(type => {
              const typeName = typeof type === 'string' ? type : type?.type
              return (
                <Pill
                  key={typeName}
                  active={activeTab === typeName}
                  onClick={() => setActiveTab(typeName)}
                >
                  {typeName === 'All' ? 'Tất cả' : typeName}
                </Pill>
              )
            })}
          </FilterPills>

          <ProductGrid>
            {filteredProducts.map(product => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type?.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id}
              />
            ))}
          </ProductGrid>

        </PageWrapper>
      </div>
    </Loading>
  )
}

export default ProductsPage