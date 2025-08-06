import { useEffect, useState } from 'react'
import { verifyToken } from './graphqlFetch'

function useAuthGuard(redirectOnSuccess = false) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')

        if (!token) {

          localStorage.clear()
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          return
        }

        const res = await verifyToken(token)


        if (res?.data?.verifyToken?.status === 200) {

          setIsAuthenticated(true)

          // Only redirect to home if explicitly requested (useful for login page)
          if (redirectOnSuccess) {
            window.location.href = '/'
          }
        } else {

          localStorage.clear()
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        localStorage.clear()
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [redirectOnSuccess])

  return { isLoading, isAuthenticated }
}

export default useAuthGuard
