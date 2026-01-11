<template>
  <div>
    <homeBannerBlurComponent
      v-if="config.home.banner"
      :title="config.home.banner.title"
      :subtitle="config.home.banner.subtitle"
      :button="config.home.banner.button"
      :animation-speed="config.home.banner.blur?.animationSpeed || 1"
      :background-colors="themeName === 'dark' ? config.home.banner.blur?.dark?.backgroundColors : config.home.banner.blur?.light?.backgroundColors"
      :halo-colors="themeName === 'dark' ? config.home.banner.blur?.dark?.haloColors : config.home.banner.blur?.light?.haloColors"
    ></homeBannerBlurComponent>
    <homeVideoComponent v-if="config.home.video" :setup="config.home.video"></homeVideoComponent>
    <homeContentComponent v-if="config.home.contentBlocks" :setup="config.home.contentBlocks"></homeContentComponent>
    <homeContentComponent v-if="config.home.contentBlocksFeatures" :setup="config.home.contentBlocksFeatures"></homeContentComponent>
    <homeTabbedSwitcherComponent v-if="config.home.features" :setup="config.home.features"></homeTabbedSwitcherComponent>
    <homeCardsComponent v-if="config.home.cardCarousel" :setup="config.home.cardCarousel"></homeCardsComponent>
    <homeIconGridComponent v-if="config.home.iconGrid" :setup="config.home.iconGrid"></homeIconGridComponent>
    <homeTimelineComponent v-if="config.home.timeline" :setup="config.home.timeline"></homeTimelineComponent>
    <homeSlideshowComponent v-if="config.home.mediaCarousel" :setup="config.home.mediaCarousel"></homeSlideshowComponent>
    <homeLogoSliderComponent v-if="config.home.logoSlider" :setup="config.home.logoSlider"></homeLogoSliderComponent>
    <homeMediaCarouselComponent
      v-if="config.home.blog && news.length > 0"
      :setup="{ content: news, ...config.home.blog }"
    ></homeMediaCarouselComponent>
    <!-- Stats: blur variant -->
    <homeMetricsBlurComponent
      v-if="config.home.metrics && config.home.metrics.variant === 'blur'"
      :setup="statistics"
      :animation-speed="config.home.metrics.blur?.animationSpeed || 1.5"
      :background-colors="themeName === 'dark' ? config.home.metrics.blur?.dark?.backgroundColors : config.home.metrics.blur?.light?.backgroundColors"
      :halo-colors="themeName === 'dark' ? config.home.metrics.blur?.dark?.haloColors : config.home.metrics.blur?.light?.haloColors"
    ></homeMetricsBlurComponent>
    <homeContactComponent v-if="config.home.contact"></homeContactComponent>
  </div>
</template>

<script>
/**
 * Module dependencies.
 */
import { useTheme } from 'vuetify';
import { useHomeStore } from '../stores/home.store';
import homeBannerBlurComponent from '../components/home.banner.blur.component.vue';
import homeVideoComponent from '../components/home.video.component.vue';
import homeContentComponent from '../components/home.content.component.vue';
import homeCardsComponent from '../components/home.cards.component.vue';
import homeLogoSliderComponent from '../components/home.logoSlider.component.vue';
import homeTabbedSwitcherComponent from '../components/home.tabbedSwitcher.component.vue';
import homeIconGridComponent from '../components/home.iconGrid.component.vue';
import homeTimelineComponent from '../components/home.timeline.component.vue';
import homeSlideshowComponent from '../components/home.slideshow.component.vue';
import homeMediaCarouselComponent from '../components/home.mediaCarousel.component.vue';
import homeMetricsBlurComponent from '../components/home.metrics.blur.component.vue';
import homeContactComponent from '../components/home.contact.component.vue';

/**
 * Component definition.
 */
export default {
  components: {
    homeBannerBlurComponent,
    homeVideoComponent,
    homeContentComponent,
    homeCardsComponent,
    homeLogoSliderComponent,
    homeTabbedSwitcherComponent,
    homeIconGridComponent,
    homeTimelineComponent,
    homeSlideshowComponent,
    homeMetricsBlurComponent,
    homeMediaCarouselComponent,
    homeContactComponent,
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
    news() {
      const homeStore = useHomeStore();
      return homeStore.news;
    },
    statistics() {
      const homeStore = useHomeStore();
      return homeStore.statistics;
    },
  },
  created() {
    const homeStore = useHomeStore();
    if (this.config.home.metrics) {
      homeStore.initStatistics();
      homeStore.getStatistics();
    }
    if (this.config.home.blog) homeStore.getNews();
  },
};
</script>

<style>
.centered-input :deep(input) {
  text-align: center;
  font-size: 20px;
}
</style>
