<template>
  <div class="tools-container">
    <div class="welcome-section">
      <h1 class="welcome-title">Инструменты</h1>
      <p class="welcome-subtitle">Технологии и средства, использованные при создании этого резюме</p>
    </div>

    <div class="tools-grid">
      <!-- Vue 3 -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <v-icon color="#42b883" large>mdi-vuejs</v-icon>
          </div>
          <h2 class="tool-name">Vue 3</h2>
        </div>
        <p class="tool-description">
          Фреймворк для создания пользовательских интерфейсов. Использован для разработки фронтенд части резюме.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://vuejs.org/" target="_blank">
            <v-icon small>mdi-open-in-new</v-icon>
            <span>Официальный сайт</span>
          </a>
        </div>
      </div>

      <!-- Java -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <v-icon color="#5382a1" large>mdi-language-java</v-icon>
          </div>
          <h2 class="tool-name">Java</h2>
        </div>
        <p class="tool-description">
          Язык программирования для бэкенд разработки. Использован для создания API и бизнес-логики приложения.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://www.java.com/" target="_blank">
            <v-icon small>mdi-open-in-new</v-icon>
            <span>Официальный сайт</span>
          </a>
        </div>
      </div>

      <!-- PostgreSQL -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <v-icon color="#336791" large>mdi-database</v-icon>
          </div>
          <h2 class="tool-name">PostgreSQL</h2>
        </div>
        <p class="tool-description">
          Реляционная СУБД. Использована для хранения данных резюме и обеспечения их целостности.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://www.postgresql.org/" target="_blank">
            <v-icon small>mdi-open-in-new</v-icon>
            <span>Официальный сайт</span>
          </a>
        </div>
      </div>

      <!-- Swagger -->
      <div class="tool-card">
        <div class="tool-header">
          <div class="tool-logo">
            <v-icon color="#85ea2d" large>mdi-api</v-icon>
          </div>
          <h2 class="tool-name">Swagger</h2>
        </div>
        <p class="tool-description">
          Инструмент для документирования и тестирования API. Использован для описания эндпоинтов бэкенда.
        </p>
        <div class="tool-footer">
          <a class="tool-link" href="https://swagger.io/" target="_blank">
            <v-icon small>mdi-open-in-new</v-icon>
            <span>Официальный сайт</span>
          </a>
          <a class="tool-link swagger-link" :href="swaggerLink" target="_blank">
            <v-icon small>mdi-link-variant</v-icon>
            <span>Моя документация</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';

  export default {
    name: 'Tools',
    components: { MenuComponent },
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

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f2ff 0%, #e6e9ff 100%);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.welcome-title {
  color: #2c3e50;
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  color: #4a5b8d;
  font-size: 1.4rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.tool-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-top: 5px solid #6a5acd;
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(106, 90, 205, 0.2);
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
  color: #2c3e50;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.tool-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #3a506b;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  padding: 0 0.5rem;
}

.tool-footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  background: rgba(106, 90, 205, 0.1);
  color: #6a5acd;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.tool-link:hover {
  background: rgba(106, 90, 205, 0.2);
  text-decoration: none;
}

.tool-link .v-icon {
  margin-right: 6px;
}

.swagger-link {
  background: rgba(133, 234, 45, 0.1);
  color: #5a8f29;
}

.swagger-link:hover {
  background: rgba(133, 234, 45, 0.2);
}

@media (max-width: 900px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

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

  .welcome-section {
    padding: 1.5rem;
  }
}
</style>
