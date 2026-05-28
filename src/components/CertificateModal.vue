<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-window" role="dialog" aria-modal="true">
          <div class="modal-header">
            <div class="modal-title-block">
              <MdiIcon icon="mdi-certificate" size="large" color="primary" />
              <h3 class="modal-title">{{ title }}</h3>
            </div>
            <button class="modal-close" aria-label="Закрыть" @click="close">
              <MdiIcon icon="mdi-close" size="small" />
            </button>
          </div>

          <div class="modal-body">
            <div v-if="imageLoading" class="modal-loader">
              <MdiIcon icon="mdi-loading" size="large" class="spin" />
            </div>
            <div v-if="imageError && !imageLoading" class="modal-error">
              <MdiIcon icon="mdi-image-broken" size="x-large" />
              <p>Не удалось загрузить изображение</p>
            </div>
            <img
              v-show="!imageLoading && !imageError"
              :src="certificateUrl"
              :alt="title"
              class="modal-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>

          <div class="modal-footer">
            <a
              v-if="certificateUrl && !imageError"
              :href="certificateUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="modal-link"
            >
              <MdiIcon icon="mdi-open-in-new" size="small" />
              <span>Открыть в новой вкладке</span>
            </a>
            <button class="modal-btn-close" @click="close">Закрыть</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import MdiIcon from '@/components/MdiIcon.vue'

export default {
  name: 'CertificateModal',
  components: { MdiIcon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    certificateUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Сертификат',
    },
  },
  emits: ['close'],
  data() {
    return {
      imageLoading: true,
      imageError: false,
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.imageLoading = true
        this.imageError = false
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onImageLoad() {
      this.imageLoading = false
    },
    onImageError() {
      this.imageLoading = false
      this.imageError = true
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-window {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 860px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.3);
  flex-shrink: 0;
}

.modal-title-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-text));
  margin: 0;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(var(--v-theme-border), 0.2);
  color: rgb(var(--v-theme-subtext));
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.modal-close:hover {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
}

.modal-body {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  min-height: 200px;
}

.modal-image {
  max-width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary));
}

.modal-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: rgb(var(--v-theme-subtext));
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(var(--v-theme-border), 0.3);
  flex-shrink: 0;
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.2s;
}

.modal-link:hover {
  background: rgba(var(--v-theme-primary), 0.1);
}

.modal-btn-close {
  padding: 8px 20px;
  border: 1px solid rgba(var(--v-theme-border), 0.4);
  border-radius: 8px;
  background: transparent;
  color: rgb(var(--v-theme-text));
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.modal-btn-close:hover {
  background: rgba(var(--v-theme-border), 0.2);
  border-color: rgba(var(--v-theme-border), 0.7);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-window,
.modal-fade-leave-active .modal-window {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.modal-fade-enter-from .modal-window {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}

.modal-fade-leave-to .modal-window {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}

@media (max-width: 600px) {
  .modal-window {
    border-radius: 12px;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
  }
}
</style>
