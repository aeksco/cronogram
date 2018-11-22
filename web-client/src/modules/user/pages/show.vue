<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <UserShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <div class="col-lg-12">
        <Tasks :collection="tasks" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import UserShowWidget from '@/modules/user/components/UserShowWidget'
import Tasks from '@/modules/user/components/Tasks'

export default {
  props: ['id'],
  name: 'user_show',
  metaInfo: {
    title: 'Users - Show'
  },
  components: {
    Tasks,
    UserShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchTasks(this.id)
  },
  methods: mapActions({
    fetchTasks: 'user/fetchTasks',
    fetch: 'user/fetchModel',
    onConfirmDestroy: 'user/deleteModel'
  }),
  computed: mapGetters({
    tasks: 'user/tasks',
    model: 'user/model',
    fetching: 'user/fetching'
  })
}
</script>
