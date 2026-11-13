/*
 * ARCHIV – Lernkarten-Trainer (für alle Kassetten-Seiten gleich)
 * Liest die Karten aus window.CARDS (steht in der jeweiligen tape-XX.html)
 * und Titel/Farbe aus data/tapes.js.
 */
(function () {
  "use strict";
  var id = document.body.getAttribute("data-tape");
  var tapes = window.ARCHIV_TAPES || [];
  var tape = null;
  for (var i = 0; i < tapes.length; i++) if (tapes[i].id === id) tape = tapes[i];
  tape = tape || { id: id, title: "TAPE " + id, subject: "", color: "#9b7bff" };
  var cards = (window.CARDS || []).filter(function (c) { return c && c.q; });

  // Kopf
  document.documentElement.style.setProperty("--c", tape.color);
  document.title = tape.title + " · ARCHIV";
  document.getElementById("num").textContent = tape.id;
  document.getElementById("title").textContent = tape.title;
  document.getElementById("subject").textContent =
    (tape.subject ? tape.subject + " · " : "") + cards.length + (cards.length === 1 ? " Karte" : " Karten");

  // Liste
  var list = document.getElementById("list");
  cards.forEach(function (c) {
    var li = document.createElement("li");
    var q = document.createElement("span"), a = document.createElement("span");
    q.textContent = c.q; a.textContent = c.a || "";
    li.appendChild(q); li.appendChild(a); list.appendChild(li);
  });

  var box = document.getElementById("trainer");
  if (!cards.length) {
    box.innerHTML = '<p class="empty">Auf dieser Kassette sind noch keine Lernkarten. Trage sie in <code>tapes/tape-' + id + '.html</code> bei <code>CARDS</code> ein.</p>';
    document.getElementById("listPanel").style.display = "none";
    return;
  }

  // Zustand
  var queue, total, known, wrong, open, shuffleOn = true;
  var el = {
    status: document.getElementById("status"), bar: document.getElementById("barFill"),
    card: document.getElementById("card"), q: document.getElementById("q"), a: document.getElementById("a"),
    ok: document.getElementById("ok"), bad: document.getElementById("bad"),
    stage: document.getElementById("stage"), done: document.getElementById("done"),
    shuffle: document.getElementById("shuffle")
  };

  function mix(arr) { for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  function start(subset) {
    queue = (subset || cards).slice();
    if (shuffleOn) mix(queue);
    total = queue.length; known = 0; wrong = [];
    el.stage.style.display = ""; el.done.style.display = "none";
    show();
  }
  function show() {
    if (!queue.length) return finish();
    open = false;
    el.card.classList.remove("open");
    el.q.textContent = queue[0].q;
    el.a.textContent = queue[0].a || "";
    el.ok.disabled = el.bad.disabled = true;
    el.status.firstElementChild.textContent = "Karte " + Math.min(total, known + wrong.length + 1) + " / " + total;
    el.status.lastElementChild.textContent = known + " gewusst · " + wrong.length + " nochmal";
    el.bar.style.width = (100 * (known + wrong.length) / total) + "%";
  }
  function reveal() { if (open || !queue.length) return; open = true; el.card.classList.add("open"); el.ok.disabled = el.bad.disabled = false; }
  function answer(good) {
    if (!open) return;
    var c = queue.shift();
    if (good) known++; else wrong.push(c);
    show();
  }
  function finish() {
    el.bar.style.width = "100%";
    el.stage.style.display = "none"; el.done.style.display = "";
    document.getElementById("score").textContent = known + " / " + total;
    document.getElementById("retryWrong").style.display = wrong.length ? "" : "none";
  }

  el.card.addEventListener("click", reveal);
  el.ok.addEventListener("click", function () { answer(true); });
  el.bad.addEventListener("click", function () { answer(false); });
  document.getElementById("restart").addEventListener("click", function () { start(); });
  document.getElementById("again").addEventListener("click", function () { start(); });
  document.getElementById("retryWrong").addEventListener("click", function () { start(wrong.slice()); });
  el.shuffle.addEventListener("click", function () {
    shuffleOn = !shuffleOn;
    el.shuffle.textContent = "Mischen: " + (shuffleOn ? "an" : "aus");
    start();
  });
  document.addEventListener("keydown", function (e) {
    var onControl = e.target.closest && e.target.closest("button,a,input,textarea");
    if (onControl && (e.key === " " || e.key === "Enter")) return;   // Buttons selbst auslösen lassen
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (el.done.style.display === "none") reveal(); }
    else if (e.key === "ArrowRight" || e.key === "j" || e.key === "J") answer(true);
    else if (e.key === "ArrowLeft" || e.key === "n" || e.key === "N") answer(false);
    else if (e.key === "Escape" || e.key === "Backspace") location.href = "../index.html";
  });
  start();
})();
