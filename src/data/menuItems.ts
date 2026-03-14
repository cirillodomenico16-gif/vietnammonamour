import { IMAGES } from '../config/images';

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface MenuItem {
  id: number;
  name: string;
  nameVi: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  calories: number;
  prepTime: string;
  isPopular?: boolean;
  isNew?: boolean;
  isSpicy?: boolean;
  allergens?: string[];
  reviews: Review[];
  sizes?: { name: string; priceAdd: number }[];
  toppings?: { name: string; price: number }[];
}

export const CATEGORIES = ['Phở', 'Bánh Mì', 'Gỏi Cuốn', 'Bún Bò', 'Cơm', 'Bevande'];

export const menuItems: MenuItem[] = [
  // ─── PHỞ ───────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Phở Bò Đặc Biệt',
    nameVi: 'Pho Bo Dac Biet',
    description: 'Il nostro iconico brodo di manzo simmered 24 ore con spezie aromatiche. Servito con fettine di manzo tenero, noodles di riso freschi, erbe, cipolla e peperoncino. Il piatto simbolo di Hanoi.',
    price: 14.99,
    image: IMAGES.phoBoDacBiet,
    category: 'Phở',
    rating: 4.9,
    reviewCount: 1245,
    calories: 520,
    prepTime: '10-15 min',
    isPopular: true,
    isSpicy: false,
    allergens: ['Glutine', 'Sedano'],
    reviews: [
      { author: 'Marco R.', rating: 5, text: 'Il miglior phở che abbia mai mangiato fuori dal Vietnam!', date: '2 giorni fa' },
      { author: 'Sofia L.', rating: 5, text: 'Brodo autentico, porzione abbondante. Tornerò!', date: '1 settimana fa' },
      { author: 'Luca M.', rating: 4, text: 'Ottimo rapporto qualità-prezzo, brodo ricchissimo.', date: '2 settimane fa' },
    ],
    sizes: [
      { name: 'Piccola', priceAdd: -2.00 },
      { name: 'Media', priceAdd: 0 },
      { name: 'Grande', priceAdd: 2.50 },
    ],
    toppings: [
      { name: 'Extra Manzo', price: 3.00 },
      { name: 'Germogli di Soia', price: 0.50 },
      { name: 'Sriracha', price: 0.20 },
      { name: 'Hoisin Sauce', price: 0.20 },
    ],
  },
  {
    id: 2,
    name: 'Phở Gà',
    nameVi: 'Pho Ga',
    description: 'Brodo chiaro di pollo con zenzero e spezie delicate. Servito con straccetti di pollo arrosto, noodles sottili e mazzetto di erbe fresche. Leggero ed equilibrato.',
    price: 13.50,
    image: IMAGES.phoGa,
    category: 'Phở',
    rating: 4.7,
    reviewCount: 832,
    calories: 420,
    prepTime: '8-12 min',
    isPopular: false,
    allergens: ['Glutine'],
    reviews: [
      { author: 'Anna B.', rating: 5, text: 'Perfetto per chi preferisce qualcosa di più leggero.', date: '3 giorni fa' },
      { author: 'Davide F.', rating: 4, text: 'Brodo delicato e molto aromatico.', date: '5 giorni fa' },
    ],
    sizes: [
      { name: 'Piccola', priceAdd: -2.00 },
      { name: 'Media', priceAdd: 0 },
      { name: 'Grande', priceAdd: 2.50 },
    ],
    toppings: [
      { name: 'Extra Pollo', price: 2.50 },
      { name: 'Germogli di Soia', price: 0.50 },
    ],
  },
  {
    id: 3,
    name: 'Phở Tái Lăn',
    nameVi: 'Pho Tai Lan',
    description: 'Brodo intenso con sottili fettine di manzo scottato al momento. La carne cuoce nel brodo bollente al tavolo per una freschezza assoluta. Specialità di Hanoi.',
    price: 15.99,
    image: IMAGES.phoTaiLan,
    category: 'Phở',
    rating: 4.8,
    reviewCount: 567,
    calories: 560,
    prepTime: '12-15 min',
    isNew: true,
    isSpicy: true,
    allergens: ['Glutine', 'Sedano'],
    reviews: [
      { author: 'Lorenzo C.', rating: 5, text: 'Esperienza unica, carne tenerissima!', date: '1 giorno fa' },
    ],
    sizes: [
      { name: 'Media', priceAdd: 0 },
      { name: 'Grande', priceAdd: 2.50 },
    ],
    toppings: [
      { name: 'Extra Manzo Raro', price: 3.50 },
      { name: 'Peperoncino Fresco', price: 0.30 },
    ],
  },

  // ─── BÁNH MÌ ──────────────────────────────────────────────────
  {
    id: 4,
    name: 'Bánh Mì Thịt Nướng',
    nameVi: 'Banh Mi Thit Nuong',
    description: 'Baguette croccante con maiale grigliato marinato alla lemongrass, pâté, daikon e carote in agrodolce, cetriolo fresco, coriandolo e salsa hoisin.',
    price: 8.50,
    image: IMAGES.banhMiThitNuong,
    category: 'Bánh Mì',
    rating: 4.8,
    reviewCount: 934,
    calories: 480,
    prepTime: '5-8 min',
    isPopular: true,
    allergens: ['Glutine', 'Sedano', 'Soia'],
    reviews: [
      { author: 'Giulia P.', rating: 5, text: 'Semplicemente perfetto! La crosta del pane è irresistibile.', date: '4 giorni fa' },
      { author: 'Matteo S.', rating: 5, text: 'Combo di sapori incredibile.', date: '1 settimana fa' },
    ],
    toppings: [
      { name: 'Extra Maiale', price: 2.00 },
      { name: 'Jalapeño', price: 0.30 },
      { name: 'Extra Pâté', price: 0.80 },
    ],
  },
  {
    id: 5,
    name: 'Bánh Mì Gà',
    nameVi: 'Banh Mi Ga',
    description: 'Baguette con pollo arrosto alle spezie vietnamite, maionese all\'aglio, verdure in agrodolce e salsa sriracha home-made. Fresco e saporito.',
    price: 7.90,
    image: IMAGES.banhMiGa,
    category: 'Bánh Mì',
    rating: 4.6,
    reviewCount: 612,
    calories: 420,
    prepTime: '5-8 min',
    allergens: ['Glutine', 'Uova'],
    reviews: [
      { author: 'Chiara V.', rating: 5, text: 'Ottimo pranzo veloce!', date: '2 giorni fa' },
    ],
    toppings: [
      { name: 'Extra Pollo', price: 1.80 },
      { name: 'Avocado', price: 1.50 },
    ],
  },

  // ─── GỎI CUỐN ─────────────────────────────────────────────────
  {
    id: 6,
    name: 'Gỏi Cuốn Tôm',
    nameVi: 'Goi Cuon Tom',
    description: 'Involtini freschi di riso con gamberi tigre, vermicelli, lattuga, menta e coriandolo. Serviti con salsa hoisin e arachidi tostate. 3 involtini per porzione.',
    price: 7.50,
    image: IMAGES.goiCuonTom,
    category: 'Gỏi Cuốn',
    rating: 4.7,
    reviewCount: 445,
    calories: 280,
    prepTime: '5-8 min',
    isPopular: true,
    allergens: ['Crostacei', 'Arachidi', 'Glutine'],
    reviews: [
      { author: 'Elena M.', rating: 5, text: 'Freschi e leggeri, ideali come antipasto!', date: '3 giorni fa' },
      { author: 'Roberto D.', rating: 4, text: 'Gamberi grandi e di qualità.', date: '1 settimana fa' },
    ],
    toppings: [
      { name: 'Salsa Piccante Extra', price: 0.50 },
      { name: 'Porzione extra (3 pz)', price: 7.00 },
    ],
  },
  {
    id: 7,
    name: 'Gỏi Cuốn Bò',
    nameVi: 'Goi Cuon Bo',
    description: 'Involtini di riso con manzo scottato alle 5 spezie, erbe fresche, carote julienne e salsa hoisin. Tradizionale ricetta del Sud Vietnam. 3 involtini.',
    price: 8.50,
    image: IMAGES.goiCuonBo,
    category: 'Gỏi Cuốn',
    rating: 4.5,
    reviewCount: 289,
    calories: 320,
    prepTime: '5-8 min',
    isNew: true,
    allergens: ['Arachidi', 'Glutine'],
    reviews: [
      { author: 'Francesca T.', rating: 5, text: 'Sapori autentici, li riordinerò sicuramente.', date: '5 giorni fa' },
    ],
  },

  // ─── BÚN BÒ ───────────────────────────────────────────────────
  {
    id: 8,
    name: 'Bún Bò Huế',
    nameVi: 'Bun Bo Hue',
    description: 'Zuppa piccante di Huế con noodles di riso spessi, stinco di manzo, lemongrass e gamberi fermentati. Più piccante e decisa del phở, con un profumo inconfondibile.',
    price: 13.90,
    image: IMAGES.bunBoHue,
    category: 'Bún Bò',
    rating: 4.8,
    reviewCount: 723,
    calories: 590,
    prepTime: '10-15 min',
    isPopular: true,
    isSpicy: true,
    allergens: ['Glutine', 'Molluschi', 'Sedano'],
    reviews: [
      { author: 'Alessandro G.', rating: 5, text: 'Finalmente un bún bò autentico! Piccante al punto giusto.', date: '1 giorno fa' },
      { author: 'Laura N.', rating: 5, text: 'Il mio piatto preferito del menu!', date: '3 giorni fa' },
    ],
    sizes: [
      { name: 'Media', priceAdd: 0 },
      { name: 'Grande', priceAdd: 2.50 },
    ],
    toppings: [
      { name: 'Extra Manzo', price: 3.00 },
      { name: 'Peperoncino Extra', price: 0.30 },
      { name: 'Lemongrass Extra', price: 0.50 },
    ],
  },
  {
    id: 9,
    name: 'Bún Bò Đặc Biệt',
    nameVi: 'Bun Bo Dac Biet',
    description: 'Versione speciale con manzo, polpette di carne e piedino di maiale. Brodo ricchissimo con olio di annatto e pasta di gamberetti. La versione completa per veri intenditori.',
    price: 15.50,
    image: IMAGES.bunBoDacBiet,
    category: 'Bún Bò',
    rating: 4.9,
    reviewCount: 389,
    calories: 680,
    prepTime: '12-15 min',
    isSpicy: true,
    allergens: ['Glutine', 'Molluschi', 'Sedano'],
    reviews: [
      { author: 'Simone B.', rating: 5, text: 'Piatto straordinario, il migliore!', date: '2 giorni fa' },
    ],
    sizes: [
      { name: 'Media', priceAdd: 0 },
      { name: 'Grande', priceAdd: 3.00 },
    ],
  },

  // ─── CƠM ──────────────────────────────────────────────────────
  {
    id: 10,
    name: 'Cơm Sườn Nướng',
    nameVi: 'Com Suon Nuong',
    description: 'Riso al vapore con costolette di maiale grigliate marinate nel lemongrass e galangal. Servito con uovo fritto, verdure saltate e salsa di pesce dolce.',
    price: 12.50,
    image: IMAGES.comSuonNuong,
    category: 'Cơm',
    rating: 4.7,
    reviewCount: 534,
    calories: 650,
    prepTime: '12-15 min',
    isPopular: true,
    allergens: ['Uova', 'Pesce'],
    reviews: [
      { author: 'Valentina C.', rating: 5, text: 'Porzione abbondante e sapori meravigliosi!', date: '4 giorni fa' },
    ],
    toppings: [
      { name: 'Extra Costolette', price: 3.50 },
      { name: 'Doppio Uovo', price: 1.50 },
    ],
  },
  {
    id: 11,
    name: 'Cơm Gà Hội An',
    nameVi: 'Com Ga Hoi An',
    description: 'Riso giallo allo zenzero con pollo di Hội An arrosto in brodo speziato. La ricetta segreta della famiglia, tramandata da generazioni. Guarnito con erbe e cipolle croccanti.',
    price: 11.90,
    image: IMAGES.comGa,
    category: 'Cơm',
    rating: 4.6,
    reviewCount: 412,
    calories: 580,
    prepTime: '10-12 min',
    isNew: true,
    allergens: ['Glutine'],
    reviews: [
      { author: 'Federica R.', rating: 5, text: 'Riso aromatico e pollo succoso, ottimo!', date: '1 settimana fa' },
    ],
  },

  // ─── BEVANDE ──────────────────────────────────────────────────
  {
    id: 12,
    name: 'Trà Đá',
    nameVi: 'Tra Da',
    description: 'Tè verde vietnamita ghiacciato leggermente dolcificato. La bevanda tipica dei ristoranti di Hanoi, perfetta per accompagnare i piatti speziati.',
    price: 3.50,
    image: IMAGES.traDa,
    category: 'Bevande',
    rating: 4.5,
    reviewCount: 298,
    calories: 45,
    prepTime: '2 min',
    allergens: [],
    reviews: [
      { author: 'Paolo M.', rating: 5, text: 'Rinfrescante e autentico!', date: '1 giorno fa' },
    ],
  },
  {
    id: 13,
    name: 'Cà Phê Sữa Đá',
    nameVi: 'Ca Phe Sua Da',
    description: 'Caffè vietnamita filtrato su ghiaccio con latte condensato. Forte, dolce e cremoso — il connubio perfetto. Preparato con caffè Robusta del Vietnam.',
    price: 4.50,
    image: IMAGES.caPhesuaDa,
    category: 'Bevande',
    rating: 4.9,
    reviewCount: 876,
    calories: 180,
    prepTime: '3 min',
    isPopular: true,
    allergens: ['Latte'],
    reviews: [
      { author: 'Marta G.', rating: 5, text: 'Il caffè più buono che abbia mai bevuto!', date: '2 giorni fa' },
      { author: 'Luca P.', rating: 5, text: 'Imprescindibile con il phở!', date: '4 giorni fa' },
    ],
  },
  {
    id: 14,
    name: 'Sinh Tố Xoài',
    nameVi: 'Sinh To Xoai',
    description: 'Frullato di mango fresco con latte di cocco e latte condensato. Cremoso, tropicale e irresistibile. Preparato al momento con mango fresco di stagione.',
    price: 5.90,
    image: IMAGES.sinhTo,
    category: 'Bevande',
    rating: 4.8,
    reviewCount: 543,
    calories: 220,
    prepTime: '3 min',
    isNew: true,
    allergens: ['Latte'],
    reviews: [
      { author: 'Sara L.', rating: 5, text: 'Come bere estate in un bicchiere!', date: '3 giorni fa' },
    ],
  },
];
