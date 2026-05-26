<template>
  <div class="career-container">
    <PageHeader
      subtitle="Мой опыт работы и образования"
      title="Профессиональный путь"
    />

    <div class="timeline">
      <div v-for="(item, index) in work_places" :key="item.id" class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-logo-placeholder">
              <div class="logo-placeholder">
                <span>{{ item.name.charAt(0) }}</span>
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
            <p>{{ item.description }}</p>
          </div>
        </div>
        <div v-if="index < work_places.length - 1" class="timeline-connector">
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
    },
    mounted () {
      store.dispatch('resume_store/loadWorkPlaces');
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
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
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
  background: linear-gradient(135deg, #42b983, #3498db);
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
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.timeline-interval {
  display: flex;
  align-items: center;
  color: #42b983;
  font-weight: 500;
  font-size: 1.1rem;
}

.timeline-interval .mdi-icon {
  margin-right: 8px;
  color: #42b983;
}

.timeline-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #3a506b;
  padding: 0 0.5rem;
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
  background: #3498db;
}

.connector-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #42b983;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #42b983;
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
