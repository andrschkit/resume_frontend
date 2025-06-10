<template>
  <MenuComponent>
    <template #content>
      <div class="contacts-container">
        <div class="welcome-section">
          <h1 class="welcome-title">Контакты</h1>
          <p class="welcome-subtitle">Свяжитесь со мной через форму обратной связи или напрямую</p>
        </div>

        <div class="contacts-content">
          <!-- Контактная информация -->
          <div class="contact-info-card">
            <h2 class="contact-name">{{ fullName }}</h2>

            <div class="contact-details">
              <div class="contact-item">
                <v-icon class="contact-icon">mdi-phone</v-icon>
                <span>{{ contactData.phone }}</span>
              </div>
              <div class="contact-item">
                <v-icon class="contact-icon">mdi-email</v-icon>
                <span>{{ contactData.mail }}</span>
              </div>
              <div class="contact-item">
                <v-icon class="contact-icon">mdi-github</v-icon>
                <a :href="contactData.git" target="_blank">GitHub профиль</a>
              </div>
            </div>
          </div>

          <!-- Форма обратной связи -->
          <div class="feedback-form">
            <h2 class="form-title">
              <v-icon color="#6a5acd" large>mdi-email-edit</v-icon>
              Форма обратной связи
            </h2>

            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Ваше имя *</label>
                <input id="name" v-model="form.name" required type="text">
              </div>

              <div class="form-group">
                <label for="email">Ваш Email *</label>
                <input id="email" v-model="form.email" required type="email">
              </div>

              <div class="form-group">
                <label for="subject">Тема</label>
                <input id="subject" v-model="form.subject" type="text">
              </div>

              <div class="form-group">
                <label for="message">Сообщение *</label>
                <textarea id="message" v-model="form.message" required />
              </div>

              <button class="submit-btn" type="submit">Отправить сообщение</button>
            </form>
          </div>
        </div>
      </div>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';

  export default {
    name: 'Contacts',
    components: { MenuComponent },
    data () {
      return {
        contactData: {
          id: 1,
          first_name: 'Андрей',
          last_name: 'Щербаков',
          middle_name: 'Алексеевич',
          phone: '8-916-027-48-62',
          mail: 'andrschkit@gmail.com',
          git: 'https://github.com/andrschkit',
          photo_url: 'https://localhost:8080/userphoto.jpg',
        },
        form: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
      };
    },
    computed: {
      fullName () {
        return `${this.contactData.last_name} ${this.contactData.first_name} ${this.contactData.middle_name}`;
      },
    },
    methods: {
      submitForm () {
        // Здесь будет логика отправки формы
        alert('Форма отправлена!');
        // Сброс формы
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: '',
        };
      },
    },
  }
</script>

<style scoped>
.contacts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.welcome-title {
  color: #2c3e50;
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  color: #4a5b8d;
  font-size: 1.4rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.contacts-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .contacts-content {
    grid-template-columns: 1fr;
  }
}

.contact-info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
  border-top: 4px solid #6a5acd;
}

.contact-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1.5rem;
  border: 3px solid #6a5acd;
}

.contact-name {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.contact-details {
  text-align: left;
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.contact-icon {
  margin-right: 10px;
  color: #6a5acd;
}

.contact-item a {
  color: #6a5acd;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.feedback-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border-top: 4px solid #42b983;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #42b983;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

input, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s;
  color: black;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #6a5acd;
  box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.1);
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  background: #6a5acd;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: 600;
}

.submit-btn:hover {
  background: #5a4ab5;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.2rem;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
  }

  .contact-name {
    font-size: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .contact-item {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contacts-container {
    padding: 1.5rem 1rem;
  }

  .welcome-section {
    padding: 1.5rem;
  }

  .contact-info-card,
  .feedback-form {
    padding: 1.5rem;
  }
}
</style>
