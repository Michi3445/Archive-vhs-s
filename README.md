# ARCHIV

**▶ Live ansehen: [michi3445.github.io/Archive-vhs-s](https://michi3445.github.io/Archive-vhs-s/)**

Ein kleines Video-Archiv im Browser: fünf VHS-Kassetten in echtem 3D, durch die man scrollen, wischen und klicken kann. Davor läuft ein Startscreen im Stil eines alten Videorecorders.

Alles steckt in **einer einzigen Datei** (`index.html`): HTML, CSS und JavaScript, ohne Build-Schritt und ohne Bibliotheken.

## Ablauf

1. **Startscreen:** Die Kassette wird eingelegt (kurzes Rauschen). Dann kommt der blaue VHS-Bildschirm mit `▶ PLAY`, Zeitzähler, `CH 03` und „WELCOME TO ARCHIV“.
2. Nach 2 Sekunden **verzischt** der Schriftzug in Streifen zu beiden Seiten.
3. Die **Kassetten klappen auf**, von der Mitte nach außen.

## Steuerung

| Aktion | Desktop | Handy |
| --- | --- | --- |
| Nächste / vorige Kassette | Mausrad, Pfeiltasten, Ziehen | Wischen |
| Direkt zu Kassette springen | Tasten `1`–`5` oder Balken unten anklicken | Balken unten antippen |
| Kassette umdrehen | Doppelklick oder `F` | Lange drücken |
| Kassette neigen | Maus bewegen | Handy neigen |
| Startscreen überspringen | Klick, `Enter` oder `Leertaste` | Tippen |
| Ton an / aus | Knopf oben rechts | Knopf oben rechts |

## Weitere Details

- Die Seite merkt sich die zuletzt angesehene Kassette (über `localStorage`).
- Beim Wechseln ertönt ein kurzer Piepton. Er wird mit der Web Audio API erzeugt und spielt erst nach dem ersten Klick, weil Browser vorher keinen Ton erlauben.
- Die Animationen laufen immer, auch wenn im System „Bewegung reduzieren“ eingestellt ist.
- Die Kassetten sind nur zum Anschauen da und öffnen keine Links.

## Starten

`index.html` einfach im Browser öffnen. Ein Server ist nicht nötig.

### Online mit GitHub Pages

Die Seite ist über GitHub Pages veröffentlicht: **https://michi3445.github.io/Archive-vhs-s/**

Jeder Push auf `main` aktualisiert die Seite automatisch nach etwa einer Minute.

## Anpassen

Titel, Nummern und Farben der Kassetten stehen oben im Script im Array `TAPES`:

```js
const TAPES = [
  { title: "TAPE 01", num: "01", color: "#ff4fd8" },
  // ...
];
```

Die Farben der Oberfläche sind als CSS-Variablen in `:root` definiert.

## Technik

- 3D mit CSS-Transforms (`preserve-3d`), ohne WebGL
- Schriften von Google Fonts: Inter, JetBrains Mono, VT323. Ohne Internet greift eine Systemschrift.
- Getestet in Chromium auf Desktop und im iPhone-Format

## Lizenz

[MIT](LICENSE)
