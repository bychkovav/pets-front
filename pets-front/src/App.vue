
  <script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    homeClick() {
      this.$router.push("/");
    },
  },
  watch: {
    authError(v) {
      if (v) {
        this.$store.commit("setUser", null);
        this.$store.commit("setError", ["You don't have access to do that"]);
        this.$router.push({ name: "Login" });
      }
    },
  },
  computed: {
    ...mapGetters({
      current_user: "user",
    }),
    authError() {
      return this.$store.state.authError;
    },
    items() {
      var its = [];
      if (!this.current_user) {
        its.push({ label: "Login", url: "#/login" });
        its.push({ label: "Register", url: "#/register" });
      } else {
        its.push({
          label: "Profile",
          url: "#/profile",
          icon: "pi pi-fw pi-user",
        });

        its.push({
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
          command: (event) => {
            this.$store.commit("setUser", null);
          },
        });
      }

      return its;
    },
  },
};
</script>

<template>
  <header>
    <Menubar :model="items">
      <template #start>
        <img
          class="logo mr-2"
          alt="logo"
          src="./assets/pet.png"
          height="40"
          @click="homeClick()"
        />
      </template>
    </Menubar>
  </header>

  <main class="mt-5">
    <router-view></router-view>
  </main>
</template>

<style>
.logo {
  cursor: pointer;
}
</style>
