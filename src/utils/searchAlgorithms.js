// src/utils/searchAlgorithms.js

// 1. The 50 Real Investors
const base50Investors = [
  { id: 1, name: "1337 Ventures", type: "VC", minTicket: 50000, maxTicket: 250000, industry: "Fintech", website: "https://1337.ventures", faq: "https://1337.ventures" },
  { id: 2, name: "Gobi Partners", type: "VC", minTicket: 500000, maxTicket: 5000000, industry: "Technology", website: "https://gobi.vc", faq: "https://gobi.vc" },
  { id: 3, name: "500 Global", type: "VC", minTicket: 250000, maxTicket: 2000000, industry: "E-Commerce", website: "https://500.co", faq: "https://500.co" },
  { id: 4, name: "RHL Ventures", type: "VC", minTicket: 1000000, maxTicket: 10000000, industry: "All", website: "https://rhl.vc", faq: "https://rhl.vc" },
  { id: 5, name: "Vynn Capital", type: "VC", minTicket: 200000, maxTicket: 1500000, industry: "Mobility", website: "https://vynncapital.com", faq: "https://vynncapital.com" },
  { id: 6, name: "Sun SEA Capital", type: "Corporate VC", minTicket: 500000, maxTicket: 3000000, industry: "Healthcare", website: "https://sunway.com.my", faq: "https://sunway.com.my" },
  { id: 7, name: "OSK Ventures", type: "VC", minTicket: 1000000, maxTicket: 8000000, industry: "Enterprise Tech", website: "https://oskvi.com", faq: "https://oskvi.com" },
  { id: 8, name: "Ficus Capital", type: "Shariah VC", minTicket: 200000, maxTicket: 1000000, industry: "Technology", website: "https://ficus.vc", faq: "https://ficus.vc" },
  { id: 9, name: "NEXEA", type: "Early-Stage VC", minTicket: 50000, maxTicket: 1000000, industry: "Education", website: "https://nexea.co", faq: "https://nexea.co" },
  { id: 10, name: "MAVCAP", type: "Gov-Backed VC", minTicket: 500000, maxTicket: 5000000, industry: "Technology", website: "https://mavcap.com", faq: "https://mavcap.com" },
  { id: 11, name: "Cradle Fund", type: "Government Fund", minTicket: 50000, maxTicket: 500000, industry: "All", website: "https://cradle.com.my", faq: "https://cradle.com.my" },
  { id: 12, name: "Antler Malaysia", type: "Global VC", minTicket: 100000, maxTicket: 500000, industry: "Technology", website: "https://antler.co", faq: "https://antler.co" },
  { id: 13, name: "Indelible Ventures", type: "Seed-stage VC", minTicket: 100000, maxTicket: 750000, industry: "B2B SaaS", website: "https://indelible.vc", faq: "https://indelible.vc" },
  { id: 14, name: "East Ventures", type: "VC", minTicket: 300000, maxTicket: 3000000, industry: "All", website: "https://east.vc", faq: "https://east.vc" },
  { id: 15, name: "Jungle Ventures", type: "VC", minTicket: 1000000, maxTicket: 10000000, industry: "Technology", website: "https://jungle.vc", faq: "https://jungle.vc" },
  { id: 16, name: "Golden Gate Ventures", type: "VC", minTicket: 500000, maxTicket: 5000000, industry: "Fintech", website: "https://goldengate.vc", faq: "https://goldengate.vc" },
  { id: 17, name: "Insignia Ventures", type: "VC", minTicket: 1000000, maxTicket: 8000000, industry: "All", website: "https://insignia.vc", faq: "https://insignia.vc" },
  { id: 18, name: "Alpha JWC", type: "VC", minTicket: 500000, maxTicket: 4000000, industry: "Retail", website: "https://alphajwc.com", faq: "https://alphajwc.com" },
  { id: 19, name: "Qualgro", type: "VC", minTicket: 1000000, maxTicket: 5000000, industry: "SaaS", website: "https://qualgro.com", faq: "https://qualgro.com" },
  { id: 20, name: "Vertex Ventures", type: "VC", minTicket: 2000000, maxTicket: 10000000, industry: "Technology", website: "https://vertexventures.sg", faq: "https://vertexventures.sg" },
  { id: 21, name: "MBAN", type: "Angel Network", minTicket: 10000, maxTicket: 100000, industry: "All", website: "https://mban.com.my", faq: "https://mban.com.my" },
  { id: 22, name: "Kumpulan Modal Perdana", type: "VC", minTicket: 500000, maxTicket: 4000000, industry: "Deeptech", website: "https://kmp.com.my", faq: "https://kmp.com.my" },
  { id: 23, name: "Navis Capital", type: "Private Equity", minTicket: 5000000, maxTicket: 50000000, industry: "All", website: "https://naviscapital.com", faq: "https://naviscapital.com" },
  { id: 24, name: "The Hive SEA", type: "Co-creation Studio", minTicket: 100000, maxTicket: 500000, industry: "Data Science", website: "https://thehivesea.com", faq: "https://thehivesea.com" },
  { id: 25, name: "VentureTech", type: "VC", minTicket: 500000, maxTicket: 2500000, industry: "Tech", website: "https://venturetech.com.my", faq: "https://venturetech.com.my" },
  { id: 26, name: "PitchIn", type: "Angel", minTicket: 10000, maxTicket: 250000, industry: "All", website: "https://pitchin.my", faq: "https://pitchin.my" },
  { id: 27, name: "Artem Ventures", type: "VC", minTicket: 100000, maxTicket: 1500000, industry: "Impact", website: "https://artem.vc", faq: "https://artem.vc" },
  { id: 28, name: "Bintang Capital", type: "Private Equity", minTicket: 2000000, maxTicket: 10000000, industry: "ESG", website: "https://bintangcapital.com", faq: "https://bintangcapital.com" },
  { id: 29, name: "Tuas Capital", type: "VC", minTicket: 1000000, maxTicket: 5000000, industry: "All", website: "https://tuascapital.com", faq: "https://tuascapital.com" },
  { id: 30, name: "Penjana Kapital", type: "Government Fund", minTicket: 500000, maxTicket: 5000000, industry: "All", website: "https://penjanakapital.com.my", faq: "https://penjanakapital.com.my" },
  { id: 31, name: "Xeraya Capital", type: "VC", minTicket: 1000000, maxTicket: 8000000, industry: "Life Sciences", website: "https://xeraya.com", faq: "https://xeraya.com" },
  { id: 32, name: "MTDC", type: "Gov-Backed VC", minTicket: 50000, maxTicket: 5000000, industry: "Technology", website: "https://mtdc.com.my", faq: "https://mtdc.com.my" },
  { id: 33, name: "KSK Capital", type: "Corporate VC", minTicket: 250000, maxTicket: 2000000, industry: "PropTech", website: "https://kskgroup.com", faq: "https://kskgroup.com" },
  { id: 34, name: "Quest Ventures", type: "VC", minTicket: 100000, maxTicket: 1500000, industry: "Digital Economy", website: "https://questventures.com", faq: "https://questventures.com" },
  { id: 35, name: "Access Ventures", type: "VC", minTicket: 250000, maxTicket: 2000000, industry: "Enterprise", website: "https://accessvc.co", faq: "https://accessvc.co" },
  { id: 36, name: "Ondine Capital", type: "VC", minTicket: 500000, maxTicket: 3000000, industry: "Consumer", website: "https://ondinecap.com", faq: "https://ondinecap.com" },
  { id: 37, name: "Monks Hill", type: "VC", minTicket: 1000000, maxTicket: 5000000, industry: "Tech", website: "https://monkshill.com", faq: "https://monkshill.com" },
  { id: 38, name: "Openspace Ventures", type: "VC", minTicket: 1500000, maxTicket: 8000000, industry: "B2C", website: "https://openspace.vc", faq: "https://openspace.vc" },
  { id: 39, name: "Wavemaker", type: "VC", minTicket: 500000, maxTicket: 2500000, industry: "Deep Tech", website: "https://wavemaker.vc", faq: "https://wavemaker.vc" },
  { id: 40, name: "AC Ventures", type: "VC", minTicket: 200000, maxTicket: 4000000, industry: "All", website: "https://acv.vc", faq: "https://acv.vc" },
  { id: 41, name: "Asia Partners", type: "Growth Equity", minTicket: 5000000, maxTicket: 20000000, industry: "Tech", website: "https://asiapartners.com", faq: "https://asiapartners.com" },
  { id: 42, name: "Cocoon Capital", type: "VC", minTicket: 100000, maxTicket: 1000000, industry: "B2B", website: "https://cocooncap.com", faq: "https://cocooncap.com" },
  { id: 43, name: "STRIVE", type: "VC", minTicket: 250000, maxTicket: 2000000, industry: "SaaS", website: "https://strive.vc", faq: "https://strive.vc" },
  { id: 44, name: "Cento Ventures", type: "VC", minTicket: 500000, maxTicket: 3000000, industry: "Digital", website: "https://cento.vc", faq: "https://cento.vc" },
  { id: 45, name: "Spiral Ventures", type: "VC", minTicket: 200000, maxTicket: 1500000, industry: "All", website: "https://spiralcap.com", faq: "https://spiralcap.com" },
  { id: 46, name: "KK Fund", type: "Seed VC", minTicket: 50000, maxTicket: 500000, industry: "Internet", website: "https://kkfund.co", faq: "https://kkfund.co" },
  { id: 47, name: "Playfair Capital", type: "VC", minTicket: 100000, maxTicket: 1000000, industry: "Tech", website: "https://playfair.vc", faq: "https://playfair.vc" },
  { id: 48, name: "FEBE Ventures", type: "VC", minTicket: 150000, maxTicket: 1000000, industry: "All", website: "https://febe.vc", faq: "https://febe.vc" },
  { id: 49, name: "Kairous Capital", type: "Cross-border VC", minTicket: 500000, maxTicket: 5000000, industry: "Tech", website: "https://kairous.com", faq: "https://kairous.com" },
  { id: 50, name: "Genesis Alternative", type: "Venture Debt", minTicket: 1000000, maxTicket: 10000000, industry: "All", website: "https://genesisventures.co", faq: "https://genesisventures.co" }
];

// 2. Dynamic Generator to scale to 50 (or 10,000 for stress tests)
function generateData(targetSize) {
  let db = [...base50Investors];
  for (let i = base50Investors.length; i < targetSize; i++) {
    const seed = base50Investors[Math.floor(Math.random() * base50Investors.length)];
    // Randomize ticket ranges for clones to keep the BST deeply branched
    const randomMin = Math.floor(Math.random() * 50) * 10000 + 50000;
    const randomMax = randomMin + Math.floor(Math.random() * 100) * 50000 + 100000;
    
    db.push({
      ...seed,
      id: i + 1,
      name: `${seed.name} (Clone ${i + 1})`,
      minTicket: randomMin,
      maxTicket: randomMax
    });
  }
  
  // CRITICAL: Sort by minTicket before auto-balancing
  return db.sort((a, b) => a.minTicket - b.minTicket);
}

// Keep it at 50 for the default frontend UI, or change to 10000 for the stress test
export const investorDatabase = generateData(50);

// 3. Linear Range Search Logic (With DOM Crash Protection)
export function linearSearchInvestors(data, targetMin, targetMax, selectedIndustry) {
  let operations = 0;
  let totalMatches = 0;
  const results = [];
  
  for (let i = 0; i < data.length; i++) {
    operations++;
    const inv = data[i];
    
    // Check if investor range overlaps with the requested target range
    const matchesTicket = inv.minTicket <= targetMax && inv.maxTicket >= targetMin;
    const matchesIndustry = selectedIndustry === 'All' || inv.industry === selectedIndustry;
    
    if (matchesTicket && matchesIndustry) {
      totalMatches++;
      // Only push a maximum of 50 items to avoid freezing the UI
      if (results.length < 50) {
        results.push(inv);
      }
    }
  }
  return { results, operations, totalMatches, type: 'Linear Search O(n)' };
}

// 4. Binary Search Tree Nodes
class Node {
  constructor(investor) {
    this.investor = investor;
    this.left = null;
    this.right = null;
  }
}

// 5. Binary Search Tree Range Search Logic (With DOM Crash Protection)
export class BST {
  constructor() {
    this.root = null;
  }
  
  insert(investor) {
    const newNode = new Node(investor);
    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }
  
  // Use minTicket as the primary sorting key in the tree
  insertNode(node, newNode) {
    if (newNode.investor.minTicket < node.investor.minTicket) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  // O(log n + k) Range Search
  rangeSearch(node, targetMin, targetMax, selectedIndustry, ops = { count: 0, matches: 0 }, results = []) {
    if (node === null) return;
    ops.count++;

    // Only explore left if it's possible to find values smaller than current node that still match
    if (targetMin < node.investor.minTicket) {
      this.rangeSearch(node.left, targetMin, targetMax, selectedIndustry, ops, results);
    }

    // Capture matches within the overlapping range
    const matchesTicket = node.investor.minTicket <= targetMax && node.investor.maxTicket >= targetMin;
    const matchesIndustry = selectedIndustry === 'All' || node.investor.industry === selectedIndustry;

    if (matchesTicket && matchesIndustry) {
      ops.matches++;
      // Only push a maximum of 50 items to avoid freezing the UI
      if (results.length < 50) {
        results.push(node.investor);
      }
    }

    // Only explore right if it's possible to find values larger than current node that still match
    if (targetMax > node.investor.minTicket) {
      this.rangeSearch(node.right, targetMin, targetMax, selectedIndustry, ops, results);
    }

    return { results, operations: ops.count, totalMatches: ops.matches, type: 'BST Range Search O(log n + k)' };
  }
}

export const investorTree = new BST();

// 6. Auto-Balancing Function
function insertBalanced(arr, start, end) {
  if (start > end) return;
  const mid = Math.floor((start + end) / 2);
  investorTree.insert(arr[mid]);
  
  insertBalanced(arr, start, mid - 1); 
  insertBalanced(arr, mid + 1, end);   
}

// Build the perfectly balanced tree automatically
insertBalanced(investorDatabase, 0, investorDatabase.length - 1);
