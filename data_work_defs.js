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
    "A shared, append-only ledger of transactions kept consistent across many computers without a central operator.",
    ["A private database run by a bank that regulators can inspect on request.",
     "A type of encrypted spreadsheet stored in a single secure data centre.",
     "A messaging network that banks use to instruct international payments.",
     "A programming language designed for writing financial applications."],
    "Blockchain",
    "A ledger built from cryptographically linked blocks of transactions, replicated across a network of nodes that agree on its contents without needing to trust each other or a central party.",
    "The design trades efficiency for tamper-resistance and shared control: once agreed, history is extremely hard to rewrite, which is why it underpins cryptoassets and interests firms that want shared records without a middleman.",
    "A shared record book that many computers keep identical copies of — and nobody can quietly edit.");

  def("wcrypto", 1,
    "What is distributed ledger technology (DLT)?",
    "The broad family of shared-ledger systems — blockchains are the best-known kind, but not the only one.",
    ["A regulation requiring ledgers to be distributed to auditors quarterly.",
     "The technology banks use to distribute paper statements to customers.",
     "A cloud backup standard for replicating databases across regions.",
     "Software for splitting one payment across several bank accounts."],
    "Distributed ledger technology (DLT)",
    "The umbrella term for ledgers maintained collectively across multiple sites or parties. Blockchain is one architecture; others order transactions without chaining blocks.",
    "Regulators say 'DLT' deliberately — rules aim at the shared-ledger property, not one implementation. Permissioned DLT (known participants, e.g. for settlement) matters more in regulated finance than public chains.",
    "The family name; blockchain is the famous member of it.");

  def("wcrypto", 1,
    "What is a smart contract?",
    "Code stored on a ledger that executes automatically when its conditions are met — no manual intervention.",
    ["A legal contract drafted by an AI system and reviewed by lawyers.",
     "A contract that includes a clause allowing digital signatures.",
     "An insurance policy whose premiums adjust to market conditions.",
     "A PDF agreement with embedded links to the referenced legislation."],
    "Smart contract",
    "Self-executing code deployed on a blockchain: 'if X happens, transfer Y' runs exactly as written, visible to all, once triggered. The building block of DeFi, token issuance and programmable payments.",
    "The power and the risk are the same fact — execution is automatic and irreversible, so bugs are exploitable and 'code is law' collides with consumer protection: a core regulatory interest area.",
    "An if-this-then-that agreement written as code that runs itself.");

  def("wcrypto", 1,
    "What is tokenization in the financial context?",
    "Representing an asset — money, bonds, property, funds — as a digital token on a ledger.",
    ["Replacing card numbers with emoji sequences in payment apps.",
     "Converting physical cash into commemorative digital collectibles.",
     "Splitting a document into words for natural-language processing.",
     "Issuing loyalty points that can be spent within one retailer."],
    "Tokenization (of assets)",
    "Recording ownership of a real-world or financial asset as a transferable token on DLT — enabling fractional ownership, faster settlement, and programmability of traditionally illiquid assets.",
    "Tokenized deposits, funds and gilts are live regulatory topics: the asset's economics stay the same, but issuance, trading and settlement move onto new rails whose risks regulators must map. (The NLP sense of 'tokenisation' is a different concept entirely.)",
    "Turning an asset into a digital certificate of ownership that can move at internet speed.");

  def("wcrypto", 1,
    "What is a cryptoasset?",
    "A digital representation of value or rights secured by cryptography on a ledger — the FCA's umbrella term.",
    ["Any password-protected file that contains financial information belonging to a regulated firm's customers.",
     "A savings product whose interest rate is set automatically by an algorithm rather than by the provider.",
     "The encrypted backup copies of a bank's customer database, held offline for disaster recovery purposes.",
     "Any digital image or media file whose original ownership can no longer be reliably established."],
    "Cryptoasset",
    "The regulatory umbrella covering exchange tokens (like bitcoin), utility tokens, security tokens and stablecoins — each attracting different treatment depending on the rights it confers.",
    "Classification drives regulation: a token that behaves like a specified investment falls in the perimeter; the FCA's financial-promotions and registration regimes hang off exactly these definitions.",
    "The official word for crypto things — chosen so rules can carve them into kinds.");

  def("wcrypto", 1,
    "What is a stablecoin?",
    "A cryptoasset designed to hold a steady value, typically by referencing a fiat currency like GBP or USD.",
    ["A coin whose price is frozen by the exchange during volatile trading.",
     "Any cryptoasset that has existed for more than five years.",
     "A token backed by a diversified basket of other cryptoassets only.",
     "The reward paid to computers that keep a blockchain stable."],
    "Stablecoin",
    "A token pegged to stable value — usually via fiat reserves (backed) or algorithms (riskier). The bridge between crypto rails and ordinary money, and a candidate for mainstream payments.",
    "Because a payment stablecoin resembles money, its backing, redemption rights and run-risk are central regulatory questions — UK legislation brings fiat-backed stablecoins into the payments perimeter.",
    "Crypto plumbing with a pound-shaped anchor to stop the price swinging.");

  def("wcrypto", 1,
    "What is a central bank digital currency (CBDC)?",
    "Digital money issued directly by a central bank — a digital pound would be a claim on the Bank of England.",
    ["Any cryptocurrency that a central bank has approved for trading.",
     "The digital dashboard central banks use to set interest rates.",
     "A stablecoin issued by commercial banks under central bank licence.",
     "Reserves that commercial banks hold at the central bank today."],
    "CBDC (central bank digital currency)",
    "Central-bank money in retail digital form — unlike bank deposits (claims on commercial banks) or stablecoins (claims on private issuers). The UK's 'digital pound' is in design phase.",
    "Design choices — privacy, holding limits, intermediary roles, programmability — are live policy questions with big implications for banks' funding and payments competition.",
    "Cash's digital sibling, issued by the central bank itself.");

  def("wcrypto", 1,
    "What is DeFi (decentralised finance)?",
    "Financial services — lending, trading, derivatives — rebuilt as smart contracts without traditional intermediaries.",
    ["Banking services delivered through mobile apps rather than branches.",
     "Any financial product that is exempt from regulation.",
     "The outsourcing of bank back-offices to overseas providers.",
     "Government schemes providing finance to underserved regions."],
    "DeFi (decentralised finance)",
    "Protocols where code plays the roles of exchange, broker and lender: automated market makers, lending pools, and derivatives running on-chain, composable like Lego.",
    "The regulatory puzzle is accountability — when no firm 'operates' the service, who is responsible for failures, disclosures and market abuse? A defining perimeter question for innovation teams.",
    "The bank replaced by vending machines made of code.");

  def("wcrypto", 1,
    "In crypto, what are a wallet and its keys, and what is custody?",
    "A wallet manages the cryptographic keys that control assets; custody is who holds those keys for whom.",
    ["A wallet is the exchange account balance and custody is its insurance.",
     "Keys are passwords reset by the blockchain's customer service team.",
     "A wallet is a physical device required by law for holding crypto.",
     "Custody is the tax status of crypto held for over a year."],
    "Wallets, keys and custody",
    "Assets on a ledger are controlled by whoever signs with the private key. Self-custody means the user holds keys (and all the risk of losing them); custodial services hold keys on clients' behalf.",
    "'Not your keys, not your coins' is the consumer-risk headline: custodian failures (exchange collapses) and lost keys are the loss events driving custody rules and the safeguarding debate.",
    "The key IS the ownership — so who keeps the key is the whole question.");

  def("wcrypto", 2,
    "What distinguishes on-chain from off-chain activity?",
    "On-chain events are recorded on the ledger itself; off-chain activity happens outside it and only settles back later, if at all.",
    ["On-chain refers to activity falling inside the regulatory perimeter while off-chain activity sits outside it.",
     "On-chain transactions always settle instantly while off-chain transactions take several working days to clear.",
     "Off-chain refers to any transaction that is conducted in physical cash rather than through electronic means.",
     "On-chain activity is visible only to the two parties involved, while off-chain activity is publicly viewable."],
    "On-chain vs off-chain",
    "A transfer written to the blockchain is on-chain (transparent, final, fee-bearing); an exchange's internal book-keeping between its customers is off-chain — the chain never sees it.",
    "The gap matters for oversight: on-chain data is publicly analysable (blockchain analytics), while off-chain books are where exchange-collapse risk hid — knowing which layer an activity lives on is step one of assessing it.",
    "In the shared record book, or in somebody's private notebook that references it.");

  def("wcrypto", 2,
    "What is a consensus mechanism?",
    "The rules by which a ledger's nodes agree on the next valid block — proof-of-work and proof-of-stake are the big two.",
    ["The voting process by which token holders elect the ledger's directors.",
     "An arbitration scheme for resolving disputed card payments.",
     "The committee that approves changes to a cryptoasset's whitepaper.",
     "A regulatory requirement for unanimous board decisions."],
    "Consensus mechanism",
    "How strangers agree without a referee: proof-of-work makes rewriting history computationally expensive; proof-of-stake makes it economically expensive via staked collateral.",
    "Consensus choice drives the properties policy cares about — energy use (the PoW debate), finality speed, and where control concentrates (miners vs large stakers).",
    "The agreement rules that keep thousands of copies of the ledger identical.");

  def("wcrypto", 2,
    "What is an oracle in the smart-contract world?",
    "A service that feeds real-world data — prices, weather, results — onto the chain so contracts can act on it.",
    ["A senior developer who audits smart-contract code before launch.",
     "The database company whose software runs most blockchains.",
     "A prediction market that forecasts cryptoasset prices.",
     "The founder's account with special administrative rights."],
    "Oracle (blockchain)",
    "Smart contracts can only see the chain; oracles import outside facts (the GBP/USD rate, a flight delay) that contracts then execute against.",
    "Oracles are a trust re-entry point in a 'trustless' system — manipulated feeds have caused major DeFi exploits, so oracle design is where many smart-contract risk assessments focus.",
    "The messenger that tells the blockchain what happened in the real world.");

  /* ===== Payments & Fintech (wpay) — 12 ===== */

  def("wpay", 1,
    "What are payment rails?",
    "The underlying networks that actually move money — Faster Payments, Bacs, CHAPS, card networks, SWIFT.",
    ["The security barriers that stop payments going to sanctioned parties.",
     "The queues in which pending transactions wait during outages.",
     "The fee schedules that banks publish for business customers.",
     "The cables physically connecting bank data centres."],
    "Payment rails",
    "The infrastructure layer beneath every app and bank: each rail has its own speed, cost, limits and rules — CHAPS for high-value same-day, Bacs for batch direct debits, Faster Payments for instant retail transfers.",
    "Fintech innovation is often rail arbitrage — building better experiences on old rails or moving flows to new ones (including stablecoins) — so knowing which rail a product rides tells you most of its risk profile.",
    "The train tracks money travels on; apps are just the ticket offices.");

  def("wpay", 1,
    "What is the UK's Faster Payments System (FPS)?",
    "The rail for near-instant bank-to-bank transfers, running 24/7 — what most UK app payments use.",
    ["A premium courier service for delivering chequebooks overnight.",
     "The card network's contactless payment acceleration programme.",
     "A scheme letting merchants take payment before goods ship.",
     "The Bank of England's system for settling between central banks."],
    "Faster Payments",
    "Launched 2008: seconds-fast, always-on transfers between UK accounts, now the default retail rail. Its speed is also why APP fraud is so damaging — money is gone and dispersed in minutes.",
    "The New Payments Architecture (NPA) programme to renew this infrastructure, and the reimbursement rules for fraud over it, are standing items in UK payments policy.",
    "The reason a bank transfer arrives before you've closed the app.");

  def("wpay", 1,
    "What is open banking?",
    "Regulated, consent-based access to bank accounts for third parties via APIs — to view data or initiate payments.",
    ["A programme of banks opening branches inside supermarkets so customers can access services for longer hours.",
     "The requirement for banks to publish their core banking source code as open-source software for scrutiny.",
     "The removal of fees on all current-account transactions, mandated to increase competition between banks.",
     "A scheme under which any customer may open a current account without providing identity documents."],
    "Open banking",
    "Born of PSD2/CMA remedies: with the customer's consent, authorised third parties read account data or initiate payments through standardised APIs — the plumbing behind account aggregation and pay-by-bank.",
    "It reframed account data as the customer's asset, not the bank's, and its successor debates (open finance, smart data across sectors) extend the same logic to pensions, insurance and beyond.",
    "Your bank data and payment buttons, made available — with your consent — to apps you choose.");

  def("wpay", 2,
    "What is the difference between an AISP and a PISP?",
    "AISPs read account information with consent; PISPs initiate payments from the account with consent.",
    ["AISPs serve individuals while PISPs serve only business customers.",
     "AISPs are banks and PISPs are the technology firms they hire.",
     "PISPs handle international payments while AISPs handle domestic.",
     "They are two names for the same open-banking permission."],
    "AISP vs PISP",
    "The two open-banking roles: Account Information Service Providers aggregate and analyse account data (budgeting apps, lending checks); Payment Initiation Service Providers trigger transfers (pay-by-bank checkout).",
    "The split matters because the risks differ — data protection and misuse for AISPs, fraud and liability for PISPs — and authorisation, permissions and supervision follow the role.",
    "One may look at the account; the other may press 'send'.");

  def("wpay", 2,
    "In card payments, what are the acquirer and the issuer?",
    "The acquirer is the merchant's payment bank; the issuer is the customer's card-issuing bank.",
    ["The acquirer buys failed fintechs while the issuer floats them.",
     "The issuer prints physical cards while the acquirer recycles them.",
     "Both are roles played by the card network itself, like Visa.",
     "The acquirer sets exchange rates and the issuer sets fees."],
    "Acquirer vs issuer",
    "Every card payment is a four-party dance: cardholder → issuer (their bank) → network (Visa/Mastercard) → acquirer (merchant's provider) → merchant, with authorisation flowing one way and money the other.",
    "The map locates everything else — interchange flows issuer-ward, chargebacks travel the same path in reverse, and 'payments firms' (Stripe, Adyen, Worldpay) are mostly acquirers or their processors.",
    "The customer's bank and the shop's bank, meeting through the card network.");

  def("wpay", 2,
    "What is an interchange fee?",
    "The fee paid per card transaction by the merchant's acquirer to the customer's issuing bank.",
    ["The commission a currency exchange charges on foreign cards.",
     "The monthly rental merchants pay for card terminals.",
     "A government levy on electronic payments funding fraud defence.",
     "The spread between contactless and chip-and-pin pricing."],
    "Interchange fee",
    "Set by the card networks, flowing acquirer→issuer, and passed on to merchants within the 'merchant service charge'. UK/EU rules cap consumer card interchange (0.2% debit / 0.3% credit).",
    "Interchange economics fund card rewards and drive policy fights — caps, post-Brexit cross-border rises, and merchant steering toward cheaper rails like pay-by-bank all revolve around it.",
    "The hidden per-tap toll that flows from the shop's side to the cardholder's bank.");

  def("wpay", 1,
    "What is APP fraud?",
    "Authorised push payment fraud — victims are deceived into sending money themselves, e.g. fake invoices or impersonation scams.",
    ["Fraud committed specifically through malicious mobile applications downloaded from unofficial app stores.",
     "The cloning of payment cards at cash machines using physical skimming devices attached to the reader.",
     "Unauthorised transactions made using card details that were stolen without the victim's knowledge.",
     "Employees inside a firm approving outgoing payments that exceed their delegated authority limits."],
    "APP fraud (authorised push payment)",
    "The victim authorises the payment — that's the point: romance, purchase, invoice-redirect and 'safe account' impersonation scams all trick the account holder into pressing send over instant rails.",
    "Because the customer 'authorised' it, traditional unauthorised-fraud protections didn't bite — which is why the UK's mandatory reimbursement regime (via the PSR) was created, and why fraud-data sharing is a live innovation area.",
    "The scam where the victim's own finger sends the money.");

  def("wpay", 1,
    "What is e-money (electronic money)?",
    "Prepaid digital value issued against funds received, usable for payments — how many fintech 'accounts' actually work.",
    ["Any money that exists as records in a bank's computer systems rather than as physical notes and coins.",
     "Cryptocurrency that a national regulator has formally approved for everyday retail payment use.",
     "The interest-bearing balance held in an online savings account with a fully licensed retail bank.",
     "Loyalty credit that retailers issue to customers, redeemable only against their own future purchases."],
    "E-money",
    "Issued by e-money institutions (EMIs) — customer funds are safeguarded at banks, not lent out, and balances aren't deposits: no FSCS protection, a distinction many customers miss.",
    "Much of UK fintech runs on EMI permissions, so safeguarding adequacy and wind-down when an EMI fails are core supervisory concerns — and exactly where 'is it a bank?' confusion causes harm.",
    "A prepaid digital purse that looks like a bank account but legally isn't one.");

  def("wpay", 1,
    "What is Buy Now, Pay Later (BNPL)?",
    "Short-term interest-free instalment credit at checkout, historically outside full consumer-credit regulation.",
    ["A subscription retail model in which the goods are only shipped once the final instalment has been paid.",
     "A mortgage product with regular payment holidays built into the contract from the very beginning.",
     "The extension of thirty-day corporate invoice payment terms to ordinary retail customers at checkout.",
     "Any ordinary credit card that offers an introductory zero-percent interest period to new customers."],
    "BNPL (Buy Now, Pay Later)",
    "Split-in-three-style checkout credit: frictionless, interest-free to the shopper (merchant-funded), and — via historical exemptions — outside much of the Consumer Credit Act's protections until now.",
    "The regulatory story is perimeter-catching-up-with-product: affordability checks, disclosures and Section 75-style protections for a product used heavily by younger and financially stretched consumers.",
    "Checkout credit in three easy slices — with the rulebook now catching up.");

  def("wpay", 1,
    "What are KYC and AML?",
    "Know Your Customer identity checks, within Anti-Money Laundering controls that detect and report criminal funds.",
    ["The marketing rules governing how and when financial firms are permitted to contact their customers.",
     "The capital requirements that protect depositors against losses in the event of a bank's failure.",
     "The accessibility standards that banking apps and websites must meet for customers with disabilities.",
     "The deadlines within which regulated firms must acknowledge and resolve customer complaints."],
    "KYC / AML",
    "The financial-crime baseline: verify who the customer is (KYC), monitor transactions, and file suspicious activity reports — obligations that scale poorly with manual processes.",
    "This is RegTech's biggest market (digital ID, screening, transaction monitoring) and a constant innovation trade-off: friction and false positives versus criminal flows — with crypto's Travel Rule extending it on-chain.",
    "Prove who you are; let the firm prove your money is clean.");

  def("wpay", 1,
    "What is a regulatory sandbox?",
    "A supervised space where firms test innovative products with real consumers under tailored safeguards.",
    ["A quarantined IT environment where banks test software patches.",
     "A watchlist of firms under investigation for misconduct.",
     "The waiting period before a licence application is reviewed.",
     "A simulator for training new supervisors on case files."],
    "Regulatory sandbox",
    "Pioneered by the FCA in 2016 and copied worldwide: eligible firms run live, bounded tests with regulator engagement — informing both the product's compliance and the regulator's understanding.",
    "Sandboxes are the emblem of pro-innovation regulation, and their descendants (digital sandbox with synthetic data, permanent always-open access) are core Innovation-department machinery.",
    "A safe paddling pool for testing new financial products on real people, with lifeguards.");

  def("wpay", 2,
    "What is the difference between RegTech and SupTech?",
    "RegTech helps firms meet regulatory obligations; SupTech helps regulators supervise — same technologies, opposite desks.",
    ["RegTech is the body of rules applying to technology firms while SupTech is the equivalent set for banks.",
     "RegTech is software that regulated firms are required to purchase while SupTech remains an optional extra.",
     "SupTech is simply the international, cross-border version of what domestic regulators call RegTech.",
     "The two terms are interchangeable and differ only in which industry conference happens to be using them."],
    "RegTech vs SupTech",
    "Compliance automation (reporting, monitoring, KYC) sold to firms is RegTech; data-driven supervision — ingesting returns, ML on firm data, market surveillance — built for regulators is SupTech.",
    "For an innovation team the pair frames both jobs at once: encouraging firms' RegTech adoption while building the FCA's own SupTech — often with the same ML techniques this app teaches.",
    "The same tools, worn by the regulated on one wrist and the regulator on the other.");

  /* ===== AWS & Cloud (waws) — 12 ===== */

  def("waws", 1,
    "What is cloud computing?",
    "Renting computing resources — servers, storage, databases — on demand over the internet, paying for what you use.",
    ["Storing your files on your own laptop in a special folder that synchronises to a backup drive overnight.",
     "Buying and racking your own physical servers in the office basement, maintained by in-house staff.",
     "A weather-modelling technique that financial forecasters use to estimate seasonal demand for products.",
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
     "One licensed user seat for accessing the AWS management console under a corporate agreement."],
    "Instance",
    "The basic unit of cloud compute (an EC2 instance): pick a type (sizes of CPU/RAM, e.g. t3.medium), an image (its operating system and software), start it, use it, stop it — billed while running.",
    "'Instance' language pervades everything (instance types, spot instances, instance hours), and its virtual-not-physical nature is the point: it can be created, resized, or thrown away in minutes.",
    "A computer conjured from the cloud — yours while the meter runs.");

  def("waws", 1,
    "What does 'spinning up' mean in cloud work?",
    "Creating and starting a resource — an instance, database or environment — so it's ready to use.",
    ["Encrypting a disk by rewriting it in a circular pattern.",
     "Restarting a crashed server repeatedly until it stabilises.",
     "Accelerating a training job by adding graphics processors.",
     "Archiving old resources into long-term cold storage."],
    "Spinning up (provisioning)",
    "The everyday verb for provisioning: 'spin up an instance', 'spin up a test environment'. Its opposite is tearing down. From spinning disks; now it just means 'bring into existence and start'.",
    "The cultural shift it encodes matters: resources are cattle, not pets — created on demand, deleted when done — which is what makes experimentation cheap and forgotten instances expensive.",
    "Switching on a computer that didn't exist a minute ago.");

  def("waws", 1,
    "What is Amazon EC2?",
    "AWS's core compute service — where you rent and run virtual servers (instances).",
    ["AWS's email and calendar suite for business customers.",
     "A cryptocurrency exchange operated by Amazon.",
     "The certification exam for cloud practitioners.",
     "Amazon's second-generation delivery drone programme."],
    "EC2 (Elastic Compute Cloud)",
    "The service behind 'instances': choose hardware profile and operating system image, attach storage and networking, and run anything from a website to an ML training job.",
    "'Elastic' is the philosophy — scale the fleet up for load and down after — and most other AWS services either run on EC2 underneath or exist to spare you managing it.",
    "The AWS shop counter where the virtual computers are rented.");

  def("waws", 1,
    "What is Amazon S3, and what is a bucket?",
    "S3 is AWS's object storage for files of any size; a bucket is the named container you store them in.",
    ["S3 is AWS's relational database engine and buckets are the individual tables stored within it.",
     "S3 is AWS's messaging queue service and buckets are the named channels that messages flow through.",
     "S3 is AWS's automated backup software and buckets are the scheduled restore points it creates.",
     "S3 is AWS's managed firewall service and buckets are the rule groups that define allowed traffic."],
    "S3 and buckets",
    "Simple Storage Service: durable, effectively unlimited storage for objects (files) addressed by key within globally named buckets — the default home for datasets, logs, backups and model artifacts.",
    "For data work S3 is where everything lives, and its access controls are where cloud breaches most famously happen — the 'public bucket' misconfiguration is a cautionary tale every team learns.",
    "The infinite filing cabinet; a bucket is one labelled drawer.");

  def("waws", 1,
    "What are AWS regions and availability zones?",
    "Regions are geographic areas (like eu-west-2, London); each contains multiple isolated data-centre zones for resilience.",
    ["Regions are AWS's pricing tiers and availability zones are the discount bands within each tier.",
     "Regions are the legal jurisdictions AWS operates in and zones are the tax categories that apply there.",
     "Availability zones are the time zones AWS uses to schedule overnight maintenance windows worldwide.",
     "Regions are network performance classes, ranked from bronze up to gold, that customers choose between."],
    "Regions and availability zones",
    "A region = a cluster of independent availability zones (AZs) close enough for fast networking, far enough apart that one failure doesn't take the others. Deploying across AZs is resilience 101.",
    "Region choice is a policy decision, not just technical: data residency (keeping data in eu-west-2), latency, and service availability — the geography question every cloud assessment asks first.",
    "Which country your cloud lives in, and how many separate buildings it's spread across.");

  def("waws", 1,
    "What is serverless computing (e.g. AWS Lambda)?",
    "Running code without managing servers — you upload functions, the platform runs them on demand and bills per execution.",
    ["Computing performed on bare hardware from which the server cases and enclosures have been removed.",
     "A discounted pricing tier under which AWS reserves the right to reclaim your instance at any moment.",
     "Application software that runs entirely inside the user's web browser without any backend at all.",
     "A peer-to-peer computing model where workloads are shared between users with no data centres involved."],
    "Serverless (Lambda)",
    "Servers still exist — you just never see them: a Lambda function fires on a trigger (file lands in S3, API call arrives), runs, and stops; no idle machines, no patching, per-millisecond billing.",
    "It's the natural fit for event-driven glue (process each uploaded file, respond to each webhook) and its trade-offs — time limits, cold starts, less control — define when a real instance is still needed.",
    "Code that summons a computer only for the moment it's needed.");

  def("waws", 1,
    "What is IAM in AWS?",
    "Identity and Access Management — who (users, roles, services) may do what, to which resources.",
    ["The billing dashboard that breaks down an organisation's cloud spend by department and project.",
     "AWS's built-in instant messaging service for discussing support tickets with cloud engineers.",
     "The hardware inventory system that tracks every physical machine inside an AWS data centre.",
     "A managed machine-learning service that verifies customer identities from documents and selfies."],
    "IAM (Identity and Access Management)",
    "The permission fabric: policies attach to users, groups and roles, defining allowed actions ('read this bucket, launch no instances'). Services assume roles rather than holding passwords.",
    "Nearly every cloud security review is an IAM review — least privilege, no long-lived keys, roles over users — because misconfigured permissions, not exotic hacks, cause most cloud incidents.",
    "The keyring and the rulebook for everything in the account.");

  def("waws", 2,
    "What is autoscaling?",
    "Automatically adding or removing instances to match load — capacity follows demand.",
    ["Automatic font enlargement in the AWS console interface.",
     "The gradual price increase applied to long-running instances.",
     "Automatic upgrades of instances to newer hardware generations.",
     "Scaling images to fit different device screens."],
    "Autoscaling",
    "Define a fleet, a metric (CPU, queue length) and limits; the platform launches instances under load and terminates them when it eases — elasticity made automatic.",
    "It's the economic heart of the cloud case — pay for the demand curve, not the peak — and its failure modes (scaling too slowly for spikes, or costing a fortune misconfigured) are classic operational lessons.",
    "Staff the tills for the queue you have, minute by minute.");

  def("waws", 2,
    "What is the difference between on-demand and spot instances?",
    "On-demand is full-price and guaranteed; spot is heavily discounted spare capacity AWS can reclaim at short notice.",
    ["On-demand instances run on dedicated physical hardware while spot instances are merely virtual machines.",
     "Spot instances must be reserved a full year in advance at prices determined by a sealed-bid auction.",
     "On-demand pricing applies to storage services while spot pricing applies exclusively to networking.",
     "Spot instances are only permitted to run overnight, when overall demand on the platform is low."],
    "On-demand vs spot pricing",
    "Spot sells idle capacity at up to ~90% off, with the catch of two-minute reclamation warnings — perfect for interruptible work (batch jobs, some ML training), wrong for anything that can't die mid-task.",
    "Choosing purchase models (on-demand, spot, reserved/savings plans) is the core of cloud cost management — the difference between a modest and an eye-watering bill for the same compute.",
    "Full fare with a guaranteed seat, or standby tickets that are cheap until the seat's owner shows up.");

  def("waws", 2,
    "What is Amazon SageMaker?",
    "AWS's managed machine-learning platform — notebooks, training jobs, and model deployment as endpoints.",
    ["A logistics optimisation service that plans the most efficient routes through Amazon's warehouses.",
     "A code editor plugin that automatically completes Python functions as data scientists type them.",
     "AWS's smart herb-growing kit, marketed to companies as part of corporate wellness programmes.",
     "A commercial data marketplace where teams buy and sell pre-labelled machine-learning datasets."],
    "SageMaker",
    "The ML workflow as managed services: hosted notebooks for exploration, training jobs on rented fleets, model registry, and one-click deployment to auto-scaling inference endpoints.",
    "It's where 'this app's sklearn knowledge' meets 'work AWS reality' — the same fit/predict lifecycle, industrialised, with MLOps concerns (monitoring, drift, endpoints) attached.",
    "The cloud workshop where models are built, trained and put to work.");

  def("waws", 2,
    "What is a VPC (Virtual Private Cloud)?",
    "Your own isolated network inside AWS — private address space, subnets, and firewall rules for your resources.",
    ["A premium support contract that gives your team direct access to a named AWS cloud engineer.",
     "The verified public catalogue listing which AWS services have been approved for regulated firms.",
     "The encrypted network tunnel established between your laptop and the AWS management console.",
     "A privately negotiated pricing agreement offered to AWS's largest enterprise customers."],
    "VPC (Virtual Private Cloud)",
    "The network container instances live in: public subnets face the internet, private ones don't; security groups and network ACLs gate the traffic between everything.",
    "VPC design is where 'is this system exposed?' gets decided — the private-subnet-plus-controlled-egress pattern is the baseline for handling sensitive data in cloud reviews.",
    "A fenced private estate inside the public cloud, with gates you control.");

})();
