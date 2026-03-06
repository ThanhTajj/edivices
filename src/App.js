import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { routes } from './routes'
import { isJsonString } from './utils'
import jwt_decode from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {
    const token = user?.access_token || localStorage.getItem('access_token')
    if (!token) return { decoded: null, storageData: null }
    try {
      const parsedToken = isJsonString(token) ? JSON.parse(token) : token
      const decoded = jwt_decode(parsedToken)
      return { decoded, storageData: parsedToken }
    } catch {
      return { decoded: null, storageData: null }
    }
  }

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date()
      const { decoded } = handleDecoded()
      let storageRefreshToken = localStorage.getItem('refresh_token')
      if (!storageRefreshToken) {
        return config
      }
      let refreshToken
      try {
        refreshToken = JSON.parse(storageRefreshToken)
      } catch {
        return config
      }
      if (!refreshToken) return config
      let decodedRefreshToken
      try {
        decodedRefreshToken = jwt_decode(refreshToken)
      } catch {
        return config
      }
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken)
          config.headers['token'] = `Bearer ${data?.access_token}`
        } else {
          dispatch(resetUser())
        }
      }
      return config
    },
    (err) => Promise.reject(err)
  )

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }

  return (
    <div style={{height: '100vh', width: '100%'}}>
      <Loading isLoading={isLoading}>
        <Router>
          <ScrollToTop />
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App