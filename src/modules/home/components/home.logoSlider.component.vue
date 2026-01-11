<!--
  HomePartnersComponent
  =====================
  Logo carousel with description, ideal for partners or clients showcase.

  USAGE:
  <homePartnersComponent :setup="config.home.partners" />

  CONFIG EXAMPLE (setup object):
  partners: {
    title: 'Our Partners',
    style: {
      section: { background: 'surface' },
      card: { background: 'surface' },
      size: '200px',               // Logo height
    },
    content: [
      {
        img: '/images/partner01.webp',
        link: 'https://partner.com',
        subtitle: 'Partner Name',
        text: 'Description with **markdown** support.',
      },
    ],
  }
-->
<template>
  <section id="partners" :style="sectionStyle">
    <v-container :style="`max-width: ${config.vuetify.theme.maxWidth}`">
      <v-row align="center" justify="center" class="px-0 py-8">
        <homeTitleComponent :setup="setup"></homeTitleComponent>
        <v-window v-if="setup.content.length > 0" class="w-100" show-arrows>
          <template #prev="{ props }">
            <v-btn color="primary" variant="flat" icon="fa-solid fa-chevron-left" size="small" @click="props.onClick"> </v-btn>
          </template>
          <template #next="{ props }">
            <v-btn color="primary" variant="flat" icon="fa-solid fa-chevron-right" size="small" @click="props.onClick"> </v-btn>
          </template>
          <v-window-item v-for="(item, i) in setup.content" :key="i">
            <v-row align="center" justify="center" class="text-center px-16">
              <v-col cols="12" md="2">
                <!-- eslint-disable-next-line -->
                <a v-if="item.link" :href="item.link">
                  <homeImgComponent v-if="item.img" :img="item.img" :height="setup.style.size"></homeImgComponent>
                </a>
              </v-col>
              <v-col cols="12" md="10">
                <homeTextComponent class="pl-5 py-4" :item="item" variant="content" alignment="left"></homeTextComponent>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-row>
    </v-container>
  </section>
</template>
<script>
/**
 * Module dependencies.
 */
import { useTheme } from 'vuetify';
import { style } from '../../../lib/helpers/theme';
import homeTitleComponent from './utils/home.title.component.vue';
import homeImgComponent from './utils/home.img.component.vue';
import homeTextComponent from './utils/home.text.component.vue';
/**
 * Export default
 */
export default {
  name: 'HomeLogoSliderComponent',
  components: {
    homeTitleComponent,
    homeTextComponent,
    homeImgComponent,
  },
  props: {
    setup: {
      type: Object,
      required: true,
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
