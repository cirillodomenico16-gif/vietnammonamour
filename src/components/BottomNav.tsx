import { COLORS } from '../config/theme';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
}

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5.2 4H2v2h2l3.6 7.6-1.4 2.4c-.1.2-.2.5-.2.7 0 1.1.9 2 2 2h12v-2H8.5c-.1 0-.2-.1-.2-.2l.1-.3.9-1.5H17c.8 0 1.4-.4 1.8-1l3.6-6.5c.1-.2.1-.4.1-.5 0-.6-.4-1-1-1H5.2z"/>
  </svg>
);
const OrdersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);
const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const navItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'menu', label: 'Menu', Icon: MenuIcon },
  { id: 'cart', label: 'Carrello', Icon: CartIcon },
  { id: 'orders', label: 'Ordini', Icon: OrdersIcon },
  { id: 'profile', label: 'Profilo', Icon: ProfileIcon },
];

export default function BottomNav({ currentPage, onNavigate, cartCount }: BottomNavProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '430px',
      width: '100%',
      background: COLORS.navBg,
      borderTop: `1px solid ${COLORS.border}`,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0 16px',
      zIndex: 1000,
    }}>
      {navItems.map(({ id, label, Icon }) => {
        const isActive = currentPage === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: isActive ? COLORS.primary : COLORS.textMuted,
              position: 'relative',
              padding: '4px 12px',
              transition: 'color 0.2s ease',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: '-6px',
                width: '36px',
                height: '36px',
                background: `radial-gradient(circle, ${COLORS.primary}25 0%, transparent 70%)`,
                borderRadius: '50%',
              }} />
            )}
            {id === 'cart' && cartCount > 0 && (
              <div style={{
                position: 'absolute',
                top: '0px',
                right: '8px',
                background: COLORS.primary,
                color: COLORS.badgeText,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '10px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}>
                {cartCount}
              </div>
            )}
            <Icon />
            <span style={{ fontSize: '10px', fontWeight: isActive ? '700' : '400' }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
