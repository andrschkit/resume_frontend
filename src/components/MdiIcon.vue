<template>
  <span
    v-if="customSvgMarkup"
    :class="iconClasses"
    :style="iconStyle"
    aria-hidden="true"
    v-html="customSvgMarkup"
  />
  <span v-else :class="iconClasses" :style="iconStyle" aria-hidden="true" />
</template>

<script setup>
  import { computed } from 'vue'
  import mdiVk from '@/assets/mdi--vk.svg?raw'

  /** Иконки брендов, удалённые из @mdi/font (например mdi-vk — с v5.0.45) */
  const CUSTOM_SVG_ICONS = {
    'mdi-vk': mdiVk,
  }

  const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  })

  const iconName = computed(() =>
    props.icon.startsWith('mdi-') ? props.icon : `mdi-${props.icon}`,
  )

  const customSvgMarkup = computed(() => CUSTOM_SVG_ICONS[iconName.value] ?? null)

  const iconClasses = computed(() => {
    const sizeClass = props.size ? `mdi-icon--${props.size}` : ''

    if (customSvgMarkup.value) {
      return ['mdi-icon', 'mdi-icon--svg', sizeClass].filter(Boolean)
    }

    return ['mdi', iconName.value, 'mdi-icon', sizeClass].filter(Boolean)
  })

  const iconStyle = computed(() => (props.color ? { color: props.color } : undefined))
</script>

<style scoped>
.mdi-icon {
  display: inline-flex;
  line-height: 1;
  font-size: 24px;
}

.mdi-icon--small {
  font-size: 18px;
}

.mdi-icon--large {
  font-size: 36px;
}

.mdi-icon--x-large {
  font-size: 48px;
}

.mdi-icon--svg {
  flex-shrink: 0;
  line-height: 0;
}

.mdi-icon--svg :deep(svg) {
  display: block;
  width: 1em;
  height: 1em;
}
</style>
