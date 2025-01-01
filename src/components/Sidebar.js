import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Box,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Report, 
  AddCircle, 
  Settings,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, toggleTheme } = useCustomTheme();
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Şikayetler', icon: <Report />, path: '/' },
    { text: 'Yeni Şikayet', icon: <AddCircle />, path: '/yeni-sikayet' },
    { text: 'Ayarlar', icon: <Settings />, path: '/ayarlar' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderBottom: mode === 'light' 
            ? '1px solid #e0e0e0'
            : '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            color: mode === 'light' ? '#333333' : '#ffffff',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          Şikayet Sistemi
        </Typography>
      </Box>
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ 
        p: 2, 
        borderTop: mode === 'light' 
          ? '1px solid #e0e0e0'
          : '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Tooltip title={mode === 'light' ? 'Koyu Tema' : 'Açık Tema'}>
          <IconButton onClick={toggleTheme} sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 