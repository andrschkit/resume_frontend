<template>
  <div class="career-container">
    <PageHeader
      subtitle="Опыт в промышленности, госсекторе и управлении IT-командой"
      title="Профессиональный путь"
    />

    <div class="timeline">
      <div
        v-for="(item, index) in workPlacesNewestFirst"
        :key="item.id"
        class="timeline-item"
      >
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-logo-placeholder">
              <div class="logo-placeholder">
                <span>{{ companyInitial(item.name) }}</span>
              </div>
            </div>
            <div class="timeline-info">
              <h2 class="timeline-title">{{ item.name }}</h2>
              <div class="timeline-interval">
                <MdiIcon icon="mdi-calendar" size="small" />
                <span>{{ item.interval }}</span>
              </div>
            </div>
          </div>

          <div class="timeline-description">
            <ul v-if="achievementBullets(item.description).length > 1" class="achievement-list">
              <li v-for="(bullet, i) in achievementBullets(item.description)" :key="i">
                {{ bullet }}
              </li>
            </ul>
            <p v-else>{{ item.description }}</p>
          </div>
        </div>
        <div v-if="index < workPlacesNewestFirst.length - 1" class="timeline-connector">
          <div class="connector-line" />
          <div class="connector-dot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PageHeader from '@/components/PageHeader.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Career',
    components: { PageHeader },
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
      companyInitial (name) {
        const letter = String(name).trim().charAt(0);
        return letter || '?';
      },
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
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.timeline {
  position: relative;
}

.timeline-item {
  margin-bottom: 3rem;
  position: relative;
  display: flex;
  justify-content: center;
}

.timeline-content {
  width: 100%;
  background: rgba(var(--v-theme-surface), 0.5);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.timeline-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.timeline-logo-placeholder {
  margin-right: 1.5rem;
}

.logo-placeholder {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #3498db);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timeline-info {
  flex: 1;
}

.timeline-title {
  color: rgb(var(--v-theme-text));
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.timeline-interval {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
  font-size: 1.1rem;
  gap: 8px;
}

.timeline-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-subtext));
  padding: 0 0.5rem;
}

.achievement-list {
  margin: 0;
  padding-left: 1.25rem;
}

.achievement-list li {
  margin-bottom: 0.65rem;
}

.achievement-list li:last-child {
  margin-bottom: 0;
}

.timeline-connector {
  position: absolute;
  top: 100%;
  height: 50px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connector-line {
  height: 100%;
  width: 4px;
  background: rgb(var(--v-theme-primary));
  opacity: 0.5;
}

.connector-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  border: 3px solid rgb(var(--v-theme-background));
  box-shadow: 0 0 0 2px rgb(var(--v-theme-primary));
  bottom: 0;
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    text-align: center;
  }

  .timeline-logo-placeholder {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  .timeline-title {
    font-size: 1.5rem;
  }

  .timeline-content {
    padding: 1.5rem;
  }

  .logo-placeholder {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
  }

  .timeline-connector {
    width: 20px;
  }

  .connector-dot {
    width: 14px;
    height: 14px;
  }
}
</style>
