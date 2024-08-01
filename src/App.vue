<template>
  <div id="app">
    <TreeView :data="gemmaData" />
  </div>
</template>

<script setup>
import TreeView from './components/TreeView.vue'
import gemmaData from '/src/assets/Gemma.json'
import llamaData from '/src/assets/Llama.json'


</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
