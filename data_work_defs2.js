/* FCA & Innovation mode, batch 2: deeper coverage of digital assets, payments & fintech,
   AWS & cloud — plus the new AI & Emerging Tech topic. Definitions only, same format as
   everything else. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  var R = (window.DEFRANK = window.DEFRANK || {});
  function nk(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function def(qk, rank, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1; R[nk(name)] = rank;
  }

  /* ===== Digital Assets & Smart Contracts (wcrypto) — 8 more ===== */

  def("wcrypto", 2,
    "What is the difference between a public (permissionless) and a permissioned blockchain?",
    "Anyone can join and validate on a public chain; a permissioned one admits approved parties only.",
    ["Public chains are free to use while permissioned chains charge a subscription fee for every transaction made.",
     "Public chains are operated by governments while permissioned chains are always operated by private companies.",
     "Public chains give validators legal accountability while permissioned chains keep them anonymous.",
     "Public chains encrypt their contents while permissioned chains keep all records in readable plain text."],
    "Public vs permissioned chains",
    "Bitcoin and Ethereum are permissionless — open participation, pseudonymous validators. Permissioned DLT (known, vetted participants) is what regulated finance mostly builds on for settlement and record-keeping.",
    "The split drives the risk profile: permissionless chains raise questions about accountability and governance; permissioned ones look more like conventional shared infrastructure with identifiable operators.",
    "An open public square versus a members-only club running the same kind of ledger.");

  def("wcrypto", 2,
    "What are gas fees?",
    "The transaction fees paid to have operations executed and recorded on a blockchain like Ethereum.",
    ["The premium charged by exchanges for converting between different cryptoassets at peak trading times.",
     "The energy surcharge that data centres add to the electricity bills of cryptocurrency mining firms.",
     "The annual licence cost of running a validating node on a permissioned enterprise blockchain network.",
     "The interest that decentralised lending protocols charge borrowers for short-term cryptoasset loans."],
    "Gas fees",
    "Every on-chain operation consumes 'gas' priced by network demand: simple transfers cost little, complex smart-contract calls more. Fees pay validators and ration scarce block space.",
    "Volatile fees matter practically — they can make small payments uneconomic and spike during congestion, which is one driver of layer-2 networks and a real consumer-cost consideration.",
    "The postage stamp for getting your transaction into the shared ledger — priced by rush hour.");

  def("wcrypto", 2,
    "What is a layer-2 network?",
    "A network above a blockchain that processes transactions off-chain, settling back for security.",
    ["The second version of a blockchain released after its original protocol has been retired from service.",
     "The backup blockchain that takes over automatically whenever the primary network suffers an outage.",
     "The network tier reserved for institutional participants who require higher transaction privacy.",
     "A sidechain with its own validators, whose security is independent of the main chain."],
    "Layer 2",
    "Rollups and payment channels batch many transactions off-chain, then anchor the results to the main chain (layer 1) — inheriting its security while multiplying throughput and cutting fees.",
    "Scaling is the binding constraint on public-chain payments, so layer 2 is where much real payments innovation happens — and where new custody and bridging risks concentrate.",
    "The express lanes built above the motorway, merging back down to settle.");

  def("wcrypto", 2,
    "What is staking in proof-of-stake systems?",
    "Locking tokens as collateral to validate the network, for rewards and penalties.",
    ["Depositing cryptoassets with an exchange in return for a fixed rate of interest paid monthly.",
     "Betting on the future price of a token through a decentralised derivatives protocol.",
     "Locking tokens in a liquidity pool to earn a share of a protocol's trading fees.",
     "Validators depositing fiat collateral with the network's foundation before running a node."],
    "Staking",
    "Validators lock tokens to earn the right to propose and attest blocks; honest work earns yield, misbehaviour gets 'slashed'. Staking-as-a-service lets ordinary holders delegate to professionals.",
    "The consumer-facing version — 'earn 5% on your crypto' — raises familiar regulatory questions: is it a collective investment? What happens to staked assets in an insolvency?",
    "Post a bond, do the network's paperwork, earn a wage — cheat and lose the bond.");

  def("wcrypto", 2,
    "What is a DAO (decentralised autonomous organisation)?",
    "An organisation run by smart contracts and token-holder votes rather than directors.",
    ["A regulated fund structure that invests exclusively in a diversified basket of digital assets.",
     "The industry trade body that represents cryptoasset exchanges in discussions with regulators.",
     "An algorithmic trading firm whose strategies are executed without any human supervision.",
     "A protocol whose parameters adjust automatically by algorithm, with no votes at all."],
    "DAO",
    "Treasury, rules and decisions live on-chain; governance-token holders vote proposals in or out. In practice, voting power often concentrates and legal personality is unclear.",
    "The legal puzzle is the point for regulators: who is liable when a DAO's protocol fails consumers? Some jurisdictions now offer DAO legal wrappers; most activity remains legally ambiguous.",
    "A company whose rulebook is code and whose board is everyone holding the voting tokens.");

  def("wcrypto", 2,
    "What is a cross-chain bridge?",
    "Infrastructure that moves value between chains by locking assets and issuing equivalents.",
    ["A regulatory agreement that lets exchanges operate across multiple national jurisdictions at once.",
     "An exchange that swaps tokens between chains by matching buyers and sellers on its own books.",
     "A standard document format for reporting cryptoasset holdings across different tax regimes.",
     "A protocol feature letting one chain read another's state directly, without locking any assets."],
    "Cross-chain bridge",
    "Chains can't talk natively; bridges lock tokens on chain A and mint wrapped versions on chain B. They concentrate enormous value in single contracts.",
    "Bridges are crypto's bank vaults — several of the largest hacks in history were bridge exploits — making them a fixture in any risk assessment of multi-chain activity.",
    "The currency-exchange kiosk between two different ledgers — and a favourite target for robbers.");

  def("wcrypto", 1,
    "What is the FCA's financial promotions regime as applied to cryptoassets?",
    "Rules requiring crypto marketing to be fair, clear, risk-warned and approved by authorised firms.",
    ["A ban preventing any cryptoasset firm from advertising its services anywhere within the United Kingdom.",
     "A voluntary industry code of conduct that exchanges may choose to adopt for their advertising.",
     "The requirement that all crypto adverts be pre-cleared individually by the Advertising Standards Authority.",
     "Rules applying only to promotions of security tokens, leaving exchange tokens out of scope."],
    "Crypto financial promotions",
    "Since 2023, qualifying cryptoasset promotions fall under the s21 regime: risk warnings, 24-hour cooling-off for first-time investors, no refer-a-friend bonuses, and a legitimate route to communicate.",
    "It is the sharpest live example of the perimeter reaching crypto: marketing was pulled into regulation ahead of the full regime, and non-compliant firms face the illegal-promotions gateway.",
    "Crypto ads must now play by financial-marketing rules: clear risks, no hype, authorised sign-off.");

  def("wcrypto", 2,
    "What is the Travel Rule in crypto compliance?",
    "The rule that cryptoasset transfers must carry sender and recipient identity between firms.",
    ["The rule that cryptoasset businesses must notify regulators before relocating their operations abroad.",
     "A limit on how much cryptoasset value an individual may carry across borders without declaring it.",
     "The AML rule that exchanges must verify identity once cumulative transfers pass a threshold.",
     "The FATF rule that exchanges must hold licences in every jurisdiction their customers live in."],
    "Travel Rule",
    "The wire-transfer information-sharing rule (FATF Recommendation 16) extended to cryptoassets: originator and beneficiary details must 'travel' with transfers between exchanges and custodians.",
    "It is where AML meets crypto's pseudonymity head-on — technically awkward (chains carry no identity fields), and central to making exchange-to-exchange flows traceable.",
    "The parcel must carry a sender and recipient label, even when the postal service is a blockchain.");

  /* ===== Payments & Fintech (wpay) — 10 more ===== */

  def("wpay", 2,
    "What is the difference between clearing and settlement?",
    "Clearing works out who owes what; settlement actually moves the money.",
    ["Clearing removes fraudulent transactions while settlement processes the legitimate ones that remain.",
     "Settlement works out the net positions while clearing transfers the funds between accounts.",
     "Settlement calculates the fees due to intermediaries while clearing distributes them to each party.",
     "Two names for the same step, used by UK and US systems respectively."],
    "Clearing vs settlement",
    "Clearing exchanges and reconciles payment instructions (often netting many into few); settlement moves the money, typically across accounts at the Bank of England for systemic UK systems.",
    "The gap between them is where risk lives — a bank can fail after clearing but before settlement — which is why settlement finality, netting arrangements and central bank money matter so much.",
    "First the maths of who owes whom; then the money actually moves.");

  def("wpay", 2,
    "What is Confirmation of Payee (CoP)?",
    "The name-check that warns when the recipient name doesn't match the account.",
    ["The receipt a bank must issue within one hour of any Faster Payments transfer completing.",
     "The requirement that both parties to a payment approve it in their banking apps before it executes.",
     "A register of verified business account holders that consumers can search before paying invoices.",
     "The overnight validation of sort codes and account numbers that rejects invalid details."],
    "Confirmation of Payee",
    "Before an FPS/CHAPS payment, the payer's bank queries the recipient's bank: full match, close match ('did you mean J Smith?'), or no match — a friction aimed squarely at APP fraud and misdirected payments.",
    "CoP is the flagship example of fraud prevention built into the rails themselves, and its rollout (now mandated broadly) shows the regulator using infrastructure, not just rules, to protect consumers.",
    "The 'are you sure this is really Dave?' check before the money leaves.");

  def("wpay", 2,
    "What is account-to-account (A2A) payment?",
    "Paying directly from one bank account to another, bypassing the card networks.",
    ["A transfer between two accounts held by the same customer at the same retail bank.",
     "The overnight sweep that moves a merchant's card takings from the acquirer to their account.",
     "A corporate treasury technique for pooling balances across subsidiary company accounts.",
     "Card payments where funds settle straight to the merchant's account on the same day."],
    "A2A (account-to-account) payments",
    "Pay-by-bank at checkout: a PISP initiates an instant transfer over Faster Payments, with no interchange, no card scheme, and bank-grade authentication.",
    "A2A is the card networks' structural challenger — cheaper for merchants, instant for settlement — and its consumer-protection gap versus cards (no chargeback regime) is a live policy debate.",
    "Checkout that moves money bank-to-bank, cutting the card networks out of the journey.");

  def("wpay", 2,
    "What is a chargeback?",
    "The card-scheme process for reversing a disputed transaction via the issuer.",
    ["The monthly fee an acquirer charges merchants for each card terminal they operate in store.",
     "A penalty the card scheme imposes on issuers whose fraud rates exceed the permitted threshold.",
     "The interest a credit-card issuer backdates when a customer misses their minimum payment.",
     "The Section 75 protection making credit providers jointly liable for faulty purchases."],
    "Chargeback",
    "Cardholders dispute (fraud, non-delivery, defects); the issuer claws funds back through the scheme, with evidence rules and deadlines. Merchants with high chargeback rates face fines and termination.",
    "Chargebacks are the cards' consumer-protection superpower — and precisely what A2A payments lack — so 'who protects the payer when things go wrong?' differs sharply by rail.",
    "The card system's undo button, wielded by the customer's bank.");

  def("wpay", 1,
    "What is safeguarding in the payments context?",
    "The rule that payment firms keep customer funds separate and protected, never their own.",
    ["The physical security standards that protect card-printing facilities and cash-handling centres.",
     "The FSCS protection compensating e-money customers up to £85,000 if the firm fails.",
     "The vetting process for employees who have access to customers' payment credentials.",
     "The capital buffer payment firms must hold in proportion to their customer balances."],
    "Safeguarding",
    "Relevant funds must sit in designated accounts at credit institutions (or be insured), reconciled daily, so that if the firm fails, customer money comes back — imperfectly, in practice, and slowly.",
    "Safeguarding is THE prudential question for EMIs and payment institutions — audits repeatedly find weaknesses, insolvency practice shows shortfalls and delays, and reform of the regime is a live workstream.",
    "Customer money in a locked, labelled box — not mixed into the company's till.");

  def("wpay", 2,
    "What is Banking-as-a-Service (BaaS)?",
    "Licensed banks renting out their regulated capabilities to other brands via APIs.",
    ["The outsourcing of a bank's IT helpdesk and infrastructure maintenance to cloud providers.",
     "Government-run basic bank accounts provided as a public service to financially excluded customers.",
     "The subscription pricing model under which challenger banks charge for premium features.",
     "Fintechs building their own core banking software and licensing it to established banks."],
    "Banking-as-a-Service",
    "A retailer or fintech embeds accounts and cards under its own brand; underneath, a licensed bank (or EMI) holds the regulatory permissions and the funds.",
    "BaaS chains blur accountability — who does KYC, who monitors transactions, whose customer is it? Regulatory attention on 'agent' oversight and BaaS partner-bank risk has sharpened accordingly.",
    "Banks selling their licence-backed machinery wholesale, for other brands to wear.");

  def("wpay", 2,
    "What is embedded finance?",
    "Financial products woven invisibly into non-financial journeys.",
    ["The mandatory financial-education content that banking apps must display to younger customers.",
     "Retailers becoming authorised banks so they can hold their customers' deposits directly.",
     "The pre-installed banking apps that phone manufacturers include on new devices.",
     "White-label banking apps that fintechs rebrand and sell on to smaller banks."],
    "Embedded finance",
    "The product finds you mid-journey: BNPL at the basket, insurance with the flight, working-capital loans inside the seller dashboard — powered by BaaS and APIs underneath.",
    "Distribution shifts to unregulated brands while the regulated entity recedes from view — good for friction, hard for disclosure, and a perimeter-visibility challenge supervision is still digesting.",
    "Finance that appears inside whatever else you were doing, exactly when relevant.");

  def("wpay", 2,
    "What is ISO 20022?",
    "The modern payments messaging standard, carrying rich structured data.",
    ["The secure interbank network over which cross-border payment instructions travel.",
     "The international sanctions list that all cross-border payments must be screened against.",
     "The maximum settlement time permitted for cross-border payments between member countries.",
     "The international account-number format that identifies any bank account worldwide."],
    "ISO 20022",
    "The successor to legacy formats (like MT messages): structured, data-rich payment messages — who, why, what for — adopted by CHAPS, SWIFT and payment systems worldwide.",
    "Richer data is an innovation substrate: better fraud detection, automated reconciliation, and analytics — one reason regulators care about a seemingly dry messaging migration.",
    "Payments learning to carry a proper, machine-readable paper trail instead of a scribbled note.");

  def("wpay", 1,
    "Who is the Payment Systems Regulator (PSR) and how does it differ from the FCA?",
    "The PSR regulates payment systems; the FCA regulates the firms and their conduct.",
    ["The PSR is the FCA's internal payments division, operating under the same board and chief executive.",
     "The PSR supervises card networks only, while the FCA is responsible for every bank transfer system.",
     "The PSR authorises payment firms while the FCA oversees the systems they use.",
     "The PSR is the industry-funded ombudsman that adjudicates disputes between rival payment firms."],
    "PSR vs FCA",
    "The PSR (a separate regulator, FCA-housed) oversees the systems — Faster Payments, Bacs, cards — focusing on access, competition and innovation; the FCA authorises and supervises the participating firms. (Government has announced plans to consolidate the PSR into the FCA.)",
    "Knowing which regulator owns which lever explains the landscape: APP-fraud reimbursement came from the PSR; safeguarding and conduct from the FCA — one payment, several rulebooks.",
    "One watches the plumbing, the other watches the plumbers.");

  def("wpay", 2,
    "What is a digital wallet (like Apple Pay or Google Pay)?",
    "An app holding tokenised cards, authorising payments with device authentication.",
    ["A prepaid account operated by a phone manufacturer that replaces your underlying bank entirely.",
     "The folder of loyalty cards and boarding passes that ships preinstalled on smartphones.",
     "An e-money account holding a prepaid balance that funds payments made from the phone.",
     "A stored copy of the full card number kept on the device for offline payments."],
    "Digital (pass-through) wallets",
    "Pass-through wallets store a device-specific token, not your real card number; a tap releases a cryptogram approved by Face ID or fingerprint. The card rails still run the payment underneath.",
    "Wallets concentrate gatekeeping power (fees, access to the NFC chip, default choices) — which is why 'Big Tech in payments' reviews focus on them despite their thin regulatory footprint.",
    "Your card in disguise: the phone hands over a stunt double, never the card itself.");

  /* ===== AWS & Cloud (waws) — 10 more ===== */

  def("waws", 2,
    "What is Amazon CloudWatch?",
    "AWS's monitoring service: metrics, logs and alarms for the whole account.",
    ["The dashboard showing service outages and incident history across AWS itself.",
     "The audit trail recording which user made each change in the account.",
     "A compliance dashboard where regulators can view a firm's cloud configuration.",
     "The countdown timer that shows when a spot instance will be reclaimed."],
    "CloudWatch",
    "Every service emits metrics (CPU, latency, errors) and logs into CloudWatch; alarms fire notifications or autoscaling when thresholds break; dashboards make it visible.",
    "Monitoring is where 'it works' becomes 'we know it works' — and for regulated workloads, the evidence trail of alarms and logs is part of operational-resilience expectations.",
    "The control room wall: gauges, logs and alarm bells for your whole cloud estate.");

  def("waws", 2,
    "What is Amazon RDS?",
    "AWS's managed relational database service.",
    ["The in-memory cache service that speeds up repeated database queries.",
     "The service that registers and renews internet domain names for AWS customers.",
     "AWS's NoSQL database service for key-value workloads at any scale.",
     "A cache accelerating repeated S3 reads."],
    "RDS (managed relational databases)",
    "You choose the engine and size; AWS handles provisioning, patching, backups, replication and failover. 'Managed' means the undifferentiated heavy lifting moves to the provider.",
    "The managed-vs-self-run choice is the recurring cloud decision — RDS versus a database on your own EC2 — trading control and cost against operations you no longer staff.",
    "A proper SQL database with the maintenance chores included in the rent.");

  def("waws", 2,
    "What is a load balancer?",
    "The distributor spreading requests across instances, routing around unhealthy ones.",
    ["The autoscaling group that adds instances when average CPU crosses a threshold.",
     "The scheduler that balances batch jobs between daytime and overnight processing windows.",
     "A storage device that equalises disk usage across the drives inside one physical server.",
     "The DNS service that routes each user to the nearest healthy region."],
    "Load balancer",
    "The single front door for a fleet: it health-checks targets, spreads requests, and quietly stops sending traffic to failed instances — the basic ingredient of high availability.",
    "Paired with autoscaling (the balancer feeds whatever instances exist right now), it's how cloud systems survive both traffic spikes and individual machine deaths without anyone noticing.",
    "The maître d' seating arrivals across all the open tables — and skipping the broken ones.");

  def("waws", 2,
    "What is a container (as in Docker), and how does it differ from an instance?",
    "A lightweight package of an app plus its dependencies, sharing the host's OS.",
    ["The immutable image from which running copies are launched.",
     "A managed pool of instances that AWS packs containers onto automatically.",
     "A reserved block of S3 storage that keeps one application's files isolated from others.",
     "A stricter type of virtual machine that boots its own operating system for every app."],
    "Containers vs instances",
    "An instance virtualises hardware (its own OS, minutes to start); a container virtualises just the app environment (shares the host kernel, starts in seconds, 'runs the same everywhere').",
    "Containers are how modern software ships — reproducible environments, dense packing, fast scaling — and AWS's ECS/EKS exist to run fleets of them; SageMaker training jobs are containers too.",
    "Not a whole house per app — just a sealed lunchbox, dozens to a kitchen.");

  def("waws", 2,
    "What is Kubernetes (and AWS's EKS)?",
    "The orchestrator that runs containers across a fleet.",
    ["The runtime that builds and runs individual containers on a single machine.",
     "The certification scheme for engineers who administer large cloud environments.",
     "AWS's proprietary hypervisor that isolates customer instances from each other.",
     "The registry where container images are stored and versioned."],
    "Kubernetes / EKS",
    "Declare the desired state — 'six copies of this container, this much CPU each' — and Kubernetes places them on machines, restarts failures, and scales the count; EKS runs the control plane for you.",
    "It's the de-facto operating system of modern platforms (and of many ML-serving stacks); knowing the word decodes half of contemporary architecture diagrams.",
    "The depot manager for containers: keeps the right number running, replaces casualties, finds space.");

  def("waws", 2,
    "What is Infrastructure as Code (e.g. Terraform, CloudFormation)?",
    "Defining cloud resources in version-controlled files that build the environment.",
    ["Writing application code directly on production servers instead of a development laptop.",
     "The licensing requirement that cloud infrastructure vendors publish their source code.",
     "Managing servers by logging in and applying changes by hand, documented afterwards.",
     "Container images that bundle the whole environment so servers never need configuring."],
    "Infrastructure as Code (IaC)",
    "The whole stack — VPCs, instances, buckets, permissions — described declaratively in files; apply the files and the environment exists, identically, every time.",
    "IaC is what makes environments reproducible, reviewable (a pull request shows exactly what will change) and auditable — the change-control story regulators like, and the antidote to console-click archaeology.",
    "The building's blueprints in git — run them and the building assembles itself.");

  def("waws", 2,
    "What are AWS Glue and Athena, in the data-lake picture?",
    "Glue catalogues and transforms S3 data; Athena runs SQL over it in place.",
    ["Glue streams events between services while Athena stores them in a searchable index.",
     "Glue is the data warehouse and Athena the dashboarding tool that visualises it.",
     "Glue compresses S3 objects to cut storage costs while Athena decompresses them on demand.",
     "Glue encrypts the lake while Athena manages its keys."],
    "Glue & Athena (data lake basics)",
    "The S3-as-data-lake pattern: raw files land in buckets; Glue crawls them into a catalogue and runs ETL; Athena queries them with plain SQL, serverless, paying per scan.",
    "This trio is the low-friction analytics stack you'll meet everywhere — no database to spin up, SQL straight onto files — and typically the first step of ML feature pipelines on AWS.",
    "Files in a lake, a librarian who catalogues them, and a SQL desk that reads them in place.");

  def("waws", 2,
    "What is Amazon Bedrock?",
    "AWS's managed service for using foundation models.",
    ["The bottom storage tier where S3 keeps objects that haven't been accessed in years.",
     "AWS's platform for building, training and deploying your own machine-learning models.",
     "The open-source model family Amazon releases for customers to host themselves.",
     "A downloadable database of pre-trained weights."],
    "Bedrock",
    "One API over multiple providers' foundation models, with AWS handling hosting, scaling and (optionally) fine-tuning and guardrails — GenAI as a managed utility inside your VPC boundary.",
    "For a regulated firm, the attraction is control: data stays within the cloud tenancy rather than flowing to a third-party API — the shape of most enterprise GenAI adoption you'll encounter.",
    "The tap that dispenses big AI models as a utility, plumbed inside your own cloud walls.");

  def("waws", 1,
    "In cloud security, what is the shared responsibility model?",
    "AWS secures the cloud itself; the customer secures what they build in it.",
    ["AWS and the customer split the cost of any security breach equally between them by contract.",
     "Whoever configures a service is liable for it, so AWS answers for everything left on defaults.",
     "AWS secures managed services entirely; customers answer only for EC2-based workloads.",
     "The customer secures hardware; AWS manages all permissions."],
    "Shared responsibility model",
    "The provider guards the physical estate, hypervisor and managed-service internals; everything above — IAM policies, open buckets, patching your instances, encrypting your data — is yours.",
    "Most cloud incidents are customer-side misconfigurations, not provider failures; the model is the first slide of every cloud-risk conversation and the frame for supervisory expectations.",
    "They lock the building; you still have to lock your own office door.");

  def("waws", 1,
    "What does 'tearing down' resources mean, and why does it matter?",
    "Deleting resources you're finished with, so idle machines stop burning money.",
    ["Stopping instances overnight so they stop billing but keep their disks for morning.",
     "Rolling back a failed deployment to the previous working version of the software.",
     "Migrating workloads from one cloud region to another during scheduled maintenance.",
     "Archiving a project's data to cold storage when the team disbands."],
    "Tearing down (and cloud hygiene)",
    "Spin up's other half: environments are disposable, so delete what's idle — the forgotten GPU instance, the orphaned volume, the test database. IaC makes rebuild-on-demand painless.",
    "'The bill surprise' is the classic cloud rite of passage; tagging resources, budget alarms and teardown discipline are how teams keep experimentation cheap in fact, not just in theory.",
    "Switching the meter off: if it's not working for you, it shouldn't be running.");

  /* ===== AI & Emerging Tech (wai) — 12 ===== */

  def("wai", 1,
    "What is a large language model (LLM)?",
    "A neural network trained on vast text to predict tokens, letting it generate language.",
    ["A rules engine containing millions of hand-written grammar patterns for parsing documents.",
     "A searchable database holding every document the developer licensed during training.",
     "A speech-recognition system specialised for transcribing meetings in large organisations.",
     "A chatbot interface layered over a search engine's ranked results."],
    "LLM (large language model)",
    "Trained on next-token prediction at enormous scale, then tuned to follow instructions — the engine behind ChatGPT-style assistants, summarisers and coding tools.",
    "The regulatory interest follows the deployment: firms embedding LLMs in advice, complaints or communications inherit questions of accuracy, explainability and accountability the model itself can't answer.",
    "A machine that learned language by predicting the next word, billions of times over.");

  def("wai", 1,
    "What is generative AI?",
    "AI that produces new content rather than only classifying or scoring inputs.",
    ["Any AI system whose training data was generated synthetically by another model.",
     "Models that create synthetic training data to balance rare classes in datasets.",
     "AI systems able to explain the reasoning behind each of their outputs.",
     "Software that automatically generates the documentation for legacy systems."],
    "Generative AI",
    "The discriminative/generative split at product scale: classic ML answers 'which class? what score?'; GenAI writes the report, drafts the code, renders the image.",
    "New output types create new risks — fabrication, IP questions, deepfakes, prompt injection — which is why 'we use ML' and 'we use GenAI' get different risk assessments inside firms and regulators alike.",
    "AI that makes things, not just judgements about things.");

  def("wai", 1,
    "What is a foundation model?",
    "A very large model trained on broad data that many applications build on.",
    ["The first model a firm ever deploys, which all later models must remain compatible with.",
     "A model whose weights regulation permanently freezes in service.",
     "The baseline statistical model against which machine-learning models are benchmarked.",
     "A model fine-tuned for one domain that other teams in the firm then reuse."],
    "Foundation model",
    "One pre-trained giant (GPT-4-class, Claude, Llama) serving as the base layer for thousands of downstream uses — adapted by prompting, fine-tuning or retrieval rather than trained from scratch.",
    "Concentration is the policy issue: when critical services stand on a handful of upstream models, questions of systemic dependency, access and upstream-flaw propagation follow — familiar ground from cloud concentration.",
    "The shared bedrock model everyone builds their own applications on top of.");

  def("wai", 1,
    "What is a hallucination in the LLM context?",
    "Confidently stated output that is factually wrong or entirely invented.",
    ["The visual artefacts that image models produce when their training is stopped too early.",
     "A user's mistaken impression that they are chatting with a human rather than a machine.",
     "Output reproducing memorised training data verbatim, including personal information.",
     "A model refusing safe requests because its safety filters over-trigger."],
    "Hallucination",
    "LLMs generate what is statistically plausible, not what is verified — invented citations, fabricated case law, confident wrong numbers. Fluency actively disguises the failure.",
    "It's the central obstacle to LLMs in high-stakes use: mitigations (retrieval grounding, citations, human review) are now standard architecture, and 'how do you handle hallucination?' is the first assurance question.",
    "The model doesn't lie — it just makes things up with total confidence.");

  def("wai", 1,
    "What is RAG (retrieval-augmented generation)?",
    "Fetching relevant documents first and having the LLM answer from them.",
    ["Training a model repeatedly on its own previous outputs to amplify its capabilities.",
     "Caching previous answers so repeated questions return instantly without a model call.",
     "Fine-tuning the model on the firm's documents so the knowledge lives in the weights.",
     "An interface pattern where users rate generated answers to fine-tune the model."],
    "RAG (retrieval-augmented generation)",
    "Query → search a knowledge base (usually via embeddings) → stuff the found passages into the prompt → the model answers from them, ideally with citations.",
    "RAG is the standard enterprise pattern: it grounds answers in the firm's actual documents, cuts hallucination, keeps knowledge current without retraining — and its own failure modes (bad retrieval) become the new audit target.",
    "Open-book exam instead of memory test: find the page, then answer from the page.");

  def("wai", 2,
    "What is fine-tuning (vs prompting) as a way of adapting a model?",
    "Fine-tuning updates the weights on your examples; prompting steers the frozen model.",
    ["Fine-tuning happens in the provider's cloud while prompting runs the model locally.",
     "Prompting is the paid tier of model access while fine-tuning is the free research tier.",
     "Fine-tuning retrains the model from scratch while prompting adds a retrieval index.",
     "They are synonyms: both terms describe writing better instructions for the model."],
    "Fine-tuning vs prompting",
    "The adaptation ladder: prompt engineering (cheapest, reversible), RAG (add knowledge), fine-tuning (change behaviour via training on examples) — rising cost, control and governance burden.",
    "Where a firm sits on the ladder shapes its risk profile: a fine-tuned model is a new model needing its own validation, while prompt changes can ship silently — both facts matter to oversight.",
    "Retrain the chef, or just hand better instructions to the chef you have.");

  def("wai", 1,
    "What is model risk management (MRM)?",
    "Model governance: validation, monitoring, documentation and clear ownership.",
    ["The MLOps tooling that automates deployment, monitoring and retraining pipelines.",
     "Stress-testing a model's outputs against extreme market scenarios before release.",
     "The version-control workflow that prevents two teams editing one model at once.",
     "The security testing that protects models from being stolen by competitors."],
    "Model risk management",
    "Born in banking (SR 11-7, SS1/23): inventory your models, validate them independently, monitor performance and drift, document assumptions, and assign accountable owners.",
    "It's the existing regulatory frame AI lands in — supervisors extend MRM expectations to ML and GenAI rather than inventing fresh rulebooks, so the vocabulary carries straight into AI-governance discussions.",
    "Treat every model like a licensed employee: vetted before hiring, supervised while working, accountable to someone.");

  def("wai", 1,
    "What is algorithmic bias in the regulatory sense?",
    "Systematically worse outcomes for particular groups, learned from data or design.",
    ["A model's statistical bias term, which regularisation is designed to keep small.",
     "The tendency of algorithms to favour recent data over older historical records.",
     "The gap between training and deployment populations that drift monitoring detects.",
     "A model's tendency to repeat its training data's most common answer regardless of input."],
    "Algorithmic bias (fairness)",
    "Models reproduce their data's history: credit, hiring and insurance models can disadvantage protected groups via proxies (postcode, spending patterns) even with protected fields removed.",
    "For a conduct regulator this is Consumer Duty and Equality Act territory — fairness metrics, bias audits and 'fairness through unawareness is not enough' are the working vocabulary.",
    "The model inherits the past's unfairness and serves it back as maths.");

  def("wai", 2,
    "What is explainability (XAI) as a regulatory expectation?",
    "Being able to give meaningful reasons for a model's decisions.",
    ["Publishing a model's full source code and weights on the firm's public website.",
     "Using only intrinsically simple models, which regulation requires for all credit decisions.",
     "A marketing standard for plain-English AI brochures.",
     "The audit trail recording which version of a model made each historical decision."],
    "Explainability (XAI)",
    "The interpretability toolbox (SHAP, counterfactuals, reason codes) pointed at an obligation: adverse decisions need reasons, supervisors need to probe models, firms need to understand what they deploy.",
    "The practical tension — the most accurate models explain worst — is lived policy: high-stakes uses may warrant interpretable models even at an accuracy cost, mirroring the trade-off this app's DS side teaches.",
    "'Because the computer said so' is not an acceptable answer — this is the discipline of doing better.");

  def("wai", 2,
    "What is synthetic data?",
    "Generated data that mimics real data's statistics with no real records.",
    ["Data collected from social media platforms rather than from a firm's own systems.",
     "Real customer records with the names and identifiers removed or masked.",
     "Real records enlarged by small perturbations to grow the training set.",
     "Randomly generated numbers with no relationship to any real-world distribution."],
    "Synthetic data",
    "Generated by models fitted to real data (or by simulation), it preserves patterns — correlations, distributions — while containing no actual customer's record.",
    "It powers privacy-safe innovation — the FCA's Digital Sandbox runs on synthetic datasets — though 'synthetic' isn't automatically 'anonymous': poorly generated data can leak the real records underneath.",
    "Convincing stand-in data: statistically the same crowd, but nobody in it is real.");

  def("wai", 2,
    "What are the FCA's Digital Sandbox and TechSprints?",
    "A synthetic-data test platform and collaborative problem-solving sprints.",
    ["The FCA's internal software development team and its quarterly release schedule.",
     "Penalty mechanisms for firms whose technology fails operational-resilience tests.",
     "The authorisation gateway that fast-tracks licence applications from innovative firms.",
     "The FCA's regime for testing firms' resilience through simulated outages."],
    "Digital Sandbox & TechSprints",
    "The Digital Sandbox offers synthetic data, APIs and observation to early-stage propositions; TechSprints gather industry, technologists and the regulator to prototype answers to problems like APP fraud or greenwashing.",
    "These are the department's own instruments — regulator-as-convener rather than rule-writer — and the reference points for how innovation-friendly supervision works in practice.",
    "The regulator's test kitchen, and its hackathons with the industry.");

  def("wai", 2,
    "What is drift monitoring for a deployed model?",
    "Watching for live inputs or performance drifting from training conditions.",
    ["The gradual loss of accuracy caused by a model retraining on its own predictions.",
     "A mismatch between features computed in training and those computed in production.",
     "Watching a model's file size grow as it accumulates new parameters in use.",
     "The slow accumulation of technical debt in ML pipelines as teams change."],
    "Drift monitoring",
    "Data drift (inputs change), concept drift (the input-outcome relationship changes): dashboards compare live distributions and rolling metrics against training-time baselines, alerting when they diverge.",
    "Models rot silently — fraud patterns move, economies turn — so 'how will you know when it stops working?' is the supervision question, and drift monitoring is the operational answer MRM expects.",
    "A smoke alarm for models: it rings when the world stops looking like the training data.");

})();
