<template>
  <!-- { schema, related_schema, rel } -->
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">User</p>
      <table class="table">
        <thead>
          <th>Username</th>
          <th>E-Mail</th>

        </thead>
        <tbody>
          <tr>
            <td>{{model.username}}</td>
            <td>{{model.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['model']
}
</script>
