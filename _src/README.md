# Site Source Files

This directory contains the modular source files used by the build system.

## Directory Structure

```
_src/
  _data/         - JSON data files
    site.json    - Global site configuration (name, URLs, social links, etc.)
    posts.json   - Blog post metadata (title, date, category, excerpt, etc.)

  _includes/     - Reusable HTML partials
    head.html    - Meta tags, Tailwind config, fonts
    nav.html     - Navigation (desktop + mobile)
    footer.html  - Footer with social links
    styles.html  - Shared CSS animations and utilities
    scripts.html - Shared JavaScript (cookie consent, dark mode, etc.)
    cookie-consent.html - GDPR cookie consent banner and modal
```

## Build Script

Run `node build.js` from the project root to:

1. Inject cookie consent banner into all HTML pages
2. Inject shared scripts into all HTML pages
3. Update the blog index with dynamic content from `posts.json`

## Adding New Blog Posts

1. Create the HTML file in `/blog/posts/[slug].html`
2. Add the post metadata to `_src/_data/posts.json`
3. Run `node build.js` to update the blog index

## Modifying Shared Components

Edit the relevant file in `_src/_includes/`, then run `node build.js` to propagate changes to all pages.

## Data Files

### site.json
Contains global site configuration including:
- Site name, title, description
- Domain and URL
- Social media links
- Booking links (Cal.com)
- Analytics IDs
- Venture listings

### posts.json
Array of blog post objects with:
- slug: URL-friendly identifier
- title: Full post title
- description: Meta description
- category: Filter category (business, tech, fitness, habits)
- categoryLabel: Display label for category badge
- date/dateFormatted: Publication date
- readTime: Estimated reading time
- image/imageAlt: Hero image URL and alt text
- featured: Boolean for featured post
- excerpt: Short preview text
- shareHook: Social share copy
