// ============================================================
// KARNATAKA EXAMS — MULTI-EXAM DATA (separate from data.js)
// Adds: KAS Mains, VAO, Land Surveyor, KEA Degree Level, KEA PUC Level
// Does NOT touch or duplicate KAS Prelims data — that stays in data.js
// exactly as-is. This file cross-references it by id where topics
// genuinely overlap (strict-match sync groups only).
//
// Verification note: pattern figures (questions/marks/duration/negative
// marking) were cross-checked against live sources in Sept 2026 where
// possible. KEA Degree/PUC Level is sourced from a BWSSB 2018 notification
// supplied by the user — treated as a representative PATTERN TEMPLATE for
// degree/PUC-level KEA recruitments generally (KEA reuses this shell across
// many posts), not as a guarantee for any specific current vacancy. Always
// flagged as such in the UI.
// ============================================================

const EXAMS_DATA = {

  // ---------------- EXAM REGISTRY ----------------
  examMeta: {
    "kas-prelims": {
      name: "KAS — Prelims", short: "KAS Prelims", group: "KAS",
      level: "Degree level", verified: "verified",
      note: "Existing site content — unchanged. See original sections above."
    },
    "kas-mains": {
      name: "KAS — Mains", short: "KAS Mains", group: "KAS",
      level: "Degree level", verified: "verified",
      papers: [
        { name: "Kannada (Qualifying)", marks: 150, duration: "2 hours", note: "Min 35% (52.5) to qualify — not counted in merit" },
        { name: "English (Qualifying)", marks: 150, duration: "2 hours", note: "Min 35% (52.5) to qualify — not counted in merit" },
        { name: "Essay", marks: 250, duration: "3 hours", note: "2 essays: (1) National/International importance (2) State/Local importance, 125 each" },
        { name: "General Studies I", marks: 250, duration: "3 hours", note: "History & Cultural Heritage + Social/Political Perspective + Economy/Planning/Rural Dev" },
        { name: "General Studies II", marks: 250, duration: "3 hours", note: "Physical Features & Resources + Indian Constitution + Public Admin & Intl Relations" },
        { name: "General Studies III", marks: 250, duration: "3 hours", note: "Science & Tech + Natural/Life/Agri Sciences & Health + Environment & Ecology" },
        { name: "General Studies IV", marks: 250, duration: "3 hours", note: "Ethics + Integrity + Aptitude" }
      ],
      meritTotal: 1250, interviewMarks: 25, grandTotal: 1275,
      facts: [
        "Merit is Essay + GS I-IV only (1,250 marks) — Kannada & English are qualifying gates, not counted",
        "Interview carries 25 marks (reduced from the earlier 200-mark weightage)",
        "No optional subject papers under the current pattern",
        "Descriptive/written format — tests depth and articulation, not recall speed"
      ]
    },
    "kea-degree": {
      name: "KEA Degree-Level Recruitment", short: "KEA Degree", group: "Other KEA",
      level: "Degree level", verified: "template",
      papers: [
        { name: "Paper 1 — General Knowledge", questions: 100, marks: 100, duration: "2 hours" },
        { name: "Paper 2 — Communication", questions: 100, marks: 100, duration: "2 hours", note: "Kannada 35 · English 35 · Computer Knowledge 30" }
      ],
      facts: [
        "Negative marking: −0.25 per wrong answer on both papers",
        "Pattern sourced from a BWSSB Corrigendum Notification (24-11-2018) supplied by the user",
        "Treated as a representative TEMPLATE — KEA reuses this exact 2-paper, 100Q/100M shell across many degree-level recruitments (confirmed structurally similar to VAO and other KEA posts)",
        "Always verify exact subject weightage and post-specific details against the current notification for your specific vacancy"
      ]
    },
    "kea-puc": {
      name: "KEA PUC-Level Recruitment", short: "KEA PUC", group: "Other KEA",
      level: "PUC (Class 12) level", verified: "template",
      papers: [
        { name: "Paper 1 — General Knowledge", questions: 100, marks: 100, duration: "2 hours" },
        { name: "Paper 2 — Communication", questions: 100, marks: 100, duration: "2 hours", note: "Kannada 35 · English 35 · Computer Knowledge 30" }
      ],
      facts: [
        "Negative marking: −0.25 per wrong answer on both papers",
        "Same source/template basis as KEA Degree Level, at PUC (Class 12) difficulty instead of degree level",
        "Always verify exact subject weightage and post-specific details against the current notification for your specific vacancy"
      ]
    }
  },

  // ---------------- KAS MAINS SYLLABUS ----------------
  // ---------------- KAS MAINS SYLLABUS ----------------
  kasMains: [
    {
      id: "mains-gs1-history", exam: "kas-mains", paper: "General Studies I",
      title: "History & Cultural Heritage (India & Karnataka)",
      meta: "Section I — 6 units",
      topics: [
        { name: "Indus vs Vedic Civilization", tags: [{l:"6",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Distinction between Indus and Vedic civilizations; evolution of Varna/Jati (caste) system; religious conditions and emergence of religious movements.", priority: 2,
          studyTargets: ["Key structural/economic/religious differences between Harappan and Vedic society — this comparison itself is the examinable angle, not just facts about each in isolation", "Varna system's stated origin (Purusha Sukta) vs Jati's later, more rigid crystallization — keep the two concepts distinct"] },
        { name: "Ancient Sanskrit Literature", tags: [{l:"DEGREE",k:"degree"}], desc: "Vedic literature, epics (Ramayana/Mahabharata) and Puranas and their cultural impact; polity/ethics (neeti) prose works, Panchatantra; Mughal-era contributions to Sanskrit literature.", priority: 1 },
        { name: "Ancient Science & Technology", tags: [{l:"DEGREE",k:"degree"}], desc: "Mathematics, Astronomy, Physics, Chemistry, Botany, Zoology, Physiology & Medicine (incl. surgery), ship-building, mining & metallurgy, engineering & architecture in ancient India.", priority: 2 },
        { name: "Arts of India (excl. Karnataka)", tags: [{l:"DEGREE",k:"degree"}], desc: "Maurya/Gupta period art; Khajuraho temples; Jain temples (Mount Abu, Odisha); Pallava/Chola/Pandyan contributions; Mughal architecture; Cathedral architecture (Bom Jesus-Goa, St. Paul's-Kolkata, St. Thomas-Chennai); Ajanta frescoes; Mughal/Rajput painting schools; classical music/dance; folk arts of India.", priority: 1 },
        { name: "India's Cultural Contributions Abroad", tags: [{l:"DEGREE",k:"degree"}], desc: "India's cultural influence on Central Asia, China, Japan, South-East Asia, and Sri Lanka.", priority: 1 },
        { name: "Hindu Dharma", tags: [{l:"DEGREE",k:"degree"}], desc: "General characteristics, Purusharthas, rituals/ethics, festivals/sacred days, pilgrimage/fairs; Hinduism's sects (Shaiva, Vaishnava, Shakta); philosophy of Upanishads and Bhagavad Gita; Yoga philosophy of Patanjali.", priority: 2 },
        { name: "Jainism", tags: [{l:"6",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Core principles (Ratnatraya, code of morals, samana/equality, Ahimsa); sects — Digambara and Svetambara.", priority: 1 },
        { name: "Buddhism", tags: [{l:"6",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Four Noble Truths, Eightfold Path, Nirvana, moral doctrines; sects — Hinayana and Mahayana.", priority: 2 },
        { name: "Christianity", tags: [{l:"DEGREE",k:"degree"}], desc: "Teachings of Jesus Christ; Christian doctrine and theology; major groups (Roman Catholic, Eastern Orthodox, Protestant); missionary activities in India.", priority: 1 },
        { name: "Islam", tags: [{l:"DEGREE",k:"degree"}], desc: "Core principles and practices — God, Confession of Faith, Five Pillars of Islam, sacred places/days, family system and Shariah; Sufis of Karnataka specifically; sects — Shia and Sunni.", priority: 2, karnataka: true },
        { name: "Sikhism", tags: [{l:"DEGREE",k:"degree"}], desc: "Core principles, practices, and historical evolution of Sikhism.", priority: 1 },
        { name: "Modern Social/Religious Reform Schools of Thought", tags: [{l:"8",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Major reform movements from the 19th century: eradication of social/religious wrongs, \"Vedas for all\"/casteless society ideal, ideal of service, emancipation of Depressed classes, Two-Nation theory and Islamic revivalism, empowerment of Depressed classes through religion/education, Hindutva and patriotism, the Dravidian Movement, Dalit emancipation struggle, Socialist approach and Total Revolution, Gram Swaraj/Satyagraha/Bhoodana.", priority: 3, recurring: true,
          studyTargets: ["Match each named school of thought to its key proponent (e.g. Total Revolution → Jayaprakash Narayan; Bhoodana → Vinoba Bhave) — this pairing is the most likely exact question shape", "Distinguish reform movements aimed at caste/depressed-class upliftment from those aimed at religious revivalism — they're often conflated but are analytically distinct categories in this unit"] },
        { name: "Antiquity of Karnataka & Kannada Language", tags: [{l:"11",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Antiquity of Karnataka; Kannada language and literature; extent of \"Kannadanadu\"; State and District Gazetteers; museums and archives in Karnataka; monument preservation (ASI's role); World Heritage Sites in Karnataka.", priority: 2, karnataka: true, relatedTo: "p1-history-ancient" },
        { name: "Kadambas to Hoysalas — Dynasty Contributions", tags: [{l:"11",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Architecture, sculpture, literature and religious contributions dynasty-by-dynasty: Kadambas, Gangas, Chalukyas, Rashtrakutas, Hoysalas.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-history-ancient",
          studyTargets: ["This Mains unit expects dynasty-by-dynasty depth beyond what Prelims tests — for each of the 5 dynasties, know at minimum: founder, capital, one major architectural/literary contribution, and approximate era", "Build this as a direct extension of the Prelims-level facts you already have on Kadambas/Gangas/Chalukyas/Hoysalas — Rashtrakutas is the one dynasty not covered at Prelims depth, prioritize researching it fresh"] },
        { name: "Vijayanagara Empire — Full Political History", tags: [{l:"7",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Origin, aims and aspirations of the Empire; Vidyaranya's role; political history from Harihara & Bukka through Immadi Devaraya, Krishnadevaraya, and Aliya Ramaraya; the Battle of Talikota and its consequences; glory of the capital, administration, society/economy/religion; arts (painting, music, dance, literature, architecture, sculpture); foreign accounts of Vijayanagara.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-history-medieval",
          studyTargets: ["This is the same core content as Prelims's Vijayanagara topic but expects essay-length command: be able to write connected paragraphs on administration, economy, and society separately, not just recall isolated facts", "Vidyaranya's specific role in the Empire's founding is a Mains-specific addition beyond typical Prelims depth — research this name specifically"] },
        { name: "Vijayanagara-Era Religious Sects", tags: [{l:"DEGREE",k:"degree"}], desc: "Shankaracharya, Ramanujacharya, Madhwacharya; Sri Basaveshwara, Veerashaivism and the Vachana movement; Haridasa movement; Kalamukha, Shakta and Pashupatha sects.", priority: 2, karnataka: true },
        { name: "Bahmani & Bijapur Sultanates", tags: [{l:"DEGREE",k:"degree"}], desc: "The Bahmani Shahis — Mahmud Gawan's contributions; Adil Shahis of Bijapur — contributions to literature and architecture; Sufis in Karnataka.", priority: 2, karnataka: true, relatedTo: "p1-history-medieval" },
        { name: "Mysore Regional Powers (pre-1799)", tags: [{l:"DEGREE",k:"degree"}], desc: "Chikkadevaraja Wodeyar's contributions; the Nayakas of Keladi and Chitradurga; Rani Chennamma & Sangolli Rayanna of Kittur; the Yelahanka Nadaprabhus; Hyder Ali and Tipu Sultan (1761–1799).", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-history-medieval",
          studyTargets: ["Rani Chennamma & Sangolli Rayanna already have a confirmed Prelims PYQ (see the Prelims History section) — at Mains depth, add the causes and consequences of the Kittur uprising, not just the names", "Hyder Ali and Tipu Sultan's Anglo-Mysore Wars (four wars, 1767–1799) — know the broad sequence and outcome of each, since Mains essay questions often ask for connected narrative across all four"] },
        { name: "Modern Mysore Under the Wodeyars (1799–1947)", tags: [{l:"DEGREE",k:"degree"}], desc: "Krishnaraja Wodeyar III's contributions; armed rebellions against the British in Karnataka; the Commissioner's Rule (1831–1881); Nizam's rule in Hyderabad-Karnataka; progress of Mysore under the Dewans (Diwans).", priority: 2, karnataka: true },
        { name: "Rise of Nationalism & Freedom Movement in Karnataka", tags: [{l:"8",k:"ncert"},{l:"10",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Pre-Gandhian era (1885–1920) and Gandhian era (1920–1948) in Karnataka; the freedom movement in Hyderabad-Karnataka specifically; important personalities in the freedom struggle.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-history-modern" },
        { name: "Unification of Karnataka — Full Detail", tags: [{l:"DEGREE",k:"degree"}], desc: "Causes for the rise of the unification movement; Alur Venkatrao's role; role of literary/cultural associations and print media; the three stages of Karnataka's unification (1947–1956).", priority: 3, recurring: true, karnataka: true, highPriority: true, relatedTo: "p1-history-modern",
          studyTargets: ["Prelims only expects the 1956 date and 2-3 key figures — Mains expects the full causal chain: WHY the movement rose, Alur Venkatrao's specific contribution, and the three distinct stages of unification by name/period, not just the end date", "This is explicitly flagged as high-ROI by the source document itself (\"start by mastering Karnataka-specific topics in History and Geography\") — prioritize accordingly"] },
        { name: "Social & Cultural Developments (Unification Era)", tags: [{l:"DEGREE",k:"degree"}], desc: "Spread of education by missionary/voluntary bodies; printing and the press; literary/scholarly studies; new literary genres in Kannada literature; the Backward Class movement; Miller Committee Report; folk arts of Karnataka.", priority: 2, karnataka: true }
      ]
    },
    {
      id: "mains-gs1-social", exam: "kas-mains", paper: "General Studies I",
      title: "Social and Political Perspective",
      meta: "Section II — 7 units",
      topics: [
        { name: "Post-Independence Political Consolidation", tags: [{l:"DEGREE",k:"degree"}], desc: "Karnataka's political consolidation post-independence; attempts of successive governments toward Backward Classes and Social Justice.", priority: 2, karnataka: true },
        { name: "Backward Classes Commission Reports", tags: [{l:"DEGREE",k:"degree"}], desc: "Havanur Committee, Venkataswamy Committee, Chinnappa Reddy Committee reports; recent trends; the Dalit Movement; Devaraja Urs and land reforms.", priority: 3, recurring: true, karnataka: true,
          studyTargets: ["Match each committee to its chairperson-era and core recommendation — this three-committee sequence (Havanur → Venkataswamy → Chinnappa Reddy) is a natural chronological-ordering question target", "Devaraja Urs's land reforms specifically — know what made his tenure distinct from earlier land-reform attempts"] },
        { name: "Gokak Movement & Language Issue", tags: [{l:"DEGREE",k:"degree"}], desc: "The Gokak Movement — issues and perspectives on Kannada language policy in Karnataka.", priority: 2, karnataka: true },
        { name: "Inter-State Disputes", tags: [{l:"DEGREE",k:"degree"}], desc: "Boundary disputes; Mahajan Committee Report and its impact; water disputes; Farmers' Movement; regional imbalance and the Nanjundappa Committee Report.", priority: 2, karnataka: true },
        { name: "Theories of Social Change & Movements", tags: [{l:"DEGREE",k:"degree"}], desc: "Social structure and social change; theories of social change; social disorganisation and social movements; directed social change; social policy and social development.", priority: 1 },
        { name: "Social Change & Modernisation", tags: [{l:"DEGREE",k:"degree"}], desc: "Role conflict, intergenerational gap, youth unrest, commercialization of education; India's emergence as an educational force; changing status of women and social movements; industrialization/urbanization; role of pressure groups; Sanskritisation, westernisation, modernization; modernism vs traditionalism; current social evils (fundamentalism, terrorism, Naxalism, nepotism, corruption, black money).", priority: 2 },
        { name: "Government & Political System", tags: [{l:"DEGREE",k:"degree"}], desc: "Legislature, Executive, Judiciary functioning; functioning of a democratic political system in a traditional society; political parties and their social composition.", priority: 2 },
        { name: "Decentralisation of Power & Political Participation", tags: [{l:"DEGREE",k:"degree"}], desc: "Decentralisation and political participation; Union Government, Parliament, Cabinet, Supreme Court, judicial review; Centre-State relations; State government, role of Governor; Panchayati Raj; class and caste in Indian politics; politics of regionalism/linguism/communalism; secularisation policy and national integration; political participation, voting, vote-bank politics.", priority: 2, syncGroup: "SG1" },
        { name: "Jajmani System & Socio-Economic Structure", tags: [{l:"DEGREE",k:"degree"}], desc: "The Jajmani system and its bearing on traditional society; market economy's social consequences; occupational diversification and social structure; profession/professionalisation; role of trade unions.", priority: 1 },
        { name: "Economic Development's Social Consequences", tags: [{l:"DEGREE",k:"degree"}], desc: "Social determinants and consequences of economic development; economic inequalities, exploitation and corruption; globalisation and its social impact.", priority: 1 },
        { name: "Rural Social System", tags: [{l:"DEGREE",k:"degree"}], desc: "Socio-cultural dimensions of village community; traditional power structure; democratization and leadership; poverty, indebtedness, bonded labour; social consequences of land reforms.", priority: 2 },
        { name: "Rural Development & Green Revolution", tags: [{l:"DEGREE",k:"degree"}], desc: "Rural development projects; the Green Revolution; new strategies of rural development; the changing rural scene.", priority: 2 }
      ]
    },
    {
      id: "mains-gs1-economy", exam: "kas-mains", paper: "General Studies I",
      title: "Indian Economy, Planning & Rural Development",
      meta: "Section III — 8 units",
      topics: [
        { name: "Post-Independence Growth Experience", tags: [{l:"12",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Growth experience of agriculture, industry and tertiary sectors; growth and distributive justice; poverty and inequality; growth of Karnataka's economy during the plan era; sectoral changes and linkages in the State economy.", priority: 2, karnataka: true },
        { name: "International Economic Relations", tags: [{l:"DEGREE",k:"degree"}], desc: "Growth and trade — volume, composition, direction of exports/imports; domestic and foreign capital in economic development; changes in India's foreign trade policy; balance of payments and foreign exchange; Karnataka's exports specifically — volume, composition, direction.", priority: 2, karnataka: true },
        { name: "Regional Development Disparities", tags: [{l:"DEGREE",k:"degree"}], desc: "Development patterns and disparities among regions and between rural/urban areas; public policies to mitigate disparities; prospects/problems of Special Economic Zones; Karnataka's development disparities and public policies; redressal mechanisms; regional development boards.", priority: 2, karnataka: true },
        { name: "Five-Year Plans (I–VII) & Post-1991 Planning", tags: [{l:"11",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Planning goals, objectives, approaches; achievements and failures of the first seven Five-Year Plans; development plans under the new economic policy regime (VIII Plan onward); planning specifically in Karnataka.", priority: 2 },
        { name: "Decentralized Planning", tags: [{l:"DEGREE",k:"degree"}], desc: "Pros/cons of top-down vs bottom-up planning; planning mechanism and experience in Panchayati Raj institutions; planning capacity-building and financing; decentralized planning in Karnataka; resource mobilization and devolution; District Planning Committee; State/local finances; State Finance Commission.", priority: 3, recurring: true, syncGroup: "SG1" },
        { name: "Rural Development Fundamentals", tags: [{l:"DEGREE",k:"degree"}], desc: "Importance of agriculture in the national economy; Gandhian approach to rural development and land reforms; farm size and productivity; irrigation and dry-land farming; food security; rural credit; agricultural marketing; agricultural labour; rural industries and employment; Karnataka's agricultural problems specifically; rural economic infrastructure (energy, irrigation, transport, communication, markets); rural social infrastructure (housing, drinking water, sanitation, drainage, health systems).", priority: 2, karnataka: true },
        { name: "Rural Development Initiatives & Schemes", tags: [{l:"DEGREE",k:"degree"}], desc: "Poverty-alleviation-cum-employment-generation programmes; Five-Year Plan and inclusive growth; rural financial institutions; conservation of common property resources (grasslands, water bodies); Provision of Urban Amenities in Rural Areas (PURA); Karnataka's rural development schemes; self-help groups and microfinance institutions; external assistance for rural tank rejuvenation, drinking water, sanitation, healthcare.", priority: 2, karnataka: true },
        { name: "Data Collection, Analysis & Interpretation", tags: [{l:"10",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Collection, interpretation, appreciation of statistical data; bar/line/pie chart study; tabular and diagrammatic data problems; data sufficiency; probability; permutations & combinations.", priority: 2 },
        { name: "Quantitative Aptitude", tags: [{l:"10",k:"ncert"},{l:"SSLC",k:"ssle"}], desc: "Number sequences and series; averages; number systems; ratio and proportion; profit and loss; percentages; time and work; speed-time-distance; simple interest; analytical and critical reasoning; reading comprehension.", priority: 2 }
      ]
    },
    {
      id: "mains-gs2-geography", exam: "kas-mains", paper: "General Studies II",
      title: "Physical Features and Natural Resources",
      meta: "Section I",
      topics: [
        { name: "Lithosphere", tags: [{l:"6",k:"ncert"},{l:"11",k:"ncert"}], desc: "Earth's place in the Solar System; rocks; earthquakes; volcanoes; plate tectonics; agents of erosion.", priority: 2 },
        { name: "Atmosphere — Structure & Climate", tags: [{l:"11",k:"ncert"}], desc: "Atmospheric structure and composition; elements of climate and weather; broad climatic types.", priority: 1 },
        { name: "Hydrosphere", tags: [{l:"11",k:"ncert"}], desc: "World oceans and salinity; ocean currents and tides; ocean deposits.", priority: 1 },
        { name: "World Physiography & Demography", tags: [{l:"11",k:"ncert"},{l:"12",k:"ncert"}], desc: "Physiography of continents — mountains, rivers, forests, grasslands, deserts; human races; population change, distribution and demographic transition; density, sex ratio, quality of life, life expectancy, literacy, standard of living, migration.", priority: 2 },
        { name: "Physiography of India", tags: [{l:"9",k:"ncert"},{l:"11",k:"ncert"}], desc: "Physiography, climate, rivers, soil, natural vegetation of India.", priority: 2, relatedTo: "p1-geo-world-india" },
        { name: "India's Mineral Resources (in depth)", tags: [{l:"10",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Iron ore and manganese; copper and bauxite; coal, petroleum and natural gas; nuclear deposits — distribution and production depth beyond Prelims level.", priority: 2, relatedTo: "p1-geo-world-india" },
        { name: "Major Crops — Distribution & Production", tags: [{l:"10",k:"ncert"}], desc: "Distribution and production of cereals, millets, oilseeds, plantation crops, commercial crops.", priority: 2 },
        { name: "Indian Demography & HDI", tags: [{l:"9",k:"ncert"},{l:"12",k:"ncert"}], desc: "Growth, composition, distribution, density of Indian population; Human Development Index; demographic database.", priority: 1 },
        { name: "Industrial Planning & Development", tags: [{l:"10",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Growth and distribution of major/medium/small/tiny industries; industrial regions of India; industrial infrastructure — railways, roads, ports; backward regions and rural industrialisation.", priority: 2 },
        { name: "Regional Planning & Urban Structure", tags: [{l:"DEGREE",k:"degree"}], desc: "Regional planning for tribal/hill areas, drought-prone areas, command areas, river basins; classification of towns and cities; urban structure.", priority: 1 },
        { name: "Geography of Karnataka (Mains depth)", tags: [{l:"DEGREE",k:"degree"}], desc: "Physiographic divisions; climate, rivers, rainfall distribution; natural vegetation and soil; agriculture and agro-climatic regions; major/plantation/commercial crops of Karnataka; mineral resources; sources of power (hydro/thermal/solar/nuclear/wind); major/medium/small-scale and agro-based industries; transportation and communication systems; GIS.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-geo-karnataka" },
        { name: "Urban Land-Use Policy & Urbanisation in Karnataka", tags: [{l:"DEGREE",k:"degree"}], desc: "Demographic features, literacy and urbanisation; population problems and policies; city classification and urban spheres of influence; rural-urban fringe; problems of urban growth; land use, town planning, slums, urban housing; intra/inter-regional trade and rural market centres.", priority: 2, karnataka: true }
      ]
    },
    {
      id: "mains-gs2-constitution", exam: "kas-mains", paper: "General Studies II",
      title: "Overview of Indian Constitution",
      meta: "Section II — 7 units",
      topics: [
        { name: "Nature of the Constitution", tags: [{l:"8",k:"ncert"},{l:"11",k:"ncert"}], desc: "Constitutional developments; salient features — Preamble, Directive Principles of State Policy, Indian federation.", priority: 1 },
        { name: "Fundamental Rights (Mains depth)", tags: [{l:"11",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "All six Fundamental Rights in full detail — Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural & Educational Rights, Right to Constitutional Remedies; reasonable restrictions; SC/ST/minority provisions, SC/ST/OBC reservations, Prevention of SC/ST Atrocities Act, National/State SC/ST Commissions.", priority: 3, recurring: true,
          studyTargets: ["Know all six rights by name and one example provision under each — Mains expects you to write connected explanation, not just recognize the right in an MCQ", "The Prevention of SC/ST Atrocities Act and the National/State SC/ST Commission structure are Mains-specific additions beyond Prelims's DPSP/Article-number focus"] },
        { name: "Distribution of Legislative Powers", tags: [{l:"11",k:"ncert"}], desc: "Legislative powers between Union and State; administrative/financial relations between Union and States; powers and functions of constitutional bodies; powers/functions of Governor, Council of Ministers, Cabinet; judicial remedies.", priority: 2 },
        { name: "Legislature Structure, Function & Accountability", tags: [{l:"11",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Unicameral and bicameral legislatures; functions and crisis of accountability; delegated legislation; legislative procedure and committees; legislative/judicial control over delegated legislation; judicial review of administrative action; CAG and Attorney General of India.", priority: 2 },
        { name: "Major Constitutional Amendments (in depth)", tags: [{l:"DEGREE",k:"degree"}], desc: "Basic structure theory; Emergency provisions and decentralisation; Panchayati Raj; the 73rd and 74th Constitutional Amendments in full detail.", priority: 3, recurring: true, syncGroup: "SG1" },
        { name: "Welfare Mechanisms & Constitutional Commissions", tags: [{l:"11",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "DPSP relationships; Right to Property; Election Commission; Public Service Commissions; Women's Commission; National/State Minorities Commission; Backward Commission; Human Rights Commission; Information Commission; Finance Commission; Planning Commission/National Development Council.", priority: 2 },
        { name: "Services under Union & State", tags: [{l:"DEGREE",k:"degree"}], desc: "Constitutional provisions relating to government and public servants.", priority: 1 }
      ]
    },
    {
      id: "mains-gs2-admin", exam: "kas-mains", paper: "General Studies II",
      title: "Public Administration & International Relations",
      meta: "Section III — 7 units",
      topics: [
        { name: "Public vs Private Administration", tags: [{l:"DEGREE",k:"degree"}], desc: "Role of administration in society; Public Administration as an art and a science; New Public Administration and New Public Management; Responsive Administration; distinctions between administration/management and public/private administration.", priority: 1 },
        { name: "Structure of Organisation", tags: [{l:"DEGREE",k:"degree"}], desc: "Personnel, financial, administrative law dimensions; maintenance of law and order; administration for welfare; issues/areas in Indian administration; Development Administration.", priority: 1 },
        { name: "Organisational Behaviour & Management Concepts", tags: [{l:"DEGREE",k:"degree"}], desc: "Organisation structure, systems, processes, strategies, policies, objectives; decision-making; communication; centralisation, decentralisation, delegation of authority, responsibility, control.", priority: 1 },
        { name: "Formal/Informal Organisation & Functional Management", tags: [{l:"DEGREE",k:"degree"}], desc: "Formal and informal organisation; functional management — finance, HR, marketing, production; leadership and motivation.", priority: 1 },
        { name: "Management Tools & Techniques", tags: [{l:"DEGREE",k:"degree"}], desc: "Decision-making under uncertainty; PERT & CPM; PIME; POSDCORB; SWOT analysis; performance standards and appraisal; PDCA cycle; personnel policy and manpower planning; training and development; conflict management; management of change; team building; quality tools (brainstorming, nominal group technique, Pareto chart, fishbone diagram, process chart).", priority: 2 },
        { name: "Administrative Reforms, Ethics & Governance", tags: [{l:"DEGREE",k:"degree"}], desc: "Accountability and ethical governance; program monitoring/evaluation; Lokpal and Lokayukta; redressal of citizen grievances; District Administration and Panchayati Raj system; law-and-order and development functions; welfare programmes for SC/ST and women; people's participation; Administrative Reforms Commissions (Central and State).", priority: 2, syncGroup: "SG1" },
        { name: "United Nations & Specialised Agencies", tags: [{l:"DEGREE",k:"degree"}], desc: "Origin and development of the UN; its role in international relations; General Assembly, Security Council, Economic & Social Council, Trusteeship Council, International Court of Justice; UN peacekeeping operations and disarmament efforts; future of the UN.", priority: 2 },
        { name: "International Organisations & India's Neighbours", tags: [{l:"DEGREE",k:"degree"}], desc: "Specialised agencies — WHO, ILO, FAO; international bodies — IMF, World Bank, ADB, WTO, EU, ASEAN, SAARC, AU, NATO, NAM, OPEC, G-8, IAEA; role of developing countries in international relations; India and her neighbours.", priority: 2 }
      ]
    },
    {
      id: "mains-gs3-sciencetech", exam: "kas-mains", paper: "General Studies III",
      title: "Science & Technology, IT in Public Domain",
      meta: "Section I",
      topics: [
        { name: "S&T Value Addition & National Policy", tags: [{l:"DEGREE",k:"degree"}], desc: "Classical and emerging areas of S&T; value addition by science & technology; current S&T developments in India; S&T as an engine for national development; industrial development and urbanization; national S&T policy and its changes over time; technology missions.", priority: 1 },
        { name: "ICT Fundamentals & Public Domain Use", tags: [{l:"CA",k:"ca"}], desc: "Basics of computers, communication, telephone, television; broadband, internet, web; IT industries and BPO; economic and employment growth via IT; e-governance, e-commerce, e-learning; IT and rural applications; digital divide and its prevention; computers in mass media.", priority: 2 },
        { name: "Space Science & Technology", tags: [{l:"CA",k:"ca"}], desc: "Brief history of global space programmes and current programmes; India's space programme — INSAT, IRS systems, EDUSAT, Chandrayaan-1 and beyond; applications of space technology in education, agriculture, rural development.", priority: 3, recurring: true, relatedTo: "p2-scitech",
          studyTargets: ["This overlaps directly with Prelims's Space Technology topic (already flagged high-priority/recurring there) — the Mains addition is depth on EDUSAT and applications specifically for rural/educational development, which Prelims doesn't test"] },
        { name: "Indian Energy Scenario", tags: [{l:"DEGREE",k:"degree"}], desc: "Hydel, thermal, nuclear, renewable energy potential, harnessing and policy options; importance of renewables — solar, wind, small/mini/micro hydel, biomass, waste-based, geothermal, tidal, hydrogen & fuel cells; enabling legislation, financial/procedural incentives, investment opportunities.", priority: 2 },
        { name: "Disasters, Pests & Pollution", tags: [{l:"DEGREE",k:"degree"}], desc: "Climatic change — floods, cyclones, tsunamis, natural/man-made disasters and disaster management; crop science, fertilizers, pest/crop-disease control; safe drinking water supply; sanitation and waste disposal; urbanization, industrialization, pollution control.", priority: 2 },
        { name: "Knowledge Society — HDI & Human Capital", tags: [{l:"DEGREE",k:"degree"}], desc: "Universalizing S&T literacy; \"Technology with a Human Face\"; Human Development Index; contribution to GDP growth; facing global competition; preservation/promotion of culture and indigenous knowledge; human capital, education, skills, values; role of knowledge for economic growth, social development, cultural enrichment, political empowerment; poverty eradication, universal primary education, gender equality.", priority: 1 },
        { name: "Rural Upliftment through S&T", tags: [{l:"DEGREE",k:"degree"}], desc: "Advanced rural infrastructure — physical, electronic, knowledge, economic connectivity; regional-language usage in ICT; horticulture (hybrid seed production, fruit/vegetable processing/packaging/marketing); agro-food processing (village clusters, food storage/processing/packaging/marketing); biofuel cultivation and extraction; scientific water harvesting.", priority: 1 }
      ]
    },
    {
      id: "mains-gs3-lifescience", exam: "kas-mains", paper: "General Studies III",
      title: "Natural, Life, Agricultural Sciences & Health",
      meta: "Section II — 7 units",
      topics: [
        { name: "Natural Science — Plants, Animals, Microorganisms", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Crop plants, forest species, medicinal/aromatic plants, their usefulness, photosynthesis, transpiration, harmful plants; common classification of domestic/wild animals and their usefulness; common bacteria, virus, fungi and their beneficial/harmful effects.", priority: 1 },
        { name: "Agriculture Science", tags: [{l:"DEGREE",k:"degree"}], desc: "Agriculture's importance in the national/state economy; crop production and protection; chemical fertilizers and vermicompost; cost-benefit/investment analysis of agri-enterprises; production/productivity programmes — green, white, yellow, blue revolutions; organic farming and farm mechanization; farming systems and sustainability; agro-processing and agro-based industries; post-harvest technology and value addition; land/water resource management.", priority: 2 },
        { name: "Horticulture", tags: [{l:"DEGREE",k:"degree"}], desc: "Importance of horticulture — floriculture, vegetables, fruits, plantation crops, spices, aromatic/medicinal plants; hi-tech horticulture (green/poly-house cultivation); post-harvest management and value addition; special promotional programmes for horticulture.", priority: 1 },
        { name: "Sericulture in Karnataka", tags: [{l:"DEGREE",k:"degree"}], desc: "Importance of sericulture in India and Karnataka specifically; distribution of mulberry and non-mulberry sericulture (area, production, productivity across states); cocoon production.", priority: 2, karnataka: true },
        { name: "Biotechnology", tags: [{l:"12",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Concept of biotechnology; genetic engineering and stem-cell research; molecular breeding and marker-assisted selection; transgenic (GM) plants and their beneficial/harmful environmental effects; biotechnology in agriculture (bio-fertilizers, bio-pesticides, bio-fuels, tissue culture, cloning); food biotechnology, food safety/microbial/quality standards, food laws and regulations.", priority: 2 },
        { name: "Animal Husbandry (Veterinary, Dairy, Fishery Sciences)", tags: [{l:"DEGREE",k:"degree"}], desc: "Importance of livestock in national/state economy; important exotic/Indian breeds of cattle, buffalo, sheep, goat, swine, poultry; milk production management and dairy cooperative unions (AMUL, KMF) and their rural-economy role; fisheries resources — marine, EEZ, coastal aquaculture/mariculture, inland water resources, responsible fishing, ornamental fish; value addition and quality control of livestock products.", priority: 2, karnataka: true },
        { name: "Agricultural Development Policies, Programmes & Trade", tags: [{l:"DEGREE",k:"degree"}], desc: "National/Karnataka agricultural policies; Agricultural Price Policy; National Seed Policy; Agricultural Credit Policy; National Agricultural Research System (NARS); farmers' welfare programmes; farm women development programmes; agriculture under Five-Year Plans; agricultural marketing infrastructure (grading, standardization); Crop Insurance Schemes — NAIS, WBCIS; food security; National Watershed Development Programme; export potential of agri-horti-livestock; commercialization/globalization of agriculture (WTO, Agreement on Agriculture).", priority: 2 },
        { name: "Health & Hygiene", tags: [{l:"10",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Human digestive, circulatory, respiratory, excretory, reproductive systems; Allopathic and Indian Systems of Medicine (AYUSH), Naturopathy, Yoga; NRHM, National HIV Programme, Tuberculosis Programme, Preventive & Social Medicine; communicable/epidemic/endemic/vector-borne diseases; infections — gastroenteritis, cholera, TB, malaria, viral infections, HIV, encephalitis, chikungunya, bird flu, dengue and their prevention; vaccines and immunity basics — DPT, rabies, hepatitis vaccine production; immunological diagnosis methods; health awareness programmes.", priority: 2 }
      ]
    },
    {
      id: "mains-gs3-environment", exam: "kas-mains", paper: "General Studies III",
      title: "Environment & Ecology — Challenges of Development",
      meta: "Section III — 6 units",
      topics: [
        { name: "Forest & Wildlife Conservation", tags: [{l:"12",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Promotion/protection — forest conservation, Protection of Wild Life, Project Tiger, National Parks and Sanctuaries; impact of mining on forest/environment; Red Data Book endangered species; eco-tourism.", priority: 2, relatedTo: "p2-environment" },
        { name: "Natural Resource Management", tags: [{l:"DEGREE",k:"degree"}], desc: "Forest types and conservation of forest resources; water resources — flood/drought occurrence, water resource management; land resources; rainwater harvesting; infrastructure development (dams, roads, rails, bridges, industry, urbanization, wastewater management) and its acquisition/rehabilitation/human-intervention issues.", priority: 2 },
        { name: "Ecosystem & Biodiversity", tags: [{l:"7",k:"ncert"},{l:"12",k:"ncert"}], desc: "Basic concepts of ecology, ecosystem, food chain; biodiversity and its conservation; biodiversity hotspots; threats to diversity; sustainable forest development and management; IPR (Intellectual Property Rights) as it relates to biodiversity.", priority: 2 },
        { name: "Environmental Pollution & Solid Waste Management", tags: [{l:"DEGREE",k:"degree"}], desc: "Air, water, soil, noise pollution and remedies; solid waste management types, factors affecting generation, impact, recycling/reuse; Environment Protection Act; Air (Prevention & Control of Pollution) Act; Water (Prevention & Control of Pollution) Act; Water Pollution Cess Act.", priority: 2 },
        { name: "IT's Role in Environment & Human Health", tags: [{l:"DEGREE",k:"degree"}], desc: "Global environmental issues — climate change, acid rain, global warming; wasteland reclamation; watershed management and the watershed approach to sustainable development; linking of rivers; water crisis.", priority: 1 },
        { name: "Community Interface & Disaster Management", tags: [{l:"DEGREE",k:"degree"}], desc: "State-community/civil-society interface; joint forest management (community participation); development, displacement, rehabilitation; disaster management; sustainable forest development; flood, earthquake, drought, tsunami; global warming — ozone layer, CFCs, carbon credit.", priority: 2 }
      ]
    },
    {
      id: "mains-gs4-ethics", exam: "kas-mains", paper: "General Studies IV",
      title: "Ethics, Integrity & Aptitude",
      meta: "Sections I–III",
      topics: [
        { name: "Essence & Dimensions of Ethics", tags: [{l:"DEGREE",k:"degree"}], desc: "Essence, determinants and consequences of ethics in human action; dimensions of ethics; ethics in private and public relationships.", priority: 2 },
        { name: "Ethics in Public Administration", tags: [{l:"DEGREE",k:"degree"}], desc: "Status and problems of ethics in public administration; ethical dilemmas in government/private institutions; laws, rules, regulations, and conscience as sources of ethical guidance.", priority: 2 },
        { name: "Accountability & Ethical Governance", tags: [{l:"DEGREE",k:"degree"}], desc: "Accountability and ethical governance; strengthening ethical/moral values in governance; ethical issues in international relations and funding; corporate governance.", priority: 2 },
        { name: "Public Service, RTI & Codes of Conduct", tags: [{l:"DEGREE",k:"degree"}], desc: "Concept of public service; philosophical basis of governance; information sharing and transparency in government; Right to Information; codes of ethics/conduct; citizen charters; work culture; quality of service delivery; utilization of public funds; challenges of corruption.", priority: 2 },
        { name: "Human Values from Great Leaders", tags: [{l:"DEGREE",k:"degree"}], desc: "Lessons from the lives and teachings of great leaders, reformers, administrators; role of family, society, and educational institutions in inculcating values.", priority: 1 },
        { name: "Integrity", tags: [{l:"DEGREE",k:"degree"}], desc: "Integrity, impartiality and non-partisanship; objectivity; dedication to public service; empathy, tolerance and compassion toward weaker sections.", priority: 2 },
        { name: "Aptitude & Foundational Values for Civil Service", tags: [{l:"DEGREE",k:"degree"}], desc: "Content, structure, function of attitude and its relation with thoughts/behaviour; moral and political attitudes; social influence and persuasion; emotional intelligence and its application in administration/governance.", priority: 2 },
        { name: "Moral Thinkers & Case Studies", tags: [{l:"DEGREE",k:"degree"}], desc: "Contributions of moral thinkers from India and the world; case studies applying the above ethics/integrity/aptitude concepts to administrative situations.", priority: 2 }
      ]
    }
  ],
  keaDegree: [
    {
      id: "kea-deg-p1-gk", exam: "kea-degree", paper: "Paper 1",
      title: "General Knowledge",
      meta: "100 questions, 100 marks, 2 hours",
      topics: [
        { name: "Current Events", desc: "National current affairs (govt decisions, institutions/programmes, appointments, reports/indices/surveys, awards, books/authors, sports, national days), international current affairs (events, organisations, summits, agreements, economic/environmental developments, S&T), Karnataka current affairs (schemes, appointments, budget/policy, infrastructure projects, social/economic/environmental issues), and current-affairs revision (last 12-18 months, linking to static GK, scheme objective/target-group/agency/features).", isCurrentAffairs: true },
        { name: "Physics — Everyday Principles", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Motion, force and work; energy and power; heat and temperature; light; sound; electricity; magnetism; basic electronics; everyday applications of physics.", priority: 1, syncGroup: "SG4" },
        { name: "Chemistry — Everyday Principles", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Matter and its properties; elements, compounds, mixtures; atoms and molecules; acids, bases, salts; metals and non-metals; chemical reactions; everyday chemicals; water, air and pollution; basic environmental chemistry.", priority: 1, syncGroup: "SG4" },
        { name: "Biology — Everyday Principles", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Cell and basic cell functions; human body systems; nutrition and digestion; respiration and circulation; diseases and prevention; immunity and vaccines; reproduction basics; genetics basics; plants and photosynthesis; ecology and biodiversity.", priority: 1, syncGroup: "SG4" },
        { name: "Science & Technology Awareness", tags: [{l:"CA",k:"ca"}], desc: "Space and satellites; biotechnology; information technology; artificial intelligence basics; emerging technologies; important Indian scientific institutions and achievements.", priority: 2 },
        { name: "Everyday Science", tags: [{l:"DEGREE",k:"degree"}], desc: "Scientific explanations of common phenomena; health and hygiene; food and nutrition; household science; basic environmental awareness.", priority: 1 },
        { name: "Physical Geography", tags: [{l:"6",k:"ncert"},{l:"11",k:"ncert"}], desc: "Earth structure; latitude and longitude; rotation and revolution; seasons; atmosphere; weather and climate; winds and rainfall; rivers and drainage; mountains, plateaus, plains; soils; natural vegetation.", priority: 1 },
        { name: "Indian Geography", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Physical divisions of India; major rivers; climate and monsoon; soil types; agriculture; mineral resources; forests and wildlife; industries; population and settlements; transport and communication.", priority: 2, relatedTo: "p1-geo-world-india" },
        { name: "Karnataka Geography", tags: [{l:"DEGREE",k:"degree"}], desc: "Location and boundaries; physiographic divisions; Western Ghats; Malnad; Bayaluseeme; Coastal Karnataka/Karavali; major rivers and tributaries; dams and irrigation projects; climate and rainfall; soil types; crops and agricultural regions; forests and wildlife; minerals and natural resources; major industries; districts and administrative divisions.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-geo-karnataka" },
        { name: "Indian Society — Structure & Diversity", tags: [{l:"DEGREE",k:"degree"}], desc: "Social structure; diversity; caste, tribes and communities; rural and urban society; social change; education and social development; women and child-related issues; poverty and inequality.", priority: 1 },
        { name: "Society & Development", tags: [{l:"DEGREE",k:"degree"}], desc: "Population; migration; urbanisation; employment; health and education; social welfare; inclusion and development.", priority: 1 },
        { name: "Karnataka Society", tags: [{l:"DEGREE",k:"degree"}], desc: "Social and cultural diversity; major communities and social institutions; rural society; urbanisation; social reform movements; education and social development; important social issues of Karnataka.", priority: 2, karnataka: true },
        { name: "Indian Society and its Dynamics", tags: [{l:"DEGREE",k:"degree"}], desc: "Social institutions; family and marriage; community; social stratification; social mobility; rural/urban transformation; industrialisation; urbanisation; globalisation's social effects; demographic changes; women/children/vulnerable groups; social justice; education and health; poverty and unemployment; social welfare and inclusion.", priority: 1 },
        { name: "Ancient India", tags: [{l:"6",k:"ncert"}], desc: "Indus Valley Civilisation; Vedic period; Buddhism and Jainism; Mauryan Empire; Gupta period; ancient culture, literature and science.", priority: 2, relatedTo: "p1-history-ancient" },
        { name: "Medieval India", tags: [{l:"7",k:"ncert"}], desc: "Major dynasties; Delhi Sultanate; Vijayanagara Empire; Bahmani Kingdom; Mughal period; Bhakti and Sufi movements; medieval art, architecture, culture.", priority: 2, relatedTo: "p1-history-medieval" },
        { name: "Modern India", tags: [{l:"8",k:"ncert"},{l:"10",k:"ncert"}], desc: "European expansion; British rule; economic and administrative changes; Revolt of 1857; social and religious reform movements; Indian National Congress; freedom movement; Gandhian movements; constitutional developments; Independence and integration.", priority: 3, recurring: true, relatedTo: "p1-history-modern" },
        { name: "Karnataka History", tags: [{l:"DEGREE",k:"degree"}], desc: "Kadambas, Gangas, Chalukyas, Rashtrakutas, Hoysalas, Vijayanagara, Bahmani influence, Mysore Kingdom, Tipu Sultan, Kittur Rani Chennamma, Halagali Bedas, Karnataka freedom movement, Karnataka Unification Movement, Formation of Karnataka (1956).", priority: 3, recurring: true, karnataka: true, highPriority: true, relatedTo: "p1-history-modern",
          studyTargets: ["Halagali Bedas is named in this exam family's source document but not covered at Prelims depth — research this specifically", "The dynasty list (Kadambas through Vijayanagara) plus Tipu Sultan and the 1956 Unification is the same core spine as Prelims's Karnataka History — treat this as reinforcement of what you already know"] },
        { name: "Constitution — Foundations", tags: [{l:"8",k:"ncert"},{l:"11",k:"ncert"}], desc: "Historical background; Constituent Assembly; Preamble; Fundamental Rights; Fundamental Duties; Directive Principles; constitutional amendments; basic structure doctrine.", priority: 2, syncGroup: "SG2" },
        { name: "Union Government", tags: [{l:"11",k:"ncert"}], desc: "President; Vice-President; Prime Minister; Council of Ministers; Parliament; Lok Sabha; Rajya Sabha; Supreme Court.", priority: 2 },
        { name: "State Government", tags: [{l:"11",k:"ncert"}], desc: "Governor; Chief Minister; Council of Ministers; State Legislature; High Court; State administration.", priority: 2 },
        { name: "Federalism", tags: [{l:"11",k:"ncert"}], desc: "Centre-State relations; legislative relations; administrative relations; financial relations; Emergency provisions.", priority: 2 },
        { name: "Public Administration", tags: [{l:"DEGREE",k:"degree"}], desc: "District administration; Secretariat and departmental administration; role of civil servants; public service delivery; accountability and transparency; e-governance; citizen-oriented administration.", priority: 2 },
        { name: "Practical Knowledge", tags: [{l:"SSLC",k:"ssle"}], desc: "Everyday problem solving; basic quantitative awareness; interpretation of simple information; practical application of general knowledge; common administrative situations.", priority: 1 },
        { name: "Mental Ability", tags: [{l:"SSLC",k:"ssle"}], desc: "Number series; alphabet series; analogy; classification; coding-decoding; blood relations; direction sense; ranking/order; odd-one-out; basic logical reasoning; simple arithmetic reasoning; data interpretation basics; syllogism and statement-based reasoning.", priority: 2 },
        { name: "Kannada Language & Literature Heritage", tags: [{l:"DEGREE",k:"degree"}], desc: "Major dynasties' cultural contributions; Kannada language and literature; important Kannada poets and writers; important literary movements; folk traditions; festivals and traditions; art, architecture, sculpture; music and dance traditions; religious/philosophical movements; social reform movements; contributions of major personalities; cultural institutions and heritage sites.", priority: 2, karnataka: true },
        { name: "Land Reforms in Karnataka", tags: [{l:"DEGREE",k:"degree"}], desc: "Land ownership and tenancy; abolition of intermediaries; tenancy reforms; land ceiling; redistribution of land; agricultural land reforms in Karnataka specifically.", priority: 2, karnataka: true },
        { name: "Social Change Post-Independence", tags: [{l:"DEGREE",k:"degree"}], desc: "Education expansion; urbanisation; industrialisation; social reform; women's development; rural transformation; changes in caste and community relations.", priority: 1 },
        { name: "Post-Independence Karnataka", tags: [{l:"DEGREE",k:"degree"}], desc: "State reorganisation; Karnataka Unification; major political/social developments; major development initiatives.", priority: 2, karnataka: true, syncGroup: "SG3" },
        { name: "Karnataka's Economic Structure", tags: [{l:"DEGREE",k:"degree"}], desc: "Primary sector; secondary sector; tertiary/service sector; agriculture; industry; IT and services.", priority: 2, karnataka: true },
        { name: "Karnataka's Economic Strengths", tags: [{l:"DEGREE",k:"degree"}], desc: "IT sector; biotechnology; manufacturing; agriculture; tourism; start-up ecosystem; infrastructure.", priority: 2, karnataka: true },
        { name: "Karnataka's Economic Challenges", tags: [{l:"DEGREE",k:"degree"}], desc: "Regional imbalance; rural poverty; unemployment; agricultural issues; water availability; urban infrastructure; environmental pressures.", priority: 2, karnataka: true },
        { name: "Public Finance Basics", tags: [{l:"12",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "State budget basics; revenue and expenditure; tax and non-tax revenue; fiscal deficit; public debt; welfare expenditure.", priority: 2 },
        { name: "Panchayat Raj — 73rd Amendment", tags: [{l:"8",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "73rd Constitutional Amendment; Gram Panchayat; Taluk Panchayat; Zilla Panchayat; functions and responsibilities; local planning; decentralisation; local finance; Gram Sabha.", priority: 3, recurring: true, syncGroup: "SG1" },
        { name: "Rural Development Schemes", tags: [{l:"DEGREE",k:"degree"}], desc: "MGNREGA; rural housing; rural sanitation; drinking water; livelihood programmes; self-help groups; watershed development; rural infrastructure.", priority: 2 },
        { name: "Rural Cooperatives", tags: [{l:"DEGREE",k:"degree"}], desc: "Cooperative principles; dairy cooperatives; credit cooperatives; Nandini/Karnataka dairy cooperative system; handloom cooperatives; fisheries cooperatives; role in rural employment and income.", priority: 2, karnataka: true },
        { name: "E-Governance & Digital Administration", tags: [{l:"CA",k:"ca"}], desc: "E-governance; digital public services; online government portals; digital records; GIS and mapping in administration; remote sensing applications.", priority: 2 },
        { name: "Digital Identity, Payments & AI in Governance", tags: [{l:"CA",k:"ca"}], desc: "Aadhaar/digital identity concepts; digital payments; data management; artificial intelligence in governance; automation; cybersecurity.", priority: 2 },
        { name: "Technology for Sectoral Administration", tags: [{l:"DEGREE",k:"degree"}], desc: "Technology for agriculture and rural development; technology for health and education; disaster management technology.", priority: 1 },
        { name: "Environmental Pollution & Degradation", tags: [{l:"DEGREE",k:"degree"}], desc: "Air pollution; water pollution; soil degradation; deforestation; biodiversity loss; waste management; climate change.", priority: 1, relatedTo: "p2-environment" },
        { name: "Karnataka's Environmental Issues", tags: [{l:"DEGREE",k:"degree"}], desc: "Western Ghats conservation; forest conservation; river pollution; water scarcity; groundwater depletion; human-wildlife conflict; urban pollution; drought and floods.", priority: 2, karnataka: true, relatedTo: "p2-environment" },
        { name: "Sustainable Development in Karnataka", tags: [{l:"DEGREE",k:"degree"}], desc: "Sustainable agriculture; renewable energy; water conservation; afforestation; waste reduction/recycling; climate adaptation; environmental impact awareness.", priority: 1, karnataka: true }
      ]
    },
    {
      id: "kea-deg-p2-comm", exam: "kea-degree", paper: "Paper 2",
      title: "Communication",
      meta: "100 questions, 100 marks, 2 hours — Kannada 35 · English 35 · Computer 30",
      topics: [
        { name: "Kannada Grammar", tags: [{l:"DEGREE",k:"degree"}], desc: "Sandhi; Samasa; Linga (gender); Vachana (number); Vibhakti Pratyaya (case suffixes); Kriya Padagalu (verbs); Visheshana (adjectives); Karaka; sentence structure; correct grammatical usage.", priority: 2 },
        { name: "Kannada Vocabulary", tags: [{l:"DEGREE",k:"degree"}], desc: "Paryaya Padagalu (synonyms); Viloma Padagalu (antonyms); Gadegalu/Sametegalu (proverbs); Muhavaregalu (idioms); Tadbhava and Tatsama words; word meanings; correct word usage; spelling.", priority: 2 },
        { name: "Kannada Comprehension", tags: [{l:"DEGREE",k:"degree"}], desc: "Passage reading; main idea; supporting details; inference; meaning in context; appropriate title; information extraction.", priority: 2 },
        { name: "Kannada Sentence Skills", tags: [{l:"DEGREE",k:"degree"}], desc: "Sentence formation; sentence correction; fill in the blanks; error identification; rearrangement; correct usage of words.", priority: 1 },
        { name: "Kannada Literature & Culture Basics", tags: [{l:"DEGREE",k:"degree"}], desc: "Major Kannada poets and writers — Kuvempu, Shivaram Karanth, Pampa; major literary works/basic facts; Karnataka literary and cultural heritage; common rural proverbs and expressions.", priority: 1, karnataka: true },
        { name: "English Grammar", tags: [{l:"10",k:"ncert"}], desc: "Parts of speech; tenses; articles; prepositions; subject-verb agreement; active/passive voice; direct/indirect speech; conditionals; conjunctions; pronouns; adjectives/adverbs; sentence structure.", priority: 2 },
        { name: "English Vocabulary", tags: [{l:"10",k:"ncert"}], desc: "Synonyms; antonyms; one-word substitutions; idioms and phrases; phrasal verbs; spelling correction; word usage.", priority: 2 },
        { name: "English Comprehension", tags: [{l:"10",k:"ncert"}], desc: "Short passages; main idea; supporting information; inference; vocabulary in context; title selection.", priority: 2 },
        { name: "English Sentence Improvement", tags: [{l:"10",k:"ncert"}], desc: "Error spotting; sentence correction/improvement; jumbled sentences; rearrangement; cloze tests; fill in the blanks.", priority: 1 },
        { name: "Computer Fundamentals", tags: [{l:"DEGREE",k:"degree"}], desc: "Definition/characteristics/generations/types of computers; hardware and software; input/output devices; CPU; RAM and ROM; HDD and SSD; storage units; system vs application software.", priority: 1 },
        { name: "Operating Systems", tags: [{l:"DEGREE",k:"degree"}], desc: "Basic Windows concepts; desktop and taskbar; File Explorer; file/folder management (copy, move, rename, delete); Control Panel/system settings; Task Manager; basic troubleshooting.", priority: 1 },
        { name: "MS Word", tags: [{l:"DEGREE",k:"degree"}], desc: "Creating/editing documents; formatting; fonts and paragraphs; tables; page setup; headers/footers; find and replace; printing; mail merge.", priority: 1 },
        { name: "MS Excel", tags: [{l:"DEGREE",k:"degree"}], desc: "Workbook/worksheet; rows/columns; cells/ranges; basic formulas — SUM, AVERAGE, MIN/MAX; basic charts; sorting/filtering; basic spreadsheet formatting.", priority: 1 },
        { name: "MS PowerPoint", tags: [{l:"DEGREE",k:"degree"}], desc: "Creating presentations; slides/layouts; text/objects; themes; transitions; basic animations; slide show.", priority: 1 },
        { name: "Internet & Networking", tags: [{l:"DEGREE",k:"degree"}], desc: "Internet basics; WWW; web browsers; search engines; email (compose/send/reply/forward/attachments); URL; HTTP/HTTPS; basic networking concepts.", priority: 1 },
        { name: "Cybersecurity Basics", tags: [{l:"DEGREE",k:"degree"}], desc: "Computer viruses; malware; antivirus; firewall; password security; phishing; social engineering basics; safe browsing; data backup; privacy awareness.", priority: 1 },
        { name: "Miscellaneous Computer Awareness", tags: [{l:"DEGREE",k:"degree"}], desc: "Keyboard shortcuts; common file extensions (.docx, .xlsx, .pptx, .pdf, .jpg/.png); common abbreviations (CPU, RAM, ROM, URL, HTTP, USB, etc.); Digital India basics.", priority: 1 }
      ]
    }
  ],

  // ---------------- KEA PUC LEVEL SYLLABUS ----------------
  keaPuc: [
    {
      id: "kea-puc-p1-gk", exam: "kea-puc", paper: "Paper 1",
      title: "General Knowledge",
      meta: "100 questions, 100 marks, 2 hours",
      topics: [
        { name: "Current Events", desc: "National, international, and Karnataka current affairs; important government schemes; appointments; awards; sports; books and authors; important days; major S&T and environmental developments; important Karnataka government developments.", isCurrentAffairs: true },
        { name: "Everyday Physical & Chemical Phenomena", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Everyday science; common physical phenomena; common chemical reactions.", priority: 1, syncGroup: "SG4" },
        { name: "Human Biology & Health Basics", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Human biology and health basics; food and nutrition; household science.", priority: 1, syncGroup: "SG4" },
        { name: "Environment & Practical Science Application", tags: [{l:"DEGREE",k:"degree"}], desc: "Environment and pollution; technology used in everyday life; practical application of basic scientific knowledge.", priority: 1 },
        { name: "Preamble, Rights & Duties", tags: [{l:"8",k:"ncert"},{l:"11",k:"ncert"}], desc: "Preamble; Fundamental Rights; Fundamental Duties; Directive Principles.", priority: 3, recurring: true, syncGroup: "SG2" },
        { name: "Union Government Basics", tags: [{l:"11",k:"ncert"}], desc: "President; Prime Minister; Parliament; Supreme Court.", priority: 2 },
        { name: "State Government & Elections", tags: [{l:"11",k:"ncert"}], desc: "Governor; Chief Minister; State Legislature; basic Centre-State relations; constitutional amendments; elections and democratic institutions; local government basics.", priority: 2 },
        { name: "Ancient, Medieval & Modern India", tags: [{l:"6",k:"ncert"},{l:"7",k:"ncert"},{l:"8",k:"ncert"}], desc: "Ancient India, Medieval India, Modern India; freedom movement; major personalities; major cultural developments.", priority: 2, relatedTo: "p1-history-modern" },
        { name: "Karnataka Dynasties", tags: [{l:"DEGREE",k:"degree"}], desc: "Kadambas, Gangas, Chalukyas, Rashtrakutas, Hoysalas, Vijayanagara, Bahmani Kingdom, Mysore Kingdom.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-history-medieval" },
        { name: "Tipu Sultan & Kittur Chennamma", tags: [{l:"DEGREE",k:"degree"}], desc: "Tipu Sultan; Kittur Rani Chennamma; Karnataka Unification; important freedom movement events in Karnataka.", priority: 3, recurring: true, karnataka: true, syncGroup: "SG3", relatedTo: "p1-history-modern" },
        { name: "India — Physical Features & Resources", tags: [{l:"9",k:"ncert"},{l:"10",k:"ncert"}], desc: "Physical features; rivers; climate; monsoon; soils; agriculture; minerals; forests; industries; population.", priority: 2, relatedTo: "p1-geo-world-india" },
        { name: "Karnataka — Location, Western Ghats & Coast", tags: [{l:"DEGREE",k:"degree"}], desc: "Location and boundaries; physiographic divisions; Western Ghats; coastal region; Malnad; Bayaluseeme.", priority: 3, recurring: true, karnataka: true, relatedTo: "p1-geo-karnataka" },
        { name: "Karnataka — Rivers, Dams & Districts", tags: [{l:"DEGREE",k:"degree"}], desc: "Major rivers; dams; irrigation; climate; rainfall; soils; agriculture and crops; forests and wildlife; minerals; districts and administrative divisions.", priority: 2, karnataka: true, relatedTo: "p1-geo-karnataka" },
        { name: "Karnataka State Government Structure", tags: [{l:"DEGREE",k:"degree"}], desc: "Governor; Chief Minister; Council of Ministers; State Legislature; district administration; local administration.", priority: 2, karnataka: true },
        { name: "Panchayat Raj Institutions", tags: [{l:"8",k:"ncert"},{l:"DEGREE",k:"degree"}], desc: "Panchayat Raj; Gram Panchayat; Taluk Panchayat; Zilla Panchayat; revenue administration basics; village administration; basic land records concepts; local governance; decentralisation; public service delivery.", priority: 3, recurring: true, karnataka: true, syncGroup: "SG1" },
        { name: "Karnataka Economy", tags: [{l:"DEGREE",k:"degree"}], desc: "Agriculture; industry; services; IT sector; employment; infrastructure; regional development.", priority: 2, karnataka: true },
        { name: "Rural Development Schemes", tags: [{l:"DEGREE",k:"degree"}], desc: "MGNREGA; rural housing; rural sanitation; drinking water; livelihood programmes; self-help groups; watershed development.", priority: 2 },
        { name: "Panchayat Raj Functions & Rural Cooperatives", tags: [{l:"DEGREE",k:"degree"}], desc: "Gram Sabha; Panchayat Raj functions and rural planning; cooperative principles; dairy cooperatives (Nandini); credit cooperatives; handloom and fisheries cooperatives; role in rural development.", priority: 2, karnataka: true },
        { name: "Environmental Problems", tags: [{l:"DEGREE",k:"degree"}], desc: "Air, water and soil pollution; deforestation; biodiversity; wildlife conservation; waste management; climate change.", priority: 1, relatedTo: "p2-environment" },
        { name: "Karnataka Environmental & Development Issues", tags: [{l:"DEGREE",k:"degree"}], desc: "Water scarcity; groundwater depletion; drought; floods; Western Ghats issues; urban environmental problems; sustainable development; renewable energy; water conservation.", priority: 2, karnataka: true, relatedTo: "p2-environment" }
      ]
    },
    {
      id: "kea-puc-p2-comm", exam: "kea-puc", paper: "Paper 2",
      title: "Communication",
      meta: "100 questions, 100 marks, 2 hours — Kannada 35 · English 35 · Computer 30",
      topics: [
        { name: "Basic Kannada Grammar", tags: [{l:"DEGREE",k:"degree"}], desc: "Sandhi; Samasa; Linga; Vachana; Vibhakti; Kriya Padagalu; Visheshana.", priority: 2 },
        { name: "Kannada Vocabulary & Sentence Skills", tags: [{l:"DEGREE",k:"degree"}], desc: "Synonyms; antonyms; proverbs; idioms; Tadbhava/Tatsama words; spelling; sentence correction; fill in the blanks.", priority: 2 },
        { name: "Kannada Comprehension & Culture Basics", tags: [{l:"DEGREE",k:"degree"}], desc: "Comprehension; main idea and inference; basic Kannada literature and culture.", priority: 1, karnataka: true },
        { name: "English Grammar", tags: [{l:"10",k:"ncert"}], desc: "Parts of speech; tenses; articles; prepositions; subject-verb agreement; active/passive voice; direct/indirect speech.", priority: 2 },
        { name: "English Vocabulary", tags: [{l:"10",k:"ncert"}], desc: "Synonyms; antonyms; one-word substitution; idioms and phrases; phrasal verbs; spelling.", priority: 2 },
        { name: "English Comprehension & Sentence Skills", tags: [{l:"10",k:"ncert"}], desc: "Comprehension; error spotting; sentence correction; sentence rearrangement; cloze test; fill in the blanks.", priority: 2 },
        { name: "Computer Fundamentals", tags: [{l:"DEGREE",k:"degree"}], desc: "Hardware; software; CPU; RAM/ROM; storage; input/output devices; operating systems; Windows basics; file and folder management.", priority: 1 },
        { name: "MS Office Suite", tags: [{l:"DEGREE",k:"degree"}], desc: "MS Word; MS Excel; MS PowerPoint — the basic operations of each.", priority: 1 },
        { name: "Internet, Networking & Cybersecurity", tags: [{l:"DEGREE",k:"degree"}], desc: "Internet; WWW; browsers; search engines; email; URL; HTTP/HTTPS; basic networking; viruses and malware; antivirus and firewall; password safety; phishing; data backup.", priority: 1 }
      ]
    }
  ],

  // ---------------- SYNC GROUPS (strict-match only — see planning doc) ----------------
  // Each entry: which topics (by exam + section id + topic name) share one
  // checkbox state. Only genuinely same-depth topics are grouped. Rebuilt
  // after the Sept 2026 content-depth expansion (KAS Mains/KEA Degree/VAO/
  // KEA PUC were split from unit-level cards into real sub-subtopics, so
  // every topicName below is matched against the CURRENT topic names, not
  // the old pre-expansion ones).
  // Rebuilt Oct 2026 after VAO/Land Surveyor were removed from the site.
  // Each group now also carries a `strength` tier so the UI can visually
  // distinguish how widely a topic repeats across the 4 remaining exams:
  //   "strong"   = appears in 3-4 exams (incl. KAS Prelims and/or Mains)
  //   "moderate" = appears in exactly 2 exams (typically KEA Degree + PUC)
  // This replaces a flat list with a priority-ordered one, so the Common
  // Topics view can surface the highest-overlap material first without
  // the user having to infer importance from list position alone.
  syncGroups: {
    "SG1": {
      label: "Panchayati Raj — 73rd Amendment & 3-tier structure",
      strength: "strong",
      members: [
        { exam: "kas-prelims", sectionId: "p1-polity-local", topicName: "73rd & 74th Amendments" },
        { exam: "kas-mains", sectionId: "mains-gs2-constitution", topicName: "Major Constitutional Amendments (in depth)" },
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Panchayat Raj — 73rd Amendment" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Panchayat Raj Institutions" }
      ]
    },
    "SG2": {
      label: "Indian Constitution basics — Preamble, Fundamental Rights, DPSP",
      strength: "strong",
      members: [
        { exam: "kas-prelims", sectionId: "p1-polity-constitutional", topicName: "Fundamental Rights & DPSP" },
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Constitution — Foundations" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Preamble, Rights & Duties" }
      ]
    },
    "SG3": {
      label: "Karnataka Unification (1956)",
      strength: "strong",
      members: [
        { exam: "kas-prelims", sectionId: "p1-history-modern", topicName: "Unification of Karnataka (Ekikarana)" },
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Post-Independence Karnataka" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Tipu Sultan & Kittur Chennamma" }
      ]
    },
    "SG4": {
      label: "Everyday Physics — motion, energy, electricity, magnetism",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Physics — Everyday Principles" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Everyday Physical & Chemical Phenomena" }
      ]
    },
    "SG6": {
      label: "Everyday Biology & Health — body systems, nutrition, disease",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Biology — Everyday Principles" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Human Biology & Health Basics" }
      ]
    },
    "SG7": {
      label: "Karnataka Geography — Western Ghats, Malnad, Bayaluseeme, Coastal",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Karnataka Geography" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Karnataka — Location, Western Ghats & Coast" }
      ]
    },
    "SG8": {
      label: "Karnataka Dynasties — Kadambas to Vijayanagara",
      strength: "strong",
      members: [
        { exam: "kas-mains", sectionId: "mains-gs1-history", topicName: "Kadambas to Hoysalas — Dynasty Contributions" },
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Karnataka History" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Karnataka Dynasties" }
      ]
    },
    "SG9": {
      label: "Rural Cooperatives — dairy (Nandini/KMF), credit, handloom, fisheries",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Rural Cooperatives" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Panchayat Raj Functions & Rural Cooperatives" }
      ]
    },
    "SG10": {
      label: "Rural Development Schemes — MGNREGA, housing, sanitation, SHGs",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Rural Development Schemes" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Rural Development Schemes" }
      ]
    },
    "SG11": {
      label: "Karnataka's Environmental & Development Issues — Western Ghats, water scarcity",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p1-gk", topicName: "Karnataka's Environmental Issues" },
        { exam: "kea-puc", sectionId: "kea-puc-p1-gk", topicName: "Karnataka Environmental & Development Issues" }
      ]
    },
    "SG12": {
      label: "Computer Fundamentals & Operating Systems",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p2-comm", topicName: "Computer Fundamentals" },
        { exam: "kea-puc", sectionId: "kea-puc-p2-comm", topicName: "Computer Fundamentals" }
      ]
    },
    "SG13": {
      label: "English Grammar basics",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p2-comm", topicName: "English Grammar" },
        { exam: "kea-puc", sectionId: "kea-puc-p2-comm", topicName: "English Grammar" }
      ]
    },
    "SG14": {
      label: "Kannada Grammar basics — Sandhi, Samasa, Linga, Vachana, Vibhakti",
      strength: "moderate",
      members: [
        { exam: "kea-degree", sectionId: "kea-deg-p2-comm", topicName: "Kannada Grammar" },
        { exam: "kea-puc", sectionId: "kea-puc-p2-comm", topicName: "Basic Kannada Grammar" }
      ]
    }
  },

  // ---------------- COMMON TOPICS: CROSS-EXAM IMPORTANCE RANKING ----------------
  // Ranked by how many of the 4 current exams (KAS Prelims, KAS Mains,
  // KEA Degree, KEA PUC) share the subject AND how central it is. Rebuilt
  // Oct 2026 after VAO/Land Surveyor were removed from the site.
  commonTopicsRanking: [
    {
      subject: "Polity & Constitution", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Universal across all 4 exams — Preamble/FR/DPSP basics are the common core; KAS Mains goes far deeper (reasonable restrictions, case law, delegated legislation)."
    },
    {
      subject: "Karnataka History & Freedom Movement", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Universal across all 4. Depth varies hugely: KAS Mains devotes 3 full units to it; KEA Degree/PUC expect fact-level recall only."
    },
    {
      subject: "Karnataka Geography", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Universal across all 4. KAS Mains and Prelims expect more analytical depth (agro-climatic zones, GIS); KEA Degree/PUC expect factual recall (rivers, districts, physiography)."
    },
    {
      subject: "Panchayati Raj & Rural Development", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Universal, and directly sync-grouped (SG1, strength: strong) across all 4 — genuinely one syllabus to learn once."
    },
    {
      subject: "Current Affairs (National + International + Karnataka)", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Universal category, but not a fixed topic list in any exam — tracked live, same method works for all four."
    },
    {
      subject: "Karnataka Economy", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Present in all 4, though KEA Degree/PUC treat it as a single consolidated overview while Prelims/Mains split it into distinct Economy sub-topics."
    },
    {
      subject: "Environment & Ecology", examCount: 4,
      exams: ["kas-prelims", "kas-mains", "kea-degree", "kea-puc"],
      note: "Universal. KAS Mains treats it as a full 6-unit section — far deeper than KEA Degree/PUC's single overview topic."
    },
    {
      subject: "Everyday Science (Physics/Chemistry/Biology)", examCount: 3,
      exams: ["kas-prelims", "kea-degree", "kea-puc"],
      note: "Sync-grouped (SG4/SG6, strength: moderate) between KEA Degree and KEA PUC at matching depth. KAS Prelims Sci&Tech goes a notch more specific/current-affairs-linked, so it's related but not strict-synced."
    },
    {
      subject: "General Mental Ability / Reasoning", examCount: 2,
      exams: ["kas-prelims", "kea-degree"],
      note: "KAS Prelims and KEA Degree both test reasoning/numeracy at similar SSLC-adjacent difficulty. KAS Mains replaces this with a data-interpretation unit inside GS1 instead; KEA PUC's GK paper doesn't carry a dedicated mental-ability section."
    },
    {
      subject: "Kannada & English Language", examCount: 3,
      exams: ["kas-mains", "kea-degree", "kea-puc"],
      note: "KAS Mains treats Kannada/English as full qualifying papers (150 marks each); KEA Degree/PUC treat them as one MCQ section within Paper 2 — same subject, very different format and stakes."
    },
    {
      subject: "Computer Knowledge", examCount: 2,
      exams: ["kea-degree", "kea-puc"],
      note: "Present only in KEA Degree/PUC's Paper 2 (Communication) as an MCQ section — not part of KAS Prelims or Mains syllabus at all."
    }
  ]
};
