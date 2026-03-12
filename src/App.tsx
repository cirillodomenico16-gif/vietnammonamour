import { useState } from 'react';
import { COLORS } from './config/theme';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import DetailPage from './components/DetailPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';

export interface CartItem {
  cartId: string; // composite key: `${id}_${size||'base'}`
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  extras?: string[];
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const cartId = `${item.id}_${item.size || 'base'}`;
    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
        );
      }
      return [...prev, { ...item, cartId }];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev
      .map(i => i.cartId === cartId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );
  };

  const navigateToDetail = (itemId: number) => {
    setSelectedItemId(itemId);
    setCurrentPage('detail');
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div style={{
      background: COLORS.background,
      minHeight: '100vh',
      maxWidth: '430px',
      margin: '0 auto',
      position: 'relative',
      paddingBottom: '80px',
      overflowX: 'hidden',
    }}>
      {currentPage === 'home' && (
        <HomePage onNavigate={setCurrentPage} onItemClick={navigateToDetail} />
      )}
      {currentPage === 'menu' && (
        <MenuPage onItemClick={navigateToDetail} />
      )}
      {currentPage === 'detail' && selectedItemId !== null && (
        <DetailPage
          itemId={selectedItemId}
          onAddToCart={(item) => { addToCart(item); setCurrentPage('cart'); }}
          onBack={() => setCurrentPage('menu')}
        />
      )}
      {currentPage === 'cart' && (
        <CartPage cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'orders' && (
        <div style={{ padding: '80px 24px', textAlign: 'center', color: COLORS.textSecondary }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <p>Nessun ordine attivo</p>
        </div>
      )}
      {currentPage === 'profile' && <ProfilePage />}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} cartCount={cartCount} />
    </div>
  );
}

export default App;
