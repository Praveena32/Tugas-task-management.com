import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h3: {
      fontWeight: 800,
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
      color: '#111827',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
      color: '#111827',
    },
    body1: {
      fontSize: '0.9375rem',
      color: '#4B5563',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6B7280',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#22C55E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    divider: '#E5E7EB',
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          paddingTop: '12px',
          paddingBottom: '12px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#1F2937',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          backgroundColor: '#FFFFFF',
          fontSize: '0.9375rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E7EB',
            borderWidth: '1.5px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9CA3AF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#111827',
            borderWidth: '1.5px',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#EF4444',
          },
        },
        input: {
          padding: '13px 22px',
          '&::placeholder': {
            color: '#9CA3AF',
            opacity: 1,
          },
        },
      },
    },
  },
});
