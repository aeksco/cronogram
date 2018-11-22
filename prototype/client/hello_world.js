
window.app = {}

Vue.component('todo-list', {
  props: ['todos'],
  template: `
    <ul class='list-group'>
      <todo-item :item="t" v-for="t in todos" />
    </ul>
  `
})

Vue.component('monaco-editor', window['vue-monaco-cdn'].default)

// Layout Component definition
window.app.layout = {
  template: `
    <div class='row mt-4 pt-4'>

      <div class='col-lg-12'>
        <div class='row'>
          <div class='col-lg-5'>
            <div class='form-group'>
              <input class='form-control form-control-lg' v-model="label" placeholder="Script Label">
            </div>
          </div>

          <div class='col-lg-5'>
            <div class='form-group'>
              <input class='form-control form-control-lg' v-model="email" placeholder="E-Mail">
            </div>
          </div>

          <div class='col-lg-2'>
            <button class="btn btn-block btn-success btn-lg" @click="runScript()">
              <i class='fa fa-chevron-right pl-1'></i>
              Run Script
            </button>
          </div>
        </div>
      </div>

      <div class='col-sm-12 mt-3'>
        <monaco-editor
          class="w-100"
          style="height: 20rem;"
          v-model="code"
          theme="vs-dark"
          language="javascript"
        />
      </div>

    </div>
  `,
  data () {
    return {
      code: 'console.log("Hello, Monaco!")',
      label: 'My Task',
      email: 'aeksco@gmail.com'
    }
  },
  methods: {
    runScript () {
      axios.post('/api/jobs', {
        script: this.code,
        label: this.label,
        email: this.email
      })
    }
  }
};

window.app.splash = {
  template: `
    <div class='row h-100 mt-4 pt-4 align-items-center justify-content-center'>
      <div class='col-lg-12 text-center'>
        <h1 class='my-3'>
          <strong>Cronogram</strong>
        </h1>
        <p class='lead my-3 text-muted'>
          Run a serverless function and send the output via email or text
        </p>

        <a href='#/app' class='btn btn-lg btn-outline-primary my-3'>
          <i class='fa fa-clock-o mr-2'></i>
          Let's get started
        </a>
      </div>
    </div>
  `
}