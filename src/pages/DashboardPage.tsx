import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const username = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 520,
          width: '100%',
          p: { xs: 4, sm: 6 },
          borderRadius: '24px',
          backgroundColor: '#F5F6EE',
          border: '1.5px solid #E2E5D8',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#111827',
            mb: 4,
          }}
        >
          Hi, Welcome{' '}
          <Box component="span" sx={{ color: '#22C55E' }}>
            {username}
          </Box>
          !
        </Typography>

        <Button
          variant="outlined"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 9999,
            borderColor: '#E5E7EB',
            color: '#111827',
            backgroundColor: '#FFFFFF',
            textTransform: 'none',
            fontWeight: 600,
            px: 3.5,
            py: 1,
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
