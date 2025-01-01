import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip,
  Grid 
} from '@mui/material';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sikayetler = () => {
  const { mode } = useCustomTheme();
  const navigate = useNavigate();

  const sikayetler = [
    {
      id: 1,
      sikayet_eden: "James_Carter",
      sikayet_edilen: "Kash_Mcgowan",
      tarih: "2024-03-22",
      durum: "İnceleniyor",
      yetkili: "Manifesto",
      sikayetTuru: "olusum",
      aciklama: "Grove Street bölgesinde izinsiz uyuşturucu satışı yapıyor..."
    },
    {
      id: 2,
      sikayet_eden: "Michael_Hayes",
      sikayet_edilen: "Tommy_Blackwood",
      tarih: "2024-03-21",
      durum: "Çözüldü",
      yetkili: "Manifesto",
      sikayetTuru: "oyuncu",
      aciklama: "Silah çekme animasyonunu kullanmadan direk ateş ediyor (Combat Log). Ayrıca ölüm rolü yapmadan respawn atıyor ve tekrar çatışmaya giriyor (NVL)."
    },
    {
      id: 3,
      sikayet_eden: "Frank_Murphy",
      sikayet_edilen: "Lucas_King",
      tarih: "2024-03-20",
      durum: "İnceleniyor",
      yetkili: "John_Admin",
      sikayetTuru: "yetkili",
      aciklama: "Yetkili Lucas_King, sebepsiz yere karakterimi jail'e attı ve OOC hakaret etti. Durumu üst yetkiliye bildirmek istiyorum."
    },
    {
      id: 4,
      sikayet_eden: "Vincent_Romano",
      sikayet_edilen: "Irish_Mob",
      tarih: "2024-03-19",
      durum: "Çözüldü",
      yetkili: "Manifesto",
      sikayetTuru: "olusum",
      aciklama: "Little Italy bölgesinde izinsiz mafya rolü yapıyorlar. Bölge bizim kontrolümüzde olmasına rağmen, sürekli bölgemizde illegal işler yapıp çatışma çıkarıyorlar."
    },
    {
      id: 5,
      sikayet_eden: "Antonio_Leone",
      sikayet_edilen: "Jack_Thompson",
      tarih: "2024-03-18",
      durum: "İnceleniyor",
      yetkili: null,
      sikayetTuru: "oyuncu",
      aciklama: "Meta gaming yapıyor. Discord üzerinden öğrendiği bilgileri IC olarak kullanıyor. Ayrıca karakter değiştirip tekrar aynı olaya müdahale ediyor (Character Switching)."
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Şikayetler</Typography>
      <Grid container spacing={3}>
        {sikayetler.map((sikayet) => (
          <Grid item xs={12} md={6} key={sikayet.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: mode === 'light' 
                    ? '0 4px 20px rgba(0,0,0,0.1)'
                    : '0 4px 20px rgba(0,0,0,0.4)'
                }
              }}
              onClick={() => navigate(`/sikayet/${sikayet.id}`)}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Şikayet #{sikayet.id}
                  </Typography>
                  <Chip
                    label={sikayet.sikayetTuru === 'oyuncu' ? '👤 Oyuncu' : 
                           sikayet.sikayetTuru === 'yetkili' ? '👮 Yetkili' : '🏢 Oluşum'}
                    size="small"
                    sx={{
                      backgroundColor: mode === 'light' 
                        ? '#f5f5f5' 
                        : 'rgba(255,255,255,0.1)',
                      fontWeight: 500
                    }}
                  />
                </Box>
                <Typography 
                  variant="body1" 
                  gutterBottom
                  sx={{ color: mode === 'light' ? '#333333' : '#ffffff' }}
                >
                  <strong>Şikayet Eden:</strong> {sikayet.sikayet_eden}
                </Typography>
                <Typography 
                  variant="body1" 
                  gutterBottom
                  sx={{ color: mode === 'light' ? '#333333' : '#ffffff' }}
                >
                  <strong>Şikayet Edilen:</strong> {sikayet.sikayet_edilen}
                </Typography>
                <Typography 
                  variant="body2" 
                  gutterBottom
                  sx={{ 
                    color: mode === 'light' ? '#666666' : '#cccccc',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {sikayet.aciklama}
                </Typography>
                <Box sx={{ 
                  mt: 'auto',
                  pt: 2,
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: 1 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minHeight: 32 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ color: mode === 'light' ? '#666666' : '#ffffff' }}
                    >
                      {sikayet.tarih}
                    </Typography>
                    {sikayet.yetkili ? (
                      <Chip 
                        label={`Yetkili: ${sikayet.yetkili}`}
                        size="small"
                        sx={{ 
                          backgroundColor: mode === 'light' ? '#e3f2fd' : '#1a237e',
                          color: mode === 'light' ? '#1565c0' : '#ffffff',
                          fontWeight: 500
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          backgroundColor: mode === 'light' ? '#fff5f5' : '#410002',
                          color: mode === 'light' ? '#d32f2f' : '#ff8a80',
                          border: `1px solid ${mode === 'light' ? '#ffcdd2' : '#b71c1c'}`,
                          borderRadius: '16px',
                          px: 1,
                          py: 0.5,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          '& svg': {
                            fontSize: '0.875rem'
                          }
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          ⚠️
                        </span>
                        Yetkili Atanmadı
                      </Box>
                    )}
                  </Box>
                  <Chip 
                    label={sikayet.durum} 
                    color={sikayet.durum === 'Çözüldü' ? 'success' : 'warning'}
                    variant="filled"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Sikayetler; 