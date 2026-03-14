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
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
  </svg>
);
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h11v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H15c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0019.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);
const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'menu', label: 'Menu', Icon: MenuIcon },
  { id: 'cart', label: 'Carrello', Icon: CartIcon },
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
      padding: '10px 0 14px',
      zIndex: 1000,
    }}>
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = currentPage === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? COLORS.secondary : COLORS.textMuted,
              position: 'relative',
              padding: '4px 16px',
              transition: 'color 0.2s',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: '-14px',
                width: '44px',
                height: '44px',
                background: `radial-gradient(circle, ${COLORS.primary}44 0%, transparent 70%)`,
                borderRadius: '50%',
              }} />
            )}
            {id === 'cart' && cartCount > 0 && (
              <div style={{
                position: 'absolute',
                top: '0px',
                right: '8px',
                background: COLORS.badge,
                color: '#fff',
                borderRadius: '50%',
                width: '17px',
                height: '17px',
                fontSize: '10px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}>
                {cartCount > 9 ? '9+' : cartCount}
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
