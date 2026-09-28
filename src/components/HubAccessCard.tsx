'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { colors } from '@/theme/brandTheme';
import { PlatformLogo, type Platform } from './PlatformLogo';

/**
 * EDGE-DS `<HubAccessCard>` — the hub page's entry card for each EDGE
 * platform. Figma: Card page › `<Card> | Hub Access` (Platform variant).
 *
 * Token map (Figma `Components/Card/HubAccess/*` → code):
 *   BG / Border / Title → Surface/Paper / Border/Default / Text/Primary
 *   <Platform>/Text     → description colour
 *   <Platform>/Action   → ACCESS button background (white label)
 * Logos come from <PlatformLogo> (Platforms/Brand/*).
 */

interface HubPlatform {
  title: string;
  description: string;
  text: string;
  action: string;
}

// Figma defaults per Platform variant (titles, copy and colours as designed).
export const HUB_PLATFORMS: Record<Platform, HubPlatform> = {
  insights: {
    title: 'EDGE\nInsights ®',
    description:
      'EDGE Insights enables a deep dive into detailed workforce analytics, powerful benchmarking against country and industry peers and the EDGE Global Standards, identifying new insights and impactful action plans.',
    text: colors.edgeTurquoise[500], // Brand/Primary/500 — 3.3:1, below AA for 14px (flagged in Figma docs)
    action: colors.edgeTurquoise[500], // Components/Button/Primary/BG/Default
  },
  knowledge: {
    title: 'EDGE\nKnowledge ®',
    description:
      "EDGE Knowledge provides practical guidance and support to DE&I and HR professionals, shaped by best practices and real-world experience as well as by the latest DE&I thought leadership from the EDGE Certified Foundation's Academic and Scientific Advisory Council.",
    text: colors.edgeBlue[700], // Brand/Secondary/700
    action: colors.edgeBlue[500], // Components/Button/Neutral/BG/Default
  },
  connections: {
    title: 'EDGE\nConnections ®',
    description:
      'EDGE Connections opens up access to a network of DE&l and HR professionals to enable mutual learning and facilitate the collaborative exchange of ideas and best practices.',
    text: colors.edgeTurquoise[900], // Brand/Primary/900
    action: colors.edgeTurquoise[900],
  },
  certifications: {
    title: 'EDGE Certification ®\nBootcamp',
    description:
      'Navigate local requirements, such as pay equity regulations and CSRD (ESRS-S1) reporting. This feature enables you to simplify and efficiently manage your DE&I-related compliance obligations.',
    text: colors.edgeRed[500], // EDGE-Red/500
    action: colors.edgeRed[500],
  },
  compliance: {
    title: 'EDGE Compliance\nBootcamp',
    description:
      'DE&I is a journey you don’t have to take on your own. EDGE Knowledge, delivered through EDGE Empower®, provides DE&I and HR professionals with practical guidance and support shaped by best practice and real‑world experience.',
    text: colors.edgeBlue[800], // Brand/Secondary/800
    action: colors.edgeBlue[800],
  },
  payTool: {
    title: 'EDGE Empower\nPay Tool ®',
    description:
      'Conduct offline pay gap assessments using a linear regression analysis, mitigate potential risks, and identify effective remediation strategies.',
    text: colors.edgeBlue[700], // Brand/Secondary/700
    action: colors.edgeBlue[700],
  },
};

export interface HubAccessCardProps {
  platform: Platform;
  /** Overrides the Figma default title / description. */
  title?: string;
  description?: string;
  actionLabel?: string;
  href?: string;
  onAccess?: React.MouseEventHandler<HTMLButtonElement>;
}

export function HubAccessCard({ platform, title, description, actionLabel = 'Access', href, onAccess }: HubAccessCardProps) {
  const p = HUB_PLATFORMS[platform];
  const name = (title ?? p.title).replace(/\n/g, ' ');
  return (
    <Box
      component="article"
      sx={{
        width: 400,
        height: 350,
        pt: 4,
        pr: 3,
        pb: 4,
        pl: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        bgcolor: 'background.paper',
        border: `1px solid ${colors.grey[300]}`,
        borderRadius: '16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <PlatformLogo platform={platform} size={80} />
        <Typography variant="heading-xs" component="h3" sx={{ color: 'text.primary', whiteSpace: 'pre-line' }}>
          {title ?? p.title}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', gap: 3 }}>
        <Typography variant="body-sm" sx={{ color: p.text, alignSelf: 'stretch' }}>
          {description ?? p.description}
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ChevronRightIcon />}
          href={href}
          onClick={onAccess}
          aria-label={`${actionLabel} ${name}`}
          sx={{ bgcolor: p.action, color: '#ffffff', '&:hover': { bgcolor: p.action, filter: 'brightness(0.9)' } }}
        >
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}

/** Hub page layout: 3 cards per row, 32px gap (Figma Hub Grid Example). */
export function HubAccessGrid({ children }: { children: React.ReactNode }) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 400px)', gap: 4 }}>{children}</Box>;
}

export default HubAccessCard;
