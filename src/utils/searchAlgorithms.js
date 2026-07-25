// src/utils/searchAlgorithms.js

export const investorDatabase = [
  { 
    id: 1, name: "NEXEA Angel Network", ticketSize: 50000, type: "Angel Syndicate", 
    focus: "Tech, B2B SaaS, HealthTech", stage: "Pre-Seed", match: "88%", 
    desc: "Early stage angel investment network providing mentorship and initial capital for scalable tech startups." 
  },
  { 
    id: 2, name: "1337 Ventures", ticketSize: 100000, type: "Venture Capital & Accelerator", 
    focus: "FinTech, SaaS, Pre-seed Tech", stage: "Ideation / Pre-Seed", match: "95%", 
    desc: "Leading pre-seed investor specializing in early-stage fintech through their structured accelerator programs." 
  },
  { 
    id: 3, name: "Cradle Fund (CIP Spark)", ticketSize: 150000, type: "Government Grant", 
    focus: "Pre-seed, early-stage tech, MVP development", stage: "Ideation / MVP Concept", match: "98%", 
    desc: "Perfect conditional grant for Malaysian tech startups at MVP phase to develop and validate early-stage innovations." 
  },
  { 
    id: 4, name: "MDEC (Digital Content Grant)", ticketSize: 200000, type: "Government Grant", 
    focus: "Digital Media, Gaming, Animation", stage: "MVP / Early Traction", match: "92%", 
    desc: "Specialized grant supporting local digital content creators and tech developers in commercializing their IPs." 
  },
  { 
    id: 5, name: "Sunway iLabs", ticketSize: 250000, type: "Corporate VC", 
    focus: "Smart Cities, EdTech, PropTech", stage: "Early Traction", match: "90%", 
    desc: "Corporate venture arm providing capital and access to the vast Sunway ecosystem as a testbed for startups." 
  },
  { 
    id: 6, name: "ScaleUp Malaysia", ticketSize: 300000, type: "Accelerator", 
    focus: "Scale-up, B2B, Revenue-generating", stage: "Growth / Series A", match: "85%", 
    desc: "Pegasus-model accelerator focused on helping companies with proven traction scale their operations regionally." 
  },
  { 
    id: 7, name: "Artem Ventures", ticketSize: 500000, type: "Venture Capital", 
    focus: "ESG, FinTech, InsurTech", stage: "Late Seed / Series A", match: "91%", 
    desc: "Partnering with founders building sustainable and impactful technology solutions for the Southeast Asian market." 
  },
];

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
    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
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

export const investorTree = new BST();
const insertionOrder = [3, 1, 5, 0, 2, 4, 6]; 
insertionOrder.forEach(i => investorTree.insert(investorDatabase[i]));
