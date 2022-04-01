<template>
  <div>
    <!--    <common-header/>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 360px;
  height: 600px;
  background: #000;
}
</style>

<script>
// import CommonHeader from "./components/common/Header.vue";
import {mapActions} from "vuex";

export default {
  name: "App",
  // components: {CommonHeader},
  async mounted() {
    // await this.loadApplication()
  },
  methods: {
    // ...mapActions(["loadApplication"]),
  }
}
</script>
