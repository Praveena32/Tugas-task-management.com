import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GoogleIcon, AppleIcon, FacebookIcon } from './SocialIcons';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // UI state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Email format regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateUsername = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setUsernameError('Username or email is required');
      return false;
    }
    // Check email format
    if (trimmed.includes('@')) {
      if (!emailRegex.test(trimmed)) {
        setUsernameError('Please enter a valid email address (e.g. name@domain.com)');
        return false;
      }
    } else if (trimmed.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isUserValid = validateUsername(username);
    const isPassValid = validatePassword(password);

    if (isUserValid && isPassValid) {
      setToastMessage(
        'Credentials validated! As specified in the challenge, use the Google button below to authenticate with Firebase.'
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setAuthError(null);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      console.error('Google Sign-In failed:', errorObj);
      if (errorObj.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled by user.');
      } else if (errorObj.code === 'auth/invalid-api-key') {
        setAuthError(
          'Firebase API Key is invalid or not yet configured in .env.'
        );
      } else {
        setAuthError(errorObj.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSocialPlaceholder = (provider: string) => {
    setToastMessage(`${provider} login is a mockup. Please click the Google button to test the Firebase Authentication integration.`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}

    >
      {/* Header */}
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1.85rem', sm: '2.1rem' },
            color: '#111827',
            letterSpacing: '-0.025em',
            mb: 1.25,
          }}
        >
          Welcome back!<br />
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666b77ff',
            lineHeight: 1.55,
            fontSize: '0.85rem',
          }}
        >
          Simplify your workflow and boost your productivity
          <br />
          with <strong>Tuga's App</strong>. Get started for free.<br /><br /><br />
        </Typography>
      </Box>

      {/* Auth Error Banner */}
      {authError && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 3 }}
          onClose={() => setAuthError(null)}
        >
          {authError}
        </Alert>
      )}

      {/* Login Form */}
      <Box component="form" onSubmit={handleLoginSubmit} noValidate>
        {/* Username Field */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (usernameError) validateUsername(e.target.value);
            }}
            onBlur={() => validateUsername(username)}
            error={Boolean(usernameError)}
            helperText={usernameError}
            variant="outlined"
            slotProps={{
              htmlInput: { 'aria-label': 'Username or Email' },
            }}
            sx={{
              '& .MuiFormHelperText-root': {
                ml: 2,
                mt: 0.5,
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ mb: 1 }}>
          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            onBlur={() => validatePassword(password)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            variant="outlined"
            slotProps={{
              htmlInput: { 'aria-label': 'Password' },
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: '#9CA3AF' }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined fontSize="small" />
                      ) : (
                        <VisibilityOutlined fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiFormHelperText-root': {
                ml: 2,
                mt: 0.5,
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>

        {/* Forgot Password Link */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Typography
            component="button"
            type="button"
            onClick={() => setToastMessage('Password reset link sent to your email.')}
            sx={{
              background: 'none',
              border: 'none',
              p: 0,
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: '#1b1c1dff',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#111827',
                textDecoration: 'underline',
              },
            }}
          >
            Forgot Password?
          </Typography>
        </Box>

        {/* Login Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            height: 48,
            borderRadius: 9999,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            fontSize: '0.9375rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            textTransform: 'none',
            mb: 3.5,
            '&:hover': {
              backgroundColor: '#1F2937',
            },
          }}
        >
          Login
        </Button>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          px: 1,
        }}
      >
        <Divider sx={{ flexGrow: 1, borderColor: '#E5E7EB' }} />
        <Typography
          variant="body2"
          sx={{
            px: 2,
            color: '#1b1c1dff',
            fontSize: '0.8125rem',
            fontWeight: 400,
            whiteSpace: 'nowrap',
          }}
        >
          or continue with
        </Typography>
        <Divider sx={{ flexGrow: 1, borderColor: '#E5E7EB' }} />
      </Box>

      {/* Social Logins */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2.5,
          mb: 4,
        }}
      >
        {/* Google Button */}
        <Tooltip title="Sign in with Google" arrow>
          <span>
            <IconButton
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              aria-label="Sign in with Google"
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1.5px solid #000000ff',
                backgroundColor: '#000000ff',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#222426ff',
                  borderColor: '#222426ff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              {isGoogleLoading ? (
                <CircularProgress size={20} sx={{ color: '#ffffffff' }} />
              ) : (
                <GoogleIcon size={20} />
              )}
            </IconButton>
          </span>
        </Tooltip>

        {/* Apple Button */}
        <Tooltip title="Sign in with Apple" arrow>
          <IconButton
            onClick={() => handleSocialPlaceholder('Apple')}
            aria-label="Sign in with Apple"
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1.5px solid #000000ff',
              backgroundColor: '#000000ff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#222426ff',
                borderColor: '#222426ff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <AppleIcon size={20} />
          </IconButton>
        </Tooltip>

        {/* Facebook Button */}
        <Tooltip title="Sign in with Facebook" arrow>
          <IconButton
            onClick={() => handleSocialPlaceholder('Facebook')}
            aria-label="Sign in with Facebook"
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1.5px solid #000000ff',
              backgroundColor: '#000000ff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#222426ff',
                borderColor: '#222426ff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <FacebookIcon size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Footer Register Prompt */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="body2"
          sx={{
            color: '#1b1c1dff',
            fontSize: '0.875rem',
          }}
        >
          Not a member?{' '}
          <Box
            component="span"
            onClick={() => setToastMessage('Registration feature coming soon!')}
            sx={{
              color: '#9FD094',
              fontWeight: 200,
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Register now
          </Box>
        </Typography>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={4500}
        onClose={() => setToastMessage(null)}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};
