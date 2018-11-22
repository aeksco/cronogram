<template>
  <div class='row'>

    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Label
          <span class='text-danger'>*</span>        </label>
        <small class="form-text text-muted mb-2">The name of this task</small>
        <input type="text" class="form-control" placeholder="Label" v-model="model.label">
      </div>
    </div>

<!--     <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Dependencies
        </label>
        <small class="form-text text-muted mb-2">The dependent NPM packages for this script</small>
        <InputTag placeholder="Dependencies" :tags.sync="model.dependencies"/>
      </div>
    </div>
 -->
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Schedule
          <span class='text-danger'>*</span>        </label>
        <small class="form-text text-muted mb-2">The cron schedule for this task</small>
        <select type="text" class="form-control" placeholder="Schedule" v-model="model.cron">
          <option :value="c.value" v-for="c in schedules">{{ c.label }}</option>
        </select>
      </div>
    </div>

    <div class="col-lg-12">
      <monaco-editor
        class="editor"
        v-model="model.script"
        theme="vs-dark"
        language="javascript"
      />
    </div>

<!--     <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Description
        </label>
        <small class="form-text text-muted mb-2">The markdown description for this Task</small>
        <input type="text" class="form-control" placeholder="Description" v-model="model.description">
      </div>
    </div> -->

  </div>
</template>

<!-- // // // //  -->

<script>
import MonacoEditor from 'vue-monaco-cdn'
import InputTag from 'vue-input-tag'

export default {
  name: 'task_form',
  props: ['model'],
  components: {
    InputTag,
    MonacoEditor
  },
  data () {
    return {
      schedules: [
        { label: 'Every 1 minute', value: '* * * * *' },
        { label: 'Every 30 minutes', value: '*/30 * * * *' },
        { label: 'Every hour, on the hour', value: '00  */1 * * *' },
        { label: 'Every day at midnight', value: '00  0 * * *' }
      ]
    }
  },
  created () {
    this.$store.dispatch('user/fetchCollection')
  },
  computed: {
    users () {
      return this.$store.getters['user/collection']
    }
  }
}
</script>

<style>
.editor {
  width: 100%;
  height: 400px;
}
</style>
