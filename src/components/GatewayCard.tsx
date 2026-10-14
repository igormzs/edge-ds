'use client';

import React from 'react';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<GatewayCard>` — landing-page entry card for one product section
 * (e.g. the three EDGE Knowledge pillars). Figma: Card page › `<Card> | Gateway`.
 *
 * Token map (Figma → code), no new tokens:
 *   BG / Border      → Semantic/Surface/Paper / Semantic/Border/Default → background.paper / grey 300
 *   Icon badge       → Brand/Primary/50 + Semantic/Icon/Emphasis glyph  → edgeTurquoise 50 / grey 700
 *   Eyebrow, Intent  → Semantic/State/Active                            → primary.active (overline / body-lg)
 *   Title            → Semantic/Text/Primary                            → text.primary (heading-xs)
 *   Count, Desc.     → Semantic/Text/Secondary                          → text.secondary
 *   Links            → <ListItem> Dense, no gutters, Meta + chevron, Divider
 *   Newest box       → Components/Card/Content/BG/Subtle                → slate 50, 8px radius
 *   Action           → <Button> Medium Contained, end chevron
 * Layout: 378 wide, 32px padding, 24px gap, 16px radius.
 */

export interface GatewayLink {
  label: React.ReactNode;
  /** Item count shown before the chevron. */
  count?: number | string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface GatewayCardProps {
  icon: React.ReactNode;
  /** e.g. "30 articles". */
  count?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: string;
  /** The user's need, in quotes, e.g. "I need to do something in EDGE". */
  intent?: React.ReactNode;
  description?: React.ReactNode;
  /** Up to 6 child links. */
  links?: GatewayLink[];
  newest?: { meta: React.ReactNode; title: React.ReactNode; href?: string };
  actionLabel?: string;
  href?: string;
  onAction?: React.MouseEventHandler<HTMLElement>;
}

export function GatewayCard({
  icon,
  count,
  eyebrow,
  title,
  intent,
  description,
  links = [],
  newest,
  actionLabel = 'Explore',
  href,
  onAction,
}: GatewayCardProps) {
  return (
    <Box
      component="article"
      sx={{
        width: 378,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        bgcolor: 'background.paper',
        border: `1px solid ${colors.grey[300]}`,
        borderRadius: '16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          aria-hidden
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: colors.edgeTurquoise[50],
            color: colors.grey[700],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': { fontSize: 24 },
          }}
        >
          {icon}
        </Box>
        {count != null && (
          <Typography variant="body-xs-regular" sx={{ color: 'text.secondary' }}>
            {count}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {eyebrow != null && (
          <Typography variant="overline" component="p" sx={{ color: 'primary.active' }}>
            {eyebrow}
          </Typography>
        )}
        <Typography variant="heading-xs" component="h3" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>

      {intent != null && (
        <Typography variant="body-lg" sx={{ color: 'primary.active' }}>
          {intent}
        </Typography>
      )}
      {description != null && (
        <Typography variant="body-sm" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}

      {links.length > 0 && (
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {links.slice(0, 6).map((link, i) => (
            <Box component="li" key={i} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <ButtonBase
                component={link.href ? 'a' : 'button'}
                href={link.href}
                onClick={link.onClick}
                sx={{
                  width: '100%',
                  minHeight: 36,
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: 2 },
                }}
              >
                <Typography variant="body-sm" component="span" sx={{ flex: 1, color: 'text.primary' }}>
                  {link.label}
                </Typography>
                {link.count != null && (
                  <Typography variant="body-xs-regular" component="span" sx={{ pl: 2, color: 'text.secondary' }}>
                    {link.count}
                  </Typography>
                )}
                <ChevronRightIcon aria-hidden sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.70)' }} />
              </ButtonBase>
            </Box>
          ))}
        </Box>
      )}

      {newest && (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: colors.slate[50], borderRadius: '8px' }}>
          <Typography variant="body-xs-regular" sx={{ color: 'text.secondary' }}>
            {newest.meta}
          </Typography>
          <Typography
            variant="body-sm-bold"
            component={newest.href ? 'a' : 'p'}
            href={newest.href}
            sx={{ color: 'text.primary', textDecoration: 'none' }}
          >
            {newest.title}
          </Typography>
        </Box>
      )}

      {(href || onAction) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="medium"
            endIcon={<ChevronRightIcon />}
            href={href}
            onClick={onAction}
            aria-label={`${actionLabel} ${title}`}
          >
            {actionLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}

/** Landing row: cards side by side at equal widths, 24px gap. */
export function GatewayRow({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'grid', gridAutoColumns: 'minmax(0, 1fr)', gridAutoFlow: 'column', gap: 3, '& > article': { width: 'auto' } }}>
      {children}
    </Box>
  );
}

export default GatewayCard;
