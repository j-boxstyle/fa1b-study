// roadmap-render.js — SVG tree renderer + interactivity

const SVG_NS = 'http://www.w3.org/2000/svg';
const COL_WIDTH = 240;
const ROW_HEIGHT = 30;
const NODE_W = 220;
const NODE_H = 26;
const NODE_PAD_X = 10;
const NODE_PAD_Y = 4;

let SELECTED = null;
let NODE_INDEX = {};       // id -> node ref
let COLLAPSED = new Set(); // ids whose children are hidden

// === build flat index ===
function buildIndex(node, parent) {
  node._parent = parent || null;
  NODE_INDEX[node.id] = node;
  (node.children || []).forEach(c => buildIndex(c, node));
}

// === compute layout (Reingold-Tilford simplified) ===
function computeLayout(node, depth, yCounter) {
  node._x = depth * COL_WIDTH + 20;
  const collapsed = COLLAPSED.has(node.id);
  const kids = (!collapsed && node.children) ? node.children : [];
  if (kids.length === 0) {
    node._y = yCounter.v * ROW_HEIGHT + 40;
    yCounter.v++;
    return node._y;
  }
  const ys = [];
  for (const c of kids) ys.push(computeLayout(c, depth + 1, yCounter));
  node._y = (ys[0] + ys[ys.length - 1]) / 2;
  return node._y;
}

// === build svg ===
function render() {
  const svg = document.getElementById('tree');
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const yCounter = { v: 0 };
  computeLayout(window.TREE, 0, yCounter);
  const maxDepth = computeMaxDepth(window.TREE, 0);
  const height = yCounter.v * ROW_HEIGHT + 80;
  const width = (maxDepth + 1) * COL_WIDTH + NODE_W + 40;
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // defs (arrow)
  const defs = document.createElementNS(SVG_NS, 'defs');
  defs.innerHTML = `
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24"/>
    </marker>`;
  svg.appendChild(defs);

  // edges layer
  const edgeLayer = document.createElementNS(SVG_NS, 'g');
  edgeLayer.id = 'edges';
  svg.appendChild(edgeLayer);
  drawEdges(window.TREE, edgeLayer);

  // xlinks layer (cross-references)
  const xLayer = document.createElementNS(SVG_NS, 'g');
  xLayer.id = 'xlinks';
  svg.appendChild(xLayer);
  drawXLinks(xLayer);

  // node layer
  const nodeLayer = document.createElementNS(SVG_NS, 'g');
  nodeLayer.id = 'nodes';
  svg.appendChild(nodeLayer);
  drawNodes(window.TREE, nodeLayer);
}

function computeMaxDepth(node, d) {
  if (COLLAPSED.has(node.id) || !node.children || node.children.length === 0) return d;
  let max = d;
  for (const c of node.children) max = Math.max(max, computeMaxDepth(c, d + 1));
  return max;
}

function drawEdges(node, layer) {
  const collapsed = COLLAPSED.has(node.id);
  if (collapsed || !node.children) return;
  for (const c of node.children) {
    const p = document.createElementNS(SVG_NS, 'path');
    const x1 = node._x + NODE_W;
    const y1 = node._y + NODE_H / 2;
    const x2 = c._x;
    const y2 = c._y + NODE_H / 2;
    const mid = (x1 + x2) / 2;
    p.setAttribute('d', `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
    p.setAttribute('class', node.root ? 'edge root' : 'edge');
    p.setAttribute('stroke', c.color || '#475569');
    layer.appendChild(p);
    drawEdges(c, layer);
  }
}

function drawXLinks(layer) {
  for (const xl of (window.XLINKS || [])) {
    const from = NODE_INDEX[xl.from];
    const to = NODE_INDEX[xl.to];
    if (!from || !to) continue;
    if (typeof from._x !== 'number' || typeof to._x !== 'number') continue;
    const path = document.createElementNS(SVG_NS, 'path');
    const x1 = from._x + NODE_W / 2;
    const y1 = from._y + NODE_H / 2;
    const x2 = to._x + NODE_W / 2;
    const y2 = to._y + NODE_H / 2;
    // arc going up/right
    const dx = (x2 - x1);
    const dy = (y2 - y1);
    const arcOffset = Math.min(160, Math.abs(dy) * 0.4 + 30);
    const cx1 = x1 + arcOffset;
    const cx2 = x2 + arcOffset;
    path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`);
    path.setAttribute('class', 'xlink');
    path.setAttribute('stroke', '#fbbf24');
    path.dataset.from = xl.from;
    path.dataset.to = xl.to;
    layer.appendChild(path);
  }
}

function drawNodes(node, layer) {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'node');
  g.dataset.id = node.id;
  g.style.cursor = 'pointer';

  // rect background
  const r = document.createElementNS(SVG_NS, 'rect');
  r.setAttribute('x', node._x);
  r.setAttribute('y', node._y);
  r.setAttribute('width', NODE_W);
  r.setAttribute('height', NODE_H);
  r.setAttribute('rx', 6);
  let cls = 'node-bg';
  if (node.examNG) cls += ' examNG';
  else if (node.examOK) cls += ' examOK-app';
  r.setAttribute('class', cls);
  if (node.color && !node.examNG && !node.examOK) {
    r.setAttribute('fill', `${node.color}22`);
    r.setAttribute('stroke', node.color);
  }
  g.appendChild(r);

  // colored bar on left
  const bar = document.createElementNS(SVG_NS, 'rect');
  bar.setAttribute('x', node._x);
  bar.setAttribute('y', node._y);
  bar.setAttribute('width', 4);
  bar.setAttribute('height', NODE_H);
  bar.setAttribute('fill', node.color || '#fbbf24');
  bar.setAttribute('rx', 2);
  g.appendChild(bar);

  // expand indicator (▶ collapsed, ▼ expanded)
  const hasKids = node.children && node.children.length > 0;
  if (hasKids) {
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', node._x + NODE_W - 14);
    t.setAttribute('y', node._y + NODE_H / 2 + 4);
    t.setAttribute('fill', node.color || '#94a3b8');
    t.setAttribute('font-size', 10);
    t.textContent = COLLAPSED.has(node.id) ? '▶' : '▼';
    g.appendChild(t);
  }

  // label
  const t = document.createElementNS(SVG_NS, 'text');
  t.setAttribute('x', node._x + 12);
  t.setAttribute('y', node._y + NODE_H / 2 + 5);
  t.setAttribute('class', 'node-label');
  let label = node.label;
  if (label.length > 24) label = label.slice(0, 22) + '…';
  t.textContent = label;
  g.appendChild(t);

  // click / touch handler — explicit pointerdown for touch reliability
  let _touched = false;
  const handleSelect = (e) => {
    e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    if (hasKids && e.altKey) {
      toggleCollapse(node.id);
      return;
    }
    selectNode(node.id);
  };
  g.addEventListener('click', handleSelect);
  g.addEventListener('touchend', (e) => {
    if (_touched) return;
    _touched = true;
    setTimeout(() => { _touched = false; }, 400);
    handleSelect(e);
  }, { passive: false });
  // double click / double tap toggles collapse
  let _lastTap = 0;
  g.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (now - _lastTap < 350 && hasKids) {
      e.preventDefault();
      toggleCollapse(node.id);
    }
    _lastTap = now;
  }, { passive: false });
  g.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    if (hasKids) toggleCollapse(node.id);
  });

  layer.appendChild(g);

  if (!COLLAPSED.has(node.id) && node.children) {
    for (const c of node.children) drawNodes(c, layer);
  }
}

function toggleCollapse(id) {
  if (COLLAPSED.has(id)) COLLAPSED.delete(id);
  else COLLAPSED.add(id);
  render();
  if (SELECTED) selectNode(SELECTED);
}

function expandToNode(id) {
  const n = NODE_INDEX[id];
  if (!n) return;
  let cur = n._parent;
  while (cur) { COLLAPSED.delete(cur.id); cur = cur._parent; }
}

function selectNode(id) {
  SELECTED = id;
  const node = NODE_INDEX[id];
  if (!node) return;

  // gather xlinks involving this node, expand paths to all related nodes
  const related = new Set();
  (window.XLINKS || []).forEach(xl => {
    if (xl.from === id) { related.add(xl.to); expandToNode(xl.to); }
    else if (xl.to === id) { related.add(xl.from); expandToNode(xl.from); }
  });
  expandToNode(id);
  render(); // re-render with expanded paths so xlinks can be drawn

  // apply selected style
  const sel = document.querySelector(`g[data-id="${id}"] .node-bg`);
  if (sel) sel.classList.add('selected');

  // show xlinks connected to this node
  document.querySelectorAll('.xlink').forEach(p => {
    if (p.dataset.from === id || p.dataset.to === id) {
      p.classList.add('show');
    }
  });
  related.forEach(rid => {
    const r = document.querySelector(`g[data-id="${rid}"] .node-bg`);
    if (r) r.classList.add('related');
  });

  showDetail(node, related);
}

function showDetail(node, relatedIds) {
  const d = document.getElementById('detail');
  let html = `<h2>${node.label}</h2>`;
  const chips = [];
  if (node.ch) chips.push(`<span class="chip">Ch${node.ch}</span>`);
  if (node.appendix) chips.push(`<span class="chip">Appendix</span>`);
  if (node.examNG) chips.push(`<span class="chip warn">⚠️ 試験範囲外</span>`);
  if (node.examOK) chips.push(`<span class="chip ok">✅ 試験範囲</span>`);
  html += chips.join(' ');
  if (node.summary) html += `<h3>概要</h3><p>${escapeHTML(node.summary).replace(/\n/g, '<br>')}</p>`;
  if (node.detail) html += `<h3>意味・内容</h3><p>${escapeHTML(node.detail).replace(/\n/g, '<br>')}</p>`;
  if (node.formula) html += `<h3>公式 / 仕訳</h3><div class="formula">${escapeHTML(node.formula)}</div>`;
  if (node.memo) html += `<h3>覚えること</h3><div class="memo">${escapeHTML(node.memo).replace(/\n/g, '<br>')}</div>`;

  // tree position
  const path = [];
  let cur = node;
  while (cur._parent) {
    path.unshift(cur._parent.label);
    cur = cur._parent;
  }
  if (path.length > 0) html += `<h3>所属</h3><p style="color:var(--muted);font-size:12px">${path.join(' → ')}</p>`;

  // children
  if (node.children && node.children.length > 0) {
    html += `<h3>下位 (${node.children.length})</h3><div class="related-list">`;
    for (const c of node.children) {
      html += `<a onclick="selectNode('${c.id}')">↳ ${escapeHTML(c.label)}</a>`;
    }
    html += `</div>`;
  }

  // related (cross-links)
  if (relatedIds && relatedIds.size > 0) {
    html += `<h3>🔗 関連概念 (黄色の点線)</h3><div class="related-list">`;
    for (const rid of relatedIds) {
      const r = NODE_INDEX[rid];
      if (r) {
        const xl = (window.XLINKS || []).find(x =>
          (x.from === node.id && x.to === rid) || (x.to === node.id && x.from === rid));
        const label = xl ? xl.label : '';
        html += `<a onclick="selectNode('${rid}')">↔ ${escapeHTML(r.label)} <span style="color:var(--muted)">${escapeHTML(label)}</span></a>`;
      }
    }
    html += `</div>`;
  }

  // preserve close button (it gets wiped by innerHTML)
  d.innerHTML = '<button id="detail-close" onclick="closeDetail()">×</button>' + html;
  d.classList.add('open');
  d.scrollTop = 0;
}

function closeDetail() {
  const d = document.getElementById('detail');
  d.classList.remove('open');
}
window.closeDetail = closeDetail;

function escapeHTML(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// === controls ===
function expandAll() {
  COLLAPSED.clear();
  render();
}
function collapseToLevel(lvl) {
  COLLAPSED.clear();
  function walk(node, d) {
    if (d >= lvl) COLLAPSED.add(node.id);
    if (node.children) for (const c of node.children) walk(c, d + 1);
  }
  walk(window.TREE, 0);
  render();
}
function resetView() {
  COLLAPSED.clear();
  collapseToLevel(2);
  document.getElementById('canvas-wrap').scrollTo(0, 0);
}

// === search ===
function setupSearch() {
  const s = document.getElementById('search');
  s.addEventListener('input', () => {
    const q = s.value.trim().toLowerCase();
    if (!q) {
      document.querySelectorAll('.node-bg').forEach(r => r.style.opacity = '1');
      return;
    }
    // expand path for first match
    let first = null;
    Object.values(NODE_INDEX).forEach(n => {
      const hit = n.label.toLowerCase().includes(q) ||
                  (n.detail && n.detail.toLowerCase().includes(q)) ||
                  (n.summary && n.summary.toLowerCase().includes(q));
      if (hit && !first) first = n;
    });
    if (first) {
      // expand ancestors of every label-match so highlighted nodes are visible
      const matchedIds = [];
      Object.values(NODE_INDEX).forEach(n => {
        if (n.label.toLowerCase().includes(q)) {
          matchedIds.push(n.id);
          let cur = n._parent;
          while (cur) { COLLAPSED.delete(cur.id); cur = cur._parent; }
        }
      });
      selectNode(first.id); // triggers render
      // fade non-matching (must run AFTER selectNode's internal render)
      document.querySelectorAll('.node-bg').forEach(r => r.style.opacity = '0.25');
      matchedIds.forEach(id => {
        const el = document.querySelector(`g[data-id="${id}"] .node-bg`);
        if (el) el.style.opacity = '1';
      });
      // scroll into view
      setTimeout(() => {
        const el = document.querySelector(`g[data-id="${first.id}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const wrap = document.getElementById('canvas-wrap');
          wrap.scrollTo({
            left: first._x - 100,
            top: first._y - 200,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  });
}

// === init ===
window.selectNode = selectNode;
window.expandAll = expandAll;
window.collapseToLevel = collapseToLevel;
window.resetView = resetView;

document.addEventListener('DOMContentLoaded', () => {
  buildIndex(window.TREE);
  collapseToLevel(2); // default: show top 2 levels
  setupSearch();
  // Scroll so root node is visible in viewport
  setTimeout(() => {
    const wrap = document.getElementById('canvas-wrap');
    if (wrap && window.TREE._y) {
      wrap.scrollTo({
        left: 0,
        top: Math.max(0, window.TREE._y - 100),
        behavior: 'instant'
      });
    }
    // Auto-select root to populate detail panel
    selectNode('root');
  }, 100);
});
