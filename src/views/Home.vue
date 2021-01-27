<template>
  <div class="home">
    <button v-if="loggedIn" @click="logout">Logout</button>
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
      loggedIn: !!auth.currentUser,
    };
  },
  methods: {
    logout: function () {
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
