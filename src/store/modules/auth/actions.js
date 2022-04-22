// let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "http://localhost:8899/api/auth/signin";

    let body = {
      username: payload.username,
      password: payload.password,
      returnSecureToken: true,
    };

    if (mode === "signup") {
      url = "http://localhost:8899/api/auth/signup";

      body = {
        username: payload.username,
        email: payload.email,
        role: payload.role,
        password: payload.password,
        returnSecureToken: true,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    // const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    // const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("accessToken", responseData.accessToken);
    localStorage.setItem("id", responseData.id);
    localStorage.setItem("email", responseData.email);
    localStorage.setItem("username", responseData.username);
    localStorage.setItem("roles", responseData.roles);
    // localStorage.setItem("tokenExpiration", expirationDate);

    // timer = setTimeout(function () {
    //   context.dispatch("autoLogout");
    // }, expiresIn);

    console.log(responseData);
    context.commit("setUser", {
      accessToken: responseData.accessToken,
      id: responseData.id,
      username: responseData.username,
      roles: responseData.roles,
      email: responseData.email,
    });
  },
  tryLogin(context) {
    const accessToken = localStorage.getItem("accessToken");
    const id = localStorage.getItem("id");
    // const tokenExpiration = localStorage.getItem('tokenExpiration');

    // const expiresIn = +tokenExpiration - new Date().getTime();

    // if (expiresIn < 0) {
    //   return;
    // }

    if (accessToken && id) {
      context.commit("setUser", {
        accessToken: accessToken,
        id: id,
      });
    }
  },

  logout(context) {
    localStorage.removeItem("id");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("pinned");
    // localStorage.removeItem("tokenExpiration");

    context.commit("setUser", {
      accessToken: null,
      id: null,
      email: null,
      username: null,
      roles: [],
    });

    context.commit("pinned/setPinned", null, { root: true });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
