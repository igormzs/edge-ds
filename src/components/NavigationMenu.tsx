'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { NavSidebarCollapseIcon, NavSidebarExpandIcon } from './icons/NavigationIcons';

/**
 * EDGE-DS `<NavigationMenu>` — a composite sidebar/navigation-rail component.
 *
 * Named `NavigationMenu` (not `Menu`/`MenuList`) to avoid clashing with MUI's
 * own dropdown-menu family (`<Menu>`/`<MenuList>`/`<MenuItem>`), which is a
 * separate, already-migrated EDGE-DS component tracked elsewhere.
 *
 * Ported from a legacy Figma frame that predates this design system's
 * confirmed typography policy (Montserrat = headings, Open Sans = everything
 * else) and depicted zero hover/selected/disabled interaction states. Both
 * gaps are deliberately closed here rather than reproduced as-is — see the
 * `fontFamily` usages below and the `MuiListItemButton` theme override this
 * component relies on in `src/theme/brandTheme.ts`.
 *
 * `icon` is a consumer-supplied prop per item (this component owns no fixed
 * item list). For the level-0 items in the Figma spec, use the EDGE-DS
 * Navigation icons from `./icons/NavigationIcons` (Figma: Icons page ›
 * `<Navigation> Section`) — they replace the earlier `@mui/icons-material`
 * stand-ins:
 *   - Results dashboard   -> NavDashboardIcon
 *   - Home                -> NavHomeIcon
 *   - Settings            -> NavSettingsIcon
 *   - Inputs              -> NavInputsIcon
 *   - EDGE analytics      -> NavChartEdgeIcon
 *   - EDGEplus analytics  -> NavChartEdgePlusIcon
 *   - Benchmarks          -> NavBenchmarksIcon
 *   - Action plan         -> NavActionPlanIcon
 *   - Downloads           -> NavDownloadFolderIcon
 */

const OPEN_SANS = '"Open Sans", sans-serif';

// 24px icon (or icon-slot) + 12px gap, reserved on every row — including
// level 1+ rows, which have no real leading icon in the source design — so
// labels stay vertically aligned across all levels and siblings.
const ICON_SLOT_SIZE = 24;
const ICON_GAP = 1.5; // theme.spacing(1.5) === 12px

export interface NavigationMenuItemData {
  id: string;
  label: string;
  /** Typically only meaningful on level-0 items; level 1+ items don't render one in the source design. */
  icon?: React.ReactNode;
  children?: NavigationMenuItemData[];
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface NavigationMenuProps {
  items: NavigationMenuItemData[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Expanded-mode width in px. Default 335. */
  width?: number;
  /** Collapsed-mode (icon rail) width in px. Default 56. */
  collapsedWidth?: number;
  /** Shows the search bar in expanded mode. Default true. */
  searchable?: boolean;
}

// Row height (40px) + horizontal padding (16px) shared by the collapse
// toggle row, the collapsed-rail rows, and every expanded nav-item row.
const ROW_SX = {
  height: 40,
  minHeight: 40,
  px: 2, // 16px
  py: 1, // 8px
};

function CollapseToggleButton({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const label = collapsed ? 'Expand menu' : 'Collapse menu';
  return (
    // Figma: <Tooltip> on hover/focus — "Collapse menu" (expanded) / "Expand menu" (collapsed rail).
    <Tooltip title={label} placement={collapsed ? 'right' : 'bottom'}>
    <IconButton
      onClick={onToggle}
      size="small"
      aria-label={label}
      sx={{ p: 0 }}
    >
      {/* Figma: SidebarCollapse (expanded rail) / SidebarExpand (collapsed rail). */}
      {collapsed ? (
        <NavSidebarExpandIcon sx={{ fontSize: ICON_SLOT_SIZE }} />
      ) : (
        <NavSidebarCollapseIcon sx={{ fontSize: ICON_SLOT_SIZE }} />
      )}
    </IconButton>
    </Tooltip>
  );
}

interface NavItemRowProps {
  item: NavigationMenuItemData;
  level: number;
  selectedId: string | undefined;
  expandedIds: Set<string>;
  activePathIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (item: NavigationMenuItemData) => void;
}

// Base 16px left padding, +24px per level beyond level 0 (level 1 stays at
// the base 16px; level 2 = 40px; level 3 = 64px; ...). Measured directly off
// the Figma spec: a 2nd-level-nested row used padding-left 16px, a 3rd-level
// used 40px.
function levelPaddingLeftPx(level: number): number {
  return level <= 1 ? 16 : 16 + (level - 1) * 24;
}

// Keeps a node when its own label matches, or any descendant's does (so a
// matching grandchild still surfaces its ancestor chain in the results).
function filterItems(items: NavigationMenuItemData[], query: string): NavigationMenuItemData[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  const result: NavigationMenuItemData[] = [];
  for (const item of items) {
    const ownMatch = item.label.toLowerCase().includes(q);
    const filteredChildren = item.children ? filterItems(item.children, query) : undefined;
    if (ownMatch || (filteredChildren && filteredChildren.length > 0)) {
      result.push(
        filteredChildren && filteredChildren.length > 0 && !ownMatch
          ? { ...item, children: filteredChildren }
          : item
      );
    }
  }
  return result;
}

function collectIds(items: NavigationMenuItemData[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children) ids.push(...collectIds(item.children));
  }
  return ids;
}

// The ancestor chain leading to the selected item (excluding the selected
// item itself) — every id in the returned set gets the "active path" teal
// label/icon/chevron treatment, so a user can trace which sections were
// drilled into to reach the current page, not just which page they're on.
function findActivePathIds(items: NavigationMenuItemData[], selectedId: string | undefined): Set<string> {
  if (!selectedId) return new Set();
  function search(nodes: NavigationMenuItemData[]): string[] | null {
    for (const node of nodes) {
      if (node.id === selectedId) return [];
      if (node.children) {
        const childPath = search(node.children);
        if (childPath) return [node.id, ...childPath];
      }
    }
    return null;
  }
  return new Set(search(items) ?? []);
}

function NavItemRow({ item, level, selectedId, expandedIds, activePathIds, onToggleExpand, onSelect }: NavItemRowProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isOpen = expandedIds.has(item.id);
  const isSelected = selectedId === item.id;
  // An ancestor of the selected page — colored to trace the path down to it,
  // distinct from (and visually subordinate to) the Selected row's own
  // background tint. Matches the Components/Tab/Active/Primary precedent
  // (Brand/Primary/500, i.e. `primary.main` here), not the darker
  // `primary.active` used for Accordion's "filters applied" state.
  const isActivePath = activePathIds.has(item.id);
  // The selected row itself also gets the ActivePath teal (on top of its
  // Selected background), per Figma 2026-09-24 — both signals on the
  // current page, ActivePath alone on its ancestors.
  const isTeal = isActivePath || isSelected;
  const isLevel0 = level === 0;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(item.id);
    }
    onSelect(item);
  };

  return (
    <>
      <ListItemButton
        selected={isSelected}
        disabled={item.disabled}
        onClick={handleClick}
        {...(item.href ? { component: 'a', href: item.href } : {})}
        sx={{
          ...ROW_SX,
          pl: `${levelPaddingLeftPx(level)}px`,
          justifyContent: 'space-between',
          gap: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: ICON_GAP, minWidth: 0 }}>
          <Box
            sx={{
              width: ICON_SLOT_SIZE,
              height: ICON_SLOT_SIZE,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // Level 1+ rows have no leading icon in the source design, but
              // still reserve the icon-slot width so labels line up with
              // level-0 labels.
              opacity: isLevel0 && item.icon ? 1 : 0,
              color: isTeal ? 'primary.main' : 'inherit',
              '& svg': { fontSize: ICON_SLOT_SIZE },
            }}
          >
            {isLevel0 ? item.icon : null}
          </Box>
          <Typography
            noWrap
            sx={{
              fontFamily: OPEN_SANS,
              fontSize: 16,
              // Open Sans 700 isn't loaded by this app's Google Fonts
              // stylesheet (only 400/600 are — see src/app/layout.tsx), so
              // 600 (SemiBold) is used here instead of the Figma source's
              // literal Bold/700. Disclosed deviation, not a Figma-fidelity
              // gap: the source frame used Montserrat Bold anyway, which
              // this design system's typography policy already overrides.
              fontWeight: 600,
              color: isTeal ? 'primary.main' : 'text.primary',
            }}
          >
            {item.label}
          </Typography>
        </Box>
        {/* Trailing chevron: present-but-invisible on leaf rows (any level) to keep alignment consistent across siblings. */}
        {hasChildren ? (
          isOpen ? (
            <ExpandLessIcon sx={{ fontSize: ICON_SLOT_SIZE, flexShrink: 0, color: isTeal ? 'primary.main' : 'inherit' }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: ICON_SLOT_SIZE, flexShrink: 0, color: isTeal ? 'primary.main' : 'inherit' }} />
          )
        ) : (
          <ExpandMoreIcon sx={{ fontSize: ICON_SLOT_SIZE, flexShrink: 0, opacity: 0 }} />
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <NavItemRow
                key={child.id}
                item={child}
                level={level + 1}
                selectedId={selectedId}
                expandedIds={expandedIds}
                activePathIds={activePathIds}
                onToggleExpand={onToggleExpand}
                onSelect={onSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export function NavigationMenu({
  items,
  collapsed: collapsedProp,
  onCollapsedChange,
  selectedId: selectedIdProp,
  onSelect,
  width = 335,
  collapsedWidth = 56,
  searchable = true,
}: NavigationMenuProps) {
  const [collapsedState, setCollapsedState] = useState(false);
  const collapsed = collapsedProp ?? collapsedState;

  const [selectedIdState, setSelectedIdState] = useState<string | undefined>(undefined);
  const selectedId = selectedIdProp ?? selectedIdState;

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const activePathIds = useMemo(() => findActivePathIds(items, selectedId), [items, selectedId]);

  // Auto-expand the ancestor chain whenever the selected page changes (e.g. a
  // controlled `selectedId` driven by the current route), so a newly-active
  // page is actually visible rather than hidden behind a closed Collapse.
  // Manual expand/collapse clicks elsewhere in the tree are left untouched.
  useEffect(() => {
    if (activePathIds.size === 0) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const id of activePathIds) {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [activePathIds]);

  const visibleItems = searchQuery.trim() ? filterItems(items, searchQuery) : items;
  // While actively searching, every branch that survived filtering must be
  // expanded so its matching descendants are actually visible.
  const effectiveExpandedIds = searchQuery.trim()
    ? new Set([...expandedIds, ...collectIds(visibleItems)])
    : expandedIds;

  const toggleCollapsed = useCallback(() => {
    const next = !collapsed;
    if (onCollapsedChange) {
      onCollapsedChange(next);
    } else {
      setCollapsedState(next);
    }
  }, [collapsed, onCollapsedChange]);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (item: NavigationMenuItemData) => {
      if (item.disabled) return;
      item.onClick?.();
      if (onSelect) {
        onSelect(item.id);
      } else {
        setSelectedIdState(item.id);
      }
    },
    [onSelect]
  );

  if (collapsed) {
    return (
      <Box
        component="nav"
        sx={{
          width: collapsedWidth,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ ...ROW_SX, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CollapseToggleButton collapsed={collapsed} onToggle={toggleCollapsed} />
        </Box>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItemButton
              key={item.id}
              // In collapsed mode there's no room to distinguish "the exact
              // current page" from "the section containing it" the way the
              // expanded tree does with a separate active-path color — so an
              // ancestor of the real selected page is also shown Selected
              // here, as the only visible cue for "this is your active area."
              selected={selectedId === item.id || activePathIds.has(item.id)}
              disabled={item.disabled}
              onClick={() => handleSelect(item)}
              {...(item.href ? { component: 'a', href: item.href } : {})}
              sx={{ ...ROW_SX, justifyContent: 'center' }}
            >
              <Box
                sx={{
                  width: ICON_SLOT_SIZE,
                  height: ICON_SLOT_SIZE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& svg': { fontSize: ICON_SLOT_SIZE },
                }}
              >
                {item.icon}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: 40,
          minHeight: 40,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          // Figma 2026-09-25: the header has no title — only the toggle, right-aligned.
          justifyContent: 'flex-end',
        }}
      >
        <CollapseToggleButton collapsed={collapsed} onToggle={toggleCollapsed} />
      </Box>

      {searchable && (
        <Box sx={{ px: 2, py: 1 }}>
          <Box
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#fafafa',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '16px',
              px: 1.5,
            }}
          >
            <InputBase
              placeholder="Search"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ 'aria-label': 'Search navigation' }}
              sx={{
                fontFamily: OPEN_SANS,
                fontSize: 16,
                fontWeight: 600,
                '& input::placeholder': {
                  fontFamily: OPEN_SANS,
                  fontWeight: 600,
                  opacity: 1,
                  color: 'text.secondary',
                },
              }}
            />
            <SearchIcon sx={{ fontSize: ICON_SLOT_SIZE, color: 'text.secondary', flexShrink: 0 }} />
          </Box>
        </Box>
      )}

      <List component="div" disablePadding>
        {visibleItems.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            level={0}
            selectedId={selectedId}
            expandedIds={effectiveExpandedIds}
            activePathIds={activePathIds}
            onToggleExpand={handleToggleExpand}
            onSelect={handleSelect}
          />
        ))}
      </List>
    </Box>
  );
}

export default NavigationMenu;
