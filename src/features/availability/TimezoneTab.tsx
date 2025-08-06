import React from 'react'
import {
  Paper,
  Typography,
  Button as MuiButton,
  Select,
  MenuItem,
  Box
} from '@mui/material'

const TimezoneTab: React.FC = () => {
  const [timezone, setTimezone] = React.useState('Alaska Time')
  return (
    <Paper elevation={3} className="rounded-2xl shadow-lg p-8 mt-8">
      <Typography className="mb-4 text-green-900 font-semibold">
        Select a timezone
      </Typography>
      <Select
        className="w-full mb-4"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value as string)}
        fullWidth
        sx={{ bgcolor: 'white', borderRadius: 1 }}
      >
        <MenuItem value="Alaska Time">Alaska Time</MenuItem>
        <MenuItem value="Pacific Time">Pacific Time</MenuItem>
        <MenuItem value="Eastern Time">Eastern Time</MenuItem>
      </Select>

      {/* Save button anchored at bottom right of card */}
      <Box display="flex" justifyContent="flex-end" mt={6}>
        <MuiButton
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
        </MuiButton>
      </Box>
    </Paper>
  )
}

export default TimezoneTab
