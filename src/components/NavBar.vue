<template>
  <nav>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid justify-content-between">
        <div class="nav-item">
          <a class="nav-link text-white" @click="chengeBackground"><i class="fab fa-phoenix-framework"></i></a>
        </div>
        <div class="logo text-center" @click="chengeBackground">Kanban</div>
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
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.checkAuth()
    },
    chengeBackground(){
      document.body.style.backgroundImage = `url(https://placeimg.com/1000/480/nature)`
    }
  }
}
</script>

<style>

</style>