<template>
  <MenuComponent>
    <template #content>
      <div class="not-found-container">
        <div class="welcome-section">
          <h1 class="welcome-title">404</h1>
          <p class="welcome-subtitle">Страница не найдена</p>
          <div class="not-found-icon">
            <v-icon color="#6a5acd" x-large>mdi-emoticon-sad-outline</v-icon>
          </div>
        </div>

        <div class="not-found-content">
          <div class="skills-category">
            <h2 class="category-title">
              <v-icon color="#e74c3c" large>mdi-alert-circle</v-icon>
              Что случилось?
            </h2>
            <div class="skills-grid">
              <div class="skill-card">
                <div class="skill-icon">
                  <v-icon large>mdi-map-marker-off</v-icon>
                </div>
                <h3 class="skill-name">Страница перемещена</h3>
                <p class="skill-description">Искомый контент был перенесен в другой раздел сайта</p>
              </div>

              <div class="skill-card">
                <div class="skill-icon">
                  <v-icon large>mdi-link-off</v-icon>
                </div>
                <h3 class="skill-name">Некорректная ссылка</h3>
                <p class="skill-description">В адресе может быть опечатка или устаревшая информация</p>
              </div>

              <div class="skill-card">
                <div class="skill-icon">
                  <v-icon large>mdi-delete</v-icon>
                </div>
                <h3 class="skill-name">Страница удалена</h3>
                <p class="skill-description">Ресурс больше не доступен на нашем сайте</p>
              </div>
            </div>
          </div>

          <div class="solution-section">
            <v-btn
              class="action-button"
              color="#6a5acd"
              dark
              large
              to="/"
            >
              <v-icon left>mdi-home</v-icon>
              Вернуться на главную
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';

  export default {
    name: 'NotFound',
    components: { MenuComponent },
  }
</script>

<style scoped>
.not-found-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

.welcome-title {
  color: #2c3e50;
  font-size: 6rem;
  margin-bottom: 0;
  line-height: 1;
  font-weight: 800;
}

.welcome-subtitle {
  color: #4a5b8d;
  font-size: 2rem;
  margin-top: 0.5rem;
}

.not-found-icon {
  margin: 1.5rem auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(106, 90, 205, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.not-found-content {
  margin-top: 2rem;
}

.skills-category {
  margin-bottom: 3rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #e74c3c;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.skill-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.8rem;
  transition: all 0.3s ease;
  border-top: 4px solid #e74c3c;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.skill-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(231, 76, 60, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.skill-icon .v-icon {
  color: #e74c3c;
}

.skill-name {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.skill-description {
  color: #3a506b;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.solution-section {
  text-align: center;
  display: flex;
  justify-content: center;
}

.action-button {
  padding: 1rem  !important;
  height: 100% !important;
  font-size: 1.1rem !important;
  font-weight: 600;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.action-button:hover {
  transform: scale(1.05);
}

/* Адаптивность */
@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 4rem;
  }

  .welcome-subtitle {
    font-size: 1.5rem;
  }

  .category-title {
    font-size: 1.6rem;
  }

  .skill-card {
    padding: 1.5rem;
  }

  .action-button {
    padding: 1.2rem 2rem !important;
    font-size: 1rem !important;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .not-found-container {
    padding: 1.5rem 1rem;
  }

  .welcome-section {
    padding: 1.5rem;
  }

  .welcome-title {
    font-size: 3.5rem;
  }

  .not-found-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
