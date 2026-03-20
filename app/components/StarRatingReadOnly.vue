<template>
    <div class="star-rating-readonly" :class="size">
      <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= rating }">★</span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    rating: { type: Number, default: 0 },
    size: { type: String, default: 'medium' }
  })
  </script>
  
  <style scoped>
  .star-rating-readonly {
    display: inline-flex;
    gap: 2px;
  }
  .star {
    color: #ccc;
  }
  .star.filled {
    color: gold;
  }
  .small .star {
    font-size: 1rem;
  }
  .medium .star {
    font-size: 1.2rem;
  }
  .large .star {
    font-size: 1.5rem;
  }
  </style>