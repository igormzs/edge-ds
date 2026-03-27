'use client';

import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

// ─── Section wrapper ────────────────────────────────────────────────────────

export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          color: '#5e6e7d',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&::after': {
            content: '""',
            flex: 1,
            height: '1px',
            bgcolor: 'rgba(0,0,0,0.08)',
            display: 'block',
          },
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

// ─── Component preview canvas ────────────────────────────────────────────────

export function PreviewCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        border: '1px solid rgba(0,0,0,0.08)',
        bgcolor: '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {children}
    </Paper>
  );
}

// ─── Label over preview ─────────────────────────────────────────────────────

export function PreviewGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      {children}
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 11,
          color: '#9e9e9e',
          letterSpacing: 0.5,
          textTransform: 'none',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Code block with copy button ─────────────────────────────────────────────

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: copied ? '#009f9b' : 'rgba(255,255,255,0.5)',
            '&:hover': { color: '#ffffff', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 3,
          borderRadius: 2,
          bgcolor: '#0e1a1f',
          color: '#e0f7f7',
          fontFamily: '"Roboto Mono", "Courier New", monospace',
          fontSize: 13,
          lineHeight: 1.7,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        <Box component="code">{code}</Box>
      </Box>
    </Box>
  );
}

// ─── Props table ─────────────────────────────────────────────────────────────

export interface PropRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  const headerSx = {
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 600,
    fontSize: 12,
    color: '#5e6e7d',
    letterSpacing: 0.5,
    py: 1.5,
    px: 2,
    textAlign: 'left' as const,
    bgcolor: '#f8fafb',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
  };

  const cellSx = {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 13,
    py: 1.5,
    px: 2,
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    color: '#212121',
    verticalAlign: 'top' as const,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <Box component="thead">
          <Box component="tr">
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <Box key={h} component="th" sx={headerSx}>
                {h}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row) => (
            <Box
              key={row.prop}
              component="tr"
              sx={{ '&:hover': { bgcolor: 'rgba(0,159,155,0.03)' } }}
            >
              <Box component="td" sx={cellSx}>
                <Box
                  component="code"
                  sx={{
                    bgcolor: 'rgba(0,159,155,0.08)',
                    color: '#009f9b',
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontSize: 12,
                    fontFamily: '"Roboto Mono", monospace',
                  }}
                >
                  {row.prop}
                </Box>
              </Box>
              <Box component="td" sx={{ ...cellSx, color: '#5e6e7d' }}>
                <Box
                  component="code"
                  sx={{
                    fontSize: 12,
                    fontFamily: '"Roboto Mono", monospace',
                  }}
                >
                  {row.type}
                </Box>
              </Box>
              <Box component="td" sx={{ ...cellSx, color: '#9e9e9e' }}>
                {row.default || '—'}
              </Box>
              <Box component="td" sx={cellSx}>
                {row.description}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Page header ─────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  description,
  muiLink,
}: {
  title: string;
  description: string;
  muiLink: string;
}) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Typography
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: 36,
            color: '#212121',
            letterSpacing: -0.5,
          }}
        >
          {title}
        </Typography>
        <Box
          component="a"
          href={muiLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 1,
            fontSize: 12,
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 600,
            color: '#009f9b',
            textDecoration: 'none',
            border: '1px solid #009f9b',
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            '&:hover': { bgcolor: 'rgba(0,159,155,0.06)' },
          }}
        >
          MUI Docs ↗
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 16,
          color: '#5e6e7d',
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
