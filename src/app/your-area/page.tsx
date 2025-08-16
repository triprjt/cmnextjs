export default function YourAreaPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main content */}
      <main className="px-4 py-6">
        <div className="space-y-6">
          {/* Constituency Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-[#273F4F] mb-2">राघोपुर विधानसभा क्षेत्र</h1>
            <p className="text-gray-600 mb-6">आपके क्षेत्र की जानकारी</p>
            
            {/* Candidate Profile Card */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#273F4F]">तेजस्वी यादव</h3>
                  <p className="text-sm text-gray-600">उम्र: 58 वर्ष</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">R</span>
                    </div>
                    <span className="text-sm text-gray-600">राष्ट्रीय जनता दल</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">अंतिम चुनाव: 52.3% वोट</p>
                </div>
              </div>
              <div className="text-right">
                <button className="bg-[#273F4F] text-white px-4 py-2 rounded-lg text-sm font-medium mb-2">
                  विधायक
                </button>
                <p className="text-sm text-gray-600">15 वर्ष पद अनुभव</p>
              </div>
            </div>
          </div>

          {/* Public Satisfaction Poll */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#273F4F] mb-4">क्या आप पिछले पांच साल के कार्यकाल से खुश हैं?</h3>
            <div className="flex space-x-4 mb-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium">हां</button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium">ना</button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">जनता की संतुष्टि</p>
              <p className="text-2xl font-bold text-[#273F4F]">67%</p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">शिक्षा स्तर</p>
              <p className="text-lg font-semibold text-[#273F4F]">स्नातकोत्तर</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">संपत्ति</p>
              <p className="text-lg font-semibold text-[#273F4F]">₹2.4 करोड़</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">आपराधिक मामले</p>
              <p className="text-lg font-semibold text-[#273F4F]">0</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">विधानसभा उपस्थिति</p>
              <p className="text-lg font-semibold text-[#273F4F]">89%</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">सवाल पूछे</p>
              <p className="text-lg font-semibold text-[#273F4F]">47</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">निधि उपयोग</p>
              <p className="text-lg font-semibold text-[#273F4F]">78%</p>
            </div>
          </div>

          {/* Thematic Sections */}
          <div className="space-y-4">
            {/* Health */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#273F4F]">स्वास्थ्य</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">• प्रत्येक गांव में प्राथमिक स्वास्थ्य केंद्र</p>
                <p className="text-sm text-gray-600">• 24/7 एम्बुलेंस सेवा</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">इस विषय पर सरकार के कार्य से आप कितने संतुष्ट हैं ?</p>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${star <= 3.5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">68% लोग इस विषय से संतुष्ट हैं</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>बहुत खराब</span>
                <span>बहुत अच्छा</span>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#273F4F]">शिक्षा</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">• सभी सरकारी स्कूलों में कंप्यूटर लैब</p>
                <p className="text-sm text-gray-600">• मुफ्त किताबें और यूनिफॉर्म</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">इस विषय पर सरकार के कार्य से आप कितने संतुष्ट हैं ?</p>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${star <= 3.5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">68% लोग इस विषय से संतुष्ट हैं</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>बहुत खराब</span>
                <span>बहुत अच्छा</span>
              </div>
            </div>

            {/* Crime */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#273F4F]">अपराध</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">• महिला सुरक्षा हेल्पलाइन</p>
                <p className="text-sm text-gray-600">• हर 5 किमी पर पुलिस चौकी</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">इस विषय पर सरकार के कार्य से आप कितने संतुष्ट हैं ?</p>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${star <= 3.5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">68% लोग इस विषय से संतुष्ट हैं</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>बहुत खराब</span>
                <span>बहुत अच्छा</span>
              </div>
            </div>

            {/* Agriculture */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#273F4F]">कृषि</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">• MSP की गारंटी</p>
                <p className="text-sm text-gray-600">• मुफ्त बीज और खाद वितरण</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">इस विषय पर सरकार के कार्य से आप कितने संतुष्ट हैं ?</p>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${star <= 3.5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">68% लोग इस विषय से संतुष्ट हैं</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>बहुत खराब</span>
                <span>बहुत अच्छा</span>
              </div>
            </div>
          </div>

          {/* Other Major Candidates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#273F4F] mb-2">अन्य प्रमुख उम्मीदवार</h3>
            <p className="text-sm text-gray-600 mb-4">(पिछला चुनाव)</p>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
              <div className="flex-shrink-0 w-32 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-[#273F4F]">राहुल शर्मा</h4>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">C</span>
                  </div>
                  <span className="text-xs text-gray-600">कांग्रेस</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">वोट शेयर: 18.2%</p>
              </div>
              
              <div className="flex-shrink-0 w-32 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-[#273F4F]">उत्कर्ष सिंह</h4>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">B</span>
                  </div>
                  <span className="text-xs text-gray-600">भारतीय जनता पार्टी</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">वोट शेयर: 18.2%</p>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-center space-x-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span className="text-white text-sm">15+ सक्रिय चर्चा • आपके क्षेत्र के चर्चा मंच पर जाएं</span>
          </div>
        </div>
      </main>
    </div>
  )
}