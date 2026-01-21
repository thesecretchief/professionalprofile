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

**Meta Tags Required:**
- og:type, og:title, og:description, og:url
- article:author (Lee Foropoulos)
- article:published_time
- twitter:card, twitter:site (@thesecretchief), twitter:title, twitter:description
- share:hook (engaging copy for social shares - must be compelling and include a hook)

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
4. Author info with headshot
5. Article content with interlaced images
6. Share buttons (X, LinkedIn, Facebook, Copy Link)
7. Author bio box
8. Related posts section (2 posts)
9. Back to top button
10. Footer

**JavaScript Required:**
- Dark mode toggle with cookie persistence
- Back to top button visibility on scroll
- Share functionality with getShareData(), shareOnTwitter(), shareOnLinkedIn(), shareOnFacebook(), copyLink()
- Copy toast notification

**Also Update:**
- /blog/index.html - Add new post card to the grid
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
- [ ] Hero image from Unsplash with proper dimensions
- [ ] 4-6 interlaced images throughout content
- [ ] All internal links working (../../ paths)
- [ ] Dark mode styling tested
- [ ] Share buttons functional
- [ ] Author bio section included
- [ ] Related posts section with 2 relevant posts
- [ ] Blog index.html updated with new post card
- [ ] Category filter data-category attribute matches

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
- Domain for og:url: https://foropoulosnow.com
- Twitter handle: @thesecretchief
