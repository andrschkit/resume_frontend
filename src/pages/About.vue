<template>
  <div class="about-container page-container">
    <PageHeader
      subtitle="Управление IT-проектами, автоматизация, микросервисы и fullstack-разработка"
      title="Руководитель IT-проектов"
      variant="hero"
    >
      <p class="hero-location">Москва</p>
    </PageHeader>

    <div class="about-content">
      <div class="about-card">
        <h2 class="section-title">Обо мне</h2>

        <div class="bio-section">
          <p>
            Руковожу отделом сопровождения IT-процессов: команда до 8 человек (системные
            администраторы, разработчики, DevOps). Выстраиваю процессы, KPI и документацию, внедряю
            CI/CD и микросервисную архитектуру.
          </p>

          <p>
            Совмещаю управленческую роль с технической экспертизой: Vue.js, Java/Spring Boot,
            PostgreSQL, Docker, GitLab CI/CD, self-hosting. Ранее — fullstack и инженер-программист
            (C++/Qt) в промышленности и оборонном секторе.
          </p>
        </div>

        <div class="highlights">
          <div v-for="item in highlights" :key="item.label" class="highlight-card">
            <span class="highlight-value">{{ item.value }}</span>

            <span class="highlight-label">{{ item.label }}</span>
          </div>
        </div>

        <div v-for="user in contacts" :key="user.id" class="user-card">
          <div class="contact-section">
            <h3 class="contact-title">Контактные данные</h3>

            <div class="contact-grid">
              <a class="contact-item contact-link-card" :href="`tel:${phoneHref(user.phone)}`">
                <span class="contact-icon-wrap">
                  <MdiIcon icon="mdi-phone" size="small" />
                </span>
                <span class="contact-content">
                  <span class="contact-label">Телефон</span>
                  <span class="contact-value">{{ user.phone }}</span>
                </span>
              </a>

              <a class="contact-item contact-link-card" :href="`mailto:${user.mail}`">
                <span class="contact-icon-wrap">
                  <MdiIcon icon="mdi-email-outline" size="small" />
                </span>
                <span class="contact-content">
                  <span class="contact-label">Email</span>
                  <span class="contact-value">{{ user.mail }}</span>
                </span>
              </a>

              <a
                class="contact-item contact-link-card"
                :href="user.git"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span class="contact-icon-wrap">
                  <MdiIcon icon="mdi-github" size="small" />
                </span>
                <span class="contact-content">
                  <span class="contact-label">GitHub</span>
                  <span class="contact-value">Профиль</span>
                </span>
              </a>

              <a
                v-if="user.telegram"
                class="contact-item contact-link-card"
                :href="user.telegram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span class="contact-icon-wrap">
                  <MdiIcon icon="mdi-send" size="small" />
                </span>
                <span class="contact-content">
                  <span class="contact-label">Telegram</span>
                  <span class="contact-value">Написать</span>
                </span>
              </a>

              <a
                v-if="user.vk"
                class="contact-item contact-link-card"
                :href="user.vk"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span class="contact-icon-wrap">
                  <MdiIcon icon="mdi-vk" size="small" />
                </span>
                <span class="contact-content">
                  <span class="contact-label">ВКонтакте</span>
                  <span class="contact-value">Профиль</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

import store from '@/plugins/store.js'

import { mapGetters } from 'vuex'

const HIGHLIGHTS = [
  { value: '8', label: 'человек в отделе' },

  { value: '3 дня', label: 'онбординг (было 2 нед.)' },

  { value: '−30%', label: 'затраты на почту и облако' },

  { value: '70%', label: 'заявок без 1-й линии' },
]

export default {
  name: 'About',

  components: { PageHeader },

  data() {
    return { highlights: HIGHLIGHTS }
  },

  computed: {
    ...mapGetters('resume_store', { contacts: 'users_all' }),
  },

  mounted() {
    store.dispatch('resume_store/loadUsers')
  },

  methods: {
    phoneHref(phone) {
      return String(phone).replace(/\D/g, '')
    },
  },
}
</script>

<style scoped>
.about-container {
  width: 100%;
}

.hero-location {
  margin: 0.5rem 0 0;

  font-size: 1rem;

  color: rgb(var(--v-theme-subtext));
}

.about-content {
  display: flex;

  gap: 2rem;
}

.about-card {
  flex: 1;

  background-color: rgba(var(--v-theme-surface), 0.1) !important;

  border-radius: var(--radius-card);

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  padding: 1.5rem;

  transition: transform 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
}

.section-title {
  color: rgb(var(--v-theme-text)) !important;

  font-size: var(--fs-section-title);

  margin-bottom: 1.5rem;

  padding-bottom: 0.8rem;

  border-bottom: 2px solid rgb(var(--v-theme-primary));
}

.user-card {
  display: flex;

  flex-direction: column;
}

.bio-section {
  margin-bottom: 2rem;
}

.bio-section p {
  font-size: var(--fs-body);

  line-height: 1.8;

  color: rgb(var(--v-theme-subtext)) !important;

  margin-bottom: 1.2rem;

  text-align: justify;
}

.highlights {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));

  gap: 1rem;

  margin-bottom: 2.5rem;
}

.highlight-card {
  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;

  padding: 1.25rem 1rem;

  border-radius: 12px;

  background: rgba(var(--v-theme-primary), 0.08);

  border: 1px solid rgba(var(--v-theme-primary), 0.15);

  transition: transform 0.2s ease;
}

.highlight-card:hover {
  transform: translateY(-3px);
}

.highlight-value {
  font-size: 1.75rem;

  font-weight: 700;

  color: rgb(var(--v-theme-primary));

  line-height: 1.2;
}

.highlight-label {
  margin-top: 0.35rem;

  font-size: 0.85rem;

  color: rgb(var(--v-theme-subtext));

  line-height: 1.3;
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
  font-size: 1.8rem;

  font-weight: 600;

  color: rgb(var(--v-theme-text)) !important;
}

.contact-section {
  background-color: rgba(var(--v-theme-info), 0.1) !important;

  border-radius: 12px;
}

.contact-title {
  margin: 0 0 1rem;

  font-size: 1.15rem;

  font-weight: 600;

  color: rgb(var(--v-theme-text));
}

.contact-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  gap: 0.9rem;
}

.contact-item {
  display: flex;

  align-items: center;

  padding: 0.9rem 1rem;

  background: rgba(var(--v-theme-background), 0.5) !important;

  border-radius: 10px;

  border: 1px solid rgba(var(--v-theme-primary), 0.08);

  transition: all 0.25s ease;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contact-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);

  transform: translateY(-2px);

  border-color: rgba(var(--v-theme-primary), 0.2);
}

.contact-icon-wrap {
  width: 36px;

  height: 36px;

  flex-shrink: 0;

  margin-right: 0.8rem;

  border-radius: 50%;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  color: rgb(var(--v-theme-primary));

  background: rgba(var(--v-theme-primary), 0.12);
}

.contact-content {
  display: flex;

  flex-direction: column;

  min-width: 0;
}

.contact-label {
  font-size: 0.8rem;

  color: rgb(var(--v-theme-subtext));

  line-height: 1.2;

  margin-bottom: 0.2rem;
}

.contact-value {
  font-size: var(--fs-body);

  color: rgb(var(--v-theme-text)) !important;

  font-weight: 600;

  word-break: break-word;
}

.contact-link-card {
  text-decoration: none;

  color: inherit;
}

@media (max-width: 959px) {
  .contact-item {
    min-width: 0;
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .user-name {
    font-size: 1.5rem;
  }

  .highlights {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
