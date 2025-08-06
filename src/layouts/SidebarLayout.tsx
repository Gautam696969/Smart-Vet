import React, { useState } from 'react'
import Sidebar from '../shared/components/Sidebar'
import CommonHeader from '../shared/components/CommonHeader'

interface SidebarLayoutProps {
  children: React.ReactNode
  onLogout?: () => void
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  onLogout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev)
  }
  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Common Header */}
      <CommonHeader onMenuClick={handleMenuClick} onLogout={onLogout} />
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        isMobileOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out flex-1 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } pt-14`}
        style={{ minWidth: 0 }}
      >
        {/* Main Content */}
        <main className="p-4">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default SidebarLayout
