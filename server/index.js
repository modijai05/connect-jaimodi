import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { BUSINESS_CARD_CONFIG } from '../src/data/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Jai Modi Digital Business Card API',
    uptime: process.uptime()
  });
});

// API: Get Centralized Configuration
app.get('/api/config', (req, res) => {
  res.json(BUSINESS_CARD_CONFIG);
});

// Helper: Generate VCF String
function generateVcf(personKey) {
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

    if (cfg.personal.mobile) {
      lines.push(`TEL;TYPE=CELL,VOICE:${cfg.personal.mobile}`);
    }
    if (cfg.personal.whatsapp) {
      lines.push(`X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${cfg.personal.whatsapp}`);
    }
    if (cfg.personal.email) {
      lines.push(`EMAIL;TYPE=PREF,INTERNET:${cfg.personal.email}`);
    }
    if (cfg.personal.wechatId) {
      lines.push(`X-WECHAT:${cfg.personal.wechatId}`);
    }

    // India Address
    lines.push('ADR;TYPE=WORK,POSTAL,PARCEL:;;B-29, New Light Colony, Tonk Road;Jaipur;Rajasthan;302018;India');
    // Hong Kong Address
    lines.push('ADR;TYPE=DOM,HOME:;;Room 8B\\, 8 Floor\\, Lee Wai Comm. Building\\, 1-3 Hart Avenue;T.S.T.\\, Kowloon;;;Hong Kong');

    lines.push('NOTE;CHARSET=UTF-8:Jai Modi - Canton Fair & Global Trade Network\\nBusiness: The South Pickleball Arena (Sitapura, Jaipur)\\nIndia: B-29, New Light Colony, Tonk Road, Jaipur\\nHong Kong: Room 8B, 8/F Lee Wai Comm. Bldg, T.S.T., Kowloon');
    lines.push('END:VCARD');
    return {
      filename: 'Jai_Modi.vcf',
      content: lines.join('\r\n')
    };
  }

  if (personKey === 'shailendra-modi' || personKey === 'shailendra') {
    const partner = cfg.partners.find(p => p.id === 'shailendra-modi');
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Modi;Shailendra;;;',
      'FN:Shailendra Modi',
      'TITLE:Business Partner',
      `TEL;TYPE=CELL,VOICE:${partner.contact.phoneRaw}`,
      `EMAIL;TYPE=PREF,INTERNET:${partner.contact.email}`,
      `X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${partner.contact.whatsapp}`,
      'ADR;TYPE=WORK:;;Opposite Chokhi Dhani\\, Goner Road\\, Sitapura;Jaipur;Rajasthan;302022;India',
      'NOTE;CHARSET=UTF-8:Business Partner\\nBusinesses: The South Waterpark & The Palm Banquet\\nLocation: Opp. Chokhi Dhani, Sitapura, Jaipur\\nPhone: +91 9928028911',
      'END:VCARD'
    ];
    return {
      filename: partner.vcfFilename || 'Shailendra_Modi.vcf',
      content: lines.join('\r\n')
    };
  }

  if (personKey === 'rakesh-gupta' || personKey === 'rakesh') {
    const partner = cfg.partners.find(p => p.id === 'rakesh-gupta');
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Gupta;Rakesh;;;',
      'FN:Rakesh Gupta',
      'ORG:Vandan Jewels',
      'TITLE:Hong Kong Business Partner - Deals in Gems & Diamonds',
      `TEL;TYPE=CELL,VOICE,PREF:${partner.contacts.hongKongMobileRaw}`,
      `TEL;TYPE=CELL,VOICE;X-LABEL=China Mobile:${partner.contacts.chinaMobileRaw}`,
      `TEL;TYPE=WORK,VOICE:${partner.contacts.officeTelRaw}`,
      `EMAIL;TYPE=PREF,INTERNET:${partner.contacts.email}`,
      `X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${partner.contacts.whatsapp}`,
      `X-SOCIALPROFILE;TYPE=wechat:RG90538700`,
      'ADR;TYPE=WORK:;;Room 8B\\, 8 Floor\\, Lee Wai Comm. Building\\, 1-3 Hart Avenue\\, T.S.T.;Kowloon;;;Hong Kong',
      'NOTE;CHARSET=UTF-8:Hong Kong Business Partner - Vandan Jewels (Gems & Diamonds)\\nWeChat ID: RG90538700\\nHK Mobile: +852 90538700\\nChina Mobile: +86 19896590780\\nOffice: +852 3153 4553\\nAddress: Room 8B, 8/F, Lee Wai Comm. Bldg, 1-3 Hart Ave, T.S.T., Kowloon, Hong Kong (九龍尖沙咀赫德道1-3號利威商業大廈8樓B室)',
      'END:VCARD'
    ];
    return {
      filename: partner.vcfFilename || 'Rakesh_Gupta.vcf',
      content: lines.join('\r\n')
    };
  }

  return null;
}

// API: VCF generation & download endpoint
app.get('/api/vcf/:person', (req, res) => {
  const result = generateVcf(req.params.person.toLowerCase());
  if (!result) {
    return res.status(404).json({ error: 'Contact profile not found' });
  }

  res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
  res.send(result.content);
});

// Serve static assets from dist (production) or public
const distPath = path.resolve(__dirname, '../dist');
const publicPath = path.resolve(__dirname, '../public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.use(express.static(publicPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Jai Modi Card Server] Running on http://localhost:${PORT}`);
});
