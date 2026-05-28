<template>
  <header :class="headerClasses">
    <h1 class="page-header__title">{{ title }}</h1>
    <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
    <div v-if="$slots.default" class="page-header__extra">
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'hero'].includes(value),
    },
  },
  computed: {
    headerClasses() {
      return ['page-header', this.variant === 'hero' && 'page-header--hero'].filter(Boolean)
    },
  },
}
</script>

<style scoped>
.page-header {
  margin-bottom: 2.5rem;
  padding: 1.25rem 0 1.5rem;
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.35);
}

.page-header__title {
  margin: 0;
  font-size: clamp(1.75rem, 3.5vw, 2.125rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: rgb(var(--v-theme-text));
}

.page-header__title::after {
  content: '';
  display: block;
  width: 2.5rem;
  height: 3px;
  margin-top: 0.75rem;
  border-radius: 2px;
  background: rgb(var(--v-theme-primary));
}

.page-header__subtitle {
  margin: 0.875rem 0 0;
  max-width: 40rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.55;
  color: rgb(var(--v-theme-subtext));
}

.page-header__extra {
  margin-top: 1.25rem;
}

.page-header--hero {
  text-align: center;
  padding-bottom: 2rem;
}

.page-header--hero .page-header__title {
  font-size: clamp(2rem, 10vw, 4rem);
  font-weight: 800;
  line-height: 1;
}

.page-header--hero .page-header__title::after {
  margin-left: auto;
  margin-right: auto;
}

.page-header--hero .page-header__subtitle {
  margin-left: auto;
  margin-right: auto;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
}

.page-header--hero .page-header__extra {
  display: flex;
  justify-content: center;
}

@media (max-width: 959px) {
  .page-header {
    margin-bottom: 1.25rem;
    padding: 0.75rem 0 1rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
  }
}
</style>
