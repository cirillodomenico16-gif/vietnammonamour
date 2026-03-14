import { useState } from 'react';
import { COLORS } from '../config/theme';
import { menuItems, CATEGORIES } from '../data/menuItems';

interface MenuPageProps {
  onItemClick: (id: number) => void;
}

export default function MenuPage({ onItemClick }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('Phở');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = menuItems.filter(item => {
    const matchCat = item.category === activeCategory;
    const matchSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const allFiltered = searchQuery
    ? menuItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filtered;

  const catIcons: Record<string, string> = {
    'Phở': '🍜', 'Bánh Mì': '🥖', 'Gỏi Cuốn': '🌮',
    'Bún Bò': '🍲', 'Cơm': '🍚', 'Bevande': '🥤',
  };

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh' }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div style={{
        padding: '16px 16px 12px',
        background: `linear-gradient(180deg, ${COLORS.cardBg} 0%, ${COLORS.background} 100%)`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ color: COLORS.textPrimary, fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>
          🍜 Il Nostro Menu
        </div>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: COLORS.inputBg,
          borderRadius: '14px',
          padding: '10px 14px',
          gap: '10px',
          border: `1px solid ${COLORS.border}`,
        }}>
          <span style={{ color: COLORS.textMuted, fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder="Cerca nel menu Vietnamour..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: COLORS.textPrimary,
              fontSize: '14px',
              flex: 1,
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: COLORS.textMuted, cursor: 'pointer', fontSize: '16px' }}>✕</button>
          )}
        </div>
      </div>

      {/* ── CATEGORY TABS ──────────────────────────────────────── */}
      {!searchQuery && (
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          borderBottom: `1px solid ${COLORS.border}`,
        }}>
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  background: isActive ? COLORS.gradient : COLORS.cardBg,
                  color: isActive ? '#fff' : COLORS.textSecondary,
                  border: `1px solid ${isActive ? 'transparent' : COLORS.border}`,
                  borderRadius: '20px',
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '400',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{catIcons[cat]}</span>
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* ── ITEMS LIST ─────────────────────────────────────────── */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(searchQuery ? allFiltered : filtered).map(item => (
          <div
            key={item.id}
            onClick={() => onItemClick(item.id)}
            style={{
              background: COLORS.cardBg,
              borderRadius: '16px',
              border: `1px solid ${COLORS.border}`,
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              gap: '12px',
              padding: '12px',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px' }}
              />
              {item.isPopular && (
                <div style={{
                  position: 'absolute', top: '4px', left: '4px',
                  background: COLORS.gradient,
                  color: '#fff', fontSize: '8px', fontWeight: '700',
                  padding: '2px 5px', borderRadius: '6px', letterSpacing: '0.3px',
                }}>POPOLARE</div>
              )}
              {item.isNew && (
                <div style={{
                  position: 'absolute', top: '4px', left: '4px',
                  background: COLORS.gradientGold,
                  color: '#000', fontSize: '8px', fontWeight: '700',
                  padding: '2px 5px', borderRadius: '6px',
                }}>NUOVO</div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ color: COLORS.textPrimary, fontSize: '14px', fontWeight: '700', lineHeight: 1.3 }}>
                  {item.name}
                  {item.isSpicy && <span style={{ marginLeft: '4px' }}>🌶️</span>}
                </div>
                <div style={{ color: COLORS.secondary, fontSize: '15px', fontWeight: '800', flexShrink: 0 }}>€{item.price.toFixed(2)}</div>
              </div>

              <div style={{
                color: COLORS.textMuted,
                fontSize: '11px',
                lineHeight: 1.5,
                marginTop: '4px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {item.description}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', alignItems: 'center' }}>
                <span style={{ color: COLORS.star, fontSize: '11px', fontWeight: '600' }}>★ {item.rating} ({item.reviewCount})</span>
                <span style={{ color: COLORS.textMuted, fontSize: '11px' }}>⏱ {item.prepTime}</span>
                <span style={{ color: COLORS.textMuted, fontSize: '11px' }}>🔥 {item.calories} kcal</span>
              </div>
            </div>
          </div>
        ))}

        {(searchQuery ? allFiltered : filtered).length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: COLORS.textMuted }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: COLORS.textSecondary }}>Nessun risultato</div>
            <div style={{ fontSize: '13px', marginTop: '6px' }}>Prova con un'altra parola chiave</div>
          </div>
        )}
      </div>
    </div>
  );
}
