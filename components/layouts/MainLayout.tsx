"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MenuIcon, X } from "lucide-react"
import Sidebar from "../organisms/Sidebar"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-yellow-100 text-yellow-800 text-center py-2 z-50 font-semibold text-sm">
          This system can only be updated on desktop
        </div>
      )}
      {/* Header */}
      <Header username="Cooper Rosser" initials="CR" />

      <div className="flex flex-1 relative">
        {/* Mobile sidebar toggle */}
        
        <div className="hidden fixed top-20 left-4 z-50">
          <button onClick={toggleSidebar} className="bg-white p-2 rounded-md shadow-md">
            {sidebarOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:relative flex flex-col  z-40 transition-transform duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 bg-gray-100 transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-0" : "ml-0"}`}
        >
          <main className="p-4 md:p-6">
            {isMobile ? (
              <div className="text-center text-gray-600 mt-10 font-medium">
                This system can only be updated on desktop.
              </div>
            ) : (
              children
            )}
          </main>
          <Footer companyName="PT. Bosnet Distribution Indonesia" />
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && isMobile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)}></div>
        )}
      </div>
    </div>
  )
}

export default MainLayout
