/* ==========================================================================
   SITE CONFIGURATION: edit your business details here.
   These values are injected into every page (header, footer, contact page,
   enquiry page, mobile sticky bar) by assets/js/main.js.
   ========================================================================== */
window.SITE_CONFIG = {
  companyName: 'Your Company',

  // Contact details
  email: 'hello@yourcompany.com',
  phone: '+91 XXXXX XXXXX',            // e.g. '+91 98765 43210'
  whatsapp: '+91 XXXXX XXXXX',         // e.g. '+91 98765 43210' (used for wa.me links)
  whatsappMessage: 'Hello! I would like to know more about your products.',
  address: 'Your Business Address',    // e.g. 'Plot 12, Industrial Area, Patna, Bihar 800001, India'
  businessHours: 'Mon – Sat, 10:00 – 18:00 IST',

  // Social media: leave a value empty ('') to show the icon as "coming soon"
  socialLinks: {
    instagram: '',   // 'https://www.instagram.com/yourbrand'
    facebook: '',    // 'https://www.facebook.com/yourbrand'
    linkedin: '',    // 'https://www.linkedin.com/company/yourbrand'
    youtube: '',     // 'https://www.youtube.com/@yourbrand'
    x: '',           // 'https://x.com/yourbrand'
  },

  // Form endpoints. While empty, forms validate normally but do NOT send data;
  // visitors are offered to send their message by email / WhatsApp instead.
  // Paste an endpoint (e.g. Formspree, Getform, your own PHP/API URL) to go live.
  // Data is POSTed as JSON with an 'Accept: application/json' header.
  forms: {
    enquiry: { endpoint: '' },     // Business Enquiry page
    contact: { endpoint: '' },     // Contact page
    newsletter: { endpoint: '' },  // Newsletter forms (home + footer)
  },

  // Set to true and add a 'price' to products in products.js to display prices.
  showPrices: false,
  currency: '₹',
};
