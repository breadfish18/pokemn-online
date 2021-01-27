<template>
  <div class="sign-up flex justify-center">
    <div class="container max-w-sm">
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          class="block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <label for="password" class="block text-sm font-medium text-gray-700 mt-3"
        >Password</label
      >
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <label
        for="confirm-password"
        class="block text-sm font-medium text-gray-700 mt-3"
        >Confirm password</label
      >
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="confirm-password"
          v-model="password"
          type="password"
          name="confirm-password"
          class="block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <button
        class="group relative mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="signUp"
      >
        Sign up
      </button>
    </div>
  </div>
</template>
<script>
import { auth } from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp: function () {
      auth.createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert(`Account created: ${user.user.email}`);
          this.$router.push("/");
        },
        (err) => {
          alert(err.message);
        }
      );
    },
  },
};
</script>

<style scoped>
</style>