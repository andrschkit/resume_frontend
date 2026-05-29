import addressCard from '@/assets/address-card.svg'
import educationIcon from '@/assets/graduation-hat-alt.svg'
import careerIcon from '@/assets/career.svg'
import portfolioIcon from '@/assets/folder-user.svg'
import skillsIcon from '@/assets/skills.svg'
import contactsIcon from '@/assets/pen.svg'
import toolsIcon from '@/assets/tools.svg'

export const BASE_PATH = '/resume'
export const DEFAULT_SECTION = 'about'
export const MOBILE_BREAKPOINT = 960

export const MENU_ITEMS = [
  { route: 'about', title: 'Обо мне', icon: addressCard },
  { route: 'education', title: 'Образование', icon: educationIcon },
  { route: 'career', title: 'Карьера', icon: careerIcon },
  { route: 'portfolio', title: 'Портфолио', icon: portfolioIcon },
  { route: 'skills', title: 'Навыки', icon: skillsIcon },
  { route: 'contacts', title: 'Контакты', icon: contactsIcon },
  { route: 'tools', title: 'Инструменты', icon: toolsIcon },
]

export const MOBILE_NAV_GROUPS = [
  {
    id: 'profile',
    title: 'Профиль',
    defaultRoute: 'about',
    routes: ['about'],
    icon: addressCard,
  },
  {
    id: 'path',
    title: 'Путь',
    defaultRoute: 'education',
    routes: ['education', 'career'],
    icon: educationIcon,
  },
  {
    id: 'works',
    title: 'Работы',
    defaultRoute: 'portfolio',
    routes: ['portfolio', 'skills'],
    icon: portfolioIcon,
  },
  {
    id: 'more',
    title: 'Ещё',
    defaultRoute: 'contacts',
    routes: ['contacts', 'tools'],
    icon: contactsIcon,
  },
]

export const sectionUrl = (id) => `${BASE_PATH}#${id}`

export const resolveSectionId = (id) => {
  const valid = MENU_ITEMS.some((item) => item.route === id)
  return valid ? id : DEFAULT_SECTION
}

export const getGroupForRoute = (route) =>
  MOBILE_NAV_GROUPS.find((group) => group.routes.includes(route)) ?? MOBILE_NAV_GROUPS[0]
