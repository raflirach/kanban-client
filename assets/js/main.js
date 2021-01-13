const app = new Vue({
  el: '#app',
  data: {
    baseUrl: 'http://localhost:3000',
    page: 'login',
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
        return response.data
      })
      .then(user => {
        localStorage.access_token = user.access_token
        localStorage.username = user.email
        this.username = user.email
        this.checkAuth()
      })
      .catch(error => {
        console.log(error.response.data)
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
      this.isEdit = id
    },
    editTodo(id){
      console.log(id);
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
      .then(tasks => {
        console.log(tasks);
        this.getTasks()
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },    
    cancel(){
      this.isEdit = ''
      this.isAdd = ''
    }
  },
  computed: {

  },
  created(){
    this.checkAuth()
  }
})