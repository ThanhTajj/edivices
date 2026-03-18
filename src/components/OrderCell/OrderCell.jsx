import React, { useState, useEffect } from "react"
import { Input, Button } from "antd"
import * as ProductService from "../../services/ProductService"
import * as message from "../Message/Message"

const OrderCell = ({ value, record, queryClient }) => {
  const [orderValue, setOrderValue] = useState(value)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setOrderValue(value)
  }, [value])

  const handleSave = async () => {
    try {
      if (Number(orderValue) === Number(value)) {
        return
      }

      setLoading(true)

      const res = await ProductService.updateProductType(record._id, {
        order: Number(orderValue)
      })

      if (res?.status === "OK") {
        message.success("Cập nhật thứ tự thành công")
        queryClient.invalidateQueries(["product-types"])
      } else {
        message.error("Cập nhật thất bại")
      }
    } catch (error) {
      message.error("Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Input
        type="number"
        value={orderValue}
        onChange={(e) => setOrderValue(e.target.value)}
        style={{ width: 80 }}
      />
      <Button
        type="primary"
        loading={loading}
        disabled={Number(orderValue) === Number(value)}
        onClick={handleSave}
      >
        Lưu
      </Button>
    </div>
  )
}

export default OrderCell