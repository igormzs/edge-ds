# EDGE Design System Documentation

A modern, high-fidelity documentation website for the **EDGE Design System**, built with Next.js and Material UI.

![EDGE Styleguide Preview](https://github.com/igormzs/edge-ds/raw/main/public/preview.png) *(Note: Add your preview image here)*

## 🚀 Overview

This project serves as the central documentation hub for the EDGE Design System. It translates Figma design tokens into a functional Material UI theme and provides interactive documentation for core components.

### Key Features
- **Design Token Integration**: Global tokens for colors (Primary, Secondary, Greys, Semantic), typography (Montserrat/Open Sans), and spacing/radius are synced from Figma.
- **Component Styleguide**: Dedicated documentation pages for:
  - **Button** (Synced to Button.EDGE spec)
  - **Chip**
  - **TextField**
  - **Alert**
  - **Badge**
- **Live Previews**: Interactive component rendering within the documentation.
- **Developer Experience**: One-click copy for usage code snippets and detailed props tables.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Styling**: [Emotion](https://emotion.sh/) (MUI's default styling engine)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [@mui/icons-material](https://mui.com/material-ui/material-icons/)

## 📂 Project Structure

```text
├── app/
│   ├── layout.tsx         # Root layout with Google Fonts
│   ├── page.tsx           # Redirects to /styleguide
│   └── styleguide/        # Documentation routes
│       ├── layout.tsx     # Styleguide shell with Sidebar
│       ├── page.tsx       # Design Tokens showcase
│       └── [component]/   # Individual component documentation
├── src/
│   ├── components/
│   │   ├── DocUI.tsx      # Reusable doc primitives (CodeBlock, PropsTable, etc.)
│   │   └── EmotionRegistry.tsx # MUI SSR support for App Router
│   ├── theme/
│   │   └── brandTheme.ts  # The single source of truth for the EDGE theme
│   └── app/               # Actual application source (mapped via aliases)
└── public/                # Static assets
```

## ⌨️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/igormzs/edge-ds.git
cd edge-ds
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the documentation.

## 🎨 Theme Customization

All design tokens and component overrides are managed in `src/theme/brandTheme.ts`. To update a component's visual style globally, modify its `Mui[ComponentName]` style override within this file.

## 📝 Component Documentation Standard

To maintain a consistent developer experience, all individual component styleguide pages (located in `src/app/styleguide/[component]/page.tsx`) should follow this standard section order:

1. **Page Header**: Brief description and MUI documentation link.
2. **Visual Variants**: Core component variants (Contained, Outlined, etc.).
3. **Interactive States**: Demos for Hover, Active, Disabled, and Icon states.
4. **Key Props**: The `PropsTable` component documenting API surface.
5. **Usage**: The `CodeBlock` component with copy-pastable implementation code.

---
Built with ❤️ for the EDGE Design System.
