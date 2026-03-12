import { COLORS } from '../config/theme';
import { IMAGES } from '../config/images';

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={COLORS.star}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const menuItems = [
  { icon: '📦', label: 'I miei ordini', desc: '3 ordini recenti' },
  { icon: '❤️', label: 'Piatti preferiti', desc: '5 piatti salvati' },
  { icon: '📍', label: 'Indirizzi salvati', desc: '1 indirizzo' },
  { icon: '🎟', label: 'Codici promo', desc: 'VIETNAM10, HANOI20' },
  { icon: '⚙️', label: 'Impostazioni', desc: 'Lingua, notifiche' },
  { icon: '💬', label: 'Supporto', desc: 'Chat & FAQ' },
];

export default function ProfilePage() {
  return (
    <div style={{ color: COLORS.textPrimary, paddingBottom: '16px' }}>
      {/* Header */}
      <div style={{
        padding: '54px 20px 24px',
        background: `linear-gradient(180deg, ${COLORS.secondary} 0%, ${COLORS.background} 100%)`,
        borderBottom: `1px solid ${COLORS.border}`,
        textAlign: 'center',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
          <img src={IMAGES.avatar} alt="Avatar" style={{
            width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover',
            border: `3px solid ${COLORS.primary}`,
          }} />
          <div style={{
            position: 'absolute', bottom: '2px', right: '2px',
            width: '22px', height: '22px', borderRadius: '50%',
            background: COLORS.gradientCTA, border: `2px solid ${COLORS.background}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px',
          }}>✎</div>
        </div>
        <div style={{ fontSize: '20px', fontWeight: '800', color: COLORS.textPrimary }}>Domenico</div>
        <div style={{ fontSize: '13px', color: COLORS.textMuted, marginTop: '2px' }}>cirillodomenico16@gmail.com</div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginTop: '20px' }}>
          {[
            { value: '12', label: 'Ordini' },
            { value: '4.9', label: 'Rating' },
            { value: '€186', label: 'Speso' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1, textAlign: 'center', padding: '12px',
              borderLeft: i > 0 ? `1px solid ${COLORS.border}` : 'none',
            }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: COLORS.primary }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty card */}
      <div style={{ margin: '16px', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.secondary} 0%, #6B1010 50%, #3D0A0A 100%)`,
          padding: '20px',
          border: `1px solid ${COLORS.border}`,
          position: 'relative',
        }}>
          {/* Ornamental corners */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', color: COLORS.primary, fontSize: '16px', opacity: 0.5 }}>✦</div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', color: COLORS.primary, fontSize: '16px', opacity: 0.5 }}>✦</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: COLORS.primary, fontSize: '12px', opacity: 0.4 }}>❧</div>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: COLORS.primary, fontSize: '12px', opacity: 0.4 }}>❧</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: COLORS.primary, fontWeight: '700', letterSpacing: '1.5px', marginBottom: '4px' }}>FIDELITY CARD</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: COLORS.textPrimary }}>🏮 Vietnammonamour</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: COLORS.textMuted }}>Punti</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: COLORS.primary }}>320</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: COLORS.textMuted, marginBottom: '6px' }}>
              <span>Prossimo premio a 500 punti</span>
              <span style={{ color: COLORS.primary }}>320 / 500</span>
            </div>
            <div style={{ height: '6px', background: COLORS.cardBg, borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '64%', background: COLORS.gradientCTA, borderRadius: '3px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                flex: 1, height: '28px', borderRadius: '6px',
                background: i < 3 ? COLORS.gradientCTA : COLORS.cardBg,
                border: `1px solid ${i < 3 ? COLORS.primary : COLORS.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {i < 3 ? <StarIcon /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map(item => (
          <button key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
            borderRadius: '16px', padding: '14px 16px', cursor: 'pointer', width: '100%', textAlign: 'left',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: `${COLORS.primary}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0,
            }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: COLORS.textPrimary }}>{item.label}</div>
              <div style={{ fontSize: '12px', color: COLORS.textMuted, marginTop: '2px' }}>{item.desc}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.textMuted}><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div style={{ padding: '16px 16px 0' }}>
        <button style={{
          width: '100%', padding: '14px',
          background: 'none', border: `1px solid ${COLORS.border}`,
          borderRadius: '16px', color: COLORS.danger,
          fontSize: '14px', fontWeight: '700', cursor: 'pointer',
        }}>Esci dall'account</button>
      </div>
    </div>
  );
}
