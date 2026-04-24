# EDGE Design System: Visual Guidelines

This document serves as the **Visual Source of Truth** for the EDGE Design System. It defines the core aesthetic principles, design tokens, and patterns required to maintain a consistent, premium, and high-fidelity user interface across all EDGE projects.

---

## 🎨 1. Color Palette

The EDGE color system is built on high-contrast turquoise and professional blues, supported by a clean grayscale and semantic feedback colors.

### Primary Branding (EDGE Turquoise)
Used for primary actions, active states, and brand highlights.
- **Main**: `#009f9b` (`primary.main`)
- **Dark**: `#00918c` (`primary.dark`) - Used for hover states.
- **Active**: `#0e837d` - Used for pressed/active states.
- **Subtle**: `#ecfdfe` - Used for background tints and light hover states.

### Secondary Branding (EDGE Blue)
Used for secondary actions, structural elements, and text accents.
- **Main**: `#5e6e7d` (`secondary.main`)
- **Dark**: `#515f6c` (`secondary.dark`)
- **Muted**: `#78909c`

### Structural & Surface
EDGE follows a clean, "flat" aesthetic with zero or minimal elevation.
- **Background (Default)**: `#ffffff`
- **Surface (Default)**: `#fafafa` - Used for subtle layout blocks/containers.
- **Surface (Disabled)**: `#e0e0e0`
- **Divider**: `rgba(0, 0, 0, 0.12)` - Used for clean structural separation.

### Semantic Feedback
- **Success**: `#2e7d32`
- **Error**: `#d32f2f`
- **Warning**: `#ef6c00` (Orange 800)
- **Info**: `#1976d2`

---

## ✍️ 2. Typography

The typography system uses a pairing of **Montserrat** for impact and **Open Sans** for legibility.

### Heading System (Montserrat)
| Level | Weight | Size | Line Height | Letter Spacing | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (XL)** | Bold (700) | 60px | 1.2 | -0.9px | Hero sections, main page titles |
| **H3 (MD)** | SemiBold (600) | 34px | 1.235 | -0.34px | Section headers |
| **H5 (SM)** | SemiBold (600) | 24px | 1.33 | -0.12px | Component headers, card titles |

### Body System (Open Sans)
| Type | Weight | Size | Line Height | Letter Spacing | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Body 1** | Regular (400) | 16px | 1.5 | 0px | Default paragraph text |
| **Body 2** | Regular (400) | 14px | 1.43 | 0.06px | Secondary content, tables |
| **Subtitle 2** | SemiBold (600) | 12px | 1.5 | 0.06px | Small labels, metadata |
| **Caption** | Regular (400) | 12px | 1.66 | 0.48px | Helper text, hints |

### Interactive (Buttons)
- **Font**: Open Sans (SemiBold 600)
- **Case**: UPPERCASE
- **Letter Spacing**: 0.7px to 0.8px

---

## 📐 3. Spacing & Shapes

### The 8px Grid
All layouts, padding, and margins must follow the 8px incremental system.
- `spacing(1)` = 8px
- `spacing(2)` = 16px
- `spacing(3)` = 24px
- `spacing(4)` = 32px

### Border Radius
- **Default (4px)**: Standard for buttons, input fields, and small components.
- **Medium (8px)**: Used for cards, accordions, and larger structural blocks.
- **Large (16px)**: Used for modally presented content or special sections.
- **Circular (50%)**: Used for icon buttons and avatars.

---

## ✨ 4. Visual Patterns & Interaction

### Flat Design Policy
EDGE avoids heavy drop shadows. Instead, use:
- **Subtle Borders**: `1px solid rgba(0, 0, 0, 0.08)` or `rgba(0, 0, 0, 0.12)`.
- **Background Tints**: Use `surface.default` (#fafafa) to differentiate sections.

### Micro-Animations
- **Click Feedback**: Components should subtly scale on click (`scale(0.98)`) for a tactile feel.
- **Hover States**: Use a very slight border color darkening or a subtle background color shift (e.g., `alpha(primary.main, 0.04)`).
- **Transitions**: Standard timing is `0.2s ease-in-out`.

### Component Height Standards
- **Large**: 48px
- **Medium (Default)**: 44px
- **Small**: 40px

---

## 🛠 5. Applying to New Components

When building a component from scratch (non-MUI):
1. **Reset Shadows**: Always use `box-shadow: none`.
2. **Apply Typography**: Map text elements strictly to the Montserrat/Open Sans system.
3. **Use the Grid**: Ensure all dimensions are multiples of 8.
4. **Contrast**: Ensure primary actions use the EDGE Turquoise (#009f9b) with white text for maximum accessibility.
