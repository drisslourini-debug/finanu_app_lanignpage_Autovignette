# 🔍 UI/UX AUDIT - SCHRITT FÜR SCHRITT ANLEITUNG

## PHASE 1: VISUELLE INSPEKTION DESKTOP

**Live-URL:** https://drisslourini-debug.github.io  
**Hard Reload:** Strg+Shift+R

### SEKTION 1: NAVIGATION BAR
**Was zu prüfen:**
- [ ] Logo Größe: 38px Höhe - sieht gut aus?
- [ ] Button "Vignette sichern" - Padding & Größe ok?
- [ ] Button "Finanu Webseite" - Outline Style konsistent?
- [ ] Sticky Position - funktioniert beim Scrollen?
- [ ] Blur-Effekt - sichtbar und gut?
- [ ] Mobile Sticky CTA - ist der Button unten sichtbar?

**Screenshots zu machen:**
1. Navigation vollständig
2. Nach unten scrollen - Sticky Position ok?

---

### SEKTION 2: HERO SECTION
**Was zu prüfen:**
- [ ] Hero Title "Nie wieder für die Autobahn zahlen" - Größe: 3.25rem ok?
- [ ] Subtitle - Größe & Farbe (primary-color) ok?
- [ ] CTA Button "Vignette sichern" - sichtbar genug?
- [ ] App Icon SVG neben Button - sauber ohne weißer Rand?
- [ ] Check-Items - Abstände zwischen Items (6px) ok?
- [ ] E-Vignette Image - rechts korrekt positioniert?
- [ ] Hero Section Padding - oben/unten ausreichend?

**Metriken prüfen (Browser DevTools > Inspect):**
- [ ] Button: min-height 50px? 
- [ ] App Icon: width 60px?
- [ ] Title: color #50b8e7 für Highlight?

**Screenshots:**
1. Vollständiger Hero
2. Einzeln: CTA Button mit App-Icon
3. E-Vignette Image Details

---

### SEKTION 3: QUIZ SECTION
**Was zu prüfen:**
- [ ] Option Buttons - mind. 44px Höhe?
- [ ] Selected State - visuell deutlich (blau Border)?
- [ ] Question Icons - Größe & Alignment
- [ ] Select Dropdown - Schrift Größe lesbar?
- [ ] Progress Bar - Sichtbarkeit ok?
- [ ] Button Spacing - Gap zwischen Buttons

**DevTools Checks:**
- [ ] Option Button: min-height 44px?
- [ ] Selected Button: border-color #50b8e7?

**Screenshots:**
1. Quiz mit offener Frage
2. Selected Option Highlight
3. Dropdown geöffnet

---

### SEKTION 4: RESULTS SECTION (KRITISCH!)
**Was zu prüfen:**
- [ ] Step Numbers (1-5) - 48px Größe ok?
- [ ] Step Borders - 2px left border sichtbar?
- [ ] Step Titles - Font-Weight bold genug?
- [ ] Personal Data Form:
  - [ ] Vorname, Nachname Inputs - gleich groß?
  - [ ] Geburtsdatum Input - NICHT größer als andere?
  - [ ] Email Input - gleich groß?
  - [ ] Alle 48px Höhe?
  - [ ] Padding 14px konsistent?
- [ ] Checkboxes:
  - [ ] GDPR Checkbox - Größe ok (22px)?
  - [ ] Marketing Checkbox - Größe ok?
  - [ ] Spacing zwischen Items - ausreichend?
  - [ ] "Pflicht" Badge - sichtbar?
  - [ ] "optional" Badge - sichtbar?
- [ ] App Store Buttons (in Step 3):
  - [ ] Apple App Store Button - 56px Höhe?
  - [ ] Google Play Button - 56px Höhe?
  - [ ] Images 40px groß?
  - [ ] Spacing zwischen Buttons - 16px?
- [ ] App Icon (Step 3):
  - [ ] 120px Größe
  - [ ] SVG sauber ohne weißer Rand?
  - [ ] Position zentriert?

**DevTools Measurements:**
- [ ] Form Input height: 48px?
- [ ] Form Input padding: 14px?
- [ ] Date Input height: 48px (nicht größer)?
- [ ] Store Button: 56px height?
- [ ] Store Button images: 40px?

**Critical Screenshots:**
1. Step 1: "Berechtigung bestätigt"
2. Step 2: Ganze Personal Data Form
3. Step 2: Alle Input-Felder in einer Zeile
4. Step 2: Date Input - gleich groß wie andere?
5. Step 2: Checkboxes mit Badges
6. Step 3: App Icon + Store Buttons
7. Step 5: Goal Badge

---

### SEKTION 5: FEATURES SECTION
**Was zu prüfen:**
- [ ] Desktop Layout: 2 Spalten sichtbar?
  - [ ] Links: 3 Highlight Badges nebeneinander?
  - [ ] Rechts: App CTA Box?
- [ ] Highlight Badges:
  - [ ] "In Minuten bereit" - Icon & Text ok?
  - [ ] "Datenschutz first" - Icon & Text ok?
  - [ ] "Persönliche Begleitung" - Icon & Text ok?
  - [ ] Spacing zwischen Badges - 20px?
  - [ ] Padding in Badges - 20px?
- [ ] App CTA Box:
  - [ ] "Jetzt Finanu App holen" - Größe & Hervorhebung ok?
  - [ ] Beschreibung Text - Größe ok?
  - [ ] Download Buttons - korrekt angeordnet?

**Screenshots:**
1. Features Section vollständig (2-spalten)
2. Links: Highlight Badges
3. Rechts: App CTA Box mit Buttons

---

### SEKTION 6: FOOTER
**Was zu prüfen:**
- [ ] Background Farbe - primary blue (#50b8e7)?
- [ ] Footer Text - Weiß und lesbar?
- [ ] Links - Hover-Effect sichtbar?
- [ ] Padding - ausreichend?
- [ ] Layout - Spalten richtig angeordnet?
- [ ] Copyright Text - lesbar?

**Screenshots:**
1. Footer vollständig
2. Link Hover-State

---

## PHASE 2: MOBILE INSPEKTION (iPhone)

**Was zu prüfen ZUSÄTZLICH:**

### Mobile Navigation
- [ ] Logo Größe: 28px - sichtbar?
- [ ] Button Text - nicht abgeschnitten?
- [ ] Sticky CTA oben noch sichtbar?

### Mobile Hero
- [ ] Title Größe - lesbar auf 375px Breite?
- [ ] App Icon - unter Button oder neben Button?
- [ ] E-Vignette - responsive Größe ok?
- [ ] Check Items - Zeilenumbruch ok?

### Mobile Results
**KRITISCH - HIER WIRD'S SPANNEND:**
- [ ] Form Inputs: Alle 48px Höhe?
  - [ ] Vorname Input - Größe ok?
  - [ ] Nachname Input - Größe ok?
  - [ ] Geburtsdatum Input - NICHT größer?
  - [ ] Email Input - Größe ok?
- [ ] Sind Inputs vertikal gestapelt (1 spalte)?
- [ ] Ist zwischen Inputs ausreichend Platz (12px)?
- [ ] Store Buttons:
  - [ ] 60px Höhe auf Mobile?
  - [ ] Bilder 42px groß?
  - [ ] Vollständig untereinander (column)?
  - [ ] Gap 14px zwischen Buttons?

### Mobile Features
- [ ] Layout: 1 spalte (vertical)?
  - [ ] Oben: Highlights (3 Badges)
  - [ ] Unten: App CTA
- [ ] Sind alle Badges sichtbar?
- [ ] App CTA - volles Breite?

---

## KRITISCHE FINDINGS - BITTE NOTIEREN:

Wenn etwas nicht stimmt:
1. **Element:** (z.B. "Date Input Mobile")
2. **Problem:** (z.B. "Ist größer als andere Inputs")
3. **Erwartet:** (z.B. "48px Höhe")
4. **Aktuell:** (z.B. "Sieht nach 60px aus")
5. **Fix:** (z.B. "CSS anpassen")

---

## ✅ AUDIT COMPLETION CHECKLIST

- [ ] Desktop Navigation - OK
- [ ] Desktop Hero - OK
- [ ] Desktop Quiz - OK
- [ ] Desktop Results (KRITISCH) - OK
- [ ] Desktop Features - OK
- [ ] Desktop Footer - OK
- [ ] Mobile Navigation - OK
- [ ] Mobile Hero - OK
- [ ] Mobile Results (KRITISCH) - OK
- [ ] Mobile Features - OK

---

**Nächster Schritt nach Audit:**
Alle Findings hier eintragen + Screenshots machen!
