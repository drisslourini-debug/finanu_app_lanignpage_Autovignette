# Finanu Landing Page - Gratis Vignette Funnel

Eine moderne, interaktive Landing Page für Finanu mit einem 3-Schritte Eligibility Check Quiz nach dem "Jack Roberts Style" Funnel.

## 🎯 Features

### 1. **Hero Section**
- Ansprechender Call-to-Action
- Visuell angezeigter Sparvorteil (40 CHF/Jahr)
- Finanu Branding (Blau, Grün, Orange)

### 2. **Interaktives Quiz (Eligibility Check)**
Drei optimierte Fragen:
1. Ist dein Fahrzeug aktuell in der Schweiz zugelassen? (Ja/Nein)
2. Bei welcher Krankenversicherung bist du versichert? (Dropdown)
3. Möchtest du jedes Jahr 40 CHF für die Vignette sparen? (Ja/Nein)

**Features:**
- Progress Bar (33% → 66% → 100%)
- Frage-zu-Frage Navigation (Vor/Zurück)
- Validierung bei jedem Schritt
- Responsive Design (Mobile-First)

### 3. **Results / Success Screen**
Nach erfolgreicher Qualifizierung:
- Glückwunsch-Nachricht mit Animation
- Status "Reserviert für 24h"
- Email Capture Form (Name + Email)
- Integriert mit Supabase für Lead-Speicherung

### 4. **Not Eligible Screen**
Falls der User nicht qualifiziert (Auto nicht in CH):
- Erklärung warum
- Button zum Neustarten

### 5. **Gamification**
- Ladebalken für visuellen Fortschritt
- Emojis für Engagement
- Smooth Animations
- Motivierende Nachrichten

---

## 📁 Projektstruktur

```
finanu_app_lanignpage/
├── index.html              # Hauptseite
├── css/
│   └── styles.css          # Finanu-Branding Styles
├── js/
│   └── app.js              # Quiz-Logik
├── assets/
│   └── finanu-logo.svg     # Platzhalter für Logo
└── README.md               # Diese Datei
```

---

## 🎨 Finanu Branding

| Element | Farbe | Hex-Code |
|---------|-------|----------|
| Primär (Dunkelblau) | Vertrauen | `#1E3A8A` |
| Sekundär (Grün) | Erfolg | `#10B981` |
| Akzent (Orange) | CTA-Buttons | `#F59E0B` |
| Hintergrund | Hell | `#F8FAFC` |

---

## 🚀 Installation & Setup

### 1. Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Für Backend: Supabase Account

### 2. Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/drisslourini-debug/finanu_app_lanignpage_Autovignette.git

# In das Verzeichnis gehen
cd finanu_app_lanignpage

# Live Server starten (z.B. mit VS Code Extension)
# oder einfach index.html öffnen
```

### 3. Supabase Integration (Optional)

1. Supabase Projekt erstellen: https://supabase.com
2. Tabelle `leads` erstellen mit Spalten:
   ```sql
   CREATE TABLE leads (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     insurance TEXT,
     vignette_eligibility_status TEXT DEFAULT 'Pending',
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. API Keys in `js/app.js` eintragen:
   ```javascript
   const supabase = window.supabase.createClient(
     'YOUR_PROJECT_URL',
     'YOUR_ANON_KEY'
   );
   ```

---

## 🔌 Webhook Integration (Make/Zapier)

Nach dem Email-Capture kann ein Webhook an Make/Zapier gesendet werden:

**Trigger:** User registriert → Email hinzugefügt
**Action:** Welcome Email versenden

Beispiel Webhook URL in `js/app.js`:
```javascript
await fetch('YOUR_MAKE_WEBHOOK_URL', {
    method: 'POST',
    body: JSON.stringify({
        name: userName,
        email: userEmail,
        type: 'welcome'
    })
});
```

---

## 📊 Admin Dashboard (Backend)

Das Backend Admin Dashboard sollte folgende Features haben:

1. **Lead-Liste mit Status**
   - Pending Review
   - Validiert
   - Abgelehnt

2. **User-Details Modal**
   - Hochgeladene PDF/Fotos der Policen
   - Button: "Validieren" oder "Ablehnen"

3. **Automatisierung**
   - Bei "Validieren" → Vignetten-Code freigeschaltet
   - Push-Notification an User
   - Email mit Code

---

## 🎮 Quiz-Fragen (Optimiert)

### Frage 1: Fahrzeug-Zugelassenheit
```
"Ist dein Fahrzeug aktuell in der Schweiz zugelassen?"
- Ja ✓
- Nein ✗ → Not Eligible
```

### Frage 2: Krankenversicherung
```
"Bei welcher Krankenversicherung bist du aktuell versichert?"
- CSS
- Helsana
- Swica
- Groupe Mutuel
- Sanitas
- Sympany
- Andere
```

### Frage 3: Spar-Motivation
```
"Möchtest du jedes Jahr 40 CHF für die Autobahn-Vignette sparen?"
- Ja 💚 → Results Screen
- Nein ❌ → Not Eligible
```

---

## 🔄 User Journey

```
1. Hero Screen
   ↓
2. Start Quiz
   ↓
3. Question 1: Auto in CH?
   - Nein → Not Eligible Screen
   - Ja ↓
4. Question 2: Krankenversicherung?
   ↓
5. Question 3: Sparen wollen?
   - Nein → Not Eligible Screen
   - Ja ↓
6. Results Screen
   ↓
7. Email Capture
   ↓
8. Lead in Supabase gespeichert
   ↓
9. Webhook → Welcome Email
   ↓
10. App Download CTA
```

---

## ✅ Checkliste für Produktion

- [ ] Finanu Logo hochladen (Platzhalter ersetzen)
- [ ] Supabase Integration aktivieren
- [ ] Webhook URL für Make/Zapier hinzufügen
- [ ] Admin Dashboard entwickeln (Backend)
- [ ] Nurture Sequences aufsetzen (GoHighLevel/ActiveCampaign)
- [ ] GDPR Datenschutz implementieren
- [ ] Mobile Testing durchführen
- [ ] Performance optimieren (Lighthouse)
- [ ] Analytics hinzufügen (Google Analytics)

---

## 📱 Responsive Design

Die Landing Page ist optimiert für:
- **Desktop:** 1920px+
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px

---

## 🎓 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Custom CSS mit CSS Variables
- **Backend:** Supabase (PostgreSQL)
- **Webhooks:** Make/Zapier
- **Analytics:** Google Analytics (optional)

---

## 📝 Lizenz

© 2025 Finanu AG. Alle Rechte vorbehalten.

---

## 💡 Nächste Schritte

1. **Admin Dashboard entwickeln** - Für die Validierung der Policen
2. **Email Sequences aufsetzen** - Nurture Automation
3. **App Integration** - Login mit Email aus dem Quiz
4. **Analytics** - Tracking der Conversion Rate
5. **A/B Testing** - Quiz-Fragen optimieren

---

**Fragen?** Kontaktiere das Finanu Team oder öffne ein Issue auf GitHub.
