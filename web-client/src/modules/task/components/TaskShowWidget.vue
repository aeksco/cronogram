
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy Task?'"
        @ok="onConfirmDestroy(model)"
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
      >
        <p class="text-left">Are you sure you want to destroy this Task?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'Task Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/tasks/' + model._id + '/edit'">
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
            <td>Label</td>
            <td>{{model.label}}</td>
          </tr>
          <tr>
            <td>Dependencies</td>
            <td>{{model.dependencies.join(', ')}}</td>
          </tr>
          <tr>
            <td>Script</td>
            <td>{{model.script}}</td>
          </tr>
          <tr>
            <td>Schedule</td>
            <td>{{model.cron}}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{{model.description}}</td>
          </tr>
          <tr>
            <td>User</td>
            <td v-if="model.user_id">
              <router-link :to="'/users/' + model.user_id">
                {{model.user.username}}
              </router-link>
            </td>
            <td v-else>N/A</td>
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
  name: 'TaskShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'task/deleteModel'
  })
}
</script>
