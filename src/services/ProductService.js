import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search, limit) => {
  let url = `${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`

  if (search?.length > 0) {
    url += `&filter=${search}`
  }

  const res = await axios.get(url)
  return res.data
}

export const getProductType = async (type, page = 0, limit = 10) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`,
    {
      params: {
        type,
        page,
        limit
      }
    }
  )
  return res.data
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const rateProduct = async (id, access_token, data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/rate/${id}`,
    data,
    {
      headers:{
        token:`Bearer ${access_token}`
      }
    }
  )
  return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}

export const searchProduct = async (keyword) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`,
    {
      params: {
        filter: keyword,
        limit: 8,
        page: 0
      }
    }
  )
  return res.data
}

export const deleteReview = async (id, token) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/review/${id}`,
    {
      headers:{
        token:`Bearer ${token}`
      }
    }
  )
  return res.data
}
