<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Incident Management</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li v-if="!isLoginPage" class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li v-if="!isLoginPage" class="nav-item">
              <router-link class="nav-link" to="/search">Search</router-link>
            </li>
            <li v-if="!isLoginPage" class="nav-item">
              <router-link class="nav-link" to="/statuses">Manage Statuses</router-link>
            </li>
            <li v-if="isLoggedIn && !isLoginPage" class="nav-item">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
            <li v-else-if="isLoginPage" class="nav-item">
              <router-link class="nav-link" to="/">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoginPage: false
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$cookies.get('user');
    }
  },
  watch: {
    $route(to) {
      this.isLoginPage = to.name === 'LoginPage';
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$cookies.remove('user');
      this.$router.push('/');
    }
  },
  created() {
    this.isLoginPage = this.$route.name === 'LoginPage';
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
