export const mediaQuery = (expression) =>
  typeof window !== 'undefined' && window.matchMedia(expression).matches;

