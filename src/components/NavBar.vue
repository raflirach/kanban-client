<template>
  <nav>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid justify-content-between">
        <div class="nav-item">
          <a class="nav-link text-white">Home</a>
        </div>
        <div class="logo">Kanban</div>
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
    }
  }
}
</script>

<style>

</style>