# 🎯 Finanu Landing Page - UI/UX Audit & Optimization Checklist

**Status**: Dezember 17, 2025 | Version 36  
**Last Updated**: Nach Mobile Date-Input Fix

---

## ✅ BEREITS OPTIMIERT

### Navigation & Header
- ✅ Logo SVG integriert
- ✅ Sticky Navigation mit Blur-Effekt
- ✅ Mobile Sticky CTA Button
- ✅ Primary Blue Branding (#50b8e7)

### Hero Section
- ✅ App Icon SVG neben CTA Button
- ✅ E-Vignette 2026 PNG eingebunden
- ✅ Hero Title mit Highlight-Text
- ✅ Check-Items mit Symbolen
- ✅ Disclaimer Text Größe optimiert

### Quiz Section
- ✅ Option-Buttons mit Hover-Effects
- ✅ Progress Bar
- ✅ Question Icons
- ✅ Select-Dropdown mit Custom Styling

### Results Section
- ✅ 5-Step Checklist Flow
- ✅ Step-States (active, pending, completed)
- ✅ Personal Data Form (Vorname, Nachname, Geburtsdatum, Email)
- ✅ Checkboxes (Required GDPR + Optional Marketing)
- ✅ App Store Buttons (direct links)
- ✅ App Download Icon (120px Desktop, 100px Mobile)

### Features Section
- ✅ 2-Column Layout (Desktop)
- ✅ Highlights Links + App CTA Rechts
- ✅ Responsive (1-spalte Tablet/Mobile)
- ✅ 3 Highlight Badges (In Minuten bereit, Datenschutz first, Persönliche Begleitung)

### Mobile Optimizations
- ✅ Store Buttons: 60px Height (Mobile)
- ✅ Form Inputs: 48px Height mit 14px Padding
- ✅ Date Input: 0.95rem Font mit angepasstem Line-Height
- ✅ Responsive Button Sizes

### Buttons & CTAs
- ✅ Primary Button Color (#50b8e7)
- ✅ Button Hover States (translateY, shadow)
- ✅ Button Sizes (sm, lg, full-width)
- ✅ Glow Effect Animation

### Footer
- ✅ Primary Blue Background
- ✅ Footer Links & Social
- ✅ Copyright Text

---

## ⚠️ ZU OPTIMIEREN / POTENTIAL ISSUES

### 1. **ICONS & SVGS**
- ❓ Timer Icon (Clock SVG) im Limited Offer Badge - konsistenter Style?
- ❓ Feature Icons (compare-insurance, budget-calculator, etc.) - müssen sie größer/deutlicher sein?
- ❓ Question Icons (Emoji vs SVG?) - konsistent?
- ❓ App Store Badge Größen auf Mobile - sind sie klein genug?

### 2. **FARBEN & BRANDING**
- ❓ Section Headers Schrift - sollte primäre Farbe stärker sein?
- ❓ Links in Footer & Checkboxes - sind Hover-States sichtbar genug?
- ❓ Warning/Error/Success Colors - einheitlich verwendet?
- ❓ Highlight-Badges (orange gradient) - Konsistenz prüfen

### 3. **ABSTÄNDE & PADDING** 
- ❓ Hero Section - Top/Bottom Padding ausreichend auf Mobile?
- ❓ Step Items - Vertical Gap zwischen Steps (20px) - ist 12px auf Mobile genug?
- ❓ Form Groups - Label zu Input Abstand (6px) - ausreichend?
- ❓ Results Content - 40px Padding auf Desktop, aber 22px auf Mobile - ausreichend?
- ❓ Footer Padding - ist Spacing konsistent?

### 4. **TYPOGRAPHIE**
- ❓ Hero Title Font-Size (3.25rem Desktop, ?) - ist Mobile Größe optimaloptimiert?
- ❓ Section Headers H2 - Font-Size konsistenz über alle Sections?
- ❓ Step Titles - Font-Weight (bold) ist stark genug?
- ❓ Small Text (0.85rem) - ist es auf Mobile noch lesbar?
- ❓ Disclaimer Text (kleiner) - kontrast ausreichend?

### 5. **BUTTONS & CTAs**
- ❓ Button Border-Radius - sind 10px/12px konsistent verwendet?
- ❓ Button Hover States - ist Transform translateY(-2px) sichtbar genug?
- ❓ Button Click-Area - min-height 44px auf Mobile erreicht?
- ❓ Store Button Border (2px) - sieht man es auf allen Backgrounds?
- ❓ Disabled Button State - ist es visuell unterschiedlich genug?

### 6. **FORM ELEMENTS**
- ❓ Input Focus States - box-shadow ausreichend sichtbar?
- ❓ Placeholder Text Farbe - Kontrast ok?
- ❓ Checkbox Size (22px Desktop, 20px Mobile) - ist ausreichend groß?
- ❓ Checkbox Color - Hover State sichtbar?
- ❓ Error/Valid Input States - Farben (rot/grün) einheitlich?
- ❓ Label Text Größe - konsistent über alle Inputs?

### 7. **SPACING DETAILS**
- ❓ Hero CTA Group - Gap zwischen Button & App-Icon (16px) - ist es ausreichend visuell getrennt?
- ❓ Checkboxes Gap (8px auf Mobile) - Text zu nah am Checkbox?
- ❓ App-Stores Gap (14px Mobile, 16px Desktop) - konsistent genug?
- ❓ Results Section - Margin zwischen Steps - zu groß/klein?

### 8. **RESPONSIVE BREAKPOINTS**
- ❓ Tablet (768px) Breakpoint - sind alle Elemente korrekt angepasst?
- ❓ Mobile (480px) Breakpoint - könnten noch weitere Optimierungen sein?
- ❓ Hero Wrapper - ist 2-Column → 1-Column Transition smooth?
- ❓ Features Section - ist 2-Column zu 1-Column Transition ok?

### 9. **IMAGES & PNGs**
- ❓ E-Vignette PNG (hero/evignette-2026.png) - ist Größe/Qualität ok?
- ❓ Feature Icons - sind PNG/SVG konsistent?
- ❓ App Icon SVG - ist das saubere Rendering ohne Rand sichergestellt?
- ❓ App Store Badges - sind beide Badge-Bilder konsistent groß/klein?

### 10. **SHADOWS & EFFECTS**
- ❓ Box-Shadows - sind sie zu dunkel/hell?
- ❓ Shadow Consistency - primary-shadow vs sm/md/lg shadows - überall richtig verwendet?
- ❓ Animation Smooth? - pulse, float, fade-in, slide-in - alle funktionieren?
- ❓ Hover Effects - sind translateY & shadow kombiniert sichtbar?

### 11. **EDGE CASES**
- ❓ Long Text Wrapping - funktioniert korrekt?
- ❓ Empty State (Checkboxes unchecked) - visuell klar?
- ❓ Disabled Buttons - Opacity 0.5 sichtbar genug?
- ❓ Focus States (Accessibility) - sind Fokus-Indikatoren sichtbar?

### 12. **PNGS - QUALITÄT CHECKEN**
- ❓ `assets/images/hero/evignette-2026.png` - Größe/DPI ok?
- ❓ `assets/app-badges/apple-app-store.svg` - Größe konsistent?
- ❓ `assets/app-badges/google-play-store.svg` - Größe konsistent?
- ❓ APP Icon PNG (alt) vs SVG - ist SVG sauberer?

---

## 🔍 DETAILLIERTE PRÜFLISTE ZUM DURCHGEHEN

### Pro Element durchprüfen:

**Navigation Bar**
- [ ] Logo Größe optimal? (38px Desktop, 28px Mobile)
- [ ] Button Padding konsistent?
- [ ] Blur-Effekt sichtbar?
- [ ] Sticky Position funktioniert?

**Hero Section**
- [ ] Title Größe – lesbar auf Mobile?
- [ ] App Icon – kein weißer Rand sichtbar?
- [ ] CTA Button – gut sichtbar?
- [ ] Check-Items – ausreichend Spacing?
- [ ] E-Vignette Image – richtige Größe?

**Quiz Section**
- [ ] Option Buttons – sind sie klickbar genug (min 44px)?
- [ ] Selected State – visuell deutlich?
- [ ] Icons – Größe konsistent?

**Results Section (Kritisch!)**
- [ ] Step Numbers (48px) – lesbar?
- [ ] Step Borders (2px) – sichtbar?
- [ ] Form Inputs (48px) – gleich groß?
- [ ] Date Input – NICHT größer?
- [ ] Checkboxes – Spacing ok?
- [ ] App Icon (120px/100px) – sauber?
- [ ] Store Buttons (60px Mobile) – klickbar?

**Features Section**
- [ ] 2-Column Layout – auf Desktop?
- [ ] Highlights Badges – gleichmäßig groß?
- [ ] App CTA – prominent genug?
- [ ] Responsive – 1-spalte auf Tablet?

**Footer**
- [ ] Farben konsistent?
- [ ] Links – Hover States?
- [ ] Padding – ausreichend?

---

## 📊 METRIKEN ZUM ÜBERPRÜFEN

```
Button Sizes:
- Desktop CTA: min-height 50px ✓
- Mobile CTA: min-height 56px ✓
- Store Button Desktop: 56px ✓
- Store Button Mobile: 60px ✓

Input Sizes:
- Desktop Input: height 48px ✓
- Mobile Input: height 48px ✓
- Date Input: height 48px (mit angepasstem Font) ✓

Icons/Images:
- App Icon Desktop: 120px ✓
- App Icon Mobile: 100px ✓
- Hero App Icon: 60px Desktop, 50px Mobile ✓
- Step Number Circles: 48px ✓

Spacing Key:
- Section Padding: 40px Desktop, 22px Mobile
- Gap Between Items: 16px-20px (Desktop), 12px-14px (Mobile)
- Form Gap: 12px

Colors:
- Primary: #50b8e7 ✓
- Secondary: #10B981 ✓
- Border: #E2E8F0 ✓
```

---

## 🚀 NÄCHSTE SCHRITTE

1. **Visual Inspection durchführen:**
   - [ ] Auf Desktop Browser öffnen
   - [ ] Auf iPhone öffnen (exact Audit durchführen)
   - [ ] Auf Tablet öffnen

2. **Pro Bereich prüfen:**
   - [ ] Alle Abstände mit Browser DevTools messen
   - [ ] Screenshot Vergleiche machen
   - [ ] Farbkontraste prüfen

3. **Feine Korrekturen:**
   - [ ] Pixel-perfekte Optimierungen
   - [ ] Letzte Responsive-Adjustments
   - [ ] Performance-Check (Image Sizes)

4. **Final Deploy:**
   - [ ] Alle Fixes zusammen committen
   - [ ] Cache-Version updaten (v37)
   - [ ] Push zu GitHub

---

**Notizen:**
- Alles wurde bereits mit Primary Blau (#50b8e7) gebrandedt
- Mobile Erste Optimierungen durchgeführt
- Button Größen erhöht
- App Icon SVG sauber integriert
- Form Inputs konsistent optimiert

