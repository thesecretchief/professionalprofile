/**
 * Unified Analytics Script for Lee Foropoulos Professional Profile
 * Includes: Google Analytics 4 + Microsoft Clarity
 * GDPR-compliant: Only loads when user consents
 */

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================
  const CONFIG = {
    GA4_MEASUREMENT_ID: 'G-GDYH7KERT7',
    CLARITY_PROJECT_ID: 'v4s0f5gykr'
  };

  // ========================================
  // STATE
  // ========================================
  let analyticsInitialized = false;
  let clarityInitialized = false;

  // ========================================
  // COOKIE UTILITIES
  // ========================================
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function getConsent() {
    const consent = getCookie('cookieConsent');
    if (!consent) return null;
    try {
      return JSON.parse(decodeURIComponent(consent));
    } catch (e) {
      return null;
    }
  }

  function hasAnalyticsConsent() {
    const consent = getConsent();
    return consent && consent.analytics === true;
  }

  // ========================================
  // GOOGLE ANALYTICS 4 SETUP
  // ========================================
  function initGA4() {
    if (analyticsInitialized) return;
    if (!hasAnalyticsConsent()) return;

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
      anonymize_ip: true // Additional privacy measure
    });

    analyticsInitialized = true;

    // Log initialization (dev only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('GA4 initialized with consent');
    }
  }

  // ========================================
  // MICROSOFT CLARITY SETUP
  // ========================================
  function initClarity() {
    if (clarityInitialized) return;
    if (!hasAnalyticsConsent()) return;

    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CONFIG.CLARITY_PROJECT_ID);

    clarityInitialized = true;

    // Log initialization (dev only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Clarity initialized with consent');
    }
  }

  // ========================================
  // CUSTOM EVENT TRACKING
  // ========================================

  // Track custom event to GA4
  function trackEvent(eventName, params = {}) {
    if (!hasAnalyticsConsent()) return;
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
    // Clarity automatically captures clicks, no manual tracking needed
  }

  // ========================================
  // AUTOMATIC CLICK TRACKING
  // ========================================
  function initClickTracking() {
    document.addEventListener('click', function(e) {
      if (!hasAnalyticsConsent()) return;

      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.innerText?.trim().substring(0, 50) || '';
      const classes = target.className || '';

      // Track Cal.com booking links (PRIMARY CONVERSIONS)
      if (href.includes('cal.com')) {
        const calType = href.includes('/strategy') ? 'strategy' :
                        href.includes('/shiftspotter') ? 'shiftspotter' :
                        href.includes('/pr') ? 'pr' : 'other';
        trackEvent('booking_click', {
          event_category: 'conversion',
          event_label: calType,
          link_url: href,
          button_text: text
        });
        // Also track as conversion
        trackEvent('conversion', {
          send_to: CONFIG.GA4_MEASUREMENT_ID,
          event_category: 'booking',
          value: calType
        });
      }

      // Track social media clicks
      else if (href.includes('linkedin.com')) {
        trackEvent('social_click', {
          event_category: 'social',
          event_label: 'linkedin',
          link_url: href
        });
      }
      else if (href.includes('twitter.com') || href.includes('x.com')) {
        trackEvent('social_click', {
          event_category: 'social',
          event_label: 'twitter',
          link_url: href
        });
      }
      else if (href.includes('instagram.com')) {
        trackEvent('social_click', {
          event_category: 'social',
          event_label: 'instagram',
          link_url: href
        });
      }
      else if (href.includes('facebook.com')) {
        trackEvent('social_click', {
          event_category: 'social',
          event_label: 'facebook',
          link_url: href
        });
      }

      // Track venture page clicks
      else if (href.includes('/ventures/')) {
        const venture = href.split('/ventures/')[1]?.replace('.html', '') || 'unknown';
        trackEvent('venture_click', {
          event_category: 'navigation',
          event_label: venture,
          link_url: href
        });
      }

      // Track blog post clicks
      else if (href.includes('/blog/posts/')) {
        const post = href.split('/blog/posts/')[1]?.replace('.html', '') || 'unknown';
        trackEvent('blog_post_click', {
          event_category: 'content',
          event_label: post,
          link_url: href
        });
      }

      // Track CTA buttons (by style/class)
      else if (classes.includes('bg-gold') || classes.includes('bg-amber') ||
               text.toLowerCase().includes('work with') ||
               text.toLowerCase().includes('book') ||
               text.toLowerCase().includes('schedule') ||
               text.toLowerCase().includes('contact') ||
               text.toLowerCase().includes('get started')) {
        trackEvent('cta_click', {
          event_category: 'engagement',
          event_label: text,
          link_url: href
        });
      }

      // Track external links
      else if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        trackEvent('outbound_click', {
          event_category: 'outbound',
          event_label: new URL(href).hostname,
          link_url: href
        });
      }
    });
  }

  // ========================================
  // NEWSLETTER FORM TRACKING
  // ========================================
  function initFormTracking() {
    document.addEventListener('submit', function(e) {
      if (!hasAnalyticsConsent()) return;

      const form = e.target;
      const emailInput = form.querySelector('input[type="email"]');

      if (emailInput) {
        trackEvent('newsletter_signup_attempt', {
          event_category: 'conversion',
          event_label: 'newsletter',
          page_location: window.location.pathname
        });
      }
    });
  }

  // ========================================
  // SCROLL DEPTH TRACKING
  // ========================================
  function initScrollTracking() {
    const milestones = [25, 50, 75, 90];
    const reached = new Set();

    function getScrollPercent() {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      return Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!hasAnalyticsConsent()) return;

      if (!ticking) {
        window.requestAnimationFrame(function() {
          const percent = getScrollPercent();
          milestones.forEach(milestone => {
            if (percent >= milestone && !reached.has(milestone)) {
              reached.add(milestone);
              trackEvent('scroll_depth', {
                event_category: 'engagement',
                event_label: `${milestone}%`,
                value: milestone,
                page_location: window.location.pathname
              });
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ========================================
  // PAGE TIMING TRACKING
  // ========================================
  function initTimingTracking() {
    if (!hasAnalyticsConsent()) return;

    // Track time on page at intervals
    const intervals = [30, 60, 120, 300]; // seconds
    intervals.forEach(seconds => {
      setTimeout(() => {
        if (hasAnalyticsConsent()) {
          trackEvent('time_on_page', {
            event_category: 'engagement',
            event_label: `${seconds}s`,
            value: seconds,
            page_location: window.location.pathname
          });
        }
      }, seconds * 1000);
    });
  }

  // ========================================
  // BLOG CATEGORY FILTER TRACKING
  // ========================================
  function initBlogFilterTracking() {
    // Watch for category filter clicks on blog page
    document.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', function() {
        if (!hasAnalyticsConsent()) return;

        const category = this.getAttribute('data-category') || this.innerText.trim();
        trackEvent('blog_filter', {
          event_category: 'engagement',
          event_label: category,
          page_location: window.location.pathname
        });
      });
    });
  }

  // ========================================
  // DARK MODE TOGGLE TRACKING
  // ========================================
  function initDarkModeTracking() {
    const observer = new MutationObserver(function(mutations) {
      if (!hasAnalyticsConsent()) return;

      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          trackEvent('theme_toggle', {
            event_category: 'preference',
            event_label: isDark ? 'dark' : 'light'
          });
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  // ========================================
  // PAGE TYPE DETECTION FOR ENHANCED TRACKING
  // ========================================
  function getPageType() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'homepage';
    if (path.includes('/blog/posts/')) return 'blog_post';
    if (path.includes('/blog')) return 'blog_hub';
    if (path.includes('/ventures/')) return 'venture';
    if (path.includes('/experience/')) return 'experience';
    if (path.includes('/profiles/')) return 'profile';
    return 'other';
  }

  // ========================================
  // INITIALIZE TRACKING (After consent)
  // ========================================
  function initTracking() {
    // Track page type
    const pageType = getPageType();
    trackEvent('page_type_view', {
      event_category: 'pageview',
      event_label: pageType,
      page_location: window.location.pathname
    });

    // Initialize all tracking
    initClickTracking();
    initFormTracking();
    initScrollTracking();
    initTimingTracking();
    initBlogFilterTracking();
    initDarkModeTracking();

    // Log initialization (dev only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Analytics tracking initialized:', {
        pageType,
        ga4: analyticsInitialized,
        clarity: clarityInitialized
      });
    }
  }

  // ========================================
  // CONSENT EVENT LISTENER
  // ========================================
  function onConsentUpdated(event) {
    const consent = event.detail;
    if (consent && consent.analytics) {
      initGA4();
      initClarity();
      initTracking();
    }
  }

  // ========================================
  // INITIALIZE
  // ========================================
  function init() {
    // Listen for consent updates
    window.addEventListener('cookieConsentUpdated', onConsentUpdated);

    // Check if we already have consent
    if (hasAnalyticsConsent()) {
      initGA4();
      initClarity();

      // Wait for DOM ready before initializing tracking
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracking);
      } else {
        initTracking();
      }
    }
  }

  // Start
  init();

  // Expose trackEvent for manual tracking if needed
  window.siteAnalytics = {
    trackEvent,
    hasConsent: hasAnalyticsConsent
  };

})();
