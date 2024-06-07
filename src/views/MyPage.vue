<template>
  <div>
    <h1>My Page</h1>
    <button @click="logout">Logout</button>
    <form @submit.prevent="registerIncident">
      <div>
        <label for="subject">Subject:</label>
        <input type="text" v-model="subject" required>
      </div>
      <div>
        <label for="occurrenceDate">Occurrence Date:</label>
        <input type="date" v-model="occurrenceDate" required>
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="content" required></textarea>
      </div>
      <div>
        <label for="threatType">Threat Type:</label>
        <input type="text" v-model="threatType" required>
      </div>
      <div>
        <label for="status">Status:</label>
        <input type="text" v-model="status" required>
      </div>
      <button type="submit">Register Incident</button>
    </form>
    <router-link to="/search">Search Incidents</router-link>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      subject: '',
      occurrenceDate: '',
      content: '',
      threatType: '',
      status: ''
    };
  },
  methods: {
    async registerIncident() {
      const user = this.$cookies.get('user'); // クッキーからユーザー情報を取得
      if (!user) {
        alert('Please login first');
        this.$router.push('/');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/incidents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            subject: this.subject,
            occurrenceDate: this.occurrenceDate,
            content: this.content,
            threatType: this.threatType,
            status: this.status
          })
        });
        const data = await response.json();
        if (data.success) {
          alert('Incident registered');
        } else {
          alert('Failed to register incident');
        }
      } catch (error) {
        alert('Failed to register incident');
      }
    },
    logout() {
      this.$store.dispatch('logout');
      this.$cookies.remove('user'); // クッキーからユーザー情報を削除
      this.$router.push('/');
    }
  }
};
</script>
