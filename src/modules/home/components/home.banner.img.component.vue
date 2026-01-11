<!--
  HomeBannerImgComponent
  ======================
  Image-based banner with optional title, subtitle and button.

  USAGE:
  <homeBannerImgComponent
    :title="'Welcome to **our site**'"
    :subtitle="'Build faster with modern tools'"
    :button="{ title: 'Get Started', color: '#55efc4', link: '/signup' }"
    :banner="'/images/custom-banner.webp'"
    :ratio="3"
  />

  PROPS:
  - title (String): Main title, supports markdown
  - subtitle (String): Subtitle text, supports markdown
  - button (Object): { title: String, color: String, link: String }
  - banner (String): Custom banner image URL (overrides config)
  - ratio (Number|String): Height ratio (e.g., 3 = 33vh), null for full banner

  CONFIG EXAMPLE (config.home.banner.img):
  img: {
    lightBackground: '/images/light.webp',
    darkBackground: '/images/dark.webp',
  }
-->
<template>
  <section id="banner">
    <v-img
      :height="ratio ? `calc(${100 / ratio}vh)` : $vuetify.display.smAndDown ? '70vh' : '90vh'"
      :src="banner ? banner : generateBackground()"
      style="margin-top: -65px"
      max-width="100%"
      cover
      alt="banner"
    >
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col
            class="text-white text-center"
            :style="{
              'margin-top': ratio ? '5vh' : $vuetify.display.smAndDown ? '-5vh' : '-25vh',
            }"
          >
            <div class="mb-5"><VMarkdown v-if="title" class="font-weight-bold text-h4 text-md-h2" :source="title" /></div>
            <div class="mb-10"><VMarkdown v-if="subtitle" class="font-weight-medium text-body-1 text-md-h6" :source="subtitle" /></div>
            <v-btn
              v-if="button && button.title"
              :href="button.link"
              class="text-none font-weight-bold rounded-xl"
              :style="{ 'border-color': button.color, 'border-width': '1.5px' }"
              variant="outlined"
              size="large"
              >{{ button.title }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </section>
</template>

<script>
import { useTheme } from 'vuetify';

/**
 * Component definition.
 */
export default {
  name: 'HomeBannerComponent',
  props: {
    // title to display
    banner: {
      type: String,
      default: null,
    },
    // define a ratio to handle banne height
    ratio: {
      type: [Number, String],
      default: null,
    },
    // title to display
    title: {
      type: String,
      default: null,
    },
    // subtitle to display
    subtitle: {
      type: String,
      default: null,
    },
    // button to display
    button: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const theme = useTheme();
    return {
      theme,
    };
  },
  computed: {
    themeName() {
      return this.theme.global.name.value;
    },
  },
  methods: {
    generateBackground() {
      return this.themeName === 'dark' ? this.config.home.banner?.img?.darkBackground : this.config.home.banner?.img?.lightBackground;
    },
  },
};
</script>
