/**
 * ═══════════════════════════════════════════
 * app.js — Moteur du template restaurant
 * Charge config.json et peuple tout le site
 * ═══════════════════════════════════════════
 */

(async function () {
  // ─── Chargement de la config ───────────────
  let config;
  try {
    const res = await fetch("config.json");
    config = await res.json();
  } catch (e) {
    console.error("Impossible de charger config.json :", e);
    return;
  }

  const { restaurant, localisation, horaires, menu, seo, design, photos, reseaux_sociaux, avis } = config;

  // ─── Appliquer les variables CSS (couleurs/fonts) ───
  appliqueCSSVariables(design);

  // ─── SEO ───────────────────────────────────
  appliqueSEO(seo, restaurant, localisation);

  // ─── Schema JSON-LD LocalBusiness ──────────
  injecteSchema(restaurant, localisation, horaires, seo, avis);

  // ─── Navigation ────────────────────────────
  peuple("nav-nom", restaurant.nom);
  peuple("nav-tel", `☎ ${localisation.telephone_affiche}`, "href", `tel:${localisation.telephone.replace(/\s/g,"")}`);

  // ─── Hero ───────────────────────────────────
  peuple("hero-type", restaurant.type);
  peuple("hero-nom", restaurant.nom);
  peuple("hero-slogan", restaurant.slogan);
  peuple("hero-localisation", `📍 ${localisation.quartier}, ${localisation.ville}`);
  setHref("hero-tel", `tel:${localisation.telephone.replace(/\s/g,"")}`);
  setHref("hero-itineraire", localisation.google_maps_lien);
  setHref("sticky-tel", `tel:${localisation.telephone.replace(/\s/g,"")}`);
  setHref("sticky-itineraire", localisation.google_maps_lien);

  if (design.hero_image) {
    const heroBg = document.getElementById("hero-bg");
    if (heroBg) heroBg.style.backgroundImage = `url('${design.hero_image}')`;
  }

  // Badge ouvert/fermé
  metsAJourStatutOuverture(horaires);

  // ─── Intro ──────────────────────────────────
  document.getElementById("intro-titre").innerHTML =
    `Restaurant à ${localisation.ville},<br />dans le cœur du <em>${localisation.quartier}</em>`;
  peuple("intro-desc", restaurant.description_courte);
  peuple("stat-avis-note", avis.google_rating);
  peuple("stat-avis-nb", avis.nombre_avis);
  peuple("info-adresse-texte", `${localisation.adresse}, ${localisation.code_postal} ${localisation.ville}`);
  peuple("info-tel-lien", localisation.telephone_affiche);
  document.getElementById("info-tel-lien").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;
  peuple("info-horaires-resume", resumeHoraires(horaires));
  peuple("info-acces", `${localisation.quartier}, proche ${localisation.lieux_proches.slice(0,2).join(" & ")}`);

  // ─── Menu ───────────────────────────────────
  construitMenu(menu);
  peuple("menu-tel-nb", localisation.telephone_affiche);
  document.getElementById("menu-tel-btn").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;

  // ─── À propos ───────────────────────────────
  peuple("apropos-histoire", restaurant.histoire);
  peuple("apropos-long", restaurant.description_longue);
  document.getElementById("apropos-tel").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;

  // ─── Témoignages ────────────────────────────
  construitTemoignages(avis.temoignages);

  // ─── Galerie ────────────────────────────────
  construitGalerie(photos);

  // ─── Contact ────────────────────────────────
  peuple("contact-nom-resto", restaurant.nom);
  peuple("contact-rue", localisation.adresse);
  peuple("contact-cp-ville", `${localisation.code_postal} ${localisation.ville}`);
  peuple("contact-quartier-info", `Quartier ${localisation.quartier}`);
  peuple("contact-tel", localisation.telephone_affiche);
  document.getElementById("contact-tel").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;
  document.getElementById("contact-btn-appel").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;
  document.getElementById("contact-itineraire").href = localisation.google_maps_lien;
  if (localisation.google_maps_embed) {
    document.getElementById("google-maps-iframe").src = localisation.google_maps_embed;
  }
  construitHoraires("horaires-liste", horaires, true);

  // ─── Footer ─────────────────────────────────
  peuple("footer-nom", restaurant.nom);
  peuple("footer-slogan", restaurant.slogan);
  peuple("footer-adresse", `${localisation.adresse}, ${localisation.code_postal} ${localisation.ville}`);
  peuple("footer-tel", localisation.telephone_affiche);
  document.getElementById("footer-tel").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;
  if (localisation.email) {
    peuple("footer-email", localisation.email);
    document.getElementById("footer-email").href = `mailto:${localisation.email}`;
  }
  peuple("footer-copyright", `© ${new Date().getFullYear()} ${restaurant.nom} · ${localisation.ville} · Tous droits réservés`);
  construitReseaux(reseaux_sociaux);
  construitHorairesMini();

  // ─── Nav tel ────────────────────────────────
  peuple("nav-tel", `☎ ${localisation.telephone_affiche}`);
  document.getElementById("nav-tel").href = `tel:${localisation.telephone.replace(/\s/g,"")}`;

  // ─── Interactions ────────────────────────────
  initNav();
  initLightbox();
  initScrollAnimations();


  /* ═══════════════════════════════════════════
     FONCTIONS UTILITAIRES
  ═══════════════════════════════════════════ */

  function peuple(id, texte, attr, val) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = texte;
    if (attr && val) el.setAttribute(attr, val);
  }

  function setHref(id, href) {
    const el = document.getElementById(id);
    if (el) el.href = href;
  }

  function appliqueCSSVariables(d) {
    const root = document.documentElement;
    if (d.couleur_principale) root.style.setProperty("--couleur-principale", d.couleur_principale);
    if (d.couleur_accent)     root.style.setProperty("--couleur-accent", d.couleur_accent);
    if (d.couleur_accent2)    root.style.setProperty("--couleur-accent2", d.couleur_accent2);
    if (d.couleur_texte)      root.style.setProperty("--couleur-texte", d.couleur_texte);
    if (d.couleur_fond)       root.style.setProperty("--couleur-fond", d.couleur_fond);
    if (d.couleur_fond2)      root.style.setProperty("--couleur-fond2", d.couleur_fond2);
    // Font Google Fonts dynamique
    if (d.font_titre) root.style.setProperty("--font-titre", `'${d.font_titre}', Georgia, serif`);
    if (d.font_corps) root.style.setProperty("--font-corps", `'${d.font_corps}', sans-serif`);
  }

  function appliqueSEO(s, r, l) {
    document.title = s.meta_titre;
    document.getElementById("meta-titre").textContent = s.meta_titre;
    document.getElementById("meta-description").content = s.meta_description;
    if (document.getElementById("meta-keywords")) document.getElementById("meta-keywords").content = s.mots_cles;
    document.getElementById("og-title").content = s.meta_titre;
    document.getElementById("og-description").content = s.meta_description;
  }

  function injecteSchema(r, l, h, s, a) {
    const jours = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
    const joursFR = { lundi:"Mo", mardi:"Tu", mercredi:"We", jeudi:"Th", vendredi:"Fr", samedi:"Sa", dimanche:"Su" };
    const openingHours = jours
      .filter(j => h[j] && h[j].ouvert)
      .map(j => {
        const plages = h[j].heures.split("/").map(p => p.trim());
        return plages.map(plage => {
          const m = plage.match(/(\d{2}h\d{2})\s*[–-]\s*(\d{2}h\d{2})/);
          if (!m) return null;
          const f = t => t.replace("h",":");
          return `${joursFR[j]} ${f(m[1])}-${f(m[2])}`;
        }).filter(Boolean);
      }).flat();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": r.nom,
      "description": r.description_courte,
      "url": window.location.origin,
      "telephone": l.telephone,
      "email": l.email || undefined,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": l.adresse,
        "addressLocality": l.ville,
        "postalCode": l.code_postal,
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": l.latitude,
        "longitude": l.longitude
      },
      "openingHours": openingHours,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": a.google_rating,
        "reviewCount": a.nombre_avis,
        "bestRating": "5"
      },
      "priceRange": "€€",
      "servesCuisine": "Française",
      "hasMap": l.google_maps_lien
    };
    document.getElementById("schema-jsonld").textContent = JSON.stringify(schema, null, 2);
  }

  function metsAJourStatutOuverture(h) {
    const badge = document.getElementById("hero-badge");
    const badgeTexte = document.getElementById("badge-texte");
    const dot = document.querySelector(".badge__dot");
    if (!badgeTexte) return;

    const maintenant = new Date();
    const jourIdx = maintenant.getDay(); // 0=dim, 1=lun...
    const jours = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
    const jourActuel = jours[jourIdx];
    const infos = h[jourActuel];

    if (!infos || !infos.ouvert) {
      badgeTexte.textContent = "Fermé aujourd'hui";
      if (dot) dot.classList.add("badge__dot--ferme");
      return;
    }

    // Vérifier si on est dans les plages horaires
    const heureActuelle = maintenant.getHours() * 60 + maintenant.getMinutes();
    const plages = infos.heures.split("/").map(p => p.trim());
    let ouvert = false;
    for (const plage of plages) {
      const m = plage.match(/(\d{2})h(\d{2})\s*[–-]\s*(\d{2})h(\d{2})/);
      if (m) {
        const debut = parseInt(m[1]) * 60 + parseInt(m[2]);
        const fin = parseInt(m[3]) * 60 + parseInt(m[4]);
        if (heureActuelle >= debut && heureActuelle < fin) { ouvert = true; break; }
      }
    }

    if (ouvert) {
      badgeTexte.textContent = "Ouvert maintenant";
    } else {
      badgeTexte.textContent = `Aujourd'hui : ${infos.heures}`;
      if (dot) dot.style.background = "#f59e0b";
    }
  }

  function resumeHoraires(h) {
    const ouvert = Object.entries(h).filter(([_, v]) => v.ouvert).map(([k]) => k);
    if (ouvert.length === 0) return "Fermé";
    const premierJour = capitalise(ouvert[0].substring(0,3));
    const dernierJour = capitalise(ouvert[ouvert.length-1].substring(0,3));
    return `${premierJour} – ${dernierJour} · 12h – 22h30`;
  }

  function construitMenu(menu) {
    const onglets = document.getElementById("menu-onglets");
    const contenu = document.getElementById("menu-contenu");
    if (!onglets || !contenu) return;

    menu.sections.forEach((section, idx) => {
      // Onglet
      const btn = document.createElement("button");
      btn.className = "menu__onglet" + (idx === 0 ? " actif" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
      btn.innerHTML = `${section.emoji} ${section.titre}`;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".menu__onglet").forEach(b => { b.classList.remove("actif"); b.setAttribute("aria-selected","false"); });
        btn.classList.add("actif");
        btn.setAttribute("aria-selected","true");
        affichePlats(section.plats, contenu);
      });
      onglets.appendChild(btn);
    });

    // Affiche la première section par défaut
    if (menu.sections.length > 0) affichePlats(menu.sections[0].plats, contenu);
  }

  function affichePlats(plats, conteneur) {
    conteneur.innerHTML = `
      <div class="menu__plats">
        ${plats.map(p => `
          <article class="plat-card">
            <div class="plat-card__info">
              <h3 class="plat-card__nom">${p.nom}</h3>
              <p class="plat-card__desc">${p.description}</p>
            </div>
            <span class="plat-card__prix">${p.prix}</span>
          </article>
        `).join("")}
      </div>`;
  }

  function construitTemoignages(temoignages) {
    const grille = document.getElementById("temoignages-grille");
    if (!grille) return;
    grille.innerHTML = temoignages.map(t => `
      <article class="temoignage-card fade-up">
        <div class="temoignage__etoiles">${"★".repeat(t.note)}${"☆".repeat(5-t.note)}</div>
        <p class="temoignage__texte">${t.texte}</p>
        <p class="temoignage__auteur">— ${t.auteur}</p>
      </article>
    `).join("");
  }

  function construitGalerie(photos) {
    const grille = document.getElementById("galerie-grille");
    if (!grille) return;
    grille.innerHTML = photos.map((p, i) => `
      <div class="galerie__item" data-index="${i}" role="button" tabindex="0" aria-label="Agrandir : ${p.alt}">
        <img src="${p.src}" alt="${p.alt}" loading="lazy" width="600" height="400"
             onerror="this.parentElement.style.background='var(--couleur-fond2)'; this.style.display='none';" />
        <div class="galerie__item__overlay">
          <span class="galerie__item__overlay-icon" aria-hidden="true">🔍</span>
        </div>
      </div>
    `).join("");

    // Événements lightbox
    grille.querySelectorAll(".galerie__item").forEach(el => {
      el.addEventListener("click", () => ouvreLightbox(parseInt(el.dataset.index)));
      el.addEventListener("keydown", e => { if (e.key === "Enter") ouvreLightbox(parseInt(el.dataset.index)); });
    });
  }

  function construitHoraires(idListe, h, marquéAujourdhui = false) {
    const liste = document.getElementById(idListe);
    if (!liste) return;
    const jours = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
    const nomsJours = { lundi:"Lundi", mardi:"Mardi", mercredi:"Mercredi", jeudi:"Jeudi", vendredi:"Vendredi", samedi:"Samedi", dimanche:"Dimanche" };
    const jourActuel = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"][new Date().getDay()];

    liste.innerHTML = jours.map(j => {
      const info = h[j];
      const estAujourdhui = marquéAujourdhui && j === jourActuel;
      const classes = estAujourdhui ? "horaire__aujourd-hui" : "";
      return `
        <li class="${classes}">
          <span class="horaire__jour">${nomsJours[j]}${estAujourdhui ? " 📍" : ""}</span>
          <span class="${info && info.ouvert ? "horaire__heures" : "horaire__ferme"}">${info ? info.heures : "Fermé"}</span>
        </li>`;
    }).join("");
  }

  function construitReseaux(rs) {
    const conteneur = document.getElementById("footer-reseaux");
    if (!conteneur || !rs) return;
    const icones = {
      facebook: "f",
      instagram: "📷",
      tripadvisor: "🦉"
    };
    conteneur.innerHTML = Object.entries(rs)
      .filter(([_, url]) => url)
      .map(([nom, url]) => `
        <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${capitalise(nom)}">
          <span aria-hidden="true">${icones[nom] || "→"}</span>
        </a>
      `).join("");
  }

  function construitHorairesMini() {
    const el = document.getElementById("footer-horaires");
    if (!el) return;
    const jours = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
    const nomsCourtsFR = { lundi:"Lun", mardi:"Mar", mercredi:"Mer", jeudi:"Jeu", vendredi:"Ven", samedi:"Sam", dimanche:"Dim" };
    el.className = "footer__horaires-mini";
    el.innerHTML = jours.map(j => {
      const info = horaires[j];
      return `<div style="display:flex;justify-content:space-between;gap:1rem;">
        <span>${nomsCourtsFR[j]}</span>
        <span style="opacity:0.6">${info ? info.heures : "Fermé"}</span>
      </div>`;
    }).join("");
  }

  // ─── Lightbox ───────────────────────────────
  let lightboxIndex = 0;

  function ouvreLightbox(idx) {
    lightboxIndex = idx;
    const photo = photos[idx];
    document.getElementById("lightbox-img").src = photo.src;
    document.getElementById("lightbox-img").alt = photo.alt;
    document.getElementById("lightbox-caption").textContent = photo.alt;
    document.getElementById("lightbox").classList.add("open");
    document.getElementById("lightbox-overlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function fermeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.getElementById("lightbox-overlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  function initLightbox() {
    document.getElementById("lightbox-close").addEventListener("click", fermeLightbox);
    document.getElementById("lightbox-overlay").addEventListener("click", fermeLightbox);
    document.getElementById("lightbox-prev").addEventListener("click", () => {
      lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
      ouvreLightbox(lightboxIndex);
    });
    document.getElementById("lightbox-next").addEventListener("click", () => {
      lightboxIndex = (lightboxIndex + 1) % photos.length;
      ouvreLightbox(lightboxIndex);
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") fermeLightbox();
      if (e.key === "ArrowLeft") { lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length; ouvreLightbox(lightboxIndex); }
      if (e.key === "ArrowRight") { lightboxIndex = (lightboxIndex + 1) % photos.length; ouvreLightbox(lightboxIndex); }
    });
  }

  // ─── Navigation ─────────────────────────────
  function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("nav-burger");
    const links = document.getElementById("nav-links");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });

    burger.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    links.querySelectorAll("a[href^='#']").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // ─── Animations au scroll ───────────────────
  function initScrollAnimations() {
    // Ajoute la classe fade-up aux éléments cibles
    const cibles = document.querySelectorAll(
      ".info-card, .plat-card, .galerie__item, .contact__bloc, .valeur"
    );
    cibles.forEach(el => el.classList.add("fade-up"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
  }

  function capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

})();
