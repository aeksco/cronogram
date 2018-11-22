
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy User?'"
        @ok="onConfirmDestroy(model)"
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
      >
        <p class="text-left">Are you sure you want to destroy this User?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'User Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/users/' + model._id + '/edit'">
            <i class="fa fa-fw fa-edit"></i>
          </b-button>

          <!-- Destroy -->
          <b-button size="sm" variant="outline-danger" v-b-modal="'destroyModal'">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

        </div>
      </div>

      <table class="table" v-if='!fetching'>

        <!-- Table Header -->
        <tbody>
          <tr>
            <td>Username</td>
            <td>{{model.username}}</td>
          </tr>
          <tr>
            <td>E-Mail</td>
            <td>{{model.email}}</td>
          </tr>
        </tbody>

      </table>
      <Loading v-else />

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'
import Loading from '@/components/Loading'

export default {
  props: ['id', 'model', 'fetching', 'header'],
  name: 'UserShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'user/deleteModel'
  })
}
</script>
