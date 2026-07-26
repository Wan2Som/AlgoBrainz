/**
 * searchAlgorithms.js
 * Includes the 31-item database, BST implementation, Linear Search, 
 * and the Fallback Helper for deterministic O(log N + K) vs O(N) comparisons.
 */

export const investorDatabase = [
  // RM 50,000 Tier
  { id: 1, name: "NEXEA Angel Network", industry: "FinTech", minTicket: 50000, maxTicket: 1000000, portalUrl: "https://www.nexea.co" },
  { id: 2, name: "Kinesys Group", industry: "HealthTech", minTicket: 50000, maxTicket: 200000, portalUrl: "https://example.com/kinesys" },
  { id: 3, name: "Cradle CIP Spark", industry: "SaaS", minTicket: 50000, maxTicket: 150000, portalUrl: "https://www.cradle.com.my/cip-spark/" },
  { id: 4, name: "Quest Ventures", industry: "E-Commerce", minTicket: 50000, maxTicket: 500000, portalUrl: "https://www.questventures.com" },
  { id: 5, name: "Bioeconomy Corp Grant", industry: "AgriTech", minTicket: 50000, maxTicket: 500000, portalUrl: "https://example.com/bioeconomy" },
  
  // RM 100,000 Tier
  { id: 6, name: "Gobi Partners (Seed)", industry: "E-Commerce", minTicket: 100000, maxTicket: 1000000, portalUrl: "https://gobi.vc" },
  { id: 7, name: "1337 Ventures", industry: "FinTech", minTicket: 100000, maxTicket: 500000, portalUrl: "https://1337ventures.com" },
  { id: 8, name: "TinkBig Venture", industry: "SaaS", minTicket: 100000, maxTicket: 300000, portalUrl: "https://example.com/tinkbig" },
  { id: 9, name: "Artem Ventures", industry: "HealthTech", minTicket: 100000, maxTicket: 500000, portalUrl: "https://artem.vc" },
  { id: 10, name: "Sunway iLabs", industry: "AgriTech", minTicket: 100000, maxTicket: 250000, portalUrl: "https://innovationlabs.sunway.edu.my" },

  // RM 250,000 Tier
  { id: 11, name: "500 Global (Malaysia)", industry: "SaaS", minTicket: 250000, maxTicket: 1500000, portalUrl: "https://500.co" },
  { id: 12, name: "KK Fund", industry: "FinTech", minTicket: 250000, maxTicket: 800000, portalUrl: "https://kkfund.co" },
  { id: 13, name: "Ficus Capital", industry: "HealthTech", minTicket: 250000, maxTicket: 1000000, portalUrl: "https://ficus.vc" },
  { id: 14, name: "Netrove Partners", industry: "E-Commerce", minTicket: 250000, maxTicket: 750000, portalUrl: "https://netrove.com" },
  { id: 15, name: "AgFunder Asia", industry: "AgriTech", minTicket: 250000, maxTicket: 2000000, portalUrl: "https://agfunder.com" },

  // RM 500,000 Tier
  { id: 16, name: "Cradle Seed Ventures", industry: "FinTech", minTicket: 500000, maxTicket: 2000000, portalUrl: "https://cradle.com.my" },
  { id: 17, name: "Vertex Ventures", industry: "SaaS", minTicket: 500000, maxTicket: 3000000, portalUrl: "https://vertexventures.sg" },
  { id: 18, name: "Jungle Ventures", industry: "E-Commerce", minTicket: 500000, maxTicket: 2500000, portalUrl: "https://jungle.vc" },
  { id: 19, name: "Mavcap", industry: "HealthTech", minTicket: 500000, maxTicket: 3500000, portalUrl: "https://mavcap.com" },
  { id: 20, name: "Bintang Capital", industry: "AgriTech", minTicket: 500000, maxTicket: 4000000, portalUrl: "https://bintangcapital.com" },

  // RM 1,000,000 Tier
  { id: 21, name: "Vickers Venture", industry: "HealthTech", minTicket: 1000000, maxTicket: 5000000, portalUrl: "https://vickersventure.com" },
  { id: 22, name: "Insignia Ventures", industry: "FinTech", minTicket: 1000000, maxTicket: 4000000, portalUrl: "https://insignia.vc" },
  { id: 23, name: "Openspace Ventures", industry: "SaaS", minTicket: 1000000, maxTicket: 5000000, portalUrl: "https://openspace.vc" },
  { id: 24, name: "Monk's Hill", industry: "E-Commerce", minTicket: 1000000, maxTicket: 6000000, portalUrl: "https://monkshill.com" },
  { id: 25, name: "Navis Capital", industry: "AgriTech", minTicket: 1000000, maxTicket: 8000000, portalUrl: "https://naviscapital.com" },

  // RM 2,000,000+ Tier
  { id: 26, name: "Catcha Group", industry: "SaaS", minTicket: 2000000, maxTicket: 10000000, portalUrl: "https://catchagroup.com" },
  { id: 27, name: "Kazanah Nasional", industry: "FinTech", minTicket: 2000000, maxTicket: 15000000, portalUrl: "https://khazanah.com.my" },
  { id: 28, name: "KWAP", industry: "HealthTech", minTicket: 2000000, maxTicket: 20000000, portalUrl: "https://kwap.gov.my" },
  { id: 29, name: "EPF Private Equity", industry: "E-Commerce", minTicket: 2500000, maxTicket: 25000000, portalUrl: "https://kwsp.gov.my" },
  { id: 30, name: "Creador", industry: "SaaS", minTicket: 3000000, maxTicket: 30000000, portalUrl: "https://creador.com" },
  { id: 31, name: "Affinity Equity", industry: "AgriTech", minTicket: 5000000, maxTicket: 50000000, portalUrl: "https://affinityequity.com" }
].sort((a, b) => a.minTicket - b.minTicket); // Sorted numerically for the BST balancer

// --- HELPER: FALLBACK LOGIC ---
export function getClosestFallback(data, searchMin, searchMax, selectedIndustry) {
  const industryPool = selectedIndustry === 'All' 
    ? data 
    : data.filter(inv => inv.industry === selectedIndustry);

  const sortedByCloseness = [...industryPool].sort((a, b) => {
    const diffA = Math.abs(a.minTicket - searchMax);
    const diffB = Math.abs(b.minTicket - searchMax);
    return diffA - diffB;
  });

  return sortedByCloseness.slice(0, 3);
}

// --- ALGORITHM 1: LINEAR SEARCH O(N) ---
export function linearSearchInvestors(data, minInput, maxInput, selectedIndustry) {
  let operations = 0;
  const results = [];
  
  for (let i = 0; i < data.length; i++) {
    operations++;
    const inv = data[i];
    const industryMatch = selectedIndustry === 'All' || inv.industry === selectedIndustry;
    const rangeOverlap = inv.minTicket <= maxInput && inv.maxTicket >= minInput;

    if (industryMatch && rangeOverlap) {
      results.push(inv);
    }
  }
  return { results, operations };
}

// --- ALGORITHM 2: BINARY SEARCH TREE O(log N + K) ---
export class TreeNode {
  constructor(investor) {
    this.investor = investor;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(investor) {
    const newNode = new TreeNode(investor);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (investor.minTicket < current.investor.minTicket) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  // O(log N + K) Range Query
  rangeSearch(node, minInput, maxInput, selectedIndustry, operations = { count: 0 }, results = []) {
    if (!node) return { results, operations: operations.count };

    operations.count++;
    
    // Check Overlap
    const inv = node.investor;
    const industryMatch = selectedIndustry === 'All' || inv.industry === selectedIndustry;
    const rangeOverlap = inv.minTicket <= maxInput && inv.maxTicket >= minInput;

    if (industryMatch && rangeOverlap) {
      results.push(inv);
    }

    // Traverse Left: Only if there's a possibility of valid minTickets to the left
    if (minInput < inv.minTicket) {
      this.rangeSearch(node.left, minInput, maxInput, selectedIndustry, operations, results);
    }

    // Traverse Right: We always check right because minTickets scale upwards
    // As long as the node's minTicket isn't astronomically higher than our maxInput
    if (inv.minTicket <= maxInput) {
      this.rangeSearch(node.right, minInput, maxInput, selectedIndustry, operations, results);
    }

    return { results, operations: operations.count };
  }
}

// --- HELPER: PERFECT BST BALANCER ---
export function balancedInsertionOrder(data) {
  if (data.length === 0) return [];
  const mid = Math.floor(data.length / 2);
  const root = data[mid];
  const leftHalf = data.slice(0, mid);
  const rightHalf = data.slice(mid + 1);
  return [root, ...balancedInsertionOrder(leftHalf), ...balancedInsertionOrder(rightHalf)];
}

// --- INITIALIZE AND EXPORT THE BALANCED TREE ---
export const investorTree = new BinarySearchTree();

// Balance the data before inserting it to ensure O(log N) depth
const balancedData = balancedInsertionOrder(investorDatabase);

// Insert the balanced data into the tree
balancedData.forEach(inv => investorTree.insert(inv));
