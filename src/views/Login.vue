<template>
  <div class="login">
    <h3>Sign In</h3>
    <input v-model="email" type="text" placeholder="Email" /><br />
    <input v-model="password" type="password" placeholder="Password" /><br />
    <button @click="login">Sign In</button>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert("Signed in", user);
        },
        (err) => {
          alert(err);
        }
      );
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
</style>