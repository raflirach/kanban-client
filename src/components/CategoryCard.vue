<template>
  <div class="col-3" @dragover.prevent @drop="drop">
    <div class="card category-container">
      <div class="card-header" >
        <div v-if="isEdit == category.id">
          <form @submit.prevent="editCategory">
            <input type="text" class="category-container" v-model="name">
          </form>
        </div>
        <div class="title" v-text="category.name" v-else @dblclick="showFormEdit"></div>
        <div v-if="isEdit == category.id">
          <i class="fas fa-times" @click="showFormEdit"></i>
        </div>
        <div v-else>
          <i class="fas fa-pen" @click="showFormEdit"></i>
          <i class="fas fa-trash" @click="confirmDelete"></i>
        </div>
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
import Swal from 'sweetalert2'

export default {
  components: { TaskCard, TaskAddForm },
  name: "CategoryCard",
  props: ['category','tasks','categories'],
  data(){
    return {
      isAdd : '',
      name: '',
      isEdit: ''
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
      this.$emit('addTodo', this.category.id , title)
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
      this.$emit('updateCategory', card_id, this.category.id)
    },
    confirmDelete(){
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
          this.$emit('deleteCategory', this.category.id)
        }
      })
    },
    showFormEdit(){
      if(this.isEdit) this.isEdit = ''
      else this.isEdit = this.category.id
    },
    editCategory(){
      this.$emit('editCategory', this.category.id, this.name)
      this.name = ''
      this.isEdit = ''
    }
  },
  computed: {
    taskByCategery(){
      return this.tasks.filter(e => e.CategoryId == this.category.id)
    }
  }
}
</script>

<style>

</style>