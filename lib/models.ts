const CDN = 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi'

export interface SpecRow {
  label_fr: string
  label_en: string
  value_fr: string
  value_en: string
}

export interface ModelSpecs {
  motor: string
  torque: string
  battery: string
  range_assist: string
  range_throttle: string
  sensors: string
  weight: string
  colors_fr: string[]
  colors_en: string[]
  note_fr?: string
  note_en?: string
}

export interface Model {
  slug: string
  name: string
  image: string
  images: string[]
  price_fr: string
  price_en: string
  size_fr: string
  size_en: string
  pills_fr: string[]
  pills_en: string[]
  desc_fr: string
  desc_en: string
  specs: ModelSpecs
  mechanical_fr: SpecRow[]
  mechanical_en: SpecRow[]
}

const MECH_FZ_FR: SpecRow[] = [
  { label_fr: 'Cadre',           label_en: 'Frame',         value_fr: 'Aluminium 6061',                              value_en: '6061 aluminum' },
  { label_fr: 'Freins',          label_en: 'Brakes',        value_fr: 'Disques hydrauliques',                        value_en: 'Hydraulic disc' },
  { label_fr: 'Manettes',        label_en: 'Brake levers',  value_fr: 'Avec coupe-moteur',                           value_en: 'With motor cutoff' },
  { label_fr: 'Potence',         label_en: 'Stem',          value_fr: 'Ajustable en aluminium',                      value_en: 'Adjustable aluminum' },
  { label_fr: 'Dérailleur',      label_en: 'Derailleur',    value_fr: 'S-Ride RD-200 8 vitesses (compat. Shimano)',  value_en: 'S-Ride RD-200 8-speed (Shimano compat.)' },
  { label_fr: 'Cassette',        label_en: 'Cassette',      value_fr: 'DNP 13-32T 8 vitesses',                       value_en: 'DNP 13-32T 8-speed' },
  { label_fr: 'Plateau avant',   label_en: 'Chainring',     value_fr: '52T',                                         value_en: '52T' },
  { label_fr: 'Jantes',          label_en: 'Rims',          value_fr: '26 po · aluminium double parois',             value_en: '26" double-wall aluminum' },
  { label_fr: 'Pneus',           label_en: 'Tires',         value_fr: 'CST E-Series 26×1.90 anti-crevaison',         value_en: 'CST E-Series 26×1.90 puncture-resistant' },
  { label_fr: 'Accessoires',     label_en: 'Accessories',   value_fr: 'Porte-bagages, ailes, lumières LED, poignées confort', value_en: 'Rear rack, fenders, LED lights, comfort grips' },
  { label_fr: 'Poids',           label_en: 'Weight',        value_fr: 'Vélo 25 kg · Batterie 3,6 kg',               value_en: 'Bike 25 kg · Battery 3.6 kg' },
]

// shared FR/EN for mech — same data, label language varies
const MECH_FZ: SpecRow[] = MECH_FZ_FR

export const MODELS: Model[] = [
  {
    slug: 'fz2-plus',
    name: 'FZ2+',
    image: `${CDN}/Compano-fz2-A.jpg`,
    images: [
      `${CDN}/Compano-fz2-A.jpg`,
      `${CDN}/Compano-fz2-007.jpg`,
      `${CDN}/Compano-fz2-B.jpg`,
      `${CDN}/Compano-fz2-008.jpg`,
      `${CDN}/Compano-fz2-010.jpg`,
      `${CDN}/Compano-fz2-009.jpg`,
      `${CDN}/Compano-fz2-005.jpg`,
      `${CDN}/Compano-fz2-004.jpg`,
      `${CDN}/Compano-fz2-002.jpg`,
      `${CDN}/Compano-fz2-003.jpg`,
      `${CDN}/4528.jpg`,
      `${CDN}/4529.jpg`,
      `${CDN}/11206841.jpg`,
      `${CDN}/11206840.jpg`,
      `${CDN}/4544.jpg`,
      `${CDN}/11206839.jpg`,
      `${CDN}/4532.jpg`,
      `${CDN}/flyers-compano-recto-2.jpg`,
    ],
    price_fr: '2 299 $',
    price_en: '$2,299',
    size_fr: 'Taille unique — 5pi4 à 5pi10',
    size_en: 'One size — 5\'4" to 5\'10"',
    pills_fr: ['500W', '36V 13Ah', '90 km'],
    pills_en: ['500W', '36V 13Ah', '56 mi'],
    desc_fr: "Motorisé 500W, autonomie 90 km. Capteur cadence + torque. L'entrée de gamme sans compromis.",
    desc_en: '500W rear motor, 90km range. Cadence + torque sensors. The accessible choice, no compromise.',
    specs: {
      motor: '500W roue arrière',
      torque: '60 Nm',
      battery: '36V 13Ah (468Wh)',
      range_assist: '90 km',
      range_throttle: '38 km',
      sensors: 'Cadence + Torque',
      weight: '25 kg',
      colors_fr: ['Blanc craie', 'Bleu minuit'],
      colors_en: ['Chalk white', 'Midnight blue'],
    },
    mechanical_fr: MECH_FZ,
    mechanical_en: MECH_FZ,
  },
  {
    slug: 'fz3-plus',
    name: 'FZ3+',
    image: `${CDN}/Compano-fz3-A.jpg`,
    images: [
      `${CDN}/Compano-fz3-A.jpg`,
      `${CDN}/4603.jpg`,
      `${CDN}/4602.jpg`,
      `${CDN}/4626.jpg`,
      `${CDN}/46058.jpg`,
      `${CDN}/4607.jpg`,
      `${CDN}/11206804.jpg`,
      `${CDN}/11206808.jpg`,
      `${CDN}/4470.jpg`,
      `${CDN}/11206815.jpg`,
      `${CDN}/4482.jpg`,
      `${CDN}/4491.jpg`,
      `${CDN}/4472.jpg`,
      `${CDN}/11206818.jpg`,
    ],
    price_fr: '2 699 $',
    price_en: '$2,699',
    size_fr: 'Taille unique — 5pi4 à 5pi10',
    size_en: 'One size — 5\'4" to 5\'10"',
    pills_fr: ['500W', '36V 20Ah', '140 km'],
    pills_en: ['500W', '36V 20Ah', '87 mi'],
    desc_fr: 'Batterie 720Wh, 140 km d\'autonomie. Double capteur 2-en-1. Le meilleur rapport perf/confort.',
    desc_en: '720Wh battery, 140km range. Dual sensor 2-in-1. Best performance-to-comfort ratio.',
    specs: {
      motor: '500W roue arrière',
      torque: '60 Nm',
      battery: '36V 20Ah (720Wh)',
      range_assist: '140 km',
      range_throttle: '50 km',
      sensors: 'Cadence + Torque (2-en-1)',
      weight: '25 kg',
      colors_fr: ['Blanc craie', 'Bleu minuit'],
      colors_en: ['Chalk white', 'Midnight blue'],
    },
    mechanical_fr: MECH_FZ,
    mechanical_en: MECH_FZ,
  },
  {
    slug: 'se2',
    name: 'SE2',
    image: `${CDN}/se2-imageA-ae7cd83f.png`,
    images: [
      `${CDN}/se2-imageA-ae7cd83f.png`,
      `${CDN}/se2-top-g-4B6A4560.png`,
      `${CDN}/se2-st-c-4B6A4573.png`,
      `${CDN}/se2-imageB.png`,
      `${CDN}/se2-imageC.png`,
      `${CDN}/se2-imageD.png`,
      `${CDN}/se2-imageE.png`,
      `${CDN}/se2-imageF.png`,
      `${CDN}/se2-imageG.png`,
    ],
    price_fr: '2 799 $',
    price_en: '$2,799',
    size_fr: 'Petit barre basse · Petit-moyen barre basse · Moyen barre haute · Large barre haute',
    size_en: 'Small low bar · Small-med low bar · Medium high bar · Large high bar',
    pills_fr: ['350W', '36V 7Ah', '55 km'],
    pills_en: ['350W', '36V 7Ah', '34 mi'],
    desc_fr: 'Moteur 350W silencieux, batterie LG 36V/7Ah. Chargeur 4A — 80 % en 90 min. 19 kg. Conception québécoise.',
    desc_en: '350W silent motor, 36V/7Ah LG battery. 4A charger — 80% in 90 min. 19 kg. Quebec-designed.',
    specs: {
      motor: '350W sans brosse (roue arrière)',
      torque: '40 Nm',
      battery: '36V 7Ah — 252 Wh (LG)',
      range_assist: '55 km',
      range_throttle: '25 km',
      sensors: '5 niveaux d\'assistance + accélérateur',
      weight: '19 kg (vélo 16,5 kg · batterie 2,5 kg)',
      colors_fr: ['Gris « Misty »', 'Gris', 'Chalk'],
      colors_en: ['Misty grey', 'Grey', 'Chalk'],
      note_fr: 'VAA d\'une valeur de 300 $+ inclus · Batterie B optionnelle 36V/7,5Ah (270 Wh)',
      note_en: 'VAA worth $300+ included · Optional battery B 36V/7.5Ah (270 Wh)',
    },
    mechanical_fr: [
      { label_fr: 'Cadre',           label_en: 'Frame',          value_fr: 'Aluminium 6061',                                          value_en: '6061 aluminum' },
      { label_fr: 'Freins',          label_en: 'Brakes',         value_fr: 'À disque hydraulique',                                    value_en: 'Hydraulic disc' },
      { label_fr: 'Manettes',        label_en: 'Brake levers',   value_fr: 'Avec coupe-moteur',                                       value_en: 'With motor cutoff' },
      { label_fr: 'Potence',         label_en: 'Stem',           value_fr: 'Ajustable en aluminium',                                  value_en: 'Adjustable aluminum' },
      { label_fr: 'Dérailleur',      label_en: 'Derailleur',     value_fr: 'S-Ride RD-200 8 vitesses (compat. Shimano)',              value_en: 'S-Ride RD-200 8-speed (Shimano compat.)' },
      { label_fr: 'Cassette',        label_en: 'Cassette',       value_fr: 'DNP 13-32T 8 vitesses',                                   value_en: 'DNP 13-32T 8-speed' },
      { label_fr: 'Plateau avant',   label_en: 'Chainring',      value_fr: '48T',                                                     value_en: '48T' },
      { label_fr: 'Jantes',          label_en: 'Rims',           value_fr: '700c · aluminium double parois',                         value_en: '700c double-wall aluminum' },
      { label_fr: 'Pneus',           label_en: 'Tires',          value_fr: 'CST E-Series 700×38mm anti-crevaison',                   value_en: 'CST E-Series 700×38mm puncture-resistant' },
      { label_fr: 'Accessoires',     label_en: 'Accessories',    value_fr: 'Porte-bagages, ailes, lumières LED avant/arrière, poignées confort', value_en: 'Rear rack, fenders, front/rear LED lights, comfort grips' },
      { label_fr: 'Poids',           label_en: 'Weight',         value_fr: 'Vélo 16,5 kg · Batterie A 2,5 kg · Batterie B (option) 2,5 kg', value_en: 'Bike 16.5 kg · Battery A 2.5 kg · Battery B (opt.) 2.5 kg' },
    ],
    mechanical_en: [
      { label_fr: 'Cadre',           label_en: 'Frame',          value_fr: 'Aluminium 6061',                                          value_en: '6061 aluminum' },
      { label_fr: 'Freins',          label_en: 'Brakes',         value_fr: 'À disque hydraulique',                                    value_en: 'Hydraulic disc' },
      { label_fr: 'Manettes',        label_en: 'Brake levers',   value_fr: 'Avec coupe-moteur',                                       value_en: 'With motor cutoff' },
      { label_fr: 'Potence',         label_en: 'Stem',           value_fr: 'Ajustable en aluminium',                                  value_en: 'Adjustable aluminum' },
      { label_fr: 'Dérailleur',      label_en: 'Derailleur',     value_fr: 'S-Ride RD-200 8 vitesses (compat. Shimano)',              value_en: 'S-Ride RD-200 8-speed (Shimano compat.)' },
      { label_fr: 'Cassette',        label_en: 'Cassette',       value_fr: 'DNP 13-32T 8 vitesses',                                   value_en: 'DNP 13-32T 8-speed' },
      { label_fr: 'Plateau avant',   label_en: 'Chainring',      value_fr: '48T',                                                     value_en: '48T' },
      { label_fr: 'Jantes',          label_en: 'Rims',           value_fr: '700c · aluminium double parois',                         value_en: '700c double-wall aluminum' },
      { label_fr: 'Pneus',           label_en: 'Tires',          value_fr: 'CST E-Series 700×38mm anti-crevaison',                   value_en: 'CST E-Series 700×38mm puncture-resistant' },
      { label_fr: 'Accessoires',     label_en: 'Accessories',    value_fr: 'Porte-bagages, ailes, lumières LED avant/arrière, poignées confort', value_en: 'Rear rack, fenders, front/rear LED lights, comfort grips' },
      { label_fr: 'Poids',           label_en: 'Weight',         value_fr: 'Vélo 16,5 kg · Batterie A 2,5 kg · Batterie B (option) 2,5 kg', value_en: 'Bike 16.5 kg · Battery A 2.5 kg · Battery B (opt.) 2.5 kg' },
    ],
  },
  {
    slug: 'rx1-plus',
    name: 'RX1+',
    image: `${CDN}/Compano-rx1-A.jpg`,
    images: [
      `${CDN}/Compano-rx1-A.jpg`,
      `${CDN}/Compano-rx1-002.jpg`,
      `${CDN}/Compano-rx1-003.jpg`,
      `${CDN}/Compano-rx1-F.JPG`,
      `${CDN}/Compano-rx1-D.JPG`,
      `${CDN}/Compano-rx1-C.JPG`,
      `${CDN}/Compano-rx1-008.jpg`,
      `${CDN}/Compano-rx1-006.jpg`,
      `${CDN}/Compano-rx1-007.jpg`,
      `${CDN}/Compano-rx1-005.jpg`,
      `${CDN}/Compano-rx1-004.jpg`,
    ],
    price_fr: '2 999 $',
    price_en: '$2,999',
    size_fr: 'Taille unique',
    size_en: 'One size',
    pills_fr: ['500W · 48V', '720Wh', 'Puissance max'],
    pills_en: ['500W · 48V', '720Wh', 'Max power'],
    desc_fr: 'Moteur 48V 500W, 60Nm, batterie amovible par le dessus. Pour les côtes les plus abruptes.',
    desc_en: "48V 500W motor, 60Nm torque, top-removable battery. For Canada's steepest hills.",
    specs: {
      motor: '500W roue arrière + pédalier',
      torque: '60 Nm',
      battery: '48V 15Ah (720Wh) — amovible par le dessus',
      range_assist: 'À confirmer',
      range_throttle: 'À confirmer',
      sensors: 'Cadence (roue arrière) + Torque (pédalier)',
      weight: 'À confirmer',
      colors_fr: ['Noir'],
      colors_en: ['Black'],
    },
    mechanical_fr: [
      { label_fr: 'Cadre',         label_en: 'Frame',         value_fr: 'Aluminium 6061',                     value_en: '6061 aluminum' },
      { label_fr: 'Freins',        label_en: 'Brakes',        value_fr: 'Disques hydrauliques',               value_en: 'Hydraulic disc' },
      { label_fr: 'Manettes',      label_en: 'Brake levers',  value_fr: 'Avec coupe-moteur',                  value_en: 'With motor cutoff' },
      { label_fr: 'Batterie',      label_en: 'Battery',       value_fr: 'Amovible par le dessus',             value_en: 'Top-removable' },
      { label_fr: 'Accessoires',   label_en: 'Accessories',   value_fr: 'Porte-bagages, ailes, lumières LED', value_en: 'Rear rack, fenders, LED lights' },
    ],
    mechanical_en: [
      { label_fr: 'Cadre',         label_en: 'Frame',         value_fr: 'Aluminium 6061',                     value_en: '6061 aluminum' },
      { label_fr: 'Freins',        label_en: 'Brakes',        value_fr: 'Disques hydrauliques',               value_en: 'Hydraulic disc' },
      { label_fr: 'Manettes',      label_en: 'Brake levers',  value_fr: 'Avec coupe-moteur',                  value_en: 'With motor cutoff' },
      { label_fr: 'Batterie',      label_en: 'Battery',       value_fr: 'Amovible par le dessus',             value_en: 'Top-removable' },
      { label_fr: 'Accessoires',   label_en: 'Accessories',   value_fr: 'Porte-bagages, ailes, lumières LED', value_en: 'Rear rack, fenders, LED lights' },
    ],
  },
]

export function getModelBySlug(slug: string): Model | undefined {
  return MODELS.find((m) => m.slug === slug)
}

export function getOtherModels(slug: string): Model[] {
  return MODELS.filter((m) => m.slug !== slug).slice(0, 3)
}
