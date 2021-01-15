<template>
  <!-- task -->
  <div class="mx-2 main-container">
    <div class="row ">
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
        @deleteCategory="deleteCategory"
        @editCategory="editCategory"
      >
      </category-card>
      <div class="col-3">
        <div class="card category-container">
          <div class="card-header">
            <div>
              <form @submit.prevent="addCategory">
                <input type="text" class="category-container" v-model="name" id="myAdd">
              </form>
            </div>
            <div>
              <i class="fas fa-plus" @click="addCategory"></i> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue'

export default {
  name: "MainTask",
  props: ['tasks','categories'],
  data(){
    return{
      name: ''
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
    },
    addCategory(){
      this.$emit('addCategory',this.name)
      this.name = ''
    },
    deleteCategory(id){
      this.$emit('deleteCategory', id)
      this.name = ''
    },
    editCategory(id, name){
      this.$emit('editCategory', id, name)
    }
  },
  components: { CategoryCard },
}
</script>

<style>

</style>