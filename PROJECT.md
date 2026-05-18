# PROJECT.md — Svadobný web Veronika & Matúš

> Tento súbor je **kontextový dokument pre AI agentov** (a ľudí), ktorí prichádzajú do projektu bez histórie. Obsahuje to, čo nie je možné odvodiť priamo z kódu — zámery, dohody, kontakty, termíny a pravidlá pre vlastnú údržbu.

---

## 1. O projekte

Statická HTML webstránka — svadobná pozvánka pre hostí svadby **Veroniky a Matúša**.

- **Termín svadby:** sobota **29. 8. 2026**, obrad o **13:30**
- **Miesto:** Statek Opajda · Horní Rožínka 4 · 592 51 Dolní Rožínka · Kraj Vysočina, ČR
- **Jazyk webu:** slovenčina (`<html lang="sk">`)
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
├── praktike.html     # Dress code, darčeky, galéria, FAQ
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

---

## 4. Kľúčové údaje (zatiaľ platné)

| Údaj | Hodnota | Kde sa objavuje |
|---|---|---|
| Mená | Veronika & Matúš | všade — nav, hero, footer, title |
| Dátum | 29. 8. 2026 (sobota) | všade |
| Čas obradu | 13:30 | `program.html`, countdown v `script.js` |
| Miesto | Statek Opajda, Horní Rožínka 4 | `miesto.html`, `doprava.html`, footer |
| RSVP deadline | **30. 6. 2026** | `index.html`, `rsvp.html` |
| Telefón nevesty | +420 775 335 536 (veronikavrbkova10@gmail.com) | `rsvp.html` |
| Telefón ženícha | +420 727 965 742 (hromadkam@gmail.com) | `rsvp.html` |
| Cieľový čas countdownu | `2026-08-29T13:00:00+02:00` | `assets/script.js` riadok ~20 |

> ⚠️ **Pozn.:** `style.css` má v hlavičke komentár `SVADBA ANNA & TOMÁŠ` — to je staré z templatu, **mená sú už správne všade inde**. Pokojne to oprav, ak ideš ten súbor meniť.

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
2. **Slovenčina.** Texty pre hostí píš v slovenčine (web má `lang="sk"`).
3. **Žiadny build krok.** Neinštaluj `npm`/`webpack`/Tailwind atď. Projekt je úmyselne statický.
4. **Obrázky** ukladaj do `Opajda_files/` (existujúca štruktúra) alebo vytvor novú podsložku. Preferuj `.webp`.
5. **Kredity fotografií** — fotky sú © `opajda.cz`. Pri pridávaní galérií nezabudni zachovať atribúciu (vidno v `miesto.html` a `praktike.html`).
6. **Žiadne emoji v kóde, len v UI** kde sú zámerne (ikony v `info-block h3 .icon`).
7. **Komentáre v kóde** — minimum, len ak je dôvod „prečo" nezrejmý.
8. **Citlivé údaje** — telefónne čísla a e-maily sú zámerne uvedené v `rsvp.html` (svadobní hostia). Necommituj iné súkromné údaje (interné poznámky, finančné info, zoznamy hostí s adresami).

---

## 8. 🔄 Auto-update tohto súboru (DÔLEŽITÉ pre AI agentov)

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
| Pridanie ďalšieho jazyka (CZ verzia a pod.) | Sekcia 1 + Sekcia 3 |

### Ako aktualizovať:

1. **Najprv** sprav samotnú zmenu v kóde / obsahu.
2. **Hneď potom** v tej istej úprave (commit-e) doplň/oprav príslušnú sekciu v `PROJECT.md`.
3. Ak pribudne **nový druh informácie**, ktorý sa nikde nevpíše, **pridaj novú sekciu** a v sekcii 8 doplň riadok do tabuľky.
4. Ak nejaká informácia **prestane platiť**, **vymaž ju** — neudržiavaj stálu históriu, súbor má byť pravdivý ku dnešnému dňu. Históriu drží `git log`.

### Čo do `PROJECT.md` **nepatrí**:

- Detaily, ktoré sú zrejmé z kódu (napr. „v `index.html` je `<h1>`")
- Bežná git/CI história (od toho je `git log`)
- Dočasné poznámky k aktuálnej úlohe (od toho je TODO/issue tracker)
- Zoznam hostí, finančné údaje, súkromné správy

---

## 9. Kontakt na majiteľov projektu

- **Nevesta:** Veronika — +420 775 335 536, veronikavrbkova10@gmail.com
- **Ženích:** Matúš — +420 727 965 742, hromadkam@gmail.com (technický kontakt pre web)

---

*Posledná aktualizácia tohto súboru: 2026-05-18.*
*Pri každej zmene v projekte aktualizuj aj tento dátum.*
