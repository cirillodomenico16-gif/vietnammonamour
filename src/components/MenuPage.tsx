import { useState } from 'react';
import { COLORS } from '../config/theme';
import { menuItems, categories } from '../data/menuItems';

interface MenuPageProps {
  onItemClick: (id: number) => void;
}

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill={COLORS.star}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

export default function MenuPage({ onItemClick }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [search, setSearch] = useState('');

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'Tutti' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.nameViet.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ color: COLORS.textPrimary, paddingBottom: '16px' }}>
      {/* Header */}
      <div style={{
        padding: '54px 20px 16px',
        background: `linear-gradient(180deg, ${COLORS.secondary} 0%, ${COLORS.background} 100%)`,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏮</span> Il Nostro Menu
        </h1>
        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: COLORS.textMuted }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </div>
          <input
            type="text"
            placeholder="Cerca piatti vietnamiti…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px 12px 42px',
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '14px', color: COLORS.textPrimary,
              fontSize: '14px', outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ padding: '0 16px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '7px 16px',
                borderRadius: '20px',
                border: `1px solid ${activeCategory === cat ? COLORS.primary : COLORS.border}`,
                background: activeCategory === cat ? COLORS.gradientCTA : COLORS.cardBg,
                color: activeCategory === cat ? COLORS.badgeText : COLORS.textSecondary,
                fontSize: '13px', fontWeight: activeCategory === cat ? '700' : '500',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ padding: '0 16px 12px', fontSize: '12px', color: COLORS.textMuted }}>
        {filtered.length} piatt{filtered.length !== 1 ? 'i' : 'o'} {activeCategory !== 'Tutti' ? `in "${activeCategory}"` : ''}
      </div>

      {/* Items list */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: COLORS.textMuted }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🍜</div>
            <p>Nessun piatto trovato</p>
          </div>
        ) : filtered.map(item => (
          <div
            key={item.id}
            onClick={() => onItemClick(item.id)}
            style={{
              display: 'flex', gap: '14px',
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '18px', padding: '14px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '90px', height: '90px', borderRadius: '14px', objectFit: 'cover', display: 'block' }}
              />
              {item.isPopular && (
                <div style={{
                  position: 'absolute', top: '6px', left: '6px',
                  background: COLORS.primary, color: COLORS.badgeText,
                  fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '8px',
                }}>TOP</div>
              )}
              {item.isNew && (
                <div style={{
                  position: 'absolute', top: '6px', left: '6px',
                  background: COLORS.gradientCTA, color: COLORS.badgeText,
                  fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '8px',
                }}>NEW</div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: '700', color: COLORS.textPrimary, marginBottom: '1px' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: COLORS.primary, fontWeight: '600', marginBottom: '5px' }}>{item.nameViet}</div>
              <div style={{
                fontSize: '12px', color: COLORS.textMuted, marginBottom: '10px',
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>{item.description}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <StarIcon />
                    <span style={{ fontSize: '12px', color: COLORS.textSecondary, fontWeight: '600' }}>{item.rating}</span>
                    <span style={{ fontSize: '11px', color: COLORS.textMuted }}>({item.reviewCount})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: COLORS.textMuted, fontSize: '11px' }}>
                    <span>⏱</span>
                    <span>{item.prepTime}</span>
                  </div>
                </div>
                <span style={{ fontWeight: '800', color: COLORS.primary, fontSize: '16px' }}>€{item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
