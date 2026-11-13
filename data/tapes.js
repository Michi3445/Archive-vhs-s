/*
 * ARCHIV – Kassetten-Daten
 * ------------------------
 * Hier stehen alle Kassetten. Startseite und Kassetten-Seiten lesen diese Datei.
 *
 *   id       zweistellige Nummer, steht groß auf dem Etikett
 *   title    handgeschriebener Titel auf dem Etikett (kurz halten, ca. 12 Zeichen)
 *   subject  Fach / Thema, steht klein unter dem Titel ("" = leer lassen)
 *   color    Farbe der Kassette
 *   page     Seite, die beim Öffnen der Kassette geladen wird
 *
 * Neue Kassette: einen Eintrag hinzufügen und tapes/tape-01.html als Vorlage kopieren.
 */
window.ARCHIV_TAPES = [
  { id: "01", title: "TAPE 01", subject: "", color: "#ff4fd8", page: "tapes/tape-01.html" },
  { id: "02", title: "TAPE 02", subject: "", color: "#3ee6f0", page: "tapes/tape-02.html" },
  { id: "03", title: "TAPE 03", subject: "", color: "#9b7bff", page: "tapes/tape-03.html" },
  { id: "04", title: "TAPE 04", subject: "", color: "#ff7ab8", page: "tapes/tape-04.html" },
  { id: "05", title: "TAPE 05", subject: "", color: "#6c9bff", page: "tapes/tape-05.html" },
];
