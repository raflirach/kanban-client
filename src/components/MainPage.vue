<template>
  <section>
    <!-- navbar -->
    <nav-bar 
      :checkAuth="checkAuth"
      ></nav-bar>
    <main-task 
      :tasks="tasks"
      @getTasks="getTasks"
      @addTodo="addTodo"
      @editTodo="editTodo"
      @updateCategory="updateCategory"
      @deleteTodo="deleteTodo"
    ></main-task>
  </section>
</template>

<script>
import MainTask from './MainTask.vue'
import NavBar from './NavBar.vue'

export default {
  name: "MainPage",
  props: ['checkAuth','tasks'],
  methods: {
    getTasks(){
      this.$emit('getTasks')
    },
    addTodo(category, title){
      this.$emit('addTodo', category, title)
    },
    editTodo(id, category, title){
      this.$emit('editTodo',id,category, title)
    },
    updateCategory(id, category){
      this.$emit('updateCategory', id, category)
    }, 
    deleteTodo(id){
      this.$emit('deleteTodo', id)
    }
  },
  components: { NavBar, MainTask },

}
</script>

<style>

</style>