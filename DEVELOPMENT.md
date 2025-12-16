# Finanu Landing Page - Development Guide

## 🚀 Quick Start

### 1. Server starten
```bash
python -m http.server 8000
# oder in VS Code: Run Task > "Open Live Server"
```

Dann öffne: `http://localhost:8000`

---

## 📋 Quiz-Logik (Eligibility Check)

### Qualifizierungskriterien

Ein User qualifiziert sich, wenn:
1. ✅ Auto ist in der Schweiz zugelassen (Frage 1: Ja)
2. ✅ Hat eine Krankenversicherung (Frage 2: Beliebig)
3. ✅ Möchte 40 CHF sparen (Frage 3: Ja)

### Flow-Diagramm

```
Start
  ↓
Frage 1: Auto in CH?
  ├─ Nein → NOT ELIGIBLE
  └─ Ja ↓
Frage 2: Versicherer?
  ├─ Keine Auswahl → DISABLED (Next Button)
  └─ Auswahl ↓
Frage 3: Sparen wollen?
  ├─ Nein → NOT ELIGIBLE
  └─ Ja ↓
SUCCESS → Email Capture
```

---

## 🔧 Anpassungen & Erweiterungen

### 1. Quiz-Fragen ändern
**Datei:** `index.html`

Suche nach `<div class="question active" id="question1">` und bearbeite den HTML:

```html
<h2 class="question-title">Deine Frage hier?</h2>
<div class="question-options">
    <button class="option-btn" onclick="selectAnswer(1, 'answer')">
        Antwort
    </button>
</div>
```

### 2. Versicherer hinzufügen/entfernen
**Datei:** `index.html` → Frage 2 (Select Dropdown)

```html
<option value="neue-versicherer">Neue Versicherer</option>
```

### 3. Farben anpassen
**Datei:** `css/styles.css` → CSS Variables oben:

```css
:root {
    --primary-color: #1E3A8A;      /* Ändere diese Farben */
    --secondary-color: #10B981;
    --accent-color: #F59E0B;
}
```

---

## 🔗 Supabase Integration (WICHTIG!)

### 1. Supabase Projekt erstellen
1. Gehe zu https://supabase.com/dashboard
2. Klick "New Project"
3. Projektname: `finanu-landing`
4. Wähle Region: Europe (Schweiz/Zürich)
5. Speichere API Keys

### 2. Tabelle erstellen
In Supabase SQL Editor:

```sql
CREATE TABLE leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  insurance TEXT,
  car_registered BOOLEAN,
  wants_save BOOLEAN,
  vignette_eligibility_status TEXT DEFAULT 'Pending',
  vignette_code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. JavaScript Integration
In `js/app.js`, suche die Funktion `handleEmailCapture()`:

```javascript
// Uncomment und mit deinen Keys ersetzen:

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function handleEmailCapture(event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    try {
        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    name: userName,
                    email: userEmail,
                    insurance: quizState.answers[2],
                    car_registered: true,
                    wants_save: true,
                    vignette_eligibility_status: 'Pending'
                }
            ]);

        if (error) throw error;

        alert('✅ Lead gespeichert!');
    } catch (error) {
        console.error('Supabase Error:', error);
        alert('❌ Es gab einen Fehler.');
    }
}
```

---

## 🎣 Webhook Integration (Make/Zapier)

### 1. Make.com Szenario erstellen

1. Gehe zu make.com
2. Erstelle neues Szenario
3. Module: **Webhooks (Custom)** → **HTTP**

**Webhook URL** (von Make kopieren):
```
https://hook.make.com/YOUR_WEBHOOK_ID
```

4. Teste mit diesem JSON:
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "insurance": "CSS",
  "type": "welcome"
}
```

### 2. JavaScript in `app.js` anpassen

```javascript
const MAKE_WEBHOOK_URL = 'https://hook.make.com/YOUR_WEBHOOK_ID';

async function sendWelcomeEmail(userName, userEmail) {
    try {
        const response = await fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                type: 'welcome'
            })
        });

        if (!response.ok) throw new Error('Webhook failed');
        console.log('✅ Welcome Email versendet');
    } catch (error) {
        console.error('Webhook Error:', error);
    }
}
```

---

## 📊 Analytics Setup (Google Analytics)

Füge diesen Code in `index.html` vor `</head>` ein:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Events zu tracken:**
- `quiz_started` - Quiz begonnen
- `quiz_completed` - Quiz abgeschlossen
- `email_captured` - Email erfasst
- `not_eligible` - User nicht qualifiziert

Beispiel Event in `js/app.js`:
```javascript
gtag('event', 'quiz_started', {
    'timestamp': new Date().toISOString()
});
```

---

## 🧪 Testing Checkliste

- [ ] Quiz auf Desktop funktioniert
- [ ] Quiz auf Mobile funktioniert
- [ ] Alle 3 Fragen beantwortbar
- [ ] Progress Bar animiert richtig
- [ ] Back Button funktioniert
- [ ] Email Capture speichert Daten
- [ ] Webhook sendet Welcome Email
- [ ] Not Eligible Flow funktioniert
- [ ] Button Hover-Effekte arbeiten
- [ ] Animations smooth sind

---

## 🚀 Deployment

### 1. Vercel (Empfohlen)
```bash
npm install -g vercel
vercel --prod
```

### 2. GitHub Pages
1. Push zu GitHub
2. Settings → Pages
3. Branch: main, Folder: /
4. URL wird angezeigt

### 3. Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 📞 Troubleshooting

**Quiz startet nicht:**
- Überprüfe Browser Console (F12)
- Suche nach JavaScript Errors

**Email wird nicht gespeichert:**
- Überprüfe Supabase API Keys
- Überprüfe Tabelle Permissions (RLS)

**Webhook funktioniert nicht:**
- Teste Webhook URL in Postman
- Überprüfe Make.com Logs

**Styling ist kaputt:**
- Überprüfe CSS Variable Werte
- Clearer Browser Cache (Ctrl+Shift+R)

---

## 📚 Nützliche Links

- [Supabase Docs](https://supabase.com/docs)
- [Make.com Docs](https://www.make.com/en/help)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)

---

**Haben Sie Fragen?** Schauen Sie in die `README.md` oder öffnen Sie ein Issue.
