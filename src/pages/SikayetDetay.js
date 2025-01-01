import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  ImageList, 
  ImageListItem,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZoomIn, Close, ArrowBack, Send, CloudUpload } from '@mui/icons-material';
import { set } from 'lodash';

const SikayetDetay = () => {
  const { id } = useParams();
  const { mode } = useCustomTheme();
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [yorum, setYorum] = useState('');
  const [yorumFoto, setYorumFoto] = useState(null);
  const [yetkili, setYetkili] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [yorumlar] = useState([
    {
      id: 1,
      yazan: "Marcus_Stone",
      tarih: "2024-03-22 15:30",
      mesaj: "Bu olayın şahidiyim, gerçekten de bölge hakimiyetini hiçe sayarak hareket ediyor.",
      avatar: null,
      foto: null
    },
    {
      id: 2,
      yazan: "Kash_Mcgowan",
      tarih: "2024-03-22 16:45",
      mesaj: "Kesinlikle katılmıyorum. Bölgede legal işler yapıyordum, herhangi bir uyarı almadım.",
      avatar: null,
      foto: null
    },
    {
      id: 3,
      yazan: "John_Doe",
      tarih: "2024-03-22 17:20",
      mesaj: "Ben de şahidim, ekran görüntüsünü paylaşıyorum.",
      avatar: null,
      foto: "https://wallpapercat.com/w/full/f/e/c/2475-1920x1080-desktop-1080p-grand-theft-auto-5-background-image.jpg"
    }
  ]);

  const defaultImageUrl = "https://wallpapercat.com/w/full/f/e/c/2475-1920x1080-desktop-1080p-grand-theft-auto-5-background-image.jpg";

  const sikayetler = [
    {
      id: 1,
      sikayet_eden: "James_Carter",
      sikayet_edilen: "Kash_Mcgowan",
      tarih: "2024-03-22",
      durum: "İnceleniyor",
      yetkili: "Manifesto",
      sikayetTuru: "olusum",
      aciklama: "Grove Street bölgesinde izinsiz uyuşturucu satışı yapıyor...",
      detay: "Grove Street bölgesinde izinsiz uyuşturucu satışı yapıyor. Bölge hakimiyetini hiçe sayarak, oluşumumuzun bölgesinde yasadışı faaliyetler gerçekleştiriyor ve uyarılara rağmen devam ediyor.",
      fotolar: [defaultImageUrl, defaultImageUrl]
    },
    {
      id: 2,
      sikayet_eden: "Michael_Hayes",
      sikayet_edilen: "Tommy_Blackwood",
      tarih: "2024-03-21",
      durum: "Çözüldü",
      yetkili: "Manifesto",
      sikayetTuru: "oyuncu",
      aciklama: "Silah çekme animasyonunu kullanmadan direk ateş ediyor...",
      detay: "Silah çekme animasyonunu kullanmadan direk ateş ediyor (Combat Log). Ayrıca ölüm rolü yapmadan respawn atıyor ve tekrar çatışmaya giriyor (NVL).",
      fotolar: [defaultImageUrl, defaultImageUrl]
    },
    {
      id: 3,
      sikayet_eden: "Frank_Murphy",
      sikayet_edilen: "Lucas_King",
      tarih: "2024-03-20",
      durum: "İnceleniyor",
      yetkili: "John_Admin",
      sikayetTuru: "yetkili",
      aciklama: "Yetkili Lucas_King, sebepsiz yere karakterimi jail'e attı...",
      detay: "Yetkili Lucas_King, sebepsiz yere karakterimi jail'e attı ve OOC hakaret etti. Durumu üst yetkiliye bildirmek istiyorum.",
      fotolar: [defaultImageUrl, defaultImageUrl]
    },
    {
      id: 4,
      sikayet_eden: "Vincent_Romano",
      sikayet_edilen: "Irish_Mob",
      tarih: "2024-03-19",
      durum: "Çözüldü",
      yetkili: "Manifesto",
      sikayetTuru: "olusum",
      aciklama: "Little Italy bölgesinde izinsiz mafya rolü yapıyorlar...",
      detay: "Little Italy bölgesinde izinsiz mafya rolü yapıyorlar. Bölge bizim kontrolümüzde olmasına rağmen, sürekli bölgemizde illegal işler yapıp çatışma çıkarıyorlar.",
      fotolar: [defaultImageUrl, defaultImageUrl]
    },
    {
      id: 5,
      sikayet_eden: "Antonio_Leone",
      sikayet_edilen: "Jack_Thompson",
      tarih: "2024-03-18",
      durum: "İnceleniyor",
      yetkili: null,
      sikayetTuru: "oyuncu",
      aciklama: "Meta gaming yapıyor. Discord üzerinden öğrendiği bilgileri...",
      detay: "Meta gaming yapıyor. Discord üzerinden öğrendiği bilgileri IC olarak kullanıyor. Ayrıca karakter değiştirip tekrar aynı olaya müdahale ediyor (Character Switching).",
      fotolar: [defaultImageUrl, defaultImageUrl]
    }
  ];

  const sikayet = sikayetler.find(s => s.id === parseInt(id));

  useEffect(() => {
    if (!sikayet) {
      navigate('/');
    }
  }, [sikayet, navigate]);

  useEffect(() => {
    if (sikayet) {
      setYetkili(sikayet.yetkili || '');
    }
  }, [sikayet]);

  if (!sikayet) return null;

  const yetkililer = [
    "Manifesto",
    "John_Admin",
    "SuperAdmin",
    "ModeratorPro",
    "AdminHelper"
  ];

  const getSikayetTuruBadge = (tur) => {
    const turBilgileri = {
      oyuncu: {
        label: 'Oyuncu Şikayeti',
        color: mode => ({
          bg: mode === 'light' ? '#e8f5e9' : '#1b5e20',
          text: mode === 'light' ? '#2e7d32' : '#81c784',
          icon: '👤'
        })
      },
      yetkili: {
        label: 'Yetkili Şikayeti',
        color: mode => ({
          bg: mode === 'light' ? '#e3f2fd' : '#0d47a1',
          text: mode === 'light' ? '#1565c0' : '#90caf9',
          icon: '👮'
        })
      },
      olusum: {
        label: 'Oluşum Şikayeti',
        color: mode => ({
          bg: mode === 'light' ? '#f3e5f5' : '#4a148c',
          text: mode === 'light' ? '#7b1fa2' : '#ce93d8',
          icon: '🏢'
        })
      }
    };

    const turBilgisi = turBilgileri[tur];
    const colors = turBilgisi.color(mode);

    return (
      <Box sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: colors.bg,
        color: colors.text,
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: 500
      }}>
        <span>{turBilgisi.icon}</span>
        {turBilgisi.label}
      </Box>
    );
  };

  const handleYorumFotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setYorumFoto(URL.createObjectURL(file));
    }
  };

  const handleYorumGonder = () => {
    if (!yorum.trim()) return;
    
    console.log('Yorum gönderildi:', { yorum, foto: yorumFoto });
    setYorum('');
    setYorumFoto(null);
    setAlertMessage('Yorumunuz başarılı bir şekilde gönderildi.');
    setAlertOpen(true);
  };

  const YorumItem = ({ yorum }) => (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: mode === 'light' 
          ? '#f8f9fa' 
          : 'rgba(255,255,255,0.05)',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 1,
        gap: 1
      }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: mode === 'light' 
              ? '#e0e0e0' 
              : 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: mode === 'light' ? '#666666' : '#ffffff'
          }}
        >
          {yorum.yazan.charAt(0)}
        </Box>
        <Typography 
          variant="subtitle2"
          sx={{ 
            fontWeight: 600,
            flex: 1
          }}
        >
          {yorum.yazan}
        </Typography>
        <Typography 
          variant="caption"
          sx={{ 
            color: mode === 'light' ? '#666666' : '#999999'
          }}
        >
          {yorum.tarih}
        </Typography>
      </Box>
      <Typography sx={{ pl: 5, mb: yorum.foto ? 2 : 0 }}>
        {yorum.mesaj}
      </Typography>
      {yorum.foto && (
        <Box sx={{ pl: 5 }}>
          <img
            src={yorum.foto}
            alt="Yorum kanıtı"
            style={{
              maxWidth: '100%',
              maxHeight: 200,
              borderRadius: 8,
              cursor: 'pointer'
            }}
            onClick={() => setSelectedImage(yorum.foto)}
          />
        </Box>
      )}
    </Box>
  );

  const handleYetkiliChange = (event) => {
    setYetkili(event.target.value);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{
          color: mode === 'light' ? '#666666' : '#ffffff',
          mb: 2,
          pl: 0,
          '&:hover': {
            backgroundColor: 'transparent',
            color: mode === 'light' ? '#333333' : '#e0e0e0'
          }
        }}
      >
        Şikayetlere Geri Dön
      </Button>
      
      <Typography variant="h4" sx={{ mb: 3 }}>
        Şikayet Detayı #{id}
      </Typography>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 3 
          }}>
            <Box>
              {getSikayetTuruBadge(sikayet.sikayetTuru)}
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Şikayet Eden
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {sikayet.sikayet_eden}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Şikayet Edilen
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {sikayet.sikayet_edilen}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Typography variant="body2" color="textSecondary">
                {sikayet.tarih}
              </Typography>
              <Chip 
                label={sikayet.durum} 
                color={sikayet.durum === 'Çözüldü' ? 'success' : 'warning'}
              />
              {yetkili ? (
                <Chip
                  label={`Yetkili: ${yetkili}`}
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderWidth: 2,
                    fontWeight: 500
                  }}
                />
              ) : (
                <FormControl 
                  size="small" 
                  sx={{ 
                    minWidth: 200,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: mode === 'light' ? '#ffffff' : 'rgba(255,255,255,0.05)'
                    }
                  }}
                >
                  <InputLabel>Yetkili Ata</InputLabel>
                  <Select
                    value={yetkili}
                    onChange={handleYetkiliChange}
                    label="Yetkili Ata"
                  >
                    <MenuItem value="">
                      <em>Yetkili Seçilmedi</em>
                    </MenuItem>
                    {yetkililer.map((yetkiliAdi) => (
                      <MenuItem 
                        key={yetkiliAdi} 
                        value={yetkiliAdi}
                        sx={{
                          '&:hover': {
                            backgroundColor: mode === 'light' 
                              ? 'rgba(0, 0, 0, 0.04)' 
                              : 'rgba(255, 255, 255, 0.08)'
                          }
                        }}
                      >
                        {yetkiliAdi}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Detaylı Açıklama
            </Typography>
            <Typography 
              sx={{ 
                backgroundColor: mode === 'light' ? '#f8f9fa' : '#2d2d2d',
                p: 2,
                borderRadius: 1
              }}
            >
              {sikayet.detay}
            </Typography>
          </Box>

          {sikayet.fotolar && sikayet.fotolar.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Kanıt Fotoğrafları
              </Typography>
              <ImageList cols={3} gap={16}>
                {sikayet.fotolar.map((foto, index) => (
                  <ImageListItem 
                    key={index}
                    sx={{ 
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover .zoom-overlay': {
                        opacity: 1
                      }
                    }}
                    onClick={() => setSelectedImage(foto)}
                  >
                    <img
                      src={foto}
                      alt={`Kanıt ${index + 1}`}
                      loading="lazy"
                      style={{ 
                        borderRadius: 8,
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <Box 
                      className="zoom-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        borderRadius: 2
                      }}
                    >
                      <ZoomIn sx={{ color: '#ffffff', fontSize: 32 }} />
                    </Box>
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Yorumlar ({yorumlar.length})
          </Typography>

          <Box sx={{ mb: 4 }}>
            {yorumlar.map((yorum) => (
              <YorumItem key={yorum.id} yorum={yorum} />
            ))}
          </Box>

          <Box sx={{ 
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start'
          }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: mode === 'light' 
                  ? '#e0e0e0' 
                  : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 500,
                color: mode === 'light' ? '#666666' : '#ffffff',
                flexShrink: 0
              }}
            >
              Y
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                multiline
                rows={2}
                fullWidth
                placeholder="Yorumunuzu yazın..."
                value={yorum}
                onChange={(e) => setYorum(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: mode === 'light' 
                      ? '#ffffff' 
                      : 'rgba(255,255,255,0.05)'
                  }
                }}
              />
              {yorumFoto && (
                <Box sx={{ mt: 1, position: 'relative', display: 'inline-block' }}>
                  <img
                    src={yorumFoto}
                    alt="Yüklenen fotoğraf"
                    style={{
                      maxHeight: 100,
                      borderRadius: 4
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                    }}
                    onClick={() => setYorumFoto(null)}
                  >
                    <Close sx={{ fontSize: 16, color: '#fff' }} />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component="label"
                variant="outlined"
                sx={{ 
                  minWidth: 'unset',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  p: 0
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleYorumFotoUpload}
                />
                <CloudUpload />
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!yorum.trim()}
                onClick={handleYorumGonder}
                sx={{ 
                  minWidth: 'unset',
                  width: 48,
                  height: 48,
                  borderRadius: '50%'
                }}
              >
                <Send />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success" variant="filled" sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Dialog 
        open={!!selectedImage} 
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <Close sx={{ color: '#ffffff' }} />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Büyütülmüş görüntü"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SikayetDetay; 