'use client';

import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<PagerCard>` — Previous / Next navigation card at the end of an
 * article or step. Figma: Card page › `<Card> | Pager` (Direction Previous /
 * Next × State Default / Hover).
 *
 * Token map (Figma → code), reusing the Card | Content tokens:
 *   BG/Paper     → Semantic/Surface/Paper   → background.paper
 *   Border       → Semantic/Border/Default  → grey 300
 *   BG/Hover     → Brand/Primary/50         → edgeTurquoise 50
 *   Border/Hover → Brand/Primary/500        → edgeTurquoise 500
 *   Overline     → Semantic/State/Active    → primary.active (Primary/700, AA at 12px)
 *   Title        → Semantic/Text/Primary    → text.primary (body-md-bold)
 *   Arrow        → Semantic/Icon/Emphasis   → grey 700
 */

export interface PagerCardProps {
  direction: 'previous' | 'next';
  /** Small label above the title, e.g. "Back to stage" or "Next article · 2 of 5". */
  overline: React.ReactNode;
  title: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function PagerCard({ direction, overline, title, href, onClick }: PagerCardProps) {
  const isNext = direction === 'next';
  const Arrow = isNext ? ArrowForwardIcon : ArrowBackIcon;
  return (
    <ButtonBase
      component={href ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      rel={isNext ? 'next' : 'prev'}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: isNext ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: '8px',
        border: `1px solid ${colors.grey[300]}`,
        bgcolor: 'background.paper',
        transition: 'background-color 150ms, border-color 150ms',
        '&:hover': { bgcolor: colors.edgeTurquoise[50], borderColor: colors.edgeTurquoise[500] },
        '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: 2 },
      }}
    >
      <Arrow aria-hidden sx={{ color: colors.grey[700] }} />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: isNext ? 'flex-end' : 'flex-start', textAlign: isNext ? 'right' : 'left' }}>
        <Typography variant="overline" component="span" sx={{ color: 'primary.active' }}>
          {overline}
        </Typography>
        <Typography variant="body-md-bold" component="span" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>
    </ButtonBase>
  );
}

export default PagerCard;
