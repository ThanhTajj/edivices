import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';
import { TableButtonWrapper } from './style';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    return columns
      .filter(col => col.dataIndex && col.dataIndex !== 'action')
      .map(col => ({
        title: col.title,
        dataIndex: col.dataIndex
      }))
  }, [columns])

  const safeData = Array.isArray(dataSource) ? dataSource : [];
  const dataExport = useMemo(() => {
    return safeData.map(item => ({
      ...item,

      image: item.image?.startsWith('data:')
        ? 'Base64 image (not exported)'
        : item.image || '',

      description: item.description || '',
      discount: item.discount || 0
    }))
  }, [dataSource])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
  };
  
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys)
  }

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("exported data")
      .addColumns(newColumnExport)
      .addDataSource(dataExport)
      .saveAs("Excel.xlsx");
  };
  
  return (
    <Loading isLoading={isLoading}>
      <TableButtonWrapper onClick={exportExcel}>Export Excel</TableButtonWrapper>
      {!!rowSelectedKeys.length && (
        <div style={{
          background: '#1d1ddd',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer',
          width: '100px',
        }}
          onClick={handleDeleteAll}
        >
          Xóa đã chọn ({rowSelectedKeys.length})
        </div>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 6,
          ...props.pagination,
          hideOnSinglePage: true
        }}
        {...props}
      />
    </Loading>
  )
}

export default TableComponent