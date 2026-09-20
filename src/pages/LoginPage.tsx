import React from 'react';
import { Box } from '@mui/material';
import { LoginForm } from '../components/login/LoginForm';
import { IllustrationPanel } from '../components/illustration/IllustrationPanel';

export const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        overflowX: 'hidden',
        py: { xs: 4, md: 0 },
        gap: { xs: 5, md: 0 },
      }}
    >
      {/* Left Column: Login Form */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: 'auto', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 4, md: 5, lg: 7 },
        }}
      >
        <LoginForm />
      </Box>

      {/* Right Column: Illustration & Widgets Panel with border */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: 'auto', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 3, lg: 3.5 },
        }}
      >
        <IllustrationPanel />
      </Box>
    </Box>
  );
};
