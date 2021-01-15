<template>
  <nav>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid justify-content-between">
        <div class="d-flex align-items-center">
          <a class="nav-link text-white" @click="focusAdd"><i class="fab fa-phoenix-framework"></i></a>
          <a class="btn btn-add text-white" @click="focusAdd"><i class="fas fa-plus"></i> Add Category</a>
        </div>
        <div class="logo text-center" @click="focusAdd">Kanban</div>
        <div class="dropdown">
          <a class="text-white dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            {{ username }}
          </a>
        
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: ['checkAuth'],
  data(){
    return{
      username : localStorage.username
    }
  },
  methods: {
    logout(){
      localStorage.clear()
      this.checkAuth()
    },
    chengeBackground(){
      document.body.style.backgroundImage = `url(https://placeimg.com/1000/480/nature)`
    },
    focusAdd(){
      document.getElementById("myAdd").focus();
    }
  }
}
</script>

<style>

</style>