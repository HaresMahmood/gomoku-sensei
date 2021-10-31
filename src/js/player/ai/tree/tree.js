import Node from "./node.js";

export default class Tree {
    constructor(node) {
        this.root = node || new Node();
    }
    
    addChild(parent, child) {
        parent.children.push(child);
    }
}