'use client';

import {
  Box,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CodeIcon from '@mui/icons-material/Code';
import { useState, useEffect, useMemo } from 'react';

// MUI Icons for Reference section
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CustomIcon {
  name: string;
  path: string;
}

const propRows: PropRow[] = [
  {
    prop: 'color',
    type: '"inherit" | "primary" | "secondary" | "action" | "error" | "disabled"',
    default: '"inherit"',
    description: 'The color of the icon based on the theme palette.',
  },
  {
    prop: 'fontSize',
    type: '"inherit" | "small" | "medium" | "large"',
    default: '"medium"',
    description: 'Sets the size of the icon. "medium" is 24px by default.',
  },
];

export default function IconsPage() {
  const [icons, setIcons] = useState<CustomIcon[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/icons')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setIcons(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load icons:', err);
        setLoading(false);
      });
  }, []);

  const filteredIcons = useMemo(() => {
    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [icons, search]);

  const handleCopyCode = (name: string) => {
    const code = `<img src="/icons/edge/${name}.svg" alt="${name} icon" width="24" height="24" />`;
    navigator.clipboard.writeText(code);
    setCopied(`${name}-code`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopySVG = async (path: string, name: string) => {
    try {
      const response = await fetch(path);
      const svg = await response.text();
      navigator.clipboard.writeText(svg);
      setCopied(`${name}-svg`);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy SVG:', err);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Icons"
        description="The EDGE Design System uses a combination of custom SVG icons and MUI Icons. Custom icons are sourced directly from Figma and should be placed in the public/icons/edge folder."
        muiLink="https://mui.com/material-ui/material-icons/"
      />

      {/* Custom Icons Explorer */}
      <DocSection title="EDGE Custom Icons">
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search custom icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#009f9b',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#009f9b',
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={32} sx={{ color: '#009f9b' }} />
          </Box>
        ) : filteredIcons.length > 0 ? (
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {filteredIcons.map((icon) => (
              <Grid item key={icon.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 140, // Increased to 140 for more breathing room
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.08)',
                    bgcolor: '#ffffff',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: '#009f9b',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                      '& .icon-actions': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={icon.path}
                    alt={icon.name}
                    sx={{
                      width: 32, // Slightly larger icon
                      height: 32,
                      opacity: 0.8,
                    }}
                  />

                  {/* Hover Actions Overlay */}
                  <Box
                    className="icon-actions"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      bgcolor: 'rgba(255,255,255,0.96)',
                      backdropFilter: 'blur(4px)',
                      opacity: 0,
                      transition: 'opacity 0.2s ease-in-out',
                      zIndex: 1,
                    }}
                  >
                    <Tooltip title={copied === `${icon.name}-code` ? 'Copied Tag!' : 'Copy Tag'}>
                      <IconButton
                        size="small"
                        onClick={() => handleCopyCode(icon.name)}
                        sx={{ 
                          p: 1.25, 
                          bgcolor: 'rgba(0,0,0,0.03)',
                          '&:hover': { bgcolor: 'rgba(0,159,155,0.1)' }
                        }}
                      >
                        <CodeIcon sx={{ fontSize: 14, color: copied === `${icon.name}-code` ? '#009f9b' : '#1a1a1a' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={copied === `${icon.name}-svg` ? 'Copied SVG!' : 'Copy SVG'}>
                      <IconButton
                        size="small"
                        onClick={() => handleCopySVG(icon.path, icon.name)}
                        sx={{ 
                          p: 1.25,
                          bgcolor: 'rgba(0,0,0,0.03)',
                          '&:hover': { bgcolor: 'rgba(0,159,155,0.1)' }
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: 14, color: copied === `${icon.name}-svg` ? '#009f9b' : '#1a1a1a' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton
                        size="small"
                        component="a"
                        href={icon.path}
                        download={`${icon.name}.svg`}
                        sx={{ 
                          p: 1.25,
                          bgcolor: 'rgba(0,0,0,0.03)',
                          '&:hover': { bgcolor: 'rgba(0,159,155,0.1)' }
                        }}
                      >
                        <FileDownloadIcon sx={{ fontSize: 14, color: '#1a1a1a' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                {/* Persistent Label */}
                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#5e6e7d',
                    textAlign: 'center',
                    width: 140, // Match container width
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: '"Open Sans", sans-serif',
                  }}
                >
                  {icon.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">No icons found matching "{search}"</Typography>
          </Box>
        )}
      </DocSection>

      {/* MUI Reference */}
      <DocSection title="MUI Icons Reference">
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          For common UI actions, you can also use standard MUI Icons. Here are some examples:
        </Typography>
        <PreviewCanvas>
          <PreviewGroup label="Home">
            <HomeIcon />
          </PreviewGroup>
          <PreviewGroup label="Settings">
            <SettingsIcon />
          </PreviewGroup>
          <PreviewGroup label="Favorite">
            <FavoriteIcon color="primary" />
          </PreviewGroup>
          <PreviewGroup label="Check">
            <CheckCircleIcon color="success" />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Implementation">
        <CodeBlock code={`// Custom SVG Icon usage
<img src="/icons/edge/star.svg" alt="star" width="24" height="24" />

// MUI Icon usage
import HomeIcon from '@mui/icons-material/Home';
<HomeIcon color="primary" fontSize="large" />`} />
      </DocSection>
    </Box>
  );
}

