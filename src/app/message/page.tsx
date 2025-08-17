'use client'
import { useRouter } from "next/navigation";

export default function MessagePage() {
  const router = useRouter();

  return (
    <div className="h-[90vh] bg-[#939cab] flex items-center my-auto justify-center">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#273F4F] mb-2">चर्चा मंच जल्द आ रहा है</h2>
        <p className="text-gray-600 mb-4">हम जल्द ही आपके लिए एक बेहतरीन चर्चा मंच लेकर आएंगे</p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#273F4F] text-white px-6 py-2 rounded-lg hover:bg-[#1e2f3a] transition-colors"
        >
          होम पेज पर जाएं
        </button>
      </div>
    </div>
  )
}
