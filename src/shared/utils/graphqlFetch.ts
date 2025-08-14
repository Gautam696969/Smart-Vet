import axios, { AxiosRequestConfig } from 'axios'
import Auth from '../../query/Auth'
import { Phone } from 'lucide-react'
import { N } from 'vitest/dist/reporters-w_64AS5f.js'

export const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT ||
  'https://auth.vetwise.live/graphql'
export const GRAPHQL_TOKEN_ENDPOINT =
  import.meta.env.VITE_REACT_APP_GRAPHQL_TOKEN_ENDPOINT ||
  `https://api.vetwise.live/graphql`

export async function restFetch(
  url: string,
  options?: AxiosRequestConfig,
  token?: string
) {
  const headers: Record<string, any> = {
    Accept: 'application/json',
    ...(options?.headers || {})
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  try {
    const response = await axios({
      url,
      ...options,
      headers
    })
    return response.data
  } catch (err: any) {
    if (err.response) {
      throw new Error(
        `HTTP ${err.response.status}: ${
          err.response.data?.message || err.response.statusText
        }`
      )
    } else if (err.request) {
      throw new Error('Network error: No response received')
    } else {
      throw new Error(`Network error: ${err.message}`)
    }
  }
}

export function graphqlRequest(query: string, variables?: any, token?: string) {
  let url = GRAPHQL_TOKEN_ENDPOINT
  if (token) {
    url = GRAPHQL_TOKEN_ENDPOINT
  } else {
    url = GRAPHQL_ENDPOINT
  }

  return restFetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: 'application/json'
      },
      data: { query, variables }
    },
    token
  )
}

// Usage: signUp using restFetch and default GRAPHQL_ENDPOINT
export async function signUp(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  timezone: string,
  tenantId: number = 1
) {
  const query = Auth.signup
  const variables = { firstname, lastname, email, password, timezone, tenantId }

  return graphqlRequest(query, variables)
}

export async function login(email: string, password: string) {
  const query = Auth.authLogin
  const variables = { email, password }

  return graphqlRequest(query, variables)
}

export async function verifyToken(token: string) {
  const query = Auth.verifyToken
  const variables = { token }

  return graphqlRequest(query, variables)
}

export async function forgotPassword(email: string) {
  const query = Auth.forgetPassword
  const variables = { email }

  return graphqlRequest(query, variables)
}

export async function resetPassword(newPassword: string, token?: string) {
  const query = Auth.resetpassword
  const variables = { newPassword }

  return graphqlRequest(query, variables, token)
}

export async function getClient(
  tenantId: number,
  isDeleted: boolean,
  pageNumber: number,
  pageSize: number,
  searchFor: string,
  token: string
) {
  const query = Auth.getClient
  const variables = { tenantId, isDeleted, pageNumber, pageSize, searchFor }

  return graphqlRequest(query, variables, token)
}

export async function createEmployee(
  tenantId: number,
  firstName: string,
  lastName: string,
  email: string,
  timezone: string,
  token: string,
  phone: number,
  userId: string
) {
  const query = Auth.createEmployee
  const variables = {
    tenantId,
    firstName,
    lastName,
    email,
    timezone,
    token,
    phone,
    userId
  }

  return graphqlRequest(query, variables, token)
}

export async function employeeDetails(id: string, token: string) {
  const query = Auth.employeeDetails
  const variables = {
    id,
    token
  }
  return graphqlRequest(query, variables, token)
}
