import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Input, Space } from "antd";
import { PlusOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../Message/Message";
import { Select } from "antd";
import OrderCell from "../OrderCell/OrderCell";
import { EditOutlined } from "@ant-design/icons";

const AdminProductType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [rowSelected, setRowSelected] = useState("");
  const [sortType, setSortType] = useState(() => {
    return localStorage.getItem("productTypeSort") || "manual";
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTypeName, setEditTypeName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleOpenEdit = (record) => {
    setEditId(record._id);
    setEditTypeName(record.type);
    setIsEditOpen(true);
  };

  const handleUpdateType = async () => {
    if (!editTypeName) return message.error("Nhập tên loại sản phẩm");

    const res = await ProductService.updateProductType(editId, {
      type: editTypeName,
    });

    if (res?.status === "OK") {
      message.success("Cập nhật thành công");
      setIsEditOpen(false);
      setEditId(null);
      setEditTypeName("");
      queryClient.invalidateQueries(["product-types"]);
    }
  };

  const searchInput = useRef(null);

  const queryClient = useQueryClient();

  const fetchTypes = async () => {
    const res = await ProductService.getAllTypeProduct(sortType);
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product-types", sortType],
    queryFn: fetchTypes,
  });

  const handleCreateType = async () => {
    if (!typeName) return message.error("Nhập tên loại sản phẩm");

    const res = await ProductService.createProductType({ type: typeName });

    if (res?.status === "OK") {
      message.success("Thêm loại sản phẩm thành công");
      setIsOpen(false);
      setTypeName("");
      queryClient.invalidateQueries(["product-types"]);
    }
  };

  const handleDeleteType = async (id) => {
    const res = await ProductService.deleteProductType(id);
    if (res?.status === "OK") {
      message.success("Xóa thành công");
      queryClient.invalidateQueries(["product-types"]);
    }
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            onClick={() => handleSearch(selectedKeys, confirm)}
          >
            Search
          </Button>
          <Button size="small" onClick={() => handleReset(clearFilters)}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Tên loại",
      dataIndex: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Thứ tự",
      dataIndex: "order",
      render: (value, record) => (
        <OrderCell
          value={value}
          record={record}
          queryClient={queryClient}
        />
      )
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
            onClick={() => handleDeleteType(record._id)}
          />
          <EditOutlined
            style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
            onClick={() => handleOpenEdit(record)}
          />
        </Space>
      ),
    }
  ];

  const dataTable =
  data?.data?.map((item) => ({
    ...item,
    key: item._id,
  })) || [];

  useEffect(() => {
    const fetchSort = async () => {
      const res = await ProductService.getTypeSortSetting()
      if (res?.status === 'OK') {
        setSortType(res.value)
      }
    }
    fetchSort()
  }, [])

  const handleChangeSort = async (value) => {
    setSortType(value)
    await ProductService.updateTypeSortSetting(value)
  }

  return (
    <div>
      <h2>Quản lý loại sản phẩm</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 20 }}
        onClick={() => setIsOpen(true)}
      >
        Thêm loại sản phẩm
      </Button>
      <Select
        value={sortType}
        style={{ width: 180, marginBottom: 20, marginLeft: 20 }}
        onChange={handleChangeSort}
        options={[
          { value: "manual", label: "Thứ tự tùy chỉnh" },
          { value: "newest", label: "Mới nhất → Cũ nhất" },
          { value: "oldest", label: "Cũ nhất → Mới nhất" },
          { value: "az", label: "Tên A → Z" },
          { value: "za", label: "Tên Z → A" },
        ]}
      />
      <TableComponent
        columns={columns}
        data={dataTable}
        isLoading={isLoading}
        onRow={(record) => ({
          onClick: () => {
            setRowSelected(record._id);
          },
        })}
      />

      <Modal
        title="Thêm loại sản phẩm"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={handleCreateType}
      >
        <Input
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          placeholder="Nhập loại sản phẩm"
        />
      </Modal>
      <Modal
        title="Chỉnh sửa loại sản phẩm"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onOk={handleUpdateType}
      >
        <Input
          value={editTypeName}
          onChange={(e) => setEditTypeName(e.target.value)}
          placeholder="Nhập tên loại sản phẩm"
        />
      </Modal>
    </div>
  );
};

export default AdminProductType;