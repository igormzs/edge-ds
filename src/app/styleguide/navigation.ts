export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    group: 'Foundations',
    items: [
      { label: 'Branding', href: '/styleguide' },
      { label: 'Palette', href: '/styleguide/foundations/palette' },
    ],
  },
  {
    group: 'Components',
    items: [
      { label: 'Accordion', href: '/styleguide/accordion' },
      { label: 'Alert', href: '/styleguide/alert' },
      { label: 'Autocomplete', href: '/styleguide/autocomplete' },
      { label: 'Backdrop', href: '/styleguide/backdrop' },
      { label: 'Badge', href: '/styleguide/badge' },
    { label: 'Button', href: '/styleguide/button' },
    { label: 'Checkbox', href: '/styleguide/checkbox' },
    { label: 'Chip', href: '/styleguide/chip' },
    { label: 'Dialog', href: '/styleguide/dialog' },
    { label: 'Divider', href: '/styleguide/divider' },
    { label: 'Floating Action Button', href: '/styleguide/fab' },
    { label: 'Icons', href: '/styleguide/icons' },
    { label: 'Tabs', href: '/styleguide/tabs' },
    { label: 'Status Tag', href: '/styleguide/status-tag' },
      { label: 'TextField', href: '/styleguide/textfield' },
    ],
  },
];
