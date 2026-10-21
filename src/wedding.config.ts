/**
 * =======================================================================
 * 💍 WEDDING INVITATION CONFIGURATION — HEMANTH WEDS YASHASWINI
 * =======================================================================
 */

export interface EventItem {
  id: string;
  name: string;
  tagline: string;
  day: string;
  dateStr: string;
  time: string;
  place: string;
  address: string;
  mapsUrl: string;
  embedQuery: string;
  image: string;
  note: string;
  funLines: string;
  dressCode: string;
}

export const weddingConfig = {
  couple: {
    bride: 'P. Yashaswini',
    brideShort: 'Yashaswini',
    brideParents: 'D/o - Smt. Bharathi & Sri Prabhakar Babu',
    brideBio: 'A radiant spirit with a gracious heart and infectious smile, bringing warmth and joy to every soul around her.',
    bridePhoto: '/client-images/bride.jpg',

    groom: 'J. Hemanth',
    groomShort: 'Hemanth',
    groomParents: 'S/o - Smt. Pratibha & Sri Tirupathaiah',
    groomBio: 'A gentleman of poise, gentle wisdom, and steady devotion, ready to embark on a beautiful lifelong voyage of companionship.',
    groomPhoto: '/client-images/groom.jpg',

    heroPhoto: '/client-images/hero-couple.png',
    hashtag: '#HemanthWedsYashaswini',
    title: 'Hemanth weds Yashaswini',
  },

  muhurtham: {
    date: '01 November 2026',
    time: '5:30 AM - 6:30 AM',
    lagnam: 'Thula Lagnam',
    dayOfWeek: 'Sunday',
    targetIso: '2026-11-01T05:30:00+05:30',
  },

  events: [
    {
      id: 'haldi',
      name: 'Haldi Ceremony',
      tagline: 'A golden splash of turmeric, love & joyous blessings',
      day: 'Friday, 30 Oct 2026',
      dateStr: '30 October 2026',
      time: '9:30 AM onwards',
      place: 'Home at Kongareddipalli, Chittoor',
      address: 'Kongareddipalli, Chittoor, Andhra Pradesh',
      mapsUrl: 'https://maps.google.com/?q=Kongareddipalli+Chittoor+Andhra+Pradesh',
      embedQuery: 'Kongareddipalli, Chittoor, Andhra Pradesh',
      image: '/client-images/event-haldi.jpg',
      note: 'Join us for an auspicious, joyous morning filled with turmeric, laughter, and family songs.',
      funLines: 'Get ready for vibrant splashes, marigold garlands, and heart-melting celebrations!',
      dressCode: 'Sunshine Yellow & Festive Traditional Attire',
    },
    {
      id: 'wedding-dinner',
      name: 'Wedding & Dinner',
      tagline: 'An evening of celebration, divine rituals & celebratory feast',
      day: 'Saturday, 31 Oct 2026',
      dateStr: '31 October 2026',
      time: '7:00 PM onwards',
      place: 'Srikrishna Convention Hall Kalyana Mandapam',
      address: 'Srikrishna Convention Hall Kalyana Mandapam, High Road, Opp: Fire Station, Bagepalli, Karnataka',
      mapsUrl: 'https://maps.app.goo.gl/xFLQDRQ85W8K1r127?g_st=ac',
      embedQuery: 'Srikrishna Convention Hall, High Road, Bagepalli, Karnataka',
      image: '/client-images/event-wedding.jpg',
      note: 'We welcome you to celebrate the joyous prelude with divine music, delicious feast, and blessings.',
      funLines: 'An enchanting evening where stories are shared and blessings flow in abundance.',
      dressCode: 'Royal Festive & Grand Traditional Attire',
    },
    {
      id: 'mangalya-dharanam',
      name: 'Mangalya Dharanam',
      tagline: 'The sacred muhurtham: eternal vows under holy chanting',
      day: 'Sunday, 01 Nov 2026',
      dateStr: '01 November 2026',
      time: '5:30 AM - 6:30 AM (Thula Lagnam)',
      place: 'Srikrishna Convention Hall Kalyana Mandapam',
      address: 'Srikrishna Convention Hall Kalyana Mandapam, High Road, Opp: Fire Station, Bagepalli, Karnataka',
      mapsUrl: 'https://maps.app.goo.gl/xFLQDRQ85W8K1r127?g_st=ac',
      embedQuery: 'Srikrishna Convention Hall, High Road, Bagepalli, Karnataka',
      image: '/client-images/mandap.jpg',
      note: 'The divine moment of sacred union as Hemanth & Yashaswini take the seven sacred steps together.',
      funLines: 'Witness the holy knots being tied amidst shower of akshathas and sacred mantras.',
      dressCode: 'Traditional Silk (Pattu Saree / Dhoti & Kurta)',
    },
    {
      id: 'reception',
      name: 'Reception & Feast',
      tagline: 'Grand reception welcoming the newlyweds, dinner follows',
      day: 'Friday, 06 Nov 2026',
      dateStr: '06 November 2026',
      time: '12:00 PM onwards (Dinner follows)',
      place: 'GJM Sukhibhava Kalyana Mandapam A/C',
      address: 'GJM Sukhibhava Kalyana Mandapam A/C, Santhapet, Chittoor, Andhra Pradesh',
      mapsUrl: 'https://maps.app.goo.gl/bjjJwZWfE8L8tEsH6?g_st=ac',
      embedQuery: 'GJM Sukhibhava Kalyana Mandapam Santhapet Chittoor Andhra Pradesh',
      image: '/client-images/event-reception.jpg',
      note: 'Celebrate the commencement of their lifelong journey together with greetings, music, and an exquisite banquet.',
      funLines: 'Bring your warmest smiles, best dance moves, and joyful blessings for the newlyweds!',
      dressCode: 'Formal Elegance / Indo-Western / Festive Chic',
    },
  ] as EventItem[],

  potdump: [
    {
      image: '/client-images/couple-real-4.jpg',
      caption: 'Royal Elegance & Divine Grace',
      tag: 'Kanjeevaram & Sherwani',
    },
    {
      image: '/client-images/couple-real-2.jpg',
      caption: 'Lost in Each Other’s Smiles',
      tag: 'Candid Love',
    },
    {
      image: '/client-images/couple-real-1.jpg',
      caption: 'A Lifetime of Laughter Begins',
      tag: 'Cherished Moments',
    },
    {
      image: '/client-images/couple-real-3.jpg',
      caption: 'Two Hearts, One Soul',
      tag: 'Together Always',
    },
    {
      image: '/client-images/gallery-1.jpg',
      caption: 'The Promise of Forever',
      tag: 'Golden Memories',
    },
    {
      image: '/client-images/gallery-2.jpg',
      caption: 'Eyes Full of Dreams',
      tag: 'Sweet Anticipation',
    },
  ],

  venues: [
    {
      id: 'bagepalli',
      name: 'Srikrishna Convention Hall Kalyana Mandapam',
      city: 'Bagepalli, Karnataka',
      label: 'Wedding & Mangalya Dharanam Venue',
      eventsHosted: ['Wedding & Dinner (31 Oct)', 'Mangalya Dharanam (01 Nov)'],
      address: 'High Road, Opp: Fire Station, Bagepalli, Karnataka',
      mapsSearchUrl: 'https://maps.app.goo.gl/xFLQDRQ85W8K1r127?g_st=ac',
      embedUrl: 'https://maps.google.com/maps?q=srikrishna+convention+hall+kalyana+mandapam+bagepalli+karnataka&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
    {
      id: 'chittoor-reception',
      name: 'GJM Sukhibhava Kalyana Mandapam A/C',
      city: 'Chittoor, Andhra Pradesh',
      label: 'Grand Reception Venue',
      eventsHosted: ['Reception & Dinner (06 Nov)'],
      address: 'Santhapet, Chittoor, Andhra Pradesh',
      mapsSearchUrl: 'https://maps.app.goo.gl/bjjJwZWfE8L8tEsH6?g_st=ac',
      embedUrl: 'https://maps.google.com/maps?q=GJM+Sukhibhava+Kalyana+Mandapam+A%2FC+Santhapet+Chittoor&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
    {
      id: 'chittoor-haldi',
      name: 'Home at Kongareddipalli',
      city: 'Chittoor, Andhra Pradesh',
      label: 'Haldi Ceremony Venue',
      eventsHosted: ['Haldi Ceremony (30 Oct)'],
      address: 'Kongareddipalli, Chittoor, Andhra Pradesh',
      mapsSearchUrl: 'https://maps.google.com/?q=Kongareddipalli+Chittoor+Andhra+Pradesh',
      embedUrl: 'https://maps.google.com/maps?q=Kongareddipalli+Chittoor+Andhra+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed',
    },
  ],

  audio: {
    src: '/assets/wedding-music.mp3',
    volume: 0.5,
  },

  rsvp: {
    // Connected to deployed Google Apps Script Web App
    googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbw7_mGUM2OLN-tdZnJzSHXALuEbdBKWCxsmKgtp2BD2UUj8cU5iJMRpqdyet8NaQ1XB/exec',
  },
};
