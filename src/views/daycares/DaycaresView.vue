<template>
  Daycares View {{ daycareID }}
  <RouterView />
</template>

<script setup>
defineProps({
  daycareID: {
    type: String,
  },
});
</script>
