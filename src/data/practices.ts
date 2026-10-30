// The practice areas, shared by the home page's pinned section, the practice page and a page per area.
// `desc` is the two-line summary used on the artboard (split at the <Br />); the detail page adds the rest.

export type Practice = {
  slug: string
  name: string
  // One- or two-word label for compact lists
  short: string
  // Where the work is heard or filed
  forum: string
  desc: [string, string]
  statement: string
  body: string[]
  handles: string[]
  // What a client should bring to the first meeting
  documents: string[]
  faqs: { q: string; a: string }[]
  lead: string
}

export const practices: Practice[] = [
  {
    slug: 'land-title',
    name: 'Land Title & Due Diligence',
    short: 'Title',
    forum: 'Revenue records · Sub-Registrar',
    desc: ['Title searches and certificates traced through 7/12, 8-A and', 'every mutation entry, before money or possession changes hands'],
    statement: 'A title is only as good as the chain behind it. We read every entry, not just the latest one.',
    body: [
      'Before a purchase, a loan or a development agreement, we trace the land back through the 7/12 extract, the 8-A khata and each mutation entry in Village Form 6, alongside the registered documents that should stand behind them.',
      'The result is a written title report that sets out the chain, the tenure, any encumbrance or pending proceeding, and the points that must be cleared before you sign — in plain language, with the entry numbers to back it.',
    ],
    handles: ['Title search & report', 'Title certificates', 'Search at Sub-Registrar office', 'Encumbrance review', 'Bank & lender opinions', 'TP scheme & zoning checks'],
    documents: ['Survey / block number, village and taluka', 'Latest 7/12 and 8-A extracts', 'Any mutation entries (VF-6) you hold', 'Previous sale deeds or agreements', 'Seller details and identity documents'],
    faqs: [
      { q: 'How far back do you trace the title?', a: 'Usually thirty years or more, and further where the chain needs it — for example where land came out of a grant, a tenancy or a family partition.' },
      { q: 'Is a 7/12 extract proof of ownership?', a: 'It is a record of rights kept for revenue purposes. It is strong evidence, but ownership rests on the documents and orders behind each entry, which is why we read them together.' },
      { q: 'How long does a title report take?', a: 'It depends on how many entries and offices are involved. We give you a timeline once we have seen the records.' },
    ],
    lead: 'Aarav Mehta',
  },
  {
    slug: 'property-transactions',
    name: 'Property Transactions',
    short: 'Transactions',
    forum: 'Sub-Registrar · Stamp authorities',
    desc: ['Agreements to sell, sale deeds, gifts, leases and releases,', 'drafted for the deal in front of you and taken through registration'],
    statement: 'Every clause should answer a question someone will ask later. We draft for that day.',
    body: [
      'We draft and review Banakhat (agreements to sell), sale deeds, MOUs, gift deeds, releases, leases and powers of attorney — fitted to the land, the parties and how payment and possession will actually move.',
      'We work out stamp duty and registration, prepare the schedules and annexures, and attend execution and registration, so the documents that leave the Sub-Registrar’s office are the ones that were agreed.',
    ],
    handles: ['Agreements to sell (Banakhat)', 'Sale & conveyance deeds', 'Gift, release & relinquishment', 'Leases & licences', 'Powers of attorney', 'Stamp duty & registration'],
    documents: ['Title documents and the latest 7/12', 'Agreed price and payment schedule', 'Details and IDs of every party', 'Any earlier agreement or token receipt', 'Plans or maps for the land or unit'],
    faqs: [
      { q: 'Does an agreement to sell make me the owner?', a: 'No. An agreement to sell records the terms of a future sale; ownership passes by a registered sale deed. The agreement still matters, because it fixes what each side must do before then.' },
      { q: 'Should an agreement to sell be registered?', a: 'Often, yes — particularly where possession is handed over. Registration and stamp duty depend on the terms, so we look at the deal before advising.' },
      { q: 'Can you review a draft the other side has sent?', a: 'Yes. We mark it up with the changes we recommend and a short note explaining each one.' },
    ],
    lead: 'Riya Patel',
  },
  {
    slug: 'revenue-na',
    name: 'Revenue & NA Matters',
    short: 'Revenue',
    forum: 'Mamlatdar · Collector · SSRD',
    desc: ['Non-agricultural permission, tenure conversion, mutation disputes', 'and revenue appeals, from the Mamlatdar to the State authorities'],
    statement: 'Revenue matters turn on procedure. Getting the file right the first time saves months.',
    body: [
      'We prepare and follow up applications for non-agricultural (NA) use, conversion from new or restricted tenure, and other permissions, with the affidavits, declarations and plans each office expects.',
      'Where an entry has been certified wrongly or an application refused, we take objections and appeals through the revenue hierarchy — Mamlatdar, Prant Officer, Collector and the Secretary (Appeals) — and, where needed, to the High Court.',
    ],
    handles: ['NA permission applications', 'New to old tenure conversion', 'Mutation objections', 'RTS appeals & revisions', 'Premium & penalty matters', 'Land acquisition compensation'],
    documents: ['7/12, 8-A and relevant VF-6 entries', 'Any order, notice or refusal received', 'Site plan and location map', 'Earlier permissions on the land', 'Identity and authority documents'],
    faqs: [
      { q: 'What is the difference between new and old tenure?', a: 'New or restricted tenure land carries conditions on transfer and use; converting it to old tenure usually needs permission and payment of a premium. It shapes what you can do with the land, so we check it first.' },
      { q: 'An entry was certified against us. Is it too late?', a: 'Appeals have time limits, so act quickly — but delay can sometimes be explained. Bring the order and we will tell you where you stand.' },
      { q: 'Do you appear before the revenue officers yourselves?', a: 'Yes. The advocate who prepares the file attends the hearings.' },
    ],
    lead: 'Kunal Shah',
  },
  {
    slug: 'civil-litigation',
    name: 'Civil & Property Litigation',
    short: 'Litigation',
    forum: 'Civil Courts · Gujarat High Court',
    desc: ['Suits for specific performance, declaration, partition and injunction,', 'and writ petitions on land matters before the High Court'],
    statement: 'Good litigation starts long before the first hearing — with a clear account of what happened.',
    body: [
      'We act in civil suits over land and property: specific performance of agreements, declarations of title, partition among co-owners, cancellation of documents and injunctions to protect possession.',
      'We also file and defend writ petitions and appeals before the Gujarat High Court on revenue and land matters, and advise on settlement whenever it serves the client better than a decree.',
    ],
    handles: ['Specific performance', 'Declaration & cancellation', 'Partition suits', 'Injunctions & possession', 'Writ petitions', 'Appeals & revisions'],
    documents: ['Any plaint, notice or summons received', 'Agreements, deeds and receipts in dispute', 'Revenue records for the property', 'Correspondence with the other side', 'A short timeline in your own words'],
    faqs: [
      { q: 'Should I send a legal notice before filing?', a: 'Often it helps, and for some claims it is required. A well-drafted notice can also settle the matter before it reaches court.' },
      { q: 'How long will the case take?', a: 'No honest advocate can promise a date. We explain the stages, what moves them forward and what is in your control.' },
      { q: 'Can a dispute be settled midway?', a: 'Yes, at almost any stage — including through mediation or Lok Adalat. We keep that option open throughout.' },
    ],
    lead: 'Nisha Desai',
  },
  {
    slug: 'succession',
    name: 'Wills, Succession & Family Property',
    short: 'Succession',
    forum: 'Civil Courts · Revenue records',
    desc: ['Wills, heirship (varsai) entries, succession certificates and', 'family settlements, so property passes the way it was meant to'],
    statement: 'The kindest thing a family can inherit is a record that is already in order.',
    body: [
      'We draft wills and family settlements, and help heirs record their names after a death — varsai entries in the revenue records, succession certificates and probate where the property or the bank asks for it.',
      'Where family members disagree, we look first for a settlement that can be recorded and registered, and turn to partition proceedings only when it cannot.',
    ],
    handles: ['Wills & codicils', 'Varsai (heirship) entries', 'Succession certificates', 'Probate & letters of administration', 'Family settlements', 'Release among heirs'],
    documents: ['Death certificate of the owner', 'Family tree and heirs’ IDs', 'Any will or earlier settlement', 'Revenue records and title documents', 'Bank or society requirements, if any'],
    faqs: [
      { q: 'Is a will required to be registered?', a: 'Registration is optional, but it helps prove the will later. What matters most is that it is properly signed and witnessed.' },
      { q: 'How do heirs get their names on the 7/12?', a: 'Through a varsai (heirship) application with the death certificate and family details. It is published for objections before it is certified.' },
      { q: 'One heir will not cooperate. What now?', a: 'A release or settlement may still be possible among the others; if not, partition proceedings are the route. We start by mapping each heir’s share.' },
    ],
    lead: 'Aarav Mehta',
  },
]
