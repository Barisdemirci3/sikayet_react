import { Box, Typography, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import Switch from 'react-switch';

const Ayarlar = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const { mode } = useCustomTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleNotificationChange = (checked) => {
    setNotificationEnabled(checked);
    setAlertMessage('Bildirim ayarı başarılı bir şekilde değiştirildi.');
    setAlertOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Ayarlar</Typography>
      <Box sx={{ 
        p: 3, 
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: mode === 'light' 
          ? '0 2px 8px rgba(0,0,0,0.08)'
          : '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2 
        }}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={500}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setAlertOpen(false)} severity="warning" sx={{  color: mode === 'light' ? '#333333' : '#ffffff' }}>
              {alertMessage.trim()}
            </Alert>
          </Snackbar>
          <Switch
            checked={notificationEnabled}
            onChange={handleNotificationChange}
            onColor="#2e7d32"
            offColor={mode === 'light' ? "#E0E0E0" : "#39393D"}
            checkedIcon={false}
            uncheckedIcon={false}
            height={24}
            width={48}
            handleDiameter={20}
            boxShadow="0 2px 4px rgba(0,0,0,0.2)"
            activeBoxShadow="0 0 1px 2px rgba(0,0,0,0.1)"
          />
          <Typography sx={{ 
            color: mode === 'light' ? '#333333' : '#ffffff',
            flex: 1
          }}>
            Payday geldiğinde oyundan şikayet var ise bildirim gönder
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Ayarlar; 