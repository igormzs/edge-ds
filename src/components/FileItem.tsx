'use client';

import React from 'react';
import { Box, Button, IconButton, LinearProgress, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<FileItem>` — one file in a list: an attachment to download, or a
 * file added through the File Upload dropzone. Figma: File Upload page ›
 * `<FileItem>` (Type Download / Upload × State Default / Uploading / Error).
 *
 * Token map (Figma → code):
 *   Badge BG       → Brand/Primary/50            → edgeTurquoise 50
 *   Badge glyph    → Semantic/Icon/Emphasis      → grey 700
 *   Error badge BG → Semantic/Status/Error/Background → red 100
 *   Error glyph    → Semantic/Status/Error/Icon  → red 800
 *   Error message  → Semantic/Status/Error/Text  → red 900
 *   Name           → Semantic/Text/Primary       → text.primary (body-sm-bold)
 *   Meta           → Semantic/Text/Secondary     → text.secondary (body-xs-regular)
 *   Divider        → Semantic/Border/Divider     → divider
 *   Remove glyph   → Semantic/Icon/Default       → rgba(0, 0, 0, 0.7)
 */

export interface FileItemProps {
  name: string;
  /** Type and size, e.g. "PDF · 1.2 MB". */
  meta?: React.ReactNode;
  type?: 'download' | 'upload';
  state?: 'default' | 'uploading' | 'error';
  /** 0–100, shown while uploading. */
  progress?: number;
  /** Shown instead of the meta line when state is "error". */
  errorMessage?: React.ReactNode;
  /** Leading file glyph. Defaults to DescriptionOutlined. */
  icon?: React.ReactNode;
  downloadHref?: string;
  onDownload?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export function FileItem({
  name,
  meta,
  type = 'download',
  state = 'default',
  progress = 0,
  errorMessage = 'Upload failed.',
  icon,
  downloadHref,
  onDownload,
  onRemove,
}: FileItemProps) {
  const isError = type === 'upload' && state === 'error';
  const isUploading = type === 'upload' && state === 'uploading';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Box
        aria-hidden
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isError ? colors.red[100] : colors.edgeTurquoise[50],
          color: isError ? colors.red[800] : colors.grey[700],
          '& svg': { fontSize: 24 },
        }}
      >
        {isError ? <ErrorOutlineIcon /> : icon ?? <DescriptionOutlinedIcon />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: isUploading ? 0.5 : 0.25 }}>
        <Typography variant="body-sm-bold" component="span" sx={{ color: 'text.primary' }}>
          {name}
        </Typography>
        <Typography
          variant="body-xs-regular"
          component="span"
          role={isError ? 'alert' : undefined}
          sx={{ color: isError ? colors.red[900] : 'text.secondary' }}
        >
          {isError ? errorMessage : isUploading ? `Uploading… ${Math.round(progress)}%` : meta}
        </Typography>
        {isUploading && <LinearProgress variant="determinate" value={progress} aria-label={`Uploading ${name}`} />}
      </Box>
      {type === 'download' ? (
        <Button
          size="small"
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          href={downloadHref}
          onClick={onDownload}
          aria-label={`Download ${name}`}
        >
          Download
        </Button>
      ) : (
        // Figma <IconButton> Default glyph: Components/Icon/Fill/Default →
        // Semantic/Icon/Default (Neutral/Black/70). Set explicitly because the
        // theme's palette.action.active (which stock IconButton uses) is teal.
        <IconButton size="small" onClick={onRemove} aria-label={`Remove ${name}`} sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}

export default FileItem;
