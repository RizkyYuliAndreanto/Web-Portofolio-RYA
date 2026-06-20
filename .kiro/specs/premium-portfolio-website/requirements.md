errors# Requirements Document

## Introduction

A premium personal portfolio website for a senior software engineer / AI engineer. The site aims to deliver an award-winning visual experience inspired by Vercel, Linear, Stripe, and Apple product showcases. It uses a dark futuristic / cyber modern aesthetic with elegant blue gradients and glassmorphism. The primary goal is to immediately impress recruiters and clients, directing their focus to projects and professional credibility.

The project is built on Vue 3 + Vite with Tailwind CSS for all styling (no custom CSS files), GSAP for animations, Three.js for 3D particle backgrounds, Lenis for smooth scrolling, Splitting.js for text effects, EmailJS for the contact form, and Lucide Icons for iconography.

## Glossary

- **Portfolio_Site**: The Vue 3 single-page application serving as the personal portfolio website
- **Hero_Section**: The full-screen landing area displayed on initial page load
- **Profile_Section**: The section containing personal photo, bio, experience summary, and skills
- **Services_Section**: The section showcasing professional service offerings as interactive cards
- **Projects_Section**: The primary showcase section displaying all portfolio projects in a grid layout
- **Project_Highlight**: A featured projects area with horizontal scroll-based reveal animations
- **Tech_Stack_Section**: The section displaying all known technologies with marquee and hover interactions
- **Experience_Timeline**: The section presenting career history in a vertical timeline format
- **Contact_Section**: The section containing the contact form with EmailJS integration
- **Footer**: The bottom section with social links and copyright information
- **GSAP_Engine**: The GreenSock Animation Platform library responsible for scroll-triggered and entrance animations
- **Three_JS_Scene**: The Three.js WebGL canvas rendering particle fields and 3D background effects
- **Lenis_Scroller**: The Lenis smooth scroll library managing page scroll behavior
- **Splitting_Engine**: The Splitting.js library for character and word-level text animation
- **EmailJS_Service**: The EmailJS third-party service handling contact form submission without a backend
- **Tailwind_System**: The Tailwind CSS utility-first framework used for all styling
- **Project_Modal**: A fullscreen overlay displaying detailed information about a selected project
- **Particle_Field**: An animated Three.js scene of floating particles with mouse interaction
- **Skill_Card**: An interactive card displaying a single skill with hover effects and progress indication
- **Service_Card**: A premium card component representing a professional service offering
- **Bento_Grid**: A masonry-style responsive grid layout for displaying project thumbnails
- **Marquee**: An infinite horizontal scrolling animation for technology icons
- **Visitor**: Any user viewing the portfolio website (recruiter, client, or peer)

## Requirements

### Requirement 1: Project Initialization and Tooling Setup

**User Story:** As a developer, I want the project configured with Tailwind CSS, GSAP, Three.js, Lenis, Splitting.js, EmailJS, and Lucide Icons, so that all required libraries are available for building the portfolio.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use Tailwind CSS utility classes as the sole styling mechanism, with no hand-written CSS rules beyond the required Tailwind directive entry file (containing @tailwind base, components, and utilities)
2. THE Portfolio_Site SHALL include GSAP with ScrollTrigger plugin as an installed dependency
3. THE Portfolio_Site SHALL include Three.js as an installed dependency for WebGL rendering
4. THE Portfolio_Site SHALL include Lenis as an installed dependency for smooth scrolling
5. THE Portfolio_Site SHALL include Splitting.js as an installed dependency for text animation
6. THE Portfolio_Site SHALL include EmailJS browser SDK as an installed dependency for contact form handling
7. THE Portfolio_Site SHALL include Lucide Vue Next as an installed dependency for icon rendering
8. THE Portfolio_Site SHALL configure Tailwind CSS with a custom theme extending the defined color palette (Background #050816, Surface #0F172A, Primary #2563EB, Accent #3B82F6, Highlight #60A5FA, Text #FFFFFF, Secondary Text #94A3B8)
9. WHEN a production build is executed, THE Portfolio_Site SHALL compile without errors and produce a valid output bundle with all dependencies resolved

### Requirement 2: Global Design System and Layout

**User Story:** As a visitor, I want a consistent dark futuristic visual language across all sections, so that the site feels cohesive and premium.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render all pages with background color #050816 and primary text color #FFFFFF
2. THE Portfolio_Site SHALL apply glassmorphism effects on card and panel elements using a backdrop blur of 12px and a background opacity between 10% and 20% with a 1px solid border at 15% white opacity
3. THE Portfolio_Site SHALL use only blue-spectrum colors (#2563EB, #3B82F6, #60A5FA) as accent and highlight colors
4. THE Portfolio_Site SHALL implement responsive layouts supporting viewports from 320px minimum width using Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px) with a mobile-first cascade
5. WHILE the viewport width is 1024px or greater and the pointing device supports hover, THE Portfolio_Site SHALL display a cursor glow effect that tracks pointer position within one animation frame (16ms)
6. THE Lenis_Scroller SHALL provide smooth scroll behavior with a duration between 300ms and 1000ms for all anchor link navigation and programmatic scroll-to-section actions
7. IF the user has enabled a prefers-reduced-motion setting, THEN THE Portfolio_Site SHALL disable the cursor glow effect, smooth scroll animations, and any other motion-based transitions, falling back to instant navigation and static presentation

### Requirement 3: Hero Section

**User Story:** As a visitor, I want an immersive full-screen landing experience with animated 3D background and clear identity information, so that I immediately understand who this engineer is and feel impressed.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full dynamic viewport height (100dvh) on initial load
2. THE Hero_Section SHALL display the engineer's full name as a centered heading with a minimum font size of 48px on mobile and 72px on desktop breakpoints
3. THE Hero_Section SHALL display a job title with a typing animation effect that cycles through at least 2 and at most 5 role titles continuously at a rate of one character every 50–100 milliseconds
4. THE Hero_Section SHALL display a professional description of no more than 150 characters below the title
5. THE Hero_Section SHALL display a primary call-to-action button that scrolls to the Projects_Section and a secondary Download CV button that triggers a file download
6. THE Three_JS_Scene SHALL render an animated Particle_Field containing between 50 and 200 particles using blue-spectrum colors (#2563EB, #3B82F6, #60A5FA) as the Hero_Section background
7. THE Three_JS_Scene SHALL respond to mouse movement by displacing particles within a 150px radius of the cursor position
8. WHEN the page scrolls past the Hero_Section, THE Hero_Section SHALL apply a scale-down parallax effect reducing content scale from 1.0 to no less than 0.85
9. THE GSAP_Engine SHALL animate Hero_Section text elements with staggered reveal delays of 80–120 milliseconds between elements and character split animations on page load
10. THE Splitting_Engine SHALL split Hero_Section heading text into individual characters for per-character animation
11. IF the Visitor is on a touch device without a mouse, THEN THE Three_JS_Scene SHALL animate particles autonomously without requiring pointer interaction

### Requirement 4: Profile Section

**User Story:** As a visitor, I want to see the engineer's photo, biography, and skills with engaging interactions, so that I can assess their experience and expertise at a glance.

#### Acceptance Criteria

1. THE Profile_Section SHALL display a professional photo with a 3D tilt effect that rotates a maximum of 15 degrees toward the cursor on hover and resets to neutral on hover-out, with a continuously animated glowing blue border using the accent color (#3B82F6)
2. THE Profile_Section SHALL display a professional biography text of at least 50 characters
3. WHEN the Profile_Section enters the viewport, THE Profile_Section SHALL animate an experience duration counter from 0 to the target value over a duration of 2 seconds
4. THE Profile_Section SHALL display between 3 and 12 skills as interactive Skill_Cards, each showing a skill name, a skill icon, and an animated progress indicator representing proficiency from 0% to 100%
5. WHEN the Profile_Section enters the viewport, THE GSAP_Engine SHALL trigger text reveal animations line by line using ScrollTrigger with a stagger delay of 0.2 seconds between each line
6. WHEN a Visitor hovers over a Skill_Card, THE Skill_Card SHALL translate up to 10 pixels toward the cursor position creating a magnetic pull effect, and return to its original position on hover-out
7. WHEN the Profile_Section enters the viewport, THE Skill_Card progress indicators SHALL animate from 0% to their target proficiency value over 1.5 seconds

### Requirement 5: Services Section

**User Story:** As a visitor, I want to understand what professional services the engineer offers through visually engaging cards, so that I can determine if their expertise matches my needs.

#### Acceptance Criteria

1. THE Services_Section SHALL display service offerings (Web Development, Backend Development, AI Integration, UI/UX Development, API Development) as individual Service_Cards, where each Service_Card displays a service title, a Lucide icon, and a short description of the service
2. WHEN a Service_Card enters the viewport, THE GSAP_Engine SHALL animate the card with a staggered reveal effect using a delay of 100–200ms between consecutive cards
3. WHEN a Visitor hovers over a Service_Card, THE Service_Card SHALL display a radial gradient spotlight overlay centered on the current mouse position that follows cursor movement within the card boundaries
4. WHEN a Visitor hovers over a Service_Card, THE Service_Card SHALL apply a rotation of no more than 5 degrees toward the cursor, a blue (#3B82F6) shadow glow, an icon scale animation, and a vertical lift of 4–8px using Tailwind transform utilities
5. WHEN a Visitor moves the cursor away from a Service_Card, THE Service_Card SHALL transition back to its default state (no rotation, no glow, no lift, no spotlight) within 300ms

### Requirement 6: Projects Section

**User Story:** As a visitor, I want to browse all portfolio projects in a visually rich grid with detailed modal views, so that I can deeply evaluate the engineer's work and technical breadth.

#### Acceptance Criteria

1. THE Projects_Section SHALL display projects in a Bento_Grid layout with thumbnails of at least 280px width on desktop viewports
2. THE Projects_Section SHALL display for each project: name, description, technology stack badges, GitHub link, and live demo link
3. IF a project does not have a GitHub link or live demo link, THEN THE Projects_Section SHALL hide the corresponding link element for that project rather than displaying a broken or empty link
4. WHEN the Projects_Section enters the viewport, THE GSAP_Engine SHALL animate project cards with staggered fade and slide-up reveals
5. WHEN a Visitor hovers over a project card, THE project card SHALL apply image zoom, 3D rotation, glow effect, and animated border
6. WHEN a Visitor clicks on a project card, THE Portfolio_Site SHALL open the Project_Modal with an animated entrance transition
7. THE Project_Modal SHALL display project screenshots, description, technology stack, architecture overview, challenges faced, and solutions implemented
8. WHEN a Visitor clicks the modal close button, clicks outside the modal content area, or presses the Escape key, THE Project_Modal SHALL dismiss with an animated close transition
9. THE Projects_Section SHALL display an animated project timeline and floating technology badges

### Requirement 7: Project Highlight Showcase

**User Story:** As a visitor, I want a premium horizontal scrolling showcase of featured projects with cinematic reveal animations, so that key projects receive maximum visual impact.

#### Acceptance Criteria

1. THE Project_Highlight SHALL display between 3 and 6 featured projects in a horizontal scrolling layout, where each project displays a full-width image, project title, and a single-line category label
2. THE GSAP_Engine SHALL drive the horizontal scroll using ScrollTrigger pinning tied to vertical scroll progress, where the pinned section remains fixed until the Visitor has scrolled a vertical distance equal to the total horizontal width of all project panels
3. WHEN a featured project scrolls into the center 50% of the viewport horizontally, THE GSAP_Engine SHALL apply a clip-path image reveal expanding from center, a scale animation from 0.95 to 1.0, and a staggered fade-in of text elements offset by 0.2 seconds
4. THE Project_Highlight SHALL present each project panel at a minimum width of 80vw on desktop and 100vw on mobile, with text overlay limited to project title and category label positioned at the bottom of the panel
5. IF the Visitor has prefers-reduced-motion enabled, THEN THE Project_Highlight SHALL display all project panels in their final revealed state without clip-path, scale, or fade animations

### Requirement 8: Tech Stack Section

**User Story:** As a visitor, I want to see all technologies the engineer uses displayed with engaging motion, so that I can quickly assess their technical breadth.

#### Acceptance Criteria

1. THE Tech_Stack_Section SHALL display technology icons in at least one row of infinite horizontal Marquee animation moving from right to left at a consistent speed between 30 and 60 pixels per second
2. THE Tech_Stack_Section SHALL apply a continuous vertical oscillation of no more than 8 pixels in amplitude to each technology icon within the Marquee
3. WHEN a Visitor hovers over a technology icon, THE Tech_Stack_Section SHALL pause the Marquee animation, scale the hovered icon up to between 1.2x and 1.5x its original size, and display the technology name as a visible label adjacent to the icon
4. WHEN a Visitor moves the cursor away from a technology icon, THE Tech_Stack_Section SHALL resume the Marquee animation and return the icon to its original scale within 300 milliseconds
5. IF the Visitor is on a touch device where hover is unavailable, THEN THE Tech_Stack_Section SHALL display technology names below each icon by default without requiring hover interaction

### Requirement 9: Experience Timeline

**User Story:** As a visitor, I want to view the engineer's career history in a visually progressive timeline, so that I can understand their professional growth.

#### Acceptance Criteria

1. THE Experience_Timeline SHALL display career entries in a vertical timeline layout with a connecting line, where each entry displays the job title, company name, employment period, and a brief description of responsibilities
2. WHEN the Experience_Timeline enters the viewport, THE GSAP_Engine SHALL animate the connecting line with a draw-on effect synchronized to scroll position
3. WHEN a timeline entry enters the viewport, THE GSAP_Engine SHALL reveal the entry with a fade-in and horizontal slide animation from the side of the timeline
4. WHILE a timeline entry is within the center 50% of the viewport, THE Experience_Timeline SHALL highlight that entry by visually differentiating its border or background from inactive entries
5. THE Experience_Timeline SHALL display career entries in reverse chronological order with the most recent position at the top

### Requirement 10: Contact Section

**User Story:** As a visitor, I want to send a message to the engineer through a premium-styled form, so that I can initiate professional communication without leaving the site.

#### Acceptance Criteria

1. THE Contact_Section SHALL display a form with fields: Name (maximum 100 characters), Email (maximum 254 characters), Subject (maximum 200 characters), and Message (maximum 2000 characters)
2. THE Contact_Section SHALL use floating label animations on form field focus, where the label translates above the input field when the field receives focus or contains text
3. THE Contact_Section SHALL apply a visible box-shadow glow in blue on focused form fields
4. THE Contact_Section SHALL validate that Name, Email, Subject, and Message fields are non-empty, that Email matches a valid email format (containing "@" and a domain with at least one dot), and that no field exceeds its maximum character length before submission
5. IF the Visitor submits the form with one or more invalid fields, THEN THE Contact_Section SHALL display an inline error indicator adjacent to each invalid field and SHALL NOT submit the form to the EmailJS_Service
6. WHEN a Visitor submits the form with all fields valid, THE EmailJS_Service SHALL send the message to the engineer's configured email address within 30 seconds
7. WHEN the form submission succeeds, THE Contact_Section SHALL display a visible success animation and SHALL clear all form fields to their empty default state
8. IF the form submission fails, THEN THE Contact_Section SHALL display an error message indicating the message was not sent and SHALL preserve all entered form data so the Visitor can retry without re-entering information

### Requirement 11: Footer

**User Story:** As a visitor, I want quick access to the engineer's social profiles and contact information, so that I can connect through my preferred platform.

#### Acceptance Criteria

1. THE Footer SHALL display links to GitHub, LinkedIn, Instagram, and Email, where each link opens the corresponding external profile in a new tab and the Email link opens the user's default mail client
2. THE Footer SHALL render social links as Lucide Icons, each with an accessible label indicating the platform name, and apply a glow effect on hover with a transition duration of 300 milliseconds
3. THE Footer SHALL display copyright information in secondary text color (#94A3B8), including the current year and the engineer's name
4. WHEN a social link receives keyboard focus, THE Footer SHALL display the same glow effect as the hover state

### Requirement 12: Global Animation System

**User Story:** As a visitor, I want smooth purposeful animations throughout the site that enhance comprehension and delight, so that the browsing experience feels premium and intentional.

#### Acceptance Criteria

1. WHEN a section becomes at least 20% visible within the viewport, THE GSAP_Engine SHALL apply a ScrollTrigger-based entrance animation to that section with a duration between 0.6 and 1.0 seconds
2. WHEN a group of similar elements (cards, list items, badges) enters the viewport, THE GSAP_Engine SHALL apply stagger timing with a delay of 0.08 to 0.15 seconds between each element in the group
3. WHILE the cursor is within 50px of a primary interactive element on desktop viewports (width >= 1024px), THE Portfolio_Site SHALL displace the element toward the cursor position by a maximum of 8px
4. WHILE the viewport width is >= 1024px, THE Portfolio_Site SHALL display a cursor-following glow element of 20 to 40px diameter that tracks mouse position with a trailing delay no greater than 50ms
5. THE Splitting_Engine SHALL split section headings into individual characters or words and apply a sequential entrance animation with a stagger delay of 0.03 to 0.05 seconds per unit
6. WHILE a section is scrolling out of the viewport, THE GSAP_Engine SHALL apply a fade-out animation reducing opacity to 0 or a parallax shift of 20 to 50px in the scroll direction, with a duration between 0.4 and 0.8 seconds
7. IF the user has enabled a prefers-reduced-motion accessibility setting, THEN THE Portfolio_Site SHALL disable all scroll-triggered animations, magnetic effects, cursor glow, and text-splitting animations, and display all content in its final state without motion

### Requirement 13: Performance and Accessibility

**User Story:** As a visitor, I want the site to load quickly and be accessible, so that I can use it regardless of device capability or assistive technology needs.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL lazy-load all images using native loading="lazy" or Intersection Observer
2. WHEN the Hero_Section is within 200px of the viewport edge, THE Portfolio_Site SHALL initialize and render the Three_JS_Scene
3. THE Portfolio_Site SHALL achieve a Lighthouse Performance score of at least 90 on desktop
4. THE Portfolio_Site SHALL use semantic HTML elements (header, main, section, footer, nav) for document structure
5. THE Portfolio_Site SHALL provide accessible labels (using aria-label, aria-labelledby, or an associated visible label element) for all interactive elements and form fields
6. WHILE the Visitor has prefers-reduced-motion enabled, THE Portfolio_Site SHALL disable all decorative animations including scroll-triggered entrances, parallax effects, marquee motion, particle animation, magnetic effects, and cursor glow, while preserving navigation transitions and form feedback
7. IF the Three_JS_Scene fails to initialize, THEN THE Portfolio_Site SHALL display a CSS gradient fallback background within 3 seconds of page load start without blocking rendering of other page content
8. THE Portfolio_Site SHALL be fully operable via keyboard alone, with a visible focus indicator on all interactive elements that meets a minimum contrast ratio of 3:1 against adjacent colors
