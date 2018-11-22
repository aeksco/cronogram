
<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Tasks</p>
      <table class="table table-hover">

        <!-- Table Header -->
        <thead>
          <th>Label</th>
          <th>
            Dependencies
            <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The dependent NPM packages for this script" ></i>
          </th>
          <th>
            Script
            <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The Node.js script this task runs" ></i>
          </th>
          <th>
            Schedule
            <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The cron schedule for this task" ></i>
          </th>
          <th>
            Description
            <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The markdown description for this Task" ></i>
          </th>
          <th>User</th>
          <th></th>
        </thead>

        <!-- Table Body -->
        <tbody>

          <!-- Empty Table Row -->
          <tr class='table-warning' v-if="!collection[0]">
            <td>Empty</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr v-for="m in collection" :key="m._id">
            <td>
              <router-link :to=" '/tasks/' + m._id ">
                {{ m.label }}
              </router-link>
            </td>
            <td>{{ m.dependencies.join(', ') }}</td>
            <td>{{m.script}}</td>
            <td>{{m.cron}}</td>
            <td>{{m.description}}</td>

            <td>
              <router-link :to="'/users/' + m.user_id">
                {{m.user.username}}
              </router-link>
            </td>
            <!-- Edit Task-->
            <td class='text-right'>
              <b-button size="sm" variant="outline-primary" :to=" '/tasks/' + m._id">
                <i class="fa fa-fw fa-eye"></i>
              </b-button>

              <b-button size="sm" variant="outline-warning" :to=" '/tasks/' + m._id + '/edit' ">
                <i class="fa fa-fw fa-edit"></i>
              </b-button>

              <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
                <i class="fa fa-fw fa-trash"></i>
              </b-button>

              <!-- Bootstrap Modal Component -->
              <b-modal :id="'modal_' + m._id"
                :title="'Destroy Task?'"
                @ok="onConfirmDestroy(m)"
                ok-variant='danger'
                ok-title='DESTROY'
                cancel-title='Cancel'
              >
                <p class="text-left">Are you sure you want to destroy this Task?</p>
              </b-modal>

            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: 'task/deleteModel'
  })
}
</script>
