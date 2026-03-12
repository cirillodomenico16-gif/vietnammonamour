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
  nameViet: string;
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
  reviews: Review[];
  sizes?: { name: string; priceAdd: number }[];
  toppings?: { name: string; price: number }[];
}

export const categories = ['Tutti', 'Zuppe', 'Antipasti', 'Secondi', 'Dessert', 'Bevande'];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Phở Bò',
    nameViet: 'Zuppa di manzo',
    description: 'La zuppa nazionale vietnamita: brodo di manzo ricco e profumato, noodles di riso, fette di manzo tenero, erbe aromatiche fresche e spezie tradizionali di Hanoi.',
    price: 13.00,
    image: IMAGES.phobo,
    category: 'Zuppe',
    rating: 4.9,
    reviewCount: 312,
    calories: 480,
    prepTime: '10-15 min',
    isPopular: true,
    reviews: [
      { author: 'Marco R.', rating: 5, text: 'Il miglior phở di Milano, autentico e profumato!', date: '12 Feb 2025' },
      { author: 'Sofia L.', rating: 5, text: 'Brodo straordinario, si sente la cura nella preparazione.', date: '28 Gen 2025' },
      { author: 'Andrea M.', rating: 4, text: 'Ottimo, porzione generosa e sapore intenso.', date: '15 Gen 2025' },
    ],
    sizes: [
      { name: 'Normale', priceAdd: 0 },
      { name: 'Grande', priceAdd: 2.50 },
    ],
    toppings: [
      { name: 'Manzo extra', price: 2.50 },
      { name: 'Erbe aromatiche extra', price: 0.50 },
      { name: 'Tofu', price: 1.00 },
    ],
  },
  {
    id: 2,
    name: 'Bún Chả',
    nameViet: 'Maiale grigliato',
    description: 'Bocconcini di maiale croccanti e polpettine grigliate al sesamo e soia, servite con noodles di riso freddi, verdure fresche e salsa nước chấm.',
    price: 14.00,
    image: IMAGES.buncha,
    category: 'Secondi',
    rating: 4.8,
    reviewCount: 198,
    calories: 550,
    prepTime: '12-18 min',
    isPopular: true,
    reviews: [
      { author: 'Giulia T.', rating: 5, text: 'Il piatto preferito di Obama a Hanoi — capisco perché!', date: '5 Mar 2025' },
      { author: 'Luca F.', rating: 5, text: 'Bilanciato perfettamente, la salsa è divina.', date: '20 Feb 2025' },
    ],
    sizes: [
      { name: 'Normale', priceAdd: 0 },
      { name: 'Grande', priceAdd: 3.00 },
    ],
    toppings: [
      { name: 'Maiale extra', price: 3.00 },
      { name: 'Vermicelli extra', price: 1.00 },
    ],
  },
  {
    id: 3,
    name: 'Bánh Xèo',
    nameViet: 'Crepe di riso',
    description: 'Crepe croccante di riso con latte di cocco e curcuma, ripiena di tofu, funghi shiitake, germogli di soia e erbe aromatiche. Servita con salsa agrodolce.',
    price: 12.00,
    image: IMAGES.banhxeo,
    category: 'Antipasti',
    rating: 4.7,
    reviewCount: 145,
    calories: 380,
    prepTime: '8-12 min',
    isNew: true,
    reviews: [
      { author: 'Elena P.', rating: 5, text: 'Croccante fuori e morbido dentro, spettacolare!', date: '10 Mar 2025' },
      { author: 'Roberto G.', rating: 4, text: 'Ottimo antipasto, perfetto da condividere.', date: '1 Mar 2025' },
    ],
    toppings: [
      { name: 'Gamberi', price: 2.50 },
      { name: 'Tofu extra', price: 1.00 },
    ],
  },
  {
    id: 4,
    name: 'Gỏi Cuốn',
    nameViet: 'Involtini freschi',
    description: 'Delicati involtini freschi in carta di riso trasparente, con gamberetti, maiale, vermicelli, lattuga e menta. Serviti con salsa hoisin alle arachidi.',
    price: 9.00,
    image: IMAGES.goicuon,
    category: 'Antipasti',
    rating: 4.6,
    reviewCount: 230,
    calories: 220,
    prepTime: '5-8 min',
    isPopular: true,
    reviews: [
      { author: 'Chiara B.', rating: 5, text: 'Freschi, leggeri e deliziosi. Perfetti!', date: '8 Mar 2025' },
      { author: 'Davide S.', rating: 4, text: 'La salsa alle arachidi è incredibile.', date: '25 Feb 2025' },
    ],
    toppings: [
      { name: 'Gamberi extra', price: 2.00 },
      { name: 'Avocado', price: 1.50 },
    ],
  },
  {
    id: 5,
    name: 'Cơm Gà',
    nameViet: 'Riso con pollo',
    description: 'Pollo marinato in lemongrass e zenzero, servito su riso al gelsomino profumato con salsa gừng (zenzero), cetrioli e erbe fresche.',
    price: 15.00,
    image: IMAGES.comga,
    category: 'Secondi',
    rating: 4.7,
    reviewCount: 167,
    calories: 620,
    prepTime: '15-20 min',
    reviews: [
      { author: 'Federica N.', rating: 5, text: 'Riso fragrante e pollo succoso, perfetto equilibrio.', date: '3 Mar 2025' },
      { author: 'Matteo V.', rating: 4, text: 'Porzione abbondante, molto soddisfacente.', date: '18 Feb 2025' },
    ],
    sizes: [
      { name: 'Normale', priceAdd: 0 },
      { name: 'Grande', priceAdd: 3.00 },
    ],
  },
  {
    id: 6,
    name: 'Chả Cá',
    nameViet: 'Branzino all\'aneto',
    description: 'Filetto di branzino marinato in curcuma e pasta di gamberi, saltato in padella con aneto fresco e cipollotti. Un classico di Hanoi, servito con vermicelli.',
    price: 18.00,
    image: IMAGES.chaca,
    category: 'Secondi',
    rating: 4.9,
    reviewCount: 89,
    calories: 460,
    prepTime: '18-25 min',
    isNew: true,
    reviews: [
      { author: 'Alessandro R.', rating: 5, text: 'Un piatto unico nel suo genere, profumato e raffinato.', date: '12 Mar 2025' },
      { author: 'Valentina C.', rating: 5, text: 'Il signature dish del ristorante, da non perdere!', date: '5 Mar 2025' },
    ],
  },
  {
    id: 7,
    name: 'Bún Bò Huế',
    nameViet: 'Zuppa piccante',
    description: 'Zuppa di manzo e maiale piccante e speziata, tipica di Huế. Brodo aromatico con lemongrass, gamberi fermentati, noodles spessi e erbe fresche.',
    price: 14.00,
    image: IMAGES.bunboHue,
    category: 'Zuppe',
    rating: 4.8,
    reviewCount: 112,
    calories: 520,
    prepTime: '10-15 min',
    reviews: [
      { author: 'Lorenzo P.', rating: 5, text: 'Per chi ama il piccante: questa è la zuppa definitiva!', date: '9 Mar 2025' },
    ],
    toppings: [
      { name: 'Livello piccante extra', price: 0 },
      { name: 'Carne extra', price: 2.50 },
    ],
  },
  {
    id: 8,
    name: 'Bánh Mì',
    nameViet: 'Sandwich vietnamita',
    description: 'Il famoso sandwich vietnamita: baguette croccante con pâté, maiale arrostito, verdure in agrodolce (carote e daikon), coriandolo e jalapeño.',
    price: 8.00,
    image: IMAGES.banhmi,
    category: 'Antipasti',
    rating: 4.6,
    reviewCount: 278,
    calories: 420,
    prepTime: '5-8 min',
    isPopular: true,
    reviews: [
      { author: 'Sara M.', rating: 5, text: 'Il miglior street food di Milano!', date: '11 Mar 2025' },
      { author: 'Giorgio F.', rating: 4, text: 'Croccante e saporito, ottimo pranzo veloce.', date: '4 Mar 2025' },
    ],
    toppings: [
      { name: 'Uovo al tegamino', price: 1.50 },
      { name: 'Gamberi', price: 2.50 },
      { name: 'Tofu (vegano)', price: 1.00 },
    ],
  },
  {
    id: 9,
    name: 'Chè',
    nameViet: 'Dolce tradizionale',
    description: 'Dolce vietnamita tradizionale: crema di fagioli mung con latte di cocco, gelatina di erbe, tapioca colorata e sciroppo di pandan. Fresco e delicato.',
    price: 6.00,
    image: IMAGES.che,
    category: 'Dessert',
    rating: 4.5,
    reviewCount: 95,
    calories: 280,
    prepTime: '3-5 min',
    reviews: [
      { author: 'Martina B.', rating: 5, text: 'Un finale perfetto, leggero e profumato.', date: '7 Mar 2025' },
    ],
  },
  {
    id: 10,
    name: 'Trà Sen',
    nameViet: 'Tè al fiore di loto',
    description: 'Tè verde vietnamita delicatamente profumato con fiori di loto essiccati. Caldo o freddo, è l\'accompagnamento perfetto per ogni piatto.',
    price: 4.00,
    image: IMAGES.traSen,
    category: 'Bevande',
    rating: 4.7,
    reviewCount: 143,
    calories: 5,
    prepTime: '3-5 min',
    reviews: [
      { author: 'Irene D.', rating: 5, text: 'Profumato e rilassante, lo prendo sempre!', date: '6 Mar 2025' },
    ],
  },
];
