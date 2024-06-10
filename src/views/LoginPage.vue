<template>
  <div class="container">
    <div class="row justify-content-center">
        <div class="card" style="width: 15rem;margin: 5rem;">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="userId" class="form-label">User ID</label>
                <input type="text" v-model="userId" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/register">Register</router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      userId: '',
      password: ''
    };
  },
  created() {
    const user = this.$cookies.get('user');
    if (user) {
      // 自動ログイン処理
      this.$store.dispatch('login', user);
      this.$router.push('/mypage');
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: this.userId, password: this.password })
        });
        const data = await response.json();
        if (data.success) {
          this.$store.dispatch('login', data.user);
          this.$cookies.set('user', data.user);
          this.$router.push('/mypage');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        alert('Login failed');
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
</style>
