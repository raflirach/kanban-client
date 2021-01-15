<template>
  <div class="card-content">
    <div class="card card-container p-1 mb-2">
      <div>
        <form @submit.prevent="addTodo(category)">
          <textarea v-model="titleAdd" rows="3" class="form-control"></textarea>
          <button type="submit" class="btn btn-success my-btn">save</button>
          <a class="btn btn-danger my-btn" @click="cancel">cancel</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskAddForm',
  props: ['category','cancel','getTasks'],
  data(){
    return {
      titleAdd: ''
    }
  },
  methods: {
    addTodo(category){
      this.$emit('addTodo', category, this.titleAdd)
    },
  },
  mounted(){
    this.titleAdd = ''
  }
}
</script>

<style>

</style>