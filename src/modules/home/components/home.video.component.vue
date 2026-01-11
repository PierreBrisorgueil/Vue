<!--
  HomeVideoComponent
  ==================
  Auto-playing video section, can be positioned under banner with overlap.

  USAGE:
  <homeVideoComponent :setup="config.home.video" />

  CONFIG EXAMPLE (setup object):
  video: {
    file: '/videos/highlight.mp4',
    poster: '/videos/highlight-poster.webp',
    subBanner: true,               // Position under banner with overlap effect
    style: {
      section: { background: 'background' },
      video: { background: '#101115' },
    },
  }

  NOTES:
  - Video auto-plays, loops, and is muted by default
  - subBanner: true creates a -40vh margin-top for overlap effect
-->
<template>
  <section v-if="setup && setup.file" id="video" :style="sectionStyle" class="pa-8 pb-10">
    <v-container
      :class="`text-center pa-4 ${config.vuetify.theme.rounded}`"
      :style="{
        'max-width': config.vuetify.theme.maxWidth,
        'margin-top': setup.subBanner ? ($vuetify.display.smAndDown ? '-20vh' : '-40vh') : 0,
        position: 'relative',
        ...style('video', setup),
      }"
    >
      <video-player :src="setup.file" :poster="setup.poster" :controls="false" loop muted autoplay fluid />
    </v-container>
  </section>
</template>

<script>
/**
 * Module dependencies.
 */
import { useTheme } from 'vuetify';
import VideoPlayer from './utils/home.videoplayer.component.vue';
import { style } from '../../../lib/helpers/theme';

/**
 * Component definition.
 */
export default {
  name: 'HomeVideoComponent',
  components: {
    VideoPlayer,
  },
  props: {
    // video object
    setup: {
      type: Object,
      default: () => ({
        file: 'video.mp4',
        poster: 'video-poster.webp',
        background: '#101115',
      }),
    },
  },
  data() {
    const theme = useTheme();
    return {
      theme,
    };
  },
  computed: {
    variant() {
      return this.setup.variant || 'default';
    },
    sectionStyle() {
      const bgColor = this.variant === 'alternate' ? this.theme.current.colors.surface : this.theme.current.colors.background;
      return {
        ...style('section', this.setup),
        background: bgColor,
      };
    },
  },
  methods: {
    style,
  },
};
</script>
