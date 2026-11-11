import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1a73e8', dark: '#1662c4' },
    secondary: { main: '#344767' },
    background: { default: '#f0f2f5', paper: '#fff' },
    text: { primary: '#344767', secondary: '#7b809a' },
    error: { main: '#f44335' },
    success: { main: '#4caf50' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: { fontWeight: 700, fontSize: '1.65rem' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: '#f0f2f5' } },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 13, boxShadow: '0 4px 20px rgba(0,0,0,.055)' },
      },
    },
    MuiButton: { defaultProps: { disableElevation: true } },
  },
})
