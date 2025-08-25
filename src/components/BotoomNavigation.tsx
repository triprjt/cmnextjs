'use client';

import { usePathname } from 'next/navigation';
import Link from "next/link"; // Add this import

export default function BottomNavigation() {
  const pathname = usePathname();

  const getSelectedNav = () => {
    if (pathname === '/' ) return 'home';
    if (pathname.startsWith('/message') ) return 'message';
    if (pathname === '/newPost' ) return 'message';
    if (pathname === '/your-area') return 'your-area';
    return 'home';
  };
  console.log('getSelectedNav() ', getSelectedNav());
  const selectedNav = getSelectedNav();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16 px-4">
        {/* Home - Selected State with light grey background */}
        <Link href="/" className="flex flex-col items-center space-y-1">
          <div className={`w-16 h-8 ${selectedNav === 'home' ? 'bg-[#E4E6E8]' : 'bg-transparent'} rounded-full flex items-center justify-center`}>
            <img src="/homeicon.svg" alt="Home" className="w-6 h-6" />
          </div>
          <span className={`text-xs ${selectedNav === 'home' ? 'font-semibold' : 'font-medium'} text-black`}>होम</span>
        </Link>
        
        {/* Discussion Forum - Not Selected */}
        <Link href="/message" className="flex flex-col items-center space-y-1">
          <div className={`w-16 h-8 ${selectedNav === 'message' ? 'bg-[#E4E6E8]' : 'bg-transparent'} rounded-full flex items-center justify-center`}>
            <img src="/charchaicon.svg" alt="Discussion Forum" className="w-6 h-6" />
          </div>
          <span className={`text-xs ${selectedNav === 'message' ? 'font-semibold' : 'font-medium'} text-black`}>चर्चा मंच</span>
        </Link>
        
        {/* Your Area - Not Selected */}
        <Link href="/your-area" className="flex flex-col items-center space-y-1">
          <div className={`w-16 h-8 ${selectedNav === 'your-area' ? 'bg-[#E4E6E8]' : 'bg-transparent'} rounded-full flex items-center justify-center`}>
            <img src="/yourareaicon.svg" alt="Your Area" className="w-6 h-6" />
          </div>
          <span className={`text-xs ${selectedNav === 'your-area' ? 'font-semibold' : 'font-medium'} text-black`}>आपका क्षेत्र</span>
        </Link>
      </div>
    </nav>
  )
}