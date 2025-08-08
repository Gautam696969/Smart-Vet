import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoLocationOutline } from 'react-icons/io5'
import {
  FiLogOut,
  FiGrid,
  FiUsers,
  FiInfo,
  FiVideo,
  FiHome,
  FiLock,

} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { Collapse, IconButton } from '@mui/material'
import { ExpandLess, ExpandMore, QuestionAnswerOutlined, AssignmentIndOutlined, DeviceHubOutlined } from '@mui/icons-material'
import { useCurrentUser } from '../hooks/useCurrentUser'

interface SidebarProps {
  onLogout?: () => void
  isMobileOpen?: boolean
  onClose?: () => void
}

const navSections = [
  {
    label: 'Dashboards',
    icon: <FiGrid />,
    links: [
      { to: '/', label: 'Dashboard', icon: <FiGrid /> },
      { to: '/admin-dashboard', label: 'Admin Dashboard', icon: <FiUsers /> },
      { to: '/doctor-dashboard', label: 'Doctor Dashboard', icon: <FiUsers /> },
      {
        to: '/patient-dashboard',
        label: 'Patient Dashboard',
        icon: <FiUsers />
      }
    ]
  },
  {
    label: 'Management',
    icon: <FiUsers />,
    links: [
      { to: '/home', label: 'Dashboard', icon: <FiHome /> },
      { to: '/users', label: 'Users', icon: <FiUsers /> },
      { to: '/mu', label: 'MU', icon: <FiInfo /> },
      { to: '/device-test', label: 'Device Test', icon: <FiVideo /> },
      { to: '/book-appointment', label: 'Book Appointment', icon: <FiUsers /> },
      { to: '/chat', label: 'Chat', icon: <FiInfo /> },

      { to: '/employees', label: 'Employees', icon: <FiInfo /> },

      { to: '/messages', label: 'Messages', icon: <QuestionAnswerOutlined /> },
      { to: '/clients', label: 'Clients', icon: <AssignmentIndOutlined /> },
      { to: '/services', label: 'Services', icon: <DeviceHubOutlined /> },

      { to: '/myLocation', label: 'My Location', icon: <IoLocationOutline /> },

      {
        to: '/appointments/history',
        label: 'Appointment History',
        icon: <FiInfo />
      },
      {
        to: '/reset-password',
        label: 'Reset Password',
        icon: <FiLock />
      }
    ]
  }
]

const Sidebar: React.FC<SidebarProps> = ({
  onLogout,
  isMobileOpen,
  onClose
}) => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    Dashboards: true,
    Management: false
  })
  const { user } = useCurrentUser()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const closeMobile = () => {
    if (!isMobileOpen && onClose) {
      onClose()
    }
  }

  const handleSectionToggle = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      {/* Overlay for all screens when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 opacity-0 pointer-events-none`}
        aria-hidden="true"
        onClick={closeMobile}
      />
      {/* Sidebar - always rendered for smooth transition on all screens */}
      <div
        className={`
          fixed left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-300 shadow-sm z-40 transition-all duration-700 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isMobileOpen ? 'pointer-events-none' : ''}
        `}
        style={{ top: 64, height: 'calc(100% - 64px)' }}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navSections.map((section) => (
              <div key={section.label}>
                <div
                  className={`
                    flex items-center cursor-pointer px-2 py-2 rounded-lg
                    ${isCollapsed ? 'justify-center' : ''}
                    hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  `}
                  onClick={() => handleSectionToggle(section.label)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={openSections[section.label]}
                  aria-controls={`section-${section.label}`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {!isCollapsed && (
                    <span className="ml-3 font-semibold text-gray-700 dark:text-gray-200">
                      {section.label}
                    </span>
                  )}
                  {!isCollapsed && (
                    <IconButton
                      size="small"
                      sx={{ ml: 'auto', color: 'inherit' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSectionToggle(section.label)
                      }}
                      aria-label={
                        openSections[section.label] ? 'Collapse' : 'Expand'
                      }
                    >
                      {openSections[section.label] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  )}
                </div>
                <Collapse
                  in={openSections[section.label] || isCollapsed}
                  timeout="auto"
                  unmountOnExit
                >
                  <div>
                    {section.links.map((link) => {
                      const isActive = location.pathname === link.to
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={closeMobile}
                           className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                            ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 shadow-sm'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                            }
                            ${isCollapsed ? 'justify-center px-2' : ''}
                          `}
                          aria-current={isActive ? 'page' : undefined}
                          title={isCollapsed ? link.label : undefined}
                        >
                          <span
                            className={`text-lg ${
                              isActive
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'group-hover:text-gray-700 dark:group-hover:text-gray-200'
                            }`}
                          >
                            {link.icon}
                          </span>
                          {!isCollapsed && (
                            <span
                              className={`font-medium ${
                                isActive
                                  ? 'text-blue-700 dark:text-blue-300'
                                  : ''
                              }`}
                            >
                              {link.label}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </Collapse>
              </div>
            ))}
          </nav>

          {/* Theme Toggle & User Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <ThemeToggle isCollapsed={isCollapsed} />
            {onLogout && (
              <button
                onClick={() => {
                  onLogout()
                  closeMobile()
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
                aria-label="Logout"
                title={isCollapsed ? 'Logout' : undefined}
              >
                <FiLogOut className="text-lg group-hover:text-red-600 dark:group-hover:text-red-400" />
                {!isCollapsed && <span className="font-medium">Logout</span>}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
