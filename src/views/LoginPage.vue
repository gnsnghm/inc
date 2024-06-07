<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="userId">User ID:</label>
        <input type="text" v-model="userId" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <router-link to="/register">Register</router-link>
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
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: this.userId, password: this.password })
        });
        const data = await response.json();
        if (data.success) {
          this.$store.dispatch('login', data.user);
          this.$cookies.set('user', data.user); // クッキーにユーザー情報を保存
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
