<template>
  <div class="login">
    <b-field label="Email">
      <b-input v-model="email"></b-input>
    </b-field>
    <b-field label="Password">
      <b-input v-model="password" type="password"></b-input>
    </b-field>
    <b-button type="is-primary" @click="login">Sign In</b-button>
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
          alert(`Logged in as: ${user.user.email}`);
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