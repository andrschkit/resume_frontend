<template>
  <div class="about-container">
    <div class="welcome-section">
      <h1 class="welcome-title">Добро пожаловать в мое резюме!</h1>
      <p class="welcome-subtitle">Здесь вы найдёте информацию о моих навыках, опыте и профессиональных достижениях</p>
    </div>

    <div class="about-content">
      <div class="about-card">
        <h2 class="section-title">Обо мне</h2>
        <div class="bio-section">
          <p>Я frontend-разработчик с опытом создания современных веб-приложений. Специализируюсь на Vue.js, люблю создавать интерактивные и отзывчивые интерфейсы. В свободное время изучаю новые технологии и улучшаю свои навыки.</p>
          <p>Мой подход к работе сочетает внимание к деталям, стремление к чистому коду и ориентацию на потребности пользователей. Верю, что хороший интерфейс должен быть не только красивым, но и функциональным.</p>
        </div>

        <div v-for="user in contacts" :key="user.id" class="user-card">
          <div class="user-header">
            <div class="user-name">
              {{ user.last_name }} {{ user.first_name }} {{ user.middle_name }}
            </div>
          </div>

          <div class="contact-section">
            <div class="contact-info">
              <div class="contact-item">
                <span class="icon">📱</span>
                <span class="contact-value">{{ user.phone }}</span>
              </div>

              <div class="contact-item">
                <span class="icon">✉️</span>
                <span class="contact-value">{{ user.mail }}</span>
              </div>

              <div class="contact-item">
                <span class="icon">🔗</span>
                <a class="contact-link" :href="user.git" target="_blank">
                  Мой GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  export default {
    name: 'About',
    components: { MenuComponent },
    computed: {
      ...mapGetters('resume_store', { contacts: 'users_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadUsers');
    },
  }
</script>

<style scoped>
.about-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: rgba(var(--v-theme-primary), 0.1) !important;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.welcome-title {
  color: rgb(var(--v-theme-text)) !important;
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  color: rgb(var(--v-theme-text)) !important;
  font-size: 1.4rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.about-content {
  display: flex;
  gap: 2rem;
}

.about-card {
  flex: 1;
  background-color: rgba(var(--v-theme-surface), 0.1) !important;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  transition: transform 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
}

.section-title {
  color: rgb(var(--v-theme-text)) !important;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #42b983;
}

.bio-section {
  margin-bottom: 2.5rem;
}

.bio-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-subtext)) !important;
  margin-bottom: 1.2rem;
  text-align: justify;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: rgba(var(--v-theme-info), 0.1) !important;
  border-radius: 12px;
}

.user-name {
  margin-left: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--v-theme-text)) !important;
}

.contact-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--v-theme-info), 0.1) !important;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.contact-info {
  display: flex;
  flex-direction: row;
}

.contact-item {
  display: flex;
  align-items: center;
  margin: 1rem 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(var(--v-theme-background), 0.5) !important;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contact-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  transform: translateX(5px);
}

.icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  min-width: 30px;
  text-align: center;
}

.contact-value {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-text)) !important;
  font-weight: 500;
}

.contact-link {
  font-size: 1.2rem;
  color: #42b983;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #349e6e;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .welcome-title {
    font-size: 2.2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

  .user-header {
    flex-direction: column;
    text-align: center;
  }

  .user-photo {
    margin-bottom: 1.5rem;
  }

  .user-name {
    margin-left: 0;
    font-size: 1.5rem;
  }
}
</style>
