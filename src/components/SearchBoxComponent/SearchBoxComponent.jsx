import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import SearchResultComponent from './SearchResultComponent'
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch'

const SearchBoxComponent = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const searchDebounce = useDebounce(value, 500)
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!value.trim()) return
    setOpen(false)
    navigate(`/product/search?keyword=${value}`)
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ButttonInputSearch
        size="large"
        bordered={false}
        placeholder="Tìm sản phẩm..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        onClickButton={handleSearch}
        backgroundColorButton="#ffc400"
        colorButton="#0046ad"
      />

      {open && searchDebounce && (
        <SearchResultComponent
          keyword={searchDebounce}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default SearchBoxComponent
