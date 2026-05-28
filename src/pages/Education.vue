<template>
  <div class="education-container">
    <PageHeader
      subtitle="Учебные заведения и курсы повышения квалификации"
      title="Моё образование"
    />

    <div class="education-grid">
      <div v-for="item in educationPlaces" :key="item.id" class="education-card">
        <div class="education-header">
          <div class="education-logo">
            <div class="logo-placeholder">
              <MdiIcon color="white" icon="mdi-school" size="large" />
            </div>
          </div>
          <div class="education-info">
            <h2 class="education-title">{{ item.name }}</h2>
            <div class="education-interval">
              <MdiIcon icon="mdi-calendar" size="small" />
              <span>{{ item.interval }}</span>
            </div>
          </div>
        </div>

        <div class="education-description">
          <p>{{ item.description }}</p>
        </div>

        <div class="education-footer">
          <div
            class="education-badge"
            :class="{ 'education-badge--clickable': item.certificateUrl }"
            role="button"
            tabindex="0"
            @click="item.certificateUrl && openModal(item)"
            @keydown.enter="item.certificateUrl && openModal(item)"
            @keydown.space.prevent="item.certificateUrl && openModal(item)"
          >
            <MdiIcon icon="mdi-certificate" size="small" />
            <span>Диплом/Сертификат</span>
          </div>
        </div>
      </div>
    </div>

    <CertificateModal
      :is-open="modalOpen"
      :certificate-url="selectedItem && selectedItem.certificateUrl"
      :title="selectedItem && selectedItem.name"
      @close="closeModal"
    />
  </div>
</template>

<script>
  import CertificateModal from '@/components/CertificateModal.vue';
  import MdiIcon from '@/components/MdiIcon.vue';
  import MenuComponent from '@/components/MenuComponent.vue';
  import PageHeader from '@/components/PageHeader.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Education',
    components: { MenuComponent, PageHeader, MdiIcon, CertificateModal },
    data () {
      return {
        modalOpen: false,
        selectedItem: null,
      };
    },
    computed: {
      ...mapGetters('resume_store', { educationPlaces: 'education_places_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadEducationPlaces');
    },
    methods: {
      openModal (item) {
        this.selectedItem = item;
        this.modalOpen = true;
      },
      closeModal () {
        this.modalOpen = false;
        this.selectedItem = null;
      },
    },
  }
</script>

<style scoped>
.education-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.education-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-top: 4px solid rgb(var(--v-theme-primary));
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(var(--v-theme-primary), 0.12);
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
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4b6cb7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.25);
}

.education-info {
  flex: 1;
}

.education-title {
  color: rgb(var(--v-theme-text));
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.education-interval {
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
  font-size: 1.1rem;
}

.education-interval .mdi-icon {
  margin-right: 8px;
  color: rgb(var(--v-theme-primary));
}

.education-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-subtext));
  margin-bottom: 1.5rem;
  flex-grow: 1;
  padding: 0 0.5rem;
}

.education-footer {
  border-top: 1px solid rgba(var(--v-theme-border), 0.35);
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.education-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.education-badge .mdi-icon {
  margin-right: 6px;
}

.education-badge--clickable {
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.education-badge--clickable:hover {
  background: rgba(var(--v-theme-primary), 0.12);
  transform: translateY(-1px);
}

.education-badge--clickable:focus-visible {
  outline: 2px solid rgba(var(--v-theme-primary), 0.5);
  outline-offset: 2px;
}

@media (max-width: 959px) {
  .education-container {
    padding: 0;
  }
}

@media (max-width: 900px) {
  .education-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
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

}
</style>
