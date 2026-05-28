# Resume Frontend

Одностраничное резюме на Vue 3 с прокруткой по секциям, боковым меню и поддержкой светлой/тёмной темы.

## Стек

- [Vue 3](https://vuejs.org/) — интерфейс
- [Vue Router](https://router.vuejs.org/) — маршруты (`/resume`, 404)
- [Vuex](https://vuex.vuejs.org/) — данные с API
- [Vite](https://vitejs.dev/) — сборка и dev-сервер
- [Material Design Icons](https://pictogrammers.com/library/mdi/) — иконки (`@mdi/font`)

## Установка

```bash
npm install
```

## Запуск

Dev-сервер (порт 3000):

```bash
npm run dev
```

Откройте [http://localhost:3000/resume](http://localhost:3000/resume).

## Сборка

```bash
npm run build
npm run preview
```

## Структура

- `src/pages/` — секции резюме (About, Education, Career и др.)
- `src/components/MenuComponent.vue` — навигация (десктоп / мобильная)
- `src/plugins/theme.js` — светлая и тёмная тема (CSS-переменные)
- `src/store/` — Vuex и запросы к бэкенду

## Переменные окружения

Создайте `.env.development` (не коммитьте секреты):

```env
VITE_API_URL=http://localhost:8080
VITE_API_NAME=X-API-KEY
VITE_API_KEY=your-key
```

## Лицензия

MIT
