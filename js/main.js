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

// WebP Support Detection
let supportsWebP = false;
const webpCheck = new Image();
webpCheck.onload = webpCheck.onerror = () => {
  supportsWebP = webpCheck.height === 2;
};
webpCheck.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

// Image path helpers
function getOptimizedPath(src) {
  if (!src) return '';
  const path = src.replace('media/', 'media/optimized/');
  return supportsWebP ? path.replace(/\.(jpg|jpeg)$/i, '.webp') : path;
}

function getThumbnailPath(src) {
  if (!src) return '';
  const path = src.replace('media/', 'media/thumbnails/');
  return supportsWebP ? path.replace(/\.(jpg|jpeg)$/i, '.webp') : path;
}

// Global export
window.portfolio = { fetchSiteData, initFadeObserver, getOptimizedPath, getThumbnailPath };
