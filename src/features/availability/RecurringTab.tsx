import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,
  Button as MuiButton,
  Select,
  MenuItem
} from '@mui/material'
import { daysOfWeek } from '../../shared/utils/constants/daysOfWeek'
import { generateTimes } from '../../shared/utils/timeUtils'

const timeOptions = generateTimes()

const RecurringTab: React.FC = () => {
  const [state, setState] = useState(() => {
    const initial: any = {}
    daysOfWeek.forEach((day) => {
      initial[day] = { intervals: [], notAvailable: false }
    })
    return initial
  })

  const handleAddInterval = (day: string) => {
    setState((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        intervals: [
          ...prev[day].intervals,
          { start: timeOptions[36], end: timeOptions[40] }
        ],
        notAvailable: false
      }
    }))
  }

  const handleRemoveInterval = (day: string, idx: number) => {
    setState((prev: any) => {
      const intervals = prev[day].intervals.filter(
        (_: any, i: number) => i !== idx
      )
      return {
        ...prev,
        [day]: { ...prev[day], intervals }
      }
    })
  }

  const handleChangeTime = (
    day: string,
    idx: number,
    field: 'start' | 'end',
    value: string
  ) => {
    setState((prev: any) => {
      const intervals = prev[day].intervals.map((interval: any, i: number) =>
        i === idx ? { ...interval, [field]: value } : interval
      )
      return {
        ...prev,
        [day]: { ...prev[day], intervals }
      }
    })
  }

  const handleNotAvailable = (day: string) => {
    setState((prev: any) => ({
      ...prev,
      [day]: { intervals: [], notAvailable: true }
    }))
  }

  return (
    <Box className="flex flex-col" sx={{ height: 'calc(100vh - 4rem)', minHeight: 0, position: 'relative' }}>
      <Box sx={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto', pr: 1 }}>
        {daysOfWeek.map((day) => (
          <Box key={day} className="mb-8 border-b pb-6 last:border-b-0 last:pb-0">
            <Typography variant="h6" className="mb-2 text-gray-800 font-semibold">
              {day}
            </Typography>
            {state[day].notAvailable || state[day].intervals.length === 0 ? (
              <Typography className="mb-2 text-gray-500 ">
                No Availability Selected
              </Typography>
            ) : null}
            {state[day].intervals.map((interval: any, idx: number) => (
              <Box
                key={idx}
                className="flex flex-row items-center gap-4 mb-2 bg-green-50 rounded-lg px-4 py-2 shadow-sm"
              >
                <Select
                  value={interval.start}
                  onChange={(e) =>
                    handleChangeTime(day, idx, 'start', e.target.value as string)
                  }
                  size="small"
                  sx={{
                    minWidth: 120,
                    width: 144,
                    bgcolor: 'white',
                    boxShadow: 1,
                    borderRadius: 1
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 240
                      }
                    }
                  }}
                >
                  {timeOptions.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
                <span className="mx-1 text-gray-600 font-semibold">to</span>
                <Select
                  value={interval.end}
                  onChange={(e) =>
                    handleChangeTime(day, idx, 'end', e.target.value as string)
                  }
                  size="small"
                  sx={{
                    minWidth: 120,
                    width: 144,
                    bgcolor: 'white',
                    boxShadow: 1,
                    borderRadius: 1
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 240
                      }
                    }
                  }}
                >
                  {timeOptions
                    .filter(
                      (t) =>
                        timeOptions.indexOf(t) >
                        timeOptions.indexOf(interval.start)
                    )
                    .map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                </Select>
                <MuiButton
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => handleRemoveInterval(day, idx)}
                  style={{
                    minWidth: 0,
                    padding: 4,
                    borderRadius: 8,
                    borderWidth: 2
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </MuiButton>
              </Box>
            ))}
            <Box className="flex flex-row gap-4 mt-2">
              <MuiButton
                variant="contained"
                color="success"
                style={{
                  backgroundColor: '#25621c',
                  fontWeight: 600,
                  letterSpacing: 1,
                  minWidth: 180,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #25621c22'
                }}
                onClick={() => handleAddInterval(day)}
              >
                ADD INTERVAL
              </MuiButton>
              <MuiButton
                variant="outlined"
                color="success"
                style={{
                  borderColor: '#25621c',
                  color: '#25621c',
                  fontWeight: 600,
                  letterSpacing: 1,
                  minWidth: 180,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #25621c11'
                }}
                onClick={() => handleNotAvailable(day)}
              >
                I'M NOT AVAILABLE
              </MuiButton>
            </Box>
          </Box>
        ))}
      </Box>
      {/* Save button anchored at bottom right of card */}
      <Box display="flex" justifyContent="flex-end" mt={6} sx={{ position: 'sticky', bottom: 0, right: 0, zIndex: 10, background: '#fff', py: 2 }}>
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
    </Box>
  )
}

export default RecurringTab
