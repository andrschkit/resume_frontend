<template>
  <div class="tools-container page-container">
    <PageHeader
      subtitle="Стек этого сайта-resume: демонстрация fullstack и API-first подхода"
      title="Стек проекта"
    />

    <div class="tools-grid">
      <div v-for="tool in tools" :key="tool.name" class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <div class="logo-placeholder">
              <MdiIcon color="white" :icon="tool.icon" size="large" />
            </div>
          </div>
          <div class="tool-info">
            <h2 class="tool-name">{{ tool.name }}</h2>
          </div>
        </div>
        <p class="tool-description">{{ tool.description }}</p>
        <div class="tool-footer">
          <a
            v-for="link in tool.links"
            :key="`${tool.name}-${link.label}`"
            class="tool-link"
            :class="{ 'tool-link--accent': link.isAccent }"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdiIcon :icon="link.icon || 'mdi-open-in-new'" size="small" />
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MdiIcon from '@/components/MdiIcon.vue';
  import MenuComponent from '@/components/MenuComponent.vue';
  import PageHeader from '@/components/PageHeader.vue';

  export default {
    name: 'Tools',
    components: { MenuComponent, PageHeader, MdiIcon },
    data () {
      return {
        swaggerLink: 'http://localhost:8080/swagger-ui/index.html',
        tools: [
          {
            name: 'Vue 3',
            icon: 'mdi-vuejs',
            description: 'Фреймворк для создания пользовательских интерфейсов. Использован для разработки фронтенд части резюме.',
            links: [{ label: 'Официальный сайт', href: 'https://vuejs.org/' }],
          },
          {
            name: 'Java',
            icon: 'mdi-language-java',
            description: 'Язык программирования для бэкенд разработки. Использован для создания API и бизнес-логики приложения.',
            links: [{ label: 'Официальный сайт', href: 'https://www.java.com/' }],
          },
          {
            name: 'PostgreSQL',
            icon: 'mdi-database',
            description: 'Реляционная СУБД. Использована для хранения данных резюме и обеспечения их целостности.',
            links: [{ label: 'Официальный сайт', href: 'https://www.postgresql.org/' }],
          },
          {
            name: 'GitHub',
            icon: 'mdi-github',
            description: 'Репозитории проекта с исходным кодом фронтенда и бэкенда.',
            links: [
              { label: 'Frontend repository', href: 'https://github.com/andrschkit/resume_frontend' },
              { label: 'Backend repository', href: 'https://github.com/andrschkit/resume_backend' },
            ],
          },
          {
            name: 'Swagger',
            icon: 'mdi-api',
            description: 'Инструмент для документирования и тестирования API. Использован для описания эндпоинтов бэкенда.',
            links: [
              { label: 'Официальный сайт', href: 'https://swagger.io/' },
              { label: 'Моя документация', href: 'http://localhost:8080/swagger-ui/index.html', icon: 'mdi-link-variant', isAccent: true },
            ],
          },
        ],
      }
    },
  }
</script>

<style scoped>
.tools-container {
  width: 100%;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.tool-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-top: 4px solid rgb(var(--v-theme-primary));
  border-radius: var(--radius-card);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(var(--v-theme-primary), 0.12);
}

.tool-header {
  display: flex;
  align-items: center;
}

.tool-info {
  flex: 1;
}

.tool-logo {
  margin-right: 1.5rem;
}

.logo-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4b6cb7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.25);
}

.tool-name {
  color: rgb(var(--v-theme-text));
  font-size: var(--fs-card-title);
  margin-bottom: 0.5rem;
}

.tool-description {
  font-size: var(--fs-body);
  line-height: 1.7;
  color: rgb(var(--v-theme-subtext));
  margin-bottom: 1.5rem;
  flex-grow: 1;
  padding: 0 0.5rem;
}

.tool-footer {
  border-top: 1px solid rgba(var(--v-theme-border), 0.35);
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.tool-link:hover {
  background: rgba(var(--v-theme-primary), 0.2);
  text-decoration: none;
}

.tool-link .mdi-icon {
  margin-right: 6px;
}

.tool-link--accent {
  background: rgba(133, 234, 45, 0.1);
  color: #5a8f29;
}

.tool-link--accent:hover {
  background: rgba(133, 234, 45, 0.2);
}

@media (max-width: 900px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .tool-header {
    flex-direction: column;
    text-align: center;
  }

  .tool-logo {
    margin-right: 0;
  }

  .tool-name {
    font-size: clamp(1.15rem, 1.05rem + 0.7vw, 1.35rem);
  }

  .tool-card {
    padding: 1rem;
  }

  .logo-placeholder {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }

}
</style>
