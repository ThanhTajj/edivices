import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    return columns
      .filter(col => col.dataIndex && col.dataIndex !== 'action')
      .map(col => {
        if (col.dataIndex === 'image') {
          return {
            title: 'Image URL',
            dataIndex: 'image'
          }
        }
        return {
          title: col.title,
          dataIndex: col.dataIndex
        }
      })
  }, [columns])

  const dataExport = useMemo(() => {
    return dataSource.map(item => ({
      ...item,

      image: item.image || '',

      description: item.description || '',
      discount: item.discount || 0
    }))
  }, [dataSource])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys)
  }

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("Products")
      .addColumns(newColumnExport)
      .addDataSource(dataExport, {
        str2Percent: true
      })
      .saveAs("Products.xlsx");
  };
  
  return (
    <Loading isLoading={isLoading}>
      {!!rowSelectedKeys.length && (
        <div style={{
          background: '#1d1ddd',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      <button onClick={exportExcel}>Export Excel</button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  )
}

export default TableComponent