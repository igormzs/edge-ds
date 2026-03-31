'use client';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';

interface SwatchProps {
  name: string;
  token: string;
  color: string;
  textColor?: string;
}

function ColorSwatch({ name, token, color, textColor = '#fff' }: SwatchProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
  };

  return (
    <>
      <Paper
        elevation={0}
        onClick={handleCopy}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
          cursor: 'pointer',
          transition: 'transform 0.1s ease',
          '&:active': { transform: 'scale(0.98)' },
          '&:hover': { borderColor: 'rgba(0,0,0,0.2)' }
        }}
      >
        <Box
          sx={{
            height: 96,
            bgcolor: color,
            display: 'flex',
            alignItems: 'flex-end',
            p: 1.5,
          }}
        >
          <Chip
            label={color}
            size="small"
            sx={{
              bgcolor: 'rgba(0,0,0,0.25)',
              color: textColor,
              fontFamily: '"Open Sans", monospace',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          />
        </Box>
        <Box sx={{ px: 2, py: 1.5, bgcolor: '#fff' }}>
          <Typography
            sx={{
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 600,
              fontSize: 13,
              color: '#212121',
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: 11,
              color: '#9e9e9e',
              mt: 0.25,
            }}
          >
            {token}
          </Typography>
        </Box>
      </Paper>
      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        message={`Copied ${color} to clipboard`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

interface TypeSpecimenProps {
  label: string;
  sample: string;
  spec: string;
  sx?: object;
}

function TypeSpecimen({ label, sample, spec, sx = {} }: TypeSpecimenProps) {
  return (
    <Box
      sx={{
        py: 2.5,
        px: 3,
        borderRadius: 2,
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, fontWeight: 600, color: '#9e9e9e', letterSpacing: 1, textTransform: 'uppercase' }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#bdbdbd' }}>
          {spec}
        </Typography>
      </Box>
      <Box sx={sx}>
        {sample}
      </Box>
    </Box>
  );
}

export default function DesignTokensPage() {
  const colorGroups = [
    {
      title: 'Primary Branding',
      swatches: [
        { name: 'Primary Main', token: 'primary.main', color: '#009f9b', text: 'EDGE Turquoise 500' },
        { name: 'Primary Dark', token: 'primary.dark', color: '#00918c', text: 'EDGE Turquoise 600' },
      ],
    },
    {
      title: 'Secondary Branding',
      swatches: [
        { name: 'Secondary Main', token: 'secondary.main', color: '#5e6e7d', text: 'EDGE Blue 500' },
        { name: 'Secondary Dark', token: 'secondary.dark', color: '#515f6c', text: 'EDGE Blue 600' },
      ],
    },
    {
      title: 'Structural / Semantic',
      swatches: [
        { name: 'Surface Default', token: 'surface.default', color: '#fafafa', textColor: '#000', text: 'Grey 50' },
        { name: 'Surface Disabled', token: 'surface.disabled', color: '#e0e0e0', textColor: '#000', text: 'Grey 300' },
        { name: 'Background Default', token: 'background.default', color: '#ffffff', textColor: '#000', text: 'White' },
      ],
    },
    {
      title: 'Feedback',
      swatches: [
        { name: 'Error Main', token: 'error.main', color: '#d32f2f', text: 'Red 700' },
        { name: 'Warning Main', token: 'warning.main', color: '#ef6c00', text: 'Orange 800' },
        { name: 'Info Main', token: 'info.main', color: '#1976d2', text: 'Blue 700' },
        { name: 'Success Main', token: 'success.main', color: '#2e7d32', text: 'Green 800' },
      ],
    },
  ];

  const typeSpecimens = [
    {
      label: 'Heading XL',
      sample: 'Build better interfaces.',
      spec: 'Montserrat Bold · 60px · lh 1.2',
      sx: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: 48, letterSpacing: -0.9, color: '#212121', lineHeight: 1.2 },
    },
    {
      label: 'Heading MD',
      sample: 'Design System Documentation',
      spec: 'Montserrat SemiBold · 34px · lh 1.235',
      sx: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: 34, letterSpacing: -0.34, color: '#212121', lineHeight: 1.235 },
    },
    {
      label: 'Heading SM',
      sample: 'Component Library',
      spec: 'Montserrat SemiBold · 24px · lh 1.33',
      sx: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: 24, letterSpacing: -0.12, color: '#212121', lineHeight: 1.33 },
    },
    {
      label: 'Body MD',
      sample: 'The quick brown fox jumps over the lazy dog. This is a paragraph of body text at the standard size.',
      spec: 'Open Sans Regular · 16px · lh 1.5',
      sx: { fontFamily: '"Open Sans", sans-serif', fontWeight: 400, fontSize: 16, color: '#212121', lineHeight: 1.5 },
    },
    {
      label: 'Body SM',
      sample: 'Smaller body text used in secondary contexts, captions, and helper text.',
      spec: 'Open Sans Regular · 14px · lh 1.43',
      sx: { fontFamily: '"Open Sans", sans-serif', fontWeight: 400, fontSize: 14, color: '#212121', lineHeight: 1.43 },
    },
    {
      label: 'Button Label LG',
      sample: 'BUTTON LABEL',
      spec: 'Open Sans SemiBold · 16px · ls 0.8',
      sx: { fontFamily: '"Open Sans", sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: 0.8, color: '#009f9b' },
    },
  ];

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: 36,
            color: '#212121',
            letterSpacing: -0.5,
            mb: 1,
          }}
        >
          Design Tokens
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: 16,
            color: '#5e6e7d',
            lineHeight: 1.6,
          }}
        >
          Global design variables extracted from the EDGE Figma Design System. These tokens are the
          single source of truth for colors, typography, spacing, and radius across all components.
        </Typography>
      </Box>

      {/* Color Palettes */}
      <Stack spacing={5}>
        {colorGroups.map((group) => (
          <Box key={group.title}>
            <Typography
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                fontSize: 18,
                color: '#212121',
                mb: 2.5,
                pb: 1,
                borderBottom: '2px solid #009f9b',
                display: 'inline-block',
              }}
            >
              {group.title}
            </Typography>
            <Grid container spacing={2}>
              {group.swatches.map((swatch) => (
                <Grid key={swatch.token} size={{ xs: 6, sm: 4, md: 3 }}>
                  <ColorSwatch {...swatch} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Spacing & Radius */}
        <Box>
          <Typography
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              fontSize: 18,
              color: '#212121',
              mb: 2.5,
              pb: 1,
              borderBottom: '2px solid #009f9b',
              display: 'inline-block',
            }}
          >
            Spacing & Radius
          </Typography>
          <Grid container spacing={2}>
            {[8, 16, 24, 32].map((val, i) => (
              <Grid key={val} size={{ xs: 6, sm: 3 }}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, bgcolor: '#fff', display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Box sx={{ width: val, height: val, bgcolor: '#07bebe', borderRadius: '4px', flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 600, fontSize: 13, color: '#212121' }}>
                      spacing({i + 1})
                    </Typography>
                    <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e' }}>
                      {val}px
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
            {[4, 8, 16].map((val) => (
              <Grid key={`radius-${val}`} size={{ xs: 6, sm: 3 }}>
                <Paper
                  elevation={0}
                  sx={{ p: 2, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, bgcolor: '#fff', display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Box sx={{ width: 48, height: 48, bgcolor: '#009f9b', borderRadius: `${val}px`, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 600, fontSize: 13, color: '#212121' }}>
                      Border {val}px
                    </Typography>
                    <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e' }}>
                      {val}px Radius
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Typography Specimens */}
        <Box>
          <Typography
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              fontSize: 18,
              color: '#212121',
              mb: 2.5,
              pb: 1,
              borderBottom: '2px solid #009f9b',
              display: 'inline-block',
            }}
          >
            Typography
          </Typography>
          <Stack spacing={1.5}>
            {typeSpecimens.map((t) => (
              <TypeSpecimen key={t.label} {...t} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
