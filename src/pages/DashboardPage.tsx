import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  ContentCopyOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
  VpnKeyOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [copiedToken, setCopiedToken] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setToastMessage(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          backgroundColor: '#F9FAFB',
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 450,
            textAlign: 'center',
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
            No Active Session
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
            You must authenticate using Google login to view the accessToken.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackOutlined />}
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
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Header navigation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Button
            startIcon={<ArrowBackOutlined />}
            onClick={() => navigate('/')}
            sx={{
              color: '#4B5563',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { color: '#111827', backgroundColor: 'transparent' },
            }}
          >
            Back to Login UI
          </Button>
          <Button
            variant="outlined"
            startIcon={<LogoutOutlined />}
            onClick={handleLogout}
            sx={{
              borderRadius: 9999,
              borderColor: '#E5E7EB',
              color: '#EF4444',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#EF4444',
                backgroundColor: '#FEF2F2',
              },
            }}
          >
            Sign Out
          </Button>
        </Box>

        {/* Profile and Auth Info Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            p: { xs: 3, sm: 4 },
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
            mb: 4,
          }}
        >
          {/* User Profile Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 2.5,
              mb: 3,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Avatar
              src={currentUser.photoURL || undefined}
              alt={currentUser.displayName || 'User'}
              sx={{
                width: 72,
                height: 72,
                border: '3px solid #E5E7EB',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
              }}
            >
              {currentUser.displayName?.[0] || 'U'}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  mb: 0.5,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827' }}>
                  {currentUser.displayName || 'Google User'}
                </Typography>
                {currentUser.isDemo ? (
                  <Chip label="Dev / Demo Session" size="small" color="info" />
                ) : (
                  <Chip label="Authenticated with Google" size="small" color="success" />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: '#6B7280', mb: 1 }}>
                {currentUser.email}
              </Typography>

              <Typography variant="caption" sx={{ color: '#9CA3AF', fontFamily: 'monospace' }}>
                UID: {currentUser.uid}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Access Token Display Box (Requirement from Assessment) */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VpnKeyOutlined sx={{ color: '#10B981', fontSize: '1.25rem' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                  User accessToken
                </Typography>
              </Box>

              <Tooltip title="Copy accessToken to clipboard">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={copiedToken ? <CheckCircleOutlined color="success" /> : <ContentCopyOutlined />}
                  onClick={() => handleCopy(currentUser.accessToken, 'Access Token')}
                  sx={{
                    borderRadius: 9999,
                    borderColor: '#E5E7EB',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    color: '#374151',
                    '&:hover': {
                      borderColor: '#9CA3AF',
                      backgroundColor: '#F9FAFB',
                    },
                  }}
                >
                  {copiedToken ? 'Copied' : 'Copy Token'}
                </Button>
              </Tooltip>
            </Box>

            {/* Token display box */}
            <Box
              sx={{
                backgroundColor: '#0F172A',
                borderRadius: '16px',
                p: 2.5,
                position: 'relative',
                border: '1px solid #1E293B',
              }}
            >
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  fontSize: '0.825rem',
                  color: '#38BDF8',
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                  maxHeight: 180,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: 6,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#334155',
                    borderRadius: 3,
                  },
                }}
              >
                {currentUser.accessToken}
              </Typography>
            </Box>
          </Box>

          {/* ID Token Section if available */}
          {currentUser.idToken && currentUser.idToken !== currentUser.accessToken && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1.5,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4B5563' }}>
                  Firebase ID Token (JWT)
                </Typography>
                <Tooltip title="Copy ID Token">
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(currentUser.idToken!, 'ID Token')}
                  >
                    <ContentCopyOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  p: 2,
                  border: '1px solid #E2E8F0',
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: '#64748B',
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap',
                    maxHeight: 100,
                    overflowY: 'auto',
                  }}
                >
                  {currentUser.idToken}
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Snackbar Notification */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={() => setToastMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
