<template>
  <div class="contacts-container page-container">
    <PageHeader
      subtitle="Телефон, почта и мессенджеры — для HR или сотрудничества"
      title="Связаться со мной"
    />

    <div v-if="user" class="contacts-card">
      <div class="profile-block">
        <div class="avatar-wrap">
          <img
            v-if="showPhoto"
            :alt="fullName"
            class="avatar"
            :src="user.photo_url"
            @error="showPhoto = false"
          />
          <div v-else class="avatar-placeholder">
            <MdiIcon icon="mdi-account" size="large" />
          </div>
        </div>
        <h2 class="profile-name">{{ fullName }}</h2>
        <p class="profile-role">Руководитель IT-проектов · Москва</p>
      </div>

      <div class="channels-grid">
        <a
          v-for="channel in channels"
          :key="channel.id"
          class="channel-card"
          :href="channel.href"
          :rel="channel.external ? 'noopener noreferrer' : undefined"
          :target="channel.external ? '_blank' : undefined"
        >
          <div class="channel-icon">
            <MdiIcon :icon="channel.icon" size="large" />
          </div>
          <div class="channel-body">
            <span class="channel-label">{{ channel.label }}</span>
            <span class="channel-value">{{ channel.value }}</span>
          </div>
          <MdiIcon class="channel-arrow" icon="mdi-chevron-right" size="small" />
        </a>
      </div>
    </div>

    <p v-else-if="loadError" class="contacts-status contacts-status--error">
      Не удалось загрузить контакты. Убедитесь, что бэкенд запущен.
    </p>
    <p v-else class="contacts-status">Загрузка контактов…</p>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import store from '@/plugins/store.js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Contacts',
  components: { PageHeader },
  data() {
    return { showPhoto: true }
  },
  computed: {
    ...mapGetters('resume_store', { users: 'users_all' }),
    ...mapState('resume_store', { loadError: 'error' }),
    user() {
      return this.users[0] || null
    },
    fullName() {
      if (!this.user) return ''
      const { last_name, first_name, middle_name } = this.user
      return [last_name, first_name, middle_name].filter(Boolean).join(' ')
    },
    channels() {
      if (!this.user) return []

      const u = this.user
      const items = [
        {
          id: 'phone',
          label: 'Телефон',
          value: u.phone,
          href: u.phone ? `tel:${this.phoneHref(u.phone)}` : null,
          icon: 'mdi-phone',
          external: false,
        },
        {
          id: 'mail',
          label: 'Email',
          value: u.mail,
          href: u.mail ? `mailto:${u.mail}` : null,
          icon: 'mdi-email',
          external: false,
        },
        {
          id: 'telegram',
          label: 'Telegram',
          value: this.formatTelegram(u.telegram),
          href: u.telegram,
          icon: 'mdi-send',
          external: true,
        },
        {
          id: 'vk',
          label: 'ВКонтакте',
          value: this.formatVk(u.vk),
          href: u.vk,
          icon: 'mdi-vk',
          external: true,
        },
        {
          id: 'git',
          label: 'GitHub',
          value: this.formatGitHub(u.git),
          href: u.git,
          icon: 'mdi-github',
          external: true,
        },
      ]

      return items.filter((item) => item.href && item.value)
    },
  },
  mounted() {
    store.dispatch('resume_store/loadUsers')
  },
  methods: {
    phoneHref(phone) {
      return String(phone).replace(/\D/g, '')
    },
    formatTelegram(url) {
      if (!url) return ''
      const match = String(url).match(/t\.me\/([^/?#]+)/i)
      return match ? `@${match[1]}` : url
    },
    formatVk(url) {
      if (!url) return ''
      try {
        return new URL(url).pathname.replace(/^\//, '')
      } catch {
        return url
      }
    },
    formatGitHub(url) {
      if (!url) return ''
      try {
        const host = new URL(url).hostname.replace(/^www\./, '')
        return `${host}${new URL(url).pathname}`.replace(/\/$/, '')
      } catch {
        return url
      }
    },
  },
}
</script>

<style scoped>
.contacts-container {
  width: 100%;
}

.contacts-card {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.3);
  border-radius: var(--radius-card);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  transition: transform 0.3s ease;
}

.contacts-card:hover {
  transform: translateY(-3px);
}

.profile-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.35);
}

.avatar-wrap {
  margin-bottom: 1.25rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(var(--v-theme-primary), 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4b6cb7);
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.profile-name {
  margin: 0 0 0.5rem;
  font-size: var(--fs-section-title);
  font-weight: 600;
  color: rgb(var(--v-theme-text));
}

.profile-role {
  margin: 0;
  font-size: var(--fs-body);
  color: rgb(var(--v-theme-subtext));
}

.channels-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.channel-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: rgba(var(--v-theme-background), 0.5);
  border: 1px solid rgba(var(--v-theme-border), 0.25);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
}

.channel-card:hover {
  background: rgba(var(--v-theme-primary), 0.08);
  border-color: rgba(var(--v-theme-primary), 0.35);
  transform: translateX(6px);
}

.channel-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #4b6cb7);
  color: white;
}

.channel-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.channel-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgb(var(--v-theme-subtext));
}

.channel-value {
  font-size: var(--fs-body);
  font-weight: 500;
  color: rgb(var(--v-theme-text));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.channel-arrow {
  flex-shrink: 0;
  color: rgb(var(--v-theme-primary));
  opacity: 0.6;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.channel-card:hover .channel-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.contacts-status {
  text-align: center;
  padding: 2rem;
  color: rgb(var(--v-theme-subtext));
}

.contacts-status--error {
  color: #e57373;
}

@media (max-width: 768px) {
  .contacts-card {
    padding: 1.75rem 1.25rem;
  }

  .profile-name {
    font-size: clamp(1.35rem, 1.2rem + 0.95vw, 1.65rem);
  }

  .channel-card {
    padding: 1rem 1.15rem;
    gap: 1rem;
  }

  .channel-icon {
    width: 46px;
    height: 46px;
  }

  .channel-value {
    font-size: 1rem;
    white-space: normal;
  }
}
</style>
