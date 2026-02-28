# Design System Review & Generation Loop

## Objective

You are a senior design engineer tasked with reviewing every demo in this codebase, then generating a tailored design system for each one. The goal is to replace generic or placeholder styling with a cohesive, purpose-built design system that visually communicates what each demo actually does.

## Critical Exclusion

**Do NOT touch, modify, or generate a design system for the marketing demo called "Adeline AI."** Skip it entirely. If you encounter it during discovery, log that you found it, confirm you are skipping it, and move on.

## Phase 1: Discovery & Audit

Scan the entire codebase to locate all demos. For each demo found:

1. Record its name, file path, and purpose (what it demonstrates)
2. Identify the current styling approach (inline styles, CSS modules, Tailwind, styled-components, etc.)
3. Note any existing color values, font stacks, spacing scales, or component patterns already in use
4. Flag accessibility issues: missing contrast ratios, no focus states, hardcoded pixel font sizes, missing alt text, etc.
5. Flag mobile responsiveness issues: fixed widths, no media queries, overflow problems, tap target sizing, etc.

Output a structured audit summary before proceeding. Format:

```
AUDIT: [Demo Name]
  Path: [file path]
  Purpose: [what it demos]
  Current Styling: [approach]
  Accessibility Issues: [list]
  Mobile Issues: [list]
  Skip: yes/no (yes only for Adeline AI)
```

Do not proceed to Phase 2 until every demo has been audited.

## Phase 2: Design System Generation

For each non-skipped demo, generate a complete design system that matches the demo's domain and personality. Each design system must include ALL of the following:

### 2a. Color Palette

Define colors using CSS custom properties. Every palette must include:

- `--color-primary`: The dominant brand color, chosen to evoke the demo's domain
- `--color-primary-light` and `--color-primary-dark`: Lighter and darker variants for hover states and depth
- `--color-secondary`: A complementary accent color
- `--color-background`: The main background
- `--color-surface`: Card/container backgrounds
- `--color-text-primary`: Main body text
- `--color-text-secondary`: Subdued/supporting text
- `--color-text-on-primary`: Text that sits on top of the primary color
- `--color-success`, `--color-warning`, `--color-error`: Semantic feedback colors
- `--color-border`: Default border color

**Domain matching examples (use these as inspiration, not as rigid rules):**

- Personal trainer / fitness demo: Bold energetic tones. Think deep charcoal, electric green or vibrant orange, clean whites. Evokes sweat and motivation.
- Finance / budgeting demo: Trust and stability. Navy, slate blue, muted gold or green accents. Clean and serious.
- Education / tutoring demo: Warm and approachable. Soft blues, gentle purples, warm yellows. Inviting and calm.
- Healthcare / wellness demo: Calming and clinical. Soft teals, whites, light sage greens. Trustworthy and soothing.
- E-commerce / shopping demo: Energetic and conversion-focused. Bold CTAs, clean neutrals, brand-forward accent color.
- Developer tools demo: Dark mode forward. Deep grays, syntax-highlight inspired accents (cyan, magenta, amber).
- Social / community demo: Vibrant and expressive. Gradients welcome. Purple-to-pink, warm sunset tones, playful energy.
- Real estate demo: Sophisticated and grounded. Warm neutrals, forest green or navy accents, editorial feel.
- Food / restaurant demo: Appetizing and warm. Rich reds, warm ambers, creamy off-whites, earthy tones.
- Legal / compliance demo: Conservative authority. Dark navy, burgundy accents, ivory backgrounds, restrained palette.

**Every color pairing that involves text on a background MUST meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text).** Verify this. If a color fails, adjust it until it passes.

### 2b. Typography

Define a type scale using CSS custom properties:

- `--font-family-heading`: A display or heading font appropriate to the domain
- `--font-family-body`: A readable body font (system font stacks are acceptable and encouraged for performance)
- `--font-size-xs` through `--font-size-4xl`: A modular type scale (use `rem` or `clamp()` units, never fixed `px`)
- `--font-weight-normal`, `--font-weight-medium`, `--font-weight-bold`
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`
- `--letter-spacing-tight`, `--letter-spacing-normal`, `--letter-spacing-wide`

Use `clamp()` for fluid typography where appropriate. Example:
```css
--font-size-xl: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem);
```

### 2c. Spacing & Layout

- `--space-1` through `--space-12`: A consistent spacing scale (4px base recommended)
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`: Border radius tokens
- `--container-max-width`: Max content width (should be appropriate for the demo type)
- `--grid-gap`: Default grid/flex gap

### 2d. Shadows & Elevation

- `--shadow-sm`, `--shadow-md`, `--shadow-lg`: Box shadow tokens for layering
- Shadows should feel appropriate to the domain (e.g., subtle and minimal for healthcare, more dramatic for e-commerce hero sections)

### 2e. Interactive States

Define tokens or utility classes for:

- Hover states (color shifts, subtle scale transforms)
- Focus-visible outlines (minimum 2px, high contrast, never `outline: none` without a replacement)
- Active/pressed states
- Disabled states (reduced opacity, `cursor: not-allowed`)
- Transition timing: `--transition-fast` (150ms), `--transition-normal` (250ms), `--transition-slow` (400ms)

### 2f. Mobile-First Breakpoints

All design systems must use these breakpoints and follow mobile-first methodology:

```css
/* Base styles = mobile (320px and up) */
/* --bp-sm: 640px   - Large phones / small tablets */
/* --bp-md: 768px   - Tablets */
/* --bp-lg: 1024px  - Small desktops */
/* --bp-xl: 1280px  - Large desktops */
```

Additional mobile requirements:

- Minimum tap target size: 44x44px (per WCAG 2.5.5)
- No horizontal scroll at any viewport width
- Font sizes never below 16px on mobile (prevents iOS zoom on input focus)
- Touch-friendly spacing between interactive elements (minimum 8px gap)
- Responsive images with `max-width: 100%` as default behavior

### 2g. Accessibility Baseline

Every design system must enforce:

- All interactive elements have visible focus indicators
- Color is never the sole means of conveying information (pair with icons, text, or patterns)
- Sufficient contrast ratios on all text/background pairings
- Reduced motion media query support: `@media (prefers-reduced-motion: reduce)` disables animations
- Dark mode consideration: at minimum, document how the palette would invert (full implementation optional)
- Semantic color naming (don't rely on `--color-red` for errors; use `--color-error`)

## Phase 3: Implementation

For each demo, create or update a design system file. Preferred output formats in order of priority:

1. **CSS custom properties file** (e.g., `design-tokens.css` or `variables.css`) placed alongside the demo
2. **Tailwind config extension** if the demo uses Tailwind
3. **Theme object** (JS/TS) if the demo uses a CSS-in-JS approach

After creating each design system file:

1. Apply the new tokens to the demo's existing components
2. Run the app or build to confirm nothing is broken
3. Visually inspect that the new design system is actually being applied
4. Check that no hardcoded color values, font sizes, or spacing remain in the demo's component files (everything should reference tokens)

## Phase 4: Validation Checklist

Before marking a demo as complete, verify all of the following:

- [ ] Color palette has all required tokens defined
- [ ] All text/background combos meet WCAG AA contrast (4.5:1 normal, 3:1 large)
- [ ] Typography uses rem/clamp units, no px font sizes
- [ ] Spacing scale is consistent and applied throughout
- [ ] All interactive elements have hover, focus-visible, active, and disabled states
- [ ] Mobile: no horizontal overflow at 320px viewport
- [ ] Mobile: all tap targets are at least 44x44px
- [ ] Mobile: base font size is 16px or above
- [ ] Reduced motion media query is present
- [ ] Focus outlines are visible and high contrast
- [ ] No hardcoded style values remain in component files
- [ ] The demo builds and renders without errors
- [ ] The design system visually matches the demo's domain/purpose

## Completion Protocol

After all demos have been processed:

1. Output a final summary table:

```
| Demo Name | Status | Design Vibe | Tokens File | Issues Remaining |
|-----------|--------|-------------|-------------|-----------------|
| ...       | ...    | ...         | ...         | ...             |
```

2. Confirm that Adeline AI was identified and skipped
3. List any demos where you had to make judgment calls about the aesthetic direction and explain your reasoning
4. If any demo could not be fully completed (e.g., unusual framework, locked files), document what was done and what remains

When every non-excluded demo has a validated design system applied, output:

<promise>COMPLETE</promise>

## Stuck Protocol

If after 5 consecutive iterations you cannot resolve an issue with a specific demo:

1. Document the blocker clearly
2. Move on to the next demo
3. Return to blocked demos after all others are done
4. If still blocked after a second attempt, document the issue in the final summary and mark that demo as "PARTIAL" rather than holding up the entire loop

## Rules

- Never invent or hallucinate file paths. Only reference files you have actually found in the codebase.
- Never apply a design system to Adeline AI. This rule has zero exceptions.
- Prefer conservative, well-tested CSS over experimental features.
- When in doubt about aesthetic direction, lean toward clean and minimal rather than busy and decorative.
- Every decision should serve readability, usability, and the end user's ability to understand the demo's purpose at a glance.
