# DOCUMENTACIÓ TÈCNICA: THE SPORTS ARENA

## 1. Descripció del Projecte
**The Sports Arena** és una experiència digital interactiva dissenyada per a entusiastes de l'esport que busquen posar a prova els seus coneixements en un entorn d'alt rendiment visual. El projecte consisteix en un ecosistema de qüestionaris dinàmics on l'usuari s'enfronta a reptes temàtics sota pressió temporal.

L'objectiu principal és oferir una plataforma on la competició i la tecnologia es fusionen. L'usuari tria la seva disciplina preferida i ha de respondre una sèrie de preguntes seleccionades aleatòriament, on la precisió i la velocitat determinaran la seva posició en el rànquing final de l'arena.

---

## 2. Desenvolupament de la Interfície (CSS)
La identitat visual del joc s'articula mitjançant un full d'estils mestre que defineix els següents pilars:

* **Tipografia:** Ús de la font 'Orbitron' per a títols (estètica tecnològica) i 'Inter' per als cossos de text (ergonomia de lectura).
* **Component de Targeta (Glass-card):** Implementació de fons semitransparents amb filtres de desenfocament (`backdrop-filter: blur`) per crear profunditat.
* **Efectes de Neó:** Aplicació d'ombres de text (`text-shadow`) i de caixa (`box-shadow`) en tons cian (#00f2ff) per destacar elements interactius.
* **Maquetació:** Ús combinat de **CSS Grid** per a la selecció de categories i **Flexbox** per al centratge de l'envoltori principal.

---

## 3. Arquitectura del Sistema
L'aplicació es divideix en quatre mòduls estructurals que segmenten l'experiència de l'usuari:

| Fitxer | Fase del Projecte | Descripció |
| :--- | :--- | :--- |
| `index.html` | Entrada | Captura de dades de l'usuari i gestió de l'entrada (Input handler). |
| `seleccio.html` | Triatge | Interfície de selecció de categories amb graella dinàmica. |
| `joc.html` | Execució | Entorn principal del qüestionari i gestió activa del temps. |
| `resultats.html` | Tancament | Visualització de la puntuació final i resum de la partida. |

---

## 4. Lògica i Algoritmia
La capa de programació (JavaScript) opera de manera asíncrona per gestionar els processos clau del joc:

* **Selecció Aleatòria:** Ús de l'algorisme de barreja **Fisher-Yates** per garantir que les 6 preguntes per partida siguin totalment aleatòries.
* **Transferència d'Estat:** Empleament de l'API `localStorage` per mantenir la persistència del nom de l'usuari i els acerts durant el canvi de pàgines.
* **Temporització:** Control de flux amb un temporitzador de 15 segons que finalitza la pregunta automàticament si no hi ha resposta.

---

## 5. Requisits i Compatibilitat
El programari està optimitzat per a navegadors moderns amb suport per a CSS3 avançat i JavaScript ES6+. Al tractar-se d'un **Vanilla Stack** (sense llibreries externes), l'aplicació garanteix una càrrega instantània i una execució altament eficient en el client.

---
**PROJECTE THE SPORTS ARENA - 2026**