<template>
  <MenuComponent>
    <template #content>
      <div class="career-container">
        <div class="welcome-section">
          <h1 class="welcome-title">Профессиональный путь</h1>
          <p class="welcome-subtitle">Мой опыт работы и образования</p>
        </div>

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
                    <v-icon small>mdi-calendar</v-icon>
                    <span>{{ item.interval }}</span>
                  </div>
                </div>
              </div>

              <div class="timeline-description">
                <p>{{ item.description }}</p>
              </div>

              <div v-if="index < work_places.length - 1" class="timeline-connector">
                <div class="connector-line" />
                <div class="connector-dot" />
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
    name: 'Career',
    components: { MenuComponent },
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

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f7ff 0%, #e1eeff 100%);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.welcome-title {
  color: #2c3e50;
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  color: #4a6b8d;
  font-size: 1.4rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #42b983, #3498db);
  border-radius: 2px;
}

.timeline-item {
  margin-bottom: 3rem;
  position: relative;
}

.timeline-content {
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

.timeline-interval .v-icon {
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
  left: -30px;
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
  .welcome-title {
    font-size: 2.2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

  .timeline {
    padding-left: 20px;
  }

  .timeline::before {
    width: 3px;
    left: -1px;
  }

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
    left: -20px;
    width: 20px;
  }

  .connector-dot {
    width: 14px;
    height: 14px;
  }
}
</style>
