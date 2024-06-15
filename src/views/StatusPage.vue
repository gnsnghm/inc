<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="card mb-3">
          <div class="card-body">
            <h3 class="card-title text-center">Manage Statuses</h3>
            <form @submit.prevent="addStatus">
              <div class="mb-3">
                <label for="newStatus" class="form-label">Add New Status</label>
                <input type="text" v-model="newStatus" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Add Status</button>
            </form>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Existing Statuses</h3>
            <ul class="list-group list-group-flush mt-3">
              <li v-for="status in statuses" :key="status.id" class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                  <input type="text" v-model="status.name" class="form-control" @change="updateStatus(status)" />
                  <button @click="deleteStatus(status.id)" class="btn btn-danger ml-2">Delete</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusPage',
  data() {
    return {
      newStatus: '',
      statuses: []
    };
  },
  async created() {
    await this.fetchStatuses();
  },
  methods: {
    async fetchStatuses() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/statuses`);
        this.statuses = await response.json();
      } catch (error) {
        alert('Failed to fetch statuses');
      }
    },
    async addStatus() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/statuses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.newStatus })
        });
        const data = await response.json();
        if (data.success) {
          this.statuses.push(data.status);
          this.newStatus = '';
        } else {
          alert('Failed to add status');
        }
      } catch (error) {
        alert('Failed to add status');
      }
    },
    async updateStatus(status) {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/statuses/${status.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: status.name })
        });
        const data = await response.json();
        if (!data.success) {
          alert('Failed to update status');
        }
      } catch (error) {
        alert('Failed to update status');
      }
    },
    async deleteStatus(id) {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/statuses/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          this.statuses = this.statuses.filter(status => status.id !== id);
        } else {
          alert('Failed to delete status');
        }
      } catch (error) {
        alert('Failed to delete status');
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
