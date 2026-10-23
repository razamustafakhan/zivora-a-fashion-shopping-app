import React from 'react'
import { AuthProvider } from './context/auth.context'

const StoreProvider = ({children}) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default StoreProvider