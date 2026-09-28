import { NavigationMenu, type NavigationMenuItemData } from './NavigationMenu';
import figma from '@figma/code-connect';
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
} from './icons/NavigationIcons';

/**
 * NavigationMenu Connection
 *
 * Maps the Figma `Menu - EDGE-DS` component set (page "     Menu", node
 * 231:14181) to the EDGE-DS `<NavigationMenu>` composite component.
 *
 * The Figma set's one real variant property, `Preset`, only cleanly maps to
 * one real code prop: `Preset=Collapsed` -> `collapsed`. Its other four
 * values (`Expanded`, `Representation`, `Inclusive culture`, `Benchmarks`)
 * are illustrative content snapshots showing different branches of the same
 * example tree expanded, not a generalizable state enum — the real
 * expand/collapse-per-row state is owned entirely by the component's own
 * `expandedIds` state in code, which has no Figma-side equivalent to bind
 * to. `items` below is a representative example tree matching the Figma
 * content, not a real per-variant binding.
 */
const exampleItems: NavigationMenuItemData[] = [
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
          { id: 'career-accelerators', label: 'Career accelerators' },
        ],
      },
    ],
  },
  { id: 'action-plan', label: 'Action plan', icon: <NavActionPlanIcon /> },
  { id: 'downloads', label: 'Downloads', icon: <NavDownloadFolderIcon /> },
];

figma.connect(
  NavigationMenu,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-DS---Documentation?node-id=231-14181',
  {
    props: {
      collapsed: figma.enum('Preset', {
        Collapsed: true,
        Expanded: false,
        Representation: false,
        'Inclusive culture': false,
        Benchmarks: false,
      }),
    },
    example: ({ collapsed }) => <NavigationMenu items={exampleItems} collapsed={collapsed} />,
  }
);
