<template>
  <div class="skills-container page-container">
    <PageHeader
      subtitle="Управление, разработка и инфраструктура — в одном профиле"
      title="Компетенции"
    />

    <div class="skills-categories">
      <div class="skills-category">
        <h2 class="category-title">
          <MdiIcon color="rgb(var(--v-theme-primary))" icon="mdi-account-group" size="large" />
          Управление и процессы
        </h2>
        <div class="skills-grid">
          <div v-for="item in coreSkills" :key="'core-'+item.id" class="skill-card">
            <div class="skill-icon">
              <MdiIcon :icon="getSkillIcon(item.name)" size="large" />
            </div>
            <h3 class="skill-name">{{ item.name }}</h3>
            <p class="skill-description">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="skills-category">
        <h2 class="category-title">
          <MdiIcon color="rgb(var(--v-theme-primary))" icon="mdi-monitor" size="large" />
          Разработка (frontend)
        </h2>
        <div class="skills-grid">
          <div v-for="item in frontendSkills" :key="'front-'+item.id" class="skill-card">
            <div class="skill-icon">
              <MdiIcon :icon="getSkillIcon(item.name)" size="large" />
            </div>
            <h3 class="skill-name">{{ item.name }}</h3>
            <p class="skill-description">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="skills-category">
        <h2 class="category-title">
          <MdiIcon color="rgb(var(--v-theme-primary))" icon="mdi-server" size="large" />
          Инфраструктура и backend
        </h2>
        <div class="skills-grid">
          <div v-for="item in backendSkills" :key="'back-'+item.id" class="skill-card">
            <div class="skill-icon">
              <MdiIcon :icon="getSkillIcon(item.name)" size="large" />
            </div>
            <h3 class="skill-name">{{ item.name }}</h3>
            <p class="skill-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PageHeader from '@/components/PageHeader.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  const ICONS = {
    'Управление командами': 'mdi-account-supervisor',
    'Agile (Scrum, Kanban)': 'mdi-chart-timeline-variant',
    'KPI и процессы': 'mdi-target',
    'Jira / GitLab': 'mdi-jira',
    'Docker': 'mdi-docker',
    'GitLab CI/CD': 'mdi-git',
    'Микросервисная архитектура': 'mdi-sitemap',
    'Self-hosting': 'mdi-cloud-outline',
    'Техническое лидерство': 'mdi-lightbulb-on',
    'Vue.js': 'mdi-vuejs',
    'JavaScript': 'mdi-language-javascript',
    'HTML5 / CSS3': 'mdi-language-html5',
    'Bootstrap': 'mdi-bootstrap',
    'Java / Spring Boot': 'mdi-language-java',
    'PostgreSQL': 'mdi-database',
    'REST API': 'mdi-api',
    'OAuth2': 'mdi-shield-key',
    'Linux': 'mdi-linux',
  };

  export default {
    name: 'Skills',
    components: { PageHeader },
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
        return ICONS[skillName] || 'mdi-code-braces';
      },
    },
  }
</script>

<style scoped>
.skills-container {
  width: 100%;
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
  color: rgb(var(--v-theme-text));
  font-size: var(--fs-section-title);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.2);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.skill-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border-radius: var(--radius-card);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-top: 4px solid rgb(var(--v-theme-primary));
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(var(--v-theme-primary), 0.12);
}

.skill-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4b6cb7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  color: white;
}

.skill-name {
  color: rgb(var(--v-theme-text));
  font-size: var(--fs-card-title);
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 600;
}

.skill-description {
  color: rgb(var(--v-theme-subtext));
  font-size: var(--fs-body);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .category-title {
    font-size: clamp(1.35rem, 1.2rem + 0.95vw, 1.65rem);
  }

  .skill-card {
    padding: 1.5rem;
  }

  .skill-icon {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 600px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
