<template>
  <v-app>
    <MenuComponent
      :active-section="activeSection"
      :menu="menuItems"
      @scroll-to="scrollTo"
    >
      <template #content>
        <v-main>
          <!-- Используем route в качестве id -->
          <section v-for="(item, index) in menuItems" :id="item.route" :key="index" class="page-section">
            <component :is="getComponent(item.route)" />
          </section>
        </v-main>
      </template>
    </MenuComponent>
  </v-app>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  // Импорты компонентов
  import About from '@/pages/About.vue';
  import Education from '@/pages/Education.vue';
  import Career from '@/pages/Career.vue';
  import Portfolio from '@/pages/Portfolio.vue';
  import Skills from '@/pages/Skills.vue';
  import Contacts from '@/pages/Contacts.vue';
  import Tools from '@/pages/Tools.vue';

  import MenuComponent from '@/components/MenuComponent.vue';

  // Импорт иконок
  import addressCard from '@/assets/address-card.svg';
  import educationIcon from '@/assets/graduation-hat-alt.svg';
  import careerIcon from '@/assets/career.svg';
  import portfolioIcon from '@/assets/folder-user.svg';
  import skillsIcon from '@/assets/skills.svg';
  import contactsIcon from '@/assets/pen.svg';
  import toolsIcon from '@/assets/tools.svg';

  const router = useRouter();
  const route = useRoute();
  const activeSection = ref('');
  const scrollTimeout = ref(null);

  const menuItems = ref([
    { route: 'about', title: 'Обо мне', icon: addressCard },
    { route: 'education', title: 'Образование', icon: educationIcon },
    { route: 'career', title: 'Карьера', icon: careerIcon },
    { route: 'portfolio', title: 'Портфолио', icon: portfolioIcon },
    { route: 'skills', title: 'Навыки', icon: skillsIcon },
    { route: 'contacts', title: 'Контакты', icon: contactsIcon },
    { route: 'tools', title: 'Инструменты', icon: toolsIcon },
  ]);

  // Функция для получения компонента по route
  const getComponent = routeName => {
    switch (routeName) {
      case 'about': return About;
      case 'education': return Education;
      case 'career': return Career;
      case 'portfolio': return Portfolio;
      case 'skills': return Skills;
      case 'contacts': return Contacts;
      case 'tools': return Tools;
      default: return null;
    }
  };
  // Функция для определения активной секции
  const updateActiveSection = () => {
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
      const sections = menuItems.value.map(item => document.getElementById(item.route));
      const scrollPosition = window.scrollY + 600; // Смещение для учета шапки

      for (const section of sections) {
        if (!section) continue;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          activeSection.value = section.id;
          break;
        }
      }
    }, 5);
  };
  // Прокрутка при клике
  const scrollTo = id => {
    router.push({ hash: `#${id}` });
  };

  // Функция для плавной прокрутки
  const scrollToElement = id => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  // Обработчик изменений URL
  watch(() => route.hash, newHash => {
    if (newHash) {
      const id = newHash.substring(1);
      scrollToElement(id);
    }
  });

  // Инициализация при загрузке
  onMounted(() => {
    // Обработка начального хэша
    if (route.hash) {
      setTimeout(() => scrollToElement(route.hash.substring(1)), 100);
    }

    // Обработчик для корректной работы при прямом переходе по ссылке
    window.addEventListener('load', () => {
      if (route.hash) {
        scrollToElement(route.hash.substring(1));
      }
    });
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Инициализация при загрузке
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateActiveSection);
    clearTimeout(scrollTimeout.value);
  });
</script>

<style scoped>
.page-section {
  min-height: 100vh;
  padding: 24px;
  border-bottom: 1px solid black;
}

/* Для плавной прокрутки */
html {
  scroll-behavior: smooth;
}
</style>
