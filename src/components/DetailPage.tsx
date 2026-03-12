import { useState } from 'react';
import { COLORS } from '../config/theme';
import { menuItems } from '../data/menuItems';
import { CartItem } from '../App';

interface DetailPageProps {
  itemId: number;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
  onBack: () => void;
}

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? COLORS.star : COLORS.border}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function DetailPage({ itemId, onAddToCart, onBack }: DetailPageProps) {
  const item = menuItems.find(i => i.id === itemId);
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0]?.name || '');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const toppingCost = item.toppings
    ?.filter(t => selectedToppings.includes(t.name))
    .reduce((s, t) => s + t.price, 0) || 0;
  const sizeAdd = item.sizes?.find(s => s.name === selectedSize)?.priceAdd || 0;
  const unitPrice = item.price + sizeAdd + toppingCost;
  const total = unitPrice * quantity;

  const toggleTopping = (name: string) => {
    setSelectedToppings(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: unitPrice,
      quantity,
      image: item.image,
      size: selectedSize || undefined,
      extras: selectedToppings.length > 0 ? selectedToppings : undefined,
    });
  };

  return (
    <div style={{ color: COLORS.textPrimary, paddingBottom: '100px' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '280px' }}>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)' }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '52px', left: '16px',
            background: 'rgba(26,8,8,0.8)', border: `1px solid ${COLORS.border}`,
            borderRadius: '50%', width: '40px', height: '40px',
            color: COLORS.textPrimary, fontSize: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >‹</button>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '52px', right: '16px', display: 'flex', gap: '8px' }}>
          {item.isPopular && (
            <div style={{ background: COLORS.primary, color: COLORS.badgeText, fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px' }}>🏆 TOP</div>
          )}
          {item.isNew && (
            <div style={{ background: COLORS.gradientCTA, color: COLORS.badgeText, fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px' }}>✨ NUOVO</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px' }}>
        {/* Title & price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: COLORS.textPrimary, lineHeight: 1.2 }}>{item.name}</h1>
            <div style={{ fontSize: '13px', color: COLORS.primary, fontWeight: '600', marginTop: '2px' }}>{item.nameViet}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: COLORS.primary }}>€{item.price.toFixed(2)}</div>
            <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{item.calories} kcal</div>
          </div>
        </div>

        {/* Rating & info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(item.rating)} />)}
            <span style={{ fontSize: '13px', color: COLORS.textSecondary, marginLeft: '4px', fontWeight: '600' }}>{item.rating}</span>
            <span style={{ fontSize: '12px', color: COLORS.textMuted }}>({item.reviewCount})</span>
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⏱</span><span>{item.prepTime}</span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: COLORS.textSecondary, lineHeight: '1.6', marginBottom: '20px' }}>
          {item.description}
        </p>

        {/* Allergen badge */}
        <div style={{
          background: '#2A1A00', border: '1px solid #5A3A00',
          borderRadius: '12px', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '8px',
          marginBottom: '20px', fontSize: '12px', color: '#D4A017',
        }}>
          <span>⚠️</span>
          <span>Contiene: glutine, soia, pesce. Informaci di allergie.</span>
        </div>

        {/* Size selector */}
        {item.sizes && item.sizes.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: COLORS.textPrimary }}>Porzione</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              {item.sizes.map(size => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  style={{
                    flex: 1, padding: '10px',
                    borderRadius: '12px',
                    border: `1.5px solid ${selectedSize === size.name ? COLORS.primary : COLORS.border}`,
                    background: selectedSize === size.name ? `${COLORS.primary}15` : COLORS.cardBg,
                    color: selectedSize === size.name ? COLORS.primary : COLORS.textSecondary,
                    fontSize: '13px', fontWeight: selectedSize === size.name ? '700' : '500',
                    cursor: 'pointer',
                  }}
                >
                  <div>{size.name}</div>
                  {size.priceAdd > 0 && <div style={{ fontSize: '11px' }}>+€{size.priceAdd.toFixed(2)}</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toppings */}
        {item.toppings && item.toppings.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: COLORS.textPrimary }}>Aggiunte</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.toppings.map(top => (
                <button
                  key={top.name}
                  onClick={() => toggleTopping(top.name)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px',
                    background: selectedToppings.includes(top.name) ? `${COLORS.primary}15` : COLORS.cardBg,
                    border: `1.5px solid ${selectedToppings.includes(top.name) ? COLORS.primary : COLORS.border}`,
                    borderRadius: '12px', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px',
                      border: `2px solid ${selectedToppings.includes(top.name) ? COLORS.primary : COLORS.border}`,
                      background: selectedToppings.includes(top.name) ? COLORS.primary : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {selectedToppings.includes(top.name) && <span style={{ color: COLORS.badgeText, fontSize: '12px', fontWeight: '800' }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '14px', color: COLORS.textPrimary }}>{top.name}</span>
                  </div>
                  {top.price > 0 && (
                    <span style={{ fontSize: '13px', color: COLORS.primary, fontWeight: '700' }}>+€{top.price.toFixed(2)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {item.reviews.length > 0 && (
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: COLORS.textPrimary }}>Recensioni</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {item.reviews.slice(0, 2).map((rev, idx) => (
                <div key={idx} style={{
                  background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
                  borderRadius: '14px', padding: '14px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: COLORS.gradientCTA,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: '800', color: COLORS.badgeText,
                      }}>{rev.author[0]}</div>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: COLORS.textPrimary }}>{rev.author}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= rev.rating} />)}
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: COLORS.textSecondary, lineHeight: '1.5' }}>{rev.text}</p>
                  <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '6px' }}>{rev.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        maxWidth: '430px', width: '100%',
        background: COLORS.navBg, borderTop: `1px solid ${COLORS.border}`,
        padding: '14px 16px 24px',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}>
        {/* Quantity */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
          borderRadius: '14px', padding: '8px 14px',
        }}>
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
            style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '22px', cursor: 'pointer', fontWeight: '700', lineHeight: 1 }}>−</button>
          <span style={{ fontSize: '16px', fontWeight: '700', minWidth: '20px', textAlign: 'center', color: COLORS.textPrimary }}>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}
            style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '22px', cursor: 'pointer', fontWeight: '700', lineHeight: 1 }}>+</button>
        </div>
        {/* CTA */}
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1, background: COLORS.gradientCTA,
            border: 'none', borderRadius: '16px',
            padding: '14px', fontSize: '15px', fontWeight: '800',
            color: COLORS.badgeText, cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <span>Aggiungi al carrello</span>
          <span>€{total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
