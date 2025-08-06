import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Tabs, Tab, Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

const pastelBg = "bg-white";
const pastelHighlight = "bg-blue-50";
const pastelTab = "bg-pink-50";
const pastelHeader = "bg-purple-50";

const usersColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "role", headerName: "Role", width: 120 },
];
const usersRows = [
  { id: 1, name: "Alice Admin", email: "alice@admin.com", role: "Admin" },
  { id: 2, name: "Bob Clinic", email: "bob@clinic.com", role: "Clinic" },
  { id: 3, name: "Carol User", email: "carol@user.com", role: "User" },
];

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={`${pastelBg} min-h-screen`} sx={{ background: "#fff" }}>
      {/* Top Header */}
      <AppBar position="static" elevation={0} sx={{ background: "#f3e8ff", color: "#3b0764" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, fontWeight: 700, fontSize: "1.5rem" }}>Admin Dashboard</Box>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Paper elevation={0} className={`${pastelTab} w-full`} sx={{ borderRadius: 0 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="admin dashboard tabs"
        >
          <Tab label="Users" />
          <Tab label="Clinics" />
          <Tab label="Finance" />
          <Tab label="Coupons" />
          <Tab label="Analytics" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tab} index={0}>
        <Box className="w-full" sx={{ height: 400, background: "#f0f9ff", borderRadius: 2 }}>
          <DataGrid
            rows={usersRows}
            columns={usersColumns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } }
            }}
            sx={{
              background: "#fff",
              borderRadius: 2,
              boxShadow: 1,
              "& .MuiDataGrid-columnHeaders": { background: "#e0e7ff" },
              "& .MuiDataGrid-row": { fontSize: "1.1rem" },
            }}
          />
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Box className="w-full" sx={{ minHeight: 200, background: "#f0fdf4", borderRadius: 2, p: 2 }}>
          <div className="text-lg font-semibold mb-2">Clinics Table (Coming Soon)</div>
          {/* Add MUI DataGrid for clinics here */}
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Box className="w-full" sx={{ minHeight: 200, background: "#fef9c3", borderRadius: 2, p: 2 }}>
          <div className="text-lg font-semibold mb-2">Finance Overview (Coming Soon)</div>
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Box className="w-full" sx={{ minHeight: 200, background: "#fce7f3", borderRadius: 2, p: 2 }}>
          <div className="text-lg font-semibold mb-2">Coupons Table (Coming Soon)</div>
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <Box className="w-full" sx={{ minHeight: 200, background: "#e0f2fe", borderRadius: 2, p: 2 }}>
          <div className="text-lg font-semibold mb-2">Analytics Dashboard (Coming Soon)</div>
        </Box>
      </TabPanel>
    </Box>
  );
}