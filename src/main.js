import { BUSINESS_CARD_CONFIG } from './data/config.js';
import QRCode from 'qrcode';
import { setupHighEndAnimations } from './animations.js';

// ============================================================================
// STATE & ROUTING
// ============================================================================
let activeTab = 'card'; // 'card' or 'partners'

function initRouting() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'partners' || hash === 'partners-locations') {
    switchTab('partners', false);
  } else {
    switchTab('card', false);
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash === 'partners' || newHash === 'partners-locations') {
      switchTab('partners', false);
    } else {
      switchTab('card', false);
    }
  });
}

function switchTab(tabName, updateHash = true) {
  if (activeTab === tabName && document.getElementById(`page-${tabName}`)?.classList.contains('active')) {
    return;
  }
  activeTab = tabName;

  const changeView = () => {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const target = btn.getAttribute('data-target');
      if (target === tabName) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`page-${tabName}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    if (updateHash) {
      window.location.hash = tabName;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (document.startViewTransition) {
    document.startViewTransition(changeView);
  } else {
    changeView();
  }
}

// ============================================================================
// VCF GENERATION & DOWNLOAD
// ============================================================================
function downloadVcf(personKey) {
  // Prefer API endpoint, fallback to client-side Blob
  const apiEndpoint = `/api/vcf/${personKey}`;

  fetch(apiEndpoint)
    .then(res => {
      if (res.ok) {
        return res.blob();
      }
      throw new Error('API unavailable, falling back to local generation');
    })
    .then(blob => {
      triggerBlobDownload(blob, getFilenameForPerson(personKey));
      showToast('Contact Card (.vcf) downloaded!');
    })
    .catch(() => {
      // Local fallback
      const vcfString = generateLocalVcf(personKey);
      const blob = new Blob([vcfString], { type: 'text/vcard;charset=utf-8' });
      triggerBlobDownload(blob, getFilenameForPerson(personKey));
      showToast('Contact Card (.vcf) downloaded!');
    });
}

function getFilenameForPerson(personKey) {
  if (personKey === 'shailendra-modi') return 'Shailendra_Modi.vcf';
  if (personKey === 'rakesh-gupta') return 'Rakesh_Gupta.vcf';
  return 'Jai_Modi.vcf';
}

function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateLocalVcf(personKey) {
  const cfg = BUSINESS_CARD_CONFIG;

  if (personKey === 'jai-modi' || personKey === 'jai') {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Modi;Jai;;;',
      'FN:Jai Modi',
      'ORG:The South Pickleball Arena',
      'TITLE:Business • Trade • Global Connections'
    ];
    if (cfg.personal.mobile) lines.push(`TEL;TYPE=CELL,VOICE:${cfg.personal.mobile}`);
    if (cfg.personal.whatsapp) lines.push(`X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${cfg.personal.whatsapp}`);
    if (cfg.personal.email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${cfg.personal.email}`);
    if (cfg.personal.wechatId) lines.push(`X-WECHAT:${cfg.personal.wechatId}`);

    lines.push('ADR;TYPE=WORK,POSTAL,PARCEL:;;B-29, New Light Colony, Tonk Road;Jaipur;Rajasthan;302018;India');
    lines.push('ADR;TYPE=DOM,HOME:;;Room 8B\\, 8 Floor\\, Lee Wai Comm. Building\\, 1-3 Hart Avenue;T.S.T.\\, Kowloon;;;Hong Kong');
    lines.push('NOTE;CHARSET=UTF-8:Jai Modi - Canton Fair & Global Trade Network\\nBusiness: The South Pickleball Arena (Sitapura, Jaipur)\\nIndia: B-29, New Light Colony, Tonk Road, Jaipur\\nHong Kong: Room 8B, 8/F Lee Wai Comm. Bldg, T.S.T., Kowloon');
    lines.push('END:VCARD');
    return lines.join('\r\n');
  }

  if (personKey === 'shailendra-modi') {
    const p = cfg.partners.find(item => item.id === 'shailendra-modi');
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Modi;Shailendra;;;',
      'FN:Shailendra Modi',
      'TITLE:Business Partner',
      `TEL;TYPE=CELL,VOICE:${p.contact.phoneRaw}`,
      `EMAIL;TYPE=PREF,INTERNET:${p.contact.email}`,
      `X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${p.contact.whatsapp}`,
      'ADR;TYPE=WORK:;;Opposite Chokhi Dhani\\, Goner Road\\, Sitapura;Jaipur;Rajasthan;302022;India',
      'NOTE;CHARSET=UTF-8:Business Partner\\nBusinesses: The South Waterpark & The Palm Banquet\\nLocation: Opp. Chokhi Dhani, Sitapura, Jaipur\\nPhone: +91 9928028911',
      'END:VCARD'
    ];
    return lines.join('\r\n');
  }

  if (personKey === 'rakesh-gupta') {
    const p = cfg.partners.find(item => item.id === 'rakesh-gupta');
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Gupta;Rakesh;;;',
      'FN:Rakesh Gupta',
      'ORG:Vandan Jewels',
      'TITLE:Hong Kong Business Partner - Deals in Gems & Diamonds',
      `TEL;TYPE=CELL,VOICE,PREF:${p.contacts.hongKongMobileRaw}`,
      `TEL;TYPE=CELL,VOICE;X-LABEL=China Mobile:${p.contacts.chinaMobileRaw}`,
      `TEL;TYPE=WORK,VOICE:${p.contacts.officeTelRaw}`,
      `EMAIL;TYPE=PREF,INTERNET:${p.contacts.email}`,
      `X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${p.contacts.whatsapp}`,
      'ADR;TYPE=WORK:;;Room 8B\\, 8 Floor\\, Lee Wai Comm. Building\\, 1-3 Hart Avenue\\, T.S.T.;Kowloon;;;Hong Kong',
      'NOTE;CHARSET=UTF-8:Hong Kong Business Partner - Vandan Jewels (Gems & Diamonds)\\nHK Mobile: +852 90538700\\nChina Mobile: +86 19896590780\\nOffice: +852 3153 4553\\nAddress: Room 8B, 8/F, Lee Wai Comm. Bldg, 1-3 Hart Ave, T.S.T., Kowloon, Hong Kong (九龍尖沙咀赫德道1-3號利威商業大廈8樓B室)',
      'END:VCARD'
    ];
    return lines.join('\r\n');
  }

  return '';
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// ============================================================================
// MODAL CONTROLS
// ============================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function setupModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(modal.id);
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });
}

// ============================================================================
// QR CODE GENERATOR (FOR CANTON FAIR SCANNING)
// ============================================================================
function setupQrGenerator() {
  const canvas = document.getElementById('qr-canvas');
  if (!canvas) return;

  const currentUrl = window.location.href;
  QRCode.toCanvas(canvas, currentUrl, {
    width: 210,
    margin: 1,
    color: {
      dark: '#080B10',
      light: '#FFFFFF'
    }
  }, (err) => {
    if (err) console.error('Error rendering QR code:', err);
  });
}

// ============================================================================
// SHARE CARD API
// ============================================================================
function shareCard() {
  const shareData = {
    title: 'Jai Modi — Digital Business Card',
    text: 'Jai Modi — Business • Trade • Global Connections. Canton Fair & International Business Card.',
    url: window.location.href
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData).catch(err => {
      if (err.name !== 'AbortError') {
        copyCardUrl();
      }
    });
  } else {
    copyCardUrl();
  }
}

function copyCardUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Card Link copied to clipboard!');
  }).catch(() => {
    showToast('Link ready to copy: ' + url);
  });
}

// ============================================================================
// DOM SETUP & INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchTab(target, true);
    });
  });

  document.querySelector('.brand-monogram-wrap')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('card', true);
  });

  // Action Buttons
  // 1. Save Contact buttons
  document.querySelectorAll('[data-action="save-vcf"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const person = btn.getAttribute('data-person') || 'jai-modi';
      downloadVcf(person);
    });
  });

  // 2. WeChat Action (try opening app, fallback to QR modal)
  document.querySelectorAll('[data-action="open-wechat"]').forEach(btn =>
    btn.addEventListener('click', (e) => {
      // Try to open WeChat app; show modal after short delay if app didn't open
      const weixinUrl = 'weixin://';
      const fallbackTimer = setTimeout(() => {
        openModal('wechat-modal');
      }, 1200);
      // If user comes back to page, the modal won't show (they opened WeChat)
      window.addEventListener('blur', () => clearTimeout(fallbackTimer), { once: true });
      // On mobile, navigation to weixin:// is handled by the href on <a> elements
      // For buttons (non-anchor), dispatch manually
      if (btn.tagName !== 'A') {
        e.preventDefault();
        window.location.href = weixinUrl;
      }
    })
  );

  // 3. WhatsApp Action (handled directly via <a href> - no JS needed)
  // Keeping event listener for any <button> with data-action="open-whatsapp"
  document.querySelectorAll('button[data-action="open-whatsapp"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(`https://wa.me/919928075914`, '_blank', 'noopener,noreferrer');
    });
  });

  // 4. Share Card Button
  document.querySelectorAll('[data-action="share-card"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      shareCard();
    });
  });

  // 5. Scan QR Button
  document.querySelectorAll('[data-action="scan-qr"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setupQrGenerator();
      openModal('qr-modal');
    });
  });

  // 6. Universal 4K Business Cards Full Scrolling Mode Modal
  const openCardsScrollModal = (targetCard = 'all') => {
    openModal('cards-scroll-modal');

    // Update active nav button
    const navBtns = document.querySelectorAll('.cards-scroll-nav-btn');
    const scrollBox = document.getElementById('cards-scroll-scrollbox');

    let targetElementId = 'card-block-jai';
    if (targetCard === 'rakesh') targetElementId = 'card-block-rakesh';
    else if (targetCard === 'shailendra') targetElementId = 'card-block-shailendra';

    navBtns.forEach(btn => {
      const scrollToId = btn.getAttribute('data-scroll-to');
      if ((targetCard === 'all' && scrollToId === 'card-block-jai') || scrollToId === targetElementId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    setTimeout(() => {
      if (targetCard === 'all') {
        scrollBox?.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetBlock = document.getElementById(targetElementId);
        if (targetBlock && scrollBox) {
          const topPos = targetBlock.offsetTop - scrollBox.offsetTop - 10;
          scrollBox.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
        }
      }
    }, 150);
  };

  document.querySelectorAll('[data-action="preview-cards-scroll"]').forEach(btn => {
    const trigger = (e) => {
      e.preventDefault();
      const targetCard = btn.getAttribute('data-target-card') || 'all';
      openCardsScrollModal(targetCard);
    };
    btn.addEventListener('click', trigger);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        trigger(e);
      }
    });
  });

  // Quick navigation buttons inside 4K Cards Scrolling Modal
  document.querySelectorAll('.cards-scroll-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cards-scroll-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-scroll-to');
      const targetBlock = document.getElementById(targetId);
      const scrollBox = document.getElementById('cards-scroll-scrollbox');
      if (targetBlock && scrollBox) {
        const topPos = targetBlock.offsetTop - scrollBox.offsetTop - 10;
        scrollBox.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
      }
    });
  });

  // Backward compatibility for existing preview buttons
  document.querySelectorAll('[data-action="preview-pickleball-card"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCardsScrollModal('jai');
    });
  });

  document.querySelectorAll('[data-action="preview-waterpark-card"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCardsScrollModal('shailendra');
    });
  });

  document.querySelectorAll('[data-action="preview-rakesh-card"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCardsScrollModal('rakesh');
    });
  });

  // 7. Universal Email Button (Phone, PC & Web browser support)
  const isDesktopOrWeb = () => {
    return !('ontouchstart' in window) && window.innerWidth >= 768;
  };

  document.querySelectorAll('[data-action="open-email-options"], #primary-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // On desktop / PC, native mail clients (Outlook desktop) are often not configured
      // So open the Email Options dialog to provide 1-click Gmail Web, Outlook Web, or Copy!
      if (isDesktopOrWeb()) {
        e.preventDefault();
        openModal('email-modal');
        // Also silently trigger mailto in background
        const mailtoHref = btn.getAttribute('href');
        if (mailtoHref) {
          const hiddenIframe = document.createElement('iframe');
          hiddenIframe.style.display = 'none';
          hiddenIframe.src = mailtoHref;
          document.body.appendChild(hiddenIframe);
          setTimeout(() => hiddenIframe.remove(), 2000);
        }
      } else {
        // On phone, let mailto launch the native email app,
        // but if user remains on page after 1.2s, display the options modal
        const fallbackTimer = setTimeout(() => {
          openModal('email-modal');
        }, 1400);
        window.addEventListener('blur', () => clearTimeout(fallbackTimer), { once: true });
      }
    });
  });

  // 7c. Rakesh Gupta WeChat Modal
  document.querySelectorAll('[data-action="open-rakesh-wechat"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('rakesh-wechat-modal');
    });
  });

  // 8. Copy buttons (Address, Phone numbers, Email)
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          showToast(`Ready to copy: ${textToCopy}`);
        });
      }
    });
  });

  // 9. Photo fullscreen viewer (Executive circular frame)
  document.querySelectorAll('[data-action="view-photo"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const photoSrc = btn.getAttribute('data-photo');
      const photoName = btn.getAttribute('data-name');
      const img = document.getElementById('photo-modal-img');
      const title = document.getElementById('photo-modal-title');
      if (img && photoSrc) {
        img.src = photoSrc;
        img.alt = photoName || 'Executive Portrait';
      }
      if (title) title.textContent = photoName ? `${photoName.toUpperCase()}` : 'EXECUTIVE PORTRAIT';
      openModal('photo-modal');
    });
  });

  // Modals & Routing Setup
  setupModals();
  initRouting();

  // Initialize High-End Animations & Graphics Engine
  setupHighEndAnimations();

  // Register PWA Service Worker if available
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW registration note:', err);
    });
  }
});
