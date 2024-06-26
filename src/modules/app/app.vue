<template>
  <v-app id="app" :theme="theme">
    <v-snackbar
      v-if="config.vuetify.theme.snackbar.status"
      v-model="snackbar.status"
      :top="true"
      :right="true"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn @click="snackbar.status = false" icon>
          <v-icon icon="fa-solid fa-circle-xmark"></v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <waosNav v-if="isLoggedIn" />

    <waosHeader />

    <v-main class="pb-0" :style="{ background: config.vuetify.theme.themes[theme].colors.background }">
      <router-view />
    </v-main>
    <waosFooter
      v-bind:links="config.footer.links"
      v-bind:custom="{
        section: { background: config.vuetify.theme.themes[theme].colors.surface, 'min-width': '100%' },
      }"
    />
  </v-app>
</template>

<script>
/**
 * Module dependencies.
 */
import { mapGetters } from 'vuex';
import waosHeader from '../core/components/core.appbar.component.vue';
import waosNav from '../core/components/core.navigation.component.vue';
import waosFooter from '../core/components/core.footer.component.vue';

/**
 * Export default
 */
export default {
  name: 'App',
  data() {
    return {
      snackbar: {
        status: false,
        color: 'error',
        timeout: 4000,
        text: 'toto',
      },
    };
  },
  head() {
    return {
      title: this.config.app.title,
      htmlAttrs: {
        lang: 'en',
        amp: true,
      },
      description: this.config.app.description,
      meta: [
        { name: 'keywords', content: this.config.app.keywords },
        { name: 'author', content: this.config.app.author },
      ],
    };
  },
  components: {
    waosHeader,
    waosNav,
    waosFooter,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'theme']),
  },
  created() {
    // auth
    this.axios.interceptors.response.use(
      (response) => {
        if (
          this.config.vuetify.theme.snackbar.status &&
          response.config &&
          this.config.vuetify.theme.snackbar.methods.indexOf(response.config.method) > -1
        ) {
          this.snackbar.text = `${response.data.type}: ${response.data.message}`;
          this.snackbar.color = this.config.vuetify.theme.snackbar.sucessColor;
          this.snackbar.status = true;
        }
        return response;
      },
      (err) =>
        new Promise(() => {
          if (err && err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('signout');
            this.snackbar.text = 'Signin failed';
            this.snackbar.color = this.config.vuetify.theme.snackbar.errorColor;
            this.snackbar.status = true;
          }
          if (this.config.vuetify.theme.snackbar.status && err.response && err.response.data && err.response.data.description) {
            this.snackbar.text = err.response.data.description;
            this.snackbar.color = this.config.vuetify.theme.snackbar.errorColor;
            this.snackbar.status = true;
          }
          throw err;
        }),
    );
    // set base theme
  },
};
</script>

<style>
.v-application header a,
.v-application nav a {
  text-decoration: none !important;
  color: rgba(var(--v-theme-onPrimary), 1) !important;
}
.v-application main a:not(.v-btn) {
  text-decoration: none !important;
  font-weight: 400;
  color: rgba(var(--v-theme-secondary), 1) !important;
}
.v-card {
  border: none !important;
}

.v-application .text-overline,
.v-application .text-caption,
.v-application .text-button,
.v-application .text-body-2,
.v-application .text-body-1,
.v-application .text-subtitle-2,
.v-application .text-subtitle-1,
.v-application .text-h6,
.v-application .text-h5,
.v-application .text-h4,
.v-application .text-h3,
.v-application .text-h2,
.v-application .text-h1 {
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
}
</style>
