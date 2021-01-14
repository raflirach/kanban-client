<template>
  <!-- task -->
  <div class="mx-2">
    <div class="row">
      <category-card 
        v-for="(category, i) in categories" 
        :key="i"
        :category="category"
        :categories="categories"
        :tasks="tasks"
        @getTasks="getTasks"
        @addTodo="addTodo"
        @editTodo="editTodo"
        @updateCategory="updateCategory"
        @deleteTodo="deleteTodo"
      >
      </category-card>
    </div>
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue'

export default {
  name: "MainTask",
  props: ['tasks'],
  data(){
    return{
      categories: ['backlog','todo','doing','done'],
    }
  },
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
  components: { CategoryCard },
}
</script>

<style>

</style>