'use client';

import React from 'react';
import { Tab, Tabs } from '@mui/material';
import type { TabProps, TabsProps } from '@mui/material';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<CardTabs>` / `<CardTab>` — card-style category tabs that filter the
 * content below (e.g. Action plan categories). Figma: Tabs page ›
 * `<Tabs> | Card` (row) and `<Tab> | Card` (one tab).
 *
 * Token map (Figma → code):
 *   Components/Tabs/Card/BG/Default       → Semantic/Surface/Paper   → background.paper
 *   Components/Tabs/Card/BG/Hover         → Semantic/Surface/Hover   → grey 200
 *   Components/Tabs/Card/BG/Selected      → Brand/Primary/50         → edgeTurquoise 50
 *   Components/Tabs/Card/Border/Selected  → Brand/Primary/600        → edgeTurquoise 600
 *   Components/Tabs/Card/Text/Default     → Semantic/Text/Secondary  → text.secondary (body-sm)
 *   Components/Tabs/Card/Text/Hover       → Semantic/Text/Primary    → text.primary (body-sm)
 *   Components/Tabs/Card/Text/Selected    → Brand/Primary/700        → edgeTurquoise 700 (body-sm-bold)
 * Layout: 72px tall, 16px padding, 8px radius, 8px gap, tabs share the width equally.
 */

export function CardTab(props: TabProps) {
  return (
    <Tab
      disableRipple
      {...props}
      sx={[
        (theme) => ({
          flex: 1,
          minWidth: 0,
          maxWidth: 'none',
          height: 72,
          p: 2,
          borderRadius: '8px',
          border: '1px solid transparent',
          bgcolor: 'background.paper',
          color: 'text.secondary',
          textTransform: 'none',
          ...theme.typography['body-sm'],
          '&:hover': { bgcolor: colors.grey[200], color: 'text.primary' },
          '&.Mui-selected': {
            ...theme.typography['body-sm-bold'],
            bgcolor: colors.edgeTurquoise[50],
            borderColor: colors.edgeTurquoise[600],
            color: colors.edgeTurquoise[700],
          },
          '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: 2 },
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

export function CardTabs({ children, sx, ...props }: TabsProps) {
  return (
    <Tabs
      variant="fullWidth"
      {...props}
      slotProps={{ indicator: { sx: { display: 'none' } } }}
      sx={[{ minHeight: 0, '& .MuiTabs-flexContainer': { gap: 1 } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Tabs>
  );
}

export default CardTabs;
