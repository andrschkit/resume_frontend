<template>
  <div class="tools-container">
    <PageHeader
      subtitle="Стек этого сайта-resume: демонстрация fullstack и API-first подхода"
      title="Стек проекта"
    />

    <div class="tools-grid">
      <!-- Vue 3 -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <MdiIcon color="#42b883" icon="mdi-vuejs" size="large" />
          </div>
          <h2 class="tool-name">Vue 3</h2>
        </div>
        <p class="tool-description">
          Фреймворк для создания пользовательских интерфейсов. Использован для разработки фронтенд части резюме.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://vuejs.org/" target="_blank">
            <MdiIcon icon="mdi-open-in-new" size="small" />
            <span>Официальный сайт</span>
          </a>
        </div>
      </div>

      <!-- Java -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <MdiIcon color="#5382a1" icon="mdi-language-java" size="large" />
          </div>
          <h2 class="tool-name">Java</h2>
        </div>
        <p class="tool-description">
          Язык программирования для бэкенд разработки. Использован для создания API и бизнес-логики приложения.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://www.java.com/" target="_blank">
            <MdiIcon icon="mdi-open-in-new" size="small" />
            <span>Официальный сайт</span>
          </a>
        </div>
      </div>

      <!-- PostgreSQL -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <MdiIcon color="#336791" icon="mdi-database" size="large" />
          </div>
          <h2 class="tool-name">PostgreSQL</h2>
        </div>
        <p class="tool-description">
          Реляционная СУБД. Использована для хранения данных резюме и обеспечения их целостности.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://www.postgresql.org/" target="_blank">
            <MdiIcon icon="mdi-open-in-new" size="small" />
            <span>Официальный сайт</span>
          </a>
        </div>
      </div>

      <!-- Swagger -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <MdiIcon color="#85ea2d" icon="mdi-api" size="large" />
          </div>
          <h2 class="tool-name">Swagger</h2>
        </div>
        <p class="tool-description">
          Инструмент для документирования и тестирования API. Использован для описания эндпоинтов бэкенда.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://swagger.io/" target="_blank">
            <MdiIcon icon="mdi-open-in-new" size="small" />
            <span>Официальный сайт</span>
          </a>
          <a class="tool-link swagger-link" :href="swaggerLink" target="_blank">
            <MdiIcon icon="mdi-link-variant" size="small" />
            <span>Моя документация</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  import PageHeader from '@/components/PageHeader.vue';

  export default {
    name: 'Tools',
    components: { MenuComponent, PageHeader },
    data () {
      return {
        swaggerLink: 'http://localhost:8080/swagger-ui/index.html', // Замените на ваш реальный URL
      }
    },
  }
</script>

<style scoped>
.tools-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.tool-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-top: 4px solid rgb(var(--v-theme-primary));
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
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
  margin-bottom: 1.5rem;
}

.tool-logo {
  margin-right: 1.5rem;
}

.tool-name {
  color: rgb(var(--v-theme-text));
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.tool-description {
  font-size: 1.1rem;
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

.swagger-link {
  background: rgba(133, 234, 45, 0.1);
  color: #5a8f29;
}

.swagger-link:hover {
  background: rgba(133, 234, 45, 0.2);
}

@media (max-width: 959px) {
  .tools-container {
    padding: 0;
  }
}

@media (max-width: 900px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .tool-header {
    flex-direction: column;
    text-align: center;
  }

  .tool-logo {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  .tool-name {
    font-size: 1.5rem;
  }

  .tool-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }

}
</style>
