<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Register</h3>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="userId" class="form-label">User ID</label>
                <input type="text" v-model="userId" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" v-model="username" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      userId: '',
      username: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: this.userId, username: this.username, password: this.password })
        });
        const data = await response.json();
        if (data.success) {
          this.$router.push('/');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        alert('Registration failed');
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
