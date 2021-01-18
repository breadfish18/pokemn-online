<template>
  <div class="home">
    <Emulator msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Emulator from "@/components/Emulator.vue";
import { auth } from "@/firebase";

export default {
  name: "Home",
  components: {
    Emulator,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted: function () {
    console.log(auth.currentUser);
  },
};
</script>
