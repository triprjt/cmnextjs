'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { LoadingSpinner } from '@/components/Loadingspinner'

export default function LoginPage() {
    const router = useRouter()
    const [mobileNumber, setMobileNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const mobileRegex = /^[6-9]\d{9}$/

    const validateMobileNumber = (mobile: string): boolean => {
        if (!mobile) {
            setError('मोबाइल नंबर आवश्यक है')
            return false
        }

        if (!mobileRegex.test(mobile)) {
            setError('कृपया एक वैध भारतीय मोबाइल नंबर दर्ज करें (10 अंक, 6-9 से शुरू)')
            return false
        }

        setError(null)
        return true
    }

    const handleSubmit = async () => {
        if (!validateMobileNumber(mobileNumber)) {
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.post('/login', {
                phoneNumber: mobileNumber.trim(),
            });
            // Redirect to home page after successful login
            router.push('/');
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'लॉगिन में त्रुटि हुई';
            setError(errorMessage);

            // Navigate to login/register page when login fails
            setTimeout(() => {
                router.push('/login/register');
            }, 2000); // Wait 2 seconds to show error message
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        router.push('/')
    }

    return (
        <div className="min-h-screen relative bg-[#F6F6F6] flex justify-center px-2">
            <div className="bg-[#F6F6F6] rounded-lg w-full p-4">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* User icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#273F4F] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                </div>

                {/* Main title */}
                <h1 className="text-2xl font-bold text-[#273F4F] text-center mb-2">
                    आपका चुनावी साथी
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 text-center mb-8">
                    लोकतंत्र में भागीदारी का नया तरीका
                </p>

                {/* Form Container */}
                <div className="space-y-6">
                    {/* Mobile Number */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            मोबाइल नंबर
                        </label>
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="10 अंकों का मोबाइल नंबर"
                            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#273F4F] focus:border-transparent"
                            maxLength={10}
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Login button */}
                    <button
                        type="button"
                        disabled={loading}
                        className="w-full bg-[#273F4F] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1e2f3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        onClick={handleSubmit}
                    >
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                </svg>
                                लॉगिन करें
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}