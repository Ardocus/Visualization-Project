import { createApp } from "vue"
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
import App from "./Graph.vue"

const app = createApp(App)

app.use(VNetworkGraph)
app.mount("#app")
