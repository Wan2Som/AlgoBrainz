// 1. The Dummy Database
export const investorDatabase = [
  { id: 1, name: "NEXEA", ticketSize: 50000, type: "Angel" },
  { id: 2, name: "1337 Ventures", ticketSize: 100000, type: "VC" },
  { id: 3, name: "Cradle Fund", ticketSize: 150000, type: "Grant" },
  { id: 4, name: "MDEC", ticketSize: 200000, type: "Grant" },
  { id: 5, name: "Sunway iLabs", ticketSize: 250000, type: "VC" },
  { id: 6, name: "ScaleUp Malaysia", ticketSize: 300000, type: "Accelerator" },
  { id: 7, name: "Artem Ventures", ticketSize: 500000, type: "VC" },
];

// 2. BASELINE: Linear Search O(n)
export function linearSearchInvestors(data, targetAmount) {
  let operations = 0;
  for (let i = 0; i < data.length; i++) {
    operations++;
    if (data[i].ticketSize === targetAmount) {
      return { result: data[i], operations, type: 'Linear Search O(n)' };
    }
  }
  return { result: null, operations, type: 'Linear Search O(n)' };
}

// 3. OPTIMIZED: Binary Search Tree O(log n)
class Node {
  constructor(investor) {
    this.investor = investor;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  constructor() {
    this.root = null;
  }

  insert(investor) {
    const newNode = new Node(investor);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.investor.ticketSize < node.investor.ticketSize) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  search(node, targetAmount, ops = { count: 0 }) {
    ops.count++;
    if (node === null) return { result: null, operations: ops.count, type: 'BST Search O(log n)' };
    if (targetAmount < node.investor.ticketSize) return this.search(node.left, targetAmount, ops);
    if (targetAmount > node.investor.ticketSize) return this.search(node.right, targetAmount, ops);
    
    return { result: node.investor, operations: ops.count, type: 'BST Search O(log n)' };
  }
}

// Pre-build the tree for the UI to use
export const investorTree = new BST();
const insertionOrder = [3, 1, 5, 0, 2, 4, 6]; 
insertionOrder.forEach(i => investorTree.insert(investorDatabase[i]));