import React, { useEffect, useState } from 'react'
import { Col, Pagination, Row } from 'antd'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import Loading from '../../components/LoadingComponent/Loading'
import { WrapperNavbar, WrapperProducts, WrapperTypeProduct } from './style'
import * as ProductService from '../../services/ProductService'
import TypeProduct from '../../components/TypeProduct/TypeProduct'

const TypeProductPage = () => {
    const { type } = useParams()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    const keyword = searchParams.get('keyword')
    const isSearchPage = location.pathname === '/product/search'

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 0,
    })

    const [filters, setFilters] = useState({
        price: 'all',
        brand: []
    })

    const [typeProducts, setTypeProducts] = useState([])
    
    const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
        setTypeProducts(res?.data)
    }
    }

    useEffect(() => {
    fetchAllTypeProduct()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        let res

        try {
            if (isSearchPage && keyword) {
                res = await ProductService.searchProduct(
                    keyword,
                    panigate.page,
                    panigate.limit
                )
            } else if (type) {
                res = await ProductService.getProductType(
                    type,
                    panigate.page,
                    panigate.limit
                )
            }

            if (res?.status === 'OK') {
                setProducts(res.data || [])
                setPanigate(prev => ({
                    ...prev,
                    total: res.total || 0
                }))
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPanigate(prev => ({ ...prev, page: 0 }))
    }, [keyword, type])

    useEffect(() => {
        fetchProducts()
    }, [keyword, type, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate(prev => ({
            ...prev,
            page: current - 1,
            limit: pageSize
        }))
    }

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const distinctBrands = [
        ...new Set(products.map(p => p.brand).filter(Boolean))
    ]

    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#efefef', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{background:'#f4f6f8', width:'100%', height: '54px'}}>
                    <div style={{ width: '1310px', margin: '0 auto', backgroundColor: '#f4f6f8' }}>
                        <WrapperTypeProduct>
                            {typeProducts.map((item) => {
                                return (
                                    <TypeProduct style={{backgroundColor:'none', width: '100%'}} name={item} key={item} />
                                )
                            })}
                        </WrapperTypeProduct>
                    </div>
                </div>
                <div style={{ width: '1310px', margin: '0 auto' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: 10 }}>
                        <WrapperNavbar span={4}>
                            <NavBarComponent
                                onChange={handleFilterChange}
                                filters={filters}
                                brands={distinctBrands}
                            />
                        </WrapperNavbar>

                        <Col span={20}>
                            <WrapperProducts>
                                {products
                                    .filter(pro => {
                                        let okPrice = true
                                        let okBrand = true

                                        if (filters.price === 'under1') {
                                            okPrice = pro.price < 1000000
                                        } else if (filters.price === '1to10') {
                                            okPrice = pro.price >= 1000000 && pro.price < 10000000
                                        } else if (filters.price === 'above10') {
                                            okPrice = pro.price >= 10000000
                                        }

                                        if (filters.brand.length > 0) {
                                            okBrand = filters.brand.includes(pro.brand)
                                        }

                                        return okPrice && okBrand
                                    })
                                    .map(product => (
                                        <CardComponent
                                            key={product._id}
                                            {...product}
                                            id={product._id}
                                        />
                                    ))}
                            </WrapperProducts>

                            <Pagination
                                current={panigate.page + 1}
                                pageSize={panigate.limit}
                                total={panigate.total}
                                onChange={onChange}
                                style={{ textAlign: 'center', marginTop: 10, display: 'flex', justifyContent: 'center' }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}

export default TypeProductPage
