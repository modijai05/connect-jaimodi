/**
 * CENTRALIZED CONFIGURATION FILE FOR JAI MODI DIGITAL BUSINESS CARD
 * 
 * ============================================================================
 * ALL personal details, business info, partners, and location links are defined here.
 * DO NOT hardcode contact info in UI components.
 * 
 * PLACEHOLDERS FOR CURRENTLY UNSUPPLIED INFORMATION:
 * Leave empty strings ("") for unsupplied fields. The UI gracefully adapts and
 * will NOT show broken buttons or fake links.
 * ============================================================================
 */

export const BUSINESS_CARD_CONFIG = {
  // 1. PRIMARY PERSONAL IDENTITY
  personal: {
    name: "JAI MODI",
    monogram: "JM",
    descriptor: "BUSINESS • TRADE • GLOBAL CONNECTIONS",
    avatar: "/assets/profiles/jai-modi.webp",
    avatarFallback: "/assets/profiles/jai-modi.jpg",

    mobile: "+919928075914",
    
    // WhatsApp (numeric with country code)
    whatsapp: "919928075914",

    // Supplied WhatsApp QR code asset
    whatsappQr: "/assets/qr/whatsapp-card.png",
    whatsappQrSquare: "/assets/qr/whatsapp-qr-square.png",
    whatsappQrFull: "/assets/qr/whatsapp-qr.jpg",

    email: "jaimodi05bapa@gmail.com",

    // WeChat ID (scan QR to add)
    wechatId: "", 

    // Supplied WeChat QR code asset
    wechatQr: "/assets/qr/wechat-qr.jpg",

    // Registered Addresses for Jai Modi
    addresses: {
      india: "B-29, New Light Colony, Tonk Road, Jaipur, Rajasthan, India – 302018",
      hongKong: "Room 8B, 8 Floor, Lee Wai Comm. Building, 1–3 Hart Avenue, T.S.T., Kowloon, Hong Kong"
    }
  },

  // 2. MY ASSOCIATED BUSINESS (Jai Modi)
  myBusiness: {
    id: "the-south-pickleball-arena",
    name: "THE SOUTH PICKLEBALL ARENA",
    subtitle: "Premium Pickleball Court in Sitapura, Jaipur",
    associatedWith: "JAI MODI",
    phones: ["+91 9636315450", "+91 9928075914"],
    address: "Opp. Chokhi Dhani, Goner Road, Sitapura, Jaipur – 302022",
    features: [
      { label: "Professional Standard Court", icon: "pickleball" },
      { label: "Family Friendly", icon: "family" },
      { label: "Safe for Females", icon: "shield" },
      { label: "Tournaments & Events", icon: "trophy" },
      { label: "Night Play with LED Lights", icon: "lights" }
    ],
    logo: "/assets/businesses/pickleball-logo.png",
    cardImage: "/assets/businesses/south-pickleball-arena-card.png",
    cardPdf: "/assets/businesses/south-pickleball-arena-card.pdf"
  },

  // 3. PARTNERS & ASSOCIATED BUSINESSES (Rakesh Gupta first, Shailendra Modi second)
  partners: [
    {
      id: "rakesh-gupta",
      name: "RAKESH GUPTA",
      designation: "HONG KONG BUSINESS PARTNER",
      portrait: "/assets/profiles/rakesh-gupta-framed.webp",
      portraitFallback: "/assets/profiles/rakesh-gupta-framed.jpg",
      business: {
        name: "VANDAN JEWELS",
        descriptor: "Deals in Gems & Diamonds",
        chineseAddress: "九龍尖沙咀赫德道1-3號利威商業大廈8樓B室",
        englishAddress: "Room 8B, 8 Floor, Lee Wai Comm. Building, 1–3 Hart Avenue, T.S.T., Kowloon, Hong Kong",
        cardImage: "/assets/businesses/rakesh-gupta-vandan-jewels-card.jpg",
        cardImageWebp: "/assets/businesses/rakesh-gupta-vandan-jewels-card.webp"
      },
      contacts: {
        hongKongMobile: "+852 90538700",
        hongKongMobileRaw: "+85290538700",
        chinaMobile: "+86 19896590780",
        chinaMobileRaw: "+8619896590780",
        officeTel: "+852 3153 4553",
        officeTelRaw: "+85231534553",
        whatsapp: "85290538700",
        wechatSearchNumber: "+86 19896590780",
        email: "rakeshgupta01@hotmail.com",
        wechatId: "RG90538700"
      },
      vcfFilename: "Rakesh_Gupta.vcf"
    },
    {
      id: "shailendra-modi",
      name: "SHAILENDRA MODI",
      designation: "BUSINESS PARTNER",
      relationship: "Business Partner",
      portrait: "/assets/profiles/shailendra-modi.webp",
      portraitFallback: "/assets/profiles/shailendra-modi.png",
      contact: {
        phone: "+91 9928028911",
        phoneRaw: "+919928028911",
        whatsapp: "919928028911",
        email: "shailendramodi76@gmail.com"
      },
      vcfFilename: "Shailendra_Modi.vcf",
      existingBusinesses: [
        {
          id: "the-south-waterpark",
          name: "THE SOUTH WATERPARK",
          descriptor: "Best Family Waterpark",
          features: [
            "Water Fall & Rides",
            "Kids Pool & Spray Pool",
            "Food Court",
            "Rain Dance & DJ",
            "Banquet for All Events",
            "Party Hall"
          ],
          location: "Opposite Chokhi Dhani, Goner Road, Sitapura, Jaipur",
          phones: ["+91 9462015450", "+91 9414071245"],
          cardFront: "/assets/businesses/waterpark-banquet-front.png",
          cardBack: "/assets/businesses/waterpark-banquet-back.png"
        },
        {
          id: "the-palm-banquet",
          name: "THE PALM BANQUET",
          descriptor: "By The South Waterpark | Best Banquet AC Hall",
          features: [
            "Family Friendly",
            "Safe for Females",
            "Best for Kids",
            "Amazing Picnic Spot"
          ],
          location: "Opposite Chokhi Dhani, Goner Road, Sitapura, Jaipur",
          phones: ["+91 9462015450", "+91 9414071245"],
          cardFront: "/assets/businesses/waterpark-banquet-front.png",
          cardBack: "/assets/businesses/waterpark-banquet-back.png"
        }
      ]
    }
  ],

  // 4. LOCATIONS & MAP LINKS
  locations: {
    india: {
      id: "india",
      title: "INDIA",
      flag: "🇮🇳",
      label: "Jaipur Headquarters",
      address: "B-29, New Light Colony, Tonk Road, Jaipur, Rajasthan, India – 302018",
      coordinates: {
        latitude: 26.865328,
        longitude: 75.799958
      },
      maps: {
        google: "https://maps.app.goo.gl/zBRYRp58XWhWTsAJ9",
        apple: "https://maps.apple/r/LsNAcDx3M-ZP.e",
        amap: "https://uri.amap.com/marker?position=75.799958,26.865328&name=Jai+Modi+Jaipur+Office"
      }
    },
    hongKong: {
      id: "hong-kong",
      title: "HONG KONG",
      flag: "🇭🇰",
      label: "Hong Kong Partner Office",
      address: "Room 8B, 8 Floor, Lee Wai Comm. Building, 1–3 Hart Avenue, T.S.T., Kowloon, Hong Kong",
      chineseAddress: "九龍尖沙咀赫德道1-3號利威商業大廈8樓B室",
      coordinates: null,
      maps: {
        google: "https://maps.app.goo.gl/L3k7eUJEB2gi7fNE9",
        apple: "https://maps.apple/p/Z6E4dEQmSSzp45",
        // AMap strictly not connected to India coordinates; kept empty/null until supplied
        amap: "" 
      }
    }
  },

  // 5. EVENT / CONTEXT
  meta: {
    theme: "Canton Fair & International Business",
    eventNote: "Met physically at Canton Fair / International Trade",
    version: "1.0.0"
  }
};

export default BUSINESS_CARD_CONFIG;
