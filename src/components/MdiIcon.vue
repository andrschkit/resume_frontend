<template>
  <span :class="iconClasses" :style="iconStyle" aria-hidden="true" />
</template>

<script setup>
  import { computed } from 'vue'

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

  const iconClasses = computed(() => {
    const name = props.icon.startsWith('mdi-') ? props.icon : `mdi-${props.icon}`
    const sizeClass = props.size ? `mdi-icon--${props.size}` : ''

    return ['mdi', name, 'mdi-icon', sizeClass].filter(Boolean)
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
</style>
