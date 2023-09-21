<template>
  <AuthBox>
    <div :class="{ relative: showPattern }" class="px-1 md:px-7">
      <template v-if="showPattern">
        <NoticeBg class="absolute right-5 top-2 w-1/3 md:-top-4" />
      </template>

      <header>
        <AppLogo class="mx-auto mb-5 block w-28" />

        <h1 class="mb-6 font-title text-3xl font-extrabold md:text-5xl">
          <slot name="header" />
        </h1>
      </header>

      <div class="md:text-lg">
        <slot name="content" />
      </div>

      <footer class="text-lg">
        <slot name="footer" />
      </footer>
    </div>
  </AuthBox>
</template>

<script lang="ts" setup>
import NoticeBg from './NoticeBg.vue';
import AuthBox from '../../AuthBox.vue';
import AppLogo from '../../AppLogo.vue';

defineProps({
  showPattern: {
    type: Boolean,
    default: false,
  },
});
</script>
