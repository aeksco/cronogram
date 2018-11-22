<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <th>Label</th>
      <th>
        Schedule
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The cron schedule for this task" ></i>
      </th>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <td>Empty</td>
        <td></td>
        <td></td>
      </tr>

      <tr v-for="m in collection" :key="m._id">
        <td>
          <router-link :to=" '/tasks/' + m._id ">
            {{ m.label }}
          </router-link>
        </td>
        <td>{{m.cron}}</td>

        <!-- Edit Task-->
        <td class='text-right'>
          <b-button size="sm" variant="outline-primary" :to=" '/tasks/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
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

