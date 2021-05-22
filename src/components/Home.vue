<template>
  <div class="vue-tempalte" v-if="user">
    <h3>Welcome</h3>
    <p>{{ user.displayName }}</p>
    <p>{{ user.email }}</p>

    <button
      type="submit"
      class="btn btn-dark btn-lg btn-block"
      @click="logOut()"
    >
      Log out
    </button>

    <Emulator ref="emulator"></Emulator>
  </div>
</template>

<script>
import firebase from "firebase";
import Emulator from "./Emulator.vue";
import { ref, onMounted } from "vue";

export default {
  components: { Emulator },
  data() {
    return {
      user: null,
    };
  },
  setup() {
    const emulator = ref(null);

    onMounted(() => {
      console.log(emulator);
    });

    return {
      emulator,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },
  },
};
</script>