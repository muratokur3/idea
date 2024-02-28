import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const MyThemeProvider = ({ children }) => {
  const useTheme = useSelector(state => state.ui.useTheme);

  const providerTheme = createTheme(useTheme);

  return (
    <ThemeProvider theme={providerTheme}>
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;