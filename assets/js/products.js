/* ==========================================================================
   PRODUCT CATALOGUE DATA
   Add, remove or edit products here; the Products page and the homepage
   "Featured Products" grid are generated from this list.

   Fields:
     id          unique, lowercase, used in URLs (enquiry.html?product=id)
     name        product name
     category    one of: 'makhana' | 'dry-fruits' | 'beverages' | 'snacks'
     image       path from the site root (replace the file to change the photo)
     short       one-line description for cards
     description longer text for the "View Product" panel
     highlights  short bullet points
     packaging   packaging / pack size information
     channels    which business channels the product is offered through
     featured    true = shown on the homepage
     badge       optional small label, e.g. 'Concept' or 'New'
     price       optional, only shown when SITE_CONFIG.showPrices is true
   ========================================================================== */
window.PRODUCT_CATEGORIES = {
  'makhana': { label: 'Makhana', page: 'makhana.html' },
  'dry-fruits': { label: 'Dry Fruits', page: 'dry-fruits.html' },
  'beverages': { label: 'Beverages', page: 'beverages.html' },
  'snacks': { label: 'Healthy Snacks', page: 'products.html#snacks' },
};

window.PRODUCTS = [
  {
    id: 'makhana-premium', name: 'Premium Makhana', category: 'makhana',
    image: 'assets/images/products/makhana-premium.webp',
    short: 'Large, bright, hand-sorted fox nuts for premium snacking and gifting.',
    description: 'Our premium whole makhana is selected for size, colour and crunch. Roast it with a little ghee, season it your way, or use it in kheer and curries.',
    highlights: ['Whole, graded pearls', 'Light and crunchy', 'Naturally gluten-free'],
    packaging: 'Retail pouches, jars and bulk packs: sizes to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'makhana-roasted', name: 'Roasted Makhana', category: 'makhana',
    image: 'assets/images/products/makhana-roasted.webp',
    short: 'Lightly roasted makhana with a deeper, nutty crunch. Ready to eat.',
    description: 'Gently roasted for a richer flavour and satisfying crunch, roasted makhana is a modern, ready-to-eat alternative to fried snacks.',
    highlights: ['Ready to eat', 'Roasted, not fried', 'Great for snack shelves'],
    packaging: 'Retail snack packs and bulk: sizes to be confirmed',
    channels: ['Retail', 'Wholesale', 'Distribution'], featured: true,
  },
  {
    id: 'makhana-flavoured', name: 'Flavoured Makhana', category: 'makhana', badge: 'Concept',
    image: 'assets/images/products/makhana-flavoured.webp',
    short: 'Seasoned makhana concepts such as masala, peri-peri and herbs.',
    description: 'Flavoured makhana concepts for modern snack aisles, cafés and private-label partners. Flavour profiles can be developed with partners.',
    highlights: ['Modern flavour profiles', 'Private-label friendly', 'Snack-aisle ready'],
    packaging: 'Retail snack packs: to be confirmed',
    channels: ['Retail', 'Private Label'],
  },
  {
    id: 'almonds', name: 'Almonds', category: 'dry-fruits',
    image: 'assets/images/products/almonds.webp',
    short: 'Crunchy, versatile almonds for snacking, soaking and gifting.',
    description: 'Premium almond kernels selected for size and taste, perfect for everyday snacking, baking, soaking overnight and festive gifting.',
    highlights: ['Whole kernels', 'Sizes and grades on request', 'Everyday essential'],
    packaging: 'Retail pouches, gift packs, bulk cartons: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'cashews', name: 'Cashews', category: 'dry-fruits',
    image: 'assets/images/products/cashews.webp',
    short: 'Buttery, creamy cashews for snacking, cooking and sweets.',
    description: 'Creamy, mildly sweet cashews for snacking, rich gravies, Indian sweets and premium gift boxes. Whole and split grades on request.',
    highlights: ['Whole and split grades', 'Creamy texture', 'Ideal for HoReCa'],
    packaging: 'Retail pouches and bulk tins/cartons: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'pistachios', name: 'Pistachios', category: 'dry-fruits',
    image: 'assets/images/products/pistachios.webp',
    short: 'The green jewel: in-shell and kernels for snacking and desserts.',
    description: 'Distinctive in flavour and colour, pistachios are enjoyed in-shell as a snack or as kernels in desserts, sweets and garnishes.',
    highlights: ['In-shell and kernels', 'Rich colour', 'Premium gifting'],
    packaging: 'Retail pouches and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'walnuts', name: 'Walnuts', category: 'dry-fruits',
    image: 'assets/images/products/walnuts.webp',
    short: 'Rich, earthy walnut kernels for breakfast bowls and baking.',
    description: 'Delicate walnut kernels with a rich, earthy taste, perfect for breakfast bowls, baking, salads and snacking.',
    highlights: ['Halves and pieces', 'Rich flavour', 'Breakfast favourite'],
    packaging: 'Retail pouches and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'raisins', name: 'Raisins', category: 'dry-fruits',
    image: 'assets/images/products/raisins.webp',
    short: 'Black and golden raisins with natural sweetness.',
    description: 'Naturally sweet black and golden raisins for snacking, cereals, baking and traditional Indian sweets.',
    highlights: ['Black, golden and green varieties', 'Naturally sweet', 'Bakery friendly'],
    packaging: 'Retail pouches and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'dates', name: 'Dates', category: 'dry-fruits',
    image: 'assets/images/products/dates.webp',
    short: 'Soft, rich dates for everyday energy and festive occasions.',
    description: 'Soft, rich and naturally sweet dates, a wholesome treat for everyday energy, fasting and festive gifting.',
    highlights: ['Soft and rich', 'Naturally sweet', 'Gift-ready'],
    packaging: 'Retail boxes, pouches and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'], featured: true,
  },
  {
    id: 'figs', name: 'Figs (Anjeer)', category: 'dry-fruits',
    image: 'assets/images/products/figs.webp',
    short: 'Chewy dried figs with a honeyed flavour.',
    description: 'Dried figs with a chewy texture and honeyed flavour for snacking, desserts and festive platters.',
    highlights: ['Whole and garland styles', 'Chewy texture', 'Festive favourite'],
    packaging: 'Retail pouches and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Export'],
  },
  {
    id: 'mixed-dry-fruits', name: 'Mixed Dry Fruits', category: 'dry-fruits',
    image: 'assets/images/products/mixed-dry-fruits.webp',
    short: 'A premium medley of almonds, cashews, pistachios, walnuts and raisins.',
    description: 'A ready-made medley of our premium dry fruits for gifting, corporate hampers and everyday snacking.',
    highlights: ['Ready-made medley', 'Corporate gifting', 'Custom mixes on request'],
    packaging: 'Gift boxes, pouches and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Corporate'],
  },
  {
    id: 'beverage-citrus', name: 'Citrus Refresh', category: 'beverages', badge: 'Concept',
    image: 'assets/images/products/beverage.webp',
    short: 'Healthy beverage concept with bright lemon and orange notes.',
    description: 'A zesty, uplifting wellness drink concept built around citrus. Recipe, format and pack size can be developed with retail and business partners.',
    highlights: ['Bright citrus profile', 'Everyday refreshment', 'Partner development'],
    packaging: 'Bottle format: to be confirmed',
    channels: ['Retail', 'HoReCa', 'Private Label'], featured: true,
  },
  {
    id: 'beverage-herbal', name: 'Herbal Green', category: 'beverages', badge: 'Concept',
    image: 'assets/images/beverages/beverage-herbal.webp',
    short: 'Cooling beverage concept with mint, lime and garden herbs.',
    description: 'A cool, calming wellness drink concept inspired by mint, lime and herbs. Open to development with partners.',
    highlights: ['Mint and lime', 'Calming and cool', 'Café-friendly'],
    packaging: 'Bottle format: to be confirmed',
    channels: ['Retail', 'HoReCa', 'Private Label'],
  },
  {
    id: 'beverage-berry', name: 'Berry Bloom', category: 'beverages', badge: 'Concept',
    image: 'assets/images/beverages/beverage-berry.webp',
    short: 'Berry-forward beverage concept with a soft floral finish.',
    description: 'A rich berry wellness drink concept with a soft floral finish, designed with café menus and premium retail in mind.',
    highlights: ['Berry-forward', 'Floral finish', 'Premium presentation'],
    packaging: 'Bottle format: to be confirmed',
    channels: ['Retail', 'HoReCa', 'Private Label'],
  },
  {
    id: 'snack-trail-mix', name: 'Nut & Raisin Trail Mix', category: 'snacks',
    image: 'assets/images/products/snacks-trail-mix.webp',
    short: 'Almonds, cashews, raisins and more in one wholesome mix.',
    description: 'A wholesome trail mix of premium nuts and raisins, made for on-the-go snacking. Makhana-based blends can be developed on request.',
    highlights: ['Nuts and raisins', 'On-the-go snack', 'Custom blends on request'],
    packaging: 'Snack packs and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'Corporate'],
  },
  {
    id: 'snack-nut-mix', name: 'Roasted Nut Mix', category: 'snacks',
    image: 'assets/images/products/snacks-nut-mix.webp',
    short: 'A savoury mix of roasted almonds, cashews and pistachios.',
    description: 'A premium savoury mix of roasted almonds, cashews and pistachios for snacking, bars and hospitality.',
    highlights: ['Roasted nuts', 'Savoury snack', 'HoReCa friendly'],
    packaging: 'Snack packs and bulk: to be confirmed',
    channels: ['Retail', 'Wholesale', 'HoReCa'],
  },
  {
    id: 'snack-energy-bites', name: 'Dry Fruit Energy Bites', category: 'snacks', badge: 'Concept',
    image: 'assets/images/products/snacks-energy-bites.webp',
    short: 'Bite-sized dry fruit and seed balls, a naturally sweet snack concept.',
    description: 'Bite-sized energy balls made from dates, dry fruits and seeds. A snack concept for health-conscious consumers and private label.',
    highlights: ['Date-sweetened concept', 'Bite-sized', 'Private-label friendly'],
    packaging: 'Retail boxes: to be confirmed',
    channels: ['Retail', 'Private Label'],
  },
];
