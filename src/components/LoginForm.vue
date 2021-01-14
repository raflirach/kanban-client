<template>
  <!-- login form -->
  <div class="card login-card">
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
    <div class="d-flex justify-content-center">
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: "LoginForm",
  props: ['isRegister','changeRegister','checkAuth'],
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
      this.$emit('login', this.email, this.password)
      this.email = ''
      this.password = ''
    },
  }
}
</script>

<style>

</style>