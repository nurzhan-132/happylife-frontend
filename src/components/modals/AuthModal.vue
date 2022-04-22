<template>
  <teleport to="body">
    <div class="opacity-color" @click="$router.go(-1)"></div>
    <div class="center">
      <div class="container">
        <div class="text">Login</div>
        <form @submit.prevent="submitForm">
          <div class="data">
            <label>Username</label>
            <input type="text" v-model.trim="username" />
          </div>
          <div class="data" v-if="mode === 'signup'">
            <label>Email</label>
            <input type="email" v-model.trim="email" />
          </div>
          <div class="data">
            <label>Password</label>
            <input type="password" v-model.trim="password" />
          </div>
          <div class="forgot-pass" v-if="mode === 'login'">
            <a>Forgot Password?</a>
          </div>
          <div class="btn">
            <div class="inner"></div>
            <button type="submit">{{ submitButtonCaption }}</button>
          </div>
          <div class="link">
            {{ switchModeDescription }}
            <a @click="switchAuthMode">{{ switchModeButtonCaption }}</a>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup now";
      } else {
        return "Login";
      }
    },
    switchModeDescription() {
      if (this.mode === "login") {
        return "Not a member ?";
      } else {
        return "Has an account?";
      }
    },
  },
  methods: {
    async submitForm() {
      const loginPayload = {
        username: this.username,
        password: this.password,
      };

      const sigunpPayload = {
        username: this.username,
        email: this.email,
        role: ["ROLE_USER"],
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("auth/login", loginPayload);
        } else {
          await this.$store.dispatch("auth/signup", sigunpPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "periodicals");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style scoped>
.opacity-color {
  background-color: #3172ae;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 9998;
  position: absolute;
  top: 0;
  left: 0;
}
.show-btn {
  background: #fff;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 500;
  color: #3498db;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.container {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  display: block;
  background: #fff;
  width: 410px;
  padding: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
#show:checked ~ .container {
  display: block;
}
.container .close-btn {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 18px;
  cursor: pointer;
}
.container .close-btn:hover {
  color: #3498db;
}
.container .text {
  font-size: 35px;
  font-weight: 600;
  text-align: center;
}
.container form {
  margin-top: -20px;
}
.container form .data {
  height: 45px;
  width: 100%;
  margin: 40px 0;
}
form .data label {
  font-size: 18px;
}
form .data input {
  height: 100%;
  width: 100%;
  padding-left: 10px;
  font-size: 17px;
  border: 1px solid silver;
}
form .data input:focus {
  border-color: #3498db;
  border-bottom-width: 2px;
}
form .forgot-pass {
  margin-top: -8px;
  cursor: pointer;
}
form .forgot-pass a {
  color: #3498db;
  text-decoration: none;
}
form .forgot-pass a:hover {
  text-decoration: underline;
}
form .btn {
  margin: 30px 0;
  height: 45px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
form .btn .inner {
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  z-index: -1;
  background: -webkit-linear-gradient(
    right,
    #2b6296,
    #3172ae,
    #2b6296,
    #3172ae
  );
  transition: all 0.4s;
}
form .btn:hover .inner {
  left: 0;
}
form .btn button {
  height: 100%;
  width: 100%;
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}
form .link {
  text-align: center;
}
form .link a {
  color: #3498db;
  text-decoration: none;
  cursor: pointer;
}
form .link a:hover {
  text-decoration: underline;
}
</style>
