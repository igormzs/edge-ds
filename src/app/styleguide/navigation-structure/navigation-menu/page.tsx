'use client';

import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  NavDashboardIcon,
  NavHomeIcon,
  NavSettingsIcon,
  NavInputsIcon,
  NavChartEdgeIcon,
  NavChartEdgePlusIcon,
  NavBenchmarksIcon,
  NavActionPlanIcon,
  NavDownloadFolderIcon,
} from '@/components/icons/NavigationIcons';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';
import { NavigationMenu, type NavigationMenuItemData } from '@/components/NavigationMenu';

// Left-aligned example wrapper, matching the sibling Breadcrumbs page's own
// local Example helper (PreviewGroup from DocUI centers its content, which
// doesn't suit a left-docked nav rail).
function Example({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      {children}
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 11,
          color: '#9e9e9e',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

const demoItems: NavigationMenuItemData[] = [
  { id: 'results-dashboard', label: 'Results dashboard', icon: <NavDashboardIcon /> },
  { id: 'home', label: 'Home', icon: <NavHomeIcon /> },
  { id: 'settings', label: 'Settings', icon: <NavSettingsIcon /> },
  { id: 'inputs', label: 'Inputs', icon: <NavInputsIcon /> },
  {
    id: 'edge-analytics',
    label: 'EDGE analytics',
    icon: <NavChartEdgeIcon />,
    children: [
      { id: 'scope-of-analysis', label: 'Scope of analysis' },
      {
        id: 'representation',
        label: 'Representation',
        children: [
          { id: 'comparison-data-vs-survey', label: 'Comparison: data vs survey' },
          { id: 'career-transition-charts', label: 'Career Transition Charts' },
          { id: 'projections', label: 'Projections' },
          { id: 'career-accelerators', label: 'Career Accelerators' },
        ],
      },
      { id: 'pay-equity', label: 'Pay equity' },
      { id: 'inclusive-culture', label: 'Inclusive culture' },
    ],
  },
  { id: 'edgeplus-analytics', label: 'EDGEplus analytics', icon: <NavChartEdgePlusIcon /> },
  {
    id: 'benchmarks',
    label: 'Benchmarks',
    icon: <NavBenchmarksIcon />,
    children: [
      { id: 'against-edge-standard', label: 'Agains EDGE standard' },
      {
        id: 'against-peers',
        label: 'Agains peers',
        children: [
          { id: 'career-transitions', label: 'Career transitions' },
          { id: 'career-accelerators-2', label: 'Career accelerators' },
          { id: 'board-composition', label: 'Board composition' },
          { id: 'mentoring', label: 'Mentoring' },
        ],
      },
    ],
  },
  { id: 'action-plan', label: 'Action plan', icon: <NavActionPlanIcon /> },
  { id: 'downloads', label: 'Downloads', icon: <NavDownloadFolderIcon /> },
];

const codeSnippet = `import { NavigationMenu, type NavigationMenuItemData } from '@/components/NavigationMenu';
import {
  NavDashboardIcon,
  NavHomeIcon,
  NavSettingsIcon,
  NavInputsIcon,
  NavChartEdgeIcon,
  NavChartEdgePlusIcon,
  NavBenchmarksIcon,
  NavActionPlanIcon,
  NavDownloadFolderIcon,
} from '@/components/icons/NavigationIcons';

const items: NavigationMenuItemData[] = [
  { id: 'dashboard', label: 'Results dashboard', icon: <NavDashboardIcon /> },
  { id: 'home', label: 'Home', icon: <NavHomeIcon /> },
  {
    id: 'analytics',
    label: 'EDGE analytics',
    icon: <NavChartEdgeIcon />,
    children: [
      { id: 'scope', label: 'Scope of analysis' },
      { id: 'representation', label: 'Representation', children: [
        { id: 'projections', label: 'Projections' },
      ] },
    ],
  },
];

// Uncontrolled — manages its own collapsed/selected/expanded state
<NavigationMenu items={items} />

// Controlled collapse
<NavigationMenu
  items={items}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
/>

// Controlled selection (e.g. driven by the current route)
<NavigationMenu
  items={items}
  selectedId={currentRouteId}
  onSelect={(id) => router.push(routeFor(id))}
/>`;

const propRows: PropRow[] = [
  { prop: 'items', type: 'NavigationMenuItemData[]', default: '—', description: 'The recursive tree of rows to render. Each item: { id, label, icon?, children?, href?, onClick?, disabled? }.' },
  { prop: 'collapsed', type: 'boolean', default: 'uncontrolled', description: 'Icon-only 56px rail vs. the full expanded panel.' },
  { prop: 'onCollapsedChange', type: '(collapsed: boolean) => void', default: '—', description: 'Fires when the header collapse/expand toggle is used.' },
  { prop: 'selectedId', type: 'string', default: 'uncontrolled', description: 'Id of the row shown in the Selected (current-page) treatment.' },
  { prop: 'onSelect', type: '(id: string) => void', default: '—', description: 'Fires when a row is activated (click or Enter/Space).' },
  { prop: 'width / collapsedWidth', type: 'number', default: '335 / 56', description: 'Panel width in expanded / collapsed mode, in px.' },
  { prop: 'searchable', type: 'boolean', default: 'true', description: 'Shows the search bar in expanded mode; live-filters items by label.' },
];

export default function NavigationMenuPage() {
  const [collapsedDemo, setCollapsedDemo] = useState(false);
  // Defaults to a nested leaf (rather than a top-level item) so the
  // Visual Preview demonstrates the active-path treatment on its ancestor
  // chain ("EDGE analytics" -> "Representation") out of the box.
  const [selectedId, setSelectedId] = useState('career-transition-charts');

  return (
    <Box>
      <PageHeader
        title="Navigation Menu"
        description="A collapsible left-hand navigation rail: an icon-only collapsed mode, a full expanded list, and recursively nested, independently expandable sub-sections up to three levels deep. Ported from a pre-governance legacy Figma mockup with no MUI upstream equivalent (closest analog: Drawer + List + Collapse)."
        muiLink="https://mui.com/material-ui/react-drawer/"
        categoryBadge="Components"
        statusBadge="New — zero prior governance"
      />

      {/* Visual Variants */}
      <DocSection title="Visual Variants">
        <PreviewCanvas sx={{ alignItems: 'flex-start' }}>
          <Stack direction="row" spacing={4}>
            <Example label="Collapsed — click the header icon to expand">
              <NavigationMenu
                items={demoItems}
                collapsed={collapsedDemo}
                onCollapsedChange={setCollapsedDemo}
              />
            </Example>
            <Example label="Expanded, with a Selected row, its active-path ancestors, and multi-level nesting — try clicking other rows, or the search bar">
              <NavigationMenu
                items={demoItems}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </Example>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Anatomy & Token Architecture */}
      <DocSection title="Anatomy & Token Architecture">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Every row reserves a fixed 24px icon slot plus a 12px gap before its label, whether or not that row actually shows an icon — invisible placeholder icons on child rows keep every label vertically aligned regardless of nesting depth.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Rows with children carry a trailing chevron that swaps between <code>ExpandMore</code>/<code>ExpandLess</code> on toggle; leaf rows reserve the same chevron slot, left invisible, for alignment.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Each nesting level beyond the first adds 24px of additional left padding (level 1 = 16px, level 2 = 40px, level 3 = 64px).
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Row interaction states (Hover, Focus, Selected) are new in this migration — the source Figma mockup depicted none. They reuse the existing <code>Components/List/ListItem/*</code> precedent via a new <code>MuiListItemButton</code> theme override, aliased in Figma as <code>Components/NavigationMenu/Item/*</code>.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The ancestor sections leading to the Selected page (its "active path") get a colored label, icon, and chevron — <code>primary.main</code>, matching the <code>Components/Tab/Active/Primary</code> precedent — so it stays clear which sections were drilled into to reach the current page, not just which page it is. This is computed automatically from <code>selectedId</code> and re-expands the path if it's collapsed.
            </Typography>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Code */}
      <DocSection title="Usage">
        <CodeBlock code={codeSnippet} />
      </DocSection>

      {/* Accessibility */}
      <DocSection title="Accessibility Notes">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Every row is a real, focusable, keyboard-operable <code>ListItemButton</code> — never a styled non-interactive <code>div</code>.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The search input carries <code>aria-label=&quot;Search navigation&quot;</code> since its visible &quot;Search&quot; text is a placeholder, not a persistent label.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Consumers should set <code>aria-current=&quot;page&quot;</code> on the active route&apos;s row (via the underlying <code>href</code>/routing layer) so current-page state isn&apos;t conveyed by color alone.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The collapsed rail has no built-in responsive/overlay behavior — it is a density toggle, not a small-screen replacement; pair with a real responsive drawer pattern for mobile.
            </Typography>
          </Stack>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
