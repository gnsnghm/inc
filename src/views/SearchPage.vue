<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <!-- Search Form Card -->
        <div class="card mb-3">
          <div class="card-body">
            <h3 class="card-title text-center">Search Incidents</h3>
            <form @submit.prevent="search">
              <div class="mb-3">
                <label for="searchQuery" class="form-label">Search by Subject</label>
                <input type="text" v-model="searchQuery" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Search</button>
            </form>
            <ul class="list-group list-group-flush mt-3">
              <li v-for="incident in incidents" :key="incident.id" class="list-group-item">
                <router-link :to="'/incident/' + incident.id">{{ incident.subject }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- All Incidents Card -->
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">All Incidents</h3>
            <ul class="list-group list-group-flush mt-3">
              <li v-for="incident in allIncidents" :key="incident.id" class="list-group-item">
                <router-link :to="'/incident/' + incident.id">{{ incident.subject }}</router-link>
                脅威レベル：{{incident.threat_type}} / 状況：{{incident.status}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      searchQuery: '',
      incidents: [],
      allIncidents: []
    };
  },
  async created() {
    await this.fetchAllIncidents();
  },
  methods: {
    async search() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/incidents?subject=${this.searchQuery}`);
        this.incidents = await response.json();
      } catch (error) {
        alert('Failed to search incidents');
      }
    },
    async fetchAllIncidents() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/incidents`);
        this.allIncidents = await response.json();
      } catch (error) {
        alert('Failed to fetch all incidents');
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
