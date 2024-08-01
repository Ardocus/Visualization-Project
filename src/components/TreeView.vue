  <script setup>
  import { ref, reactive } from 'vue'
  import * as vNG from "v-network-graph"
  import { defineLayout } from "../utils/layout.js"

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  })

  const nodes = ref(props.data.nodes)
  const edges = ref(props.data.edges)
  const layouts = reactive({
    nodes: {},
  })

  // number of nodes
  const numNodes = Object.keys(nodes.value).length

const configs = vNG.defineConfigs({
  view: {
    autoPanAndZoomOnLoad: "fit-content",
    onBeforeInitialDisplay: () => defineLayout(nodes, edges, layouts, "TB"), // "TB" = top to bottom
  },
  node: {
    normal: { radius: numNodes / 2 },
    label: { direction: "center", color: "#fff" },
  },
  edge: {
    normal: {
      color: "#aaa",
      width: 3,
    },
    margin: 4,
    marker: {
      target: {
        type: "arrow",
        width: 4,
        height: 4,
      },
    },
  },
})
  </script>


<template>
  <div id="app">
    <v-network-graph
      ref="graph"
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
    />
  </div>
</template>
  