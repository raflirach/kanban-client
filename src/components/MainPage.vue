<template>
  <section>
    <!-- navbar -->
    <nav-bar 
      :checkAuth="checkAuth"
      ></nav-bar>
    <main-task 
      :tasks="tasks"
      :categories="categories"
      @getTasks="getTasks"
      @addTodo="addTodo"
      @editTodo="editTodo"
      @updateCategory="updateCategory"
      @deleteTodo="deleteTodo"
      @addCategory="addCategory"
      @deleteCategory="deleteCategory"
      @editCategory="editCategory"
    ></main-task>
  </section>
</template>

<script>
import MainTask from './MainTask.vue'
import NavBar from './NavBar.vue'

export default {
  name: "MainPage",
  props: ['checkAuth','tasks','categories'],
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
    },
    addCategory(name){
      this.$emit('addCategory',name)
    },
    deleteCategory(id){
      this.$emit('deleteCategory', id)
    },
    editCategory(id, name){
      this.$emit('editCategory', id, name)
    }
  },
  components: { NavBar, MainTask },

}
</script>

<style>

</style>