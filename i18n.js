// ===== SONADIVE — Language Switcher (EN / FR) =====
(function () {
  'use strict';

  const KEY = 'sonadive_lang';
  let lang = localStorage.getItem(KEY) || 'en';

  // Detect current page
  const p = location.pathname;
  const page = p.includes('about') ? 'about'
    : p.includes('services') ? 'services'
    : p.includes('industries') ? 'industries'
    : p.includes('case-studies') ? 'casestudies'
    : p.includes('insights') ? 'insights'
    : p.includes('contact') ? 'contact'
    : 'home';

  // ── Translation map ─────────────────────────────────────────────
  // Format: selector → [en, fr]   (text)
  //         selector → {h:[en,fr]} (innerHTML — preserves child tags)
  //         selector → {ph:[en,fr]}(placeholder attribute)
  const MAP = {

    // ── Shared: Navbar ──────────────────────────────────────────
    '.logo-tagline': {h:['Dive Deeper. <span class="gold">Deliver Value.</span>',
                         'Plongez Plus Profond. <span class="gold">Livrez Plus de Valeur.</span>']},
    '.nav-links > a[href="/"]':            ['Home', 'Accueil'],
    '.nav-links > a[href="about.html"]':   ['About Us', 'À propos'],
    '.nav-drop-trigger':                   {h:['Solutions <svg class="nav-chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                                                'Solutions <svg class="nav-chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>']},
    '.nav-links > a[href="industries.html"]':['Industries', 'Secteurs'],
    '.nav-links > a[href="case-studies.html"]':['Case Studies', 'Études de cas'],
    '.nav-links > a[href="insights.html"]':['Insights', 'Perspectives'],
    '.nav-links > a[href="contact.html"]:not(.btn-primary)': ['Contact', 'Contact'],
    '.btn-primary.nav-cta': ['Book a Consultation →', 'Réserver une consultation →'],
    '.mobile-menu-links a[href="/"]':              ['Home', 'Accueil'],
    '.mobile-menu-links a[href="about.html"]':     ['About Us', 'À propos'],
    '.mobile-menu-links a[href="services.html"]':  ['Solutions', 'Solutions'],
    '.mobile-menu-links a[href="industries.html"]':['Industries', 'Secteurs'],
    '.mobile-menu-links a[href="case-studies.html"]':['Case Studies', 'Études de cas'],
    '.mobile-menu-links a[href="insights.html"]':  ['Insights', 'Perspectives'],
    '.mobile-menu-links a[href="contact.html"]':   ['Contact', 'Contact'],
    '.mobile-cta': ['Book a Consultation →', 'Réserver une consultation →'],

    // ── Shared: Footer ──────────────────────────────────────────
    '.footer-desc': ['Data analytics consulting that transforms complexity into clarity — helping businesses grow through the power of data.',
      "Conseil en analytique de données qui transforme la complexité en clarté — aidant les entreprises à croître grâce à la puissance des données."],
    '.footer-col:nth-child(1) h5': ['Company', 'Entreprise'],
    '.footer-col:nth-child(2) h5': ['Services', 'Services'],
    '.footer-col:nth-child(3) h5': ['Industries', 'Secteurs'],
    '.footer-col:nth-child(4) h5': ['Get in Touch', 'Nous contacter'],
    '.footer-col:nth-child(1) a[href="/"]':              ['Home', 'Accueil'],
    '.footer-col:nth-child(1) a[href="about.html"]':     ['About Us', 'À propos'],
    '.footer-col:nth-child(1) a[href="case-studies.html"]':['Case Studies', 'Études de cas'],
    '.footer-col:nth-child(1) a[href="contact.html"]':   ['Contact', 'Contact'],
    '.footer-col:nth-child(2) a[href="services.html"]:nth-child(1)': ['Data Analytics', 'Analytique de données'],
    '.footer-newsletter-hint': ['Get data insights in your inbox.', 'Recevez des insights dans votre boîte mail.'],
    '.footer-bottom-inner > p': ['© 2025 Sonadive Analytics. All Rights Reserved.', '© 2025 Sonadive Analytics. Tous droits réservés.'],
    '.footer-bottom-links a:first-child': ['Privacy Policy', 'Politique de confidentialité'],
    '.footer-bottom-links a:last-child':  ["Terms of Service", "Conditions d'utilisation"],
    '.newsletter-row input[type="email"]': {ph:['Your email', 'Votre email']},
  };

  // ── Page-specific maps ──────────────────────────────────────────
  const PAGE_MAPS = {

    home: {
      '.hero-badge':   {h:['EPM &amp; MODERN DATA ARCHITECTURE',
                          "EPM &amp; ARCHITECTURE DE DONNÉES MODERNE"]},
      '.hero h1':      {h:['Enterprise EPM &amp; Data Pipelines.<br><span class="gold-text">Built Faster.</span>',
                          "EPM d'entreprise &amp; Pipelines de Données.<br><span class='gold-text'>Livrés Plus Vite.</span>"]},
      '.hero-sub':     ['We help Finance and Ops teams deploy Pigment, Anaplan, and cloud data backends without multi-month consultancy delays.',
                        "Nous aidons les équipes Finance et Opérations à déployer Pigment, Anaplan et des backends de données cloud sans les délais de plusieurs mois des cabinets de conseil."],
      '.hero-cta a.btn-primary':  ['Book a Consultation →', 'Réserver une consultation →'],
      '.hero-cta a.btn-outline':  ['View Tech Ecosystem →', "Voir l'écosystème technique →"],
      '.services .section-eyebrow': ['OUR SERVICES', 'NOS SERVICES'],
      '.services h2':  ['End-to-End Data & EPM Solutions', 'Solutions Data & EPM Complètes'],
      '.services .section-sub': ['From cloud architecture to rapid model deployment, we build scalable platforms for fast decisions.',
        "De l'architecture cloud au déploiement rapide de modèles, nous construisons des plateformes scalables pour décider vite."],
      '.service-card:nth-child(1) h3': ['EPM Deployment', 'Déploiement EPM'],
      '.service-card:nth-child(1) p':  ['Rapid Pigment & Anaplan implementations for FP&A, ARR, and headcount modeling.', "Implémentations rapides Pigment & Anaplan pour le FP&A, l'ARR et la modélisation des effectifs."],
      '.service-card:nth-child(2) h3': ['Data Engineering', 'Ingénierie des données'],
      '.service-card:nth-child(2) p':  ['Automated pipelines connecting Snowflake, Databricks, and Azure to your planning tools.', 'Pipelines automatisés connectant Snowflake, Databricks et Azure à vos outils de planification.'],
      '.service-card:nth-child(3) h3': ['Business Intelligence', "Intelligence d'affaires"],
      '.service-card:nth-child(3) p':  ['Production-grade Power BI dashboards fed directly by enterprise data warehouses.', 'Tableaux de bord Power BI de production alimentés directement par vos entrepôts de données.'],
      '.service-card:nth-child(4) h3': ['Anaplan to Pigment Migration', 'Migration Anaplan vers Pigment'],
      '.service-card:nth-child(4) p':  ['Transition legacy models to modern Pigment architecture without data loss.', 'Migrez vos modèles legacy vers une architecture Pigment moderne sans perte de données.'],
      '.service-card:nth-child(5) h3': ['Process Automation', 'Automatisation des processus'],
      '.service-card:nth-child(5) p':  ['Streamlined data ingestion workflows and automated financial reconciliation.', "Flux d'ingestion de données simplifiés et rapprochements financiers automatisés."],
      '.service-card:nth-child(6) h3': ['Fractional EPM Support', 'Support EPM à temps partagé'],
      '.service-card:nth-child(6) p':  ['Dedicated monthly retainer support for workspace maintenance and model updates.', 'Support mensuel dédié pour la maintenance des workspaces et la mise à jour des modèles.'],
      '.svc-link': ['Learn more →', 'En savoir plus →'],
      '.tech-stack .section-eyebrow': ['OUR INTEGRATED TECH ECOSYSTEM', 'NOTRE ÉCOSYSTÈME TECHNIQUE INTÉGRÉ'],
      '.why .section-eyebrow': ['WHY CHOOSE SONADIVE', 'POURQUOI CHOISIR SONADIVE'],
      '.why h2': {h:['Why Partners &amp; Enterprises<br>Build with Us', 'Pourquoi Partenaires &amp; Entreprises<br>Construisent avec Nous']},
      '.why-item:nth-child(1) h4': ['Certified Builders', 'Experts certifiés'],
      '.why-item:nth-child(1) p':  ['Senior certified Pigment & Anaplan Solution Architects assigned directly to your project.', 'Des Solution Architects Pigment et Anaplan seniors certifiés affectés directement à votre projet.'],
      '.why-item:nth-child(2) h4': ['High-Velocity Delivery', 'Livraison à haute vélocité'],
      '.why-item:nth-child(2) p':  ['Agile 4 to 8 week deployments instead of bloated consultancy timelines.', 'Des déploiements agiles de 4 à 8 semaines au lieu des délais interminables des cabinets.'],
      '.why-item:nth-child(3) h4': ['Full-Stack Integration', 'Intégration full-stack'],
      '.why-item:nth-child(3) p':  ['We engineer both the backend data pipeline and the front-end EPM model.', 'Nous concevons à la fois le pipeline de données backend et le modèle EPM front-end.'],
      '.why-item:nth-child(4) h4': ['Flexible Support Models', 'Modèles de support flexibles'],
      '.why-item:nth-child(4) p':  ['From full build-outs to fractional admin support and white-label delivery.', "Du build complet au support admin à temps partagé et à la livraison en marque blanche."],
      '.contact-form-wrap .section-eyebrow': ["LET'S CONNECT", 'TRAVAILLONS ENSEMBLE'],
      '.contact-form-wrap h2': ['Get in Touch', 'Prendre Contact'],
      '.contact-form-wrap .section-sub': ['Need a certified Pigment builder or data pipeline architect? Let’s talk.',
        "Besoin d'un expert Pigment certifié ou d'un architecte de pipelines de données ? Parlons-en."],
      '.contact-form input[name="name"]':    {ph:['Your Name', 'Votre Nom']},
      '.contact-form input[name="email"]':   {ph:['Your Email', 'Votre Email']},
      '.contact-form input[name="company"]': {ph:['Company Name', "Nom de l'Entreprise"]},
      '.contact-form input[name="phone"]':   {ph:['Phone Number', 'Numéro de Téléphone']},
      '.contact-form textarea':              {ph:['Your Message', 'Votre Message']},
      '.contact-form .form-btn':             ['Send Message →', 'Envoyer le message →'],
      '#formSuccess': ['Message sent! We\'ll be in touch soon.', 'Message envoyé ! Nous vous contacterons bientôt.'],
      '#formError':   ['Something went wrong. Please try again or email us directly.', "Une erreur s'est produite. Veuillez réessayer ou nous envoyer un email directement."],
    },

    about: {
      '.page-hero-eyebrow': ['Our Story', 'Notre Histoire'],
      '.page-hero h1': {h:['We Dive Deeper<br><span class="gradient-text">So You Move Faster</span>',
        'Nous Plongeons Plus Profond<br><span class="gradient-text">Pour Vous Faire Avancer Plus Vite</span>']},
      '.page-hero p:not(.page-hero-eyebrow)': ['Sonadive was founded on a clear mission: to eliminate the slow, bloated implementation cycles of traditional consultancies. We dive deep into underlying data architecture and deploy high-velocity EPM models in Pigment and Anaplan.',
        "Sonadive a été fondé avec une mission claire : éliminer les cycles de mise en œuvre lents et surdimensionnés des cabinets de conseil traditionnels. Nous plongeons au cœur de l'architecture de données et déployons des modèles EPM à haute vélocité dans Pigment et Anaplan."],
      '.about-intro-text .section-eyebrow': ['WHO WE ARE', 'QUI NOUS SOMMES'],
      '.about-intro-text h2': ['An Agile Delivery Partner for EPM & Cloud Data', 'Un Partenaire de Déploiement Agile pour l’EPM et le Cloud Data'],
      '.about-intro-text > p:nth-of-type(2)': ['From mid-market finance teams to scaling enterprises, we combine modern cloud data pipelines (Snowflake, Databricks, Azure) with rapid Pigment and Anaplan model deployment.',
        "Des équipes finance du mid-market aux entreprises en forte croissance, nous combinons des pipelines de données cloud modernes (Snowflake, Databricks, Azure) avec un déploiement rapide de modèles Pigment et Anaplan."],
      '.about-highlight:nth-of-type(1)': ['Rapid 4–8 week Pigment and Anaplan implementation cycles', 'Cycles de mise en œuvre Pigment et Anaplan rapides en 4 à 8 semaines'],
      '.about-highlight:nth-of-type(2)': ['End-to-end integration: From raw warehouse data to executive dashboards', 'Intégration de bout en bout : des données brutes du warehouse aux tableaux de bord de direction'],
      '.about-highlight:nth-of-type(3)': ['Senior certified Pigment builders and cloud data engineers', 'Experts Pigment certifiés seniors et ingénieurs de données cloud'],
      '.mission-text h3': ['Our Mission', 'Notre Mission'],
      '.mission-text p': ['To democratise data analytics for businesses of all sizes — giving every organisation the tools, insights, and strategies they need to compete in a data-driven world. We believe analytics should be accessible, actionable, and impactful.',
        "Démocratiser l'analytique de données pour les entreprises de toutes tailles — donner à chaque organisation les outils, les insights et les stratégies dont elle a besoin pour être compétitive dans un monde orienté données. Nous pensons que l'analytique doit être accessible, actionnable et impactante."],
      '.mission-text .btn-primary': ['Work With Us →', 'Travaillez avec nous →'],
      '.mission-quote': {h:['\"Deep Data.<br>Real Impact.\"', '\"Données profondes.<br>Impact réel.\"']},
      '.section-header .section-eyebrow': ['OUR VALUES', 'NOS VALEURS'],
      '.section-header h2': ['What Guides Everything We Do', 'Ce Qui Guide Tout Ce Que Nous Faisons'],
      '.section-header p:not(.section-eyebrow)': ["Our values aren't posted on a wall — they're embedded in every analysis, recommendation, and client relationship.",
        "Nos valeurs ne sont pas affichées sur un mur — elles sont intégrées dans chaque analyse, recommandation et relation client."],
      '.value-card:nth-child(1) h4': ['Integrity First', "L'Intégrité Avant Tout"],
      '.value-card:nth-child(1) p':  ["We give honest assessments, even when it's not what clients want to hear. Trust is the foundation of every engagement.",
        "Nous donnons des évaluations honnêtes, même quand ce n'est pas ce que les clients veulent entendre. La confiance est le fondement de chaque engagement."],
      '.value-card:nth-child(2) h4': ['Data Precision', 'Précision des Données'],
      '.value-card:nth-child(2) p':  ['We obsess over accuracy. Every insight is validated, every model tested, every recommendation backed by evidence.',
        "Nous sommes obsédés par l'exactitude. Chaque insight est validé, chaque modèle testé, chaque recommandation appuyée par des preuves."],
      '.value-card:nth-child(3) h4': ['Client Partnership', 'Partenariat Client'],
      '.value-card:nth-child(3) p':  ["We're not vendors — we're partners. We embed within your teams and care about your outcomes as much as you do.",
        "Nous ne sommes pas des fournisseurs — nous sommes des partenaires. Nous nous intégrons dans vos équipes et nous soucions de vos résultats autant que vous."],
      '.value-card:nth-child(4) h4': ['Measurable Impact', 'Impact Mesurable'],
      '.value-card:nth-child(4) p':  ['We define success in numbers — revenue gained, costs reduced, decisions accelerated. Analytics must drive real outcomes.',
        "Nous définissons le succès en chiffres — revenus générés, coûts réduits, décisions accélérées. L'analytique doit produire des résultats concrets."],
      '.bg-dark .section-eyebrow': ['GET STARTED', 'COMMENÇONS'],
      '.bg-dark h2': ['Ready to Transform Your Data?', 'Prêt à transformer vos données ?'],
      '.bg-dark p:not(.section-eyebrow)': ["Let's talk about your data challenges and how Sonadive can help.", "Parlons de vos défis data et de comment Sonadive peut vous aider."],
      '.bg-dark .btn-primary': ['Book a Free Consultation →', 'Réserver une consultation gratuite →'],
      '.bg-dark .btn-outline': ['Explore Our Services', 'Explorer nos services'],
    },

    services: {
      '.page-hero-eyebrow': ['What We Do', 'Ce Que Nous Faisons'],
      '.page-hero h1': {h:['End-to-End<br><span class="gradient-text">Data Solutions</span>',
        'Solutions Data<br><span class="gradient-text">de Bout en Bout</span>']},
      '.page-hero p:not(.page-hero-eyebrow)': ['From data strategy to production-grade pipelines and AI-powered automation — we cover every layer of the modern data stack.',
        "De la stratégie data aux pipelines de production et à l'automatisation par IA — nous couvrons chaque couche de la stack data moderne."],
      '.page-section:first-of-type .section-eyebrow': ['OUR SERVICES', 'NOS SERVICES'],
      '.page-section:first-of-type h2': ['Six Ways We Help You Win With Data', 'Six Façons de Vous Aider à Gagner avec les Données'],
      '.page-section:first-of-type .section-header p:not(.section-eyebrow)': ['Each service is designed to deliver measurable business value — not just technical output.',
        "Chaque service est conçu pour livrer une valeur commerciale mesurable — pas seulement une sortie technique."],
      '.service-detail-card:nth-child(1) h3': ['EPM', 'EPM'],
      '.service-detail-card:nth-child(2) h3': ['Data Analytics', 'Analytique de données'],
      '.service-detail-card:nth-child(3) h3': ['Business Intelligence', "Intelligence d'affaires"],
      '.service-detail-card:nth-child(4) h3': ['Data Engineering', 'Ingénierie des données'],
      '.service-detail-card:nth-child(5) h3': ['AI & Automation', 'IA & Automatisation'],
      '.service-detail-card:nth-child(6) h3': ['Data Strategy & Governance', 'Stratégie & Gouvernance des données'],
      '.svc-link, .service-detail-card a.svc-link': ['Get started →', 'Commencer →'],
      '.bg-dark .section-eyebrow': ['READY TO START', 'PRÊT À COMMENCER'],
      '.bg-dark h2': ['Not Sure Which Service You Need?', 'Pas sûr du service dont vous avez besoin ?'],
      '.bg-dark p:not(.section-eyebrow)': ["That's exactly what the discovery call is for. Tell us about your challenge and we'll recommend the right approach.",
        "C'est exactement l'objet de l'appel de découverte. Parlez-nous de votre défi et nous vous recommanderons la bonne approche."],
      '.bg-dark .btn-primary': ['Book a Free Consultation →', 'Réserver une consultation gratuite →'],
    },

    industries: {
      '.page-hero-eyebrow': ['Where We Operate', 'Où Nous Intervenons'],
      '.page-hero h1': {h:['Deep Expertise Across<br><span class="gradient-text">Every Industry</span>',
        'Expertise Approfondie dans<br><span class="gradient-text">Chaque Secteur</span>']},
      '.page-hero p:not(.page-hero-eyebrow)': ["We don't just understand data — we understand your industry. Our consultants bring domain-specific knowledge to every engagement.",
        "Nous ne comprenons pas seulement les données — nous comprenons votre secteur. Nos consultants apportent une connaissance spécifique à chaque engagement."],
      '.section-header .section-eyebrow': ['INDUSTRIES WE SERVE', 'SECTEURS QUE NOUS SERVONS'],
      '.section-header h2': ['Sector-Specific Data Solutions', 'Solutions Data par Secteur'],
      '.section-header p:not(.section-eyebrow)': ['Each industry has unique data challenges. We bring the right expertise to solve them.',
        "Chaque secteur a ses défis data uniques. Nous apportons l'expertise adéquate pour les résoudre."],
      '.industry-card:nth-child(1) h3': ['Retail & E-Commerce', 'Commerce & E-Commerce'],
      '.industry-card:nth-child(1) p':  ['Drive revenue growth through customer intelligence, demand forecasting, inventory optimisation, and personalised marketing analytics.',
        "Stimulez la croissance du chiffre d'affaires grâce à l'intelligence client, la prévision de la demande, l'optimisation des stocks et l'analytique marketing personnalisée."],
      '.industry-card:nth-child(2) h3': ['Financial Services', 'Services Financiers'],
      '.industry-card:nth-child(2) p':  ['Improve risk models, accelerate compliance reporting, detect fraud in real time, and enhance client portfolio analytics with data-driven precision.',
        "Améliorez les modèles de risque, accélérez le reporting réglementaire, détectez la fraude en temps réel et améliorez l'analytique des portefeuilles clients."],
      '.industry-card:nth-child(3) h3': ['Healthcare', 'Santé'],
      '.industry-card:nth-child(3) p':  ['Support clinical decisions, optimise resource allocation, improve patient outcomes, and enable population health analytics through integrated data platforms.',
        "Soutenez les décisions cliniques, optimisez l'allocation des ressources, améliorez les résultats patients et activez l'analytique de santé populationnelle."],
      '.industry-card:nth-child(4) h3': ['Manufacturing', 'Industrie & Production'],
      '.industry-card:nth-child(4) p':  ['Reduce downtime, improve yield, and streamline supply chains with real-time operational analytics, predictive maintenance, and quality monitoring.',
        "Réduisez les temps d'arrêt, améliorez les rendements et optimisez les chaînes d'approvisionnement grâce à l'analytique opérationnelle en temps réel."],
      '.industry-card:nth-child(5) h3': ['Technology & SaaS', 'Technologie & SaaS'],
      '.industry-card:nth-child(5) p':  ['Turn product usage data into growth intelligence — optimise funnels, reduce churn, understand user behaviour, and build a data-informed product roadmap.',
        "Transformez les données d'utilisation en intelligence de croissance — optimisez les tunnels, réduisez le churn et construisez une feuille de route produit basée sur les données."],
      '.industry-card:nth-child(6) h3': ['Real Estate & Property', 'Immobilier & Patrimoine'],
      '.industry-card:nth-child(6) p':  ['Value properties accurately, identify investment opportunities, analyse market trends, and optimise portfolio performance with location-based intelligence.',
        "Évaluez les biens avec précision, identifiez les opportunités d'investissement et optimisez la performance de portefeuille grâce à l'intelligence géolocalisée."],
      '.bg-dark .section-eyebrow': ['YOUR INDUSTRY', 'VOTRE SECTEUR'],
      '.bg-dark h2': ["Don't See Your Industry?", "Votre secteur n'est pas listé ?"],
      '.bg-dark p:not(.section-eyebrow)': ["We work across many sectors. Let's discuss how our approach applies to your specific context.",
        "Nous intervenons dans de nombreux secteurs. Discutons de la façon dont notre approche s'applique à votre contexte spécifique."],
      '.bg-dark .btn-primary': ['Start a Conversation →', 'Démarrer une conversation →'],
    },

    casestudies: {
      '.page-hero-eyebrow': ['Real Results', 'Résultats Réels'],
      '.page-hero h1': {h:['Real Challenges.<br><span class="gradient-text">Real Results.</span>',
        'Vrais Défis.<br><span class="gradient-text">Vrais Résultats.</span>']},
      '.page-hero p:not(.page-hero-eyebrow)': ['Explore how Sonadive has delivered measurable impact across industries through data-driven solutions.',
        "Découvrez comment Sonadive a livré un impact mesurable dans différents secteurs grâce à des solutions orientées données."],
      '.section-eyebrow': ['CASE STUDIES', 'ÉTUDES DE CAS'],
      'section h2': ['Client Success Stories', 'Histoires de Succès Client'],
    },

    insights: {
      '.page-hero-eyebrow': ['Knowledge Hub', 'Centre de Connaissances'],
      '.page-hero h1': {h:['Data Analytics<br><span class="gradient-text">Insights & Resources</span>',
        'Analytique de Données<br><span class="gradient-text">Perspectives & Ressources</span>']},
      '.page-hero p:not(.page-hero-eyebrow)': ['Practical perspectives on data strategy, analytics, AI, and the future of business intelligence — from our team to yours.',
        "Perspectives pratiques sur la stratégie data, l'analytique, l'IA et l'avenir de l'intelligence d'affaires — de notre équipe à la vôtre."],
      '.section-eyebrow:nth-of-type(1)': ['Featured Article', 'Article Vedette'],
      'section .section-header .section-eyebrow': ['LATEST ARTICLES', 'DERNIERS ARTICLES'],
      '.section-header h2': ['From Our Team', 'De Notre Équipe'],
      '.section-header p:not(.section-eyebrow)': ['Practical insights and expert perspectives on data, analytics, and AI.',
        "Insights pratiques et perspectives d'experts sur les données, l'analytique et l'IA."],
      '.insight-read': ['Read more →', 'Lire la suite →'],
    },

    contact: {
      '.page-hero-eyebrow': ['Get in Touch', 'Entrez en Contact'],
      '.page-hero h1': {h:["Let's Start a<br><span class=\"gradient-text\">Conversation</span>",
        "Démarrons une<br><span class=\"gradient-text\">Conversation</span>"]},
      '.page-hero p:not(.page-hero-eyebrow)': ["Have a data challenge or project in mind? Tell us about it — we'll get back to you within 24 hours with honest, practical advice.",
        "Vous avez un défi data ou un projet en tête ? Partagez-le avec nous — nous vous répondrons dans les 24 heures avec des conseils honnêtes et pratiques."],
      '.contact-info-panel': ['How to Reach Us', 'Comment Nous Joindre'],
      '.contact-info-item:nth-child(2) h4': ['Email', 'Email'],
      '.contact-info-item:nth-child(2) p:last-child': ['We reply within 24 hours', 'Nous répondons dans les 24 heures'],
      '.contact-info-item:nth-child(3) h4': ['Discovery Call', 'Appel de Découverte'],
      '.contact-info-item:nth-child(3) p:first-of-type': ['Book a free 30-minute call', 'Réservez un appel gratuit de 30 minutes'],
      '.contact-info-item:nth-child(3) p:last-child': ['No commitment required', 'Aucun engagement requis'],
      '.contact-info-item:nth-child(4) h4': ['Response Time', 'Délai de Réponse'],
      '.contact-info-item:nth-child(4) p': ['Within 24 hours on business days', 'Dans les 24 heures les jours ouvrés'],
      '.contact-info-item:nth-child(5) h4': ['LinkedIn', 'LinkedIn'],
      '.contact-info-item:nth-child(5) p a': ['Connect with Sonadive', 'Connectez-vous avec Sonadive'],
      '.contact-form-card h3': ['Send Us a Message', 'Envoyez-nous un Message'],
      '.contact-form-card > p': ["Tell us about your project and we'll get back to you quickly.", 'Parlez-nous de votre projet et nous vous répondrons rapidement.'],
      '#contactForm input[name="name"]':    {ph:['Your Name', 'Votre Nom']},
      '#contactForm input[name="email"]':   {ph:['Your Email', 'Votre Email']},
      '#contactForm input[name="company"]': {ph:['Company Name', "Nom de l'Entreprise"]},
      '#contactForm input[name="phone"]':   {ph:['Phone Number', 'Numéro de Téléphone']},
      '#contactForm select': {ph:['What service are you interested in?', 'Quel service vous intéresse ?']},
      '#contactForm textarea': {ph:['Tell us about your data challenge or project...', 'Parlez-nous de votre défi data ou de votre projet...']},
      '#contactForm button[type="submit"]': ['Send Message →', 'Envoyer le message →'],
      '#formSuccess': ["Message sent! We'll be in touch within 24 hours.", 'Message envoyé ! Nous vous contacterons dans les 24 heures.'],
      '#formError': ['Something went wrong. Please try again or email us directly at ngabochampion@gmail.com',
        "Une erreur s'est produite. Veuillez réessayer ou nous envoyer un email directement à ngabochampion@gmail.com"],
    },
  };

  // ── Apply translations ──────────────────────────────────────────
  const i = lang === 'fr' ? 1 : 0;

  function applyMap(map) {
    Object.entries(map).forEach(([sel, val]) => {
      document.querySelectorAll(sel).forEach(el => {
        if (Array.isArray(val)) {
          el.textContent = val[i];
        } else if (val.h) {
          el.innerHTML = val.h[i];
        } else if (val.ph) {
          el.placeholder = val.ph[i];
        }
      });
    });
  }

  function apply() {
    const idx = lang === 'fr' ? 1 : 0;
    // Reassign i (closure won't see updated lang)
    Object.entries(MAP).forEach(([sel, val]) => {
      document.querySelectorAll(sel).forEach(el => {
        if (Array.isArray(val)) el.textContent = val[idx];
        else if (val.h) el.innerHTML = val.h[idx];
        else if (val.ph) el.placeholder = val.ph[idx];
      });
    });
    const pm = PAGE_MAPS[page];
    if (pm) {
      Object.entries(pm).forEach(([sel, val]) => {
        document.querySelectorAll(sel).forEach(el => {
          if (Array.isArray(val)) el.textContent = val[idx];
          else if (val.h) el.innerHTML = val.h[idx];
          else if (val.ph) el.placeholder = val.ph[idx];
        });
      });
    }
    document.documentElement.lang = lang;
    // Legacy single-button toggle (mobile menu)
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'en' ? 'FR' : 'EN';
    });
    // EN | FR switch in the navbar
    document.querySelectorAll('.lang-opt').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem(KEY, lang);
    apply();
  }

  function toggle() {
    setLang(lang === 'en' ? 'fr' : 'en');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    document.querySelectorAll('.lang-opt').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
    apply();
  });

})();
