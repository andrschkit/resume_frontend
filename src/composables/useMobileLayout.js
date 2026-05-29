import { onMounted, onUnmounted, ref } from 'vue'

import { MOBILE_BREAKPOINT } from '@/config/navigation'

export function useMobileLayout() {
  const isMobile = ref(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
  )

  const update = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isMobile }
}
