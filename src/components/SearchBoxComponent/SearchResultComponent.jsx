import React, { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { SearchBoxWrapper, SearchItem } from './style'

const SearchResultComponent = ({ keyword, onClose }) => {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const { data, isLoading } = useQuery(
    ['search-product', keyword],
    () => ProductService.searchProduct(keyword),
    { enabled: !!keyword }
  )

  if (!keyword) return null

  if (isLoading) {
    return (
      <SearchBoxWrapper ref={wrapperRef}>
        <div style={{ padding: 8 }}>Loading...</div>
      </SearchBoxWrapper>
    )
  }

  return (
    <SearchBoxWrapper ref={wrapperRef}>
      {data?.data?.length === 0 && (
        <div style={{ padding: 8 }}>Không tìm thấy sản phẩm</div>
      )}

      {data?.data?.map((item) => (
        <SearchItem
          key={item._id}
          onClick={() => {
            navigate(`/product-details/${item._id}`)
            onClose()
          }}
        >
          <img src={item.image} alt={item.name} />
          <span>{item.name}</span>
        </SearchItem>
      ))}
    </SearchBoxWrapper>
  )
}

export default SearchResultComponent