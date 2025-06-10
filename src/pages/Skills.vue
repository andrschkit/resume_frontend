<template>
  <MenuComponent>
    <template #content>
      <div class="skills-container">
        <div class="welcome-section">
          <h1 class="welcome-title">Мои навыки</h1>
          <p class="welcome-subtitle">Профессиональные компетенции и технологии</p>
        </div>

        <div class="skills-categories">
          <!-- Основные навыки -->
          <div class="skills-category">
            <h2 class="category-title">
              <v-icon color="#6a5acd" large>mdi-star-circle</v-icon>
              Основные
            </h2>
            <div class="skills-grid">
              <div v-for="item in coreSkills" :key="'core-'+item.id" class="skill-card">
                <div class="skill-icon">
                  <v-icon large>mdi-{{ getSkillIcon(item.name) }}</v-icon>
                </div>
                <h3 class="skill-name">{{ item.name }}</h3>
                <p class="skill-description">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Фронтенд -->
          <div class="skills-category">
            <h2 class="category-title">
              <v-icon color="#6a5acd" large>mdi-monitor</v-icon>
              Фронтенд
            </h2>
            <div class="skills-grid">
              <div v-for="item in frontendSkills" :key="'front-'+item.id" class="skill-card">
                <div class="skill-icon">
                  <v-icon large>mdi-{{ getSkillIcon(item.name) }}</v-icon>
                </div>
                <h3 class="skill-name">{{ item.name }}</h3>
                <p class="skill-description">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Бэкенд -->
          <div class="skills-category">
            <h2 class="category-title">
              <v-icon color="#6a5acd" large>mdi-server</v-icon>
              Бэкенд
            </h2>
            <div class="skills-grid">
              <div v-for="item in backendSkills" :key="'back-'+item.id" class="skill-card">
                <div class="skill-icon">
                  <v-icon large>mdi-{{ getSkillIcon(item.name) }}</v-icon>
                </div>
                <h3 class="skill-name">{{ item.name }}</h3>
                <p class="skill-description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Skills',
    components: { MenuComponent },
    computed: {
      ...mapGetters('resume_store', {
        coreSkills: 'main_skills_all',
        frontendSkills: 'frontend_skills_all',
        backendSkills: 'backend_skills_all',
      }),
    },
    mounted () {
      store.dispatch('resume_store/loadMainSkills');
      store.dispatch('resume_store/loadFrontendSkills');
      store.dispatch('resume_store/loadBackendSkills');
    },
    methods: {
      getSkillIcon (skillName) {
        const iconsMap = {
          'HTML 5': 'language-html5',
          'CSS': 'language-css3',
          'JavaScript': 'language-javascript',
          'VUE 3': 'vuejs',
          'Postgre SQL': 'database',
          'JAVA': 'language-java',
          'Node.js': 'nodejs',
          'Spring Boot': 'spring',
          'Apache Maven': 'maven',
          'С++': 'language-cpp',
          'QT': 'qt',
          'Тестирование': 'test-tube',
          'Работа с БД': 'database',
          'Работа с системой контроля версий': 'git',
        };

        return iconsMap[skillName] || 'code-braces';
      },
    },
  }
</script>

<style scoped>
.skills-container {
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

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e6e9ff;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.skill-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  border-top: 4px solid #6a5acd;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(106, 90, 205, 0.15);
}

.skill-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a5acd, #4b6cb7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
}

.skill-name {
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.skill-description {
  color: #3a506b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

  .category-title {
    font-size: 1.8rem;
  }

  .skill-card {
    padding: 1.5rem;
  }
}

@media (max-width: 600px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 1.5rem;
  }

  .category-title {
    font-size: 1.6rem;
  }
}
</style>
