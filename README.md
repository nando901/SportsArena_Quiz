# DOCUMENTACIO TECNICA: THE SPORTS ARENA

## 1. Descripcio General del Projecte
The Sports Arena es una plataforma web de qüestionaris interactius amb un enfocament tecnologic i esportiu. El projecte utilitza una arquitectura modular de pagines independents per optimitzar la gestio de la memoria i facilitar el manteniment del codi font. La interficie s'ha dissenyat sota un concepte de futurisme minimista, prioritzant la llegibilitat i l'estetica "Glassmorphism".

## 2. Desenvolupament de la Interficie (CSS)
El disseny visual s'articula mitjançant un full d'estils mestre que defineix la identitat corporativa del joc:

* **Tipografia:** Implementacio de la font 'Orbitron' per a elements de titol i 'Inter' per a cossos de text, garantint un contrast entre el disseny tecnologic i l'ergonomia de lectura.
* **Component de Targeta (Glass-card):** Aplicacio de filtres de desenfocament de fons (backdrop-filter: blur) i fons semitransparents per simular profunditat visual.
* **Efectes de Neó:** Us d'ombres de text (text-shadow) i de caixa (box-shadow) en tons cian (#00f2ff) per ressaltar els elements interactius i la puntuacio final.
* **Maquetacio: Desplegament de sistemes CSS Grid per a la seleccio de categories i Flexbox per al centrat de l'envoltori principal en el viewport.**

## 3. Arquitectura del Sistema
El programari es divideix en quatre fitxers estructurals per segmentar les fases de l'experiencia:

1. **index.html:** Punt d'entrada per a la captura de dades de l'usuari (Input handler).
2. **seleccio.html:** Interficie de triatge de categories amb graella dinamica.
3. **joc.html:** Entorn d'execucio del qüestionari i gestio del temps.
4. **resultats.html:** Pantalla de tancament i visualitzacio de la puntuacio final.

## 4. Logica i Algorismia
La capa de logica (JavaScript) opera de manera asincrona i gestiona els següents processos:

* **Seleccio Aleatoria:** Implementacio de l'algorisme de barreja Fisher-Yates per garantir que les 6 preguntes seleccionades per partida siguin totalment aleatories d'entre el banc de dades total.
* **Transferencia d'Estat:** Empleament de l'API localStorage per a la persistencia del nom de l'usuari i el recompte d'encerts entre els canvis de ruta HTML.
* **Temporitzacio:** Control de flux mitjançant un temporitzador de 15 segons que finalitza la pregunta de manera automatica si no es detecta entrada per part de l'usuari.

## 5. Requisits i Compatibilitat
L'aplicacio ha estat optimitzada per a navegadors moderns amb suport per a propietats de CSS3 avançades i JavaScript ES6+. No requereix llibreries externes (Vanilla Stack), assegurant una carrega instantania i una execucio eficient en el costat del client.

---
**PROJECTE THE SPORTS ARENA - 2024**