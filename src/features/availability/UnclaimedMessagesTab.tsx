import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button as MuiButton,
  IconButton,
  Avatar,
  Stack,
  TableFooter,
  TablePagination,
  Select,
  MenuItem,
  Link
} from '@mui/material'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat'
import { useNavigate } from 'react-router-dom'
import { ITEMS_PER_PAGE_OPTIONS } from '../../shared/utils/constants/paginationConstants'

const dummyData = [
  { id: 1, time: '37 minutes ago', name: 'dj cloudpeak' },
  { id: 2, time: '7 hours ago', name: 'dj cloudpeak' },
  { id: 3, time: '1 day ago', name: 'dj cloudpeak' },
  { id: 4, time: '2 days ago', name: 'dj cloudpeak' },
  { id: 5, time: '3 days ago', name: 'dj cloudpeak' },
  { id: 6, time: '4 days ago', name: 'dj cloudpeak' },
  { id: 7, time: '5 days ago', name: 'dj cloudpeak' },
  { id: 8, time: '6 days ago', name: 'dj cloudpeak' },
  { id: 9, time: '7 days ago', name: 'dj cloudpeak' },
  { id: 10, time: '8 days ago', name: 'dj cloudpeak' }
]

const UnclaimedMessagesTab: React.FC = () => {
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const pagedData = dummyData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  )
  const navigate = useNavigate()

  return (
    <Box className="w-full h-full flex flex-col" sx={{ position: 'relative', minHeight: 0 }}>
      <Box sx={{ flex: '0 0 auto' }}>
        <Typography
          variant="h4"
          className="text-green-900 font-semibold mt-8 mb-2"
        >
          Unclaimed Messages
        </Typography>
        <Typography className="mb-6 text-gray-700">
          The following email messages have been submitted by users and require
          answering. To answer a message, click on the message and click Claim.
          This will add the message to your queue and transfer payment upon your
          reply.
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
            onClick={() => navigate('/')} // replace with your target path
          >
            VIEW ALL
          </Link>
        </Box>
      </Box>
      <Box sx={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto', pr: 1 }}>
        {pagedData.map((item) => (
          <Paper
            key={item.id}
            elevation={2}
            className="flex flex-row items-center justify-between mb-6 p-6 rounded-lg shadow-sm"
          >
            <Stack direction="row" spacing={-2} className="ml-2">
              <Avatar sx={{ width: 56, height: 56, bgcolor: '#1e7a4d' }}>
                <PersonIcon />
              </Avatar>
              <Avatar sx={{ width: 56, height: 56, bgcolor: '#bdbdbd', ml: -2 }}>
                <QuestionMarkIcon />
              </Avatar>
            </Stack>
            <Box className="flex-1 ml-8">
              <Typography variant="h6" className="mb-2 text-lg text-gray-800">
                {item.time} with {item.name}
              </Typography>
            </Box>
            <Box className="flex flex-col items-end gap-2 min-w-[260px]">
              <IconButton
                sx={{
                  bgcolor: '#14521c',
                  color: 'white',
                  mb: 1,
                  '&:hover': { bgcolor: '#25621c' }
                }}
              >
                <ChatIcon />
              </IconButton>
              <Typography className="text-gray-700 text-sm mb-2">
                Messaging Session with a Veterinarian
              </Typography>
              <MuiButton
                variant="contained"
                color="success"
                sx={{
                  bgcolor: '#19c37d',
                  fontWeight: 600,
                  borderRadius: 1,
                  px: 3,
                  minWidth: 220
                }}
              >
                ENTER CONSULTATION ROOM
              </MuiButton>
            </Box>
          </Paper>
        ))}
      </Box>
      {/* Fixed Table Footer Pagination using MUI TablePagination */}
      <Box
        className="w-full"
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          zIndex: 10,
          background: '#f3fbf9',
          borderTop: '1px solid #e0e0e0',
          boxShadow: '0 -2px 8px #0000000a'
        }}
      >
        <TablePagination
          rowsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
          colSpan={3}
          count={dummyData.length}
          rowsPerPage={itemsPerPage}
          page={page}
          onPageChange={(_e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setItemsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
          labelRowsPerPage="Items per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count}`
          }
          sx={{
            border: 0,
            '.MuiTablePagination-toolbar': { justifyContent: 'flex-end' }
          }}
        />
      </Box>
    </Box>
  )
}

export default UnclaimedMessagesTab
