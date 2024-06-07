<template>
  <div>
    <h1>Incident Detail</h1>
    <div v-if="incident">
      <p><strong>Subject:</strong> {{ incident.subject }}</p>
      <p><strong>Occurrence Date:</strong> {{ incident.occurrence_date }}</p>
      <p><strong>Content:</strong> {{ incident.content }}</p>
      <p><strong>Threat Type:</strong> {{ incident.threat_type }}</p>
      <p><strong>Status:</strong> {{ incident.status }}</p>
      <h2>Updates</h2>
      <ul>
        <li v-for="update in incident.updates" :key="update.id">
          {{ update.update_content }}
        </li>
      </ul>
      <form @submit.prevent="addUpdate">
        <div>
          <label for="updateContent">Update Content:</label>
          <textarea v-model="updateContent" required></textarea>
        </div>
        <button type="submit">Add Update</button>
      </form>
      <button @click="deleteIncident">Delete Incident</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      incident: null,
      updateContent: "",
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:3000/incidents/${id}`);
      this.incident = await response.json();
    } catch (error) {
      alert("Failed to load incident");
    }
  },
  methods: {
    async addUpdate() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:3000/incidents/${id}/updates`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ updateContent: this.updateContent }),
          }
        );
        const data = await response.json();
        if (data.success) {
          this.incident.updates.push(data.update);
          this.updateContent = "";
        } else {
          alert("Failed to add update");
        }
      } catch (error) {
        alert("Failed to add update");
      }
    },
    async deleteIncident() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/incidents/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          this.$router.push("/search");
        } else {
          alert("Failed to delete incident");
        }
      } catch (error) {
        alert("Failed to delete incident");
      }
    },
  },
};
</script>
