/* FCA & Innovation mode — bare-bones vocabulary for regulatory innovation work.
   Three topics: digital assets & smart contracts (wcrypto), payments & fintech (wpay),
   AWS & cloud (waws). Same question format as everything else, so quizzes, flashcards
   and read+recall all work. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  var R = (window.DEFRANK = window.DEFRANK || {});
  function nk(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function def(qk, rank, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1; R[nk(name)] = rank;
  }

  /* ===== Digital Assets & Smart Contracts (wcrypto) — 12 ===== */

  def("wcrypto", 1,
    "What is a blockchain?",
    "A shared, append-only ledger kept consistent across many computers.",
    ["A private database run by a bank that regulators can inspect on request.",
     "A ledger held by a single trusted operator that participants can read but not verify independently.",
     "A messaging network that banks use to instruct international payments.",
     "A network where each participant keeps its own ledger and reconciles differences overnight."],
    "Blockchain",
    "A ledger built from cryptographically linked blocks of transactions, replicated across a network of nodes that agree on its contents without needing to trust each other or a central party.",
    "The design trades efficiency for tamper-resistance and shared control: once agreed, history is extremely hard to rewrite, which is why it underpins cryptoassets and interests firms that want shared records without a middleman.",
    "A shared record book that many computers keep identical copies of — and nobody can quietly edit.");

  def("wcrypto", 1,
    "What is distributed ledger technology (DLT)?",
    "The broad family of shared-ledger systems, of which blockchain is one kind.",
    ["A regulation requiring ledgers to be distributed to auditors quarterly.",
     "Any ledger whose entries are cryptographically signed by the single bank that maintains it.",
     "A cloud backup standard for replicating databases across regions.",
     "The subset of blockchains that permit only approved participants to validate transactions."],
    "Distributed ledger technology (DLT)",
    "The umbrella term for ledgers maintained collectively across multiple sites or parties. Blockchain is one architecture; others order transactions without chaining blocks.",
    "Regulators say 'DLT' deliberately — rules aim at the shared-ledger property, not one implementation. Permissioned DLT (known participants, e.g. for settlement) matters more in regulated finance than public chains.",
    "The family name; blockchain is the famous member of it.");

  def("wcrypto", 1,
    "What is a smart contract?",
    "Ledger code that runs itself when its conditions are met.",
    ["A legal contract drafted by an AI system and reviewed by lawyers.",
     "A contract that includes a clause allowing digital signatures.",
     "A legally binding agreement recorded immutably on a ledger but executed by the parties themselves.",
     "An off-chain program that watches the ledger and instructs payments when conditions are met."],
    "Smart contract",
    "Self-executing code deployed on a blockchain: 'if X happens, transfer Y' runs exactly as written, visible to all, once triggered. The building block of DeFi, token issuance and programmable payments.",
    "The power and the risk are the same fact — execution is automatic and irreversible, so bugs are exploitable and 'code is law' collides with consumer protection: a core regulatory interest area.",
    "An if-this-then-that agreement written as code that runs itself.");

  def("wcrypto", 1,
    "What is tokenization in the financial context?",
    "Representing an asset as a digital token on a ledger.",
    ["Issuing a new cryptocurrency whose price is designed to track the value of an underlying asset.",
     "Converting physical cash into commemorative digital collectibles.",
     "Splitting a document into words for natural-language processing.",
     "Recording an asset's ownership history on a ledger while transfers still happen only off-chain."],
    "Tokenization (of assets)",
    "Recording ownership of a real-world or financial asset as a transferable token on DLT — enabling fractional ownership, faster settlement, and programmability of traditionally illiquid assets.",
    "Tokenized deposits, funds and gilts are live regulatory topics: the asset's economics stay the same, but issuance, trading and settlement move onto new rails whose risks regulators must map. (The NLP sense of 'tokenisation' is a different concept entirely.)",
    "Turning an asset into a digital certificate of ownership that can move at internet speed.");

  def("wcrypto", 1,
    "What is a cryptoasset?",
    "A digital representation of value or rights secured by cryptography on a ledger — the FCA's umbrella term.",
    ["The FCA's term for tokens conferring investment rights, excluding exchange tokens like bitcoin.",
     "A savings product whose interest rate is set automatically by an algorithm rather than by the provider.",
     "Any digital asset held on a regulated exchange, whether or not cryptography secures it.",
     "Any digital image or media file whose original ownership can no longer be reliably established."],
    "Cryptoasset",
    "The regulatory umbrella covering exchange tokens (like bitcoin), utility tokens, security tokens and stablecoins — each attracting different treatment depending on the rights it confers.",
    "Classification drives regulation: a token that behaves like a specified investment falls in the perimeter; the FCA's financial-promotions and registration regimes hang off exactly these definitions.",
    "The official word for crypto things — chosen so rules can carve them into kinds.");

  def("wcrypto", 1,
    "What is a stablecoin?",
    "A cryptoasset designed to hold a steady value against a currency.",
    ["A coin whose price is frozen by the exchange during volatile trading.",
     "A ledger-recorded claim on a commercial bank, protected like an ordinary deposit.",
     "A token backed by a diversified basket of other cryptoassets only.",
     "Digital money issued by the central bank to hold a fixed value in the national currency."],
    "Stablecoin",
    "A token pegged to stable value — usually via fiat reserves (backed) or algorithms (riskier). The bridge between crypto rails and ordinary money, and a candidate for mainstream payments.",
    "Because a payment stablecoin resembles money, its backing, redemption rights and run-risk are central regulatory questions — UK legislation brings fiat-backed stablecoins into the payments perimeter.",
    "Crypto plumbing with a pound-shaped anchor to stop the price swinging.");

  def("wcrypto", 1,
    "What is a central bank digital currency (CBDC)?",
    "Digital money issued directly by a central bank.",
    ["Any cryptocurrency that a central bank has approved for trading.",
     "A fiat-backed stablecoin whose reserves are held entirely at the central bank.",
     "A stablecoin issued by commercial banks under central bank licence.",
     "Reserves that commercial banks hold at the central bank today."],
    "CBDC (central bank digital currency)",
    "Central-bank money in retail digital form — unlike bank deposits (claims on commercial banks) or stablecoins (claims on private issuers). The UK's 'digital pound' is in design phase.",
    "Design choices — privacy, holding limits, intermediary roles, programmability — are live policy questions with big implications for banks' funding and payments competition.",
    "Cash's digital sibling, issued by the central bank itself.");

  def("wcrypto", 1,
    "What is DeFi (decentralised finance)?",
    "Financial services rebuilt as smart contracts.",
    ["Banking services delivered through mobile apps rather than branches.",
     "Any financial product that is exempt from regulation.",
     "Peer-to-peer lending platforms matching borrowers and savers through a regulated marketplace.",
     "Traditional financial firms settling between themselves on permissioned blockchains."],
    "DeFi (decentralised finance)",
    "Protocols where code plays the roles of exchange, broker and lender: automated market makers, lending pools, and derivatives running on-chain, composable like Lego.",
    "The regulatory puzzle is accountability — when no firm 'operates' the service, who is responsible for failures, disclosures and market abuse? A defining perimeter question for innovation teams.",
    "The bank replaced by vending machines made of code.");

  def("wcrypto", 1,
    "In crypto, what are a wallet and its keys, and what is custody?",
    "A wallet manages the controlling keys; custody is who holds them.",
    ["A wallet is the exchange account balance and custody is its insurance.",
     "A wallet stores the tokens on the device itself; custody means backing them up to the cloud.",
     "A wallet is a physical device required by law for holding crypto.",
     "Custody is the exchange's duty to insure client assets; the wallet is the insured account."],
    "Wallets, keys and custody",
    "Assets on a ledger are controlled by whoever signs with the private key. Self-custody means the user holds keys (and all the risk of losing them); custodial services hold keys on clients' behalf.",
    "'Not your keys, not your coins' is the consumer-risk headline: custodian failures (exchange collapses) and lost keys are the loss events driving custody rules and the safeguarding debate.",
    "The key IS the ownership — so who keeps the key is the whole question.");

  def("wcrypto", 2,
    "What distinguishes on-chain from off-chain activity?",
    "On-chain events are recorded on the ledger itself; off-chain activity happens outside it.",
    ["On-chain refers to activity falling inside the regulatory perimeter while off-chain activity sits outside it.",
     "On-chain transactions always settle instantly while off-chain transactions take several working days to clear.",
     "Off-chain means layer-2 transactions that never settle back to the main chain.",
     "On-chain activity is visible only to the two parties involved, while off-chain activity is publicly viewable."],
    "On-chain vs off-chain",
    "A transfer written to the blockchain is on-chain (transparent, final, fee-bearing); an exchange's internal book-keeping between its customers is off-chain — the chain never sees it.",
    "The gap matters for oversight: on-chain data is publicly analysable (blockchain analytics), while off-chain books are where exchange-collapse risk hid — knowing which layer an activity lives on is step one of assessing it.",
    "In the shared record book, or in somebody's private notebook that references it.");

  def("wcrypto", 2,
    "What is a consensus mechanism?",
    "The rules by which a ledger's nodes agree on the next valid block.",
    ["The voting process by which token holders elect the ledger's directors.",
     "The multi-signature approval a permissioned ledger requires before accepting a transaction.",
     "The committee that approves changes to a cryptoasset's whitepaper.",
     "The governance vote by which token holders approve changes to the protocol's rules."],
    "Consensus mechanism",
    "How strangers agree without a referee: proof-of-work makes rewriting history computationally expensive; proof-of-stake makes it economically expensive via staked collateral.",
    "Consensus choice drives the properties policy cares about — energy use (the PoW debate), finality speed, and where control concentrates (miners vs large stakers).",
    "The agreement rules that keep thousands of copies of the ledger identical.");

  def("wcrypto", 2,
    "What is an oracle in the smart-contract world?",
    "A service feeding real-world data onto the chain.",
    ["A senior developer who audits smart-contract code before launch.",
     "The database company whose software runs most blockchains.",
     "A prediction market that forecasts cryptoasset prices.",
     "A smart contract that verifies the accuracy of data already recorded on the chain."],
    "Oracle (blockchain)",
    "Smart contracts can only see the chain; oracles import outside facts (the GBP/USD rate, a flight delay) that contracts then execute against.",
    "Oracles are a trust re-entry point in a 'trustless' system — manipulated feeds have caused major DeFi exploits, so oracle design is where many smart-contract risk assessments focus.",
    "The messenger that tells the blockchain what happened in the real world.");

  /* ===== Payments & Fintech (wpay) — 12 ===== */

  def("wpay", 1,
    "What are payment rails?",
    "The underlying networks that actually move money.",
    ["The security barriers that stop payments going to sanctioned parties.",
     "The card networks specifically, as distinct from bank-to-bank transfer systems.",
     "The fee schedules that banks publish for business customers.",
     "The settlement accounts at the Bank of England across which banks' obligations are discharged."],
    "Payment rails",
    "The infrastructure layer beneath every app and bank: each rail has its own speed, cost, limits and rules — CHAPS for high-value same-day, Bacs for batch direct debits, Faster Payments for instant retail transfers.",
    "Fintech innovation is often rail arbitrage — building better experiences on old rails or moving flows to new ones (including stablecoins) — so knowing which rail a product rides tells you most of its risk profile.",
    "The train tracks money travels on; apps are just the ticket offices.");

  def("wpay", 1,
    "What is the UK's Faster Payments System (FPS)?",
    "The rail for near-instant bank-to-bank transfers, running 24/7.",
    ["The overnight batch system that processes salaries and direct debits.",
     "The high-value same-day system used for house purchases and interbank settlement.",
     "A scheme letting merchants take payment before goods ship.",
     "The Bank of England's system for settling between central banks."],
    "Faster Payments",
    "Launched 2008: seconds-fast, always-on transfers between UK accounts, now the default retail rail. Its speed is also why APP fraud is so damaging — money is gone and dispersed in minutes.",
    "The New Payments Architecture (NPA) programme to renew this infrastructure, and the reimbursement rules for fraud over it, are standing items in UK payments policy.",
    "The reason a bank transfer arrives before you've closed the app.");

  def("wpay", 1,
    "What is open banking?",
    "Regulated, consent-based access to bank accounts for third parties via APIs.",
    ["The requirement that banks share customer data with any fintech that requests it, with no customer consent step.",
     "The requirement for banks to publish their core banking source code as open-source software for scrutiny.",
     "The removal of fees on all current-account transactions, mandated to increase competition between banks.",
     "Consent-based data sharing extended beyond payments to savings, pensions and insurance."],
    "Open banking",
    "Born of PSD2/CMA remedies: with the customer's consent, authorised third parties read account data or initiate payments through standardised APIs — the plumbing behind account aggregation and pay-by-bank.",
    "It reframed account data as the customer's asset, not the bank's, and its successor debates (open finance, smart data across sectors) extend the same logic to pensions, insurance and beyond.",
    "Your bank data and payment buttons, made available — with your consent — to apps you choose.");

  def("wpay", 2,
    "What is the difference between an AISP and a PISP?",
    "AISPs read account data with consent; PISPs initiate payments.",
    ["AISPs serve individuals while PISPs serve only business customers.",
     "AISPs must be authorised by the FCA while PISPs need only register with their bank.",
     "PISPs handle international payments while AISPs handle domestic.",
     "They are two names for the same open-banking permission."],
    "AISP vs PISP",
    "The two open-banking roles: Account Information Service Providers aggregate and analyse account data (budgeting apps, lending checks); Payment Initiation Service Providers trigger transfers (pay-by-bank checkout).",
    "The split matters because the risks differ — data protection and misuse for AISPs, fraud and liability for PISPs — and authorisation, permissions and supervision follow the role.",
    "One may look at the account; the other may press 'send'.");

  def("wpay", 2,
    "In card payments, what are the acquirer and the issuer?",
    "The merchant's payment bank versus the customer's card bank.",
    ["The acquirer routes the authorisation while the issuer settles with the merchant directly.",
     "The issuer is the merchant's bank and the acquirer is the cardholder's bank.",
     "Both are roles played by the card network itself, like Visa.",
     "The acquirer sets exchange rates and the issuer sets fees."],
    "Acquirer vs issuer",
    "Every card payment is a four-party dance: cardholder → issuer (their bank) → network (Visa/Mastercard) → acquirer (merchant's provider) → merchant, with authorisation flowing one way and money the other.",
    "The map locates everything else — interchange flows issuer-ward, chargebacks travel the same path in reverse, and 'payments firms' (Stripe, Adyen, Worldpay) are mostly acquirers or their processors.",
    "The customer's bank and the shop's bank, meeting through the card network.");

  def("wpay", 2,
    "What is an interchange fee?",
    "The per-card-payment fee flowing from acquirer to issuer.",
    ["The portion of the merchant service charge the acquirer keeps for its own services.",
     "The monthly rental merchants pay for card terminals.",
     "A government levy on electronic payments funding fraud defence.",
     "The fee the card scheme itself charges both banks for the use of its network."],
    "Interchange fee",
    "Set by the card networks, flowing acquirer→issuer, and passed on to merchants within the 'merchant service charge'. UK/EU rules cap consumer card interchange (0.2% debit / 0.3% credit).",
    "Interchange economics fund card rewards and drive policy fights — caps, post-Brexit cross-border rises, and merchant steering toward cheaper rails like pay-by-bank all revolve around it.",
    "The hidden per-tap toll that flows from the shop's side to the cardholder's bank.");

  def("wpay", 1,
    "What is APP fraud?",
    "Fraud where victims are deceived into sending the money themselves.",
    ["Fraud committed specifically through malicious mobile applications downloaded from unofficial app stores.",
     "The cloning of payment cards at cash machines using physical skimming devices attached to the reader.",
     "Unauthorised transactions made using card details that were stolen without the victim's knowledge.",
     "Unauthorised payments made after criminals take over the victim's online banking."],
    "APP fraud (authorised push payment)",
    "The victim authorises the payment — that's the point: romance, purchase, invoice-redirect and 'safe account' impersonation scams all trick the account holder into pressing send over instant rails.",
    "Because the customer 'authorised' it, traditional unauthorised-fraud protections didn't bite — which is why the UK's mandatory reimbursement regime (via the PSR) was created, and why fraud-data sharing is a live innovation area.",
    "The scam where the victim's own finger sends the money.");

  def("wpay", 1,
    "What is e-money (electronic money)?",
    "Prepaid digital value issued against funds received, usable for payments.",
    ["Any money that exists as records in a bank's computer systems rather than as physical notes and coins.",
     "Commercial bank deposits held in digital form and protected by the FSCS.",
     "The interest-bearing balance held in an online savings account with a fully licensed retail bank.",
     "Loyalty credit that retailers issue to customers, redeemable only against their own future purchases."],
    "E-money",
    "Issued by e-money institutions (EMIs) — customer funds are safeguarded at banks, not lent out, and balances aren't deposits: no FSCS protection, a distinction many customers miss.",
    "Much of UK fintech runs on EMI permissions, so safeguarding adequacy and wind-down when an EMI fails are core supervisory concerns — and exactly where 'is it a bank?' confusion causes harm.",
    "A prepaid digital purse that looks like a bank account but legally isn't one.");

  def("wpay", 1,
    "What is Buy Now, Pay Later (BNPL)?",
    "Interest-free instalment credit at checkout, long outside full credit regulation.",
    ["Store cards offering revolving credit at the retailer's own checkout.",
     "Short-term checkout credit that charges interest from day one and reports to credit bureaus.",
     "The extension of thirty-day corporate invoice payment terms to ordinary retail customers at checkout.",
     "Any ordinary credit card that offers an introductory zero-percent interest period to new customers."],
    "BNPL (Buy Now, Pay Later)",
    "Split-in-three-style checkout credit: frictionless, interest-free to the shopper (merchant-funded), and — via historical exemptions — outside much of the Consumer Credit Act's protections until now.",
    "The regulatory story is perimeter-catching-up-with-product: affordability checks, disclosures and Section 75-style protections for a product used heavily by younger and financially stretched consumers.",
    "Checkout credit in three easy slices — with the rulebook now catching up.");

  def("wpay", 1,
    "What are KYC and AML?",
    "Identity checks within the anti-money-laundering controls that catch criminal funds.",
    ["The rules requiring firms to assess whether products match a customer's needs and risk tolerance.",
     "The capital requirements that protect depositors against losses in the event of a bank's failure.",
     "The accessibility standards that banking apps and websites must meet for customers with disabilities.",
     "The deadlines within which regulated firms must acknowledge and resolve customer complaints."],
    "KYC / AML",
    "The financial-crime baseline: verify who the customer is (KYC), monitor transactions, and file suspicious activity reports — obligations that scale poorly with manual processes.",
    "This is RegTech's biggest market (digital ID, screening, transaction monitoring) and a constant innovation trade-off: friction and false positives versus criminal flows — with crypto's Travel Rule extending it on-chain.",
    "Prove who you are; let the firm prove your money is clean.");

  def("wpay", 1,
    "What is a regulatory sandbox?",
    "A supervised space for testing new products with real consumers.",
    ["A quarantined IT environment where banks test software patches.",
     "A watchlist of firms under investigation for misconduct.",
     "A controlled simulation where products are tested on synthetic consumers before any live trial.",
     "A simulator for training new supervisors on case files."],
    "Regulatory sandbox",
    "Pioneered by the FCA in 2016 and copied worldwide: eligible firms run live, bounded tests with regulator engagement — informing both the product's compliance and the regulator's understanding.",
    "Sandboxes are the emblem of pro-innovation regulation, and their descendants (digital sandbox with synthetic data, permanent always-open access) are core Innovation-department machinery.",
    "A safe paddling pool for testing new financial products on real people, with lifeguards.");

  def("wpay", 2,
    "What is the difference between RegTech and SupTech?",
    "RegTech helps firms meet regulatory obligations; SupTech helps regulators supervise.",
    ["RegTech is the body of rules applying to technology firms while SupTech is the equivalent set for banks.",
     "RegTech is software that regulated firms are required to purchase while SupTech remains an optional extra.",
     "RegTech is built by regulators for firms while SupTech is built by firms for regulators.",
     "The two terms are interchangeable and differ only in which industry conference happens to be using them."],
    "RegTech vs SupTech",
    "Compliance automation (reporting, monitoring, KYC) sold to firms is RegTech; data-driven supervision — ingesting returns, ML on firm data, market surveillance — built for regulators is SupTech.",
    "For an innovation team the pair frames both jobs at once: encouraging firms' RegTech adoption while building the FCA's own SupTech — often with the same ML techniques this app teaches.",
    "The same tools, worn by the regulated on one wrist and the regulator on the other.");

  /* ===== AWS & Cloud (waws) — 12 ===== */

  def("waws", 1,
    "What is cloud computing?",
    "Renting computing resources on demand over the internet, paying for use.",
    ["Storing your files on your own laptop in a special folder that synchronises to a backup drive overnight.",
     "Buying and racking your own physical servers in the office basement.",
     "A pool of virtual machines your own IT team runs in the company's private data centre.",
     "Free public computing capacity provided to businesses and citizens by government-run data centres."],
    "Cloud computing",
    "Instead of owning hardware, you rent slices of providers' data centres (AWS, Azure, GCP) via APIs — elastic capacity in minutes, operational burden shifted to the provider.",
    "For regulated firms the shift raises the questions supervision now focuses on: operational resilience, concentration risk in few providers, data residency and exit plans — 'critical third parties' in the rulebooks.",
    "Someone else's computers, rented by the hour through a website.");

  def("waws", 1,
    "In AWS, what is an instance?",
    "A virtual server you rent — a slice of a physical machine with chosen CPU, memory and storage.",
    ["One complete copy of your data that has been replicated to a second geographic region for resilience.",
     "A single row of data stored inside one of the tables of a DynamoDB database.",
     "A single occurrence of an error or warning that has been recorded in the application's logs.",
     "One running copy of a container image, sharing its host machine's operating system."],
    "Instance",
    "The basic unit of cloud compute (an EC2 instance): pick a type (sizes of CPU/RAM, e.g. t3.medium), an image (its operating system and software), start it, use it, stop it — billed while running.",
    "'Instance' language pervades everything (instance types, spot instances, instance hours), and its virtual-not-physical nature is the point: it can be created, resized, or thrown away in minutes.",
    "A computer conjured from the cloud — yours while the meter runs.");

  def("waws", 1,
    "What does 'spinning up' mean in cloud work?",
    "Creating and starting a resource so it's ready to use.",
    ["Restoring a stopped instance from its saved disk image.",
     "Restarting a crashed server repeatedly until it stabilises.",
     "Scaling an existing fleet out by adding more identical instances.",
     "Archiving old resources into long-term cold storage."],
    "Spinning up (provisioning)",
    "The everyday verb for provisioning: 'spin up an instance', 'spin up a test environment'. Its opposite is tearing down. From spinning disks; now it just means 'bring into existence and start'.",
    "The cultural shift it encodes matters: resources are cattle, not pets — created on demand, deleted when done — which is what makes experimentation cheap and forgotten instances expensive.",
    "Switching on a computer that didn't exist a minute ago.");

  def("waws", 1,
    "What is Amazon EC2?",
    "The AWS compute service where virtual servers are rented and run.",
    ["AWS's serverless service that runs functions on demand with no servers to manage.",
     "AWS's object storage service for files and datasets of any size.",
     "The AWS service that distributes incoming traffic across a fleet of servers.",
     "AWS's managed service for relational databases such as PostgreSQL."],
    "EC2 (Elastic Compute Cloud)",
    "The service behind 'instances': choose hardware profile and operating system image, attach storage and networking, and run anything from a website to an ML training job.",
    "'Elastic' is the philosophy — scale the fleet up for load and down after — and most other AWS services either run on EC2 underneath or exist to spare you managing it.",
    "The AWS shop counter where the virtual computers are rented.");

  def("waws", 1,
    "What is Amazon S3, and what is a bucket?",
    "S3 is AWS's object storage; a bucket is the named container files live in.",
    ["AWS's relational database engine, with buckets as its tables.",
     "S3 is AWS's messaging queue service and buckets are the named channels that messages flow through.",
     "S3 is AWS's automated backup software and buckets are the scheduled restore points it creates.",
     "S3 is AWS's managed firewall service and buckets are the rule groups that define allowed traffic."],
    "S3 and buckets",
    "Simple Storage Service: durable, effectively unlimited storage for objects (files) addressed by key within globally named buckets — the default home for datasets, logs, backups and model artifacts.",
    "For data work S3 is where everything lives, and its access controls are where cloud breaches most famously happen — the 'public bucket' misconfiguration is a cautionary tale every team learns.",
    "The infinite filing cabinet; a bucket is one labelled drawer.");

  def("waws", 1,
    "What are AWS regions and availability zones?",
    "Regions are geographic areas, each containing multiple isolated data-centre zones.",
    ["AWS's pricing tiers, with zones as their discount bands.",
     "Regions are the legal jurisdictions AWS operates in and zones are the tax categories that apply there.",
     "Regions are single data centres while availability zones are the racks inside them.",
     "Regions are network performance classes, ranked from bronze up to gold, that customers choose between."],
    "Regions and availability zones",
    "A region = a cluster of independent availability zones (AZs) close enough for fast networking, far enough apart that one failure doesn't take the others. Deploying across AZs is resilience 101.",
    "Region choice is a policy decision, not just technical: data residency (keeping data in eu-west-2), latency, and service availability — the geography question every cloud assessment asks first.",
    "Which country your cloud lives in, and how many separate buildings it's spread across.");

  def("waws", 1,
    "What is serverless computing (e.g. AWS Lambda)?",
    "Running code without managing servers: functions run on demand, billed per execution.",
    ["Fully managed instances where AWS patches the operating system but you choose the size.",
     "A discounted pricing tier under which AWS reserves the right to reclaim your instance at any moment.",
     "Software that runs entirely in the user's browser, with no backend.",
     "A pricing model where idle instances are automatically stopped overnight to save money."],
    "Serverless (Lambda)",
    "Servers still exist — you just never see them: a Lambda function fires on a trigger (file lands in S3, API call arrives), runs, and stops; no idle machines, no patching, per-millisecond billing.",
    "It's the natural fit for event-driven glue (process each uploaded file, respond to each webhook) and its trade-offs — time limits, cold starts, less control — define when a real instance is still needed.",
    "Code that summons a computer only for the moment it's needed.");

  def("waws", 1,
    "What is IAM in AWS?",
    "Identity and Access Management — who (users, roles, services) may do what, to which resources.",
    ["The service that records every API call for audit, showing who did what and when.",
     "AWS's built-in instant messaging service for discussing support tickets with cloud engineers.",
     "The hardware inventory system that tracks every physical machine inside an AWS data centre.",
     "A managed machine-learning service that verifies customer identities from documents and selfies."],
    "IAM (Identity and Access Management)",
    "The permission fabric: policies attach to users, groups and roles, defining allowed actions ('read this bucket, launch no instances'). Services assume roles rather than holding passwords.",
    "Nearly every cloud security review is an IAM review — least privilege, no long-lived keys, roles over users — because misconfigured permissions, not exotic hacks, cause most cloud incidents.",
    "The keyring and the rulebook for everything in the account.");

  def("waws", 2,
    "What is autoscaling?",
    "Automatically adding or removing instances to match load.",
    ["The load balancer spreading incoming requests evenly across the existing instances.",
     "Burstable instances banking CPU credits in quiet periods to spend under load.",
     "Automatic upgrades of instances to newer hardware generations.",
     "Upgrading an instance to a larger size so it can handle the increased load."],
    "Autoscaling",
    "Define a fleet, a metric (CPU, queue length) and limits; the platform launches instances under load and terminates them when it eases — elasticity made automatic.",
    "It's the economic heart of the cloud case — pay for the demand curve, not the peak — and its failure modes (scaling too slowly for spikes, or costing a fortune misconfigured) are classic operational lessons.",
    "Staff the tills for the queue you have, minute by minute.");

  def("waws", 2,
    "What is the difference between on-demand and spot instances?",
    "On-demand is full price and guaranteed; spot is discounted capacity AWS can reclaim.",
    ["On-demand instances run on dedicated physical hardware while spot instances are merely virtual machines.",
     "Spot instances must be reserved a full year in advance at prices determined by a sealed-bid auction.",
     "On-demand pricing applies to storage services while spot pricing applies exclusively to networking.",
     "Capacity reserved one or three years ahead in exchange for a large discount."],
    "On-demand vs spot pricing",
    "Spot sells idle capacity at up to ~90% off, with the catch of two-minute reclamation warnings — perfect for interruptible work (batch jobs, some ML training), wrong for anything that can't die mid-task.",
    "Choosing purchase models (on-demand, spot, reserved/savings plans) is the core of cloud cost management — the difference between a modest and an eye-watering bill for the same compute.",
    "Full fare with a guaranteed seat, or standby tickets that are cheap until the seat's owner shows up.");

  def("waws", 2,
    "What is Amazon SageMaker?",
    "AWS's managed ML platform: notebooks, training jobs, deployment endpoints.",
    ["AWS's service for calling foundation models like Claude through a single API.",
     "AWS's AI coding assistant that suggests code to developers inside the editor.",
     "AWS's data-warehouse service for petabyte-scale SQL analytics.",
     "A commercial data marketplace where teams buy and sell pre-labelled machine-learning datasets."],
    "SageMaker",
    "The ML workflow as managed services: hosted notebooks for exploration, training jobs on rented fleets, model registry, and one-click deployment to auto-scaling inference endpoints.",
    "It's where 'this app's sklearn knowledge' meets 'work AWS reality' — the same fit/predict lifecycle, industrialised, with MLOps concerns (monitoring, drift, endpoints) attached.",
    "The cloud workshop where models are built, trained and put to work.");

  def("waws", 2,
    "What is a VPC (Virtual Private Cloud)?",
    "Your isolated network inside AWS: private address space, subnets and firewall rules.",
    ["A premium support contract that gives your team direct access to a named AWS cloud engineer.",
     "The dedicated private fibre connection between your office and an AWS region.",
     "The encrypted network tunnel established between your laptop and the AWS management console.",
     "AWS's firewall service filtering web traffic for common attack patterns."],
    "VPC (Virtual Private Cloud)",
    "The network container instances live in: public subnets face the internet, private ones don't; security groups and network ACLs gate the traffic between everything.",
    "VPC design is where 'is this system exposed?' gets decided — the private-subnet-plus-controlled-egress pattern is the baseline for handling sensitive data in cloud reviews.",
    "A fenced private estate inside the public cloud, with gates you control.");

})();
