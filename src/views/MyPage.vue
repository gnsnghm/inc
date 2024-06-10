<template>
  <div class="container">
    <div class="row justify-content-center">
        <div class="card" style="width: 25rem;margin:5rem;">
          <div class="card-body">
            <h3 class="card-title text-center">Register Incident</h3>
            <form @submit.prevent="registerIncident">
              <div class="mb-3">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" v-model="subject" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="occurrenceDate" class="form-label">Occurrence Date</label>
                <input type="date" v-model="occurrenceDate" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea v-model="content" class="form-control" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="threatType" class="form-label">Threat Type</label>
                <input type="text" v-model="threatType" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <input type="text" v-model="status" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Register Incident</button>
            </form>
          </div>
        </div>
      </div>
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
      const user = this.$cookies.get('user');
      if (!user) {
        alert('Please login first');
        this.$router.push('/');
        return;
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/incidents`, {
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
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 100%;
}
</style>
