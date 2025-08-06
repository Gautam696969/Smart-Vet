import React, { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const AccountPasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add password update logic here
  }

  return (
    <Box className=" h-full bg-gray-50">
      <Typography
        variant="h4"
        fontWeight={700}
        className="text-green-800 text-center"
        sx={{ m: 3 }}
      >
        Account Password
      </Typography>
      <Paper elevation={3} className="p-8 w-full md:max-w-6xl mx-auto">
        <form onSubmit={handleSave}>
          <Box className="flex flex-col gap-8">
            <TextField
              label="Current Password"
              type="password"
              variant="standard"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputLabelProps={{ className: 'text-green-700' }}
              InputProps={{ className: 'text-green-900' }}
              fullWidth
              sx={{
                '& label.Mui-focused': {
                  color: 'green'
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'green'
                }
              }}
            />
            <TextField
              label="New Password"
              type="password"
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputLabelProps={{ className: 'text-green-700' }}
              InputProps={{ className: 'text-green-900' }}
              fullWidth
              sx={{
                '& label.Mui-focused': {
                  color: 'green'
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'green'
                }
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ className: 'text-green-700' }}
              InputProps={{ className: 'text-green-900' }}
              fullWidth
              sx={{
                '& label.Mui-focused': {
                  color: 'green'
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'green'
                }
              }}
            />
            <Box className="flex justify-end">
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#065f46',
                  color: '#065f46',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  minWidth: '120px',
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#ecfdf5',
                    borderColor: '#065f46'
                  }
                }}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AccountPasswordPage
