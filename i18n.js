// ===== SONADIVE: Language switcher (EN / FR) =====
// English lives in the markup; FR holds the French by key, written for French clients
// rather than translated line by line. Glossary: "rendez-vous" and "échange" for a
// consultation, "Business Intelligence", "ingénierie des données", "pipelines de données",
// "analyse de données", "tableau de bord", "attrition (churn)", "e-mail".
(function () {
  'use strict';

  const KEY = 'sonadive_lang';
  const FR = {
  "cta.book": "Prendre rendez-vous →",
  "svc.more": "En savoir plus →",
  "h.s0.h": "Déploiement EPM",
  "h.s0.p": "Mise en œuvre de Pigment et d’Anaplan",
  "h.s1.h": "Ingénierie des données",
  "h.s1.p": "Intégrations Snowflake, Databricks, Azure et outils de planification",
  "h.s2.h": "Business Intelligence",
  "h.s2.p": "Power BI et analyse de données à l’échelle de l’entreprise",
  "h.s3.h": "Stratégie et optimisation EPM",
  "h.s3.p": "Audit de modèles, feuilles de route et optimisation des performances",
  "h.s4.h": "Automatisation des processus",
  "h.s4.p": "Ingestion des données et flux financiers",
  "h.s5.h": "Support EPM à temps partagé",
  "h.s5.p": "Maintenance et évolution continues de vos modèles",
  "nav.skip": "Aller au contenu",
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.sol": "Solutions",
  "nav.m.epm": "EPM",
  "nav.m.da": "Analyse de données",
  "nav.m.bi": "Business Intelligence",
  "nav.m.de": "Ingénierie des données",
  "nav.m.ai": "IA et automatisation",
  "nav.m.gov": "Stratégie et gouvernance des données",
  "nav.ind": "Secteurs",
  "nav.con": "Contact",
  "hero.l1": "EPM et pipelines de données.",
  "hero.l2": "Changez d’échelle, plus vite.",
  "hero.l3": "Allez plus en profondeur.",
  "hero.eye": "EPM et architecture data moderne",
  "hero.sub": "Nous aidons les directions financières et opérationnelles à déployer Pigment, Anaplan et leurs socles de données cloud, sans les longs mois d’attente d’un cabinet traditionnel.",
  "hero.c1": "Prendre rendez-vous →",
  "hero.c2": "Découvrir notre écosystème →",
  "h.svc.l": "Nos services",
  "h.svc.h": "Des solutions data et EPM de bout en bout",
  "h.svc.p": "De l’architecture cloud au déploiement rapide de vos modèles, nous bâtissons des plateformes évolutives pour décider plus vite.",
  "h.tech": "Notre écosystème technologique intégré",
  "h.why.l": "Pourquoi Sonadive",
  "h.why.h": "Pourquoi partenaires et entreprises<br>construisent avec nous",
  "h.w0.h": "Des experts certifiés",
  "h.w0.p": "Des Solution Architects Pigment et Anaplan seniors et certifiés, directement affectés à votre projet.",
  "h.w1.h": "Une livraison accélérée",
  "h.w1.p": "Des déploiements agiles en 4 à 8 semaines, loin des calendriers à rallonge des grands cabinets.",
  "h.hold": "Maintenir",
  "h.w2.h": "Une intégration complète",
  "h.w2.p": "Nous concevons aussi bien le pipeline de données en amont que le modèle EPM en aval.",
  "h.w3.h": "Des formats d’accompagnement flexibles",
  "h.w3.p": "Du déploiement complet au support d’administration à temps partagé, jusqu’à la livraison en marque blanche.",
  "h.con.l": "Échangeons",
  "h.con.h": "Contactez-nous",
  "h.con.p": "Vous recherchez un expert Pigment certifié ou un architecte de pipelines de données ? Parlons-en.",
  "form.name": "Votre nom",
  "form.email": "Votre e-mail",
  "form.co": "Nom de votre entreprise",
  "form.ph": "Numéro de téléphone",
  "h.msg": "Votre message",
  "form.send": "Envoyer le message →",
  "h.ok": "Message envoyé. Nous revenons vers vous très rapidement.",
  "h.err": "Une erreur est survenue. Veuillez réessayer ou nous écrire directement.",
  "foot.i1": "Distribution",
  "foot.i2": "Services financiers",
  "foot.i3": "Santé",
  "foot.i4": "Industrie",
  "foot.i5": "Technologie",
  "foot.desc": "Un conseil en analyse de données qui transforme la complexité en clarté et aide les entreprises à croître grâce à la puissance de la donnée.",
  "foot.h1": "Entreprise",
  "foot.h2": "Services",
  "foot.h4": "Nous contacter",
  "foot.ph": "Votre e-mail",
  "foot.hint": "Recevez nos analyses dans votre boîte mail.",
  "foot.c": "© 2025 Sonadive Analytics. Tous droits réservés.",
  "foot.p": "Politique de confidentialité",
  "foot.t": "Conditions d’utilisation",
  "a.v0.h": "L’intégrité avant tout",
  "a.v0.p": "Nous livrons des évaluations honnêtes, même lorsqu’elles ne sont pas celles que l’on espérait entendre. La confiance est le socle de chaque mission.",
  "a.v1.h": "La rigueur des données",
  "a.v1.p": "L’exactitude est notre exigence. Chaque analyse est validée, chaque modèle testé, chaque recommandation étayée par des faits.",
  "a.v2.h": "Un véritable partenariat",
  "a.v2.p": "Nous ne sommes pas un prestataire, mais un partenaire. Nous travaillons au sein de vos équipes et vos résultats comptent autant pour nous que pour vous.",
  "a.v3.h": "Un impact mesurable",
  "a.v3.p": "Nous mesurons le succès en chiffres : revenus gagnés, coûts réduits, décisions accélérées. L’analyse de données doit produire des résultats concrets.",
  "a.hl0": "Des mises en œuvre Pigment et Anaplan rapides, en 4 à 8 semaines",
  "a.hl1": "Une intégration de bout en bout, des données brutes de l’entrepôt aux tableaux de bord de la direction",
  "a.hl2": "Des experts Pigment seniors certifiés et des ingénieurs data cloud",
  "a.c": "À propos",
  "a.e": "Notre histoire",
  "a.t": "Nous allons au fond des choses<br><span class=\"tone\">pour que vous avanciez plus vite</span>",
  "a.s": "Sonadive est né d’une mission claire : en finir avec les projets lents et surdimensionnés des cabinets traditionnels. Nous allons au cœur de votre architecture de données et déployons rapidement vos modèles EPM dans Pigment et Anaplan.",
  "a.w.l": "Qui sommes-nous",
  "a.w.h": "Un partenaire agile pour vos projets EPM et data cloud",
  "a.w.p": "Des directions financières d’ETI aux entreprises en forte croissance, nous associons pipelines de données cloud modernes (Snowflake, Databricks, Azure) et déploiement rapide de modèles Pigment et Anaplan.",
  "a.q": "« Analyse profonde.<br>Impact réel. »",
  "a.m.h": "Notre mission",
  "a.m.p": "Démocratiser l’analyse de données pour les entreprises de toutes tailles, en donnant à chaque organisation les outils, les analyses et les stratégies nécessaires pour rester compétitive dans un monde guidé par la donnée. Nous sommes convaincus que l’analytique doit être accessible, exploitable et porteuse d’impact.",
  "a.m.b": "Travaillons ensemble →",
  "a.v.l": "Nos valeurs",
  "a.v.h": "Ce qui guide chacune de nos actions",
  "a.v.p": "Nos valeurs ne sont pas affichées au mur : elles guident chaque analyse, chaque recommandation et chaque relation client.",
  "a.cta.b2": "Découvrir nos services",
  "a.cta.l": "Commençons",
  "a.cta.h": "Prêt à transformer vos données ?",
  "a.cta.p": "Parlons de vos enjeux data et de la façon dont Sonadive peut vous accompagner.",
  "a.cta.b": "Réserver un échange gratuit →",
  "s.get": "Démarrer →",
  "s.epm.f0": "Architecture de planification connectée (Anaplan, Pigment)",
  "s.epm.f1": "Modélisation financière, opérationnelle et des effectifs",
  "s.epm.f2": "Budgets pilotés par les inducteurs et prévisions glissantes",
  "s.epm.f3": "Migration et consolidation des systèmes existants",
  "s.epm.h": "EPM",
  "s.epm.p": "Faites de la planification financière, du budget et de la modélisation de scénarios un processus de prévision continu, en temps réel.",
  "s.analytics.f0": "Tableaux de bord de direction et opérationnels (Power BI, Tableau, Looker)",
  "s.analytics.f1": "Suivi automatisé des KPI, reporting et alertes en temps réel",
  "s.analytics.f2": "Portails d’analyse en libre-service pour les équipes métier",
  "s.analytics.f3": "Data storytelling, UI/UX et conception de visualisations",
  "s.analytics.h": "Analyse de données et Business Intelligence",
  "s.analytics.p": "Transformez des données complexes en tableaux de bord interactifs qui offrent aux décideurs une vision opérationnelle immédiate.",
  "s.engineering.f0": "Conception et orchestration de pipelines ETL/ELT",
  "s.engineering.f1": "Architecture d’entrepôts de données cloud (Snowflake, Databricks, BigQuery)",
  "s.engineering.f2": "Solutions data lakehouse et streaming en temps réel",
  "s.engineering.f3": "Intégrations API et optimisation des bases de données",
  "s.engineering.h": "Ingénierie des données et infrastructure",
  "s.engineering.p": "Bâtissez une infrastructure évolutive et à haut débit pour que les données de votre organisation restent toujours fiables.",
  "s.ai.f0": "Modélisation prédictive et pipelines de machine learning",
  "s.ai.f1": "Intégrations LLM, RAG et analyse de texte (NLP)",
  "s.ai.f2": "Automatisation des flux et traitement documentaire",
  "s.ai.f3": "Moteurs de recommandation et de scoring IA sur mesure",
  "s.ai.h": "IA et automatisation des processus",
  "s.ai.p": "Déployez des modèles de machine learning sur mesure et une automatisation intelligente pour supprimer les tâches manuelles.",
  "s.strategy.f0": "Stratégie data et feuille de route technique",
  "s.strategy.f1": "Cadres de gouvernance, sécurité et politiques de conformité",
  "s.strategy.f2": "Suivi de la qualité et catalogage des données",
  "s.strategy.f3": "Accompagnement des équipes et acculturation à la donnée",
  "s.strategy.h": "Stratégie et gouvernance des données",
  "s.strategy.p": "Installez une culture data mature, avec une gouvernance solide, une sécurité maîtrisée et des feuilles de route claires.",
  "s.managed.f0": "Mise en œuvre et déploiement de plateformes de bout en bout",
  "s.managed.f1": "Administration et support dédiés de vos plateformes",
  "s.managed.f2": "Optimisation des performances et audits",
  "s.managed.f3": "Développement de connecteurs et d’API sur mesure",
  "s.managed.h": "Mise en œuvre et services managés",
  "s.managed.p": "Un accompagnement sur tout le cycle de vie, de l’architecture initiale à la gestion continue de votre plateforme.",
  "s.p0.h": "Comprendre",
  "s.p0.p": "Nous auditons votre environnement de données et de planification, clarifions vos objectifs et identifions les leviers à fort impact.",
  "s.p1.h": "Concevoir",
  "s.p1.p": "Nous définissons la bonne solution : pipelines de données, modèles EPM, KPI et alignement de la stack technique.",
  "s.p2.h": "Construire",
  "s.p2.p": "Nous développons, testons et déployons en sprints agiles, avec des retours continus et une assurance qualité rigoureuse.",
  "s.p3.h": "Transmettre",
  "s.p3.p": "Nous vous remettons des systèmes entièrement documentés, avec formation sur mesure, support continu et gouvernance de la plateforme.",
  "s.c": "Services",
  "s.e": "Notre métier",
  "s.t": "Des solutions data et EPM<br><span class=\"tone\">de bout en bout</span>",
  "s.s": "De l’architecture des modèles financiers aux pipelines de données en production et à l’automatisation par l’IA, nous couvrons chaque couche de la stack data moderne.",
  "s.l": "Nos services",
  "s.h": "Six façons d’accélérer grâce à vos données",
  "s.p": "Une approche qui aligne finance, opérations et ingénierie, pour créer une valeur métier mesurable et pas seulement du code.",
  "s.pr.l": "Notre méthode",
  "s.pr.h": "Notre façon de travailler",
  "s.pr.p": "Une démarche structurée et collaborative, pensée pour créer de la valeur rapidement, par itérations.",
  "s.cta.l": "Prêt à démarrer",
  "s.cta.h": "Quelle solution pour votre architecture ?",
  "s.cta.p": "Échangeons sur votre environnement actuel, vos besoins de plateforme et votre stratégie data, le temps d’un court appel de découverte.",
  "s.cta.b": "Réserver un échange gratuit →",
  "i.retail.t0": "Segmentation client",
  "i.retail.t1": "Prévision de la demande",
  "i.retail.t2": "Prédiction de l’attrition",
  "i.retail.t3": "Analyse du panier",
  "i.retail.h": "Distribution et e-commerce",
  "i.retail.p": "Stimulez votre chiffre d’affaires grâce à la connaissance client, à la prévision de la demande, à l’optimisation des stocks et à l’analyse marketing personnalisée.",
  "i.financial.t0": "Risque de crédit",
  "i.financial.t1": "Détection de la fraude",
  "i.financial.t2": "Analyse de portefeuille",
  "i.financial.t3": "Reporting réglementaire",
  "i.financial.h": "Services financiers",
  "i.financial.p": "Renforcez vos modèles de risque, accélérez le reporting réglementaire, détectez la fraude en temps réel et affinez l’analyse des portefeuilles clients avec la précision de la donnée.",
  "i.healthcare.t0": "Analyse des parcours patients",
  "i.healthcare.t1": "Optimisation des ressources",
  "i.healthcare.t2": "Intelligence clinique",
  "i.healthcare.h": "Santé",
  "i.healthcare.p": "Éclairez les décisions cliniques, optimisez l’allocation des ressources, améliorez la prise en charge des patients et développez l’analyse de la santé des populations grâce à des plateformes de données intégrées.",
  "i.manufacturing.t0": "Maintenance prédictive",
  "i.manufacturing.t1": "Analyse du TRS",
  "i.manufacturing.t2": "Chaîne logistique",
  "i.manufacturing.h": "Industrie",
  "i.manufacturing.p": "Réduisez les arrêts, améliorez les rendements et fluidifiez votre chaîne logistique grâce à l’analyse opérationnelle en temps réel, à la maintenance prédictive et au suivi de la qualité.",
  "i.technology.t0": "Analyse produit",
  "i.technology.t1": "Optimisation des tunnels",
  "i.technology.t2": "Modélisation de l’attrition",
  "i.technology.h": "Technologie et SaaS",
  "i.technology.p": "Faites des données d’usage un moteur de croissance : optimisez vos tunnels, réduisez l’attrition (churn), comprenez vos utilisateurs et construisez une feuille de route produit éclairée par la donnée.",
  "i.realestate.t0": "Analyse de marché",
  "i.realestate.t1": "Vision du portefeuille",
  "i.realestate.t2": "Modèles de valorisation",
  "i.realestate.h": "Immobilier",
  "i.realestate.p": "Valorisez vos actifs avec précision, repérez les opportunités d’investissement, analysez les tendances du marché et optimisez la performance de votre portefeuille grâce à la donnée géolocalisée.",
  "i.c": "Secteurs",
  "i.e": "Nos secteurs d’intervention",
  "i.t": "Une expertise approfondie<br><span class=\"tone\">dans chaque secteur</span>",
  "i.s": "Nous ne connaissons pas seulement les données : nous connaissons votre secteur. Nos consultants apportent leur expertise métier à chaque mission.",
  "i.l": "Les secteurs que nous accompagnons",
  "i.h": "Des solutions data adaptées à chaque secteur",
  "i.p": "Chaque secteur a ses propres enjeux data. Nous mobilisons l’expertise adaptée pour y répondre.",
  "i.cta.l": "Votre secteur",
  "i.cta.h": "Votre secteur n’apparaît pas ici ?",
  "i.cta.p": "Nous intervenons dans de nombreux secteurs. Voyons ensemble comment notre approche s’applique à votre contexte.",
  "i.cta.b": "Engager la conversation →",
  "k.o0": "EPM",
  "k.o1": "Analyse de données",
  "k.o2": "Business Intelligence",
  "k.o3": "Ingénierie des données",
  "k.o4": "IA et automatisation",
  "k.o5": "Stratégie et gouvernance des données",
  "k.o6": "Je ne sais pas encore",
  "k.c": "Contact",
  "k.e": "Nous contacter",
  "k.t": "Engageons<br><span class=\"tone\">la conversation</span>",
  "k.s": "Un enjeu data ou un projet en tête ? Parlez-nous-en : nous vous répondons sous 24 heures, avec des conseils honnêtes et concrets.",
  "k.h": "Comment nous joindre",
  "k.r1": "E-mail",
  "k.r1a": "Envoyez-nous un message",
  "k.r1b": "Réponse sous 24 heures",
  "k.r2": "Appel de découverte",
  "k.r2a": "Réservez un appel gratuit de 30 minutes",
  "k.r2b": "Sans engagement",
  "k.r3": "Délai de réponse",
  "k.r3a": "Sous 24 heures, les jours ouvrés",
  "k.r4a": "Suivre Sonadive",
  "k.n": "Et ensuite ?",
  "k.n1": "Nous étudions votre message pour bien comprendre votre enjeu",
  "k.n2": "Sous 24 heures, nous vous transmettons nos premières pistes et les prochaines étapes",
  "k.n3": "Nous convenons d’un appel de découverte gratuit pour explorer le sujet ensemble",
  "k.f.h": "Écrivez-nous",
  "k.f.p": "Parlez-nous de votre projet : nous vous répondrons rapidement.",
  "k.sel": "Quel service vous intéresse ?",
  "k.msg": "Décrivez-nous votre enjeu data ou votre projet…",
  "k.ok": "Message envoyé. Nous revenons vers vous sous 24 heures.",
  "k.err": "Une erreur est survenue. Veuillez réessayer ou utiliser le formulaire ci-dessus."
};

  // Search and browser-tab text, by page
  const SEO = {
    index: ['Sonadive | Conseil en EPM et data : données, analyses, impact', 'Sonadive, cabinet de conseil en EPM et data, aide les entreprises à révéler la valeur de leurs données : Business Intelligence, analyse financière et IA.'],
    about: ['À propos | Sonadive, conseil en analyse de données', 'Découvrez la mission, les valeurs et l’équipe de Sonadive, cabinet de conseil en analyse de données et EPM.'],
    services: ['Services | Sonadive, solutions data et EPM de bout en bout', 'EPM, analyse de données, Business Intelligence, ingénierie des données, IA et automatisation, stratégie data : découvrez les services de Sonadive.'],
    industries: ['Secteurs | Sonadive, la donnée au service de chaque secteur', 'Sonadive accompagne la distribution, les services financiers, la santé, l’industrie et la technologie avec des solutions data adaptées à leurs enjeux.'],
    contact: ['Contact | Sonadive, réservez un échange gratuit', 'Contactez Sonadive pour réserver un échange gratuit sur vos enjeux data. Nous vous répondons sous 24 heures.']
  };

  // Labels read aloud by screen readers
  const ARIA = {
    'Company Name': 'Nom de votre entreprise', 'Language': 'Langue', 'Legal': 'Mentions légales', 'Main': 'Navigation principale',
    'Mobile': 'Navigation mobile', 'Newsletter email': 'E-mail pour la newsletter', 'Open menu': 'Ouvrir le menu', 'Phone Number': 'Numéro de téléphone',
    'Press and hold to open the vault': 'Maintenez appuyé pour ouvrir le coffre', 'Subscribe': 'S’abonner', 'What service are you interested in?': 'Quel service vous intéresse ?',
    'Your Email': 'Votre e-mail', 'Your Message': 'Votre message', 'Your Name': 'Votre nom', 'Your message': 'Votre message'
  };

  // French typography: no-break space before : ; ? ! % » and after «
  const typo = s => s.replace(/ ([:;?!%»])/g, ' $1').replace(/« /g, '« ');

  let lang = 'en';
  try { lang = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  const en = new WeakMap();
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const metaDesc = document.querySelector('meta[name="description"]');
  const enTitle = document.title;
  const enDesc = metaDesc ? metaDesc.content : '';

  function apply() {
    const fr = lang === 'fr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (!en.has(el)) en.set(el, el.innerHTML);
      const text = FR[el.dataset.i18n];
      el.innerHTML = fr && text ? typo(text) : en.get(el);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      if (!en.has(el)) en.set(el, el.placeholder);
      const text = FR[el.dataset.i18nPh];
      el.placeholder = fr && text ? typo(text) : en.get(el);
    });
    document.querySelectorAll('[aria-label]').forEach(el => {
      if (!el.dataset.ariaEn) el.dataset.ariaEn = el.getAttribute('aria-label');
      const text = ARIA[el.dataset.ariaEn];
      el.setAttribute('aria-label', fr && text ? typo(text) : el.dataset.ariaEn);
    });
    const seo = SEO[page];
    document.title = fr && seo ? typo(seo[0]) : enTitle;
    if (metaDesc) metaDesc.content = fr && seo ? typo(seo[1]) : enDesc;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-opt').forEach(btn => {
      const on = btn.dataset.lang === lang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  document.querySelectorAll('.lang-opt').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply();
    document.dispatchEvent(new Event('sd:lang'));
  }));
  apply();
})();
