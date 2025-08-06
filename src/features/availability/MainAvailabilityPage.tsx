import React from 'react';
import AvailabilityTab from './AvailabilityTab';
import RecurringTab from './RecurringTab';
import TimezoneTab from './TimezoneTab';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { CalendarToday, Repeat, Public } from '@mui/icons-material';

const tabData = [
  { label: 'AVAILABILITY', icon: <CalendarToday sx={{ mr: 1 }} /> },
  { label: 'RECURRING', icon: <Repeat sx={{ mr: 1 }} /> },
  { label: 'TIMEZONE', icon: <Public sx={{ mr: 1 }} /> },
];

const MainAvailabilityPage: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="availability inner tabs"
        className="text-green-800"
        TabIndicatorProps={{ style: { background: '#25621c', height: 4, borderRadius: 2 } }}
        variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        sx={{
          '.MuiTab-root': {
            color: '#25621c',
            fontWeight: 600,
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
            background: 'rgba(37,98,28,0.12)',
            color: '#25621c !important',    
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
            color: '#25621c !important',
          },
          '.MuiTab-root:hover': {
            color: '#25621c',
          },
        }}
      >
        {tabData.map((tabItem, idx) => (
          <Tab
            key={tabItem.label}
            icon={tabItem.icon}
            iconPosition="start"
            label={tabItem.label}
            id={`inner-tab-${idx}`}
            aria-controls={`inner-tab-panel-${idx}`}
          />
        ))}
      </Tabs>
      <Box className="pt-6">
        {tab === 0 && <AvailabilityTab />}
        {tab === 1 && <RecurringTab />}
        {tab === 2 && <TimezoneTab />}
      </Box>
    </Box>
  );
};

export default MainAvailabilityPage;
