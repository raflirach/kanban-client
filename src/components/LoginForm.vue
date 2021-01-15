<template>
  <!-- login form -->
  <div class="card login-card">
    <div><i class="fab fa-phoenix-framework t-25"></i></div>
    <div class="login-title">Login</div>
    <form @submit.prevent="login">
      <div>
        <input type="email" v-model="email" placeholder="email">
      </div>
      <div>
        <input type="password" v-model="password" placeholder="password">
      </div>
      <div class="d-flex justify-content-center my-3">
        <button type="submit" class="btn mx-2">Login</button>
        <a class="btn mx-2" @click="changeRegister(true)">Register</a>
      </div>
    </form>
    <GoogleLogin :params="params" :renderParams="renderParams"  :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login';

export default {
  name: "LoginForm",
  props: ['isRegister','changeRegister','checkAuth','onFailure'],
  data(){
    return {
      email: '',
      password: '',
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
          client_id: "904131214369-65d67s90qk1bdcejksng18v2km84dqma.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        
      }
    }
  },
  methods: {
    login(){
      this.$emit('login', this.email, this.password)
      this.email = ''
      this.password = ''
    },
    onSuccess(googleUser) {
      const id_token = googleUser.Bc.id_token
      this.$emit('onSuccess', id_token)
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

<style>

</style>