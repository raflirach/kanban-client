<template>
  <!-- login -->
  <section class="d-flex justify-content-center align-items-center bg-login">
    <login-form 
      v-if="!isRegister"
      :isRegister="isRegister"
      :changeRegister="changeRegister"
      :checkAuth="checkAuth"
      @login="login"
      ></login-form>
    <register-form
      v-else
      :isRegister="isRegister"
      :changeRegister="changeRegister"
      @register="register"
      ></register-form>
  </section>
</template>

<script>
  import LoginForm from './LoginForm.vue'
  import RegisterForm from './RegisterForm.vue'

  export default {
    name : "AuthForm",
    props: ['checkAuth'],
    data(){
      return {
        isRegister : false
      }
    },
    methods:{
      changeRegister(status){
        this.isRegister = status
      },
      login(email, password){
        this.$emit('login', email, password)
      },
      register(email, password){
        this.$emit('register', email, password)
      },
    },
    components: { LoginForm, RegisterForm },
  }
</script>

<style>

</style>