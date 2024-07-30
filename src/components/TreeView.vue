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
  const layouts = ref({
   nodes: {
    GemmaForClassification: { x: 0, y: 0 },
    Model: { x: 0, y: 100 },
    GemmaModel: { x: 0, y: 200 },
    
    embed_tokens: { x: -300, y: 300 },
    Embedding: { x: -300, y: 400 },
    
    layers: { x: 300, y: 300 },
    ModuleList: { x: 300, y: 400 },
    "O-17": { x: 300, y: 500 },
    GemmaDecoderLayer: { x: 300, y: 600 },
    
    self_attn: { x: -300, y: 700 },
    GemmaSdpaAttention: { x: -300, y: 800 },
    
    q_proj: { x: -600, y: 900 },
    linear_q: { x: -600, y: 1000 },
    
    k_proj: { x: -300, y: 900 },
    linear_k: { x: -300, y: 1000 },
    
    v_proj: { x: 0, y: 900 },
    linear_v: { x: 0, y: 1000 },
    
    o_proj: { x: 300, y: 900 },
    linear_o: { x: 300, y: 1000 },
    
    rotary_emb: { x: -300, y: 1100 },
    GemmaRotaryEmbedding: { x: -300, y: 1200 },
    
    mlp: { x: 600, y: 700 },
    GemmaMLP: { x: 600, y: 800 },
    
    gate_proj: { x: 300, y: 900 },
    gate_linear: { x: 300, y: 1000 },
    
    up_proj: { x: 600, y: 900 },
    up_proj_linear: { x: 600, y: 1000 },
    
    down_proj: { x: 900, y: 900 },
    down_proj_linear: { x: 900, y: 1000 },
    
    act_fn: { x: 1200, y: 900 },
    PytorchGELUTanh: { x: 1200, y: 1000 },
    
    input_layernorm: { x: -600, y: 700 },
    GemmaRMSNorm2: { x: -600, y: 800 },
    
    post_attention_layernorm: { x: 300, y: 700 },
    GemmaRMSNorm3: { x: 300, y: 800 },
    
    norm: { x: 0, y: 1300 },
    GemmaRMSNorm: { x: 0, y: 1400 },
    
    Score: { x: -300, y: 100 },
    linear: { x: -300, y: 200 }
}




  })

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
  