import dagre from "dagre/dist/dagre.min.js"

export function defineLayout(nodes, edges, layouts, direction) {
    const nodeSize = 50

    if (Object.keys(nodes.value).length <= 1 || Object.keys(edges.value).length == 0) {
        return
    }

    // convert graph
    // ref: https://github.com/dagrejs/dagre/wiki
    const g = new dagre.graphlib.Graph()
    // Set an object for the graph label
    g.setGraph({
        rankdir: direction,
        nodesep: nodeSize * 2,
        edgesep: nodeSize,
        ranksep: nodeSize * 2,
    })
    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(() => ({}))

    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    Object.entries(nodes.value).forEach(([nodeId, node]) => {
        g.setNode(nodeId, { label: node.name, width: nodeSize, height: nodeSize })
    })

    // Add edges to the graph.
    Object.values(edges.value).forEach(edge => {
        g.setEdge(edge.source, edge.target)
    })

    dagre.layout(g)

    g.nodes().forEach((nodeId) => {
        // update node position
        const x = g.node(nodeId).x
        const y = g.node(nodeId).y
        layouts.nodes[nodeId] = { x, y }
    })
}