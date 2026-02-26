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
            mutationUpdate.mutate({
              id: record._id,
              token: user?.access_token,
              status: newStatus
            })
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

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{height: 200, width:200}}>
        <PieChartComponent data={orders?.data || []} />
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
          }}/>
      </div>
    </div>
  )
}

export default OrderAdmin