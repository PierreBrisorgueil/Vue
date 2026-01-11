<!--
  HomeStatsParallaxComponent
  ==========================
  Parallax section with statistics counters.

  USAGE:
  <homeStatsParallaxComponent :setup="statistics" />

  CONFIG EXAMPLE (config.home.stats.parallax):
  stats: {
    parallax: {
      image: '/images/parallax.webp',
    },
    content: [
      { value: '1000+', title: 'Users' },
      { value: '50', title: 'Releases' },
      { value: '99%', title: 'Uptime' },
      { value: '24/7', title: 'Support' },
    ],
  }

  NOTE:
  - Uses /images/parallax.webp as default background image
  - Statistics are passed as array to :setup prop
-->
<template>
  <section id="stats" class="black">
    <v-parallax :height="$vuetify.display.smAndDown ? 700 : 500" :src="image">
      <v-container class="fill-height" :style="`max-width: ${config.vuetify.theme.maxWidth}`">
        <v-row v-if="setup && setup.length > 0" align="center" justify="center">
          <v-col v-for="({ value, title }, i) in setup" :key="i" md="3">
            <div class="text-center text-white" data-aos="fade">
              <div class="font-weight-black text-h3 text-md-h2 mb-4" v-text="value"></div>
              <div class="text-uppercase text-body-1" v-text="title"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>

<script>
/**
 * Component definition.
 */
export default {
  name: 'HomeMetricsParallaxComponent',
  props: {
    setup: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      default: '/images/parallax.webp',
    },
  },
};
</script>
