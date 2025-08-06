export interface UserData {
  accessToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    fullName: string
  }
}

/**
 * Stores authentication data in localStorage
 * @param userData - User data containing access token and user information
 */
export const setAuthData = (userData: UserData): void => {
  try {
    localStorage.setItem('authToken', userData?.accessToken)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(userData?.user))
  } catch (error) {
    console.error('Failed to store authentication data:', error)
  }
}

/**
 * Retrieves authentication data from localStorage
 * @returns Object containing auth token, authentication status, and user data
 */
export const getAuthData = (): {
  authToken: string | null
  isAuthenticated: boolean
  user: any | null
} => {
  try {
    const authToken = localStorage.getItem('authToken')
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null

    return {
      authToken,
      isAuthenticated,
      user
    }
  } catch (error) {
    console.error('Failed to retrieve authentication data:', error)
    return {
      authToken: null,
      isAuthenticated: false,
      user: null
    }
  }
}

/**
 * Clears all authentication data from localStorage
 */
export const clearAuthData = (): void => {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Failed to clear authentication data:', error)
  }
}



