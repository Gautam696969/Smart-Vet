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

const Auth = {
  authLogin,
  forgetPassword,
  signup,
  verifyToken,
  resetpassword
}

export default Auth
