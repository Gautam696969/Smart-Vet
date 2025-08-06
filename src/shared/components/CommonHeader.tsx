import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  useTheme
} from '@mui/material'
import {
  FiMenu,
  FiBell,
  FiUser,
  FiLogOut,
  FiHome,
  FiHelpCircle,
  FiMail,
  FiSettings,
  FiChevronDown,
  FiShare2
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useCurrentUser } from '../hooks/useCurrentUser'

interface CommonHeaderProps {
  onMenuClick?: () => void
  onLogout?: () => void
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  onMenuClick,
  onLogout
}) => {
  const { user } = useCurrentUser()
  const theme = useTheme()

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #185c23 0%, #185c23 100%)',
        color: '#fff',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 4 } }}>
        {/* Menu Button (for mobile sidebar) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open sidebar"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <FiMenu size={22} />
        </IconButton>
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Smart Vet
          </Typography>
        </Link>
        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" component={Link} to="/">
            <FiHome size={20} />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/">
            <FiShare2 size={20} />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/help">
            <FiHelpCircle size={20} />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/messages">
            <FiMail size={20} />
          </IconButton>
          <IconButton color="inherit">
            <FiBell size={20} />
          </IconButton>
        </Box>
        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              fontSize: 18
            }}
          >
            {(user?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#fff', fontWeight: 600 }}
            >
              {user?.full_name || user?.email || 'User'}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#e0e0e0', textTransform: 'capitalize' }}
            >
              {user?.role}
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={onLogout}
            aria-label="Logout"
          >
            <FiLogOut size={20} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default CommonHeader
