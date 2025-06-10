<template>
  <MenuComponent>
    <template #content>
      <div class="education-container">
        <div class="welcome-section">
          <h1 class="welcome-title">Мое образование</h1>
          <p class="welcome-subtitle">Учебные заведения и курсы повышения квалификации</p>
        </div>

        <div class="education-grid">
          <div v-for="item in educationPlaces" :key="item.id" class="education-card">
            <div class="education-header">
              <div class="education-logo">
                <div class="logo-placeholder">
                  <v-icon color="white" large>mdi-school</v-icon>
                </div>
              </div>
              <div class="education-info">
                <h2 class="education-title">{{ item.name }}</h2>
                <div class="education-interval">
                  <v-icon small>mdi-calendar</v-icon>
                  <span>{{ item.interval }}</span>
                </div>
              </div>
            </div>

            <div class="education-description">
              <p>{{ item.description }}</p>
            </div>

            <div class="education-footer">
              <div class="education-badge">
                <v-icon small>mdi-certificate</v-icon>
                <span>Диплом/Сертификат</span>
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
    name: 'Education',
    components: { MenuComponent },
    computed: {
      ...mapGetters('resume_store', { educationPlaces: 'education_places_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadEducationPlaces');
    },
  }
</script>

<style scoped>
.education-container {
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

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.education-card {
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

.education-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(106, 90, 205, 0.2);
}

.education-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.education-logo {
  margin-right: 1.5rem;
}

.logo-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a5acd, #4b6cb7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 15px rgba(106, 90, 205, 0.3);
}

.education-info {
  flex: 1;
}

.education-title {
  color: #2c3e50;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.education-interval {
  display: flex;
  align-items: center;
  color: #6a5acd;
  font-weight: 500;
  font-size: 1.1rem;
}

.education-interval .v-icon {
  margin-right: 8px;
  color: #6a5acd;
}

.education-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #3a506b;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  padding: 0 0.5rem;
}

.education-footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.education-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(106, 90, 205, 0.1);
  color: #6a5acd;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.education-badge .v-icon {
  margin-right: 6px;
}

@media (max-width: 900px) {
  .education-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

  .education-header {
    flex-direction: column;
    text-align: center;
  }

  .education-logo {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  .education-title {
    font-size: 1.5rem;
  }

  .education-card {
    padding: 1.5rem;
  }

  .logo-placeholder {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .education-grid {
    grid-template-columns: 1fr;
  }

  .welcome-section {
    padding: 1.5rem;
  }
}
</style>
