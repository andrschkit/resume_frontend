<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-window" role="dialog" aria-modal="true">
          <div class="modal-header">
            <div class="modal-title-block">
              <MdiIcon :icon="headerIcon" size="large" color="primary" />
              <div class="modal-title-text">
                <h3 class="modal-title">{{ title }}</h3>
                <p v-if="subtitle" class="modal-subtitle">{{ subtitle }}</p>
              </div>
            </div>
            <button class="modal-close" aria-label="Закрыть" @click="close">
              <MdiIcon icon="mdi-close" size="small" />
            </button>
          </div>

          <div class="modal-body">
            <div v-if="!safeImages.length" class="modal-empty">
              <MdiIcon icon="mdi-image-off" size="x-large" />
              <p>Скриншоты недоступны</p>
            </div>

            <div v-else class="gallery">
              <div class="gallery-main">
                <button
                  class="nav-btn"
                  :disabled="safeImages.length < 2"
                  aria-label="Предыдущий скриншот"
                  @click="prev"
                >
                  <MdiIcon icon="mdi-chevron-left" size="large" />
                </button>

                <div class="image-frame">
                  <div v-if="imageLoading" class="modal-loader">
                    <MdiIcon icon="mdi-loading" size="large" class="spin" />
                  </div>
                  <div v-if="imageError && !imageLoading" class="modal-error">
                    <MdiIcon icon="mdi-image-broken" size="x-large" />
                    <p>Не удалось загрузить изображение</p>
                  </div>
                  <img
                    v-show="!imageLoading && !imageError"
                    :src="activeImage"
                    :alt="title"
                    class="modal-image"
                    @load="onImageLoad"
                    @error="onImageError"
                  />
                </div>

                <button
                  class="nav-btn"
                  :disabled="safeImages.length < 2"
                  aria-label="Следующий скриншот"
                  @click="next"
                >
                  <MdiIcon icon="mdi-chevron-right" size="large" />
                </button>
              </div>

              <div v-if="safeImages.length > 1" class="thumbs">
                <button
                  v-for="(img, idx) in safeImages"
                  :key="img + idx"
                  class="thumb"
                  :class="{ 'thumb--active': idx === activeIndex }"
                  :aria-label="`Скриншот ${idx + 1}`"
                  @click="setActive(idx)"
                >
                  <img :src="img" :alt="`Скриншот ${idx + 1}`" @error="onThumbError" />
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <a
              v-if="activeImage && !imageError"
              :href="activeImage"
              target="_blank"
              rel="noopener noreferrer"
              class="modal-link"
            >
              <MdiIcon icon="mdi-open-in-new" size="small" />
              <span>Открыть скриншот</span>
            </a>
            <button class="modal-btn-close" @click="close">Закрыть</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import MdiIcon from '@/components/MdiIcon.vue';

export default {
  name: 'ProjectModal',
  components: { MdiIcon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Проект',
    },
    subtitle: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: () => [],
    },
    headerIcon: {
      type: String,
      default: 'mdi-eye',
    },
  },
  emits: ['close'],
  data () {
    return {
      activeIndex: 0,
      imageLoading: true,
      imageError: false,
    };
  },
  computed: {
    safeImages () {
      return (this.images || []).filter(Boolean);
    },
    activeImage () {
      return this.safeImages[this.activeIndex] || '';
    },
  },
  watch: {
    isOpen (val) {
      if (val) {
        this.resetState();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    images () {
      if (this.isOpen) {
        this.resetState();
      }
    },
  },
  beforeUnmount () {
    document.body.style.overflow = '';
  },
  methods: {
    resetState () {
      this.activeIndex = 0;
      this.imageLoading = true;
      this.imageError = false;
    },
    close () {
      this.$emit('close');
    },
    setActive (idx) {
      const safeIdx = Math.max(0, Math.min(idx, this.safeImages.length - 1));
      if (safeIdx === this.activeIndex) return;
      this.activeIndex = safeIdx;
      this.imageLoading = true;
      this.imageError = false;
    },
    prev () {
      if (this.safeImages.length < 2) return;
      const nextIdx = (this.activeIndex - 1 + this.safeImages.length) % this.safeImages.length;
      this.setActive(nextIdx);
    },
    next () {
      if (this.safeImages.length < 2) return;
      const nextIdx = (this.activeIndex + 1) % this.safeImages.length;
      this.setActive(nextIdx);
    },
    onImageLoad () {
      this.imageLoading = false;
    },
    onImageError () {
      this.imageLoading = false;
      this.imageError = true;
    },
    onThumbError (e) {
      e.target.style.display = 'none';
    },
  },
};
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
  max-width: 980px;
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
  min-width: 0;
}

.modal-title-text {
  min-width: 0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-text));
  margin: 0;
  line-height: 1.25;
}

.modal-subtitle {
  margin: 0.35rem 0 0;
  color: rgb(var(--v-theme-subtext));
  font-size: 0.95rem;
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
  transition: background 0.2s, color 0.2s;
}

.modal-close:hover {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
}

.modal-body {
  flex: 1;
  overflow: auto;
  padding: 1.25rem 1.5rem;
}

.modal-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: rgb(var(--v-theme-subtext));
  padding: 2rem 0;
  text-align: center;
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-main {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  gap: 0.75rem;
  align-items: center;
}

.nav-btn {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(var(--v-theme-border), 0.35);
  background: rgba(var(--v-theme-border), 0.12);
  color: rgb(var(--v-theme-text));
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.nav-btn:hover:enabled {
  background: rgba(var(--v-theme-primary), 0.12);
  transform: translateY(-1px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.image-frame {
  min-height: 220px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-border), 0.35);
  background: rgba(var(--v-theme-surface), 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
  text-align: center;
}

.thumbs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.thumb {
  padding: 0;
  border: 2px solid transparent;
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  width: 120px;
  height: 72px;
  transition: border-color 0.2s, transform 0.15s;
}

.thumb:hover {
  transform: translateY(-1px);
}

.thumb--active {
  border-color: rgba(var(--v-theme-primary), 0.8);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  transition: background 0.2s, border-color 0.2s;
}

.modal-btn-close:hover {
  background: rgba(var(--v-theme-border), 0.2);
  border-color: rgba(var(--v-theme-border), 0.7);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
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
  transition: transform 0.25s ease, opacity 0.25s ease;
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

  .gallery-main {
    grid-template-columns: 42px 1fr 42px;
  }

  .nav-btn {
    width: 42px;
    height: 42px;
    border-radius: 10px;
  }

  .thumb {
    width: 104px;
    height: 64px;
  }
}
</style>
