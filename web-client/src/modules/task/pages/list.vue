<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <i class="fas fa-list-alt"></i>
          Tasks
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button v-if="isAuthenticated" variant="primary" to="/tasks/new">
          <i class="fa fa-fw fa-plus"></i>
          New Task
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <b-row>
      <b-col lg=12>
        <ListView :collection="collection" />
      </b-col>
    </b-row>
  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/task/components/TaskListWidget'
import LoadingFull from '@/components/LoadingFull'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TaskList',
  components: {
    LoadingFull,
    ListView
  },
  metaInfo: {
    title: 'Tasks'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'task/fetching',
    collection: 'task/collection',
    isAuthenticated: 'auth/is_authenticated'
  }),
  methods: mapActions({
    fetch: 'task/fetchCollection'
  })
}
</script>
