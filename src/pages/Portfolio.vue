<template>
  <div class="portfolio-container">
    <PageHeader
      subtitle="Корпоративные продукты и инфраструктура с измеримым результатом"
      title="Кейсы и проекты"
    />

    <div class="portfolio-grid">
      <div v-for="project in portfolioItems" :key="project.id" class="project-card">
        <div class="project-image-container">
          <img :alt="project.name" class="project-image" :src="project.img">
          <div class="project-logo">
            <img :alt="project.name + ' лого'" :src="project.logo">
          </div>
        </div>

        <div class="project-content">
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>

          <div class="project-footer">
            <a class="project-link" :href="project.link" target="_blank">
              <MdiIcon icon="mdi-open-in-new" />
              <span>Посмотреть проект</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  import PageHeader from '@/components/PageHeader.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Portfolio',
    components: { MenuComponent, PageHeader },
    computed: {
      ...mapGetters('resume_store', { portfolioItems: 'products_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadProducts');
    },
    methods: {
      handleImageError (e) {
        e.target.src = this.defaultImage;
      },
      handleLogoError (e) {
        e.target.src = this.defaultLogo;
      },
    },
  }
</script>

<style scoped>
.portfolio-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.project-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(206, 83, 83, 0.15);
}

.project-image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-logo {
  position: absolute;
  bottom: -25px;
  right: 25px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgb(var(--v-theme-surface));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border: 5px solid rgb(var(--v-theme-surface));
}

.project-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.project-content {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  color: rgb(var(--v-theme-text));
  font-size: 1.6rem;
  margin-bottom: 1rem;
  padding-right: 60px;
}

.project-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-subtext));
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.project-footer {
  border-top: 1px solid rgba(var(--v-theme-border), 0.35);
  padding-top: 1.5rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  color: #ce5353;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(206, 83, 83, 0.1);
}

.project-link:hover {
  background: rgba(206, 83, 83, 0.2);
  color: #b54545;
}

.project-link .mdi-icon {
  margin-right: 8px;
}

@media (max-width: 1200px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .project-image-container {
    height: 200px;
  }

  .project-logo {
    width: 70px;
    height: 70px;
    right: 20px;
    bottom: -20px;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.5rem;
    padding-right: 50px;
  }
}

@media (max-width: 480px) {
  .portfolio-container {
    padding: 1.5rem 1rem;
  }

  .project-image-container {
    height: 180px;
  }

  .project-logo {
    width: 60px;
    height: 60px;
    bottom: -15px;
  }
}
</style>
