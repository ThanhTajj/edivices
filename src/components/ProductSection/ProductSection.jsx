import React, { useState } from 'react'
import { FilterItem, SectionBody, SectionFilters, SectionHeader, SectionTitle, WrapperButtonMore, WrapperSection } from './style'
import CardComponent from '../CardComponent/CardComponent'
import { useNavigate } from 'react-router-dom'

const ProductSection = ({ title, products, filterOptions = [] }) => {
    const navigate = useNavigate()
    const [visibleCount, setVisibleCount] = useState(6)
    const handleNavigate = (priceRange) => {
        const normalizedTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")?.replace(/ /g, '_')
        navigate(`/product/${normalizedTitle}`, { state: { type: title, priceRange } })
    }
    const visibleProducts = products?.slice(0, visibleCount)
    return (
        <WrapperSection>
            <SectionHeader>
                <SectionTitle>{title}</SectionTitle>
                <SectionFilters>
                    <FilterItem>MỨC GIÁ</FilterItem>
                    {filterOptions.length > 0 ? (
                        filterOptions.map((option, index) => (
                            <FilterItem key={index}>{option}</FilterItem>
                        ))
                    ) : (
                        <>
                            <FilterItem onClick={() => handleNavigate('under1')}>DƯỚI 1 TRIỆU</FilterItem>
                            <FilterItem onClick={() => handleNavigate('1to10')}>TỪ 1 TRIỆU - 10 TRIỆU</FilterItem>
                            <FilterItem onClick={() => handleNavigate('above10')}>TRÊN 10 TRIỆU</FilterItem>
                        </>
                    )}
                </SectionFilters>
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
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <WrapperButtonMore
                    textButton="Xem thêm"
                    type="outline"
                    styleButton={{
                    border: '1px solid #0057D9',
                    color: '#0057D9',
                    width: '200px',
                    height: '36px',
                    borderRadius: '4px'
                    }}
                    onClick={() => setVisibleCount(prev => prev + 6)}
                />
                </div>
            )}
        </WrapperSection>
    )
}

export default ProductSection
