# Project Migration Context: EDGE Design System
Export Date: July 9, 2026
Target Environment: Claude (Agentic Coding & Design Workflows)

## 1. Project Overview & Current Status
The EDGE Design System is the central visual and functional single source of truth for EDGE corporate products, primarily powering the UX/UI of the main platform and the **EDGE Pay Tool**. 

* **Current Phase:** Active development, optimization, and component expansion.
* **Current Status:** The foundational core (tokens, global styles) is fully locked in. We are actively expanding the atomic component library and standardizing complex data-dense organism layouts (dashboards, transactional tables for financial modules).
* **Core Philosophy:** Clean SaaS / Minimalist aesthetic. This translates to a high reliance on explicit spatial harmony, soft container drop shadows, consistently rounded corners, and absolute typographic legibility under heavy data loads.

## 2. Tools & Technological Stack
To maintain seamless alignment when shifting this context into Claude, keep the following tooling setup in mind:
* **Design & Spec Hand-off:** Figma (leveraging Figma Variables for multi-mode configurations).
* **Frontend Ecosystem:** Next.js and React.
* **Styling Framework:** Tailwind CSS (configured to consume custom design tokens).
* **Database & Auth Integration:** Supabase (the system components are built to natively support Supabase Auth layouts and real-time state mappings).

## 3. Core Architectural Decisions & Rules
When generating components, layouts, or system upgrades in Claude, the following decisions must be strictly enforced:

* **The Em-Dash Ban (Critical):** Do NOT use em dashes ("—") in any text formatting, documentation headers, or system descriptions. Use clean vertical pipes, colons, or standard hyphens instead.
* **Component Composition:** Adherence to the Atomic Design methodology. Molecules and organisms are composed strictly from verified primitive atoms.
* **Theming Infrastructure:** Built around Figma Variables and Tailwind mappings to handle Light, Dark, and high-contrast professional financial environments seamlessly.
* **UX Layout Rules for Financial Data:** The system prioritizes data density without compromising breathing room. Input fields, alignment rules, and tables are optimized specifically for the sub-products like the EDGE Pay Tool.

## 4. Completed & Upcoming Phases

### Phase 1: Foundation (Completed)
* Inventory audit of all legacy UI elements across corporate products.
* Setup of structural Design Tokens (Colors, Typography scales, Spacing scales based on a strict modular grid, Border-radius values).
* Execution of the global variables theme layer.

### Phase 2: Atomic Library (In Progress / Advanced)
* Build-out of core primitives: Buttons (variants, states), Inputs, Alerts, Badges, and Avatar clusters.
* Development of interactive state logic optimized for fast-loading React architectures.

### Phase 3: High-Density Layouts (Current Focus)
* Designing and engineering reusable layout wrappers for the EDGE Pay Tool.
* Standardizing data tables, advanced filter states, split-pane transactional screens, and dashboard chart cards.

## 5. Migration Directives for Claude
When initializing a new session or agentic workspace in Claude to continue this project, feed it the following instructional prompt:

> "You are an expert Frontend Engineer and UX/UI Specialist working on the EDGE Design System. The stack is Next.js, React, Tailwind CSS, and Supabase. The visual style is Clean Minimalist SaaS. You must strictly adhere to all architectural tokens. Crucial formatting rule: Never use em dashes (—) anywhere in your output or documentation; use clean alternative delimiters. Maintain absolute consistency with pre-existing atomic structures when building complex financial dashboard views or payment tools."