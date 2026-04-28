'use client';

import React from 'react';
import { Chip, ChipProps, styled, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel'; // For Error 'X'
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For Neutral

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

  // Color Mapping based on Figma visual
  const colors = {
    success: {
      bg: '#c8e6c9',
      border: '#4caf50',
      text: '#1b5e20',
    },
    error: {
      bg: '#fecdd2',
      border: '#f44336',
      text: '#b71c1c',
    },
    info: {
      bg: '#bbdefb',
      border: '#2196f3',
      text: '#0d47a1',
    },
    warning: {
      bg: '#ffecb3',
      border: '#ffc107',
      text: '#ff6f00',
    },
    neutral: {
      bg: '#eee',
      border: '#9e9e9e',
      text: '#212121',
    },
  }[statusType];

  return {
    backgroundColor: colors.bg,
    color: colors.text,
    border: `2px solid ${colors.border}`,
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
      color: colors.text, // Icon matches text color for better visibility
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
