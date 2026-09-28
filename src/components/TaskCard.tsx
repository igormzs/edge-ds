'use client';

import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from '@/theme/brandTheme';
import { StatusTag, type StatusTagType } from './StatusTag';

/**
 * EDGE-DS `<TaskCard>` — a clickable work item with a status, e.g. the
 * Inputs › Statistics grid. Figma: Card page › `<Card> | Content`
 * Type=Task (Surface Paper / Subtle × State Default / Hover).
 *
 * Token map (Figma `Components/Card/Content/*` → code):
 *   BG/Paper     → Semantic/Surface/Paper → background.paper
 *   BG/Subtle    → Neutral/Slate/50       → slate 50
 *   BG/Hover     → Brand/Primary/50       → edgeTurquoise 50
 *   Border       → Semantic/Border/Default → grey 300
 *   Border/Hover → Brand/Primary/500      → edgeTurquoise 500
 *   Title        → Semantic/Text/Primary  → text.primary (number + title)
 *   Arrow        → <Icon> Color=Brand     → primary.main
 */

export interface TaskCardProps {
  number: number | string;
  title: string;
  status?: string;
  statusType?: StatusTagType;
  surface?: 'paper' | 'subtle';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function TaskCard({
  number,
  title,
  status = 'NOT STARTED',
  statusType = 'neutral',
  surface = 'subtle',
  href,
  onClick,
}: TaskCardProps) {
  return (
    <ButtonBase
      component={href ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      aria-label={`${title}, ${status.toLowerCase()}`}
      sx={{
        width: '100%',
        minHeight: 200,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        textAlign: 'left',
        borderRadius: '8px',
        border: `1px solid ${colors.grey[300]}`,
        bgcolor: surface === 'paper' ? 'background.paper' : colors.slate[50],
        transition: 'background-color 150ms, border-color 150ms',
        '&:hover': { bgcolor: colors.edgeTurquoise[50], borderColor: colors.edgeTurquoise[500] },
        '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: 2 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="body-md" component="span" sx={{ color: 'text.primary' }}>
          {number}
        </Typography>
        <Typography variant="body-md" component="span" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <StatusTag type={statusType} size="medium" showIcon={false} label={status} />
        <ArrowForwardIcon aria-hidden sx={{ color: 'primary.main' }} />
      </Box>
    </ButtonBase>
  );
}

/** Three-column grid of TaskCards, as in `Section Content / Task Grid`. */
export function TaskCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', columnGap: '23px', rowGap: 3 }}>
      {children}
    </Box>
  );
}

export default TaskCard;
