// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt"

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.sessionStorage.getItem("userData")

  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

const initialRole = () => {
  const item = window.sessionStorage.getItem("userRole")
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}
export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: initialUser(),
    userRole: initialRole(),
  },
  reducers: {
    handleUser: (state, action) => {
      state.userRole = action.payload

      state[config.emailName] = action.payload[config.emailName]
      // state[config.tokenState] = action.payload[config.tokenState];

      state[config.roleName] = action.payload[config.roleName]
      sessionStorage.setItem("userRole", JSON.stringify(action.payload))

      sessionStorage.setItem(
        config.emailName,
        JSON.stringify(action.payload.email)
      )
      sessionStorage.setItem(config.roleName, JSON.stringify(action.payload.role))
      // sessionStorage.setItem(
      //   config.tokenState,
      //   JSON.stringify(action.payload.token)
      // );
    },
    handleLogin: (state, action) => {
      state.userData = action.payload
      state[config.storageTokenKeyName] =
        action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] =
        action.payload[config.storageRefreshTokenKeyName]
      state[config.token] = action.payload[config.token]
      sessionStorage.setItem("userData", JSON.stringify(action.payload))
      sessionStorage.setItem(
        config.storageTokenKeyName,
        JSON.stringify(action.payload.token)
      )
      sessionStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(action.payload.token)
      )
      sessionStorage.setItem(config.token, JSON.stringify(action.payload.token))
    },

    handleLogout: (state) => {
      state.userData = {}
      state.userRole = {}
      state[config.accessToken] = {}
      state[config.refreshToken] = null
      state[config.token] = {}
      state[config.storageTokenKeyName] = {}
      state[config.storageRefreshTokenKeyName] = {}

      // ** Remove user, accessToken & refreshToken from sessionStorage
      sessionStorage.removeItem("userData")
      sessionStorage.removeItem("userRole")
      sessionStorage.removeItem(config.token)
      sessionStorage.removeItem(config.accessToken)
      sessionStorage.removeItem(config.refreshToken)
      sessionStorage.removeItem(config.storageTokenKeyName)
      sessionStorage.removeItem(config.storageRefreshTokenKeyName)
    },
  },
})

export const { handleLogin, handleLogout, handleUser } = authSlice.actions

export default authSlice.reducer
