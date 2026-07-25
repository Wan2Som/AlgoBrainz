// src/utils/searchAlgorithms.js

export const investorDatabase = [
  { 
    id: 1, name: "NEXEA Angel Network", ticketSize: 50000, industry: "FinTech", type: "Angel Syndicate", 
    focus: "Tech, B2B SaaS, HealthTech", stage: "Pre-Seed", match: "88%", 
    portalUrl: "https://www.nexea.co",
    desc: "Early stage angel investment network providing mentorship and initial capital for scalable tech startups." 
  },
  { 
    id: 2, name: "1337 Ventures", ticketSize: 100000, industry: "FinTech", type: "Venture Capital & Accelerator", 
    focus: "FinTech, SaaS, Pre-seed Tech", stage: "Ideation / Pre-Seed", match: "95%", 
    portalUrl: "https://1337ventures.com", 
    desc: "Leading pre-seed investor specializing in early-stage fintech through their structured accelerator programs." 
  },
  { 
    id: 3, name: "Cradle Fund (CIP Spark)", ticketSize: 150000, industry: "Tech", type: "Government Grant", 
    focus: "Pre-seed, early-stage tech, MVP development", stage: "Ideation / MVP Concept", match: "98%", 
    portalUrl: "https://cradle.com.my", 
    desc: "Perfect conditional grant for Malaysian tech startups at MVP phase to develop and validate early-stage innovations." 
  },
  { 
    id: 4, name: "MDEC (Digital Content Grant)", ticketSize: 200000, industry: "Creative Tech", type: "Government Grant", 
    focus: "Digital Media, Gaming, Animation", stage: "MVP / Early Traction", match: "92%", 
    portalUrl: "https://mdec.my", 
    desc: "Specialized grant supporting local digital content creators and tech developers in commercializing their IPs." 
  },
  { 
    id: 5, name: "Sunway iLabs", ticketSize: 250000, industry: "FinTech", type: "Corporate VC", 
    focus: "Smart Cities, EdTech, PropTech", stage: "Early Traction", match: "90%", 
    portalUrl: "https://innovationlabs.sunway.edu.my", 
    desc: "Corporate venture arm providing capital and access to the vast Sunway ecosystem as a testbed for startups." 
  },
  { 
    id: 6, name: "ScaleUp Malaysia", ticketSize: 300000, industry: "Tech", type: "Accelerator", 
    focus: "Scale-up, B2B, Revenue-generating", stage: "Growth / Series A", match: "85%", 
    portalUrl: "https://www.scaleup.my", 
    desc: "Pegasus-model accelerator focused on helping companies with proven traction scale their operations regionally." 
  },
  { 
    id: 7, name: "Artem Ventures", ticketSize: 500000, industry: "FinTech", type: "Venture Capital", 
    focus: "ESG, FinTech, InsurTech", stage: "Late Seed / Series A", match: "91%", 
    portalUrl: "https://artem.vc", 
    desc: "Partnering with founders building sustainable and impactful technology solutions for the Southeast Asian market." 
  },
];

// Linear Range & Industry Search
export function linearSearchInvestors(data, minTicket, maxTicket, selectedIndustry) {
  let operations = 0;
  const results = [];
  
  for (let i = 0; i < data.length; i++) {
    operations++;
    const matchesTicket = data[i].ticketSize >= minTicket && data[i].ticketSize <= maxTicket;
    const matchesIndustry = selectedIndustry === 'All' || data[i].industry === selectedIndustry;
    
    if (matchesTicket && matchesIndustry) {
      results.push(data[i]);
    }
  }
  return { results, operations, type: 'Linear Search O(n)' };
}

// Binary Search Tree with In-Order Traversal for Range Queries
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

  // BST Range Search O(log n + k)
  rangeSearch(node, minTicket, maxTicket, selectedIndustry, ops = { count: 0 }, results = []) {
    if (node === null) return;
    ops.count++;

    if (minTicket < node.investor.ticketSize) {
      this.rangeSearch(node.left, minTicket, maxTicket, selectedIndustry, ops, results);
    }

    const matchesTicket = node.investor.ticketSize >= minTicket && node.investor.ticketSize <= maxTicket;
    const matchesIndustry = selectedIndustry === 'All' || node.investor.industry === selectedIndustry;

    if (matchesTicket && matchesIndustry) {
      results.push(node.investor);
    }

    if (maxTicket > node.investor.ticketSize) {
      this.rangeSearch(node.right, minTicket, maxTicket, selectedIndustry, ops, results);
    }

    return { results, operations: ops.count, type: 'BST Range Search O(log n + k)' };
  }
}

export const investorTree = new BST();
const insertionOrder = [3, 1, 5, 0, 2, 4, 6]; 
insertionOrder.forEach(i => investorTree.insert(investorDatabase[i]));
