import { Box, Typography, Container, Link } from '@mui/material';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

const Footer = () => {
  const { mode } = useCustomTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
        borderTop: mode === 'light' 
          ? '1px solid #e0e0e0'
          : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#"
              underline="hover"
              sx={{ 
                color: mode === 'light' ? '#666666' : '#ffffff',
                '&:hover': { color: '#2e7d32' }
              }}
            >
              Kurallar
            </Link>
            <Link
              href="#"
              underline="hover"
              sx={{ 
                color: mode === 'light' ? '#666666' : '#ffffff',
                '&:hover': { color: '#2e7d32' }
              }}
            >
              Gizlilik
            </Link>
            <Link
              href="#"
              underline="hover"
              sx={{ 
                color: mode === 'light' ? '#666666' : '#ffffff',
                '&:hover': { color: '#2e7d32' }
              }}
            >
              İletişim
            </Link>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: mode === 'light' ? '#666666' : '#ffffff',
            }}
          >
            Baris Demirci tarafından React ile geliştirildi
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 