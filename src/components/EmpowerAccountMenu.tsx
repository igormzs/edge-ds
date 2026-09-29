'use client';

import React from 'react';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import type { PopoverOrigin } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<EmpowerAccountMenu>` — the account dropdown that opens from the
 * Account area of `<EmpowerHeader>`. Figma: Header & Footer page ›
 * `<EmpowerAccountMenu>` (node 3870:1522), also shown inside
 * `<EmpowerHeader>` Account Menu=Open.
 *
 * Layout (Figma → code): 240px Paper, Elevation 8, borderRadius 4. The
 * signed-in user block (`<ListItem>`: name body-md, role body-sm) sits
 * above a divider, followed by the `<MenuList>` actions. Log out is last,
 * after its own divider.
 *
 * Token map:
 *   Icons                                 → Components/Icon/Fill/Default → black @ 70%
 *   Surface                               → Semantic/Surface/Paper  → background.paper
 *   Name                                  → Semantic/Text/Primary   → text.primary
 *   Role                                  → Semantic/Text/Secondary → grey 700
 *   Divider                               → Semantic/Border/Divider → palette.divider
 *   Account Menu/Logout/Text (destructive) → Semantic/Status/Error/Text → red 900
 *   Account Menu/Logout/Icon (destructive) → Semantic/Status/Error/Icon → red 800
 */

/** Components/Icon/Fill/Default (#000000 @ 70%), not the theme's teal action.active. */
const ICON_DEFAULT = 'rgba(0, 0, 0, 0.70)';

export interface EmpowerAccountMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  /** Signed-in user's display name. */
  name: string;
  /** Role or secondary line under the name, e.g. "Admin". */
  role?: string;
  onFeedbackClick?: () => void;
  onResetPasswordClick?: () => void;
  onLogoutClick?: () => void;
  id?: string;
  /** Where on the anchor the menu attaches. Default: its bottom-right corner (+4px gap). */
  anchorOrigin?: PopoverOrigin;
}

export function EmpowerAccountMenu({
  anchorEl,
  open,
  onClose,
  name,
  role,
  onFeedbackClick,
  onResetPasswordClick,
  onLogoutClick,
  id,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
}: EmpowerAccountMenuProps) {
  const select = (handler?: () => void) => () => {
    onClose();
    handler?.();
  };

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: { elevation: 8, sx: { width: 240, mt: 0.5 } },
        list: { sx: { pt: 0, pb: 1 } },
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }} role="presentation">
        <Typography variant="body-md" component="p" sx={{ color: 'text.primary' }}>
          {name}
        </Typography>
        {role && (
          <Typography variant="body-sm" component="p" sx={{ color: colors.grey[700] }}>
            {role}
          </Typography>
        )}
      </Box>
      <Divider sx={{ mt: 1, mb: 2 }} />

      <MenuItem onClick={select(onFeedbackClick)}>
        <ListItemIcon sx={{ color: ICON_DEFAULT }}>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText>My feedback</ListItemText>
      </MenuItem>
      <MenuItem onClick={select(onResetPasswordClick)}>
        <ListItemIcon sx={{ color: ICON_DEFAULT }}>
          <LockIcon />
        </ListItemIcon>
        <ListItemText>Reset password</ListItemText>
      </MenuItem>
      <Divider sx={{ my: 1 }} />
      <MenuItem onClick={select(onLogoutClick)} sx={{ color: colors.red[900] }}>
        <ListItemIcon sx={{ color: colors.red[800] }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default EmpowerAccountMenu;
