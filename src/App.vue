<template>
  <div>
    <auth-form 
      v-if="page === 'login'"
      @login="login"
      @register="register"
      @onSuccess="onSuccess"
      :checkAuth="checkAuth"
      ></auth-form>
    <main-page 
      v-if="page === 'main'"
      @getTasks="getTasks"
      @addTodo="addTodo"
      @editTodo="editTodo"
      @updateCategory="updateCategory"
      @deleteTodo="deleteTodo"
      @addCategory="addCategory"
      @deleteCategory="deleteCategory"
      @editCategory="editCategory"
      :tasks="tasks"
      :categories="categories"
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
      baseUrl: 'https://r-kanban.herokuapp.com',
      page : '',
      tasks: [],
      categories: []
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
        this.getCategories()
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
    onSuccess(id_token) {
      axios({
        method: 'post',
        url: `${this.baseUrl}/loginGoogle`,
        data: {
          id_token
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
          text: `internal server error`,
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
    addTodo(CategoryId, title){
      axios({
        method: 'post',
        url: `${this.baseUrl}/tasks`,
        headers: {
          access_token : localStorage.access_token
        },
        data : {
          title,
          CategoryId
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
    editTodo(id, CategoryId, title){
      axios({
        method: 'put',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        },
        data: {
          title,
          CategoryId
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
    updateCategory(id, CategoryId){
      axios({
        method: 'patch',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        },
        data: {
          CategoryId
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
    getCategories(){
      axios({
        method: 'get',
        url: `${this.baseUrl}/categories`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
        this.categories = res.data
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    addCategory(name){
      axios({
        method: 'post',
        url: `${this.baseUrl}/categories`,
        headers: {
          access_token : localStorage.access_token
        },
        data: {
          name
        }
      })
      .then(res => {
        this.getCategories()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    deleteCategory(id){
      axios({
        method: 'delete',
        url: `${this.baseUrl}/categories/${id}`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success"
        });
        this.getCategories()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    editCategory(id, name){
      axios({
        method: 'put',
        url: `${this.baseUrl}/categories/${id}`,
        headers: {
          access_token : localStorage.access_token
        },
        data:{
          name
        }
      })
      .then(res => {
        this.getCategories()
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    }
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