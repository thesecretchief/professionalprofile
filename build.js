#!/usr/bin/env node
/**
 * Build Script for Lee Foropoulos Professional Profile
 *
 * This script assembles HTML pages from modular components.
 * Run with: node build.js
 *
 * Structure:
 * _src/
 *   _data/       - JSON data files (site.json, posts.json)
 *   _includes/   - Reusable HTML partials (head, nav, footer, etc.)
 *
 * Output: Updates existing HTML files with latest includes
 */

const fs = require('fs');
const path = require('path');

// ===== CONFIGURATION =====
const SRC_DIR = path.join(__dirname, '_src');
const DATA_DIR = path.join(SRC_DIR, '_data');
const INCLUDES_DIR = path.join(SRC_DIR, '_includes');

// ===== LOAD DATA =====
function loadData() {
  const site = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'site.json'), 'utf8'));
  const posts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'posts.json'), 'utf8'));

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { site, posts };
}

// ===== LOAD INCLUDES =====
function loadIncludes() {
  const includes = {};
  const files = fs.readdirSync(INCLUDES_DIR);

  for (const file of files) {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      includes[name] = fs.readFileSync(path.join(INCLUDES_DIR, file), 'utf8');
    }
  }

  return includes;
}

// ===== SIMPLE TEMPLATE ENGINE =====
function processTemplate(template, context) {
  let result = template;

  // Process conditionals: {{#if var}}...{{/if}}
  result = result.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, varName, content) => {
    const value = getNestedValue(context, varName);
    return value ? content : '';
  });

  // Process simple variables: {{var}} and {{nested.var}}
  result = result.replace(/\{\{([a-zA-Z0-9_.]+)\}\}/g, (match, varPath) => {
    const value = getNestedValue(context, varPath);
    return value !== undefined ? value : match;
  });

  return result;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// ===== GENERATE BLOG INDEX HTML =====
function generateBlogIndex(data, includes) {
  const { site, posts } = data;
  const featuredPost = posts.find(p => p.featured) || posts[0];

  // Category color mapping
  const categoryColors = {
    business: { bg: 'gold', textLight: 'gold-100', textDark: 'gold-500/20', text: 'gold-700', textDarkMode: 'gold-400' },
    tech: { bg: 'blue', textLight: 'blue-100', textDark: 'blue-500/20', text: 'blue-700', textDarkMode: 'blue-400' },
    fitness: { bg: 'green', textLight: 'green-100', textDark: 'green-500/20', text: 'green-700', textDarkMode: 'green-400' },
    habits: { bg: 'green', textLight: 'green-100', textDark: 'green-500/20', text: 'green-700', textDarkMode: 'green-400' }
  };

  // Generate post cards HTML
  const postCardsHtml = posts
    .filter(p => !p.featured)
    .map(post => {
      const colors = categoryColors[post.category] || categoryColors.business;
      const isBookReview = post.categoryLabel === 'Book Review';
      const displayBg = isBookReview ? 'purple' : colors.bg;
      const displayTextLight = isBookReview ? 'purple-100' : colors.textLight;
      const displayTextDark = isBookReview ? 'purple-500/20' : colors.textDark;
      const displayText = isBookReview ? 'purple-700' : colors.text;
      const displayTextDarkMode = isBookReview ? 'purple-400' : colors.textDarkMode;

      return `
        <!-- Post: ${post.title} -->
        <article class="card-hover bg-white dark:bg-navy-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10" data-category="${post.category}">
          <div class="h-48 relative overflow-hidden">
            <img src="${post.image}" alt="${post.imageAlt}" class="w-full h-full object-cover" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="bg-${displayTextLight} dark:bg-${displayTextDark} text-${displayText} dark:text-${displayTextDarkMode} text-xs font-semibold px-3 py-1 rounded-full">${post.categoryLabel}</span>
              <span class="text-gray-500 dark:text-gray-400 text-sm">${post.dateFormatted}</span>
            </div>
            <h3 class="text-xl font-bold text-navy-900 dark:text-white mb-2">
              <a href="posts/${post.slug}" class="hover:text-gold-600 dark:hover:text-gold-400 transition">${post.title}</a>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
              ${post.excerpt}
            </p>
            <a href="posts/${post.slug}" class="text-gold-600 dark:text-gold-400 font-semibold text-sm hover:underline">Read more &rarr;</a>
          </div>
        </article>`;
    }).join('\n');

  // Featured post HTML
  const featuredColors = categoryColors[featuredPost.category] || categoryColors.business;
  const featuredHtml = `
      <!-- Featured Post -->
      <div class="mb-16">
        <h2 class="text-sm font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-wide mb-6">Featured</h2>
        <article class="card-hover bg-white dark:bg-navy-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10" data-category="${featuredPost.category}">
          <div class="md:flex">
            <div class="md:w-2/5 relative overflow-hidden">
              <img src="${featuredPost.image.replace('w=600', 'w=800')}" alt="${featuredPost.imageAlt}" class="w-full h-full object-cover min-h-[250px]">
              <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
              <span class="absolute bottom-4 left-4 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">FEATURED</span>
            </div>
            <div class="md:w-3/5 p-8">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-${featuredColors.textLight} dark:bg-${featuredColors.textDark} text-${featuredColors.text} dark:text-${featuredColors.textDarkMode} text-xs font-semibold px-3 py-1 rounded-full">${featuredPost.categoryLabel}</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">${featuredPost.dateFormatted}</span>
              </div>
              <h3 class="text-2xl font-bold text-navy-900 dark:text-white mb-3">
                <a href="posts/${featuredPost.slug}" class="hover:text-gold-600 dark:hover:text-gold-400 transition">${featuredPost.title}</a>
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                ${featuredPost.excerpt}
              </p>
              <a href="posts/${featuredPost.slug}" class="inline-flex items-center text-gold-600 dark:text-gold-400 font-semibold hover:gap-3 gap-2 transition-all">
                Read Article <span>&rarr;</span>
              </a>
            </div>
          </div>
        </article>
      </div>`;

  return { featuredHtml, postCardsHtml };
}

// ===== UPDATE EXISTING HTML FILES =====
function updateHtmlFile(filePath, data, includes, pageConfig) {
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping (not found): ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const { site } = data;

  // Build context for template processing
  const context = {
    site,
    basePath: pageConfig.basePath || '',
    title: pageConfig.title || site.title,
    description: pageConfig.description || site.description,
    canonicalPath: pageConfig.canonicalPath || '/',
    ogType: pageConfig.ogType || 'website',
    ogTitle: pageConfig.ogTitle || pageConfig.title || site.title,
    ogDescription: pageConfig.ogDescription || pageConfig.description || site.description,
    ogImage: pageConfig.ogImage || `${site.url}/headshot.png`,
    isBlog: pageConfig.isBlog || false,
    articleAuthor: pageConfig.articleAuthor,
    articleDate: pageConfig.articleDate,
    shareHook: pageConfig.shareHook
  };

  // Process includes with context
  const processedStyles = processTemplate(includes.styles || '', context);
  const processedNav = processTemplate(includes.nav || '', context);
  const processedFooter = processTemplate(includes.footer || '', context);
  const processedFooterLinks = processTemplate(includes['footer-links'] || '', context);
  const processedScripts = processTemplate(includes.scripts || '', context);
  const processedCookieConsent = processTemplate(includes['cookie-consent'] || '', context);

  // Insert/update navigation using marker system
  const navMarker = '<!-- SITE_NAV -->';
  const navEndMarker = '<!-- /SITE_NAV -->';
  if (content.includes(navMarker)) {
    // Replace content between markers
    const navRegex = /<!-- SITE_NAV -->[\s\S]*?<!-- \/SITE_NAV -->/;
    content = content.replace(navRegex, `${navMarker}\n${processedNav}\n${navEndMarker}`);
  }

  // Insert footer legal links before </footer> if not already present
  if (content.includes('</footer>') && !content.includes('id="cookie-settings-btn"')) {
    // Find the last </div> before </footer> and insert after it
    const footerMatch = content.match(/([ \t]*)<\/footer>/);
    if (footerMatch) {
      const indent = footerMatch[1] || '  ';
      content = content.replace(
        /(<\/div>\s*)(<\/footer>)/,
        `$1\n${indent}  ${processedFooterLinks.trim()}\n${indent}$2`
      );
    }
  }

  // Insert/update cookie consent banner
  const cookieMarker = '<!-- COOKIE_CONSENT -->';
  const cookieEndMarker = '<!-- /COOKIE_CONSENT -->';
  if (content.includes(cookieMarker)) {
    // Replace content between markers
    const cookieRegex = /<!-- COOKIE_CONSENT -->[\s\S]*?<!-- \/COOKIE_CONSENT -->/;
    content = content.replace(cookieRegex, processedCookieConsent.trim());
  } else if (!content.includes('id="cookie-consent"')) {
    // Insert new cookie consent before </body>
    content = content.replace('</body>', `${processedCookieConsent}\n</body>`);
  }

  // Insert/update shared scripts before </body>
  // Look for existing shared scripts marker or insert before cookie consent
  const scriptsMarker = '<!-- SHARED_SCRIPTS -->';
  if (content.includes(scriptsMarker)) {
    const scriptsRegex = /<!-- SHARED_SCRIPTS -->[\s\S]*?<!-- \/SHARED_SCRIPTS -->/;
    content = content.replace(scriptsRegex, `${scriptsMarker}\n${processedScripts}\n<!-- /SHARED_SCRIPTS -->`);
  } else {
    // Insert before </body> but after any existing scripts
    const insertPoint = content.lastIndexOf('</body>');
    if (insertPoint !== -1) {
      const beforeBody = content.substring(0, insertPoint);
      const afterBody = content.substring(insertPoint);
      content = beforeBody + `\n${scriptsMarker}\n${processedScripts}\n<!-- /SHARED_SCRIPTS -->\n` + afterBody;
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`  Updated: ${filePath}`);
}

// ===== INJECT COMPONENTS INTO ALL PAGES =====
function injectComponents(data, includes) {
  const { site, posts } = data;

  // Process context for includes
  const processInclude = (include, context) => processTemplate(include, context);

  // Get all HTML files recursively
  function getHtmlFiles(dir, baseDir = dir) {
    let files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('_') && !item.startsWith('.')) {
        files = files.concat(getHtmlFiles(fullPath, baseDir));
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const htmlFiles = getHtmlFiles(__dirname).filter(f => !f.includes('_src'));

  console.log(`\nProcessing ${htmlFiles.length} HTML files...`);

  for (const filePath of htmlFiles) {
    const relativePath = path.relative(__dirname, filePath);
    const depth = relativePath.split(path.sep).length - 1;
    const basePath = depth > 0 ? '../'.repeat(depth) : '';

    // Determine page type and configuration
    let pageConfig = { basePath };

    if (relativePath === 'index.html') {
      pageConfig = { ...pageConfig, canonicalPath: '/', title: site.title, description: site.description };
    } else if (relativePath.startsWith('blog/posts/')) {
      const slug = path.basename(relativePath, '.html');
      const post = posts.find(p => p.slug === slug);
      if (post) {
        pageConfig = {
          ...pageConfig,
          canonicalPath: `/blog/posts/${slug}.html`,
          title: `${post.title} | ${site.name}`,
          description: post.description,
          ogType: 'article',
          ogTitle: post.title,
          ogDescription: post.description,
          ogImage: post.image.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=630'),
          articleAuthor: site.author,
          articleDate: post.date,
          shareHook: post.shareHook,
          isBlog: true
        };
      }
    } else if (relativePath.startsWith('blog/')) {
      pageConfig = {
        ...pageConfig,
        canonicalPath: '/blog/',
        title: `Blog | ${site.name}`,
        description: 'Insights on leadership, technology, AI automation, fitness, and building sustainable habits.',
        isBlog: true
      };
    } else if (relativePath.startsWith('ventures/')) {
      const name = path.basename(relativePath, '.html').replace(/-/g, ' ');
      pageConfig = { ...pageConfig, canonicalPath: `/ventures/${path.basename(relativePath)}` };
    } else if (relativePath.startsWith('experience/')) {
      pageConfig = { ...pageConfig, canonicalPath: `/experience/${path.basename(relativePath)}` };
    } else if (relativePath.startsWith('profiles/')) {
      pageConfig = { ...pageConfig, canonicalPath: `/profiles/${path.basename(relativePath)}` };
    }

    updateHtmlFile(filePath, data, includes, pageConfig);
  }
}

// ===== UPDATE BLOG INDEX WITH DYNAMIC CONTENT =====
function updateBlogIndex(data, includes) {
  const blogIndexPath = path.join(__dirname, 'blog', 'index.html');

  if (!fs.existsSync(blogIndexPath)) {
    console.log('Blog index not found, skipping dynamic update');
    return;
  }

  let content = fs.readFileSync(blogIndexPath, 'utf8');
  const { featuredHtml, postCardsHtml } = generateBlogIndex(data, includes);

  // Update featured post section
  const featuredRegex = /<!-- Featured Post -->[\s\S]*?<\/article>\s*<\/div>/;
  if (content.match(featuredRegex)) {
    content = content.replace(featuredRegex, featuredHtml.trim());
  }

  // Update posts grid
  const postsGridRegex = /(<div id="posts-grid"[^>]*>)[\s\S]*?(<\/div>\s*<!-- Empty State)/;
  if (content.match(postsGridRegex)) {
    content = content.replace(postsGridRegex, `$1\n${postCardsHtml}\n      $2`);
  }

  fs.writeFileSync(blogIndexPath, content);
  console.log('  Updated blog index with dynamic content');
}

// ===== MAIN =====
function main() {
  console.log('Building site...\n');

  // Load data and includes
  const data = loadData();
  const includes = loadIncludes();

  console.log(`Loaded ${Object.keys(includes).length} includes`);
  console.log(`Loaded ${data.posts.length} blog posts`);

  // Inject components into all HTML files
  injectComponents(data, includes);

  // Update blog index with dynamic content
  updateBlogIndex(data, includes);

  console.log('\nBuild complete!');
}

main();
