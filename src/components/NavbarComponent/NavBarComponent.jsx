import { Checkbox, Radio, Rate } from 'antd'
import React from 'react'
import { wrapperContent, WrapperLableText, WrapperTextValue } from './style'

const NavBarComponent = ({ onChange, filters, brands = [] }) => {

    const onChangePrice = (e) => {
        onChange('price', e.target.value)
    }

    const onChangeBrand = (checkedValues) => {
        onChange('brand', checkedValues)
    }

    return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
            <WrapperLableText>KHOẢNG GIÁ</WrapperLableText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Radio.Group onChange={onChangePrice} value={filters?.price}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Radio value="all">Tất cả</Radio>
                        <Radio value="under10">Dưới 10 triệu</Radio>
                        <Radio value="10to20">Từ 10 triệu - 20 triệu</Radio>
                        <Radio value="above20">Trên 20 triệu</Radio>
                    </div>
                </Radio.Group>
            </div>

            <WrapperLableText>THƯƠNG HIỆU</WrapperLableText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChangeBrand} value={filters?.brand}>
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <Checkbox key={brand} value={brand} style={{ marginLeft: 0 }}>{brand}</Checkbox>
                        ))
                    ) : (
                        <div style={{ fontSize: '13px', color: '#888' }}>Chưa có thương hiệu</div>
                    )}
                </Checkbox.Group>
            </div>
        </div>
    )
}

export default NavBarComponent