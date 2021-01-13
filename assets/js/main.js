const app = new Vue({
  el: '#app',
  data: {
    baseUrl: 'http://localhost:3000',
    page: 'login',
    isRegister: false,
    categories: ['backlog','todo','doing','done'],
    tasks: [],
    user: {
      email: '',
      password: ''
    },
    username: localStorage.username,
    title: '',
    isEdit: '',
    isAdd: '',
    titleAdd: ''
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
    changeRegister(status){
      this.user.password = ''
      this.user.email = ''
      this.isRegister = status
    },
    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log(profile);
    },
    login(){
      const { email,password } = this.user

      axios({
        method: 'post',
        url: `${this.baseUrl}/login`,
        data: {
          email,
          password
        }
      })
      .then(response => {
        this.user.password = ''
        this.user.email = ''
        return response.data
      })
      .then(user => {
        localStorage.access_token = user.access_token
        localStorage.username = user.email
        this.username = user.email
        this.checkAuth()
      })
      .catch(error => {
        this.user.password = ''
        this.user.email = ''
        swal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },
    register(){
      const { email,password } = this.user

      axios({
        method: 'post',
        url: `${this.baseUrl}/register`,
        data: {
          email,
          password
        }
      })
      .then(response => {
        this.user.password = ''
        this.user.email = ''
        return response.data
      })
      .then(user => {
        this.isRegister = false
        this.checkAuth()
        swal({
          title: "Success!",
          text: "Register successfull",
          icon: "success"
        });
      })
      .catch(error => {
        this.user.password = ''
        this.user.email = ''
        console.log(error.response.data.message)
        swal({
          title: "Error!",
          text: error.response.data.message[0],
          icon: "error"
        });
      })
    },
    logout(){
      localStorage.clear()
      this.checkAuth()
    },
    getTasks(){
      axios({
        method: 'get',
        url: `${this.baseUrl}/tasks`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(response => {
        return response.data
      })
      .then(tasks => {
        this.tasks = tasks
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    showFormAdd(category){
      this.isAdd = category
    },
    addTodo(category){
      const title = this.titleAdd
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
      .then(response => {
        return response.data
      })
      .then(tasks => {
        this.getTasks()
        this.titleAdd = ''
        this.isAdd = ''
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    showFormEdit(id){
      axios({
        method: 'get',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(response => {
        return response.data
      })
      .then(tasks => {
        this.isEdit = id
        this.title = tasks.title
      })
      .catch(error => {
        this.showError(error.response.data.message)
      })
    },
    editTodo(id){
      console.log(id);
    },
    confirmDelete(id){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((will) => {
        if (will) {
          this.deleteTodo(id)
        }
      });
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
        swal({
          title: "Success!",
          text: res.message,
          icon: "success"
        });
        this.getTasks()
      })
      .catch(error => {
        swal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
    },    
    cancel(){
      this.isEdit = ''
      this.isAdd = ''
    },
    showError(text){
      swal({
        title: "Error!",
        text: text,
        icon: "error"
      });
    }
  },
  computed: {

  },
  created(){
    this.checkAuth()
  },
  mounted() {
    window.onLoadCallback = function(){
      gapi.auth2.init({
          client_id: '904131214369-65d67s90qk1bdcejksng18v2km84dqma.apps.googleusercontent.com'
      });
    }
  }
})