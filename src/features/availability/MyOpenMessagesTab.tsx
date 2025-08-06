import React from 'react'
import { Box, Typography, Paper, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const MyOpenMessagesTab: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box className="w-full">
      <Typography
        variant="h4"
        className="text-green-900 font-semibold mt-8 mb-2"
      >
        My Open Messages
      </Typography>
      <Typography className="mb-6 text-gray-700">
        The following messages have been claimed by you. Please respond to the
        message and close the conversation by clicking lock when you feel the
        question has been answered appropriately. You can leave the message open
        if you’d like the user’s reply.
      </Typography>
      <Box display="flex" justifyContent="flex-end" pr={1}>
        <Link
          component="button"
          underline="hover"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            m: 1,
            color: 'grey.700',
            '&:hover': {
              color: 'primary'
            }
          }}
         onClick={() => navigate('/')}  // replace with your target path
        >
          VIEW ALL
        </Link>
      </Box>
      <Paper
        elevation={1}
        className="w-full bg-[#113757] text-white rounded-none shadow-none p-4 text-base"
      >
        No Consultations
      </Paper>
    </Box>
  )
}

export default MyOpenMessagesTab
