import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Sikayetler from './pages/Sikayetler';
import YeniSikayet from './pages/YeniSikayet';
import Ayarlar from './pages/Ayarlar';
import SikayetDetay from './pages/SikayetDetay';
import Footer from './components/Footer';

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Box sx={{ 
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}>
          <CssBaseline />
          <Sidebar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              overflow: 'hidden'
            }}
          >
            <Container 
              maxWidth="lg" 
              sx={{ 
                mt: 8,
                mb: 3,
                flex: 1,
                px: { xs: 2, sm: 3 },
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: theme.palette.mode === 'light' ? '#e0e0e0' : '#424242',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: theme.palette.mode === 'light' ? '#bdbdbd' : '#616161',
                }
              }}
            >
              <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Routes>
                  <Route path="/" element={<Sikayetler />} />
                  <Route path="/yeni-sikayet" element={<YeniSikayet />} />
                  <Route path="/ayarlar" element={<Ayarlar />} />
                  <Route path="/sikayet/:id" element={<SikayetDetay />} />
                </Routes>
              </Box>
            </Container>
            <Footer />
          </Box>
        </Box>
      </Router>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
