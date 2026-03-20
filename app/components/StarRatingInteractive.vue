<template>
    <div class="star-rating-interactive" :class="size">
      <span
        v-for="i in 5"
        :key="i"
        class="star"
        :class="{ filled: i <= (hoverIndex || rating) }"
        @mouseenter="hoverIndex = i"
        @mouseleave="hoverIndex = 0"
        @click="$emit('update-rating', i)"
      >★</span>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    rating: { type: Number, default: 0 },
    size: { type: String, default: 'medium' }
  })
  const emit = defineEmits(['update-rating'])
  
  const hoverIndex = ref(0)
  </script>
  
  <style scoped>
  .star-rating-interactive {
    display: inline-flex;
    gap: 2px;
    cursor: pointer;
  }
  .star {
    color: #ccc;
    transition: transform 0.1s;
  }
  .star.filled {
    color: gold;
  }
  .star:hover {
    transform: scale(1.2);
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