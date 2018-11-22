<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <TaskShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <div class="col-lg-12">
        <User :model="user" v-if="user._id" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import TaskShowWidget from '@/modules/task/components/TaskShowWidget'
import User from '@/modules/task/components/User'

export default {
  props: ['id'],
  name: 'task_show',
  metaInfo: {
    title: 'Tasks - Show'
  },
  components: {
    User,
    TaskShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchUser(this.id)
  },
  methods: mapActions({
    fetchUser: 'task/fetchUser',
    fetch: 'task/fetchModel',
    onConfirmDestroy: 'task/deleteModel'
  }),
  computed: mapGetters({
    user: 'task/user',
    model: 'task/model',
    fetching: 'task/fetching'
  })
}
</script>
