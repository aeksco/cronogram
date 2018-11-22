<template>
  <LoadingFull v-if="firstFetch" />
  <div class="container" v-else>

    <!-- Bootstrap Modal Component -->
    <b-modal
      ok-only
      ref="testingModal"
      v-model="testing"
      :title="'Test Output'"
      ok-title='Close'
    >
      <b-row>
        <b-col lg=12 class='text-center'>
          <p class="lead">The output below is what will be emailed to you</p>
          <i class='fa fa-spin fa-spinner fa-lg' v-if="fetching"></i>
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
      <div class="col-sm-6">
        <h2>{{ model.label }}</h2>
      </div>
      <div class="col-sm-6 text-right">

        <b-button
          to="/tasks"
          variant="light"
          class="mr-2"
        >
          <i class="fa fa-fw fa-reply"></i>
          Back
        </b-button>

      </div>
    </div>

    <hr class='mt-0'>

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
    testTask: 'task/testModel'
  })
}
</script>
