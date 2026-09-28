'use client';

import React from 'react';
import { Chip, ChipProps, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel'; // For Error 'X'
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For Neutral
import { colors } from '@/theme/brandTheme';

export type StatusTagType = 'success' | 'error' | 'info' | 'warning' | 'neutral';
export type StatusTagSize = 'small' | 'medium' | 'large';

interface StatusTagProps extends Omit<ChipProps, 'size' | 'color'> {
  type?: StatusTagType;
  size?: StatusTagSize;
  showIcon?: boolean;
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'statusType' && prop !== 'statusSize',
})<{ statusType: StatusTagType; statusSize: StatusTagSize }>(({ theme, statusType, statusSize }) => {
  const isSmall = statusSize === 'small';
  const isLarge = statusSize === 'large';

  // Components/Status Tag/{Type}/{Background,Border,Icon,Text} — each aliases
  // the shared Semantic/Status/{Type}/* tier (same tier Alert and Chip already
  // consume). Verified byte-exact against the live Figma master: every status
  // resolves to ramp[100|200]/[500]/[800]/[900] for bg/border/icon/text — the
  // same formula MuiAlert's standardX/outlinedX variants already use below.
  const statusColors = {
    success: {
      bg: colors.green[100],
      border: colors.green[500],
      icon: colors.green[800],
      text: colors.green[900],
    },
    error: {
      bg: colors.red[100],
      border: colors.red[500],
      icon: colors.red[800],
      text: colors.red[900],
    },
    info: {
      bg: colors.blue[100],
      border: colors.blue[500],
      icon: colors.blue[800],
      text: colors.blue[900],
    },
    warning: {
      bg: colors.amber[100],
      border: colors.amber[500],
      icon: colors.amber[800],
      text: colors.amber[900],
    },
    neutral: {
      bg: colors.grey[200],
      border: colors.grey[500],
      icon: colors.grey[800],
      text: colors.grey[900],
    },
  }[statusType];

  return {
    backgroundColor: statusColors.bg,
    color: statusColors.text,
    border: `2px solid ${statusColors.border}`,
    fontWeight: 600,
    fontSize: isSmall ? '0.5rem' : '0.75rem', // Figma uses 8px for small, 12px for medium/large
    height: isLarge ? 40 : isSmall ? 24 : 32,
    borderRadius: '24px',
    '& .MuiChip-label': {
      paddingLeft: 12,
      paddingRight: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    '& .MuiChip-icon': {
      color: statusColors.icon,
      marginLeft: isSmall ? 4 : 8,
      marginRight: -4,
      fontSize: isLarge ? 24 : isSmall ? 16 : 20,
    },
  };
});

export const StatusTag: React.FC<StatusTagProps> = ({
  type = 'neutral',
  size = 'medium',
  showIcon = true,
  label,
  ...props
}) => {
  const getIcon = () => {
    if (!showIcon) return undefined;
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <CancelIcon />;
      case 'info':
        return <InfoIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'neutral':
        return <AccountCircleIcon />;
      default:
        return undefined;
    }
  };

  return (
    <StyledChip
      statusType={type}
      statusSize={size}
      icon={getIcon()}
      label={label || type.toUpperCase()}
      variant="outlined" // Use outlined as base for our custom border logic
      {...props}
    />
  );
};
