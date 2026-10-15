// Preload every image so swaps happen without a flash.
[
  "assets/inside-scene.jpg",
  "assets/diatom-guy.png",
  "assets/diatom-guy-with-hat.png",
  "assets/hat.png",
  "assets/door.png",
  "assets/house.png",
  "assets/car.png",
  "assets/car-with-driver.png",
].forEach((src) => {
  new Image().src = src;
});

const $ = (id) => document.getElementById(id);

// ---------- Scene 1 ----------

const scene1 = $("scene1");
const guy1 = $("guy1");
const guy1Img = $("guy1-img");
const hat = $("hat");
const door = $("door");

hat.addEventListener("click", () => {
  guy1Img.src = "assets/diatom-guy-with-hat.png";
  hat.classList.add("hidden");
  door.classList.remove("hidden");
  // Bob the image, drag the wrapper, so the two transforms don't fight.
  guy1Img.classList.add("bob");
  guy1.classList.add("draggable");
});

// Dragging the guy (with hat) onto the door starts Scene 2.
let drag = null;

guy1.addEventListener("pointerdown", (e) => {
  if (!guy1.classList.contains("draggable")) return;
  e.preventDefault();
  guy1.setPointerCapture(e.pointerId);
  drag = { x: e.clientX, y: e.clientY };
  guy1.classList.add("dragging");
});

guy1.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  guy1.style.transform = `translate(${dx}px, ${dy}px)`;
  door.classList.toggle("target", overlapsDoor());
});

guy1.addEventListener("pointerup", endDrag);
guy1.addEventListener("pointercancel", endDrag);

function endDrag() {
  if (!drag) return;
  drag = null;
  guy1.classList.remove("dragging");
  door.classList.remove("target");
  if (overlapsDoor()) {
    startScene2();
  } else {
    guy1.style.transform = "";
  }
}

// True when the centre of the guy is over the door.
function overlapsDoor() {
  const g = guy1.getBoundingClientRect();
  const d = door.getBoundingClientRect();
  const cx = g.left + g.width / 2;
  const cy = g.top + g.height / 2;
  return cx >= d.left && cx <= d.right && cy >= d.top && cy <= d.bottom;
}

// ---------- Scene 2 ----------

const scene2 = $("scene2");
const guy2 = $("guy2");
const car = $("car");
const carImg = $("car-img");
let carClicked = false;

function startScene2() {
  scene1.classList.add("hidden");
  scene2.classList.remove("hidden");
}

car.addEventListener("click", () => {
  if (carClicked) return;
  carClicked = true;
  guy2.classList.add("hidden");
  carImg.src = "assets/car-with-driver.png";
  // Shake the image; slide the wrapper, so the two transforms don't fight.
  carImg.classList.add("shake");
  setTimeout(() => {
    car.classList.add("drive-off");
  }, 1000);
});
