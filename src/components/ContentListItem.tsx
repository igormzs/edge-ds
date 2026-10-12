'use client';

import React from 'react';
import { Box, ButtonBase, Chip, Skeleton, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<ContentListItem>` — a content row for lists of articles, guides,
 * updates or events (e.g. EDGE Knowledge search results). Figma: List page ›
 * `<ListItem> | Content` (State Default / Hover / Loading).
 *
 * Token map (Figma → code):
 *   Row BG        → Semantic/Surface/Paper          → background.paper
 *   Row divider   → Semantic/Border/Divider         → divider
 *   Hover         → Components/List/ListItem/Hover  → rgba(0, 0, 0, 0.04) overlay
 *   Title         → Semantic/Text/Primary           → text.primary (body-md-bold)
 *   Summary/Trail → Semantic/Text/Secondary         → text.secondary
 *   Type icon     → Semantic/Icon/Emphasis          → grey 700
 *   Type tag      → <Chip> Small Outlined Default
 *   Loading       → Components/Skeleton/BG          → <Skeleton>
 */

export interface ContentListItemProps {
  /** Title; pass a node to highlight a search match. */
  title: React.ReactNode;
  summary?: React.ReactNode;
  /** Where the item lives, e.g. "Your EDGE Playbook › Getting Started". */
  trail?: React.ReactNode;
  date?: string;
  /** Type tag label, e.g. "Article", "Product Update". Omit to hide the tag. */
  typeLabel?: string;
  /** Leading type icon. Defaults to ArticleOutlined. */
  typeIcon?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Skeleton placeholders while results load (Figma State=Loading). */
  loading?: boolean;
}

const rowSx = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  px: 3,
  py: 2,
  textAlign: 'left',
  bgcolor: 'background.paper',
  borderBottom: 1,
  borderColor: 'divider',
} as const;

export function ContentListItem({
  title,
  summary,
  trail,
  date,
  typeLabel,
  typeIcon,
  href,
  onClick,
  loading = false,
}: ContentListItemProps) {
  if (loading) {
    return (
      <Box sx={rowSx} aria-busy="true">
        <Skeleton variant="rounded" width={24} height={24} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="rounded" width={420} height={12} sx={{ maxWidth: '100%' }} />
          <Skeleton variant="rounded" width="100%" height={12} />
          <Skeleton variant="rounded" width={360} height={12} sx={{ maxWidth: '100%' }} />
          <Skeleton variant="rounded" width={220} height={12} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Skeleton variant="rounded" width={64} height={24} />
          <Skeleton variant="rounded" width={72} height={12} />
        </Box>
      </Box>
    );
  }

  return (
    <ButtonBase
      component={href ? 'a' : 'div'}
      href={href}
      onClick={onClick}
      sx={{
        ...rowSx,
        justifyContent: 'flex-start',
        transition: 'background-color 150ms',
        // Components/List/ListItem/Hover (literal #000000 @ 4%) over the paper row.
        '&:hover': { backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))' },
        '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: -2 },
      }}
    >
      <Box aria-hidden sx={{ display: 'flex', color: colors.grey[700], '& svg': { fontSize: 24 } }}>
        {typeIcon ?? <ArticleOutlinedIcon />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body-md-bold" component="span" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
        {summary != null && (
          <Typography variant="body-sm" component="span" sx={{ color: 'text.secondary' }}>
            {summary}
          </Typography>
        )}
        {trail != null && (
          <Typography variant="body-xs-regular" component="span" sx={{ color: 'text.secondary' }}>
            {trail}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, flexShrink: 0 }}>
        {typeLabel && <Chip label={typeLabel} size="small" variant="outlined" />}
        {date && (
          <Typography variant="body-xs-regular" component="span" sx={{ color: 'text.secondary' }}>
            {date}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  );
}

export default ContentListItem;
