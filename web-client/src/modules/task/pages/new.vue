<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-4">
        <h2>New Task</h2>
      </div>
      <div class="col-lg-8 text-right">

        <b-button
          @click="$router.back()"
          variant="light"
          class="mr-2"
        >
          <i class="fa fa-fw fa-reply"></i>
          Back
        </b-button>

        <b-button
          :disabled="!model.label"
          variant="warning"
          @click="testTask(model)"
        >
          <i class="fa fa-fw fa-cog"></i>
          Test
        </b-button>

        <b-button
          :disabled="!model.label"
          variant="primary"
          @click="formSubmit(model)"
        >
          <i class="fa fa-fw fa-plus"></i>
          Deploy
        </b-button>

      </div>
    </div>

    <hr>

    <TaskForm :model="model" />
    <div class="row">
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import TaskForm from '@/modules/task/components/TaskForm'

export default {
  name: 'TaskNew',
  metaInfo: {
    title: 'New Task'
  },
  components: {
    TaskForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'task/newModel'
  }),
  methods: {
    ...mapActions({
      testTask: 'task/testModel',
      formSubmit: 'task/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'task/resetNewModel'
    })
  }
}
</script>
