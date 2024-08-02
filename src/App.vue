<template>
    <Graph :width="width" :height="height"/>
</template>

<script setup>
import Graph from './Graph.vue'

const width = 1200
const height = 600
</script>