# Skill: Creating an EDGE DS Styleguide Component Page

## Overview
This skill describes the standard pattern for adding a new component documentation page
to the EDGE Design System styleguide at `/Users/IgorMenezes/AI Projects/EDGE DS`.

## Project Stack
- **Framework**: Next.js (App Router) with TypeScript  
- **UI Library**: MUI v6 (`@mui/material`)  
- **Theme**: `src/theme/brandTheme.ts`  
- **Styleguide root**: `src/app/styleguide/`

## Checklist for Every New Component Page

### 1. Create the page file
```
src/app/styleguide/<component-name>/page.tsx
```
Always start with `'use client';` — all doc pages are client components (they use `useState`).

### 2. Follow the standard section order
```
PageHeader         ← title, description, MUI docs link
DocSection         ← "Basic <Component>"
DocSection         ← variants / sizes / colours / states
DocSection         ← "EDGE custom variant" (if applicable)
DocSection         ← "Key Props"   ← PropsTable
DocSection         ← "Usage"       ← CodeBlock(s)
```

### 3. Import from DocUI
```tsx
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,   // use for labelled side-by-side previews
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';
```

### 4. DocUI component contracts

#### `<PageHeader>`
```tsx
<PageHeader
  title="Component Name"
  description="One or two sentence description."
  muiLink="https://mui.com/material-ui/react-<component>/"
/>
```

#### `<DocSection>`
```tsx
<DocSection title="Section Title">
  {/* content */}
</DocSection>
```
Renders a labelled divider line above the content.

#### `<PreviewCanvas>`
Wraps live examples in a white card with a subtle border:
```tsx
<PreviewCanvas>
  <MyComponent />
</PreviewCanvas>
```

#### `<PreviewGroup>`
Adds a small grey caption below a preview item:
```tsx
<PreviewGroup label="Checked">
  <Checkbox defaultChecked />
</PreviewGroup>
```

#### `<PropsTable>`
```tsx
const propRows: PropRow[] = [
  {
    prop: 'color',
    type: '"primary" | "secondary"',
    default: '"primary"',
    description: 'The colour of the component.',
  },
];
<PropsTable rows={propRows} />
```

#### `<CodeBlock>`
```tsx
const codeSnippet = `import Foo from '@mui/material/Foo';
<Foo color="primary" />`;

<CodeBlock code={codeSnippet} />
```

### 5. Register the page in navigation
Open `src/app/styleguide/navigation.ts` and add an entry to the `Components` group
**in alphabetical order**:
```ts
{ label: 'ComponentName', href: '/styleguide/component-name' },
```

### 6. Add theme overrides (if needed)
Open `src/theme/brandTheme.ts`. Inside the `components: {}` block of `createTheme`,
add a `Mui<ComponentName>` entry following the existing pattern:
```ts
MuiTabs: {
  styleOverrides: {
    indicator: {
      backgroundColor: baseTheme.palette.primary.main,
      height: 3,
    },
  },
},
```

### 7. Build & deploy
```bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
cd "/Users/IgorMenezes/AI Projects/EDGE DS"
npm run build        # verify no errors
npx vercel --prod   # deploy to https://edge-ds.vercel.app
```

## EDGE Design Tokens Quick Reference

| Token | Value | Usage |
|---|---|---|
| Primary | `#009f9b` | Active indicator, selected text, icons |
| Primary Dark | `#00918c` | Hover/active state on primary |
| Subtle | `#ecfdfe` | Hover background on primary items |
| Secondary | `#5e6e7d` | Labels, secondary text |
| Text Primary | `#212121` | Main body text |
| Text Secondary | `rgba(0,0,0,0.6)` | Captions, descriptions |
| Text Disabled | `#9e9e9e` | Disabled state |
| Surface Default | `#fafafa` | Page/card background |
| Divider | `rgba(0,0,0,0.12)` | Borders and separators |
| Border radius | `4px` (base), `8px` (cards) | Shape |

## Typography
- **Display / Headings**: Montserrat (700)  
- **Body / Labels / Captions**: Open Sans (400/600)  
- **Code**: Roboto Mono

## Common Patterns

### Interactive demo with useState
```tsx
'use client';
import { useState } from 'react';

function MyDemo() {
  const [value, setValue] = useState(0);
  return <MyComponent value={value} onChange={(_, v) => setValue(v)} />;
}
```

### Apostrophes in string literals
Always use double quotes for strings that contain apostrophes to avoid Turbopack
parsing errors:
```tsx
// ✅ correct
description: "This is the Tab's description."
// ❌ will cause a build error
description: 'This is the Tab's description.'
```
