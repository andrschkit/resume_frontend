/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
const customDarkTheme = {
  dark: true,
  colors: {
    background: '#282828',
    surface: '#282828',
    'surface-bright': '#373737',
    hover: '#616161',
    border: '#8a8a8a',
    primary: '#0075c9',
    secondary: '#282828',
    error: '#f44336',
    info: '#2196F3',
    success: '#4caf50',
    warning: '#fb8c00',
  },
};
const customLightTheme = {
  dark: true,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#ececec',
    hover: '#f1f1f1',
    border: '#959595',
    primary: '#0075c9',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customDarkTheme,
      customLightTheme,
    },
  },
})
