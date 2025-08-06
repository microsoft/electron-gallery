// Common theme management and utility functions
function updateTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.dispatchEvent(new CustomEvent('fluent-theme-change', {
    detail: { theme: isDark ? 'dark' : 'light' }
  }));
}

// Initialize theme
function initializeTheme() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
  updateTheme();
}

// Common keyboard navigation for interactive elements
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement) {
      const element = document.activeElement;
      if (element.classList.contains('header-tile') || 
          element.classList.contains('component-item') ||
          element.classList.contains('fluent-button')) {
        e.preventDefault();
        element.click();
      }
    }
  });
}

// High contrast mode support
function initializeAccessibility() {
  const contrastQuery = window.matchMedia('(forced-colors: active)');
  document.documentElement.classList.toggle('high-contrast', contrastQuery.matches);
  contrastQuery.addEventListener('change', e => 
    document.documentElement.classList.toggle('high-contrast', e.matches)
  );
}

// Initialize all common functionality
function initializeFluentApp() {
  initializeTheme();
  initializeKeyboardNavigation();
  initializeAccessibility();
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFluentApp);
