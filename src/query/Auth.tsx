const authLogin = `mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
        error
        message
        refreshToken
        status
        user {
            email
            firstName
            fullName
            id
            lastName
        }
      }
    }
  `

const forgetPassword = `mutation ForgotPassword($email: String!) {
      forgotPassword(email: $email) {
        cts
        errorCode
        errorMessage
        id
        message
        status
        uts
      }
    }
  `

const signup = `
  mutation Signup($firstname: String!, $lastname: String!, $email: String!, $password: String!, $timezone: String!, $tenantId: Int!) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      timezone: $timezone
      tenantId: $tenantId
    ) {
        error
        message
        status
    }
  }
`

const verifyToken = `mutation VerifyToken($token: JWT!) {
    verifyToken(
        token: $token
    ) {
        cts
        errorCode
        errorMessage
        id
        message
        status
        uts
        data {
            cts
            id
            uts
        }
    }
}`

const resetpassword = `query ResetPassword($newPassword: String!) {
    resetPassword(newPassword: $newPassword) {
        cts
        errorCode
        errorMessage
        id
        message
        status
        uts
    }
}
`
const getClient = `
query GetClient(
  $tenantId: Int!,
  $isDeleted: Boolean!,
  $pageNumber: Int!,
  $pageSize: Int!,
  $searchFor: String!

) {
  getClient(
    tenantId: $tenantId,
    isDeleted: $isDeleted,
    pageNumber: $pageNumber,
    pageSize: $pageSize,
    searchFor: $searchFor
  ) {
    errorCode
    errorMessage
    message
    status
    totalCount
    data {
      address_id
      created_at
      deleted_at
      first_name
      id
      last_name
      name
      timezone
      phone_number
      phone_number_country_code
      tenant_id
      updated_at
      user_id
      email
    }
  }
}
`;
const createEmployee = `
mutation AddClient(
  $tenantId: Int!,
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $timezone: String!,
  $userId: String!
) {
  addClient(
    tenantId: $tenantId,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    timezone: $timezone,
    userId: $userId
  ) {
    message
    status
  }
}
`;


const Auth = {
  authLogin,
  forgetPassword,
  signup,
  verifyToken,
  resetpassword,
  getClient,
  createEmployee
}

export default Auth


