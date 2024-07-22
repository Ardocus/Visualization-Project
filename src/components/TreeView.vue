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
  import { ref } from 'vue'
  
  const nodes = ref({
    GemmaForClassification: { name: 'GemmaForClassification' },
    Model: { name: 'Model' },
    GemmaModel: { name: 'GemmaModel' },
    Score: { name: 'Score' },
    Linear: { name: 'Linear' }
  })
  
  const edges = ref({
    edge1: { source: 'GemmaForClassification', target: 'Model' },
    edge2: { source: 'Model', target: 'GemmaModel' },
    edge3: { source: 'GemmaForClassification', target: 'Score' },
    edge4: { source: 'Score', target: 'Linear' }
  })
  
  const layouts = ref({
    nodes: {
      GemmaForClassification: { x: 0.0, y: 0.0 },
      Model: { x: -100.0, y: 100.0 },
      GemmaModel: { x: -200.0, y: 200.0 },
      Score: { x: 100.0, y: 100.0 },
      Linear: { x: 200.0, y: 200.0 }
    }
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
  