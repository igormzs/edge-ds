'use client';

import React from 'react';
import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { colors } from '@/theme/brandTheme';
import { EmpowerLogo } from './EmpowerLogo';
import { PlatformLogo, type Platform } from './PlatformLogo';

/**
 * EDGE-DS `<EmpowerHeader>` — the Empower app header with the EDGE platform
 * switcher. Figma: Header & Footer page › `<EmpowerHeader>` (Selected
 * variant + Company/Period text) and `<EmpowerHeaderTab>` (State
 * Default/Hover/Selected).
 *
 * Token map (Figma `Components/Header/*` → code):
 *   BG               → Semantic/Surface/Paper   → background.paper
 *   Border           → Semantic/Border/Divider  → palette.divider
 *   Tab/BG/Selected  → Semantic/Surface/Default → surface.default (grey 50)
 *   Tab/BG/Hover     → Semantic/Surface/Hover   → grey 200
 *   Tab/Indicator    → Brand/Primary/600        → edgeTurquoise 600
 *   Tab/Divider      → Semantic/Border/Subtle   → grey 100
 *   Tab/Label        → Semantic/Text/Primary    → text.primary
 *   Account/Text     → Brand/Primary/700        → edgeTurquoise 700
 */

/** The platforms shown in the header switcher, in their fixed order. */
export type HeaderPlatform = Exclude<Platform, 'payTool'>;

export const HEADER_PLATFORMS: { id: HeaderPlatform; label: string }[] = [
  { id: 'insights', label: 'EDGE\nInsights ®' },
  { id: 'knowledge', label: 'EDGE\nKnowledge ®' },
  { id: 'connections', label: 'EDGE\nConnections ®' },
  { id: 'certifications', label: 'EDGE\nCertifications ®\nBootcamp' },
  { id: 'compliance', label: 'EDGE\nCompliance\nBootcamp' },
];

const HEADER_HEIGHT = 80;
const TAB_WIDTH = 172;

export interface EmpowerHeaderTabProps {
  platform: HeaderPlatform;
  selected?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/** One platform in the switcher — `<EmpowerHeaderTab>`. */
export function EmpowerHeaderTab({ platform, selected = false, href, onClick }: EmpowerHeaderTabProps) {
  const label = HEADER_PLATFORMS.find((p) => p.id === platform)?.label ?? platform;
  return (
    <ButtonBase
      component={href ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      aria-current={selected ? 'page' : undefined}
      sx={{
        width: TAB_WIDTH,
        height: '100%',
        px: 2,
        gap: 1,
        justifyContent: 'center',
        bgcolor: selected ? 'surface.default' : 'transparent',
        // Selected: 4px indicator drawn inside the tab; others: 1px left divider.
        boxShadow: selected
          ? `inset 0 -4px 0 ${colors.edgeTurquoise[600]}`
          : `inset 1px 0 0 ${colors.grey[100]}`,
        transition: 'background-color 150ms',
        '&:hover': { bgcolor: selected ? 'surface.default' : colors.grey[200] },
        '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: -2 },
      }}
    >
      <PlatformLogo platform={platform} size={24} />
      <Typography variant="body-xs" component="span" sx={{ color: 'text.primary', whiteSpace: 'pre-line', textAlign: 'left' }}>
        {label}
      </Typography>
    </ButtonBase>
  );
}

export interface EmpowerHeaderProps {
  /** The platform the current page belongs to; `null` for pages outside a platform. */
  selected?: HeaderPlatform | null;
  company: string;
  period?: string;
  /** Link for each platform tab. Omit to render buttons and use `onPlatformClick`. */
  getPlatformHref?: (platform: HeaderPlatform) => string;
  onPlatformClick?: (platform: HeaderPlatform) => void;
  onAccountClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Link for the Empower logo (usually the home page). */
  logoHref?: string;
}

export function EmpowerHeader({
  selected = null,
  company,
  period,
  getPlatformHref,
  onPlatformClick,
  onAccountClick,
  logoHref,
}: EmpowerHeaderProps) {
  const logo = <EmpowerLogo height={48} />;
  return (
    <Box
      component="header"
      sx={{
        height: HEADER_HEIGHT,
        px: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 1, display: 'flex' }}>
        {logoHref ? (
          <Box component="a" href={logoHref} sx={{ display: 'flex' }}>
            {logo}
          </Box>
        ) : (
          logo
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 7, height: '100%' }}>
        <Box
          component="nav"
          aria-label="EDGE platforms"
          sx={{ display: 'flex', height: '100%', boxShadow: `inset -1px 0 0 ${colors.grey[100]}` }}
        >
          {HEADER_PLATFORMS.map(({ id }) => (
            <EmpowerHeaderTab
              key={id}
              platform={id}
              selected={selected === id}
              href={getPlatformHref?.(id)}
              onClick={onPlatformClick ? () => onPlatformClick(id) : undefined}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body-sm-bold" sx={{ color: colors.edgeTurquoise[700] }}>
              {company}
            </Typography>
            {period && (
              <Typography variant="body-xs-regular" sx={{ color: colors.edgeTurquoise[700] }}>
                {period}
              </Typography>
            )}
          </Box>
          <IconButton onClick={onAccountClick} aria-label="Account" sx={{ p: 0, color: 'primary.main' }}>
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default EmpowerHeader;
