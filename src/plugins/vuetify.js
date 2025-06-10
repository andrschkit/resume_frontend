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
    text:'#FFFFFF',
    subtext:'#dcdcdc',
    'surface-bright': '#373737',
    hover: '#616161',
    border: '#8a8a8a',
    primary: '#0085e6',
    secondary: '#282828',
    error: '#f44336',
    info: '#028ef3',
    success: '#4caf50',
    warning: '#fb8c00',
  },
};
const customLightTheme = {
  dark: true,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text:'#353535',
    subtext:'#333333',
    'surface-bright': '#ececec',
    hover: '#f1f1f1',
    border: '#959595',
    primary: '#0085e6',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#55b6ff',
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
