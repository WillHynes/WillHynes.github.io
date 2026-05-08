/**
 * Shared logic for Will Hynes Portfolio
 */

async function fetchSiteData() {
  try {
    // Add a cache-buster to ensure we always get the latest JSON
    const response = await fetch(`site_data.json?t=${Date.now()}`);
    if (!response.ok) throw new Error('Failed to fetch site data');
    return await response.json();
  } catch (error) {
    console.error('Error loading site data:', error);
    return null;
  }
}

// Fade-up observer helper
function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  return observer;
}

// Image path helpers
function getOptimizedPath(src) {
  if (!src) return '';
  return src.replace('media/', 'media/optimized/');
}

function getThumbnailPath(src) {
  if (!src) return '';
  return src.replace('media/', 'media/thumbnails/');
}

// Global export
window.portfolio = { fetchSiteData, initFadeObserver, getOptimizedPath, getThumbnailPath };
