<template>
  <div class="play">
    <button v-if="loggedIn" @click="logout">Logout</button>
    <Emulator />
  </div>
</template>

<script>
// @ is an alias to /src
import Emulator from "@/components/Emulator.vue";
import { auth } from "@/firebase";

export default {
  name: "Play",
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
