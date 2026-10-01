/* ==========================================================================
   forms.js: validation and submission for enquiry, contact and newsletter forms

   How submission works:
   - If SITE_CONFIG.forms.<type>.endpoint is set, data is POSTed there as JSON.
   - If no endpoint is configured, NOTHING is sent or stored. The visitor is
     told so and offered "Send by Email" / "Send on WhatsApp" buttons with
     their message pre-filled.
   ========================================================================== */
(() => {
  'use strict';

  const CFG = window.SITE_CONFIG || {};
  const forms = document.querySelectorAll('form[data-form]');
  const icon = n => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${n}"></use></svg>`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const digits = v => String(v || '').replace(/\D/g, '');

  const MSG = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number, including country code (e.g. +91).',
    min: n => `Please enter at least ${n} characters.`,
    consent: 'Please tick this box to continue.',
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

  const LABELS = {
    fullName: 'Full Name', name: 'Name', company: 'Company', email: 'Email', phone: 'Phone / WhatsApp',
    country: 'Country', stateCity: 'State / City', businessType: 'Business Type', category: 'Interested Category',
    orderType: 'Order Type', quantity: 'Estimated Quantity', packaging: 'Packaging Requirement', subject: 'Subject', message: 'Message',
  };

  /* ---------- Validation ---------- */
  const fieldsOf = form => Array.from(form.querySelectorAll('input, select, textarea'))
    .filter(el => el.name && el.name !== 'company_website' && el.type !== 'radio' && el.type !== 'submit');

  const setError = (field, msg) => {
    const out = field.form.querySelector(`[data-error-for="${field.name}"]`);
    if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
    if (out) out.textContent = msg || '';
    const row = field.closest('.news-form__row');
    if (row) row.classList.toggle('is-invalid', !!msg);
  };

  const validate = field => {
    const isBox = field.type === 'checkbox';
    const value = isBox ? field.checked : field.value.trim();
    let msg = '';
    if (field.required && !value) msg = isBox ? MSG.consent : MSG.required;
    else if (!isBox && value) {
      if (field.type === 'email' && !EMAIL_RE.test(value)) msg = MSG.email;
      else if (field.dataset.validate === 'phone' && (!PHONE_RE.test(value) || digits(value).length < 7)) msg = MSG.phone;
      else if (field.minLength > 0 && value.length < field.minLength) msg = MSG.min(field.minLength);
    }
    setError(field, msg);
    return !msg;
  };

  /* ---------- Status messages ---------- */
  const showStatus = (form, type, html) => {
    const box = form.querySelector('[data-form-status]');
    if (!box) return;
    const ico = { success: 'check', info: 'info', error: 'alert' }[type];
    box.className = `form-status is-${type}`;
    box.innerHTML = `${icon(ico)}<div>${html}</div>`;
    if (box.hasAttribute('tabindex')) box.focus({ preventScroll: true });
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const clearStatus = form => {
    const box = form.querySelector('[data-form-status]');
    if (box) { box.className = 'form-status'; box.innerHTML = ''; }
  };
  const setLoading = (form, on) => {
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    btn.classList.toggle('is-loading', on);
    btn.setAttribute('aria-busy', String(on));
    btn.disabled = on;
  };

  /* ---------- Readable copy of the submission (for email / WhatsApp) ---------- */
  const readable = form => {
    const lines = [];
    Object.keys(LABELS).forEach(name => {
      const el = form.elements[name];
      if (!el) return;
      let v = '';
      if (el instanceof RadioNodeList) {
        const checked = Array.from(el).find(r => r.checked);
        v = checked ? checked.closest('label').textContent.trim() : '';
      } else if (el.tagName === 'SELECT') {
        v = el.value ? el.options[el.selectedIndex].text : '';
      } else v = el.value.trim();
      if (v) lines.push(`${LABELS[name]}: ${v}`);
    });
    return lines.join('\n');
  };

  const fallbackActions = (form, kind) => {
    const body = readable(form);
    const who = (form.elements.company && form.elements.company.value) || (form.elements.fullName || form.elements.name || {}).value || '';
    const subject = `${kind === 'enquiry' ? 'Business Enquiry' : 'Website Message'}${who ? ' – ' + who : ''}`;
    const actions = [];
    if (CFG.email) {
      actions.push(`<a class="btn-lux btn-lux--forest btn-lux--sm" href="mailto:${esc(CFG.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">${icon('mail')}<span class="btn-lux__label">Send by Email</span></a>`);
    }
    if (digits(CFG.whatsapp).length >= 10) {
      actions.push(`<a class="btn-lux btn-lux--outline btn-lux--sm" target="_blank" rel="noopener" href="https://wa.me/${digits(CFG.whatsapp)}?text=${encodeURIComponent(subject + '\n\n' + body)}">${icon('whatsapp')}<span class="btn-lux__label">Send on WhatsApp</span></a>`);
    }
    return actions.length ? `<div class="form-status__actions">${actions.join('')}</div>` : '';
  };

  /* ---------- Submission ---------- */
  const submit = async form => {
    const kind = form.dataset.form;
    const endpoint = ((CFG.forms || {})[kind] || {}).endpoint || '';

    // Honeypot: bots fill hidden fields. Pretend success and stop.
    const hp = form.elements.company_website;
    if (hp && hp.value) { form.reset(); return; }

    const data = {};
    new FormData(form).forEach((v, k) => { if (k !== 'company_website') data[k] = v; });
    data.formType = kind;
    data.page = location.href;
    data.submittedAt = new Date().toISOString();

    setLoading(form, true);
    clearStatus(form);

    if (!endpoint) {
      await wait(600);
      setLoading(form, false);
      if (kind === 'newsletter') {
        showStatus(form, 'info', '<strong>Thanks for your interest!</strong><p>Newsletter sign-up is not live yet, so your email address has not been stored. Please check back soon.</p>');
      } else {
        showStatus(form, 'info', `<strong>Your ${kind === 'enquiry' ? 'enquiry' : 'message'} is ready.</strong><p>Online submission is not connected yet, so nothing has been sent. Please send it to our team using one of the options below. Your details are pre-filled.</p>${fallbackActions(form, kind)}`);
      }
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const okMsg = {
        enquiry: '<strong>Thank you! Your enquiry has been sent.</strong><p>Our team will review your requirements and get back to you shortly.</p>',
        contact: '<strong>Thank you! Your message has been sent.</strong><p>We will reply as soon as possible.</p>',
        newsletter: '<strong>You’re subscribed!</strong><p>Thanks for joining. Look out for our next update.</p>',
      }[kind];
      form.reset();
      updateCounters(form);
      showStatus(form, 'success', okMsg);
    } catch (err) {
      const mail = CFG.email ? ` or email us at <a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a>` : '';
      showStatus(form, 'error', `<strong>Sorry, something went wrong.</strong><p>Your ${kind === 'newsletter' ? 'sign-up' : 'message'} could not be sent. Please try again${mail}.</p>`);
    } finally {
      setLoading(form, false);
    }
  };

  /* ---------- Character counters ---------- */
  const updateCounters = form => {
    form.querySelectorAll('[data-char-count]').forEach(out => {
      const ta = document.getElementById(out.dataset.charCount);
      if (ta) out.textContent = ta.value.length;
    });
  };

  /* ---------- Wire up ---------- */
  forms.forEach(form => {
    fieldsOf(form).forEach(field => {
      field.addEventListener('blur', () => { if (field.value || field.hasAttribute('aria-invalid')) validate(field); });
      field.addEventListener('input', () => { if (field.hasAttribute('aria-invalid')) validate(field); });
      field.addEventListener('change', () => { if (field.type === 'checkbox' || field.tagName === 'SELECT') validate(field); });
    });
    form.querySelectorAll('[data-char-count]').forEach(out => {
      const ta = document.getElementById(out.dataset.charCount);
      if (ta) ta.addEventListener('input', () => { out.textContent = ta.value.length; });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const results = fieldsOf(form).map(f => [f, validate(f)]);
      const invalid = results.filter(([, ok]) => !ok).map(([f]) => f);
      if (invalid.length) {
        clearStatus(form);
        if (form.dataset.form !== 'newsletter') {
          showStatus(form, 'error', `<strong>Please check the form.</strong><p>${invalid.length === 1 ? 'One field needs' : invalid.length + ' fields need'} your attention.</p>`);
        }
        invalid[0].focus();
        return;
      }
      submit(form);
    });
  });

  /* ---------- Enquiry page: pre-fill from URL (?product=, ?category=, ?type=) ---------- */
  const enquiry = document.getElementById('enquiry-form');
  if (enquiry) {
    const params = new URLSearchParams(location.search);
    const catSelect = enquiry.elements.category;
    const setCategory = v => { if (v && catSelect && Array.from(catSelect.options).some(o => o.value === v)) catSelect.value = v; };
    const typeMap = { wholesale: 'small-wholesale', bulk: 'bulk', distribution: 'distribution', export: 'export', 'private-label': 'private-label', trial: 'trial' };
    const type = typeMap[params.get('type')];
    if (type) {
      const radio = enquiry.querySelector(`input[name="orderType"][value="${type}"]`);
      if (radio) radio.checked = true;
    }
    setCategory(params.get('category'));
    const product = (window.PRODUCTS || []).find(p => p.id === params.get('product'));
    if (product) {
      setCategory(product.category === 'snacks' ? 'mixed' : product.category);
      const msg = enquiry.elements.message;
      if (msg && !msg.value) msg.value = `I'm interested in ${product.name}. `;
      updateCounters(enquiry);
    }
  }
})();
