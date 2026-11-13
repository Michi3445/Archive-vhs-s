# ARCHIV

**▶ Live ansehen: [michi3445.github.io/Archive-vhs-s](https://michi3445.github.io/Archive-vhs-s/)**

Ein kleines Video-Archiv im Browser: fünf VHS-Kassetten als schräge, kantige Karten in einer Reihe, durch die man seitlich scrollen, wischen und klicken kann. Davor läuft ein kurzer Startscreen mit ASCII-Schriftzug.

Jede Kassette hat ihre eigene Seite mit Lernkarten zum Trainieren. Alles ist reines HTML, CSS und JavaScript, ohne Build-Schritt und ohne Bibliotheken.

## Ablauf

1. **Startscreen:** Schwarzer Bildschirm mit kantigem, kursivem ASCII-Schriftzug „ARCHIV“ und „Made by Michi“. Nach einem kurzen Moment **verzischt** alles zu beiden Seiten. Der Start läuft bei jedem Laden und dauert insgesamt höchstens 2 Sekunden.
2. Die **Kassetten-Karten fliegen von rechts herein**. Die mittlere ist groß und leuchtet, die anderen sind kleiner und blasser.
3. **Kassette öffnen** führt zu ihrer eigenen Seite mit einem **Lernkarten-Trainer**.

## Steuerung

| Aktion | Desktop | Handy |
| --- | --- | --- |
| Nächste / vorige Kassette | Mausrad, Pfeiltasten, Ziehen | Seitlich wischen |
| Direkt zu Kassette springen | Tasten `1`–`5`, Balken unten oder Klick auf eine Karte | Balken oder Karte antippen |
| Kassette öffnen | Klick auf die mittlere Karte oder `Enter` | Mittlere Karte antippen |
| Tag / Nacht | Knopf oben rechts (AUTO → TAG → NACHT) | genauso |
| Ton an / aus | Knopf oben rechts | Knopf oben rechts |

Die Reihe rastet nach dem Scrollen weich auf der nächsten Karte ein.

**Auf einer Kassetten-Seite:** Karte antippen oder `Leertaste` deckt die Antwort auf. Dann „✓ Gewusst“ (`→`) oder „✗ Nochmal“ (`←`). Falsche Karten kommen am Ende noch einmal dran. `Esc` führt zurück zum Archiv.

## Tag- und Nacht-Modus

- **AUTO** (Standard): von 7 bis 19 Uhr Tag, sonst Nacht, nach der Uhrzeit des Geräts.
- **Tag:** helles Wohnzimmer mit Wand und Holzboden.
- **Nacht:** dunkles Zimmer mit Neon-Leuchten.
- Die Wahl wird im Browser gespeichert und gilt auch auf den Kassetten-Seiten.

## Weitere Details

- Abgenutzte Etiketten: handgeschriebene Titel, vergilbtes Papier und Klebeband-Reste, bei jeder Kassette etwas anders.
- Die zuletzt angesehene Kassette wird gemerkt (`localStorage`).
- Ein kurzer Piepton beim Wechseln, erzeugt mit der Web Audio API. Er spielt erst nach dem ersten Klick, weil Browser vorher keinen Ton erlauben.
- Alles ist schlank gehalten: keine Bibliotheken, kein Build-Schritt.

## Starten

`index.html` einfach im Browser öffnen. Ein Server ist nicht nötig, alle Seiten funktionieren auch direkt aus dem Ordner.

### Online mit GitHub Pages

Die Seite ist über GitHub Pages veröffentlicht: **https://michi3445.github.io/Archive-vhs-s/**

Jeder Push auf `main` aktualisiert die Seite automatisch nach etwa einer Minute.

## Inhalte eintragen

### Kassetten (Titel, Fach, Farbe)

In **`data/tapes.js`**:

```js
window.ARCHIV_TAPES = [
  { id: "01", title: "MATHE", subject: "Bruchrechnen", color: "#ff4fd8", page: "tapes/tape-01.html" },
  // ...
];
```

- `title` steht handgeschrieben auf dem Etikett (kurz halten, ca. 12 Zeichen).
- `subject` steht klein darunter und auf der Kassetten-Seite. Leer lassen geht auch.
- `page` ist die Seite, die beim Öffnen geladen wird.

### Lernkarten

In der jeweiligen Seite **`tapes/tape-01.html`** bis **`tape-05.html`**, ganz unten bei `CARDS`:

```js
window.CARDS = [
  { q: "Was ist 7 × 8?", a: "56" },
  { q: "Hauptstadt von Frankreich?", a: "Paris" },
];
```

`tape-01.html` enthält drei Beispielkarten zum Ausprobieren, die anderen Seiten sind noch leer.

### Neue Kassette hinzufügen

1. `tapes/tape-01.html` kopieren, zum Beispiel als `tapes/tape-06.html`.
2. In der Kopie `data-tape="01"` auf `"06"` ändern und die Karten eintragen.
3. In `data/tapes.js` einen Eintrag mit `id: "06"` und `page: "tapes/tape-06.html"` hinzufügen.

## Aufbau

```
index.html          Startseite: Startscreen + Karten-Reihe
data/tapes.js       Liste aller Kassetten (Titel, Fach, Farbe, Seite)
assets/theme.js     Tag/Nacht-Umschaltung (für alle Seiten)
tapes/tape-01.html  Seite pro Kassette, mit den Lernkarten
tapes/tape.css      Design der Kassetten-Seiten
tapes/trainer.js    Lernkarten-Trainer (für alle Kassetten gleich)
```

## Technik

- Karten-Reihe nur mit 2D-CSS-Transforms, die Animation läuft nur, solange sich etwas bewegt
- Schriften von Google Fonts: Inter, JetBrains Mono, VT323, Permanent Marker. Ohne Internet greift eine Systemschrift.
- Getestet in Chromium auf Desktop und im iPhone-Format

## Lizenz

[MIT](LICENSE)
