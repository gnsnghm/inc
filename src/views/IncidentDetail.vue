<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Incident Detail</h3>
            <div v-if="incident">
              <p><strong>Subject:</strong> {{ incident.subject }}</p>
              <p><strong>Occurrence Date:</strong> {{ incident.occurrence_date }}</p>
              <p><strong>Content:</strong> {{ incident.content }}</p>
              <p><strong>Threat Type:</strong> {{ incident.threat_type }}</p>
              <p><strong>Status:</strong> {{ incident.status }}</p>
              <h4 class="mt-4">Updates</h4>
              <ul class="list-group list-group-flush">
                <li v-for="update in incident.updates" :key="update.id" class="list-group-item">{{ update.update_content }}</li>
              </ul>
              <form @submit.prevent="addUpdate" class="mt-3">
                <div class="mb-3">
                  <label for="updateContent" class="form-label">Update Content</label>
                  <textarea v-model="updateContent" class="form-control" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100">Add Update</button>
              </form>
              <button @click="deleteIncident" class="btn btn-danger w-100 mt-3">Delete Incident</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncidentDetail',
  data() {
    return {
      incident: null,
      updateContent: ''
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/incidents/${id}`);
      this.incident = await response.json();
    } catch (error) {
      alert('Failed to load incident');
    }
  },
  methods: {
    async addUpdate() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/incidents/${id}/updates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updateContent: this.updateContent })
        });
        const data = await response.json();
        if (data.success) {
          this.incident.updates.push(data.update);
          this.updateContent = '';
        } else {
          alert('Failed to add update');
        }
      } catch (error) {
        alert('Failed to add update');
      }
    },
    async deleteIncident() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/incidents/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          this.$router.push('/search');
        } else {
          alert('Failed to delete incident');
        }
      } catch (error) {
        alert('Failed to delete incident');
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 20px;
}
</style>
