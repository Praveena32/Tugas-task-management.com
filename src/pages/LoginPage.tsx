import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import { LoginForm } from '../components/login/LoginForm';
import { IllustrationPanel } from '../components/illustration/IllustrationPanel';

export const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Outer Card Container simulating the browser window / preview frame */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          maxWidth: { lg: 1100 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: '20px', md: '32px' },
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E5E7EB',
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          {/* Two-column layout */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: 'center',
            }}
          >
            {/* Left Side: Login Form */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 2, md: 4 },
                px: { xs: 1, sm: 2, md: 3 },
              }}
            >
              <LoginForm />
            </Box>

            {/* Right Side: Illustration & Widgets */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <IllustrationPanel />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
