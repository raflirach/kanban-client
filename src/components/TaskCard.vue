<template>
  <div class="card-content">
    <div class="card card-container p-1 mb-2" v-if="task.CategoryId == category.id" :id="task.id" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
      <div>
        <div v-if="isEdit == task.id">
          <form @submit.prevent="editTodo(task.id, category.id)">
            <textarea v-model="title" rows="3" class="form-control"></textarea>
            <button type="submit" class="btn btn-success my-btn">save</button>
            <a class="btn btn-danger my-btn" @click="cancel">cancel</a>
          </form>
        </div>
        <div v-text="task.title" v-else @dblclick="showFormEdit(task.id)"></div>
      </div>
      <div class="edit">
        <i class="fas fa-pen" @click="showFormEdit(task.id)"></i>
        <i class="fas fa-trash-alt" @click="confirmDelete(task.id)"></i>
        <i class="fas fa-arrows-alt" @click="showMoveForm(task.id, category.id)"></i>
      </div>
      <small>by: {{task.User.email}} </small>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'TaskCard',
  props: ["category",'task','categories'],
  data(){
    return{
      title: '',
      isEdit: '',
    }
  },
  methods: {
    showFormEdit(id){
      this.isEdit = id
      this.title = this.task.title
    },
    editTodo(id, category){
      this.isEdit = ''
      this.$emit('editTodo',id,category,this.title)
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
          this.$emit('deleteTodo', id)
        }
      })
    },
    showMoveForm(id, category){
      const categories = this.categories.filter(e => e.id!=category)
      console.log(categories);
      const select = categories.reduce(function(map, value) {
        map[value.id] = value.name;
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
        this.$emit('updateCategory', id, res.value)
      })
    },
    cancel(){
      this.isEdit = ''
    },
    dragStart(e){
      const target = e.target

      e.dataTransfer.setData('card_id', target.id)
  
      setTimeout(()=>{
        target.style.display = "none"
      },0)
    },
    dragEnd(e) {
      const target = e.target
      const card = document.getElementById(target.id)
      target.style.display = "flex"
    },
  }
}
</script>

<style>

</style>