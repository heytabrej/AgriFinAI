import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
   <footer className="bg-gray-600 text-white p-6 mt-10 text-center">
   <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
     {/* Quote or Branding */}
     <p className="text-sm md:text-base">"Cultivating the Future, One Harvest at a Time."</p>
     
     {/* Navigation Links */}
     <div className="flex space-x-6 mt-4 md:mt-0">
       <Link href="/privacy" className="hover:text-yellow-300">Privacy Policy</Link>
       <Link href="/terms" className="hover:text-yellow-300">Terms of Service</Link>
       <Link href="/contact" className="hover:text-yellow-300">Contact Us</Link>
     </div>
   </div>
   
   {/* Copyright */}
   <p className="text-sm mt-4">&copy; {new Date().getFullYear()} AgroApp. All Rights Reserved.</p>
 </footer>
  )
}

export default Footer