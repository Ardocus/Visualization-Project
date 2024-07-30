<template>
    <div id="app">
      <v-network-graph
        :nodes="nodes"
        :edges="edges"
        :layouts="layouts"
      />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import gemmaData from '/src/assets/Gemma.json'
  import llamaData from '/src/assets/Llama.json'

  const nodes = ref({})
  const edges = ref({})
  const layouts = ref({})

  onMounted(() => {
    nodes.value = gemmaData.nodes
    edges.value = gemmaData.edges
    layouts.value = gemmaData.layouts
  })
  </script>
  
  <style>
  #app {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .v-network-graph {
    width: 100%;
    height: 100%;
  }
  </style>
  