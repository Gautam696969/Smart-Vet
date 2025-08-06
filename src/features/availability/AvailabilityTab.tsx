import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button as MuiButton,
  Paper,
  Stack,
  Select,
  MenuItem
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface Interval {
  start: string
  end: string
}

interface DateState {
  [date: string]: { intervals: Interval[]; notAvailable: boolean }
}

function generateTimes() {
  const times = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h % 12 === 0 ? 12 : h % 12
      const ampm = h < 12 ? 'AM' : 'PM'
      const min = m.toString().padStart(2, '0')
      times.push(`${hour}:${min} ${ampm}`)
    }
  }
  return times
}
const timeOptions = generateTimes()

const AvailabilityTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
  const [dateState, setDateState] = useState<DateState>({})

  const handleAddAvailability = () => {
    if (!selectedDate) return
    const dateStr = selectedDate.format('YYYY-MM-DD')
    setDateState((prev) => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        intervals: [
          ...(prev[dateStr]?.intervals || []),
          { start: timeOptions[36], end: timeOptions[40] }
        ],
        notAvailable: false
      }
    }))
  }

  const handleNotAvailableToday = () => {
    if (!selectedDate) return
    const dateStr = selectedDate.format('YYYY-MM-DD')
    setDateState((prev) => ({
      ...prev,
      [dateStr]: { intervals: [], notAvailable: true }
    }))
  }

  return (
    <Box 
      sx={{ 
        height: 'calc(100vh - 4rem)', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Scrollable Main Content */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto',
          px: 2,
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#357a38',
            borderRadius: '4px',
            '&:hover': {
              background: '#2e6b32',
            },
          },
          '&::-webkit-scrollbar-thumb:active': {
            background: '#25621c',
          },
          // Firefox scrollbar styling
          scrollbarWidth: 'thin',
          scrollbarColor: '#357a38 #f1f5f9',
        }}
      >
        <div className="flex flex-col md:flex-row gap-10 mt-8 pb-8">
        <div className="flex-1">
          {/* Calendar Section */}
          <Paper
            elevation={4}
            className="bg-green-700 text-white rounded-2xl p-8 flex-1 min-w-[350px] flex flex-col shadow-lg justify-center items-center"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  bgcolor: 'white',
                  p: 0,
                  width: '100%'
                  // minWidth: 320,
                  // maxWidth: 400
                }}
              >
                {/* Custom green header */}
                <Box
                  sx={{
                    bgcolor: '#357a38',
                    color: 'white',
                    px: 3,
                    py: 2.5,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ opacity: 0.8, fontSize: 16 }}
                  >
                    {selectedDate?.format('YYYY')}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, fontSize: 32, mt: 0.5 }}
                  >
                    {selectedDate?.format('ddd, MMM D')}
                  </Typography>
                </Box>
                {/* Calendar body */}
                <DateCalendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    color: 'black',
                    p: 0,
                    pt: 1,
                    width: '100%',
                    '& .MuiPickersCalendarHeader-root': {
                      mt: 0,
                      mb: 1
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      fontWeight: 600,
                      fontSize: 18
                    },
                    '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer':
                      {
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                        p: 0,
                        m: 0,
                        gap: 0
                      },
                    '& .MuiDayCalendar-weekDayLabel': {
                      flex: '1 1 auto',
                      textAlign: 'center',
                      p: 0,
                      m: 0,
                      width: 36,
                      minWidth: 36,
                      maxWidth: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    },
                    '& .MuiPickersDay-root': {
                      flex: '1 1 auto',
                      fontWeight: 500,
                      fontSize: 16,
                      textAlign: 'center',
                      p: 0,
                      m: 0,
                      width: 36,
                      height: 36,
                      minWidth: 36,
                      minHeight: 36,
                      maxWidth: 36,
                      maxHeight: 36,
                      borderRadius: '50%',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(53, 122, 56, 0.1)'
                      }
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                      bgcolor: '#357a38 !important',
                      color: 'white !important',
                      borderRadius: '50% !important',
                      width: '36px !important',
                      height: '36px !important',
                      minWidth: '36px !important',
                      minHeight: '36px !important',
                      maxWidth: '36px !important',
                      maxHeight: '36px !important',
                      boxShadow: '0 2px 8px rgba(53, 122, 56, 0.25)',
                      border: 'none !important',
                      '&:hover': {
                        bgcolor: '#2e6b32 !important'
                      },
                      '&:focus': {
                        bgcolor: '#357a38 !important'
                      }
                    },
                    '& .MuiPickersDay-root.MuiPickersDay-today': {
                      borderColor: '#357a38',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      '&:not(.Mui-selected)': {
                        bgcolor: 'transparent',
                        color: '#357a38',
                        fontWeight: 600
                      }
                    },
                    '& .MuiPickersDay-root.MuiPickersDay-today.Mui-selected': {
                      border: 'none !important',
                      bgcolor: '#357a38 !important',
                      color: 'white !important'
                    },
                    '& .MuiPickersDay-root.Mui-disabled': {
                      color: '#bdbdbd',
                      bgcolor: 'transparent'
                    }
                  }}
                  shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')}
                />
              </Box>
            </LocalizationProvider>
          </Paper>
        </div>
        <div className="flex-1">
          {/* Set Hours Section */}
          <Paper
            elevation={3}
            className="rounded-2xl shadow-lg p-8 flex flex-col min-w-[350px]"
          >
            <Box>
              <Typography
                variant="h5"
                className="mb-4 font-semibold text-green-900"
              >
                Set Available Hours for{' '}
                <b>{selectedDate?.format('YYYY-MM-DD')}</b>
              </Typography>
              {/* Show intervals or not available message */}
              {selectedDate &&
              dateState[selectedDate.format('YYYY-MM-DD')]?.notAvailable ? (
                <Typography className="mb-4 flex items-center text-sm text-gray-700 bg-green-50 rounded px-3 py-2">
                  <span className="mr-2 text-green-700 text-lg">&#10060;</span>
                  Not Available
                </Typography>
              ) : selectedDate &&
                dateState[selectedDate.format('YYYY-MM-DD')]?.intervals
                  ?.length > 0 ? (
                <Box className="mb-4">
                  {dateState[selectedDate.format('YYYY-MM-DD')].intervals.map(
                    (interval, idx) => (
                      <Box
                        key={idx}
                        className="flex flex-row items-center gap-4 mb-2 bg-green-50 rounded-lg px-4 py-2 shadow-sm"
                      >
                        {/* Start time dropdown */}
                       
                        <Select
                          value={interval.start}
                          onChange={(e) => {
                            const dateStr = selectedDate.format('YYYY-MM-DD')
                            setDateState((prev) => {
                              const intervals = prev[dateStr].intervals.map(
                                (intv, i) =>
                                  i === idx
                                    ? { ...intv, start: e.target.value }
                                    : intv
                              )
                              return {
                                ...prev,
                                [dateStr]: { ...prev[dateStr], intervals }
                              }
                            })
                          }}
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
                        <span className="mx-1 text-gray-600 font-semibold">
                          to
                        </span>
                        <Select
                          value={interval.end}
                          onChange={(e) => {
                            const dateStr = selectedDate.format('YYYY-MM-DD')
                            setDateState((prev) => {
                              const intervals = prev[dateStr].intervals.map(
                                (intv, i) =>
                                  i === idx
                                    ? { ...intv, end: e.target.value }
                                    : intv
                              )
                              return {
                                ...prev,
                                [dateStr]: { ...prev[dateStr], intervals }
                              }
                            })
                          }}
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
                          onClick={() => {
                            const dateStr = selectedDate.format('YYYY-MM-DD')
                            setDateState((prev) => ({
                              ...prev,
                              [dateStr]: {
                                ...prev[dateStr],
                                intervals: prev[dateStr].intervals.filter(
                                  (_, i) => i !== idx
                                )
                              }
                            }))
                          }}
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
                    )
                  )}
                </Box>
              ) : (
                <Typography className="mb-4 flex items-center text-sm text-gray-700 bg-green-50 rounded px-3 py-2">
                  <span className="mr-2 text-green-700 text-lg">&#8635;</span>
                  No Availability Selected
                </Typography>
              )}
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              className="mt-4 w-full"
            >
              <MuiButton
                variant="contained"
                color="success"
                className="flex-1"
                style={{
                  backgroundColor: '#25621c',
                  minWidth: 160,
                  fontWeight: 600,
                  letterSpacing: 1
                }}
                onClick={handleAddAvailability}
              >
                ADD AVAILABILITY
              </MuiButton>
              <MuiButton
                variant="outlined"
                color="success"
                className="flex-1"
                style={{
                  borderColor: '#25621c',
                  color: '#25621c',
                  minWidth: 160,
                  fontWeight: 600,
                  letterSpacing: 1
                }}
                onClick={handleNotAvailableToday}
              >
                I'M NOT AVAILABLE TODAY
              </MuiButton>
            </Stack>
          </Paper>
        </div>
      </div>

      </Box>

      {/* Fixed Save Button at Bottom */}
      <Box 
        display="flex" 
        justifyContent="flex-end" 
        sx={{ 
          borderTop: '1px solid #e5e7eb',
          backgroundColor: 'white',
          py: 2,
          px: 2,
          flexShrink: 0,
          position: 'sticky',
          bottom: 0,
          zIndex: 10
        }}
      >
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

export default AvailabilityTab
