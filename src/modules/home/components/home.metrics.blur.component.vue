<!--
  HomeStatsBlurComponent
  ======================
  Stats section with animated blur background instead of parallax.
  Uses HomeBlurBackgroundComponent for the animated background.

  USAGE:
  <homeStatsBlurComponent
    :setup="statistics"
    :animation-speed="1.5"
    :background-colors="['#4a90c2', '#3d7eb0', '#2d6a9e', '#1e5a8c', '#164578']"
    :halo-colors="['#0891b2', '#0ea5e9', '#3b82f6', '#0284c7', '#0369a1']"
  />

  PROPS:
  - setup (Array): Array of { value: String, title: String }
  - animationSpeed (Number): Animation speed multiplier (1 = default, 2 = slower)
  - backgroundColors (Array): 5 colors for gradient background
  - haloColors (Array): 5 colors for animated halos

  CONFIG EXAMPLE (config.home.stats.blur):
  stats: {
    blur: {
      animationSpeed: 1.5,
      light: {
        backgroundColors: ['#1e3a5f', '#2d4a6f', '#3d5a7f', '#4d6a8f', '#5d7a9f'],
        haloColors: ['#0891b2', '#0ea5e9', '#3b82f6', '#0284c7', '#0369a1'],
      },
      dark: {
        backgroundColors: ['#0a0a1a', '#1a1a3e', '#2d2d6b', '#3d3d8a', '#2563eb'],
        haloColors: ['#4f46e5', '#7c3aed', '#2563eb', '#6366f1', '#8b5cf6'],
      },
    },
    content: [
      { value: '1000+', title: 'Users' },
      { value: '50', title: 'Releases' },
    ],
  }
-->
<template>
  <section id="stats">
    <homeBlurBackgroundComponent
      :ratio="statsRatio"
      :animation-speed="animationSpeed"
      :background-colors="backgroundColors"
      :halo-colors="haloColors"
      no-margin
    >
      <v-container class="fill-height" :style="`max-width: ${config.vuetify.theme.maxWidth}`">
        <v-row v-if="setup && setup.length > 0" align="center" justify="center">
          <v-col v-for="({ value, title }, i) in setup" :key="i" md="3">
            <div class="text-center text-white" data-aos="fade">
              <div class="font-weight-black text-h3 text-md-h2 mb-4 stats-value" v-text="value"></div>
              <div class="text-uppercase text-body-1 stats-title" v-text="title"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </homeBlurBackgroundComponent>
  </section>
</template>

<script>
import homeBlurBackgroundComponent from './utils/home.blur.background.component.vue';

export default {
  name: 'HomeMetricsBlurComponent',
  components: {
    homeBlurBackgroundComponent,
  },
  props: {
    setup: {
      type: Array,
      required: true,
    },
    // Animation speed multiplier (1.5 recommended for stats - slower than banner)
    animationSpeed: {
      type: Number,
      default: 1.5,
    },
    // Background gradient colors array (5 colors for gradient stops)
    backgroundColors: {
      type: Array,
      default: null,
    },
    // Halo colors array (5 colors for each halo)
    haloColors: {
      type: Array,
      default: null,
    },
  },
  computed: {
    statsRatio() {
      // Smaller ratio for stats section (taller)
      return this.$vuetify?.display?.smAndDown ? 1.5 : 2.5;
    },
  },
};
</script>

<style scoped>
.stats-value {
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.stats-title {
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
}
</style>
