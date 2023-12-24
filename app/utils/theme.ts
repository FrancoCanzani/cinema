const html = document.documentElement;

function getColorSchemePreference() {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  } else {
    return 'light';
  }
}

export function updateColorSchemePreference() {
  let colorSchemePreference = getColorSchemePreference();

  html.setAttribute('data-color-scheme', colorSchemePreference);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      colorSchemePreference = getColorSchemePreference();
      html.setAttribute('data-color-scheme', colorSchemePreference);
    });

  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', () => {
      colorSchemePreference = getColorSchemePreference();
      html.setAttribute('data-color-scheme', colorSchemePreference);
    });

  return colorSchemePreference;
}

export function toggleClass(toMode?: string) {
  const currentColorScheme = getCurrentColorScheme();
  const colorSchemePreference = getColorSchemePreference();

  if (toMode) {
    if (toMode === 'system') {
      html.classList.replace(currentColorScheme, colorSchemePreference);
    } else if (toMode === 'dark') {
      html.classList.replace(currentColorScheme, 'dark');
    } else if (toMode === 'light') {
      html.classList.replace(currentColorScheme, 'light');
    }
  } else {
    const hasLightClass = html.classList.contains('light');
    const hasDarkClass = html.classList.contains('dark');

    if (hasLightClass) {
      html.classList.replace('light', 'dark');
    } else if (hasDarkClass) {
      html.classList.replace('dark', 'light');
    } else {
      html.classList.add('dark');
    }
  }
}

export function getCurrentColorScheme() {
  if (html.classList.contains('dark')) {
    return 'dark';
  } else {
    return 'light';
  }
}
