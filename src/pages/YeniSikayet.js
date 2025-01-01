import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Autocomplete,
  Chip,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  ImageList,
  ImageListItem,
  Alert,
  Snackbar
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';

const YeniSikayet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { mode } = useTheme();
  const [sikayetTuru, setSikayetTuru] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOppen, setAlertOppen] = useState(false);

  // Test amaçlı örnek oyuncu listesi
  const mockPlayers = [
    { id: 1, name: "Player123" },
    { id: 2, name: "XPlayer456" },
    { id: 3, name: "ProGamer789" },
    { id: 4, name: "PlayerOne" },
    { id: 5, name: "ThePlayer" },
    { id: 6, name: "PlayerTwo" },
    { id: 7, name: "GamerPro" },
    { id: 8, name: "ProPlayer" }
  ];

  // Arama fonksiyonu
  const searchPlayers = (searchText) => {
    setLoading(true);
    setTimeout(() => {
      const filteredPlayers = mockPlayers
        .filter(player => 
          player.name.toLowerCase().includes(searchText.toLowerCase()) &&
          !selectedPlayers.includes(player.name)
        )
        .map(player => player.name);
      setOptions(filteredPlayers);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      searchPlayers(searchTerm);
    } else {
      setOptions([]);
    }
  }, [searchTerm]);

  const handlePlayerSelect = (event, newValue) => {
    if (newValue && !selectedPlayers.includes(newValue)) {
      setSelectedPlayers([...selectedPlayers, newValue]);
      setSearchTerm('');
    }
  };

  const handlePlayerDelete = (playerToDelete) => {
    setSelectedPlayers(selectedPlayers.filter(player => player !== playerToDelete));
  };

  const sikayetTurleri = [
    { id: 'oyuncu', label: 'Oyuncu Şikayeti' },
    { id: 'yetkili', label: 'Yetkili Şikayeti' },
    { id: 'olusum', label: 'Oluşum Şikayeti' }
  ];

  // Resim yükleme fonksiyonu
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  // Resim silme fonksiyonu
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!selectedPlayers.length || !sikayetTuru || !aciklama.trim()) {
      setAlertMessage('Lütfen tüm gerekli alanları doldurunuz:' + 
        (!selectedPlayers.length ? '\n• Şikayet edilen oyuncu' : '') +
        (!sikayetTuru ? '\n• Şikayet türü' : '') +
        (!aciklama.trim() ? '\n• Şikayet açıklaması' : '')
      );
      setAlertOpen(true);
      return;
    }


    setAlertMessage('Şikayetiniz başarılı bir şekilde oluşturuldu.');
    setAlertOppen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ 
      mt: isMobile ? 2 : 4,
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: mode === 'light' ? '#e0e0e0' : '#424242',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: mode === 'light' ? '#bdbdbd' : '#616161',
      }
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          sx={{ 
            mb: 3,
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          Yeni Şikayet Oluştur
        </Typography>
        <Card
          sx={{
            width: '100%',
            maxWidth: isTablet ? '100%' : '800px',
            boxShadow: theme.shadows[3]
          }}
        >
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: isMobile ? 2 : 3 
              }}
            >
              <Autocomplete
                value={sikayetTurleri.find(tur => tur.id === sikayetTuru) || null}
                onChange={(event, newValue) => {
                  setSikayetTuru(newValue ? newValue.id : '');
                }}
                options={sikayetTurleri}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Şikayet Türü"
                    required
                    fullWidth
                  />
                )}
              />
              <Box>
                <Box 
                  sx={{ 
                    mb: 2, 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                    minHeight: '40px'
                  }}
                >
                  {selectedPlayers.map((player) => (
                    <Chip
                      key={player}
                      label={player}
                      onDelete={() => handlePlayerDelete(player)}
                      sx={{
                        border: '1px solid #1976d2',
                        backgroundColor: '#fff',
                        '& .MuiChip-deleteIcon': {
                          color: '#1976d2',
                          '&:hover': {
                            color: '#f44336'
                          }
                        },
                        fontSize: isMobile ? '0.8rem' : '0.875rem'
                      }}
                    />
                  ))}
                </Box>
                <Autocomplete
                  freeSolo
                  value={searchTerm}
                  options={options}
                  loading={loading}
                  onChange={handlePlayerSelect}
                  onInputChange={(event, newValue) => {
                    setSearchTerm(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Şikayet Edilen Oyuncu" 
                      variant="outlined"
                      placeholder={selectedPlayers.length === 0 ? "Oyuncu ara..." : ""}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading && "Aranıyor..."}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      required
                    />
                  )}
                />
              </Box>
              <TextField 
                label="Şikayet Nedeni" 
                fullWidth 
                multiline 
                rows={isMobile ? 3 : 4}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: mode === 'light' ? '#ffffff' : '#'
                  }
                }}
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value)}
                required
              />
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="subtitle1" gutterBottom alignSelf="flex-start">
                  Fotoğraflar
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    border: '2px dashed',
                    borderColor: theme.palette.upload.border,
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: theme.palette.upload.background,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.upload.hoverBackground,
                    }
                  }}
                  component="label"
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                  <CloudUpload 
                    sx={{ 
                      fontSize: 40,
                      color: theme.palette.upload.text,
                      mb: 2,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: theme.palette.upload.hoverText
                      }
                    }} 
                  />
                  <Typography 
                    sx={{
                      color: theme.palette.upload.text,
                      '&:hover': {
                        color: theme.palette.upload.hoverText
                      }
                    }}
                  >
                    Fotoğrafları sürükleyin veya seçmek için tıklayın
                  </Typography>
                </Box>

                {images.length > 0 && (
                  <ImageList sx={{ mt: 2 }} cols={4} rowHeight={164}>
                    {images.map((image, index) => (
                      <ImageListItem key={index} sx={{ position: 'relative' }}>
                        <img
                          src={image.preview}
                          alt={`Uploaded ${index + 1}`}
                          loading="lazy"
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(0,0,0,0.6)',
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.8)'
                            }
                          }}
                          size="small"
                          onClick={() => removeImage(index)}
                        >
                          <Close sx={{ color: '#fff' }} />
                        </IconButton>
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Box>
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  py: isMobile ? 1 : 1.5,
                  mt: 3,
                  fontWeight: 'bold'
                }}
              >
                ŞİKAYET OLUŞTUR
              </Button>

              <Snackbar 
                open={alertOpen} 
                autoHideDuration={6000} 
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert 
                  onClose={() => setAlertOpen(false)} 
                  severity="error" 
                  variant="filled"
                  sx={{ 
                    width: '100%',
                    whiteSpace: 'pre-line'  // Yeni satırları göstermek için
                  }}
                >
                  {alertMessage}
                </Alert>
              </Snackbar>
              <Snackbar
                open={alertOppen}
                autoHideDuration={4000}
                onClose={() => setAlertOppen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert onClose={() => setAlertOppen(false)} severity="success" variant="filled" sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
                  {alertMessage}
                </Alert>
              </Snackbar>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default YeniSikayet; 