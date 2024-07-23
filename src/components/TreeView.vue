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

  const nodes = ref({})
  const edges = ref({})

  onMounted(() => {
    nodes.value = gemmaData.nodes
    edges.value = gemmaData.edges
    console.log(nodes.value)
    console.log(edges.value)
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
  