<template>

  <div class="row h-100 align-items-center">
    <div class="col-lg-12">


      <div class="row my-2">
        <div class="col-lg-12 text-center">
          <h3 class='display-3'><strong>CRON</strong>OGRAM</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 text-center">
          <p class="welcome-text mb-0">scheduled serverless functions that email their results</p>
        </div>
      </div>

      <div class="row my-4">
        <div class="col-lg-12 text-center">
          <router-link class="btn btn-lg btn-outline-dark mx-2" to="/tasks/new">
            <i class="fa fa-clock"></i>
            Let's get started
          </router-link>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'Home',
    metaInfo: {
      title: 'Home'
    }
  }
</script>

<style lang="sass">
  .welcome-text
    // letter-spacing: .6rem
    font-weight: 300
    font-size: 1rem
</style>
