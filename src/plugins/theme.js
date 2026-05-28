const THEMES = {
  customLightTheme: {
    background: '255, 255, 255',
    surface: '255, 255, 255',
    text: '53, 53, 53',
    subtext: '51, 51, 51',
    'surface-bright': '236, 236, 236',
    hover: '241, 241, 241',
    border: '149, 149, 149',
    primary: '0, 133, 230',
    secondary: '3, 218, 198',
    'on-background': '53, 53, 53',
  },
  customDarkTheme: {
    background: '40, 40, 40',
    surface: '40, 40, 40',
    text: '255, 255, 255',
    subtext: '220, 220, 220',
    'surface-bright': '55, 55, 55',
    hover: '97, 97, 97',
    border: '138, 138, 138',
    primary: '0, 133, 230',
    secondary: '40, 40, 40',
    'on-background': '255, 255, 255',
  },
}

export function applyTheme(themeName) {
  const colors = THEMES[themeName] ?? THEMES.customLightTheme
  const root = document.documentElement

  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(`--v-theme-${key}`, value)
  }

  root.dataset.theme = themeName
  document.body.style.backgroundColor = `rgb(${colors.background})`
  document.body.style.color = `rgb(${colors.text})`
}

export function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved && THEMES[saved]) {
    return saved
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'customDarkTheme'
    : 'customLightTheme'
}

export function isDarkTheme(themeName) {
  return themeName === 'customDarkTheme'
}
