import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Tema renkleri
const lightTheme = {
  primary: {
    main: '#1a5d1a',
    light: '#2e7d32',
    dark: '#103d10',
  },
  secondary: {
    main: '#43a047',
    light: '#66bb6a',
    dark: '#2e7d32',
  },
  background: {
    default: '#f8f9fa',
    paper: '#ffffff',
  },
  text: {
    primary: '#2c3e50',
    secondary: '#546e7a',
  },
  upload: {
    border: '#e0e0e0',
    text: '#666666',
    background: '#ffffff',
    hoverBackground: '#f8f9fa',
    hoverText: '#2e7d32'
  }
};

const darkTheme = {
  primary: {
    main: '#2e7d32',
    light: '#43a047',
    dark: '#1a5d1a',
  },
  secondary: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#43a047',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
  },
  upload: {
    border: 'rgba(255,255,255,0.2)',
    text: '#ffffff',
    background: '#1e1e1e',
    hoverBackground: '#2d2d2d',
    hoverText: '#2e7d32'
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Sistem temasını kontrol eden medya sorgusu
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Başlangıç değeri olarak sistem temasını kullan
  const [mode, setMode] = useState(prefersDarkMode.matches ? 'dark' : 'light');

  // Sistem teması değiştiğinde otomatik güncelle
  useEffect(() => {
    const handler = (e) => setMode(e.matches ? 'dark' : 'light');
    prefersDarkMode.addListener(handler);
    return () => prefersDarkMode.removeListener(handler);
  }, []);

  const theme = useMemo(() => 
    createTheme({
      typography: {
        fontFamily: [
          'Poppins',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif'
        ].join(','),
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { fontWeight: 600 },
      },
      palette: {
        mode,
        ...(mode === 'light' ? lightTheme : darkTheme),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              overflow: 'hidden',
              backgroundColor: mode === 'light' ? '#f8f9fa' : '#121212',
              transition: 'background-color 0.3s ease'
            }
          }
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
              color: mode === 'light' ? '#333333' : '#ffffff',
              borderRight: mode === 'light' 
                ? '1px solid #e0e0e0'
                : '1px solid rgba(255,255,255,0.1)',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
              boxShadow: mode === 'light' 
                ? '0 2px 8px rgba(0,0,0,0.08)'
                : '0 2px 8px rgba(0,0,0,0.2)',
              '& .MuiCardContent-root': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e'
              }
            }
          }
        },
        MuiListItem: {
          styleOverrides: {
            root: {
              margin: '4px 8px',
              borderRadius: 8,
              '&:hover': {
                backgroundColor: mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.04)'
                  : 'rgba(255, 255, 255, 0.1)'
              },
              '&.Mui-selected': {
                backgroundColor: mode === 'light'
                  ? 'rgba(0, 0, 0, 0.08)'
                  : 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  backgroundColor: mode === 'light'
                    ? 'rgba(0, 0, 0, 0.12)'
                    : 'rgba(255, 255, 255, 0.2)'
                }
              }
            }
          }
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              color: mode === 'light' ? '#666666' : 'rgba(255, 255, 255, 0.9)',
              minWidth: 40
            }
          }
        },
        MuiListItemText: {
          styleOverrides: {
            primary: {
              color: mode === 'light' ? '#333333' : '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                '& fieldset': {
                  borderColor: mode === 'light' ? '#e0e0e0' : 'rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                },
                '&:hover fieldset': {
                  borderColor: '#2e7d32'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2e7d32'
                }
              },
              '& .MuiInputBase-input': {
                color: mode === 'light' ? '#333333' : '#ffffff'
              },
              '& .MuiInputLabel-root': {
                color: mode === 'light' ? '#666666' : '#ffffff'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2e7d32'
              }
            }
          }
        },
        MuiAutocomplete: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e'
              }
            },
            popper: {
              '& .MuiPaper-root': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                color: mode === 'light' ? '#333333' : '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }
            },
            listbox: {
              backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
              '& .MuiAutocomplete-option': {
                color: mode === 'light' ? '#333333' : '#ffffff',
                '&[data-focus="true"]': {
                  backgroundColor: mode === 'light' 
                    ? 'rgba(46, 125, 50, 0.08)' 
                    : 'rgba(67, 160, 71, 0.2)'
                }
              }
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            root: {
              '&.MuiChip-filled': {
                '&.MuiChip-colorSuccess': {
                  backgroundColor: '#2e7d32',
                  color: '#ffffff',
                  border: 'none'
                },
                '&.MuiChip-colorWarning': {
                  backgroundColor: '#ed6c02',
                  color: '#ffffff',
                  border: 'none'
                }
              },
              '&:not(.MuiChip-colorSuccess):not(.MuiChip-colorWarning)': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                border: '1px solid #2e7d32',
                borderRadius: '16px',
                color: mode === 'light' ? '#333333' : '#ffffff',
                '& .MuiChip-deleteIcon': {
                  color: '#2e7d32',
                  '&:hover': {
                    color: '#f44336'
                  }
                }
              }
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 600,
              padding: '8px 20px'
            },
            contained: {
              backgroundColor: '#2e7d32',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#43a047'
              },
              '&.Mui-disabled': {
                backgroundColor: mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.12)' 
                  : 'rgba(255, 255, 255, 0.12)',
                color: mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.26)' 
                  : 'rgba(255, 255, 255, 0.3)'
              }
            }
          }
        },
        MuiBox: {
          styleOverrides: {
            root: {
              '&.upload-box': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                border: `2px dashed ${mode === 'light' ? '#e0e0e0' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#2e7d32',
                  backgroundColor: mode === 'light' ? '#f8f9fa' : '#2d2d2d'
                },
                '& .upload-icon': {
                  color: mode === 'light' ? '#2e7d32' : '#ffffff',
                  fontSize: '40px',
                  marginBottom: '8px'
                },
                '& .upload-text': {
                  color: mode === 'light' ? '#666666' : '#ffffff'
                }
              }
            }
          }
        },
        MuiSwitch: {
          styleOverrides: {
            root: {
              width: 52,
              height: 32,
              padding: 0,
              overflow: 'visible',
              '& .MuiSwitch-switchBase': {
                padding: 0,
                margin: 2,
                transitionDuration: '300ms',
                '&.Mui-checked': {
                  transform: 'translateX(20px)',
                  color: '#ffffff',
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#2e7d32',
                    opacity: 1,
                    border: 0,
                  },
                },
                '& .MuiTouchRipple-root': {
                  display: 'none'
                }
              },
              '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                width: 28,
                height: 28,
                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
                backgroundColor: '#ffffff',
                '&:before': {
                  display: 'none'
                }
              },
              '& .MuiSwitch-track': {
                borderRadius: 32 / 2,
                backgroundColor: mode === 'light' ? '#E0E0E0' : '#39393D',
                opacity: 1,
                transition: 'background-color 500ms',
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                },
                '&:before': {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    mode === 'light' ? '#666666' : '#A1A1A1'
                  )}" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>')`,
                  left: 12,
                },
                '&:after': {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    '#ffffff'
                  )}" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>')`,
                  right: 12,
                  display: 'none',
                },
              },
              '& .Mui-checked': {
                '& + .MuiSwitch-track:before': {
                  display: 'none',
                },
                '& + .MuiSwitch-track:after': {
                  display: 'block',
                },
              },
            },
          },
        },
      }
    }), [mode]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 