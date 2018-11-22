<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <i class="fas fa-square"></i>
          Users
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button variant="primary" to="/users/new">
          <i class="fa fa-fw fa-plus"></i>
          New User
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

import ListView from '@/modules/user/components/UserListWidget'
import LoadingFull from '@/components/LoadingFull'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserList',
  components: {
    LoadingFull,
    ListView
  },
  metaInfo: {
    title: 'Users'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'user/fetching',
    collection: 'user/collection'
  }),
  methods: mapActions({
    fetch: 'user/fetchCollection'
  })
}
</script>
