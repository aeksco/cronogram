<template>
  <LoadingFull v-if="firstFetch" />
  <div class="container" v-else>

    <!-- Bootstrap Modal Component -->
    <b-modal
      ref="testingModal"
      v-model="testing"
      :title="'Test Output'"
      cancel-title='Cancel'
    >
      <b-row>
        <b-col lg=12 class='text-center'>
          <p class="lead">The output below is what will be emailed to you</p>
          <p class="text-left" v-if="fetching">LOADING</p>
        </b-col>
      </b-row>
      <template v-if="!fetching">
        <div class="card card-body">
          <div v-if="testOutput.html" v-html="testOutput.html"></div>
          <p class="text-left" v-if="testOutput.text">{{ testOutput.text }}</p>
          <pre class="dg-dark text-light" v-if="testOutput.json">{{ testOutput.json }}</pre>
        </div>
      </template>
    </b-modal>

    <div class="row">
      <div class="col-sm-8">
        <h2>Task - Edit</h2>
      </div>
      <div class="col-lg-4 text-right">

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
          @click="testTask({ task: model, email: false })"
        >
          <i class="fa fa-fw fa-cog"></i>
          Test
        </b-button>

        <b-button
          :disabled="!model.label"
          variant="primary"
          @click="formSubmit(model)"
        >
          <i class="fa fa-fw fa-save"></i>
          Save Changes
        </b-button>

      </div>
    </div>

    <hr>

    <TaskForm :model="model" />

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import TaskForm from '@/modules/task/components/TaskForm'

export default {
  props: ['id'],
  name: 'task_edit',
  metaInfo: {
    title: 'Task - Edit'
  },
  components: {
    LoadingFull,
    TaskForm
  },
  data () {
    return {
      firstFetch: false
    }
  },
  created () {
    this.firstFetch = true
    this.fetchEditModel(this.id)
    .then(() => { this.firstFetch = false })
  },
  computed: {
    ...mapGetters({
      model: 'task/editModel',
      fetching: 'task/fetching',
      testOutput: 'task/testOutput'
    }),
    testing: {
      get () {
        return this.$store.getters['task/testing']
      },
      set (value) {
        this.$store.commit('task/testing', value)
      }
    }
  },
  methods: mapActions({
    fetchEditModel: 'task/fetchEditModel',
    formSubmit: 'task/updateModel',
    testTask: 'task/testModel'
  })
}
</script>
