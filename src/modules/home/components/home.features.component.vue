<!--
  HomeFeaturesComponent
  =====================
  Interactive feature switcher with horizontal navigation tabs.

  USAGE:
  <homeFeaturesComponent :setup="config.home.features" />

  CONFIG EXAMPLE (setup object):
  features: {
    title: 'Platform Features',
    subtitle: 'Everything you need to build modern applications',
    defaultActiveId: 'performance',
    style: {
      section: { background: 'background' },
      navCard: { background: 'surface' },
      contentCard: { background: 'surface' },
    },
    items: [
      {
        id: 'performance',
        label: 'Performance',
        icon: 'fa-solid fa-gauge-high',
        title: 'Lightning Fast',
        description: 'Built with performance in mind from the ground up...',
        cta: { text: 'Learn More', link: '/docs/performance' },
        image: '/images/feature-performance.png',
        reversed: false,
      },
      // ... more items
    ],
  }
-->
<template>
  <section id="features" :style="style('section', setup)">
    <v-container :style="`max-width: ${config.vuetify.theme.maxWidth}`">
      <v-row align="center" justify="center" class="px-0 py-8">
        <!-- Title Section -->
        <homeTitleComponent v-if="setup.title" :setup="setup"></homeTitleComponent>

        <!-- Navigation Tabs -->
        <v-slide-group v-model="activeIndex" show-arrows center-active class="pa-4 centered-slide-group">
          <v-slide-group-item v-for="(item, index) in setup.items" :key="item.id" v-slot="{ isSelected, toggle }" :value="index">
            <v-btn
              variant="plain"
              :class="['mx-1', 'rounded-pill', { 'active-feature-btn': isSelected }]"
              size="large"
              :style="isSelected ? activeBtnStyle : inactiveBtnStyle"
              :ripple="false"
              @click="selectFeature(index, toggle)"
            >
              <v-icon v-if="item.icon" :icon="item.icon" size="small" class="mr-2"></v-icon>
              <span class="text-no-wrap">{{ item.label }}</span>
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>

        <!-- Feature Content -->
        <v-window v-model="activeIndex" class="mt-4">
          <v-window-item
            v-for="(item, index) in setup.items"
            :key="item.id"
            :value="index"
            eager
            transition="fade-transition"
            reverse-transition="fade-transition"
          >
            <v-card :class="`${config.vuetify.theme.rounded}`" :flat="config.vuetify.theme.flat" :style="style('contentCard', setup)">
              <v-row :class="item.reversed ? 'flex-row-reverse' : ''" align="center">
                <!-- Text Content -->
                <v-col cols="12" md="6" class="pa-8">
                  <homeTextComponent
                    :key="`text-${index}`"
                    :item="{ title: item.title, text: item.description, button: item.cta }"
                    variant="content"
                    alignment="left"
                  />
                </v-col>

                <!-- Image -->
                <v-col cols="12" md="6" class="pa-8">
                  <v-img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    :class="`${config.vuetify.theme.rounded}`"
                    cover
                    eager
                    aspect-ratio="16/9"
                    :min-height="300"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card>
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
import { style, liquidGlassStyle } from '../../../lib/helpers/theme';
import homeTitleComponent from './utils/home.title.component.vue';
import homeTextComponent from './utils/home.text.component.vue';

/**
 * Component definition.
 */
export default {
  name: 'HomeFeaturesComponent',
  components: {
    homeTitleComponent,
    homeTextComponent,
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
      activeIndex: 0,
    };
  },
  computed: {
    themeName() {
      return this.theme.global.name.value;
    },

    activeBtnStyle() {
      const colors = this.config.vuetify.theme.themes[this.themeName].colors;
      return liquidGlassStyle({
        theme: this.themeName,
        backgroundColor: colors.background,
        surfaceColor: colors.surfaceColor,
        intensity: 1,
        tint: 1,
        variant: 'pill',
        border: 'none',
        extras: {
          color: this.config.vuetify.theme.themes[this.themeName].colors.onSurface,
        },
      });
    },
    inactiveBtnStyle() {
      return {
        backgroundColor: 'transparent',
        opacity: 0.7,
        transition: 'all 0.3s ease',
      };
    },
  },
  mounted() {
    // Set initial active feature based on defaultActiveId
    if (this.setup.defaultActiveId) {
      const index = this.setup.items.findIndex((item) => item.id === this.setup.defaultActiveId);
      if (index !== -1) {
        this.activeIndex = index;
      }
    }

    // Handle deep-linking via hash
    const hash = window.location.hash;
    if (hash.startsWith('#feature=')) {
      const featureId = hash.substring(9);
      const index = this.setup.items.findIndex((item) => item.id === featureId);
      if (index !== -1) {
        this.activeIndex = index;
      }
    }

    // Keyboard navigation
    window.addEventListener('keydown', this.handleKeydown);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    style,
    selectFeature(index, toggle) {
      // Ne permet pas de désélectionner l'item actif
      if (this.activeIndex !== index) {
        toggle();
        const featureId = this.setup.items[index].id;
        window.location.hash = `#feature=${featureId}`;
      }
    },
    handleKeydown(event) {
      if (event.key === 'ArrowLeft') {
        this.activeIndex = Math.max(0, this.activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        this.activeIndex = Math.min(this.setup.items.length - 1, this.activeIndex + 1);
      }
    },
  },
};
</script>

<style scoped>
.centered-slide-group :deep(.v-slide-group__content) {
  justify-content: center;
}

.active-feature-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
</style>
