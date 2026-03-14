import { useState } from 'react';
import { COLORS, FONTS } from '../config/theme';
import { menuItems } from '../data/menuItems';
import type { CartItem } from '../App';

interface DetailPageProps {
  itemId: number;
  onAddToCart: (item: CartItem) => void;
  onBack: () => void;
}

export default function DetailPage({ itemId, onAddToCart, onBack }: DetailPageProps) {
  const item = menuItems.find(i => i.id === itemId);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const sizePrice = item.sizes ? item.sizes[selectedSize].priceAdd : 0;
  const toppingsPrice = selectedToppings.reduce((sum, idx) => sum + (item.toppings?.[idx]?.price ?? 0), 0);
  const unitPrice = item.price + sizePrice + toppingsPrice;
  const total = unitPrice * quantity;

  const toggleTopping = (idx: number) => {
    setSelectedToppings(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleAdd = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: unitPrice,
      quantity,
      image: item.image,
      size: item.sizes?.[selectedSize]?.name,
      extras: selectedToppings.map(i => item.toppings![i].name),
    });
    onBack();
  };

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── HERO IMAGE ─────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: '280px' }}>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,0,0,0.85) 100%)' }} />

        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '16px', left: '16px',
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)', border: 'none',
            color: '#fff', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>

        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {item.isPopular && <span style={{ background: COLORS.gradient, color: '#fff', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>⭐ POPOLARE</span>}
            {item.isNew && <span style={{ background: COLORS.gradientGold, color: '#000', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>🆕 NUOVO</span>}
            {item.isSpicy && <span style={{ background: '#AA2200', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>🌶️ PICCANTE</span>}
          </div>
          <div style={{ color: '#fff', fontSize: '24px', fontWeight: '800', fontFamily: FONTS.title, lineHeight: 1.2 }}>{item.name}</div>
          <div style={{ color: COLORS.secondary, fontSize: '22px', fontWeight: '800', marginTop: '4px' }}>€{item.price.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* ── META ───────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {[
            { icon: '★', val: `${item.rating} (${item.reviewCount})`, col: COLORS.star },
            { icon: '⏱', val: item.prepTime, col: COLORS.textSecondary },
            { icon: '🔥', val: `${item.calories} kcal`, col: COLORS.textSecondary },
          ].map(({ icon, val, col }) => (
            <div key={val} style={{
              background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
              borderRadius: '10px', padding: '6px 12px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <span style={{ color: col, fontSize: '12px' }}>{icon}</span>
              <span style={{ color: col, fontSize: '12px', fontWeight: '600' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* ── DESCRIPTION ─────────────────────────────────────────── */}
        <div style={{ color: COLORS.textSecondary, fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
          {item.description}
        </div>

        {/* ── ALLERGENS ───────────────────────────────────────────── */}
        {item.allergens && item.allergens.length > 0 && (
          <div style={{ marginBottom: '20px', background: COLORS.cardBg, borderRadius: '12px', border: `1px solid ${COLORS.border}`, padding: '12px' }}>
            <div style={{ color: COLORS.secondary, fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>⚠️ ALLERGENI</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {item.allergens.map(a => (
                <span key={a} style={{ background: COLORS.tag, color: COLORS.textSecondary, fontSize: '11px', padding: '3px 9px', borderRadius: '8px' }}>{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── SIZES ───────────────────────────────────────────────── */}
        {item.sizes && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: COLORS.textPrimary, fontSize: '15px', fontWeight: '700', marginBottom: '10px' }}>Formato</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {item.sizes.map((size, idx) => {
                const isActive = selectedSize === idx;
                const displayPrice = item.price + size.priceAdd;
                return (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(idx)}
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: `2px solid ${isActive ? COLORS.primary : COLORS.border}`,
                      background: isActive ? COLORS.gradient : COLORS.cardBg,
                      color: isActive ? '#fff' : COLORS.textSecondary,
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      textAlign: 'center',
                    }}
                  >
                    <div>{size.name}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '2px', color: isActive ? COLORS.secondary : COLORS.textMuted }}>
                      €{displayPrice.toFixed(2)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TOPPINGS ────────────────────────────────────────────── */}
        {item.toppings && item.toppings.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: COLORS.textPrimary, fontSize: '15px', fontWeight: '700', marginBottom: '10px' }}>Aggiunte</div>
            {item.toppings.map((topping, idx) => {
              const isChecked = selectedToppings.includes(idx);
              return (
                <div
                  key={topping.name}
                  onClick={() => toggleTopping(idx)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: `1px solid ${COLORS.border}`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '6px',
                      border: `2px solid ${isChecked ? COLORS.primary : COLORS.border}`,
                      background: isChecked ? COLORS.gradient : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {isChecked && <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>}
                    </div>
                    <span style={{ color: COLORS.textSecondary, fontSize: '14px' }}>{topping.name}</span>
                  </div>
                  <span style={{ color: COLORS.secondary, fontSize: '13px', fontWeight: '600' }}>+€{topping.price.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── REVIEWS ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: COLORS.textPrimary, fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>
            💬 Recensioni ({item.reviewCount})
          </div>
          {item.reviews.map((review, idx) => (
            <div key={idx} style={{
              background: COLORS.cardBg,
              borderRadius: '12px',
              border: `1px solid ${COLORS.border}`,
              padding: '12px',
              marginBottom: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '700' }}>{review.author}</div>
                <div style={{ color: COLORS.textMuted, fontSize: '11px' }}>{review.date}</div>
              </div>
              <div style={{ color: COLORS.star, fontSize: '12px', marginBottom: '4px' }}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <div style={{ color: COLORS.textSecondary, fontSize: '13px', lineHeight: 1.5 }}>{review.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)',
        maxWidth: '430px', width: '100%',
        padding: '12px 16px',
        background: `linear-gradient(to top, ${COLORS.background} 70%, transparent)`,
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Quantity */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: COLORS.cardBg, borderRadius: '16px',
            border: `1px solid ${COLORS.border}`, padding: '10px 14px',
          }}>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', color: quantity > 1 ? COLORS.primary : COLORS.textMuted, fontSize: '20px', cursor: 'pointer', lineHeight: 1, fontWeight: '700' }}>−</button>
            <span style={{ color: COLORS.textPrimary, fontSize: '16px', fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '20px', cursor: 'pointer', lineHeight: 1, fontWeight: '700' }}>+</button>
          </div>
          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            style={{
              flex: 1, background: COLORS.gradient, color: '#fff',
              border: 'none', borderRadius: '16px', padding: '14px',
              fontSize: '15px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingLeft: '20px', paddingRight: '20px',
            }}
          >
            <span>Aggiungi</span>
            <span style={{ color: COLORS.secondary }}>€{total.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
