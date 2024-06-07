<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="userId">User ID:</label>
        <input type="text" v-model="userId" required />
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <router-link to="/">Login</router-link>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      userId: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: this.userId,
            username: this.username,
            password: this.password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          this.$router.push("/");
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        alert("Registration failed");
      }
    },
  },
};
</script>
