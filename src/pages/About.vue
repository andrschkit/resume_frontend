<template>

  <div class="about-container">

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

            Руковожу отделом сопровождения IT-процессов: команда до 8 человек (системные администраторы,

            разработчики, DevOps). Выстраиваю процессы, KPI и документацию, внедряю CI/CD и микросервисную

            архитектуру.

          </p>

          <p>

            Совмещаю управленческую роль с технической экспертизой: Vue.js, Java/Spring Boot, PostgreSQL,

            Docker, GitLab CI/CD, self-hosting. Ранее — fullstack и инженер-программист (C++/Qt) в

            промышленности и оборонном секторе.

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

            <div class="contact-info">

              <div class="contact-item">

                <span class="icon">📱</span>

                <a class="contact-value contact-link" :href="`tel:${phoneHref(user.phone)}`">

                  {{ user.phone }}

                </a>

              </div>



              <div class="contact-item">

                <span class="icon">✉️</span>

                <a class="contact-value contact-link" :href="`mailto:${user.mail}`">

                  {{ user.mail }}

                </a>

              </div>



              <div class="contact-item">

                <span class="icon">🔗</span>

                <a class="contact-link" :href="user.git" rel="noopener noreferrer" target="_blank">

                  GitHub

                </a>

              </div>



              <div v-if="user.telegram" class="contact-item">

                <span class="icon">✈️</span>

                <a class="contact-link" :href="user.telegram" rel="noopener noreferrer" target="_blank">

                  Telegram

                </a>

              </div>



              <div v-if="user.vk" class="contact-item">

                <span class="icon">💬</span>

                <a class="contact-link" :href="user.vk" rel="noopener noreferrer" target="_blank">

                  ВКонтакте

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

  import PageHeader from '@/components/PageHeader.vue';

  import store from '@/plugins/store.js';

  import { mapGetters } from 'vuex';



  const HIGHLIGHTS = [

    { value: '8', label: 'человек в отделе' },

    { value: '3 дня', label: 'онбординг (было 2 нед.)' },

    { value: '−30%', label: 'затраты на почту и облако' },

    { value: '70%', label: 'заявок без 1-й линии' },

  ];



  export default {

    name: 'About',

    components: { PageHeader },

    data () {

      return { highlights: HIGHLIGHTS };

    },

    computed: {

      ...mapGetters('resume_store', { contacts: 'users_all' }),

    },

    mounted () {

      store.dispatch('resume_store/loadUsers');

    },

    methods: {

      phoneHref (phone) {

        return String(phone).replace(/\D/g, '');

      },

    },

  }

</script>



<style scoped>

.about-container {

  max-width: 1300px;

  margin: 0 auto;

  padding: 2rem;

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

  font-size: 1.1rem;

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

  display: flex;

  align-items: center;

  justify-content: center;

  background-color: rgba(var(--v-theme-info), 0.1) !important;

  border-radius: 12px;

  padding: 1.5rem;

}



.contact-info {

  display: flex;

  flex-wrap: wrap;

  align-items: center;

  justify-content: center;

}



.contact-item {

  display: flex;

  justify-content: center;

  align-items: center;

  min-width: 260px;

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

  color: rgb(var(--v-theme-primary));

  font-weight: 500;

  text-decoration: none;

  transition: all 0.3s ease;

}



.contact-link:hover {

  text-decoration: underline;

  opacity: 0.9;

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

