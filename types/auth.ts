// types/auth.ts
export interface FormData {
    email: string
    password: string
    rememberMe: boolean
  }
  
  export interface LoginResponse {
    success: boolean
    message?: string
    token?: string
    user?: {
      id: string
      email: string
      name: string
    }
  }
  