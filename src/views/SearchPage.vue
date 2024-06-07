<template>
  <div>
    <h1>Search Incidents</h1>
    <form @submit.prevent="search">
      <div>
        <label for="searchQuery">Search by Subject:</label>
        <input type="text" v-model="searchQuery" required />
      </div>
      <button type="submit">Search</button>
    </form>
    <ul>
      <li v-for="incident in incidents" :key="incident.id">
        <router-link :to="'/incident/' + incident.id">{{
          incident.subject
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
    return {
      searchQuery: "",
      incidents: [],
    };
  },
  methods: {
    async search() {
      try {
        const response = await fetch(
          `http://localhost:3000/incidents?subject=${this.searchQuery}`
        );
        this.incidents = await response.json();
      } catch (error) {
        alert("Failed to search incidents");
      }
    },
  },
};
</script>
