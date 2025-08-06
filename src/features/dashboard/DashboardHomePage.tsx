import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { Box, Card, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const lineData = [
  { name: 'Jan', users: 400, sales: 240 },
  { name: 'Feb', users: 300, sales: 139 },
  { name: 'Mar', users: 200, sales: 980 },
  { name: 'Apr', users: 278, sales: 390 },
  { name: 'May', users: 189, sales: 480 },
  { name: 'Jun', users: 239, sales: 380 },
  { name: 'Jul', users: 349, sales: 430 }
]

const barData = [
  { name: 'Clinic A', patients: 120, revenue: 2400 },
  { name: 'Clinic B', patients: 98, revenue: 2210 },
  { name: 'Clinic C', patients: 86, revenue: 2290 },
  { name: 'Clinic D', patients: 99, revenue: 2000 },
  { name: 'Clinic E', patients: 85, revenue: 2181 }
]

const pieData = [
  { name: 'Consultations', value: 400 },
  { name: 'Surgeries', value: 300 },
  { name: 'Vaccinations', value: 300 },
  { name: 'Other', value: 200 }
]
const pieColors = ['#1976d2', '#26c6da', '#ffb300', '#66bb6a']

const areaData = [
  { month: 'Jan', appointments: 240 },
  { month: 'Feb', appointments: 221 },
  { month: 'Mar', appointments: 229 },
  { month: 'Apr', appointments: 200 },
  { month: 'May', appointments: 218 },
  { month: 'Jun', appointments: 250 },
  { month: 'Jul', appointments: 270 }
]

interface DashboardHomePageProps {
  onLogout: () => void
}

const DashboardHomePage: React.FC<DashboardHomePageProps> = ({ onLogout }) => {
  return (
    <Box
      minHeight="100vh"
      width="100%"
      sx={{
        background: 'linear-gradient(135deg, #fff 0%, #e3f2fd 50%, #fff 100%)',
        px: 0,
        py: 0
      }}
    >
      <Box
        component="header"
        width="100%"
        px={8}
        py={8}
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        justifyContent={{ md: 'space-between' }}
        gap={4}
      >
        <Typography variant="h3" fontWeight="bold" color="primary">
          Dashboard
        </Typography>
      </Box>
      <Box component="main" width="100%" px={8}>
        {/* Stats Cards Row */}
        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={3}
          mb={4}
        >
          <Card elevation={3} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Users
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                1,234
              </Typography>
              <Typography color="text.secondary">
                Active users this month
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Sales
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                $56,789
              </Typography>
              <Typography color="text.secondary">
                Total sales this month
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Tasks Completed
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                87%
              </Typography>
              <Typography color="text.secondary">
                Progress on current tasks
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Appointments
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                542
              </Typography>
              <Typography color="text.secondary">
                Appointments this month
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Revenue Growth
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                +12%
              </Typography>
              <Typography color="text.secondary">
                Growth vs last month
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                New Clients
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                78
              </Typography>
              <Typography color="text.secondary">
                Clients joined this month
              </Typography>
            </CardContent>
          </Card>
        </Box>
        {/* Charts Row */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={3}
          mb={4}
        >
          <Card elevation={3} sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                User & Sales Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={lineData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#2563eb"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#0ea5e9" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Patients & Revenue by Clinic
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="patients" fill="#1976d2" />
                  <Bar dataKey="revenue" fill="#26c6da" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
        {/* More Charts Row */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
          <Card elevation={3} sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Revenue Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {pieData.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={pieColors[idx % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Appointments Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={areaData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stroke="#1976d2"
                    fill="#bbdefb"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardHomePage
