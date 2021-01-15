<template>
  <div class="card-content" >
    <div class="card bg-white p-1 mb-2" v-if="task.category == category" :id="task.id">
      <div>
        <div v-if="isEdit == task.id">
          <form @submit.prevent="editTodo(task.id, category)">
            <textarea v-model="title" rows="3" class="form-control"></textarea>
            <button type="submit" class="btn btn-success">save</button>
            <a class="btn btn-danger" @click="cancel">cancel</a>
          </form>
        </div>
        <div v-text="task.title" v-else @dblclick="showFormEdit(task.id)"></div>
      </div>
      <div class="edit">
        <i class="fas fa-pen" @click="showFormEdit(task.id)"></i>
        <i class="fas fa-trash-alt" @click="confirmDelete(task.id)"></i>
        <i class="fas fa-arrows-alt" @click="showMoveForm(task.id, category)"></i>
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
      baseUrl: "https://r-kanban.herokuapp.com",
      title: '',
      isEdit: '',
    }
  },
  methods: {
    showFormEdit(id){
      axios({
        method: 'get',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
        const tasks = res.data
        this.isEdit = id
        this.title = tasks.title
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
      })
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
      const categories = this.categories.filter(e => e!=category)
      const select = categories.reduce(function(map, value) {
        map[value] = value;
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
  }
}
</script>

<style>

</style>