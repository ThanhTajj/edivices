import React, { Fragment } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)

    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status == 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (state) {
            // Check if state is just a string (type name) or an object
            const type = typeof state === 'object' ? state.type : state
            fetchProductType(type, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }


    const [filters, setFilters] = useState({
        price: 'all',
        brand: []
    })

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }))
    }

    // Update filters from navigation state
    useEffect(() => {
        if (state?.priceRange) {
            setFilters(prev => ({ ...prev, price: state.priceRange }))
        }
    }, [state])

    // Extract distinct brands from the fetched products
    const distinctBrands = [...new Set(products?.map((p) => p.brand).filter((b) => b))]

    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#efefef', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ width: '1270px', margin: '0 auto' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                        <WrapperNavbar span={4} >
                            <NavBarComponent onChange={handleFilterChange} filters={filters} brands={distinctBrands} />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts >
                                {products?.filter((pro) => {
                                    let matchesSearch = true;
                                    let matchesPrice = true;
                                    let matchesBrand = true;

                                    if (searchDebounce !== '') {
                                        matchesSearch = pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase());
                                    }

                                    // Price Filter
                                    if (filters.price === 'under10') {
                                        matchesPrice = pro.price < 10000000;
                                    } else if (filters.price === '10to20') {
                                        matchesPrice = pro.price >= 10000000 && pro.price < 20000000;
                                    } else if (filters.price === 'above20') {
                                        matchesPrice = pro.price >= 20000000;
                                    }

                                    // Brand Filter
                                    if (filters.brand.length > 0) {
                                        matchesBrand = filters.brand.includes(pro?.brand);
                                    }

                                    return matchesSearch && matchesPrice && matchesBrand;
                                })?.map((product) => {
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
                            </WrapperProducts>
                            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}

export default TypeProductPage