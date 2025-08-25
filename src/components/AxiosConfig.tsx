'use client'

import { useEffect } from 'react'
import axios from 'axios'
// import {dotenv} from 'dotenv'

// dotenv.config()
export default function AxiosConfig() {
    useEffect(() => {
        // Configure axios defaults
        axios.defaults.withCredentials = true
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
        console.log('axios base url', axios.defaults.baseURL)
        // Add request interceptor
        axios.interceptors.request.use(
            (config) => {
                // Cookies are automatically sent with withCredentials: true
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

    }, [])

    return null
}