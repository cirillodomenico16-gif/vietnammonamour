import { useState, useEffect } from 'react';
import { COLORS } from '../config/theme';
import { IMAGES } from '../config/images';
import { menuItems } from '../data/menuItems';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onItemClick: (id: number) => void;
}

function CountdownTimer({ endMinutes }: { endMinutes: number }) {
  const [seconds, setSeconds] = useState(endMinutes * 60);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return <span style={{ fontWeight: '800', color: COLORS.primary, fontVariantNumeric: 'tabular-nums' }}>{pad(h)}:{pad(m)}:{pad(s)}</span>;
}

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={COLORS.star}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const OrnamentDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${COLORS.primary}44)` }} />
    <span style={{ color: COLORS.primary, fontSize: '14px', opacity: 0.7 }}>✦</span>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${COLORS.primary}44, transparent)` }} />
  </div>
);

export default function HomePage({ onNavigate, onItemClick }: HomePageProps) {
  const popular = menuItems.filter(i => i.isPopular);
  const isNew = menuItems.filter(i => i.isNew);

  const categories = [
    { id: 'Zuppe', icon: '🍜', label: 'Zuppe' },
    { id: 'Antipasti', icon: '🥢', label: 'Antipasti' },
    { id: 'Secondi', icon: '🍽️', label: 'Secondi' },
    { id: 'Dessert', icon: '🍮', label: 'Dessert' },
    { id: 'Bevande', icon: '🍵', label: 'Bevande' },
  ];

  return (
    <div style={{ color: COLORS.textPrimary }}>
      {/* Header */}
      <div style={{
        padding: '54px 20px 16px',
        background: `linear-gradient(180deg, ${COLORS.secondary} 0%, ${COLORS.background} 100%)`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '18px' }}>🏮</span>
              <span style={{ fontSize: '20px', fontWeight: '800', color: COLORS.primary, letterSpacing: '-0.3px' }}>
                Vietnammonamour
              </span>
            </div>
            <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>Via Taramelli · Milano</div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.textSecondary }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.textSecondary }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#0D2B0D', border: '1px solid #1a5c1a',
            borderRadius: '20px', padding: '5px 12px', fontSize: '12px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: COLORS.success }} />
            <span style={{ color: COLORS.success, fontWeight: '700' }}>APERTO</span>
            <span style={{ color: COLORS.textMuted }}>fino alle 23:00</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
            borderRadius: '20px', padding: '5px 12px', fontSize: '12px',
          }}>
            <span>🕐</span>
            <span style={{ color: COLORS.textSecondary }}>30–40 min</span>
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div style={{ position: 'relative', margin: '16px', borderRadius: '20px', overflow: 'hidden', height: '200px' }}>
        <img src={IMAGES.hero} alt="Vietnammonamour" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(26,8,8,0.85) 40%, transparent)',
          display: 'flex', alignItems: 'center', padding: '24px',
        }}>
          <div>
            <div style={{ fontSize: '11px', color: COLORS.primary, fontWeight: '700', letterSpacing: '1.5px', marginBottom: '6px' }}>
              UN ANGOLO DI VIETNAM A MILANO
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: COLORS.textPrimary, lineHeight: '1.2', marginBottom: '12px' }}>
              Sapori autentici<br />di Hanoi
            </div>
            <button
              onClick={() => onNavigate('menu')}
              style={{
                background: COLORS.gradientCTA,
                border: 'none', borderRadius: '25px',
                padding: '10px 22px', fontSize: '13px',
                fontWeight: '700', color: COLORS.badgeText,
                cursor: 'pointer',
              }}
            >
              Esplora il menu →
            </button>
          </div>
        </div>
        {/* Gold corner ornaments */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', color: COLORS.primary, fontSize: '18px', opacity: 0.6 }}>✦</div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: COLORS.primary, fontSize: '12px', opacity: 0.4 }}>❧</div>
      </div>

      {/* Deal countdown */}
      <div style={{ margin: '0 16px 20px' }}>
        <div style={{
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '16px',
          padding: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: COLORS.gradientCTA,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>🎁</div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: COLORS.textPrimary }}>Combo Phở + Bevanda</div>
              <div style={{ fontSize: '12px', color: COLORS.primary, fontWeight: '600' }}>-20% · Offerta a tempo</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '2px' }}>Scade in</div>
            <CountdownTimer endMinutes={97} />
          </div>
        </div>
      </div>

      <OrnamentDivider />

      {/* Categories grid */}
      <div style={{ padding: '16px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: COLORS.textPrimary }}>Categorie</h2>
          <button onClick={() => onNavigate('menu')} style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Vedi tutto →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigate('menu')}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '14px',
                padding: '12px 6px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '22px' }}>{cat.icon}</span>
              <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontWeight: '600', textAlign: 'center' }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <OrnamentDivider />

      {/* Popular dishes */}
      <div style={{ padding: '16px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: COLORS.textPrimary }}>🏮 I più amati</h2>
          <button onClick={() => onNavigate('menu')} style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Vedi tutti →</button>
        </div>
        <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px' }}>
          {popular.map(item => (
            <div
              key={item.id}
              onClick={() => onItemClick(item.id)}
              style={{
                flexShrink: 0, width: '160px',
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '18px', overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', height: '110px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', top: '8px', left: '8px',
                  background: COLORS.primary, color: COLORS.badgeText,
                  fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '10px',
                }}>⭐ {item.rating}</div>
              </div>
              <div style={{ padding: '10px 12px 14px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: COLORS.textPrimary, marginBottom: '2px' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>{item.nameViet}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: COLORS.primary, fontSize: '14px' }}>€{item.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onItemClick(item.id); }}
                    style={{
                      background: COLORS.gradientCTA, border: 'none',
                      borderRadius: '50%', width: '28px', height: '28px',
                      color: COLORS.badgeText, fontSize: '18px', fontWeight: '700',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New dishes */}
      <div style={{ padding: '8px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: COLORS.textPrimary }}>✨ Novità</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {isNew.map(item => (
            <div
              key={item.id}
              onClick={() => onItemClick(item.id)}
              style={{
                display: 'flex', gap: '14px', alignItems: 'center',
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '16px', padding: '12px',
                cursor: 'pointer',
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: COLORS.textPrimary }}>{item.name}</span>
                  <span style={{ background: COLORS.gradientCTA, color: COLORS.badgeText, fontSize: '9px', fontWeight: '800', padding: '2px 7px', borderRadius: '8px' }}>NUOVO</span>
                </div>
                <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '6px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <StarIcon />
                    <span style={{ fontSize: '11px', color: COLORS.textSecondary }}>{item.rating}</span>
                  </div>
                  <span style={{ fontWeight: '800', color: COLORS.primary }}>€{item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
