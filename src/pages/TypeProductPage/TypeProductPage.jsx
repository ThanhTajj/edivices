import React from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavBar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange=()=>[

    ]
    return (
        <div style={{ padding:'0 120px', background:'#efefef'}}>
            <div style={{ margin: '0 auto'}}>
                <Row style={{ flexWrap:'nowrap', paddingTop:'10px'}}>
                    <WrapperNavBar span={4}>
                        <NavBarComponent />
                    </WrapperNavBar>
                    <Col span={20}>
                        <WrapperProducts>
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                        </WrapperProducts>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Pagination defaultCurrent={1} total={100} onChange={onChange} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TypeProductPage