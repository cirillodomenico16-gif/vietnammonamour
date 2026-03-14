import { useState, useEffect } from 'react';
import { COLORS, FONTS } from '../config/theme';
import { IMAGES } from '../config/images';
import { menuItems, CATEGORIES } from '../data/menuItems';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onItemClick: (id: number) => void;
}

export default function HomePage({ onNavigate, onItemClick }: HomePageProps) {
  const [countdown, setCountdown] = useState({ h: 1, m: 54, s: 23 });

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 1, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const popular = menuItems.filter(i => i.isPopular).slice(0, 5);
  const newItems = menuItems.filter(i => i.isNew).slice(0, 4);

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', paddingBottom: '16px' }}>

      {/* ── STATUS BAR ─────────────────────────────────────────── */}
      <div style={{
        padding: '14px 20px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>📍 Hanoi Old Quarter · 12 Hàng Bạc</div>
          <div style={{ color: COLORS.textPrimary, fontSize: '16px', fontWeight: '700', fontFamily: FONTS.title }}>
            🍜 Vietnamour
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: COLORS.open,
            color: '#fff',
            fontSize: '10px',
            fontWeight: '700',
            padding: '3px 10px',
            borderRadius: '20px',
          }}>APERTO</div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: COLORS.secondary,
            fontSize: '16px',
          }}>🔔</div>
        </div>
      </div>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <div style={{
        margin: '0 16px 20px',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        height: '180px',
      }}>
        <img
          src={IMAGES.hero}
          alt="Vietnamour hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(139,0,0,0.85) 0%, rgba(204,51,0,0.5) 100%)',
        }} />
        <div style={{ position: 'absolute', inset: 0, padding: '20px' }}>
          <div style={{ color: COLORS.secondary, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
            ★ AUTENTICAMENTE VIETNAMITA
          </div>
          <div style={{ color: '#fff', fontSize: '22px', fontWeight: '800', fontFamily: FONTS.title, lineHeight: 1.2, marginTop: '6px' }}>
            Hanoi Street<br />Delights
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '4px' }}>
            Ricette tradizionali dal 1998
          </div>
          <button
            onClick={() => onNavigate('menu')}
            style={{
              marginTop: '12px',
              background: COLORS.gradientGold,
              color: '#000',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            ORDINA ORA →
          </button>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '16px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '12px',
          padding: '6px 12px',
          color: '#fff',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span>⏱</span> 20-25 min
        </div>
      </div>

      {/* ── HOT DEALS ──────────────────────────────────────────── */}
      <div style={{ margin: '0 16px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #8B0000, #CC0000)',
          borderRadius: '16px',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ color: COLORS.secondary, fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>
              🔥 HOT DEALS!
            </div>
            <div style={{ color: '#fff', fontSize: '16px', fontWeight: '700', marginTop: '2px' }}>
              Combo 20% OFF
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '2px' }}>
              Phở + Bánh Mì + Bevanda
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', marginBottom: '2px' }}>Scade tra</div>
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: COLORS.secondary,
              fontSize: '18px',
              fontWeight: '800',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '1px',
            }}>
              {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
            </div>
            <button
              onClick={() => onNavigate('menu')}
              style={{
                marginTop: '6px',
                background: COLORS.secondary,
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                padding: '5px 14px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
              }}>
              PRENDI →
            </button>
          </div>
        </div>
      </div>

      {/* ── POPULAR ITEMS ──────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ color: COLORS.textPrimary, fontSize: '16px', fontWeight: '700' }}>⭐ Più Amati</div>
          <button onClick={() => onNavigate('menu')} style={{ background: 'none', border: 'none', color: COLORS.secondary, fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Vedi tutti →</button>
        </div>
        <div style={{ display: 'flex', gap: '12px', paddingLeft: '16px', paddingRight: '16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {popular.map(item => (
            <div
              key={item.id}
              onClick={() => onItemClick(item.id)}
              style={{
                minWidth: '140px',
                background: COLORS.cardBg,
                borderRadius: '16px',
                overflow: 'hidden',
                border: `1px solid ${COLORS.border}`,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <div style={{ position: 'relative', height: '110px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {item.isSpicy && (
                  <div style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '14px' }}>🌶️</div>
                )}
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ color: COLORS.textPrimary, fontSize: '12px', fontWeight: '600', lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <div style={{ color: COLORS.secondary, fontSize: '13px', fontWeight: '700' }}>€{item.price.toFixed(2)}</div>
                  <div style={{ color: COLORS.star, fontSize: '10px' }}>★ {item.rating}</div>
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: '10px', marginTop: '3px' }}>⏱ {item.prepTime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ─────────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ padding: '0 16px', marginBottom: '12px' }}>
          <div style={{ color: COLORS.textPrimary, fontSize: '16px', fontWeight: '700' }}>🗂 Esplora il Menu</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '0 16px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onNavigate('menu')}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '14px',
                padding: '14px 8px',
                cursor: 'pointer',
                textAlign: 'center',
                color: COLORS.textPrimary,
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>
                {cat === 'Phở' ? '🍜' : cat === 'Bánh Mì' ? '🥖' : cat === 'Gỏi Cuốn' ? '🌮' : cat === 'Bún Bò' ? '🍲' : cat === 'Cơm' ? '🍚' : '🥤'}
              </div>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── NEW ARRIVALS ───────────────────────────────────────── */}
      {newItems.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ color: COLORS.textPrimary, fontSize: '16px', fontWeight: '700' }}>🆕 Nuovi Arrivi</div>
            <button onClick={() => onNavigate('menu')} style={{ background: 'none', border: 'none', color: COLORS.secondary, fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Tutti →</button>
          </div>
          <div style={{ display: 'flex', gap: '12px', paddingLeft: '16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {newItems.map(item => (
              <div
                key={item.id}
                onClick={() => onItemClick(item.id)}
                style={{
                  minWidth: '200px',
                  background: COLORS.cardBg,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.border}`,
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'flex',
                  gap: '10px',
                  padding: '10px',
                  alignItems: 'center',
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    background: COLORS.gradient,
                    color: '#fff',
                    fontSize: '9px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '4px',
                    letterSpacing: '0.5px',
                  }}>NUOVO</div>
                  <div style={{ color: COLORS.textPrimary, fontSize: '12px', fontWeight: '600', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ color: COLORS.secondary, fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>€{item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── INFO STRIP ─────────────────────────────────────────── */}
      <div style={{
        margin: '0 16px',
        background: COLORS.cardBg,
        borderRadius: '16px',
        border: `1px solid ${COLORS.border}`,
        padding: '14px 16px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { icon: '⏱', label: '20-25 min', sub: 'Consegna media' },
          { icon: '⭐', label: '4.8/5', sub: '2400+ recensioni' },
          { icon: '🛵', label: '€2.50', sub: 'Spese consegna' },
        ].map(({ icon, label, sub }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px' }}>{icon}</div>
            <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '700' }}>{label}</div>
            <div style={{ color: COLORS.textMuted, fontSize: '10px' }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
