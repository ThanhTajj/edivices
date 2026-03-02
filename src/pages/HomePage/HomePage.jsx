import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import {
  WrapperTypeProduct,
  WrapperHero, HeroContent, HeroTag, HeroTitle, HeroSubtitle, HeroButtonGroup, StyledButton,
  WrapperFeatures, FeatureItem, FeatureIcon, FeatureText,
  SubTitleSection, DescSection
} from './style'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useState, useEffect } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import ProductSection from '../../components/ProductSection/ProductSection'
import { useNavigate } from 'react-router-dom'
import {
  ThunderboltOutlined, ArrowRightOutlined,
  CarOutlined, SafetyCertificateOutlined,
  ReloadOutlined, CustomerServiceOutlined
} from '@ant-design/icons'
const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(200)
  const [typeProducts, setTypeProducts] = useState([])
  const navigate = useNavigate()
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const { isLoading, data: products } = useQuery(['products', limit], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: '100%', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '60px' }}>
        <div id="container" style={{ width: '1310px', margin: '0 auto' }}>
          <WrapperHero>
            <HeroContent>
              <HeroTag>
                <ThunderboltOutlined />
                Hàng mới vừa về
              </HeroTag>
              <HeroTitle>
                Công nghệ đỉnh cao,<br /><span>giao tận tay</span> hôm nay.
              </HeroTitle>
              <HeroSubtitle>
                Thiết bị điện tử cao cấp được tuyển chọn dành cho những ai muốn trải nghiệm tốt nhất. Khám phá công nghệ tiên tiến với giá không thể cạnh tranh hơn.
              </HeroSubtitle>
              <HeroButtonGroup>
                <StyledButton className="primary" onClick={() => navigate('/products')}>
                  Mua ngay <ArrowRightOutlined />
                </StyledButton>
                <StyledButton className="secondary" onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}>
                  Xem nổi bật
                </StyledButton>
              </HeroButtonGroup>
            </HeroContent>
            <div style={{ width: '50%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <SliderComponent
                arrImages={[
                  { image: slider1, productId: '6998423876b8eef90d47c5a4' },
                  { image: slider2, productId: '6987112a1850bbde1ce6ff4d' },
                  { image: slider3, productId: '698711291850bbde1ce6ff4a' }
                ]}
                onClickItem={(id) => navigate(`/product-details/${id}`)}
              />
            </div>
          </WrapperHero>
          <WrapperFeatures>
            <FeatureItem>
              <FeatureIcon><CarOutlined /></FeatureIcon>
              <FeatureText>
                <h4>Miễn phí vận chuyển</h4>
                <p>Cho đơn hàng trên 500.000đ</p>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon><SafetyCertificateOutlined /></FeatureIcon>
              <FeatureText>
                <h4>Bảo hành 2 năm</h4>
                <p>Cho tất cả sản phẩm</p>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon><ReloadOutlined /></FeatureIcon>
              <FeatureText>
                <h4>Đổi trả dễ dàng</h4>
                <p>Chính sách 30 ngày</p>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon><CustomerServiceOutlined /></FeatureIcon>
              <FeatureText>
                <h4>Hỗ trợ 24/7</h4>
                <p>Luôn sẵn sàng giúp bạn</p>
              </FeatureText>
            </FeatureItem>
          </WrapperFeatures>
          <div id="featured-products" style={{ marginTop: '40px' }}>
            {typeProducts.map((item) => {
              return (
                <ProductSection
                  key={item}
                  title={item}
                  products={products?.data?.filter(product => product.type === item)}
                />
              )
            })}
          </div>
          <div style={{ marginTop: '80px', marginBottom: '40px' }}>
            <SubTitleSection>Mua theo danh mục</SubTitleSection>
            <DescSection>Tìm chính xác thứ bạn cần</DescSection>
            <WrapperTypeProduct>
              {typeProducts.map((item) => {
                return (
                  <TypeProduct name={item} key={item} />
                )
              })}
            </WrapperTypeProduct>
          </div>
        </div>
      </div>
    </Loading>
  )
}

export default HomePage 