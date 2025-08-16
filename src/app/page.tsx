import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background circles with exact specs */}

      {/* <div className="absolute w-16 h-16 top-32 left-61 border-2 border-[#273F4F] rounded-full opacity-10"></div>
      <div className="absolute w-12 h-12 top-[439px] left-[97.5px] border-2 border-[#273F4F] rounded-full opacity-10"></div> */}


      {/* App Header */}


      {/* Main Banner Area */}
      <div className="bg-[#273F4F] px-4 py-6 text-white relative overflow-visible h-[90vh]">
        {/* Background Circles */}
        <div className="absolute w-[80px] h-[80px] top-[40px] left-[40px] z-10 border-2 border-[#FFFFFF] rounded-full opacity-10"></div>
        <div className="absolute w-[64px] h-[64px] top-[128px] left-[244px] z-10 border-2 border-[#FFFFFF] rounded-full opacity-10"></div>
        <div className="absolute w-[48px] h-[48px] top-[439px] left-[97.5px] z-10 border-2 border-[#FFFFFF] rounded-full opacity-10"></div>

        {/* Main Title Text - Centered */}
        <div className=" pt-6 ml-20 border border-red-400">
          <h2 className="banner-text mb-1">
            जनता का
          </h2>
          <h2 className="banner-text">
            चुनावी <span className="font-color-orange">साथी</span>
          </h2>
        </div>

        {/* Subtitle Text - Centered */}
        <div className="text-center mb-8 border border-red-400 w-fit pt-2 mt-4 pl-6 ml-4">
          <p className="banner-subtitle mb-2">
            किसने किया है कैसा काम
          </p>
          <p className="banner-subtitle">
            आओ करें चर्चाग्राम
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-200 rounded-lg p-3 mb-8 flex items-center max-w-md mx-auto">
          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="अपना निर्वाचन क्षेत्र खोजें..."
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-600 outline-none"
          />
          <svg className="w-5 h-5 text-gray-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Informational Bullet Points */}
        <div className="space-y-4 text-sm px-4">
          <div className="flex items-start">
            <span className="banner-info-text mr-3 font-bold">जानें</span>
            <span className="banner-info-text">– उम्मीदवारों की संपत्ति, आपराधिक मामले और संसद में भागीदारी</span>
          </div>
          <div className="flex items-start">
            <span className="banner-info-text mr-3 font-bold">रखें</span>
            <span className="banner-info-text">– वर्तमान और पूर्व उम्मीदवारों पर अपनी राय</span>
          </div>
          <div className="flex items-start">
            <span className="banner-info-text mr-3 font-bold">करें</span>
            <span className="banner-info-text">– जनसंवाद, सवाल-जवाब और जवाबदेही तय</span>
          </div>
        </div>
      </div>


      {/* Your Citizen Contribution Section */}
      <div className="bg-gray-100 px-4 py-6">
        <h3 className="text-lg font-semibold text-[#273F4F] mb-2">आपका नागरिक योगदान</h3>
        <p className="text-sm text-gray-600 mb-4">चुनाव में आपकी सक्रिय भागीदारी का डैशबोर्ड</p>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-2xl font-bold text-[#273F4F]">स्तर 3</div>
              <div className="text-sm text-gray-600">सक्रिय नागरिक</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">सक्रियता</div>
              <div className="text-lg font-semibold text-[#273F4F]">78%</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#273F4F] h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#273F4F]">उपलब्धियाँ</h3>
          <span className="text-sm text-gray-500">2/4</span>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#273F4F]">पहला वोट</div>
                <div className="text-sm text-gray-600">पहली बार मतदान किया</div>
                <div className="text-blue-600 text-sm">जानकारी दें</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#273F4F]">चर्चाओं में भागीदारी</div>
                <div className="text-sm text-gray-600">10+ चर्चाओं में भाग लिया</div>
                <div className="text-sm text-gray-500">22 मार्च 2025</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26c-.3.4-.47.88-.47 1.4V20h6z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#273F4F]">नई चर्चा की पहल</div>
                <div className="text-sm text-gray-600">50+ चर्चा शुरू की</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#273F4F]">नागरिक प्रेरक</div>
                <div className="text-sm text-gray-600">5+ नए सदस्यों का मार्गदर्शन</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discussed Assembly Section */}
      <div className="px-4 py-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-[#273F4F] mb-4">चर्चित विधानसभा</h3>

        <div className="space-y-4">
          {/* Candidate 1 */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 relative">
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              10+ सक्रिय चर्चा
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-500">राघोपुर</div>
              <div className="text-lg font-semibold text-[#273F4F]">तेजस्वी यादव</div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <span className="text-sm text-gray-600">राष्ट्रीय जनता दल</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">15 वर्ष पद अनुभव</div>
              <div className="text-sm text-gray-600">एम.ए. राजनीति विज्ञान शिक्षा</div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">क्या आप पिछले पाँच साल के कार्यकाल से संतुष्ट है?</div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                </svg>
                <span className="text-sm font-medium text-green-600">78% संतुष्ट</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">घोषणापत्र वादा स्कोर: 80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#273F4F] h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
              </svg>
              <span className="text-sm text-gray-600">सड़क सुधार परियोजना का शुभारंभ 2 दिन पहले</span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex-1 bg-[#273F4F] text-white py-2 px-4 rounded-lg text-sm font-medium">
                विस्तार से देखे
              </button>
              <button className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Candidate 2 */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 relative">
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              10+ सक्रिय चर्चा
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-500">जलालपुर</div>
              <div className="text-lg font-semibold text-[#273F4F]">जनार्दन सिंह सिग्रीवाल</div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <span className="text-sm text-gray-600">भारतीय जनता पार्टी</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">15 वर्ष पद अनुभव</div>
              <div className="text-sm text-gray-600">एम.ए. राजनीति विज्ञान शिक्षा</div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">क्या आप पिछले पांच साल के कार्यकाल से संतुष्ट है ?</div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                </svg>
                <span className="text-sm font-medium text-green-600">78% संतुष्ट</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">घोषणापत्र वादा स्कोरः 80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#273F4F] h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
              </svg>
              <span className="text-sm text-gray-600">सड़क सुधार परियोजना का शुभारंभ 2 दिन पहले</span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex-1 bg-[#273F4F] text-white py-2 px-4 rounded-lg text-sm font-medium">
                विस्तार से देखे
              </button>
              <button className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* View All Candidates Button */}
        <div className="mt-6">
          <button className="w-full bg-gray-200 text-[#273F4F] py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
            <span>सभी उम्मीदवार देखे</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
