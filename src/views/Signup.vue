<template>
  <div class="sign-up">
    <input v-model="email" type="text" placeholder="Email" /><br />
    <input v-model="password" type="password" placeholder="Password" /><br />
    <button @click="signUp">Sign Up</button>
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
          alert("Account created", user);
        },
        (err) => {
          alert(err);
        }
      );
    },
  },
};
</script>

<style scoped>
.sign-up {
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