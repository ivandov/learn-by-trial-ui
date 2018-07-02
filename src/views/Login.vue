<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title">Login</h3>
          <p class="subtitle">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>
            <!-- <form> -->
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="username" placeholder="Username" autofocus="">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                <input type="checkbox">
                Remember me
                </label>
              </div>
              <button class="button is-block is-success is-large is-fullwidth" @click="login">Login</button>
            <!-- </form> -->
          </div>
          <p>
            <a href="../">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Forgot Password</a>
            <!-- <a href="../">Need Help?</a> -->
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {}
  },
  methods: {
    login () {
      // Reference this article: https://auth0.com/blog/build-an-app-with-vuejs/

      localStorage.setItem('authenticated', true)
      this.$router.replace({path: '/dashboard'})
    }
  }
}
</script>

<style scoped>
html,
body {
  font-family: "Open Sans", serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
