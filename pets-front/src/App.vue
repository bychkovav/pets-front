
  <script>
import { mapGetters } from "vuex";
import Toast from "primevue/toast";

export default {
  data() {
    return {};
  },
  components: {
    Toast,
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
    errors(v) {
      if (v && v.length) {
        for (const m of v) {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: m,
            life: 3000,
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      current_user: "user",
    }),
    errors() {
      return this.$store.state.errors;
    },
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
            this.$store.commit('setAuthError', true);
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
    <Toast />
    <router-view> </router-view>
  </main>
</template>

<style>
.logo {
  cursor: pointer;
}
</style>
