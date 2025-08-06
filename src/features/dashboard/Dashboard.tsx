import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import { CalendarToday, Repeat, Public } from '@mui/icons-material';
import UpcomingConsultationsTab from '../availability/UpcomingConsultationsTab';
import PhoneIcon from '@mui/icons-material/Phone';

import MainAvailabilityPage from '../availability/MainAvailabilityPage';
import UnclaimedMessagesTab from '../availability/UnclaimedMessagesTab';
import MyOpenMessagesTab from '../availability/MyOpenMessagesTab';
import ChatIcon from '@mui/icons-material/Chat';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const tabData = [
  { label: 'My Availability', icon: <CalendarToday sx={{ mr: 1 }} /> },
  { label: 'Upcoming Consultations', icon: <PhoneIcon sx={{ mr: 1 }} /> },
  { label: 'Unclaimed Messages', icon: <ChatIcon sx={{ mr: 1 }} /> },
  { label: 'My Open Messages', icon: <LockOpenIcon sx={{ mr: 1 }} /> },
];

const DashboardPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box className="h-full p-0 flex flex-col items-center">
      <Paper elevation={4} className="w-full rounded-2xl overflow-hidden" style={{height: '90vh', display: 'flex', flexDirection: 'column'}}>
        {/* Sticky tab header */}
        <div className="sticky top-0 z-20" style={{background: 'inherit'}}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            aria-label="main header tabs"
            className="text-white bg-green-800 px-4 md:px-8 pt-6 pb-2"
            TabIndicatorProps={{ style: { background: 'white', height: 4, borderRadius: 2 } }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '.MuiTab-root': {
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 48,
                letterSpacing: 1,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                transition: 'background 0.2s',
                outline: 'none',
                boxShadow: 'none',
              },
              '.Mui-selected': {
                background: 'rgba(255,255,255,0.12)',
                color: 'white !important',
                outline: 'none',
                boxShadow: 'none',
              },
              '.MuiTab-root:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
              '.MuiTabs-indicator': {
                outline: 'none',
                boxShadow: 'none',
              },
              '.MuiTab-root.Mui-selected': {
                color: 'white !important',
              },
              '.MuiTab-root:hover': {
                color: 'white',
              },
            }}
          >
            {tabData.map((tabItem, idx) => (
              <Tab
                key={tabItem.label}
                icon={tabItem.icon}
                iconPosition="start"
                label={tabItem.label}
                id={`tab-${idx}`}
                aria-controls={`tab-panel-${idx}`}
              />
            ))}
          </Tabs>
        </div>
        {/* Scrollable tab content area */}
        <Box className="px-4 md:px-8 pt-4 bg-white" style={{minHeight: 0}}>
          {tab === 0 && <MainAvailabilityPage />}
          {tab === 1 && <UpcomingConsultationsTab />}
          {tab === 2 && <UnclaimedMessagesTab />}
          {tab === 3 && <MyOpenMessagesTab />}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardPage;
