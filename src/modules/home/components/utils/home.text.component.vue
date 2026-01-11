<!--
  HomeTextComponent
  =================
  Unified text rendering component for all home sections.
  Replaces home.content.text and home.card.text components.

  USAGE:
  <homeTextComponent :item="item" variant="content" alignment="left" :quote-mode="false" />

  PROPS:
  - item (Object): Content object
  - variant (String): 'content' (minimal) or 'card' (with card structure) - default: 'content'
  - alignment (String): 'left' or 'center' - default: 'left'
  - quoteMode (Boolean): Large text for quotes (only for variant='content') - default: false
  - offpadding (Boolean): Disable padding on title - default: false

  ITEM OBJECT FORMAT:
  {
    subtitle: 'Section Title',
    title: 'Main Title',          // For features
    text: 'Description with **markdown** support.',
    quote: false,                  // Alternative to quoteMode prop
    button: {
      title: 'Read More',
      link: '/article',
      color: '#EA3F7D',            // Only for card variant
    },
  }
-->
<template>
  <div v-if="variant === 'content'" data-aos="fade">
    <homeTitleComponent v-if="item.subtitle" :setup="{ subtitle: item.subtitle }" :offpadding="offpadding"></homeTitleComponent>
    <h2 v-if="item.title" class="text-h4 mb-4">{{ item.title }}</h2>
    <VMarkdown
      v-if="item.text"
      :style="isQuote ? { 'line-height': '1.8em' } : { 'line-height': '1.6em' }"
      :class="[isQuote ? 'text-body-1 text-md-h6' : 'text-body-1', alignment === 'center' ? 'text-center' : 'text-left']"
      class="font-weight-regular"
      :source="item.text"
    />
    <v-btn
      v-if="item.button && item.button.title && item.button.link"
      :href="item.button.link"
      variant="text"
      class="my-4 text-none text-body-1"
      color="secondary"
      size="large"
    >
      {{ item.button.title }}
      <v-icon class="ml-4" size="x-small">fa-solid fa-arrow-right</v-icon>
    </v-btn>
  </div>

  <div v-else-if="variant === 'card'">
    <v-card-title :class="alignment === 'center' ? 'text-center' : 'text-left'">
      <h2 v-if="item.title" class="text-h4 mb-2" v-text="item.title"></h2>
      <h4 v-if="item.subtitle" class="text-h6 text-md-h5 font-weight-bold my-3" v-text="item.subtitle"></h4>
    </v-card-title>
    <v-card-text class="px-6">
      <VMarkdown
        v-if="item.text"
        :class="alignment === 'center' ? 'text-center' : 'text-left'"
        class="text-body-1 font-weight-regular"
        :source="item.text"
      />
    </v-card-text>
    <v-card-actions v-if="item.button" align="center" justify="center">
      <v-spacer>
        <v-btn
          v-if="item.button.title"
          :href="item.button.link"
          class="mb-5 text-none font-weight-bold rounded-lg"
          size="large"
          :style="item.button.color ? { 'border-color': item.button.color, color: item.button.color, 'border-width': '1.5px' } : {}"
          variant="outlined"
        >
          {{ item.button.title }}
        </v-btn>
      </v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
/**
 * Module dependencies.
 */
import homeTitleComponent from './home.title.component.vue';

/**
 * Component definition.
 */
export default {
  name: 'HomeTextComponent',
  components: {
    homeTitleComponent,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    variant: {
      type: String,
      default: 'content',
      validator: (value) => ['content', 'card'].includes(value),
    },
    alignment: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center'].includes(value),
    },
    quoteMode: {
      type: Boolean,
      default: false,
    },
    offpadding: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isQuote() {
      return this.quoteMode || this.item.quote;
    },
  },
};
</script>
