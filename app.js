// Renders the chapter list from chapters.js, and handles
// opening/closing the in-page reader view.
// You shouldn't need to edit this file — edit chapters.js instead.

const frame = document.querySelector('.frame');
const addressbar = document.getElementById('addressbar');
const chapterList = document.getElementById('chapter-list');
let currentChapter = null;

function renderChapterList(){
  chapterList.innerHTML = chapters.map((ch, index) => {
    const isSoon = ch.status === 'soon';
    const badge = ch.badge
      ? `<span class="chapter-badge${isSoon ? ' soon' : ''}">${ch.badge}</span>`
      : '';
    const num = String(index + 1).padStart(2, '0');

    return `
      <a class="chapter-item${isSoon ? ' disabled' : ''}" href="#"
         onclick="${isSoon ? 'return false' : `openChapter(event, ${index})`}">
        <span class="chapter-num">${num}</span>
        <div class="chapter-info">
          <div class="name">${ch.title}</div>
          <div class="meta">${ch.meta || ''}</div>
        </div>
        ${badge}
      </a>`;
  }).join('');
}

function openChapter(e, index){
  if(e) e.preventDefault();
  const ch = chapters[index];
  if(!ch || ch.status === 'soon') return;
  currentChapter = index;

  document.getElementById('reader-title').textContent = ch.title;
  document.getElementById('reader-meta').textContent = ch.meta || '';
  document.getElementById('reader-body').innerHTML =
    ch.text.map(p => `<p>${p}</p>`).join('');

  document.getElementById('prev-btn').disabled = index <= 0;
  document.getElementById('next-btn').disabled =
    index >= chapters.length - 1 || chapters[index + 1]?.status === 'soon';

  addressbar.textContent = 'yourstory.reads/chapter-' + (index + 1);
  frame.classList.add('reading');
  frame.scrollIntoView({behavior:'smooth', block:'start'});
}

function stepChapter(dir){
  const next = currentChapter + dir;
  if(chapters[next]) openChapter(null, next);
}

function closeChapter(){
  frame.classList.remove('reading');
  addressbar.textContent = 'yourstory.reads/home';
}

renderChapterList();
