import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E9657B',
    },
    secondary: {
      main: '#666666',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    // fontFamily: 'CuatreCasasRegular',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
