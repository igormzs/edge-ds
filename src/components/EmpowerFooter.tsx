import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<EmpowerFooter>` — the Empower page footer.
 * Figma: Header & Footer page › `<EmpowerFooter>` (Copyright text property).
 * Text: Components/Footer/Text → Semantic/Text/Secondary → grey 700. Uses the
 * Figma value directly because palette.text.secondary still carries a known
 * pre-existing drift (alpha black), see brandTheme.ts.
 */

export interface EmpowerFooterProps {
  /** Defaults to the Figma copyright line with the current year. */
  copyright?: string;
}

export function EmpowerFooter({ copyright }: EmpowerFooterProps) {
  const text =
    copyright ?? `© Copyright 2011-${new Date().getFullYear()} | EDGE Strategy LTD. All rights reserved`;
  return (
    <Box component="footer" sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="body-sm" sx={{ color: colors.grey[700] }}>
        {text}
      </Typography>
    </Box>
  );
}

export default EmpowerFooter;
