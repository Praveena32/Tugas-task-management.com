import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const username =
    currentUser?.displayName ||
    (currentUser?.email ? currentUser.email.split('@')[0] : 'User');

  if (!currentUser) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          No Active Session
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#000000',
            borderRadius: 9999,
            textTransform: 'none',
            px: 3,
            '&:hover': { backgroundColor: '#1F2937' },
          }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 550,
          width: '100%',
          p: { xs: 4, sm: 6 },
          borderRadius: '24px',
          backgroundColor: '#F5F6EE',
          border: '1.5px solid #E2E5D8',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Main Welcome Message */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.75rem', sm: '2.25rem' },
            color: '#111827',
            mb: 4,
            lineHeight: 1.3,
          }}
        >
          Hi, Welcome{' '}
          <Box component="span" sx={{ color: '#22C55E' }}>
            {username}
          </Box>
          !
        </Typography>

        {/* Sign Out Button */}
        <Button
          variant="outlined"
          startIcon={<LogoutOutlined />}
          onClick={handleLogout}
          sx={{
            borderRadius: 9999,
            borderColor: '#E5E7EB',
            color: '#111827',
            backgroundColor: '#FFFFFF',
            textTransform: 'none',
            fontWeight: 600,
            px: 3.5,
            py: 1.25,
            '&:hover': {
              borderColor: '#EF4444',
              color: '#EF4444',
              backgroundColor: '#FEF2F2',
            },
          }}
        >
          Sign Out
        </Button>
      </Paper>
    </Box>
  );
};
