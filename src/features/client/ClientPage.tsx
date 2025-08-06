import React, { useState } from 'react'
import { FiDownload, FiFilter, FiUserPlus } from 'react-icons/fi'
import { saveAs } from 'file-saver'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Menu,
  Switch,
  Typography,
  MenuItem,
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material'
import i18next from 'i18next'

interface Client {
  id: number
  name: string
  email: string
  avatarUrl?: string
}

const mockClients: Client[] = [
  {
    id: 1,
    name: 'Arman Malik',
    email: 'midixa1060@forexru.com',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 2,
    name: 'Harish C. Mirchandani',
    email: 'docej61543@forexru.com',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 3,
    name: 'Harshad Mehta',
    email: 'yihiwey719@dariolo.com',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 4,
    name: 'Test User Test User Last name',
    email: 'desairajeshrk36@gmail.com',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 5,
    name: 'vashu M',
    email: 'vashu@woyce.io',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 6,
    name: 'dj cloudpeak',
    email: 'dgohel@cloudpeak.ai',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 7,
    name: 'Rajesh Desai',
    email: 'rajesh@cloudpeak.ai',
    avatarUrl: '/Owl-Tabby.png'
  },
  {
    id: 8,
    name: 'Jaggu dada',
    email: 'jejepe5856@0tires.com',
    avatarUrl: '/Owl-Tabby.png'
  }
]

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [timezone, setTimezone] = useState('Asia/Gaza')
  const navigate = useNavigate()
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [myMessages, setMyMessages] = useState(false)

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openFilter = Boolean(filterAnchorEl)

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
    setMyMessages(false)
  }

  const handleClear = () => {
    setMyMessages(false)
  }

  // CSV helper
  function convertToCSV(data: Client[]) {
    const header = ['Name', 'Email']
    const rows = data.map((c) => [c.name, c.email])
    return [header, ...rows]
      .map((row) => row.map((field) => `"${field}"`).join(','))
      .join('\r\n')
  }

  function handleDownloadCSV() {
    const csv = convertToCSV(filteredClients)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'clients.csv')
  }

  function handleSaveClient() {
    // Here you would normally save to backend
    setOpen(false)
    setFirstName('')
    setLastName('')
    setEmail('')
    setTimezone('Asia/Gaza')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="w-full px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-green-900 dark:text-white mb-2">
                {i18next.t('client.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {i18next.t('client.subtitle')}
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
              aria-label="New Client"
              onClick={() => setOpen(true)}
            >
              <FiUserPlus className="text-lg" />
              {i18next.t('client.newClient')}
            </button>
          </div>

          {/* Search and Actions Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder={i18next.t('client.searchClient')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search clients"
              />
            </div>
            <div className="flex gap-3">
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
                aria-label="Download"
                onClick={handleDownloadCSV}
              >
                <FiDownload className="text-lg" />
                {i18next.t('common.download')}
              </button>
              <button
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
                aria-label="Filter"
                onClick={handleFilterClick}
              >
                <FiFilter className="text-lg" />
                {i18next.t('common.filter')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="w-full px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {i18next.t('client.allClients')} ({filteredClients.length})
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#145824] to-[#1a6b2e] rounded-full"></div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.length === 0 && (
            <div className="col-span-full">
              <div className="text-center py-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {i18next.t('client.noClientsFound')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm
                      ? i18next.t('client.adjustSearchTerms')
                      : i18next.t('client.createFirstClient')}
                  </p>
                  {!searchTerm && (
                    <button
                      className="bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white px-6 py-3 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300"
                      onClick={() => setOpen(true)}
                    >
                      {i18next.t('client.addFirstClient')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {client.avatarUrl ? (
                    <img
                      src={client.avatarUrl}
                      alt={client.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#145824] to-[#1a6b2e] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-lg">
                      {client.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
                      {client.email}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-[#145824] hover:bg-green-600 text-gray-700 dark:text-gray-300 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 group-hover:transform group-hover:scale-105"
                  aria-label={`View details for ${client.name}`}
                  onClick={() =>
                    navigate(`/clients/${client.id}`, { state: { client } })
                  }
                >
                  {i18next.t('client.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Component */}
      <Menu
        anchorEl={filterAnchorEl}
        open={openFilter}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            p: 3,
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: '16px'
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Switch
            checked={myMessages}
            onChange={(e) => setMyMessages(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#145824',
                '&:hover': {
                  backgroundColor: 'rgba(20, 88, 36, 0.08)'
                }
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#145824'
              }
            }}
            size="medium"
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {i18next.t('client.showDeleted')}
          </Typography>
        </Box>
        <Box className="flex justify-between gap-3">
          <Button
            onClick={handleClear}
            sx={{
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'none',
              color: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
              borderRadius: '8px',
              px: 3,
              py: 1
            }}
          >
            {i18next.t('common.clear')}
          </Button>
          <Button
            onClick={handleFilterClose}
            sx={{
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'none',
              backgroundColor: '#145824',
              color: 'white',
              '&:hover': { backgroundColor: '#1a6b2e' },
              borderRadius: '8px',
              px: 3,
              py: 1
            }}
          >
            {i18next.t('common.close')}
          </Button>
        </Box>
      </Menu>

      {/* Dialog Component */}
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            setOpen(false)
          }
        }}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '8px'
          }
        }}
      >
        <DialogTitle
          sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#145824' }}
        >
          {i18next.t('client.createNewClient')}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 mt-4">
            <TextField
              label={i18next.t('common.firstName')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="dense"
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#145824'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#145824'
                }
              }}
            />
            <TextField
              label={i18next.t('common.lastName')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#145824'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#145824'
                }
              }}
            />
            <TextField
              label={i18next.t('common.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="dense"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#145824'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#145824'
                }
              }}
            />
            <TextField
              select
              label={i18next.t('common.selectTimezone')}
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              fullWidth
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#145824'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#145824'
                }
              }}
            >
              <MenuItem value="Asia/Gaza">Asia/Gaza</MenuItem>
              {/* Add more timezones as needed */}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            {i18next.t('common.cancel')}
          </Button>
          <Button
            onClick={handleSaveClient}
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              backgroundColor: '#145824',
              '&:hover': { backgroundColor: '#1a6b2e' },
              textTransform: 'none',
              fontWeight: 600
            }}
            variant="contained"
          >
            {i18next.t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ClientsPage
