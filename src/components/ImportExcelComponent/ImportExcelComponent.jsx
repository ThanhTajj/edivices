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

    if (!item.name?.trim()) return `Dòng ${row}: Thiếu name`
    if (!item.type?.trim()) return `Dòng ${row}: Thiếu type`
    if (!item.image?.trim()) return `Dòng ${row}: Thiếu image`

    try {
      new URL(item.image)
    } catch {
      return `Dòng ${row}: Image không phải URL`
    }

    if (item.price === '' || isNaN(item.price) || Number(item.price) <= 0)
      return `Dòng ${row}: price không hợp lệ`

    if (item.countInStock === '' || isNaN(item.countInStock) || Number(item.countInStock) < 0)
      return `Dòng ${row}: countInStock không hợp lệ`

    if (
      item.rating !== '' &&
      (isNaN(item.rating) || Number(item.rating) < 0 || Number(item.rating) > 5)
    )
      return `Dòng ${row}: rating phải từ 0–5`

    if (
      item.discount !== '' &&
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

        const rawProducts = XLSX.utils.sheet_to_json(sheet, { defval: '' })

        const products = rawProducts.map(item => ({
          name: item.Name,
          price: item.Price,
          rating: item.Rating,
          countInStock: item['In Stock'],
          type: item.Type,
          brand: item.Brand,
          discount: item['Discount (%)'],
          image: item.Image,
          description: item.Description
        }))

        if (!products.length) {
          message.error('File Excel không có dữ liệu')
          return
        }

        const validProducts = []
        const errors = []

        products.forEach((item, index) => {
          const err = validateProduct(item, index)
          if (err) {
            errors.push(err)
          } else {
            validProducts.push(item)
          }
        })

        let successCount = 0
        const failed = []

        for (const item of validProducts) {
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
            failed.push(`${item.name}: ${res?.message || 'Lỗi không xác định'}`)
          }
        }

        const total = products.length

        const summary =
          `Import thành công ${successCount}/${total} sản phẩm.\n` +
          (errors.length
            ? '\nLỗi validate:\n' + errors.slice(0, 5).join('\n')
            : '') +
          (failed.length
            ? '\n\nLỗi server:\n' + failed.slice(0, 5).join('\n')
            : '')

        if (successCount === total) {
          message.success(summary)
        } else {
          message.warning({
            content: (
              <div style={{ whiteSpace: 'pre-line' }}>
                {summary}
              </div>
            ),
            duration: 6
          })
        }

        if (successCount > 0) {
          onSuccess?.()
        }

      } catch (err) {
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