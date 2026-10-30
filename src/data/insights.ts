// Short notes on land and property law, for the insights page and the home page.
// General information only; each article ends with the not-legal-advice note.

export type Insight = {
  slug: string
  title: string
  category: 'Title' | 'Transactions' | 'Revenue' | 'Succession'
  date: string
  read: string
  excerpt: string
  sections: { heading?: string; paragraphs: string[] }[]
}

export const insightCategories = ['All', 'Title', 'Transactions', 'Revenue', 'Succession'] as const

export const insights: Insight[] = [
  {
    slug: 'reading-a-7-12-extract',
    title: 'What a 7/12 extract tells you — and what it doesn’t',
    category: 'Title',
    date: '14 Oct 2026',
    read: '5 min',
    excerpt: 'The 7/12 is the first document anyone asks for. It is also the one most often read on its own, which is where trouble starts.',
    sections: [
      {
        paragraphs: [
          'The 7/12 extract — Village Forms 7 and 12 read together — is the record of rights for a piece of agricultural land in Gujarat. It names the occupant, shows the area and tenure, lists encumbrances and records what is grown. For most transactions, it is the first page on the table.',
        ],
      },
      {
        heading: 'What it shows',
        paragraphs: [
          'The current holder and their share, the survey or block number, the land’s area and assessment, its tenure (old, new or restricted), and any charges noted against it, such as a bank loan or a pending proceeding. Each name and charge carries the number of the mutation entry that put it there.',
        ],
      },
      {
        heading: 'What it doesn’t',
        paragraphs: [
          'The 7/12 is kept for revenue purposes. It reflects the latest certified entries, not the full history, and an entry is only as sound as the document or order behind it. A sale, partition or inheritance that was never recorded will not appear; an entry certified on a defective document may.',
          'That is why a title search reads the mutation entries in Village Form 6 one by one, and goes behind them to the registered deeds and orders. The extract tells you where to look. The chain tells you whether to buy.',
        ],
      },
    ],
  },
  {
    slug: 'banakhat-before-sale-deed',
    title: 'Banakhat before the sale deed: what to put in writing',
    category: 'Transactions',
    date: '22 Sep 2026',
    read: '6 min',
    excerpt: 'An agreement to sell doesn’t transfer the land, but it decides almost everything about how the transfer will happen.',
    sections: [
      {
        paragraphs: [
          'A Banakhat, or agreement to sell, records the terms on which land will be sold later. Under the Transfer of Property Act it does not, by itself, create any interest in the property: ownership passes by a registered sale deed. Yet the agreement is where most disputes begin, because it is where the parties promised each other things.',
        ],
      },
      {
        heading: 'The terms that matter',
        paragraphs: [
          'The price and each instalment, with dates. What the seller must do before the deed — clear a loan, obtain a permission, convert tenure — and by when. Who pays stamp duty and registration charges. Whether possession changes hands now or later. What happens if either side fails, including how any earnest money is treated.',
        ],
      },
      {
        heading: 'Possession and registration',
        paragraphs: [
          'Where possession is handed over under the agreement, the stamp duty and registration consequences change, and a buyer who wants the protection of part performance will need a registered document. The right answer depends on the deal, so it is worth settling before signing rather than after.',
        ],
      },
    ],
  },
  {
    slug: 'new-tenure-to-old-tenure',
    title: 'New tenure to old tenure: why the conversion matters',
    category: 'Revenue',
    date: '28 Aug 2026',
    read: '4 min',
    excerpt: 'Land held on new or restricted tenure comes with conditions. Knowing them early changes what you can do with it.',
    sections: [
      {
        paragraphs: [
          'Much agricultural land in Gujarat was granted, regranted or restored under tenancy and land reform laws on conditions: it cannot be freely sold, mortgaged or put to other use without permission. The 7/12 marks it as new or restricted tenure.',
        ],
      },
      {
        heading: 'What conversion involves',
        paragraphs: [
          'Converting to old tenure generally requires an application to the Collector, scrutiny of the land’s history and payment of a premium. Once converted, the land can be dealt with like other old tenure land, subject to the usual rules.',
        ],
      },
      {
        heading: 'Why it comes first',
        paragraphs: [
          'A transfer made in breach of tenure conditions can be challenged, and the land may even be liable to be resumed. For a buyer, the tenure entry is not a formality — it decides whether the deal can go ahead now, later, or only once permission is in hand.',
        ],
      },
    ],
  },
  {
    slug: 'varsai-after-a-death',
    title: 'Varsai entries after a death in the family',
    category: 'Succession',
    date: '6 Aug 2026',
    read: '4 min',
    excerpt: 'Recording the heirs’ names is often put off. It is far simpler done early, while everyone agrees.',
    sections: [
      {
        paragraphs: [
          'When a landholder dies, the heirs’ names are entered in the revenue records through a varsai (heirship) entry. Until that is done, the records still show the deceased, and any sale, loan or permission will stall.',
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          'An application is made with the death certificate and details of every heir, usually supported by an affidavit or a family tree. The entry is published so that anyone with an objection can raise it, and is certified once the period passes.',
        ],
      },
      {
        heading: 'Getting it right',
        paragraphs: [
          'Leaving out an heir — a married daughter is the common example — invites a challenge years later. If some heirs wish to give up their share, that is best done afterwards, by a proper release, rather than by leaving them off the entry.',
        ],
      },
    ],
  },
]
