<!--
  HomeBannerBlurComponent
  =======================
  Animated blur banner with traversing halo effects.
  Uses HomeBlurBackgroundComponent for the animated background.

  USAGE:
  <homeBannerBlurComponent
    :title="'Welcome to **our site**'"
    :subtitle="'Build faster with modern tools'"
    :button="{ title: 'Get Started', link: '/signup' }"
    :ratio="3"
    :animation-speed="1"
    :background-colors="['#4a90c2', '#3d7eb0', '#2d6a9e', '#1e5a8c', '#164578']"
    :halo-colors="['#0891b2', '#0ea5e9', '#3b82f6', '#0284c7', '#0369a1']"
  />

  PROPS:
  - title (String): Main title, supports markdown
  - subtitle (String): Subtitle text, supports markdown
  - button (Object): { title: String, link: String }
  - ratio (Number|String): Height ratio (e.g., 3 = 33vh), null for full banner
  - animationSpeed (Number): Animation speed multiplier (1 = default, 0.5 = faster, 2 = slower)
  - backgroundColors (Array): 5 colors for gradient background
  - haloColors (Array): 5 colors for animated halos

  CONFIG EXAMPLE (config.home.banner.blur):
  blur: {
    animationSpeed: 1,
    light: {
      backgroundColors: ['#4a90c2', '#3d7eb0', '#2d6a9e', '#1e5a8c', '#164578'],
      haloColors: ['#0891b2', '#0ea5e9', '#3b82f6', '#0284c7', '#0369a1'],
    },
    dark: {
      backgroundColors: ['#0a0a1a', '#1a1a3e', '#2d2d6b', '#3d3d8a', '#2563eb'],
      haloColors: ['#4f46e5', '#7c3aed', '#2563eb', '#6366f1', '#8b5cf6'],
    },
  }
-->
<template>
  <section id="banner">
    <homeBlurBackgroundComponent :ratio="ratio" :animation-speed="animationSpeed" :background-colors="backgroundColors" :halo-colors="haloColors">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col
            class="text-white text-center"
            :style="{
              'margin-top': ratio ? '5vh' : $vuetify.display.smAndDown ? '-5vh' : '-15vh',
            }"
          >
            <div class="mb-5">
              <VMarkdown v-if="title" class="font-weight-bold text-h4 text-md-h2 blur-title" :source="title" />
            </div>
            <div class="mb-10">
              <VMarkdown v-if="subtitle" class="font-weight-medium text-body-1 text-md-h6 blur-subtitle" :source="subtitle" />
            </div>
            <v-btn
              v-if="button && button.title"
              :href="button.link"
              class="text-none font-weight-bold blur-btn"
              :class="config.vuetify.theme.rounded"
              variant="flat"
              size="large"
            >
              {{ button.title }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </homeBlurBackgroundComponent>
  </section>
</template>

<script>
import homeBlurBackgroundComponent from './utils/home.blur.background.component.vue';

export default {
  name: 'HomeBannerBlurComponent',
  components: {
    homeBlurBackgroundComponent,
  },
  props: {
    ratio: {
      type: [Number, String],
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    button: {
      type: Object,
      default: () => ({}),
    },
    // Animation speed multiplier (1 = default, 0.5 = twice as fast, 2 = twice as slow)
    animationSpeed: {
      type: Number,
      default: 1,
    },
    // Background gradient colors array (4-5 colors for gradient stops)
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
};
</script>

<style scoped>
/* ============================================
   CONTENT STYLES
   ============================================ */

.blur-title :deep(*) {
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.blur-subtitle :deep(*) {
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
}

.blur-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  transition: all 0.3s ease;
}

.blur-btn:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>
