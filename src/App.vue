<template>
  <div>
    <auth-form 
      v-if="page === 'login'"
      @login="login"
      @register="register"
      :checkAuth="checkAuth"
      ></auth-form>
    <main-page 
      v-if="page === 'main'"
      @getTasks="getTasks"
      @addTodo="addTodo"
      @editTodo="editTodo"
      @updateCategory="updateCategory"
      @deleteTodo="deleteTodo"
      :tasks="tasks"
      :checkAuth="checkAuth"
      ></main-page>
  </div>
</template>

<script>
import AuthForm from './components/AuthForm.vue'
import MainPage from './components/MainPage.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: "App",
  data(){
    return {
      baseUrl: 'http://localhost:3000',
      page : '',
      tasks: []
    }
  },
  methods: {
    setPage(page){
      this.page = page
    },
    checkAuth(){
      if(localStorage.access_token){
        this.setPage("main")
        this.getTasks()
      }else{
        this.setPage("login")
      }
    },
    login(email, password){
      axios({
        method: 'post',
        url: `${this.baseUrl}/login`,
        data: {
          email,
          password
        }
      })
      .then(res => {
        const user = res.data
        localStorage.access_token = user.access_token
        localStorage.username = user.email
        this.username = user.email
        this.checkAuth()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    register(email, password){
      console.log(email, password);
      axios({
        method: 'post',
        url: `${this.baseUrl}/register`,
        data: {
          email,
          password
        }
      })
      .then(user => {
        Swal.fire({
          title: "Success!",
          text: "Register successfull",
          icon: "success"
        });
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message[0],
          icon: "error"
        });
      })
    },
    getTasks(){
      axios({
        method: 'get',
        url: `${this.baseUrl}/tasks`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
        this.tasks = res.data
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    addTodo(category, title){
      axios({
        method: 'post',
        url: `${this.baseUrl}/tasks`,
        headers: {
          access_token : localStorage.access_token
        },
        data : {
          title,
          category
        }
      })
      .then(tasks => {
        this.getTasks()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    editTodo(id, category, title){
      axios({
        method: 'put',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        },
        data: {
          title,
          category
        }
      })
      .then(tasks => {
        this.getTasks()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message[0],
          icon: "error"
        });
      })
    },
    updateCategory(id, category){
      axios({
        method: 'patch',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        },
        data: {
          category
        }
      })
      .then(response => {
        this.getTasks()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    }, 
    deleteTodo(id){
      axios({
        method: 'delete',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(response => {
        return response.data
      })
      .then(res => {
        Swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success"
        });
        this.getTasks()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },  
  },
  created(){
    this.checkAuth()
  },
  components: {
    AuthForm,
    MainPage
  }
}
</script>

<style>

</style>