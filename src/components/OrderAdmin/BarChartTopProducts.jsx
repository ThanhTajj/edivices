import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const BarChartTopProducts = ({ orders }) => {
    // Tính số lượng bán của từng sản phẩm từ danh sách đơn hàng
    const productMap = {}
        ; (orders || []).forEach((order) => {
            ; (order.orderItems || []).forEach((item) => {
                const name = item.name || 'Không rõ'
                if (!productMap[name]) productMap[name] = 0
                productMap[name] += item.amount || 1
            })
        })

    const data = Object.entries(productMap)
        .map(([name, amount]) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)

    if (data.length === 0) {
        return <div style={{ textAlign: 'center', color: '#999', paddingTop: 40 }}>Chưa có dữ liệu</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => [`${value} sản phẩm`, 'Số lượng bán']} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartTopProducts
