import React from 'react'
import { WrapperContainer, WrapperItemOrder, WrapperItemOrderInfo } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { Result, Card, Descriptions, Divider } from 'antd';


const OrderSucess = () => {
  const location = useLocation()
  const { state } = location
  return (
    <div style={{ background: '#f5f6fa', width: '100%', minHeight: '100vh', paddingBottom: '40px' }}>
      <Loading isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto', paddingTop: '20px' }}>
          <Result
            status="success"
            title="Đặt hàng thành công!"
            subTitle="Cảm ơn bạn đã mua hàng của chúng tôi. Đơn hàng của bạn đang được xử lý."
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Descriptions title="Chi tiết đơn hàng" bordered column={1}>
                {/* <Descriptions.Item label="Phương thức giao hàng">
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                </Descriptions.Item> */}
                <Descriptions.Item label="Phương thức thanh toán">
                  {orderContant.payment[state?.payment]}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">
                  <span style={{ fontSize: '18px', color: '#ff4d4f', fontWeight: 'bold' }}>{convertPrice(state?.totalPriceMemo)}</span>
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Sản phẩm đã đặt</Divider>

              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name} style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontWeight: '500'
                        }} title={order?.name}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'flex-end' }}>
                        <span>
                          <span style={{ fontSize: '14px', color: '#555' }}>Đơn giá: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '14px', color: '#555' }}>SL: {order?.amount}</span>
                        </span>
                        <span style={{ fontSize: '14px', color: '#ff4d4f', fontWeight: 'bold' }}>{convertPrice(order?.price * order?.amount)}</span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
            </Card>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSucess