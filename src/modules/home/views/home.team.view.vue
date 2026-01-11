<template>
  <div>
    <homeBannerBlurComponent
      :ratio="3"
      :title="$route.meta.title"
      :animation-speed="config.home.banner?.blur?.animationSpeed || 1"
      :background-colors="themeName === 'dark' ? config.home.banner?.blur?.dark?.backgroundColors : config.home.banner?.blur?.light?.backgroundColors"
      :halo-colors="themeName === 'dark' ? config.home.banner?.blur?.dark?.haloColors : config.home.banner?.blur?.light?.haloColors"
    ></homeBannerBlurComponent>
    <v-container :style="`max-width: ${config.vuetify.theme.maxWidth}`">
      <v-layout wrap align-content-space-around text-xs-center>
        <teamMemberComponent v-for="(item, index) in team" :key="item.id" :item="item" :index="index"></teamMemberComponent>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/**
 * Module dependencies.
 */
import { useTheme } from 'vuetify';
import { useHomeStore } from '../stores/home.store';
import teamMemberComponent from '../components/team.member.component.vue';
import homeBannerBlurComponent from '../components/home.banner.blur.component.vue';

/**
 * Component definition.
 */
export default {
  components: {
    homeBannerBlurComponent,
    teamMemberComponent,
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
    team() {
      const homeStore = useHomeStore();
      return homeStore.team;
    },
  },
  created() {
    const homeStore = useHomeStore();
    homeStore.getTeam(this);
  },
};
</script>
