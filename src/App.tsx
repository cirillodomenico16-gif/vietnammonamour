import { useState } from 'react';
import { COLORS } from './config/theme';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import DetailPage from './components/DetailPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  extras?: string[];
}

type Page = 'home' | 'menu' | 'detail' | 'cart' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (id: number) => {
    setSelectedItemId(id);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const key = `${item.id}-${item.size ?? ''}`;
      const existing = prev.find(c => `${c.id}-${c.size ?? ''}` === key);
      if (existing) {
        return prev.map(c =>
          `${c.id}-${c.size ?? ''}` === key
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        );
      }
      return [...prev, item];
    });
    setCurrentPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(c => c.id === id ? { ...c, quantity: c.quantity + delta } : c)
        .filter(c => c.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div style={{
      maxWidth: '430px',
      margin: '0 auto',
      background: COLORS.background,
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* ── PAGE VIEWS ─────────────────────────────────────────────── */}
      {currentPage === 'home' && (
        <HomePage
          onNavigate={handleNavigate}
          onItemClick={handleItemClick}
        />
      )}

      {currentPage === 'menu' && (
        <MenuPage
          onItemClick={handleItemClick}
        />
      )}

      {currentPage === 'detail' && selectedItemId !== null && (
        <DetailPage
          itemId={selectedItemId}
          onBack={() => {
            setCurrentPage('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage onNavigate={handleNavigate} />
      )}

      {/* ── BOTTOM NAV ────────────────────────────────────────────── */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />
    </div>
  );
}
