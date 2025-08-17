export default function HeaderTop() {
    return (
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <img src="/mainlogonew.png" alt="Header Icon" className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center pl-14 mt-2">
            <img src="/charchagramtextnew.png" alt="CharchaGram Logo" className="w-[full] h-[30px] mx-auto" />
          </div>
          <div className="flex items-center space-x-3">
            {/* <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src="/usericon.svg" alt="User Profile" className="w-5 h-5" />
            </div> */}
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    )
  }