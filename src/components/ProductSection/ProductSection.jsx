import React, { useState } from 'react'
import { SectionBody, SectionHeader, SectionTitle, SectionSubtitle, ViewAllLink, WrapperButtonMore, WrapperSection, TitleWrapper } from './style'
import CardComponent from '../CardComponent/CardComponent'
import { useNavigate } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'

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
    if (!type) return <AppstoreOutlined />;
    const normType = type.toLowerCase()
    if (normType.includes('latop') || normType.includes('laptop')) return <LaptopOutlined />
    if (normType.includes('phone') || normType.includes('điện thoại')) return <MobileOutlined />
    if (normType.includes('headphone') || normType.includes('tai nghe')) return <CustomerServiceOutlined />
    if (normType.includes('watch') || normType.includes('đồng hồ')) return <ClockCircleOutlined />
    if (normType.includes('tablet') || normType.includes('ipad')) return <TabletOutlined />
    if (normType.includes('phụ kiện') || normType.includes('accessories')) return <ApiOutlined />
    return <AppstoreOutlined />
}

const ProductSection = ({ title, subtitle = "Handpicked products you'll love", products }) => {
    const navigate = useNavigate()
    const [visibleCount, setVisibleCount] = useState(8)

    const handleNavigate = () => {
        const normalizedTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")?.replace(/ /g, '_')
        navigate(`/products`, { state: title })
    }

    if (!products || products.length === 0) return null;

    const visibleProducts = products?.slice(0, visibleCount)

    return (
        <WrapperSection>
            <SectionHeader>
                <TitleWrapper>
                    <SectionTitle>
                        <span style={{ marginRight: '8px', color: '#0f172a' }}>{getIconForType(title)}</span>
                        {title}
                    </SectionTitle>
                    <SectionSubtitle>{subtitle}</SectionSubtitle>
                </TitleWrapper>
                <ViewAllLink onClick={handleNavigate}>
                    View All <ArrowRightOutlined />
                </ViewAllLink>
            </SectionHeader>
            <SectionBody>
                {visibleProducts?.map((product) => {
                    return (
                        <CardComponent
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount={product.discount}
                            id={product._id}
                        />
                    )
                })}
            </SectionBody>
            {products?.length > visibleCount && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                    <WrapperButtonMore
                        textButton="Show More"
                        type="outline"
                        onClick={() => setVisibleCount(prev => prev + 4)}
                    />
                </div>
            )}
        </WrapperSection>
    )
}

export default ProductSection
