<script setup>
import { nextTick, ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { initialEdges, initialNodes } from './assets/json/gemma.js'
import Icon from './components/Icon.vue'
import DropzoneBackground from './components/DropzoneBackground.vue'
import Sidebar from './components/Sidebar.vue'
import { useLayout } from './utils/useLayout'
import useDragAndDrop from './utils/useDnD'

const props = defineProps(['width', 'height'])

const { graph, layout, previousDirection } = useLayout()

/**
 * `useVueFlow` provides:
 * 1. a set of methods to interact with the VueFlow instance (like `fitView`, `setViewport`, `addEdges`, etc)
 * 2. a set of event-hooks to listen to VueFlow events (like `onInit`, `onNodeDragStop`, `onConnect`, etc)
 * 3. the internal state of the VueFlow instance (like `nodes`, `edges`, `viewport`, etc)
 */
const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject, fitView } = useVueFlow()


const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

// our dark mode toggle flag
const dark = ref(false)

// our left-to-right toggle flag
const direction = ref('TB')

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((connection) => {
  addEdges(connection)
})

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject())
}

function toggleDarkMode() {
  dark.value = !dark.value
}

async function toggleLayout(shouldToggle=true) {
  if(shouldToggle) {
    direction.value = direction.value === 'TB' ? 'LR' : 'TB'
  }

  nodes.value = layout(nodes.value, edges.value, direction.value)

  nextTick(() => {
    fitView()
  })
}

console.log(props.width)
</script>

<template>
  <div class="dnd-flow" @drop="onDrop" >
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :class="{ dark }"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.2"
    :max-zoom="4"
    :prevent-scrolling="false"
    @nodes-initialized="toggleLayout(false)"
    @dragover="onDragOver" 
    @dragleave="onDragLeave"
  >

    <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>

    <MiniMap pannable zoomable/>

    <Controls position="top-left">

      <ControlButton :draggable="true" @dragstart="onDragStart($event, 'input')" title="Add Node">
        <Icon name="add" />
      </ControlButton>

      <ControlButton title="Toggle Orientation" @click="toggleLayout">
        <Icon v-if="direction == 'TB'" name="l-r" />
        <Icon v-else name="t-b" />
      </ControlButton>

      <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <Icon v-if="dark" name="sun" />
        <Icon v-else name="moon" />
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        <Icon name="log" />
      </ControlButton>

    </Controls>
  </VueFlow>
</div>
</template>

<style>
@import './assets/css/main.css';
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/minimap/dist/style.css';
@import '@vue-flow/controls/dist/style.css'
</style>