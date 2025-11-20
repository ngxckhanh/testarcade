/* DATA: list of items and their categories */
const ITEMS = [
  {id:1,name:"Vỏ chuối",cat:"organic"},
  {id:2,name:"Lon nhôm",cat:"recycle"},
  {id:3,name:"Túi ni lông",cat:"inorganic"},
  {id:4,name:"Chai nhựa",cat:"recycle"},
  {id:5,name:"Thức ăn thừa",cat:"organic"},
  {id:6,name:"Giấy",cat:"recycle"}
];

/* STATE */
let score = parseInt(localStorage.getItem("saola_arcade_score") || "0",10);
let remaining = []; // items left
const itemsEl = document.getElementById("items");
const bins = Array.from(document.querySelectorAll(".bin"));
const scoreEl = document.getElementById("score");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const popupImg = document.getElementById("popupImg");

scoreEl.innerText = score;

/* Utilities: shuffle */
function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

/* Render items */
function renderItems(){
  itemsEl.innerHTML="";
  remaining.forEach(it=>{
    const d = document.createElement("div");
    d.className="item";
    d.draggable = true;
    d.textContent = it.name;
    d.dataset.cat = it.cat;
    d.dataset.id = it.id;
    itemsEl.appendChild(d);
    bindDrag(d);
  });
}

/* Drag & drop handlers */
function bindDrag(el){
  /* --- Desktop native drag --- */
  el.addEventListener('dragstart', e=>{
    // prevent accidental image ghost drag on touch devices
    try { e.dataTransfer.setData("text/plain", el.dataset.id); } catch(err){}
    el.classList.add("dragging");
  });
  el.addEventListener('dragend', ()=> el.classList.remove("dragging"));

  /* --- Pointer fallback for touch / mouse (more reliable) --- */
  let pointerDown=false, startX=0, startY=0, lastDx=0, lastDy=0;
  // pointerdown
  el.addEventListener('pointerdown', e=>{
    // prevent native dragstart and text selection
    e.preventDefault();
    pointerDown=true;
    startX=e.clientX;
    startY=e.clientY;
    lastDx = 0; lastDy = 0;
    // capture pointer so we continue to receive events even if pointer leaves element
    try { el.setPointerCapture(e.pointerId); } catch(err){}
    // styling for dragging
    el.style.position='relative';
    el.style.zIndex = 1000;
    el.classList.add('dragging');
  });

  // pointermove
  el.addEventListener('pointermove', e=>{
    if(!pointerDown) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    lastDx = dx; lastDy = dy;
    // use transform to move visually (fast)
    el.style.transform = `translate(${dx}px,${dy}px)`;
  });

  // pointerup / pointercancel
  const endPointer = (e) => {
    if(!pointerDown) return;
    pointerDown=false;
    // compute collision WHILE transform still applied (so rect reflects actual visual pos)
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    let droppedBin = null;
    bins.forEach(bin=>{
      const r = bin.getBoundingClientRect();
      if(centerX >= r.left && centerX <= r.right && centerY >= r.top && centerY <= r.bottom){
        droppedBin = bin;
      }
    });

    // release pointer capture if available
    try { if(e && e.pointerId) el.releasePointerCapture(e.pointerId); } catch(err){}

    // reset visual styles AFTER computing rect
    el.style.transform='';
    el.style.position='static';
    el.style.zIndex='';
    el.classList.remove('dragging');

    if(droppedBin){
      handleDrop(el.dataset.id, droppedBin);
    } else {
      // no drop -> just snap back (we already reset transform)
    }
  };

  el.addEventListener('pointerup', endPointer);
  el.addEventListener('pointercancel', endPointer);
}

/* Desktop drag & drop (bins) */
bins.forEach(bin=>{
  bin.addEventListener('dragover', e=>{ e.preventDefault(); bin.classList.add("highlight"); });
  bin.addEventListener('dragleave', ()=> bin.classList.remove("highlight"));
  bin.addEventListener('drop', e=>{
    e.preventDefault();
    bin.classList.remove("highlight");
    const id = e.dataTransfer.getData("text/plain");
    handleDrop(id, bin);
  });
});

/* Drop logic */
function handleDrop(id, bin){
  const itemIndex = remaining.findIndex(i=>String(i.id) === String(id));
  if(itemIndex === -1) return;
  const item = remaining[itemIndex];
  const binCat = bin.dataset.cat;
  if(item.cat === binCat){
    score += 100;
    localStorage.setItem("saola_arcade_score", String(score));
    scoreEl.innerText = score;

    popupImg.style.display='none';
    popupText.innerText = `${item.name} is ${bin.textContent}. +100 điểm!`;
    popup.style.display='block';

    remaining.splice(itemIndex,1);
    renderItems();
  } else {
    // visual feedback for wrong bin
    if (bin.animate) {
      bin.animate([{background:'#fff'},{background:'#ffdcdc'},{background:'#fff'}],{duration:400});
    } else {
      // fallback: briefly add a class (if CSS exists)
      bin.classList.add('wrong');
      setTimeout(()=>bin.classList.remove('wrong'), 400);
    }
  }
}

/* Popup close */
document.getElementById("popupClose").addEventListener("click", () => {
  popup.style.display = 'none';
});

/* Reset session */
document.getElementById("resetBtn").addEventListener("click", ()=>{
  localStorage.setItem("saola_arcade_score","0");
  score = 0; scoreEl.innerText = 0;
});

/* INIT */
function init(){
  remaining = shuffle(ITEMS.slice());
  renderItems();
}
init();
