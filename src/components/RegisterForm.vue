<template>
  <!-- register form -->
  <div class="card login-card">
    <div class="login-title">Register</div>
    <form @submit.prevent="register">
      <div>
        <input type="email" v-model="email" placeholder="email">
      </div>
      <div>
        <input type="password" v-model="password" placeholder="password">
      </div>
      <div class="d-flex justify-content-center my-3">
        <button type="submit" class="btn mx-2">Create</button>
        <a class="btn mx-2" @click="changeRegister(false)">Back</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: "RegisterForm",
  data(){
    return {
      email: '',
      password: ''
    }
  },
  props: ['isRegister', 'changeRegister'],
  methods: {
    register(){
      this.$emit('register', this.email, this.password)
      this.password = ''
      this.email = ''
    },
  }
}
</script>

<style>

</style>