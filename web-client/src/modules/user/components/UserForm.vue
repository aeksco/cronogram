<template>
  <div class='row'>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Username
<span class='text-danger'>*</span>        </label>
        <small class="form-text text-muted mb-2">The user&#39;s username</small>
        <input type="text" class="form-control" placeholder="Username" v-model="model.username">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          E-Mail
<span class='text-danger'>*</span>        </label>
        <small class="form-text text-muted mb-2">E-Mail address associated with this Contact.</small>
        <input type="text" class="form-control" placeholder="E-Mail" v-model="model.email">
      </div>
    </div>


  </div>
</template>

<!-- // // // //  -->

<script>
import InputTag from 'vue-input-tag'

export default {
  name: 'user_form',
  props: ['model'],
  components: {
    InputTag
  },
  created () {
  },
  computed: {
  }
}
</script>
