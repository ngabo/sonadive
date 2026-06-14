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
    '.logo-tagline': ['Deep Data. Real Impact.', 'Données profondes. Impact réel.'],
    '.nav-links a[href="/"]':              ['Home', 'Accueil'],
    '.nav-links a[href="about.html"]':     ['About Us', 'À propos'],
    '.nav-links a[href="services.html"]':  ['Services', 'Services'],
    '.nav-links a[href="industries.html"]':['Industries', 'Secteurs'],
    '.nav-links a[href="case-studies.html"]':['Case Studies', 'Études de cas'],
    '.nav-links a[href="insights.html"]':  ['Insights', 'Perspectives'],
    '.nav-links a[href="contact.html"]:not(.btn-primary)': ['Contact', 'Contact'],
    '.btn-primary.nav-cta': ['Book a Consultation', 'Réserver une consultation'],
    '.mobile-menu-links a[href="/"]':              ['Home', 'Accueil'],
    '.mobile-menu-links a[href="about.html"]':     ['About Us', 'À propos'],
    '.mobile-menu-links a[href="services.html"]':  ['Services', 'Services'],
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
      '.hero-badge':   ['Data Analytics Consulting', 'Conseil en Analytique de Données'],
      '.hero h1':      {h:['Dive Deeper.<br>Discover <span class="gradient-text">Value.</span>',
                          'Analysez en profondeur.<br>Extrayez de la <span class="gradient-text">Valeur.</span>']},
      '.hero-sub':     ['We turn complex data into actionable insights that drive growth, efficiency, and competitive advantage.',
                        "Nous transformons vos données complexes en insights actionnables qui stimulent la croissance, l'efficacité et l'avantage concurrentiel."],
      '.hero-cta a.btn-primary':  ['Book a Consultation →', 'Réserver une consultation →'],
      '.hero-cta a.btn-outline':  ['View Our Services', 'Voir nos services'],
      '.hero-scroll-hint span':   ['Scroll', 'Défiler'],
      '.hf-label:first-of-type':  ['Avg. ROI Delivered', 'ROI Moyen Livré'],
      '.hero-float-r .hf-label':  ['Client Satisfaction', 'Satisfaction Client'],
      '.services .section-eyebrow': ['OUR SERVICES', 'NOS SERVICES'],
      '.services h2':  ['End-to-End Data Solutions', 'Solutions Data Complètes'],
      '.services .section-sub': ['From data strategy to actionable insights, we help you make confident, data-driven decisions.',
        "De la stratégie data aux insights actionnables, nous vous aidons à prendre des décisions confiantes basées sur les données."],
      '.service-card:nth-child(1) h3': ['Data Analytics', 'Analytique de données'],
      '.service-card:nth-child(1) p':  ['Transform raw data into actionable insights.', 'Transformez vos données brutes en insights actionnables.'],
      '.service-card:nth-child(2) h3': ['Business Intelligence', "Intelligence d'affaires"],
      '.service-card:nth-child(2) p':  ['Interactive dashboards and KPI reporting.', 'Tableaux de bord interactifs et reporting KPI.'],
      '.service-card:nth-child(3) h3': ['Financial Planning & Analytics', 'Planification financière & analytique'],
      '.service-card:nth-child(3) p':  ['Forecasting, budgeting, and scenario planning.', 'Prévisions, budgétisation et planification de scénarios.'],
      '.service-card:nth-child(4) h3': ['Data Engineering', 'Ingénierie des données'],
      '.service-card:nth-child(4) p':  ['ETL pipelines, data warehouses, and integrations.', "Pipelines ETL, entrepôts de données et intégrations."],
      '.service-card:nth-child(5) h3': ['AI & Automation', 'IA & Automatisation'],
      '.service-card:nth-child(5) p':  ['AI-powered solutions and workflow automation.', "Solutions IA et automatisation des flux de travail."],
      '.service-card:nth-child(6) h3': ['Data Strategy & Governance', 'Stratégie & Gouvernance des données'],
      '.service-card:nth-child(6) p':  ['Build a scalable and data-driven organization.', 'Construisez une organisation scalable orientée données.'],
      '.svc-link': ['Learn more →', 'En savoir plus →'],
      '.cs-header .section-eyebrow': ['CASE STUDIES', 'ÉTUDES DE CAS'],
      '.cs-header h2': ['Real Challenges. Real Results.', 'Vrais Défis. Vrais Résultats.'],
      '.btn-outline-white': ['View All Case Studies', 'Voir toutes les études de cas'],
      '.cs-retail h3': ['Driving Sales Growth with Customer Insights', 'Stimuler la croissance des ventes grâce aux insights clients'],
      '.cs-retail > p': ['Advanced customer segmentation and analytics helped increase sales significantly.',
        "La segmentation client avancée et l'analytique ont significativement augmenté les ventes."],
      '.cs-retail .cs-metric-label': ['Increase in Sales', 'Augmentation des Ventes'],
      '.cs-finance h3': ['Improving Credit Risk Assessment', "Améliorer l'évaluation du risque de crédit"],
      '.cs-finance > p': ['Predictive model reduced default rates and improved accuracy across portfolios.',
        "Le modèle prédictif a réduit les taux de défaut et amélioré la précision des portefeuilles."],
      '.cs-finance .cs-metric-label': ['Default Rate Reduced', 'Taux de Défaut Réduit'],
      '.cs-manufacturing h3': ['Optimizing Operations with Data', 'Optimiser les opérations par les données'],
      '.cs-manufacturing > p': ['Real-time dashboards improved operational efficiency across all production lines.',
        "Les tableaux de bord temps réel ont amélioré l'efficacité opérationnelle sur toutes les lignes de production."],
      '.cs-manufacturing .cs-metric-label': ['Efficiency Gain', "Gain d'Efficacité"],
      '.why .section-eyebrow': ['WHY CHOOSE SONADIVE', 'POURQUOI CHOISIR SONADIVE'],
      '.why h2': {h:['Your Success is<br>Data-Driven', 'Votre Succès est<br>Orienté Données']},
      '.why-item:nth-child(1) h4': ['Data-Driven Decisions', 'Décisions basées sur les données'],
      '.why-item:nth-child(1) p':  ['Decisions backed by accurate, real-time data.', 'Des décisions appuyées par des données précises en temps réel.'],
      '.why-item:nth-child(2) h4': ['Industry Expertise', 'Expertise sectorielle'],
      '.why-item:nth-child(2) p':  ['Deep domain knowledge across multiple sectors.', "Une connaissance approfondie de nombreux secteurs d'activité."],
      '.why-item:nth-child(3) h4': ['Actionable Insights', 'Insights actionnables'],
      '.why-item:nth-child(3) p':  ['Insights that drive action and measurable impact.', 'Des insights qui génèrent des actions et un impact mesurable.'],
      '.why-item:nth-child(4) h4': ['Measurable Results', 'Résultats mesurables'],
      '.why-item:nth-child(4) p':  ['Outcomes that directly impact your bottom line.', 'Des résultats qui impactent directement votre rentabilité.'],
      '.contact-form-wrap .section-eyebrow': ["LET'S CONNECT", 'TRAVAILLONS ENSEMBLE'],
      '.contact-form-wrap h2': ['Get in Touch', 'Prendre Contact'],
      '.contact-form-wrap .section-sub': ["Have a question or project in mind? We'll get back to you within 24 hours.",
        'Vous avez un projet en tête ? Nous vous répondrons dans les 24 heures.'],
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
      '.page-hero h1': {h:['We Turn Data Into<br><span class="gradient-text">Competitive Advantage</span>',
        'Nous Transformons les Données en<br><span class="gradient-text">Avantage Concurrentiel</span>']},
      '.page-hero p': ['Sonadive was built on one belief: every business decision should be powered by data. We partner with organisations to unlock the full potential of their data assets.',
        "Sonadive est fondé sur une conviction : chaque décision d'entreprise doit être alimentée par les données. Nous accompagnons les organisations pour libérer le plein potentiel de leurs actifs data."],
      '.about-intro-text .section-eyebrow': ['WHO WE ARE', 'QUI NOUS SOMMES'],
      '.about-intro-text h2': ['A Consulting Firm Built for the Data Age', "Un Cabinet de Conseil pour l'Ère des Données"],
      '.about-intro-text > p:nth-of-type(1)': ['Sonadive is a specialist data analytics consulting firm helping businesses across industries make faster, smarter decisions. We combine deep technical expertise with real-world business acumen to deliver solutions that move the needle.',
        "Sonadive est un cabinet spécialisé en analytique de données aidant les entreprises de tous secteurs à prendre des décisions plus rapides et plus intelligentes. Nous combinons une expertise technique approfondie avec une acuité commerciale réelle pour livrer des solutions qui font la différence."],
      '.about-intro-text > p:nth-of-type(2)': ['From startups scaling their first data infrastructure to enterprises modernising legacy systems, we bring clarity to complexity — and results to every engagement.',
        "Des startups développant leur première infrastructure data aux grandes entreprises modernisant leurs systèmes hérités, nous apportons de la clarté à la complexité — et des résultats à chaque engagement."],
      '.about-highlight:nth-of-type(1)': ['End-to-end data analytics, from strategy to execution', "Analytique data de bout en bout, de la stratégie à l'exécution"],
      '.about-highlight:nth-of-type(2)': ['Cross-industry expertise: Retail, Finance, Healthcare, Manufacturing', 'Expertise multisectorielle : Commerce, Finance, Santé, Industrie'],
      '.about-highlight:nth-of-type(3)': ['Hands-on team of analysts, engineers, and strategists', "Équipe opérationnelle d'analystes, ingénieurs et stratèges"],
      '.about-stat:nth-child(1) .about-stat-label': ['Projects Delivered', 'Projets Livrés'],
      '.about-stat:nth-child(2) .about-stat-label': ['Industries Served', 'Secteurs Servis'],
      '.about-stat:nth-child(3) .about-stat-label': ['Client Satisfaction', 'Satisfaction Client'],
      '.about-stat:nth-child(4) .about-stat-label': ["Years of Expertise", "Années d'Expertise"],
      '.mission-text h3': ['Our Mission', 'Notre Mission'],
      '.mission-text p': ['To democratise data analytics for businesses of all sizes — giving every organisation the tools, insights, and strategies they need to compete in a data-driven world. We believe analytics should be accessible, actionable, and impactful.',
        "Démocratiser l'analytique de données pour les entreprises de toutes tailles — donner à chaque organisation les outils, les insights et les stratégies dont elle a besoin pour être compétitive dans un monde orienté données. Nous pensons que l'analytique doit être accessible, actionnable et impactante."],
      '.mission-text .btn-primary': ['Work With Us →', 'Travaillez avec nous →'],
      '.mission-quote': {h:['\"Deep Data.<br>Real Impact.\"', '\"Données profondes.<br>Impact réel.\"']},
      '.section-header .section-eyebrow': ['OUR VALUES', 'NOS VALEURS'],
      '.section-header h2': ['What Guides Everything We Do', 'Ce Qui Guide Tout Ce Que Nous Faisons'],
      '.section-header p': ["Our values aren't posted on a wall — they're embedded in every analysis, recommendation, and client relationship.",
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
      '.bg-dark p': ["Let's talk about your data challenges and how Sonadive can help.", "Parlons de vos défis data et de comment Sonadive peut vous aider."],
      '.bg-dark .btn-primary': ['Book a Free Consultation →', 'Réserver une consultation gratuite →'],
      '.bg-dark .btn-outline': ['Explore Our Services', 'Explorer nos services'],
    },

    services: {
      '.page-hero-eyebrow': ['What We Do', 'Ce Que Nous Faisons'],
      '.page-hero h1': {h:['End-to-End<br><span class="gradient-text">Data Solutions</span>',
        'Solutions Data<br><span class="gradient-text">de Bout en Bout</span>']},
      '.page-hero p': ['From data strategy to production-grade pipelines and AI-powered automation — we cover every layer of the modern data stack.',
        "De la stratégie data aux pipelines de production et à l'automatisation par IA — nous couvrons chaque couche de la stack data moderne."],
      '.page-section:first-of-type .section-eyebrow': ['OUR SERVICES', 'NOS SERVICES'],
      '.page-section:first-of-type h2': ['Six Ways We Help You Win With Data', 'Six Façons de Vous Aider à Gagner avec les Données'],
      '.page-section:first-of-type .section-header p': ['Each service is designed to deliver measurable business value — not just technical output.',
        "Chaque service est conçu pour livrer une valeur commerciale mesurable — pas seulement une sortie technique."],
      '.service-detail-card:nth-child(1) h3': ['Data Analytics', 'Analytique de données'],
      '.service-detail-card:nth-child(2) h3': ['Business Intelligence', "Intelligence d'affaires"],
      '.service-detail-card:nth-child(3) h3': ['Financial Planning & Analytics', 'Planification financière & analytique'],
      '.service-detail-card:nth-child(4) h3': ['Data Engineering', 'Ingénierie des données'],
      '.service-detail-card:nth-child(5) h3': ['AI & Automation', 'IA & Automatisation'],
      '.service-detail-card:nth-child(6) h3': ['Data Strategy & Governance', 'Stratégie & Gouvernance des données'],
      '.svc-link, .service-detail-card a.svc-link': ['Get started →', 'Commencer →'],
      '.bg-dark .section-eyebrow': ['READY TO START', 'PRÊT À COMMENCER'],
      '.bg-dark h2': ['Not Sure Which Service You Need?', 'Pas sûr du service dont vous avez besoin ?'],
      '.bg-dark p': ["That's exactly what the discovery call is for. Tell us about your challenge and we'll recommend the right approach.",
        "C'est exactement l'objet de l'appel de découverte. Parlez-nous de votre défi et nous vous recommanderons la bonne approche."],
      '.bg-dark .btn-primary': ['Book a Free Consultation →', 'Réserver une consultation gratuite →'],
    },

    industries: {
      '.page-hero-eyebrow': ['Where We Operate', 'Où Nous Intervenons'],
      '.page-hero h1': {h:['Deep Expertise Across<br><span class="gradient-text">Every Industry</span>',
        'Expertise Approfondie dans<br><span class="gradient-text">Chaque Secteur</span>']},
      '.page-hero p': ["We don't just understand data — we understand your industry. Our consultants bring domain-specific knowledge to every engagement.",
        "Nous ne comprenons pas seulement les données — nous comprenons votre secteur. Nos consultants apportent une connaissance spécifique à chaque engagement."],
      '.section-header .section-eyebrow': ['INDUSTRIES WE SERVE', 'SECTEURS QUE NOUS SERVONS'],
      '.section-header h2': ['Sector-Specific Data Solutions', 'Solutions Data par Secteur'],
      '.section-header p': ['Each industry has unique data challenges. We bring the right expertise to solve them.',
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
      '.bg-dark p': ["We work across many sectors. Let's discuss how our approach applies to your specific context.",
        "Nous intervenons dans de nombreux secteurs. Discutons de la façon dont notre approche s'applique à votre contexte spécifique."],
      '.bg-dark .btn-primary': ['Start a Conversation →', 'Démarrer une conversation →'],
    },

    casestudies: {
      '.page-hero-eyebrow': ['Real Results', 'Résultats Réels'],
      '.page-hero h1': {h:['Real Challenges.<br><span class="gradient-text">Real Results.</span>',
        'Vrais Défis.<br><span class="gradient-text">Vrais Résultats.</span>']},
      '.page-hero p': ['Explore how Sonadive has delivered measurable impact across industries through data-driven solutions.',
        "Découvrez comment Sonadive a livré un impact mesurable dans différents secteurs grâce à des solutions orientées données."],
      '.section-eyebrow': ['CASE STUDIES', 'ÉTUDES DE CAS'],
      'section h2': ['Client Success Stories', 'Histoires de Succès Client'],
    },

    insights: {
      '.page-hero-eyebrow': ['Knowledge Hub', 'Centre de Connaissances'],
      '.page-hero h1': {h:['Data Analytics<br><span class="gradient-text">Insights & Resources</span>',
        'Analytique de Données<br><span class="gradient-text">Perspectives & Ressources</span>']},
      '.page-hero p': ['Practical perspectives on data strategy, analytics, AI, and the future of business intelligence — from our team to yours.',
        "Perspectives pratiques sur la stratégie data, l'analytique, l'IA et l'avenir de l'intelligence d'affaires — de notre équipe à la vôtre."],
      '.section-eyebrow:nth-of-type(1)': ['Featured Article', 'Article Vedette'],
      'section .section-header .section-eyebrow': ['LATEST ARTICLES', 'DERNIERS ARTICLES'],
      '.section-header h2': ['From Our Team', 'De Notre Équipe'],
      '.section-header p': ['Practical insights and expert perspectives on data, analytics, and AI.',
        "Insights pratiques et perspectives d'experts sur les données, l'analytique et l'IA."],
      '.insight-read': ['Read more →', 'Lire la suite →'],
    },

    contact: {
      '.page-hero-eyebrow': ['Get in Touch', 'Entrez en Contact'],
      '.page-hero h1': {h:["Let's Start a<br><span class=\"gradient-text\">Conversation</span>",
        "Démarrons une<br><span class=\"gradient-text\">Conversation</span>"]},
      '.page-hero p': ["Have a data challenge or project in mind? Tell us about it — we'll get back to you within 24 hours with honest, practical advice.",
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
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'en' ? 'FR' : 'EN';
    });
  }

  function toggle() {
    lang = lang === 'en' ? 'fr' : 'en';
    localStorage.setItem(KEY, lang);
    apply();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    apply();
  });

})();
