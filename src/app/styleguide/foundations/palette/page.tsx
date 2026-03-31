'use client';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { colors } from '@/theme/brandTheme';

interface SwatchProps {
  weight: string;
  hex: string;
}

function ColorSwatch({ weight, hex }: SwatchProps) {
  const isDark = parseInt(weight, 10) >= 500;
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
  };

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.1s',
          '&:active': { transform: 'scale(0.95)' },
          '&:hover .swatch-color': { filter: 'brightness(1.05)' }
        }}
      >
        <Box 
          className="swatch-color"
          sx={{ 
            width: 84, 
            height: 72, 
            bgcolor: hex, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            border: '1px solid rgba(0,0,0,0.08)',
            borderBottom: 'none',
            transition: 'filter 0.2s'
          }}
        >
          <Typography sx={{ color: isDark ? '#fff' : '#000', fontSize: 13, fontWeight: 700, fontFamily: '"Open Sans", monospace' }}>
            {weight}
          </Typography>
        </Box>
        <Box sx={{ width: 84, py: 0.75, bgcolor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, display: 'flex', justifyContent: 'center' }}>
           <Typography sx={{ fontFamily: '"Open Sans", monospace', fontSize: 11, color: '#212121', fontWeight: 600 }}>
             {hex}
           </Typography>
        </Box>
      </Box>
      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        message={`Copied ${hex} to clipboard`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

function ColorScale({ title, scale }: { title: string, scale: Record<string, string> }) {
  const weights = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2 }}>
      <Typography sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: 16, mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {weights.map((w) => (
          <ColorSwatch key={w} weight={w} hex={scale[w as keyof typeof scale]} />
        ))}
      </Box>
    </Paper>
  );
}

export default function PalettePage() {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: 36, color: '#212121', letterSpacing: -0.5, mb: 1 }}>
          Color Warehouse (Palette)
        </Typography>
        <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 16, color: '#5e6e7d', lineHeight: 1.6 }}>
          The unified palette containing full 50-900 ranges for all structural colors. Click any hex block to copy it to your clipboard.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="EDGE Turquoise" scale={colors.edgeTurquoise} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="EDGE Blue" scale={colors.edgeBlue} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="Grey (Neutrals)" scale={colors.grey} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="Blue Grey (Neutrals)" scale={colors.blueGrey} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="Red (Error Structure)" scale={colors.red} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="Orange (Warning Structure)" scale={colors.orange} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="Blue (Info Structure)" scale={colors.blue} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ColorScale title="Green (Success Structure)" scale={colors.green} />
        </Grid>
      </Grid>
    </Box>
  );
}
