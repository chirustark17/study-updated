// ============================================================
// KAS PRELIMS 2026 — APP LOGIC
// ============================================================

const STORAGE_KEY = 'kas2026_progress_v1';

let progress = {};
try {
  progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
} catch(e) { progress = {}; }

let activeFilter = 'all';
let searchQuery = '';
let openTopics = new Set();

function saveProgress(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch(e){}
}

function topicKey(sectionId, idx){ return sectionId + '::' + idx; }

// ---------------- SYNC GROUPS (checkbox linking across exams) ----------------
// Build reverse lookup: topicKey -> syncGroup id, once at load time.
let TOPIC_TO_SYNCGROUP = {};
let SYNCGROUP_MEMBERS_KEYS = {};

function buildSyncGroupIndex(){
  if (typeof EXAMS_DATA === 'undefined' || !EXAMS_DATA.syncGroups) return;
  const allExamSections = getAllExamSectionsFlat();
  Object.keys(EXAMS_DATA.syncGroups).forEach(sgId => {
    const group = EXAMS_DATA.syncGroups[sgId];
    const memberKeys = [];
    group.members.forEach(m => {
      const sec = allExamSections.find(s => s.id === m.sectionId);
      if (!sec) return;
      const idx = sec.topics.findIndex(t => t.name === m.topicName);
      if (idx === -1) return;
      const key = topicKey(m.sectionId, idx);
      memberKeys.push(key);
      TOPIC_TO_SYNCGROUP[key] = sgId;
    });
    SYNCGROUP_MEMBERS_KEYS[sgId] = memberKeys;
  });
}

// Returns every section array across every exam, flattened, for lookups.
function getAllExamSectionsFlat(){
  const out = [...MASTER_DATA.syllabus];
  if (typeof EXAMS_DATA !== 'undefined'){
    out.push(...(EXAMS_DATA.kasMains || []));
    out.push(...(EXAMS_DATA.keaDegree || []));
    out.push(...(EXAMS_DATA.keaPuc || []));
  }
  return out;
}

// When a topic with a sync group is toggled, propagate the same state to
// every other member of that group and re-render their visible checkboxes.
function propagateSyncGroup(key, newState){
  const sgId = TOPIC_TO_SYNCGROUP[key];
  if (!sgId) return;
  const members = SYNCGROUP_MEMBERS_KEYS[sgId] || [];
  members.forEach(mKey => {
    if (mKey === key) return;
    progress[mKey] = newState;
    document.querySelectorAll(`[data-key="${mKey}"].topic-check`).forEach(el => {
      el.classList.toggle('checked', newState);
      el.setAttribute('aria-checked', newState);
    });
    document.querySelectorAll(`.topic-card[data-key="${mKey}"]`).forEach(card => {
      card.classList.toggle('done', newState);
    });
  });
}

// ---------------- TOAST ----------------
function showToast(msg){
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="dot"></span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 260);
  }, 2600);
}

// ---------------- COUNTDOWN ----------------
function updateCountdown(){
  const exam = new Date(MASTER_DATA.meta.examDate + 'T00:00:00');
  const now = new Date();
  const diffMs = exam - now;
  const days = Math.max(0, Math.ceil(diffMs / (1000*60*60*24)));
  document.getElementById('countdown').innerHTML = `<strong>${days}</strong> days to Prelims (15 Nov 2026)`;
}

// ---------------- TAG RENDER ----------------
function renderTags(tags){
  return tags.map(t => `<span class="tag ${t.k}">${t.l}</span>`).join('');
}

function renderStars(priority){
  if (!priority) return '';
  let out = '';
  for (let i = 1; i <= 3; i++){
    out += i <= priority ? '★' : '<span class="dim">★</span>';
  }
  return `<span class="priority-stars" title="Study priority: ${priority}/3">${out}</span>`;
}

// ---------------- PROGRESS COUNT ----------------
function getCurrentExamSections(){
  if (currentExam === 'kas-prelims') return MASTER_DATA.syllabus;
  if (currentExam === 'kas-mains') return EXAMS_DATA.kasMains;
  if (currentExam === 'kea-degree') return EXAMS_DATA.keaDegree;
  if (currentExam === 'kea-puc') return EXAMS_DATA.keaPuc;
  if (currentExam === 'common') return []; // Common Topics has its own display, not a checkbox tally
  return [];
}

function countProgress(){
  let total = 0, done = 0;
  getCurrentExamSections().forEach(sec => {
    sec.topics.forEach((t, i) => {
      total++;
      if (progress[topicKey(sec.id, i)]) done++;
    });
  });
  document.getElementById('progressText').textContent = `${done} / ${total} topics studied`;
}

// ---------------- TOPIC CARD ----------------
function topicMatchesFilter(topic){
  if (activeFilter === 'all') return true;
  if (activeFilter === 'recurring') return !!topic.recurring;
  if (activeFilter === 'karnataka') return !!topic.karnataka;
  if (activeFilter === 'priority3') return topic.priority === 3;
  const tags = topic.tags || [];
  if (activeFilter === 'ncert') return tags.some(t => t.k === 'ncert') && !tags.some(t => t.k === 'degree');
  if (activeFilter === 'degree') return tags.some(t => t.k === 'degree');
  return true;
}

function topicMatchesSearch(topic, sectionTitle){
  if (!searchQuery) return true;
  const targetsText = (topic.studyTargets || []).join(' ');
  const pyqText = (topic.pyq || []).map(p => p.note + ' ' + p.year).join(' ');
  const hay = (topic.name + ' ' + (topic.desc || '') + ' ' + sectionTitle + ' ' + targetsText + ' ' + pyqText).toLowerCase();
  return hay.includes(searchQuery);
}

function renderStudyTargets(targets){
  if (!targets || !targets.length) return '';
  return `
    <div class="study-targets">
      <div class="study-targets-label">📌 What to nail down (research &amp; verify these yourself)</div>
      <ul>${targets.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>`;
}

function renderPyqTrace(pyqList){
  if (!pyqList || !pyqList.length) return '';
  return `
    <div class="pyq-trace">
      <div class="pyq-trace-label">✓ Seen in real papers</div>
      ${pyqList.map(p => `
        <div class="pyq-trace-item">
          <span class="pyq-trace-cite">${p.year} — ${p.ref}</span>
          <span class="pyq-trace-note">${p.note}</span>
        </div>`).join('')}
    </div>`;
}

function renderTopicCard(sec, topic, idx){
  const key = topicKey(sec.id, idx);
  const isDone = !!progress[key];
  const isOpen = openTopics.has(key);
  const visible = topicMatchesFilter(topic) && topicMatchesSearch(topic, sec.title);
  const sgId = TOPIC_TO_SYNCGROUP[key];
  const isSynced = sgId && SYNCGROUP_MEMBERS_KEYS[sgId] && SYNCGROUP_MEMBERS_KEYS[sgId].length > 1;
  const sgStrength = isSynced && EXAMS_DATA.syncGroups[sgId] ? EXAMS_DATA.syncGroups[sgId].strength : null;
  const tags = topic.tags || [];
  const weightageTag = topic.weightage ? `<span class="tag-weightage">${topic.weightage}</span>` : '';

  return `
  <div class="topic-card ${isDone ? 'done' : ''} ${isOpen ? 'open' : ''} ${visible ? '' : 'hidden'}" data-key="${key}">
    <div class="topic-row">
      <div class="topic-check ${isDone ? 'checked' : ''}" data-action="toggle-check" data-key="${key}" role="checkbox" aria-checked="${isDone}" tabindex="0"></div>
      <div class="topic-main" data-action="toggle-open" data-key="${key}">
        <div class="topic-title-row">
          ${renderStars(topic.priority)}
          <span class="topic-title">${topic.name}</span>
          ${renderTags(tags)}
          ${weightageTag}
          ${topic.recurring ? '<span class="tag-recur">↻ Recurring in PYQs</span>' : ''}
          ${topic.karnataka ? '<span class="tag-karnataka">📍 Karnataka angle</span>' : ''}
          ${isSynced ? `<span class="tag-synced ${sgStrength === 'strong' ? 'tag-synced-strong' : ''}" title="Checking this also checks it in ${SYNCGROUP_MEMBERS_KEYS[sgId].length - 1} other exam(s)">⇄ ${sgStrength === 'strong' ? 'Synced · high overlap' : 'Synced'}</span>` : ''}
        </div>
        ${isOpen ? `<div class="topic-expand-content"><div class="topic-desc">${topic.desc}</div>${renderStudyTargets(topic.studyTargets)}${renderPyqTrace(topic.pyq)}${renderRelatedLink(topic.relatedTo)}</div>` : ''}
      </div>
      <div class="topic-expand">▾</div>
    </div>
  </div>`;
}

function renderRelatedLink(relatedId){
  if (!relatedId) return '';
  const relSec = MASTER_DATA.syllabus.find(s => s.id === relatedId);
  if (!relSec) return '';
  return `
    <div class="related-link">
      🔗 Related, deeper coverage in KAS Prelims: <button class="related-link-btn" data-action="goto-section" data-target="${relatedId}">${relSec.title}</button> — not auto-synced since depth differs.
    </div>`;
}

// ---------------- SYLLABUS SECTION RENDER ----------------
function renderSyllabusSection(sec){
  if (sec.isCurrentAffairs){
    return renderCurrentAffairsSection(sec);
  }

  const topicsHtml = sec.topics.map((t, i) => renderTopicCard(sec, t, i)).join('');
  const doneCount = sec.topics.filter((t,i) => progress[topicKey(sec.id, i)]).length;

  return `
  <section class="section" id="${sec.id}">
    <div class="section-head">
      <div class="section-eyebrow">${sec.paper} · ${sec.section}</div>
      <h3>${sec.title}</h3>
      <div class="sub">${sec.meta} · ${doneCount}/${sec.topics.length} studied</div>
    </div>
    <div class="topic-group">
      ${topicsHtml}
    </div>
  </section>`;
}

function renderCurrentAffairsSection(sec){
  const isNational = sec.id === 'p1-ca';  const cats = isNational ? MASTER_DATA.currentAffairsCategories : MASTER_DATA.karnatakaGS.map(k => `${k.cat} — ${k.ex}`);

  let extra = '';
  if (isNational){
    extra = `
    <div class="card pad" style="margin-top:20px;">
      <div class="flow">
        <div class="flow-step">Read daily<br><span style="font-weight:400;color:var(--muted);font-size:11px;">(you already do this)</span></div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">File under one of the 8 categories, dated</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">Monthly: cross-check a roundup source</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">Weekly: skim your own notes for recall</div>
      </div>
    </div>
    <div class="info-box amber" style="margin-top:16px;">
      <h5>Worked example — BRICS</h5>
      <p>Don't try to read everything ever written about BRICS. Wikipedia focus: "Member states" section (current members + accession years), "Summits" section (host country + year for the last 3 summits), and India's specific chairship years (2012, 2016, 2021, 2026). Skip founding history beyond one sentence — it's rarely tested.</p>
    </div>
    <div class="section-head" style="margin-top:28px;">
      <h4 style="font-family:var(--serif);font-size:16px;color:var(--navy);">Confirmed anchors for this exam cycle</h4>
      <div class="sub">Already on record — keep building forward from here</div>
    </div>
    <div class="card pad">
      <ul style="list-style:none;">
        ${MASTER_DATA.currentAffairsAnchors.map(a => `<li style="font-size:12.5px;color:var(--ink);padding:8px 0;border-bottom:1px solid var(--line);line-height:1.5;">• ${a}</li>`).join('')}
      </ul>
    </div>`;
  } else {
    extra = `
    <div class="info-box green" style="margin-top:20px;">
      <h5>Action for you specifically</h5>
      <p>Since you're starting from zero here, don't backfill a year of state news from memory. Start a dedicated Karnataka current affairs note today, subscribe to one Karnataka-specific monthly digest, and skim the past 2-3 months of Karnataka govt press releases to build forward from.</p>
    </div>`;
  }

  const catCards = isNational
    ? MASTER_DATA.currentAffairsCategories.map(c => `<div class="wiki-card"><div class="focus">• ${c}</div></div>`).join('')
    : MASTER_DATA.karnatakaGS.map(k => `<div class="wiki-card"><div class="topic">${k.cat}</div><div class="focus">${k.ex}</div></div>`).join('');

  return `
  <section class="section" id="${sec.id}">
    <div class="section-head">
      <div class="section-eyebrow">${sec.paper} · ${sec.section}</div>
      <h3>${sec.title}</h3>
      <div class="sub">${sec.meta} · No fixed topic list — tracked as a live category, not memorized as a static syllabus</div>
    </div>
    ${catCards}
    ${extra}
  </section>`;
}

// ============================================================
// NEW EXAM SECTIONS (KAS Mains, KEA Degree/PUC)
// ============================================================

function renderExamInfoBox(examId){
  const meta = EXAMS_DATA.examMeta[examId];
  if (!meta) return '';
  const verifiedBadge = meta.verified === 'verified'
    ? `<span class="confidence-badge verified">Verified</span>`
    : `<span class="confidence-badge partial">Pattern template</span>`;

  const papersHtml = (meta.papers || []).map(p => `
    <div class="exam-paper-card">
      <div class="exam-paper-name">${p.name}</div>
      <div class="exam-paper-stats">
        ${p.questions ? `<span>${p.questions} Q</span>` : ''}
        <span>${p.marks} marks</span>
        <span>${p.duration}</span>
      </div>
      ${p.note ? `<div class="exam-paper-note">${p.note}</div>` : ''}
    </div>`).join('');

  const factsHtml = (meta.facts || []).map(f => `<li>${f}</li>`).join('');

  return `
  <div class="exam-info-box">
    <div class="exam-info-head">
      <h2>${meta.name}</h2>
      ${verifiedBadge}
    </div>
    <div class="exam-info-level">${meta.level}</div>
    <div class="exam-paper-grid">${papersHtml}</div>
    ${meta.meritTotal ? `<div class="exam-merit-line">Merit total: <strong>${meta.meritTotal}</strong> marks + Interview <strong>${meta.interviewMarks}</strong> = Grand total <strong>${meta.grandTotal}</strong></div>` : ''}
    <ul class="exam-facts-list">${factsHtml}</ul>
    ${meta.note ? `<div class="exam-info-note">${meta.note}</div>` : ''}
  </div>`;
}

function examTopicKey(sectionId, idx){ return sectionId + '::' + idx; }

function renderExamTopicCard(sec, topic, idx){
  // Reuses the same card shape/classes as renderTopicCard so all existing
  // CSS, checkbox, filter and search logic works unchanged.
  return renderTopicCard(sec, topic, idx);
}

function renderExamSyllabusSection(sec){
  const topicsHtml = sec.topics.map((t, i) => renderExamTopicCard(sec, t, i)).join('');
  const doneCount = sec.topics.filter((t,i) => progress[examTopicKey(sec.id, i)]).length;
  const specificBadge = sec.isSpecificPaper ? `<span class="tag-specific">Exam-specific — not general overlap</span>` : '';

  if (sec.topics.some(t => t.isCurrentAffairs)){
    // Render current-affairs-style topics as simple description cards,
    // consistent with how KAS Prelims CA sections are treated.
    const caTopic = sec.topics.find(t => t.isCurrentAffairs);
    const otherTopics = sec.topics.filter(t => !t.isCurrentAffairs);
    const otherHtml = otherTopics.map((t, i) => {
      const realIdx = sec.topics.indexOf(t);
      return renderExamTopicCard(sec, t, realIdx);
    }).join('');
    return `
    <section class="section" id="${sec.id}">
      <div class="section-head">
        <div class="section-eyebrow">${sec.paper}</div>
        <h3>${sec.title}</h3>
        <div class="sub">${sec.meta} ${specificBadge}</div>
      </div>
      <div class="wiki-card">
        <div class="topic">${caTopic.name}</div>
        <div class="focus">${caTopic.desc} <em>Tracked as a live category — see the KAS Prelims Current Events section for the full tracking method, which applies equally here.</em></div>
      </div>
      <div class="topic-group" style="margin-top:14px;">${otherHtml}</div>
    </section>`;
  }

  return `
  <section class="section" id="${sec.id}">
    <div class="section-head">
      <div class="section-eyebrow">${sec.paper}</div>
      <h3>${sec.title}</h3>
      <div class="sub">${sec.meta} · ${doneCount}/${sec.topics.length} studied ${specificBadge}</div>
    </div>
    <div class="topic-group">${topicsHtml}</div>
  </section>`;
}

function renderExamPage(examKey, dataArray){
  const parts = [renderExamInfoBox(examKey)];
  dataArray.forEach(sec => parts.push(renderExamSyllabusSection(sec)));
  return parts.join('');
}

// ---------------- COMMON TOPICS CROSS-REFERENCE ----------------
function renderCommonTopicsOverview(){
  const ranking = EXAMS_DATA.commonTopicsRanking;
  const examNames = {
    "kas-prelims": "KAS Prelims", "kas-mains": "KAS Mains",
    "kea-degree": "KEA Degree", "kea-puc": "KEA PUC"
  };
  return `
  <section class="section" id="common-overview">
    <div class="section-head">
      <div class="section-eyebrow">Common Topics</div>
      <h3>Cross-Exam Overview</h3>
      <div class="sub">Ranked by how many exams share each subject — your highest-leverage study areas across every exam combined</div>
    </div>
    ${ranking.map((r, i) => `
      <div class="common-rank-card">
        <div class="common-rank-num">#${i+1}</div>
        <div class="common-rank-body">
          <div class="common-rank-title">${r.subject}
            <span class="common-rank-count">${r.examCount} exam${r.examCount > 1 ? 's' : ''}</span>
          </div>
          <div class="common-rank-exams">
            ${r.exams.map(e => `<span class="exam-chip">${examNames[e] || e}</span>`).join('')}
          </div>
          <div class="common-rank-note">${r.note}</div>
        </div>
      </div>
    `).join('')}
  </section>`;
}

function renderCommonTopicsBySubject(){
  // Groups sync-grouped topics (the strict-match ones) by subject for a
  // dropdown/expandable view, tagged with which exams contain them.
  // Sorted strong-overlap groups first (3-4 exams) then moderate (2 exams),
  // so the highest-leverage shared material surfaces without scrolling.
  const groups = EXAMS_DATA.syncGroups;
  const allSections = getAllExamSectionsFlat();
  const examNames = {
    "kas-prelims": "KAS Prelims", "kas-mains": "KAS Mains",
    "kea-degree": "KEA Degree", "kea-puc": "KEA PUC"
  };

  const sortedIds = Object.keys(groups).sort((a, b) => {
    const sa = groups[a].strength === 'strong' ? 0 : 1;
    const sb = groups[b].strength === 'strong' ? 0 : 1;
    if (sa !== sb) return sa - sb;
    return groups[b].members.length - groups[a].members.length;
  });

  const strongIds = sortedIds.filter(id => groups[id].strength === 'strong');
  const moderateIds = sortedIds.filter(id => groups[id].strength !== 'strong');

  function renderCard(sgId){
    const g = groups[sgId];
    const memberRows = g.members.map(m => {
      const sec = allSections.find(s => s.id === m.sectionId);
      const examLabel = examNames[m.exam] || m.exam;
      return `<div class="sync-member-row">
        <span class="exam-chip">${examLabel}</span>
        <span class="sync-member-topic">${sec ? sec.title : m.sectionId} → ${m.topicName}</span>
      </div>`;
    }).join('');
    const isStrong = g.strength === 'strong';
    return `
    <div class="sync-group-card ${isStrong ? 'sync-group-card-strong' : ''}">
      <div class="sync-group-head">
        <span class="tag-synced ${isStrong ? 'tag-synced-strong' : ''}">⇄ ${isStrong ? 'High overlap' : 'Synced checkbox'}</span>
        <h4>${g.label}</h4>
      </div>
      <div class="sync-group-members">${memberRows}</div>
      <div class="sync-group-hint">Checking this topic as studied in any one exam marks it studied in all ${g.members.length} — genuinely the same content at the same depth.</div>
    </div>`;
  }

  return `
  <section class="section" id="common-subjects">
    <div class="section-head">
      <div class="section-eyebrow">Common Topics</div>
      <h3>By Subject — Strictly Synced Topics</h3>
      <div class="sub">Topics confirmed at genuinely matching depth across exams — study once, checked everywhere. Highest-overlap topics (3-4 exams) are listed first.</div>
    </div>
    ${strongIds.length ? `<div class="sync-strength-label">★ High overlap — appears in 3 or more exams</div>` : ''}
    ${strongIds.map(renderCard).join('')}
    ${moderateIds.length ? `<div class="sync-strength-label" style="margin-top:20px;">Moderate overlap — appears in 2 exams</div>` : ''}
    ${moderateIds.map(renderCard).join('')}
    <div class="info-box amber" style="margin-top:20px;">
      <h5>Why not sync more?</h5>
      <p>Many topics share a name across exams but not a depth — e.g. Vijayanagara Empire is tested at battle-and-ruler-detail level in KAS Prelims/Mains, but only at list level in KEA Degree/PUC. Those stay unsynced and are instead cross-linked with a "related, deeper coverage" note when you expand the topic, so you know where to look without falsely marking shallow and deep study as equivalent.</p>
    </div>
  </section>`;
}

let svgChartUid = 0;

function renderBarChart(title, labels, series, height=20){
  svgChartUid++;
  const chartId = `svgchart-${svgChartUid}`;
  const groupCount = labels.length;
  const barsPerGroup = series.length;
  const max = Math.max(...series.flatMap(x => x.data), 1);
  const niceMax = Math.ceil(max / 10) * 10;

  // Layout constants (viewBox units)
  const leftPad = 150;      // room for group labels
  const rightPad = 20;
  const topPad = 16;
  const bottomPad = 30;
  const groupGap = 14;      // gap between groups
  const barGap = 3;         // gap between bars within a group
  const barH = 16;
  const groupH = barsPerGroup * barH + (barsPerGroup - 1) * barGap;
  const chartW = 760;
  const plotW = chartW - leftPad - rightPad;
  const chartH = topPad + groupCount * groupH + (groupCount - 1) * groupGap + bottomPad;

  const xScale = (v) => (v / niceMax) * plotW;

  let bars = '';
  let gridlines = '';
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++){
    const gx = leftPad + (plotW / gridSteps) * i;
    const val = Math.round((niceMax / gridSteps) * i);
    gridlines += `<line x1="${gx}" y1="${topPad - 4}" x2="${gx}" y2="${chartH - bottomPad + 4}" stroke="#E5E3DC" stroke-width="1"/>`;
    gridlines += `<text x="${gx}" y="${chartH - bottomPad + 18}" font-size="9.5" fill="#8A8F9C" text-anchor="middle" font-family="Inter, sans-serif">${val}</text>`;
  }

  labels.forEach((label, li) => {
    const groupY = topPad + li * (groupH + groupGap);
    bars += `<text x="${leftPad - 10}" y="${groupY + groupH/2 + 4}" font-size="11" fill="#1B1D22" text-anchor="end" font-family="Inter, sans-serif" font-weight="500">${escapeXml(label)}</text>`;
    series.forEach((s, si) => {
      const val = s.data[li];
      const barY = groupY + si * (barH + barGap);
      const w = Math.max(xScale(val), 2);
      const labelInside = w > 26;
      bars += `
        <g class="svg-bar-group" data-tip="${escapeXml(s.name)}: ${val}">
          <rect x="${leftPad}" y="${barY}" width="${w}" height="${barH}" rx="3" fill="${s.color}" class="svg-bar" data-target-w="${w}" style="animation-delay:${(li*barsPerGroup+si)*40}ms"/>
          <text x="${leftPad + (labelInside ? w - 6 : w + 6)}" y="${barY + barH/2 + 3.5}" font-size="9.5" font-weight="700" fill="${labelInside ? '#fff' : '#1B1D22'}" text-anchor="${labelInside ? 'end' : 'start'}" font-family="Inter, sans-serif">${val}</text>
        </g>`;
    });
  });

  const legend = series.map(s => `
    <div class="chart-legend-item">
      <span class="chart-legend-swatch" style="background:${s.color};"></span>${s.name}
    </div>`).join('');

  return `
  <div class="chart-wrap">
    <div class="chart-title">${title}</div>
    <div class="svg-chart-tooltip" id="${chartId}-tip"></div>
    <svg viewBox="0 0 ${chartW} ${chartH}" class="svg-chart" id="${chartId}" preserveAspectRatio="xMinYMin meet">
      ${gridlines}
      ${bars}
    </svg>
    <div class="chart-legend">${legend}</div>
  </div>`;
}

function escapeXml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function initSvgChartInteractivity(){
  document.querySelectorAll('.svg-chart').forEach(svg => {
    const tip = document.getElementById(svg.id + '-tip');
    svg.querySelectorAll('.svg-bar-group').forEach(g => {
      g.addEventListener('mousemove', (e) => {
        if (!tip) return;
        tip.textContent = g.getAttribute('data-tip');
        tip.style.opacity = '1';
        const rect = svg.getBoundingClientRect();
        tip.style.left = (e.clientX - rect.left + 14) + 'px';
        tip.style.top = (e.clientY - rect.top - 10) + 'px';
      });
      g.addEventListener('mouseleave', () => { if (tip) tip.style.opacity = '0'; });
    });
  });
}

// ---------------- OVERVIEW SECTION ----------------
function renderOverview(){
  const totalTopics = MASTER_DATA.syllabus.reduce((a,s) => a + s.topics.length, 0);
  const recurringCount = MASTER_DATA.syllabus.reduce((a,s) => a + s.topics.filter(t=>t.recurring).length, 0);

  return `
  <section class="section" id="overview">
    <div class="hero">
      <h2>Everything you need for KAS Prelims, in one place.</h2>
      <p>Every sub-subtopic across both papers, tagged by NCERT class or degree-level depth. Real question-format analysis from four actual KPSC papers. Your personal strategy, mapped to where you're starting from. Click any topic to expand it, check it off as you study, and use the filters above to focus on what matters most.</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="num">${totalTopics}</div><div class="label">Trackable topics</div></div>
        <div class="hero-stat"><div class="num">4</div><div class="label">Real papers analyzed</div></div>
        <div class="hero-stat"><div class="num">${recurringCount}</div><div class="label">Confirmed recurring themes</div></div>
        <div class="hero-stat"><div class="num">9</div><div class="label">Question format types</div></div>
      </div>
    </div>

    <div class="two-col">
      <div class="card pad">
        <h4 style="font-family:var(--serif); font-size:16px; color:var(--navy); margin-bottom:14px;">Official pattern</h4>
        <table class="data-table">
          <thead><tr><th>Paper</th><th>Questions</th><th>Sections</th></tr></thead>
          <tbody>
            ${MASTER_DATA.pattern.papers.map(p => `<tr><td><strong>${p.name}</strong><br><span style="color:var(--muted)">${p.marks} marks</span></td><td>${p.questions}</td><td>${p.sections}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="card pad">
        <h4 style="font-family:var(--serif); font-size:16px; color:var(--navy); margin-bottom:14px;">Key facts</h4>
        <ul style="list-style:none;">
          ${MASTER_DATA.pattern.facts.map(f => `<li style="font-size:12px;color:var(--ink);padding:7px 0;border-bottom:1px solid var(--line);line-height:1.5;">${f}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>`;
}

// ---------------- STRATEGY SECTION ----------------
function renderStrategy(){
  return `
  <section class="section" id="strategy">
    <div class="section-head">
      <div class="section-eyebrow">Personalized</div>
      <h3>Your Strategy Map</h3>
      <div class="sub">Based on exactly where you're starting from in each section</div>
    </div>
    ${MASTER_DATA.personalStrategy.map(s => `
      <div class="strat-card">
        <div class="sec">${s.section}</div>
        <div class="start">${s.start}</div>
        <div class="impl">${s.implication}</div>
      </div>
    `).join('')}

    <div class="section-head" style="margin-top:32px;">
      <h4 style="font-family:var(--serif); font-size:18px; color:var(--navy);">What the PYQ analysis changes about your approach</h4>
    </div>
    ${MASTER_DATA.strategyImplications.map(s => `
      <div class="impl-card">
        <div>
          <h5>${s.title}</h5>
          <p>${s.detail}</p>
        </div>
      </div>
    `).join('')}
  </section>`;
}

// ---------------- PLAN SECTION ----------------
function renderPlan(){
  return `
  <section class="section" id="plan">
    <div class="section-head">
      <div class="section-eyebrow">Sequencing</div>
      <h3>Study Sequence &amp; Priority Order</h3>
      <div class="sub">Front-load where you're starting from zero and the ceiling is highest; run current-affairs tracks in parallel from day one</div>
    </div>
    ${MASTER_DATA.sequencingPlan.map(p => `
      <div class="plan-item">
        <div class="plan-priority">${p.priority}</div>
        <div class="plan-body">
          <h5>${p.area}</h5>
          <p>${p.approach}</p>
        </div>
      </div>
    `).join('')}
  </section>`;
}

// ---------------- PYQ: DATA SCOPE ----------------
function renderPyqScope(){
  return `
  <section class="section" id="pyq-scope">
    <div class="section-head">
      <div class="section-eyebrow">PYQ Analysis</div>
      <h3>Data Scope &amp; Its Limits</h3>
      <div class="sub">Real data, not estimation — and an honest account of where it runs thin</div>
    </div>
    <table class="data-table">
      <thead><tr><th>Year</th><th>Papers</th><th>Confidence</th></tr></thead>
      <tbody>
        ${MASTER_DATA.dataScope.map(d => `<tr><td><strong>${d.year}</strong></td><td>${d.papers}</td><td>${d.note}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="info-box amber" style="margin-top:20px;">
      <h5>What this means for you</h5>
      <p>Four data points across 7 years is real signal — enough to trust a directional trend — but not enough to claim precise year-by-year percentages will repeat exactly in 2026. Findings throughout this site are tagged <span class="confidence-badge verified" style="margin:0 4px;">Verified</span> when directly counted from a real paper.</p>
    </div>
  </section>`;
}

// ---------------- PYQ: FORMAT SHIFT ----------------
function renderPyqFormat(){
  return `
  <section class="section" id="pyq-format">
    <div class="section-head">
      <div class="section-eyebrow">PYQ Analysis · Headline Finding</div>
      <h3>Question Format Has Structurally Shifted</h3>
      <div class="sub"><span class="confidence-badge verified">Verified</span> Straight-recall MCQs are vanishing; multi-statement judgment questions now dominate</div>
    </div>
    ${renderBarChart('Question format mix, Paper I (% of 100 questions)', MASTER_DATA.formatTrend.labels, MASTER_DATA.formatTrend.series)}
    <div class="two-col" style="margin-top:20px;">
      <div class="info-box red">
        <h5>Old habit that no longer works</h5>
        <p>Memorizing single facts to recognize "the correct option" among 4 choices. In Dec 2024, this style covered barely a quarter of Paper I.</p>
      </div>
      <div class="info-box green">
        <h5>What to build instead</h5>
        <p>The ability to independently judge each of 3-4 sub-statements (a),(b),(c),(d) as true/false, THEN combine them — being unsure on even one sub-statement breaks the whole question.</p>
      </div>
    </div>

    <div class="section-head" style="margin-top:32px;">
      <h4 style="font-family:var(--serif); font-size:18px; color:var(--navy);">Where each format shows up</h4>
    </div>
    <div class="two-col">
      <div class="card pad" style="border-color:var(--navy); border-width:1.5px;">
        <h5 style="font-family:var(--serif); color:var(--navy); font-size:16px; margin-bottom:4px;">Paper I</h5>
        <div style="font-size:11px; color:var(--muted); font-style:italic; margin-bottom:12px;">Current Affairs + Humanities</div>
        <ul style="list-style:none;">
          ${MASTER_DATA.paperCharacter.paperI.map(x => `<li style="font-size:12px;color:var(--ink);padding:8px 0;border-bottom:1px solid var(--line);line-height:1.5;">• ${x}</li>`).join('')}
        </ul>
      </div>
      <div class="card pad" style="border-color:var(--amber); border-width:1.5px;">
        <h5 style="font-family:var(--serif); color:var(--amber); font-size:16px; margin-bottom:4px;">Paper II</h5>
        <div style="font-size:11px; color:var(--muted); font-style:italic; margin-bottom:12px;">Karnataka CA + Science/Environment + GMA</div>
        <ul style="list-style:none;">
          ${MASTER_DATA.paperCharacter.paperII.map(x => `<li style="font-size:12px;color:var(--ink);padding:8px 0;border-bottom:1px solid var(--line);line-height:1.5;">• ${x}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>`;
}

// ---------------- PYQ: TYPE CATALOGUE ----------------
function renderPyqTypes(){
  return `
  <section class="section" id="pyq-types">
    <div class="section-head">
      <div class="section-eyebrow">PYQ Analysis</div>
      <h3>The Full Catalogue of Question Types</h3>
      <div class="sub"><span class="confidence-badge verified">Verified</span> Every KAS Prelims question falls into one of these 9 structural types</div>
    </div>
    <div class="card pad">
      <div class="qtype-list">
        ${MASTER_DATA.questionTypes.map(q => `
          <div class="qtype-row">
            <div class="qtype-num">${q.id}</div>
            <div class="qtype-name">${q.name}</div>
            <div>
              <div class="qtype-desc">${q.desc}</div>
              <div class="qtype-example">"${q.example}"</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section-head" style="margin-top:32px;">
      <h4 style="font-family:var(--serif); font-size:18px; color:var(--navy);">GMA exact sequence (from your verified Aug 2024 paper)</h4>
      <div class="sub">Q10 through Q27 — 18 consecutive questions, always in this order</div>
    </div>
    <table class="data-table">
      <thead><tr><th>Question</th><th>Topic</th><th>Type</th></tr></thead>
      <tbody>
        ${MASTER_DATA.gmaSequence.map(g => `<tr><td><strong>${g.q}</strong></td><td>${g.topic}</td><td style="font-style:italic;color:var(--muted);">${g.type}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="info-box green" style="margin-top:16px;">
      <h5>Takeaway</h5>
      <p>Numeracy is the largest single GMA sub-block (8 of 18). Comprehension is always passage-based and always comes last. Practice in this exact order to match real exam rhythm.</p>
    </div>
  </section>`;
}

// ---------------- PYQ: WEIGHTAGE ----------------
function renderPyqWeightage(){
  return `
  <section class="section" id="pyq-weightage">
    <div class="section-head">
      <div class="section-eyebrow">PYQ Analysis</div>
      <h3>Paper I Topic Weightage</h3>
      <div class="sub"><span class="confidence-badge verified">Verified</span> Question counts out of 100, consistent across two full years of real data</div>
    </div>
    ${renderBarChart('Topic weightage comparison', MASTER_DATA.topicWeightage.labels, MASTER_DATA.topicWeightage.series)}
    <div class="section-head" style="margin-top:28px;">
      <h4 style="font-family:var(--serif); font-size:16px; color:var(--navy);">What this tells you</h4>
    </div>
    <div class="impl-card"><div><h5>Geography, Economy, History, Polity are consistently co-equal</h5><p>All four land in the 14-18 range across both years — no single subject dominates Paper I. Do not deprioritize any one of these four.</p></div></div>
    <div class="impl-card" style="border-left-color:var(--amber);"><div><h5>Current Affairs (National + International combined) is effectively the largest single block</h5><p>13+13=26 in 2020, and 15+12=27 in 2024 — larger than any individual static subject. This confirms current affairs deserves daily, not occasional, attention.</p></div></div>
    <div class="impl-card" style="border-left-color:var(--green);"><div><h5>Science & Technology in Paper I jumped from 1 to 6 between years</h5><p>A real, dated increase — worth noting, though 2 data points isn't enough to call it a firm trend. Don't ignore Sci&Tech current-developments even in Paper I.</p></div></div>
  </section>`;
}

// ---------------- PYQ: RECURRING TOPICS ----------------
function renderPyqRecurring(){
  return `
  <section class="section" id="pyq-recurring">
    <div class="section-head">
      <div class="section-eyebrow">PYQ Analysis</div>
      <h3>Topics That Repeat Across Years</h3>
      <div class="sub"><span class="confidence-badge verified">Verified</span> Tested in more than one of the four papers analyzed — genuine recurrence, not a one-off</div>
    </div>
    <div class="recur-grid">
      ${MASTER_DATA.recurringTopics.map(g => `
        <div class="recur-card">
          <h5>${g.subject}</h5>
          <ul>${g.items.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
      `).join('')}
    </div>
  </section>`;
}

// ---------------- NCERT INDEX ----------------
function renderNcertIndex(){
  return `
  <section class="section" id="ncert-index">
    <div class="section-head">
      <div class="section-eyebrow">Reference</div>
      <h3>NCERT Class-Wise Master Index</h3>
      <div class="sub">Which class's textbook covers what — single reference table</div>
    </div>
    <div class="card pad">
      ${MASTER_DATA.ncertIndex.map(n => `
        <div class="ncert-row">
          <div class="ncert-cls">${n.cls}</div>
          <div class="ncert-coverage">${n.coverage}</div>
        </div>
      `).join('')}
    </div>
  </section>`;
}

// ---------------- WIKI GUIDE ----------------
function renderWikiGuide(){
  return `
  <section class="section" id="wiki-guide">
    <div class="section-head">
      <div class="section-eyebrow">Reference</div>
      <h3>How To Use Wikipedia Effectively</h3>
      <div class="sub">Go to Wikipedia for a NAMED entity/event/scheme, and read only the relevant sections — not the full article</div>
    </div>
    ${MASTER_DATA.wikiExamples.map(w => `
      <div class="wiki-card">
        <div class="topic">${w.topic}</div>
        <div class="focus">${w.focus}</div>
      </div>
    `).join('')}
    <div class="info-box amber" style="margin-top:16px;">
      <h5>General rule</h5>
      <p>If a Wikipedia article's table of contents has more than ~6 sections, you only need 2 of them for Prelims — the ones with dates, figures, or named provisions. Narrative/background sections are Mains-essay material, not Prelims fact-recall material.</p>
    </div>
  </section>`;
}

// ---------------- LEGEND ----------------
function renderLegend(){
  return `
  <div class="legend">
    <div class="legend-item"><span class="tag ncert">6</span> NCERT class — study that class's chapter first</div>
    <div class="legend-item"><span class="tag degree">DEGREE</span> Extra depth beyond NCERT</div>
    <div class="legend-item"><span class="tag ca">CA</span> Current affairs — tracked live, not memorized as a static list</div>
    <div class="legend-item"><span class="tag ssle">SSLC</span> GMA only — capped at Class 10 difficulty</div>
    <div class="legend-item"><span class="tag-recur">↻ Recurring</span> Confirmed tested in 2+ real papers</div>
    <div class="legend-item"><span class="tag-karnataka">📍 Karnataka angle</span> State-specific emphasis</div>
    <div class="legend-item"><span class="priority-stars">★★★</span> Study priority (paper-setter's view — see below)</div>
  </div>
  <div class="card pad" style="margin-bottom:24px;">
    <div style="font-size:12px; font-weight:700; color:var(--navy); margin-bottom:10px;">What the ★ priority rating means</div>
    ${MASTER_DATA.priorityLegend.map(p => `
      <div style="display:flex; gap:12px; align-items:baseline; margin-bottom:8px;">
        <span class="priority-stars">${'★'.repeat(p.stars)}${'<span class="dim">★</span>'.repeat(3-p.stars)}</span>
        <span style="font-size:11.5px; color:var(--muted);">${p.label}</span>
      </div>
    `).join('')}
  </div>`;
}

// ---------------- PRACTICE QUESTIONS ----------------
function renderPracticeQuestions(){
  return `
  <section class="section" id="practice">
    <div class="section-head">
      <div class="section-eyebrow">Practice</div>
      <h3>Drill: Real &amp; Practice Questions</h3>
      <div class="sub">Click a question to reveal the answer and explanation. Real PYQs are cited exactly; practice questions are clearly labeled as original.</div>
    </div>
    <div class="pq-list">
      ${MASTER_DATA.practiceQuestions.map(q => renderPQCard(q)).join('')}
    </div>
  </section>`;
}

function renderPQCard(q){
  const sourceLabel = q.source === 'real'
    ? `<span class="pq-source real">✓ REAL PYQ — ${q.cite}</span>`
    : `<span class="pq-source practice">✎ PRACTICE — original, written in KAS style</span>`;
  return `
  <div class="pq-card" data-pq="${q.id}">
    <div class="pq-head">
      ${sourceLabel}
      <span class="pq-meta">${q.section} · ${q.type}</span>
    </div>
    <div class="pq-prompt">${q.prompt.replace(/\n/g, '<br>')}</div>
    <ul class="pq-options">${q.options.map(o => `<li>${o}</li>`).join('')}</ul>
    <button class="pq-reveal-btn" data-action="reveal-pq" data-pq="${q.id}">Reveal answer &amp; explanation</button>
    <div class="pq-answer hidden" data-pq-answer="${q.id}">
      <div class="pq-answer-label">Answer: ${q.answer}</div>
      <div class="pq-explain">${q.explain}</div>
    </div>
  </div>`;
}


// ---------------- FULL RENDER ----------------
let currentExam = 'kas-prelims';

// Builds the sidebar nav-link list for a given exam's data array, once,
// the first time that exam is switched to (cached after that).
const NAV_PANELS_BUILT = new Set();

function buildExamNavPanel(examId, dataArray){
  if (NAV_PANELS_BUILT.has(examId)) return;
  const panel = document.getElementById(`examPanel-${examId}`);
  if (!panel) return;
  const links = dataArray.map(sec =>
    `<button class="nav-link" data-target="${sec.id}">${sec.title}</button>`
  ).join('');
  panel.innerHTML = `<div class="nav-group"><div class="nav-group-title">${EXAMS_DATA.examMeta[examId].short}</div>${links}</div>`;
  NAV_PANELS_BUILT.add(examId);
}

function buildCommonNavPanel(){
  if (NAV_PANELS_BUILT.has('common')) return;
  NAV_PANELS_BUILT.add('common'); // static content already in HTML, nothing to build
}

function renderAll(){
  buildSyncGroupIndex();
  const parts = [];

  if (currentExam === 'kas-prelims'){
    parts.push(renderOverview());
    parts.push(renderStrategy());
    parts.push(renderPlan());
    parts.push(`<div id="syllabus-anchor"></div>`);
    parts.push(renderLegend());
    MASTER_DATA.syllabus.forEach(sec => parts.push(renderSyllabusSection(sec)));
    parts.push(renderPracticeQuestions());
    parts.push(renderPyqScope());
    parts.push(renderPyqFormat());
    parts.push(renderPyqTypes());
    parts.push(renderPyqWeightage());
    parts.push(renderPyqRecurring());
    parts.push(renderNcertIndex());
    parts.push(renderWikiGuide());
  } else if (currentExam === 'kas-mains'){
    parts.push(renderExamPage('kas-mains', EXAMS_DATA.kasMains));
  } else if (currentExam === 'kea-degree'){
    parts.push(renderExamPage('kea-degree', EXAMS_DATA.keaDegree));
  } else if (currentExam === 'kea-puc'){
    parts.push(renderExamPage('kea-puc', EXAMS_DATA.keaPuc));
  } else if (currentExam === 'common'){
    parts.push(renderCommonTopicsOverview());
    parts.push(renderCommonTopicsBySubject());
  }

  document.getElementById('content').innerHTML = parts.join('');
  countProgress();
  attachTopicHandlers();
  applySearchAndFilter();
  initSvgChartInteractivity();
}

function switchExam(examId){
  currentExam = examId;
  openTopics.clear();
  document.querySelectorAll('.exam-switch-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-exam') === examId));
  document.querySelectorAll('.exam-nav-panel').forEach(p => p.classList.toggle('hidden', p.id !== `examPanel-${examId}`));

  if (examId === 'kas-mains') buildExamNavPanel('kas-mains', EXAMS_DATA.kasMains);
  else if (examId === 'kea-degree') buildExamNavPanel('kea-degree', EXAMS_DATA.keaDegree);
  else if (examId === 'kea-puc') buildExamNavPanel('kea-puc', EXAMS_DATA.keaPuc);

  renderAll();
  refreshNavObserver();
  document.getElementById('content').scrollIntoView({ behavior: 'instant', block: 'start' });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ---------------- EVENT HANDLERS ----------------
function attachTopicHandlers(){
  document.querySelectorAll('[data-action="reveal-pq"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-pq');
      const answerEl = document.querySelector(`[data-pq-answer="${id}"]`);
      if (answerEl){
        answerEl.classList.remove('hidden');
        btn.style.display = 'none';
      }
    });
  });

  document.querySelectorAll('[data-action="goto-section"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      switchExam('kas-prelims');
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    });
  });

  document.querySelectorAll('[data-action="toggle-check"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = el.getAttribute('data-key');
      const wasChecked = !!progress[key];
      progress[key] = !wasChecked;
      saveProgress();
      const card = el.closest('.topic-card');
      card.classList.toggle('done', progress[key]);
      el.classList.toggle('checked', progress[key]);
      el.setAttribute('aria-checked', progress[key]);
      propagateSyncGroup(key, progress[key]);
      countProgress();
      if (progress[key]){
        const sgId = TOPIC_TO_SYNCGROUP[key];
        if (sgId && SYNCGROUP_MEMBERS_KEYS[sgId] && SYNCGROUP_MEMBERS_KEYS[sgId].length > 1){
          showToast('Marked as studied — synced across ' + SYNCGROUP_MEMBERS_KEYS[sgId].length + ' exams');
        } else {
          showToast('Marked as studied');
        }
      }
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); el.click(); }
    });
  });

  document.querySelectorAll('[data-action="toggle-open"]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.getAttribute('data-key');
      const card = el.closest('.topic-card');
      const sec = getAllExamSectionsFlat().find(s => key.startsWith(s.id + '::'));
      const idx = parseInt(key.split('::')[1], 10);
      const topic = sec.topics[idx];
      const mainEl = card.querySelector('.topic-main');
      let expandWrap = mainEl.querySelector('.topic-expand-content');

      if (openTopics.has(key)){
        openTopics.delete(key);
        card.classList.remove('open');
        if (expandWrap) expandWrap.remove();
      } else {
        openTopics.add(key);
        card.classList.add('open');
        if (!expandWrap){
          expandWrap = document.createElement('div');
          expandWrap.className = 'topic-expand-content';
          expandWrap.innerHTML = `<div class="topic-desc">${topic.desc}</div>${renderStudyTargets(topic.studyTargets)}${renderPyqTrace(topic.pyq)}`;
          mainEl.appendChild(expandWrap);
        }
      }
    });
  });
}

function applySearchAndFilter(){
  let anyVisibleGlobal = false;
  const sections = getCurrentExamSections();

  if (sections.length === 0){
    // Common Topics view (or any exam-less view) has no checkbox filtering;
    // still support search by hiding non-matching text blocks generically.
    const emptyEl = document.getElementById('noResultsState');
    if (emptyEl) emptyEl.classList.add('hidden');
    if (searchQuery){
      let any = false;
      document.querySelectorAll('#content .section').forEach(el => {
        const match = el.textContent.toLowerCase().includes(searchQuery);
        el.classList.toggle('hidden', !match);
        if (match) any = true;
      });
      if (emptyEl) emptyEl.classList.toggle('hidden', any);
    } else {
      document.querySelectorAll('#content .section').forEach(el => el.classList.remove('hidden'));
    }
    return;
  }

  sections.forEach(sec => {
    const groupEl = document.getElementById(sec.id);
    if (!groupEl) return;

    if (sec.isCurrentAffairs || (sec.topics && sec.topics.some(t => t.isCurrentAffairs) && sec.topics.length <= 1)){
      const filterHidesIt = activeFilter !== 'all';
      const text = groupEl.textContent.toLowerCase();
      const searchHidesIt = searchQuery && !text.includes(searchQuery);
      const visible = !filterHidesIt && !searchHidesIt;
      groupEl.classList.toggle('hidden', !visible);
      if (visible) anyVisibleGlobal = true;
      return;
    }

    let sectionHasVisible = false;
    (sec.topics || []).forEach((t, i) => {
      const key = topicKey(sec.id, i);
      const card = document.querySelector(`.topic-card[data-key="${key}"]`);
      if (!card){
        // Topics without a rendered card (e.g. the current-affairs entry
        // inside a mixed section) don't block the section from showing.
        return;
      }
      const visible = topicMatchesFilter(t) && topicMatchesSearch(t, sec.title);
      card.classList.toggle('hidden', !visible);
      if (visible){ sectionHasVisible = true; anyVisibleGlobal = true; }
    });
    const hasNonCardTopics = (sec.topics || []).some(t => t.isCurrentAffairs);
    groupEl.classList.toggle('hidden', !sectionHasVisible && !hasNonCardTopics);
    if (hasNonCardTopics) anyVisibleGlobal = true;
  });

  const emptyEl = document.getElementById('noResultsState');
  if (emptyEl) emptyEl.classList.toggle('hidden', anyVisibleGlobal);
}

// ---------------- SIDEBAR NAV ----------------
let navObserver = null;

function setupNav(){
  const sidebar = document.getElementById('sidebar');
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  // Event delegation: works for nav-links present now AND any injected
  // later (e.g. when a new exam's nav panel is built on first switch),
  // without needing to re-bind listeners each time.
  document.getElementById('sidebarNavBody').addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('data-target'));
    if (isMobile()) sidebar.classList.remove('open');
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), isMobile() ? 50 : 0);
  });

  document.getElementById('sidebarToggle').addEventListener('click', () => {
    if (isMobile()) sidebar.classList.toggle('open');
  });

  refreshNavObserver();
}

// Deterministic immediate sync: computes the current topmost visible
// section right now and applies its active-nav / filter-bar-enabled state.
// Callable standalone (e.g. after search/filter changes) without needing
// to rebuild the whole IntersectionObserver.
function syncActiveSectionState(){
  const links = document.querySelectorAll('.nav-link');
  const filterableSectionIds = new Set(
    getCurrentExamSections().filter(s => !s.isCurrentAffairs).map(s => s.id)
  );
  const filterBar = document.getElementById('filterBar');
  const filterBarHint = document.getElementById('filterBarHint');
  const sections = Array.from(document.querySelectorAll('.section'))
    .filter(s => !s.classList.contains('hidden'));

  let current = sections[0];
  for (const s of sections){
    const rect = s.getBoundingClientRect();
    if (rect.top <= 140) current = s; else break;
  }
  if (!current) return;
  const id = current.id;
  links.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === id));
  const inactive = !filterableSectionIds.has(id);
  if (filterBar) filterBar.classList.toggle('filters-inactive', inactive);
  if (filterBarHint) filterBarHint.classList.toggle('hidden', !inactive);
}

// Re-scans the currently-rendered .section elements and (re)binds the
// IntersectionObserver that drives active-nav-highlighting and the
// filter-bar gray-out. Must be called after every renderAll(), since exam
// switching replaces #content entirely.
function refreshNavObserver(){
  if (navObserver) navObserver.disconnect();

  const links = document.querySelectorAll('.nav-link');
  const filterableSectionIds = new Set(
    getCurrentExamSections().filter(s => !s.isCurrentAffairs).map(s => s.id)
  );
  const sections = Array.from(document.querySelectorAll('.section'));
  const filterBar = document.getElementById('filterBar');
  const filterBarHint = document.getElementById('filterBarHint');

  navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === id));
        const inactive = !filterableSectionIds.has(id);
        if (filterBar) filterBar.classList.toggle('filters-inactive', inactive);
        if (filterBarHint) filterBarHint.classList.toggle('hidden', !inactive);
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));

  syncActiveSectionState();
}

// ---------------- EXAM SWITCHER ----------------
function setupExamSwitcher(){
  document.querySelectorAll('.exam-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const examId = btn.getAttribute('data-exam');
      switchExam(examId);
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (isMobile) document.getElementById('sidebar').classList.remove('open');
    });
  });
}

// ---------------- SEARCH & FILTER SETUP ----------------
function setupSearch(){
  const input = document.getElementById('searchInput');
  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = input.value.trim().toLowerCase();
      applySearchAndFilter();
      syncActiveSectionState();
    }, 150);
  });
}

function setupFilters(){
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      applySearchAndFilter();
      syncActiveSectionState();
    });
  });
}

// ---------------- INIT ----------------
document.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  renderAll();
  setupNav();
  setupExamSwitcher();
  setupSearch();
  setupFilters();
  showToast('Progress saves automatically in this browser');
});
