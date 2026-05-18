# PROJECT.md — Svadobný web Veronika & Matúš

> Tento súbor je **kontextový dokument pre AI agentov** (a ľudí), ktorí prichádzajú do projektu bez histórie. Obsahuje to, čo nie je možné odvodiť priamo z kódu — zámery, dohody, kontakty, termíny a pravidlá pre vlastnú údržbu.

---

## 1. O projekte

Statická HTML webstránka — svadobná pozvánka pre hostí svadby **Veroniky a Matúša**.

- **Termín svadby:** sobota **29. 8. 2026**, obrad o **15:00**
- **Miesto:** Statek Opajda · Horní Rožínka 4 · 592 51 Dolní Rožínka · Kraj Vysočina, ČR
- **Jazyky webu:** **slovenčina (primárny)** a **čeština (sekundárny)**. Východiskový jazyk pri prvom načítaní je SK. Preferencia sa ukladá do `localStorage` pod kľúčom `lang`.
- **Jazyk pre komunikáciu s ľudským vývojárom:** slovenčina

### Cieľ webu
Hostia majú na jednom mieste nájsť všetko potrebné: kde a kedy to je, ako sa tam dostať, kde prespať, čo si obliecť, ako potvrdiť účasť (RSVP).

---

## 2. Technický stack

- **Čistý statický web** — žiadny build, žiadny framework, žiadne `node_modules`.
- HTML 5 + CSS 3 + jeden `assets/script.js` (vanilla JS).
- **Google Fonts:** Cormorant Garamond (nadpisy) + Inter (telo).
- **Externé služby:**
  - Google Forms (RSVP formulár) — viď [Sekcia 5](#5-externé-služby--placeholdery).
  - Google Maps embed (mapa miesta).
- **Hosting:** zatiaľ neuvedené (web sa otvára priamo cez `index.html` alebo cez ľubovoľný statický hosting — GitHub Pages, Netlify a pod.).

### Ako spustiť lokálne
Stačí otvoriť `index.html` v prehliadači, alebo:
```powershell
# voliteľne pre lepšiu kontrolu fontov a relatívnych ciest
python -m http.server 8000
# potom http://localhost:8000
```

---

## 3. Štruktúra súborov

```
wedding20260829/
├── index.html        # Domovská stránka — hero, countdown, prehľad sekcií
├── miesto.html       # Statek Opajda — popis, adresa, galéria
├── program.html      # Časový plán dňa (12:30 → 02:00)
├── doprava.html      # Mapa, ako sa dostať, ubytovanie
├── prakticke.html     # Dress code, darčeky, galéria, FAQ
├── rsvp.html         # Odkaz na Google Forms + zoznam otázok + kontakty
├── assets/
│   ├── style.css     # Všetky štýly, CSS premenné na začiatku (paleta)
│   └── script.js     # Mobilné menu, countdown, fade-in pri scrollovaní
└── Opajda_files/     # Fotografie miesta (webp) — © opajda.cz
    ├── Opajda_files/
    ├── Krcma_files/
    ├── Pokoje_files/
    ├── Statek_files/
    ├── svatby_files/
    └── ikony/
```

### Spoločné prvky všetkých HTML stránok
Každá stránka má **rovnakú navigáciu** (`<nav class="nav">`) a **rovnakú pätu** (`<footer>`). Pri zmene v jednej stránke (napr. pridanie novej sekcie do navigácie) musíš zmenu **premietnuť do všetkých 6 HTML súborov**.

Aktívny odkaz v navigácii sa vyznačuje cez `class="active"` — každá stránka má `active` len pri svojom odkaze.

### Prepínač jazyka v navigácii
V navigácii je `<div class="lang-switch">` s dvomi `<button class="lang-btn">` — inline SVG vlajočky:
- **SK** — biela/modrá/červená vodorovne **+ štátny znak SR** (červený štít, modré trojvršie, biely dvojkríž). Pásy bez znaku = nie je vlajka SR.
- **CZ** — biela/červená vodorovne + modrý trojuholník z hoist strany.

Aktívny jazyk má `class="active"` a `aria-pressed="true"`. Logiku prepínania má `assets/script.js`.

---

## 4. Kľúčové údaje (zatiaľ platné)

| Údaj | Hodnota | Kde sa objavuje |
|---|---|---|
| Mená | Veronika & Matúš | všade — nav, hero, footer, title |
| Dátum | 29. 8. 2026 (sobota) | všade |
| Čas obradu | 15:00 | `program.html`, countdown v `script.js` |
| Miesto | Statek Opajda, Horní Rožínka 4 | `miesto.html`, `doprava.html`, footer |
| RSVP deadline | **30. 6. 2026** | `index.html`, `rsvp.html` |
| Telefón nevesty | +420 775 335 536 (veronikavrbkova10@gmail.com) | `rsvp.html` |
| Telefón ženícha | +420 727 965 742 (hromadkam@gmail.com) | `rsvp.html` |
| Cieľový čas countdownu | `2026-08-29T15:00:00+02:00` | `assets/script.js` riadok ~20 |

---

## 5. Externé služby / placeholdery

Tieto miesta **čakajú na finálne hodnoty od nevesty/ženícha**:

1. **Google Forms URL pre RSVP**
   - Súbor: `rsvp.html`, riadok ~47
   - Placeholder: `https://forms.gle/VASE_URL_TU`
   - Treba: vytvoriť formulár na <https://forms.google.com> podľa otázok zo sekcie *„Na čo sa budeme pýtať"* v `rsvp.html` a vložiť skutočný odkaz.

2. **Hosting** — zatiaľ nie je doménový pôvod. Pri nasadení skontroluj relatívne cesty k obrázkom (`Opajda_files/...`) a fontom.

---

## 6. Dizajn / paleta

CSS premenné v `assets/style.css` (`:root`):

- `--bg: #FAF6E7` (krémová)
- `--accent-1: #C7B458` (slnečná žltá)
- `--accent-2: #6B8E4E` (lúčna zeleň)
- `--text: #3D3225` (hnedá)
- Fonty: `Cormorant Garamond` (nadpisy, kurzíva pre `&`), `Inter` (telo)

Štýl: prírodný, „lúka + slnko", letná svadba na statku. Vyhýbať sa formálnym/plesovým prvkom.

---

## 7. Pravidlá pre úpravy (čítaj predtým, než niečo zmeníš)

1. **Zachovaj konzistentnosť naprieč stránkami.** Navigácia, pätka, fonty a `<link rel="stylesheet">` musia byť identické. Pri zmene v jednej stránke premietni do všetkých.
2. **🌐 DVOJJAZYČNOSŤ JE POVINNÁ.** Web má SK aj CZ verziu. **Každý nový text musí byť pridaný v oboch jazykoch** — viď [Sekcia 8: i18n workflow](#8-i18n-workflow--dvojjazyčné-texty).
3. **Slovenčina je primárny jazyk.** HTML súbor má `<html lang="sk">`, viditeľný (default) text v HTML je slovenský. Český preklad je v `data-cs` atribútoch.
4. **Žiadny build krok.** Neinštaluj `npm`/`webpack`/Tailwind atď. Projekt je úmyselne statický.
5. **Obrázky** ukladaj do `Opajda_files/` (existujúca štruktúra) alebo vytvor novú podsložku. Preferuj `.webp`.
6. **Kredity fotografií** — fotky sú © `opajda.cz`. Pri pridávaní galérií nezabudni zachovať atribúciu (vidno v `miesto.html` a `prakticke.html`).
7. **Žiadne emoji v kóde, len v UI** kde sú zámerne (ikony v `info-block h3 .icon`).
8. **Komentáre v kóde** — minimum, len ak je dôvod „prečo" nezrejmý.
9. **Citlivé údaje** — telefónne čísla a e-maily sú zámerne uvedené v `rsvp.html` (svadobní hostia). Necommituj iné súkromné údaje (interné poznámky, finančné info, zoznamy hostí s adresami).

---

## 8. i18n workflow — dvojjazyčné texty

**Web je SK + CZ. Každý nový alebo zmenený text musí mať obe verzie. Bez výnimky.**

### Ako funguje prepínanie

- HTML obsahuje **default text v slovenčine** (kvôli `lang="sk"` a aby SK návštevník nevidel žiadny „flash" pri načítaní).
- Slovenský aj český preklad je v `data-*` atribútoch na tom istom elemente:
  - `data-sk="..."` a `data-cs="..."` — pre **čistý text** (JS nastaví `textContent`).
  - `data-sk-html="..."` a `data-cs-html="..."` — pre **HTML obsah** (`<strong>`, `<br>`, `<a>`, …); JS nastaví `innerHTML`. **Vnútorné úvodzovky musia byť escapované cez `&quot;`** (HTML atribút).
- Pre `<title>` a `<meta name="description">` použi `data-sk` / `data-cs` — JS to vie spraviť cez `document.title` / `setAttribute('content', …)`.

### Určenie počiatočného jazyka (priorita)

Pri načítaní stránky JS určí jazyk v tomto poradí:

1. **URL parameter** — `?lang=sk`, `?lang=cs`, alebo skrátene `?l=sk`, `?l=cs`. Najvyššia priorita.
2. **localStorage** — uložený jazyk z predchádzajúcej návštevy (kľúč `lang`).
3. **Default** — `sk`.

Vybraný jazyk sa **vždy uloží do `localStorage`**, takže ak hosť otvorí stránku cez QR (`?lang=cs`) a potom prejde na inú podstránku bez parametra, jazyk pretrvá. Klik na vlajočku v navigácii tiež uloží voľbu do `localStorage`.

### QR kódy pre svadobné pozvánky

Pripravte si **dva varianty** QR kódu — jeden pre slovenských hostí, jeden pre českých:

| Verzia pozvánky | URL pre QR generátor |
|---|---|
| Slovenská | `https://<vasa-domena>/?lang=sk` (alebo `?l=sk`) |
| Česká     | `https://<vasa-domena>/?lang=cs` (alebo `?l=cs`) |

**Tip pre kratšie QR kódy:** používaj `?l=sk` / `?l=cs` — kratšia URL = jednoduchší QR kód = lepšia čitateľnosť na papieri pri menšej veľkosti.

### Príklady

**Jednoduchý text:**
```html
<h2 data-sk="Berieme sa." data-cs="Bereme se.">Berieme sa.</h2>
```

**Text s HTML vnútri (`<strong>`, `<br>`):**
```html
<p data-sk-html="Potvrďte účasť do <strong>30. júna 2026</strong>."
   data-cs-html="Potvrďte účast do <strong>30. června 2026</strong>.">
  Potvrďte účasť do <strong>30. júna 2026</strong>.
</p>
```

**Text s odkazom (úvodzovky cez `&quot;`):**
```html
<p data-sk-html="Pozri <a href=&quot;https://idos.cz&quot;>IDOS.cz</a>."
   data-cs-html="Podívej se na <a href=&quot;https://idos.cz&quot;>IDOS.cz</a>.">
  Pozri <a href="https://idos.cz">IDOS.cz</a>.
</p>
```

**Title a meta:**
```html
<title data-sk="Program — Svadba" data-cs="Program — Svatba">Program — Svadba</title>
<meta name="description"
      data-sk="Pozvánka na svadbu."
      data-cs="Pozvánka na svatbu."
      content="Pozvánka na svadbu.">
```

### Checklist pri pridávaní/zmene textu

- [ ] Element má `data-sk` ALEBO `data-sk-html` (podľa toho, či obsahuje HTML).
- [ ] Element má aj zodpovedajúci `data-cs` / `data-cs-html`.
- [ ] Default text v elemente je **slovenský** (rovnaký ako `data-sk`).
- [ ] Ak je to nadpis stránky alebo meta, je aj `<title>` a `<meta name="description">` dvojjazyčné.
- [ ] Test: v prehliadači klikni na CZ vlajočku — zmení sa všetko? Reload — preferencia ostane?
- [ ] Test: localStorage.clear() v dev tools, reload — vidím SK (default)?

### Čo NIE JE potrebné prekladať

- Vlastné mená, dátumy ako `29 · 08 · 2026`, telefónne čísla, e-maily, adresy (Statek Opajda, Horní Rožínka 4 atď.).
- Emoji ikony (`🚗`, `🛏`).
- Kódové bloky, `<code>`.
- Ak chceš mať istotu, daj `data-sk` aj `data-cs` s rovnakou hodnotou — engine to bezpečne zvládne.

### Keby si chcel pridať 3. jazyk (napr. EN)

1. V `assets/script.js` doplň `'en'` do poľa `SUPPORTED`.
2. V navigácii každej stránky pridaj `<button class="lang-btn" data-lang="en">…</button>` s vlajočkou.
3. Ku každému `data-sk` doplň `data-en="..."`; ku každému `data-sk-html` doplň `data-en-html="..."`.

---

## 9. 🔄 Auto-update tohto súboru (DÔLEŽITÉ pre AI agentov)

**Keď meníš projekt, zároveň aktualizuj `PROJECT.md`, aby zostal pravdivý.** Konkrétne:

### Kedy MUSÍŠ tento súbor upraviť:

| Zmena v projekte | Čo aktualizovať v `PROJECT.md` |
|---|---|
| Zmena dátumu / času svadby / miesta | Sekcia 4 (Kľúčové údaje) + skontroluj countdown v `script.js` |
| Zmena kontaktov (telefón, e-mail) | Sekcia 4 |
| Zmena RSVP deadline | Sekcia 4 |
| Doplnenie Google Forms URL | Sekcia 5 — označ ako vybavené (alebo zmaž z placeholderov) |
| Pridanie / odobranie HTML stránky | Sekcia 3 (Štruktúra súborov) + skontroluj, či je v navigácii vo všetkých stránkach |
| Pridanie novej externej služby (analytics, mail provider, hosting…) | Sekcia 2 (Technický stack) + Sekcia 5 |
| Zmena palety farieb / fontov | Sekcia 6 |
| Nasadenie na hosting + doména | Sekcia 2 — dopíš URL a hosting provider |
| Zmena štruktúry priečinkov / premenovanie zložky obrázkov | Sekcia 3 |
| Nová dohoda s nevestou/ženíchom o postupe (napr. „obrázky vždy zmenši pred commitom") | Sekcia 7 (Pravidlá pre úpravy) |
| Pridanie ďalšieho jazyka (EN, DE…) | Sekcia 1 + Sekcia 8 (doplň návod) + Sekcia 2 |
| Pridanie nového textu / sekcie / stránky | **POVINNÉ:** texty v SK aj CZ podľa pravidiel v Sekcii 8 |
| Zmena prekladového kľúča / atribútu (`data-sk`, `data-cs`…) | Sekcia 8 — uprav príklady aj checklist |

### Ako aktualizovať:

1. **Najprv** sprav samotnú zmenu v kóde / obsahu.
2. **Hneď potom** v tej istej úprave (commit-e) doplň/oprav príslušnú sekciu v `PROJECT.md`.
3. Ak pribudne **nový druh informácie**, ktorý sa nikde nevpíše, **pridaj novú sekciu** a v sekcii 9 doplň riadok do tabuľky.
4. Ak nejaká informácia **prestane platiť**, **vymaž ju** — neudržiavaj stálu históriu, súbor má byť pravdivý ku dnešnému dňu. Históriu drží `git log`.

### Čo do `PROJECT.md` **nepatrí**:

- Detaily, ktoré sú zrejmé z kódu (napr. „v `index.html` je `<h1>`")
- Bežná git/CI história (od toho je `git log`)
- Dočasné poznámky k aktuálnej úlohe (od toho je TODO/issue tracker)
- Zoznam hostí, finančné údaje, súkromné správy

---

## 10. Kontakt na majiteľov projektu

- **Nevesta:** Veronika — +420 775 335 536, veronikavrbkova10@gmail.com
- **Ženích:** Matúš — +420 727 965 742, hromadkam@gmail.com (technický kontakt pre web)

---

*Posledná aktualizácia tohto súboru: 2026-05-18 — pridaná dvojjazyčnosť SK/CZ (Sekcia 8), posunutý čas obradu na 15:00.*
*Pri každej zmene v projekte aktualizuj aj tento dátum.*
