import React, { useState } from 'react'
import { FilterItem, SectionBody, SectionFilters, SectionHeader, SectionTitle, WrapperSection } from './style'
import CardComponent from '../CardComponent/CardComponent'
import { useNavigate } from 'react-router-dom'

const ProductSection = ({ title, products, filterOptions = [] }) => {
    const navigate = useNavigate()

    const handleNavigate = (priceRange) => {
        const normalizedTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")?.replace(/ /g, '_')
        navigate(`/product/${normalizedTitle}`, { state: { type: title, priceRange } })
    }

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
                {products?.map((product) => {
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
        </WrapperSection>
    )
}

export default ProductSection
