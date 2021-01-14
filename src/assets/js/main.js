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
        this.showError(error.response.data.message)
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
        Swal.fire({
          title: "Success!",
          text: "Register successfull",
          icon: "success"
        });
      })
      .catch(error => {
        this.user.password = ''
        this.user.email = ''
        this.showError(error.response.data.message[0])
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
    editTodo(id, category){
      const title = this.title
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
      .then(response => {
        return response.data
      })
      .then(tasks => {
        this.isEdit = ''
        this.getTasks()
      })
      .catch(error => {
        this.showError(error.response.data.message[0])
      })
    },
    showMoveForm(id, category){
      const categories = this.categories.filter(e => e!=category)
      const select = categories.reduce(function(map, value) {
        map[value] = value;
        return map;
      }, {});
      Swal.fire({
        title: 'Move to :',
        input: 'select',
        inputOptions: select,
        inputPlaceholder: 'Select category',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve()
            } else {
              resolve('You need to select')
            }
          })
        }
      })
      .then(res => {
        this.updateCategory(id, res.value)
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
        return response.data
      })
      .then(tasks => {
        this.getTasks()
      })
      .catch(error => {
        this.showError(error.response.data.message)
      })
    },
    confirmDelete(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTodo(id)
        }
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
        console.log(error.response.data.message);
        this.showError(error.response.data.message)
      })
    },    
    cancel(){
      this.isEdit = ''
      this.isAdd = ''
    },
    showError(text){
      Swal.fire({
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