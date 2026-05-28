<template>
  <div class="career-container page-container">
    <PageHeader
      subtitle="Опыт в промышленности, госсекторе и управлении IT-командой"
      title="Профессиональный путь"
    />

    <div class="career-list">
      <article
        v-for="item in workPlacesNewestFirst"
        :key="item.id"
        class="career-card"
      >
        <div class="career-header">
          <div class="career-logo">
            <div class="logo-placeholder">
              <MdiIcon color="white" icon="mdi-domain" size="large" />
            </div>
          </div>
          <div class="career-info">
            <h2 class="career-title">{{ item.name }}</h2>
            <div class="career-interval">
              <MdiIcon icon="mdi-calendar" size="small" />
              <span>{{ item.interval }}</span>
            </div>
          </div>
        </div>

        <div class="career-description">
          <ul v-if="achievementBullets(item.description).length > 1" class="achievement-list">
            <li v-for="(bullet, i) in achievementBullets(item.description)" :key="i">
              {{ bullet }}
            </li>
          </ul>
          <p v-else>{{ item.description }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import MdiIcon from '@/components/MdiIcon.vue';
  import PageHeader from '@/components/PageHeader.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Career',
    components: { PageHeader, MdiIcon },
    computed: {
      ...mapGetters('resume_store', { work_places: 'work_places_all' }),
      workPlacesNewestFirst () {
        return [...this.work_places].reverse();
      },
    },
    mounted () {
      store.dispatch('resume_store/loadWorkPlaces');
    },
    methods: {
      achievementBullets (description) {
        if (!description || !String(description).includes('•')) {
          return [];
        }
        return String(description)
          .split('•')
          .map(s => s.trim())
          .filter(Boolean);
      },
    },
  }
</script>

<style scoped>
.career-container {
  width: 100%;
}

.career-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.career-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-top: 4px solid rgb(var(--v-theme-primary));
  border-radius: var(--radius-card);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.career-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--v-theme-primary), 0.12);
}

.career-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.35);
}

.career-logo {
  flex-shrink: 0;
  margin-right: 1.25rem;
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

.career-info {
  flex: 1;
  min-width: 0;
}

.career-title {
  margin: 0 0 0.4rem;
  font-size: var(--fs-card-title);
  font-weight: 600;
  color: rgb(var(--v-theme-text));
  line-height: 1.3;
}

.career-interval {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(var(--v-theme-primary));
}

.career-description {
  font-size: var(--fs-body);
  line-height: 1.65;
  color: rgb(var(--v-theme-subtext));
}

.career-description p {
  margin: 0;
}

.achievement-list {
  margin: 0;
  padding-left: 1.25rem;
}

.achievement-list li {
  margin-bottom: 0.5rem;
}

.achievement-list li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .career-card {
    padding: 1rem;
  }

  .career-header {
    flex-direction: column;
    text-align: center;
  }

  .career-logo {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .career-interval {
    justify-content: center;
  }

  .career-title {
    font-size: clamp(1.1rem, 1.02rem + 0.55vw, 1.25rem);
  }

  .logo-placeholder {
    width: 56px;
    height: 56px;
  }
}
</style>
