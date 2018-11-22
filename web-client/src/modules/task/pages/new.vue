<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h4>New Task</h4>
      </div>
    </div>


    <div class="row">
      <div class="col-lg-12">
        <div class="form-group">
          <label class='text-muted'>
            Enter a name for your new Task
            <span class='text-danger'>*</span></label>
          <input type="text" class="form-control form-control-lg" placeholder="Label" v-model="model.label">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button
          @click="$router.back()"
          variant="light"
          size="lg"
          class="mr-2"
        >
          <i class="fa fa-fw fa-reply"></i>
          Back
        </b-button>

        <b-button
          :disabled="!model.label"
          variant="primary"
          size="lg"
          @click="formSubmit(model)"
        >
          <i class="fa fa-fw fa-plus"></i>
          Save
        </b-button>

      </div>
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
