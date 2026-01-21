# Blog Post Template Prompt

Use this prompt template to generate consistent blog posts for ForopoulosNow.com.

---

## PROMPT TEMPLATE

```
Create a new blog post for ForopoulosNow.com following the established template structure.

### POST DETAILS
- **Title:** [Your post title]
- **Topic:** [Brief description of the topic]
- **Category:** [Business | Technology | Fitness | Habits]
- **Estimated Read Time:** [X min read]
- **Publish Date:** [Date]

### CONTENT REQUIREMENTS
- **Hook/Opening:** [Engaging opening that captures attention]
- **Key Points to Cover:**
  1. [Point 1]
  2. [Point 2]
  3. [Point 3]
  [Add more as needed]

- **Call-to-Action/Link Requirements:**
  - [List any internal pages, ventures, or products to link]
  - [List any affiliate links needed]

- **Images:** Include 4-6 interlaced images throughout the article using Unsplash URLs

### TEMPLATE REQUIREMENTS
Follow these exact specifications:

**File Structure:**
- Save to: /blog/posts/[slug].html
- Use kebab-case for filename (e.g., my-post-title.html)

**Meta Tags Required (EXACT FORMAT - no HTML comments, exact order):**
```html
  <meta property="og:type" content="article">
  <meta property="og:title" content="[Title]">
  <meta property="og:description" content="[Short description - engaging, under 200 chars]">
  <meta property="og:url" content="https://foropoulosnow.com/blog/posts/[slug].html">
  <meta property="og:image" content="[Unsplash URL]?w=1200&h=630&fit=crop">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="article:author" content="Lee Foropoulos">
  <meta property="article:published_time" content="[YYYY-MM-DD]">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@thesecretchief">
  <meta name="twitter:creator" content="@thesecretchief">
  <meta name="twitter:title" content="[Title]">
  <meta name="twitter:description" content="[Short description - same as og:description]">
  <meta name="twitter:image" content="[Same Unsplash URL]?w=1200&h=630&fit=crop">
  <meta name="twitter:image:alt" content="[Title]">
  <meta name="share:hook" content="[Engaging hook for social shares - see examples below]">
  <meta name="facebook-domain-verification" content="vx40czm6ccxtpl4crzqbiso70hmjoi" />
```

**CRITICAL for social previews:**
- NO HTML comments in the meta section (no `<!-- Open Graph -->` etc.)
- og:image and twitter:image MUST use ?w=1200&h=630&fit=crop for proper social card dimensions
- og:image:width and og:image:height help social platforms render correctly
- twitter:site and twitter:creator are required for proper Twitter card attribution
- share:hook is for copy/paste when sharing - make it engaging and curiosity-driven

**Color Scheme:**
- Navy: 900:#0f172a, 800:#1e293b, 700:#334155, 600:#475569
- Gold: 700:#b45309, 600:#d97706, 500:#f59e0b, 400:#fbbf24

**Hero Section:**
- Full-width hero image with gradient overlay
- Gradient colors should match post theme (examples: green for fitness, red for tech/warning, amber for nutrition)
- Category badges with appropriate colors
- Author section with headshot and credentials

**Content Styling:**
- Use .prose class wrapper
- H2 headers: navy-900 dark:text-white, 1.75rem
- H3 headers: navy-900 dark:text-white, 1.25rem
- Blockquotes: gold border-left, amber background tint
- Links: gold-500 with hover underline

**Image Pattern:**
```html
<figure class="my-10">
  <img src="[unsplash-url]?w=800&h=450&fit=crop" alt="[descriptive alt text]" class="content-image w-full">
  <figcaption class="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">[Caption]</figcaption>
</figure>
```

**CTA Box Pattern:**
```html
<div class="bg-[color]-50 dark:bg-[color]-500/10 rounded-xl p-6 my-8 border border-[color]-200 dark:border-[color]-500/30">
  <p class="font-semibold text-navy-900 dark:text-white mb-2">[CTA Headline]</p>
  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">[CTA Description]</p>
  <a href="[link]" class="inline-block bg-[color]-500 hover:bg-[color]-600 text-white font-semibold px-6 py-2 rounded-full transition">[Button Text] &rarr;</a>
</div>
```

**Required Sections:**
1. Navigation (fixed, dark mode toggle)
2. Hero image with gradient overlay
3. Article header with category badges, date, read time
4. Description paragraph
5. Quick Share Buttons (smaller buttons under description - see pattern below)
6. Author info with headshot
7. Article content with interlaced images
8. Share buttons (X, LinkedIn, Facebook, Copy Link)
9. Author bio box
10. Related posts section (2 posts)
11. Back to top button
12. Footer

**Quick Share Buttons Pattern (under description):**
```html
<!-- Quick Share Buttons -->
<div class="flex items-center gap-2 mt-6">
  <span class="text-gray-400 text-sm mr-1">Share:</span>
  <button onclick="shareOnTwitter()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition" aria-label="Share on X">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  </button>
  <button onclick="shareOnLinkedIn()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition" aria-label="Share on LinkedIn">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  </button>
  <button onclick="shareOnFacebook()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition" aria-label="Share on Facebook">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  </button>
  <button onclick="copyLink()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition" aria-label="Copy Link">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  </button>
</div>
```

**JavaScript Required:**
- Dark mode toggle with cookie persistence
- Back to top button visibility on scroll
- Share functionality with getShareData(), shareOnTwitter(), shareOnLinkedIn(), shareOnFacebook(), copyLink()
- Copy toast notification

**Also Update:**
- /_src/_data/posts.json - Add new post entry with ALL required fields (see below)
- /blog/index.html - Add new post card to the grid (or run `node build.js` to auto-generate)

**posts.json Entry (REQUIRED for build system):**
```json
{
  "slug": "[slug]",
  "title": "[Full Post Title]",
  "description": "[Short description for SEO and social]",
  "category": "[business|tech|fitness|habits]",
  "categoryLabel": "[Business|Technology|Fitness|Habits|Book Review]",
  "date": "[YYYY-MM-DD]",
  "dateFormatted": "[Mon DD, YYYY]",
  "readTime": "[X min read]",
  "image": "[Unsplash URL]?w=400&h=250&fit=crop",
  "imageAlt": "[Descriptive alt text]",
  "featured": false,
  "excerpt": "[1-2 sentence excerpt for blog index cards]",
  "shareHook": "[Engaging hook for social shares - CRITICAL for engagement]"
}
```
```

---

## CATEGORY BADGE COLORS

| Category | Light Mode | Dark Mode |
|----------|------------|-----------|
| Business | bg-gold-100 text-gold-700 | bg-gold-500/20 text-gold-400 |
| Technology | bg-blue-100 text-blue-700 | bg-blue-500/20 text-blue-400 |
| Fitness | bg-amber-100 text-amber-700 or bg-green-100 text-green-700 | bg-amber-500/20 text-amber-400 or bg-green-500/20 text-green-400 |
| Habits | bg-green-100 text-green-700 | bg-green-500/20 text-green-400 |
| Book Review | bg-purple-100 text-purple-700 | bg-purple-500/20 text-purple-400 |

---

## HERO GRADIENT THEMES

| Post Type | Gradient Classes |
|-----------|------------------|
| Business/Default | from-navy-900 to-navy-800 |
| Technology/AI | from-red-900 via-red-800 to-navy-900 |
| Fitness | from-green-900 via-green-800 to-navy-900 |
| Nutrition | from-amber-600 via-amber-500 to-orange-500 |
| Habits | from-green-900 via-teal-800 to-navy-900 |

---

## INTERNAL LINKS TO USE

| Venture/Page | Link Path | When to Use |
|--------------|-----------|-------------|
| gotHABITS | ../../ventures/gothabits.html | Fitness, nutrition, coaching content |
| BMR Calculator | ../../ventures/gothabits.html#calculator | Weight loss, nutrition content |
| Greek-Fire Services | ../../ventures/greek-fire-services.html | Business, consulting content |
| Lookatmedia | ../../ventures/lookatmedia.html | PR, media, AI verification content |
| Shift Spotter | ../../ventures/shift-spotter-invest.html | Workforce, analytics content |
| 1st Phorm Products | https://1stphorm.com/products/[product]/?a_aid=gotHABITS | Supplement recommendations |

---

## SOCIAL SHARE HOOK EXAMPLES

Good hooks create curiosity and promise value:

- "I used to spend 3+ hours on email daily. Now it's 45 minutes. Here are 5 AI automation strategies that saved my business 20+ hours per week:"
- "AI-generated content is everywhere. Here's how to spot the fakes before they fool you (and the best tools for each type of content):"
- "Most people calculate their calories wrong. Here's the science behind BMR, why your protein timing might be wasted, and how to actually optimize for fat loss or muscle gain:"
- "The supplement industry wants you confused. Here's the evidence-based stack that actually works (and what's just marketing):"

---

## CHECKLIST BEFORE PUBLISHING

- [ ] File saved to /blog/posts/[slug].html
- [ ] All meta tags populated (og:*, twitter:*, share:hook)
- [ ] og:image and twitter:image use ?w=1200&h=630&fit=crop
- [ ] og:image:width and og:image:height tags included
- [ ] twitter:site and twitter:creator set to @thesecretchief
- [ ] Hero image from Unsplash with proper dimensions
- [ ] 4-6 interlaced images throughout content
- [ ] Quick share buttons added under description in header
- [ ] All internal links working (../../ paths)
- [ ] Dark mode styling tested
- [ ] Share buttons functional
- [ ] Author bio section included
- [ ] Related posts section with 2 relevant posts
- [ ] posts.json updated with new entry (including shareHook!)
- [ ] Run `node build.js` to update blog index
- [ ] Category filter data-category attribute matches
- [ ] NO em-dashes (—) in the text - replace with commas or rewrite

## AFTER PUBLISHING - TEST SOCIAL PREVIEWS

Social platforms cache link previews. After publishing, validate and clear cache:

1. **Twitter/X Card Validator**: https://cards-dev.twitter.com/validator
   - Paste URL, click "Preview Card"
   - This refreshes Twitter's cache

2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Paste URL, click "Debug"
   - Click "Scrape Again" to refresh cache

3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
   - Paste URL, click "Inspect"
   - Click "Refetch" to refresh cache

**If image doesn't show:**
- Verify og:image URL is accessible (paste in browser)
- Check image dimensions (must be at least 1200x630)
- Ensure image URL uses HTTPS
- Clear platform cache using tools above

**IMPORTANT - Unsplash Image Hosting Issue:**
Unsplash blocks social media crawlers (returns 403 Forbidden). This causes LinkedIn/Facebook/Twitter to fall back to other images on the page (like the author headshot).

**Recommended solutions:**
1. **Host images locally** - Download from Unsplash, save to `/blog/images/[slug]-hero.jpg`, use path `https://foropoulosnow.com/blog/images/[slug]-hero.jpg`
2. **Use Cloudinary** - Free tier, bot-friendly: `https://res.cloudinary.com/[cloud-name]/image/fetch/w_1200,h_630,c_fill/[unsplash-url]`
3. **Use source.unsplash.com** - Sometimes works better: `https://source.unsplash.com/[photo-id]/1200x630`

For critical posts, always host hero images locally to guarantee social sharing works.

---

## EXAMPLE BLOG INDEX CARD

```html
<!-- Post: [Post Title] -->
<article class="card-hover bg-white dark:bg-navy-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10" data-category="[category]">
  <div class="h-48 relative overflow-hidden">
    <img src="[unsplash-url]?w=400&h=250&fit=crop" alt="[alt text]" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
  </div>
  <div class="p-6">
    <div class="flex items-center gap-3 mb-3">
      <span class="bg-[color]-100 dark:bg-[color]-500/20 text-[color]-700 dark:text-[color]-400 text-xs font-semibold px-3 py-1 rounded-full">[Category]</span>
      <span class="text-gray-500 dark:text-gray-400 text-sm">[Date]</span>
    </div>
    <h3 class="text-xl font-bold text-navy-900 dark:text-white mb-2">
      <a href="posts/[slug].html" class="hover:text-gold-600 dark:hover:text-gold-400 transition">[Post Title]</a>
    </h3>
    <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
      [Short description - 1-2 sentences]
    </p>
    <a href="posts/[slug].html" class="text-gold-600 dark:text-gold-400 font-semibold text-sm hover:underline">Read more &rarr;</a>
  </div>
</article>
```

---

## NOTES

- Always use Unsplash for images with appropriate ?w=X&h=Y&fit=crop parameters
- Author headshot: ../../headshot.png with fallback onerror handler
- Copyright year in footer: 2026
- Copyright holder: Greek-Fire Corporation (NOT personal name)
- Footer copyright format: `&copy; 2026 Greek-Fire Corporation`
- Domain for og:url: https://foropoulosnow.com
- Twitter handle: @thesecretchief
- Lee's role: Business Development Lead at Lookatmedia | Fractional Executive | Tourism Ambassador for Visit Mobile

## WRITING STYLE - AVOIDING AI TELLS

**IMPORTANT:** Avoid these AI writing patterns that make text look auto-generated:

1. **NO em-dashes (—)**: Replace with commas, periods, or rewrite the sentence. Em-dashes are a dead giveaway of AI-generated text.
2. **Avoid overused phrases**: "It's important to note", "In today's fast-paced world", "Let's dive in", "game-changer", "cutting-edge"
3. **Vary sentence structure**: Don't make every sentence the same length or follow the same pattern
4. **Add personality**: Include opinions, experiences, and specific details
5. **Use contractions naturally**: "don't" instead of "do not" where appropriate
6. **Avoid perfect parallel structure**: Real writing has natural variation
