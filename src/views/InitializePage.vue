// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Initialize Database</h3>
            <button @click="initializeDatabase" class="btn btn-primary w-100">Initialize</button>
            <p v-if="message" class="mt-3 text-center">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async initializeDatabase() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/initialize`, {
          method: 'POST'
        });
        const data = await response.json();
        this.message = data.message;
      } catch (error) {
        this.message = 'Initialization failed';
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
