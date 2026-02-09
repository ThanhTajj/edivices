import * as XLSX from 'xlsx'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as ProductService from '../../services/ProductService'
import * as message from '../../components/Message/Message'
import { useRef } from 'react'

const ImportProductExcel = ({ token, onSuccess }) => {
  const fileRef = useRef(null)

  const handleClick = () => {
    fileRef.current.click()
  }

  const validateProduct = (item, index) => {
    const row = index + 2

    if (!item.name) return `Dòng ${row}: Thiếu name`
    if (!item.image) return `Dòng ${row}: Thiếu image`
    if (!item.type) return `Dòng ${row}: Thiếu type`

    if (isNaN(item.price) || Number(item.price) <= 0)
      return `Dòng ${row}: price không hợp lệ`

    if (isNaN(item.countInStock) || Number(item.countInStock) < 0)
      return `Dòng ${row}: countInStock không hợp lệ`

    if (
      item.rating !== undefined &&
      (isNaN(item.rating) || Number(item.rating) < 0 || Number(item.rating) > 5)
    )
      return `Dòng ${row}: rating phải từ 0–5`

    if (
      item.discount !== undefined &&
      (isNaN(item.discount) || Number(item.discount) < 0 || Number(item.discount) > 100)
    )
      return `Dòng ${row}: discount phải từ 0–100`

    return null
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    e.target.value = null
    if (!file) return

    const reader = new FileReader()

    reader.onload = async (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const products = XLSX.utils.sheet_to_json(sheet, { defval: '' })

        if (!products.length) {
          message.error('File Excel không có dữ liệu')
          return
        }

        const errors = []
        products.forEach((item, index) => {
          const err = validateProduct(item, index)
          if (err) errors.push(err)
        })

        if (errors.length) {
          const errorText =
            errors.slice(0, 3).join('\n') +
            (errors.length > 3 ? '\n...' : '')

          message.error(errorText)
          return
        }

        let successCount = 0
        const failed = []

        for (const item of products) {
        const res = await ProductService.createProduct(
            {
            name: item.name,
            price: Number(item.price),
            rating: item.rating !== '' ? Number(item.rating) : 5,
            countInStock: Number(item.countInStock),
            type: item.type,
            brand: item.brand || '',
            discount: item.discount !== '' ? Number(item.discount) : 0,
            image: item.image,
            description: item.description || '',
            },
            token
        )

        if (res?.status === 'OK') {
            successCount++
        } else {
            failed.push({
            name: item.name,
            message: res?.message || 'Lỗi không xác định'
            })
        }
        }

        if (failed.length === 0) {
            message.success(`Import thành công ${successCount} sản phẩm`)
        } else {
            message.warning(
                `Import thành công ${successCount}/${products.length} sản phẩm.\n` +
                failed.slice(0, 3).map(f => `${f.name}: ${f.message}`).join('\n')
            )
        }
        if (successCount > 0) {
            onSuccess?.()
        }
      } catch (err) {
        console.error('IMPORT ERROR:', err?.response?.data || err)
        message.error(err?.response?.data?.message || 'Import thất bại')
      }
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <>
      <input
        type="file"
        accept=".xlsx,.xls"
        hidden
        ref={fileRef}
        onChange={handleImport}
      />

      <Button icon={<UploadOutlined />} onClick={handleClick}>
        Import Excel
      </Button>
    </>
  )
}

export default ImportProductExcel
