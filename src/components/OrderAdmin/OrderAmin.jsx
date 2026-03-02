import { Button, Form, Select, Space } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import { Switch } from 'antd'
import * as OrderService from '../../services/OrderService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'
import BarChartTopProducts from './BarChartTopProducts'


const OrderAdmin = () => {
  const user = useSelector((state) => state?.user)
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }
  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const mutationRefund = useMutation({
    mutationFn: (data) => {
      const { id, token } = data
      return OrderService.refundOrder(id, token)
    },
    onSuccess: () => {
      message.success('Hoàn tiền thành công')
      queryOrder.refetch()
    }
  })
  const mutationUpdate = useMutation({
    mutationFn: (data) => {
      const { id, token, ...rests } = data
      return OrderService.updateOrderStatus(id, token, rests)
    },
    onSuccess: () => {
      message.success('Cập nhật thành công')
      queryOrder.refetch()
    }
  })
  const mutationDeleteMany = useMutation({
    mutationFn: (data) => {
      const { ids, token } = data
      return OrderService.deleteManyOrder({ ids }, token)
    },
    onSuccess: () => {
      message.success('Xóa đơn hàng thành công')
      queryOrder.refetch()
    }
  })
  const handleDeleteManyOrders = (ids) => {
    mutationDeleteMany.mutate({
      ids,
      token: user?.access_token
    })
  }
  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (value) => {
        const date = new Date(value)
        return date.toLocaleString('vi-VN')
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value, record) => (
        <Select
          value={value}
          style={{ width: 150 }}
          onChange={(newStatus) => {
            let updatePayload = {
              id: record._id,
              token: user?.access_token,
              status: newStatus
            };
            if (newStatus === 'CONFIRMED' && record.paymentMethod === orderContant.payment['qr']) {
              updatePayload.isPaid = true;
            }
            mutationUpdate.mutate(updatePayload)
          }}
          options={[
            { value: 'PENDING', label: 'Chờ xử lý' },
            { value: 'CONFIRMED', label: 'Đã xác nhận' },
            { value: 'SHIPPING', label: 'Đang giao' },
            { value: 'DELIVERED', label: 'Đã giao' },
            { value: 'CANCELLED', label: 'Đã hủy' }
          ]}
        />
      )
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      render: (value, record) => (
        <Switch
          checked={value}
          onChange={(checked) => {
            mutationUpdate.mutate({
              id: record._id,
              token: user?.access_token,
              isPaid: checked,
            })
          }}
        />
      )
    },
    {
      title: 'Refund',
      dataIndex: 'refunded',
      render: (_, record) => {
        if (record.refunded) {
          return <span style={{ color: 'green' }}>Đã hoàn</span>
        }
        if (
          record.status === 'CANCELLED' &&
          record.isPaid
        ) {
          return (
            <Button
              danger
              onClick={() =>
                mutationRefund.mutate({
                  id: record._id,
                  token: user?.access_token
                })
              }
            >
              Hoàn tiền
            </Button>
          )
        }
        return '-'
      }
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
  ];

  const dataTable = orders?.data?.map((order) => ({
    ...order,
    key: order._id,
    userName: order?.shippingAddress?.fullName,
    phone: order?.shippingAddress?.phone,
    address: order?.shippingAddress?.address,
    paymentMethod: orderContant.payment[order?.paymentMethod],
    totalPrice: convertPrice(order?.totalPrice)
  })) || []

  const totalRevenue = (orders?.data || []).reduce((sum, o) => sum + (o.totalPrice || 0), 0)
  const totalOrders = orders?.data?.length || 0

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: 200, background: 'linear-gradient(135deg,#6366f1,#818cf8)',
          borderRadius: 16, padding: '20px 24px', color: '#fff', boxShadow: '0 4px 16px rgba(99,102,241,0.3)'
        }}>
          <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8 }}>Tổng đơn hàng</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{totalOrders}</div>
        </div>
        <div style={{
          flex: 1, minWidth: 200, background: 'linear-gradient(135deg,#10b981,#34d399)',
          borderRadius: 16, padding: '20px 24px', color: '#fff', boxShadow: '0 4px 16px rgba(16,185,129,0.3)'
        }}>
          <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8 }}>Tổng doanh thu</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{convertPrice(totalRevenue)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>

        <div style={{ flex: 1, minWidth: 260, background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ fontWeight: 600, marginBottom: 12, color: '#374151' }}>Phương thức thanh toán</div>
          <div style={{ height: 220 }}>
            <PieChartComponent data={orders?.data || []} />
          </div>
        </div>

        <div style={{ flex: 2, minWidth: 360, background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ fontWeight: 600, marginBottom: 12, color: '#374151' }}>Top 5 sản phẩm bán chạy</div>
          <div style={{ height: 260 }}>
            <BarChartTopProducts orders={orders?.data || []} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
          handleDelteMany={handleDeleteManyOrders}
          onRow={(record) => {
            return {
              onClick: () => {
                console.log(record._id)
              }
            }
          }} />
      </div>
    </div>
  )
}

export default OrderAdmin