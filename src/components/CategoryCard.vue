<template>
  <div class="col-3" @dragover.prevent @drop="drop">
    <div class="card category-container">
      <div class="card-header" >
        <div class="title" v-text="category"></div>
        <div><i class="fas fa-ellipsis-h"></i></div>
      </div>
      <div class="card-body-0">
        <task-card 
          v-for="task in taskByCategery" 
          :key="task.id"
          :task="task"
          @getTasks="getTasks"
          @editTodo="editTodo"
          @updateCategory="updateCategory"
          @deleteTodo="deleteTodo"
          :category="category"
          :categories="categories"
        ></task-card>
        <task-add-form 
          v-if="isAdd === category" 
          :category="category"
          @addTodo="addTodo"
          :cancel="cancel"
        ></task-add-form>
      </div>
      
      <div class="card-footer">
        <div @click="showFormAdd(category)"><i class="fas fa-plus"></i> Add another card</div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'
import TaskAddForm from './TaskAddForm.vue'

export default {
  components: { TaskCard, TaskAddForm },
  name: "CategoryCard",
  props: ['category','tasks','categories'],
  data(){
    return {
      isAdd : ''
    }
  },
  methods: {
    getTasks(){
      this.$emit('getTasks')
    },
    showFormAdd(category){
      this.isAdd = category
    },
    cancel(){
      this.isAdd = ''
    },
    addTodo(category, title){
      this.isAdd = ''
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
    drop(e) {
      const card_id = e.dataTransfer.getData('card_id')
      this.$emit('updateCategory', card_id, this.category)
    },
  },
  computed: {
    taskByCategery(){
      return this.tasks.filter(e => e.category === this.category)
    }
  },
}
</script>

<style>

</style>