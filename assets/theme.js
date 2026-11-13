/*
 * ARCHIV – Tag/Nacht
 * AUTO: 7–19 Uhr Tag (helles Wohnzimmer), sonst Nacht (dunkles Neon-Zimmer).
 * Die Wahl (AUTO / TAG / NACHT) wird im Browser gespeichert und gilt auf allen Seiten.
 * Früh im <head> laden, damit nichts aufblitzt.
 */
(function () {
  var KEY = "archiv.theme", MODES = ["auto", "day", "night"], LABEL = { auto: "AUTO", day: "TAG", night: "NACHT" };
  function load() { try { var m = localStorage.getItem(KEY); return MODES.indexOf(m) >= 0 ? m : "auto"; } catch (e) { return "auto"; } }
  function save(m) { try { localStorage.setItem(KEY, m); } catch (e) {} }
  var mode = load();
  function resolved() { if (mode !== "auto") return mode; var h = new Date().getHours(); return h >= 7 && h < 19 ? "day" : "night"; }
  function apply() {
    var r = resolved();
    document.documentElement.setAttribute("data-theme", r);
    var btns = document.querySelectorAll("[data-theme-btn]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = (r === "day" ? "☀ " : "☾ ") + LABEL[mode];
      btns[i].setAttribute("aria-label", "Tag/Nacht: " + LABEL[mode]);
    }
  }
  function cycle() { mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length]; save(mode); apply(); }
  apply();
  setInterval(apply, 60000);
  document.addEventListener("DOMContentLoaded", function () {
    apply();
    var btns = document.querySelectorAll("[data-theme-btn]");
    for (var i = 0; i < btns.length; i++) btns[i].addEventListener("click", function (e) { e.stopPropagation(); cycle(); });
  });
  window.ArchivTheme = { cycle: cycle, apply: apply, get: resolved };
})();
