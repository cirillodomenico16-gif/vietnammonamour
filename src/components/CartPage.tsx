import { useState } from 'react';
import { COLORS } from '../config/theme';
import { CartItem } from '../App';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemove: (cartId: string) => void;
  onNavigate: (page: string) => void;
}

const PROMO_CODES: Record<string, number> = {
  'VIETNAM10': 10,
  'HANOI20': 20,
  'PHOLOVERS': 15,
};

const TIP_OPTIONS = [0, 10, 15, 20];

export default function CartPage({ cart, onUpdateQuantity, onRemove, onNavigate }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [tipPercent, setTipPercent] = useState(10);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = cart.length > 0 ? 2.50 : 0;
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const tipAmount = ((subtotal - discountAmount) * tipPercent) / 100;
  const total = subtotal - discountAmount + delivery + tipAmount;

  const applyPromo = () => {
    const upper = promoCode.toUpperCase();
    if (PROMO_CODES[upper]) {
      setAppliedPromo({ code: upper, discount: PROMO_CODES[upper] });
      setPromoError('');
    } else {
      setPromoError('Codice non valido');
    }
  };

  if (orderPlaced) {
    return (
      <div style={{
        color: COLORS.textPrimary, padding: '80px 24px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
      }}>
        <div style={{ fontSize: '72px' }}>🏮</div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: COLORS.primary }}>Ordine confermato!</h2>
        <p style={{ color: COLORS.textSecondary, lineHeight: '1.6' }}>
          Grazie per aver scelto Vietnammonamour.<br />Il tuo ordine sarà pronto in 30–40 minuti.
        </p>
        <div style={{
          background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
          borderRadius: '16px', padding: '16px 24px', marginTop: '8px',
        }}>
          <div style={{ fontSize: '13px', color: COLORS.textMuted }}>Totale pagato</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: COLORS.primary }}>€{total.toFixed(2)}</div>
        </div>
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: COLORS.gradientCTA, border: 'none', borderRadius: '16px',
            padding: '14px 32px', fontSize: '15px', fontWeight: '700',
            color: COLORS.badgeText, cursor: 'pointer', marginTop: '8px',
          }}
        >Torna alla Home</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ color: COLORS.textPrimary, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥢</div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Il carrello è vuoto</h2>
        <p style={{ color: COLORS.textSecondary, marginBottom: '24px' }}>Aggiungi qualche piatto dal menu!</p>
        <button
          onClick={() => onNavigate('menu')}
          style={{
            background: COLORS.gradientCTA, border: 'none', borderRadius: '16px',
            padding: '14px 32px', fontSize: '15px', fontWeight: '700',
            color: COLORS.badgeText, cursor: 'pointer',
          }}
        >Vai al menu</button>
      </div>
    );
  }

  return (
    <div style={{ color: COLORS.textPrimary, paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        padding: '54px 20px 16px',
        background: `linear-gradient(180deg, ${COLORS.secondary} 0%, ${COLORS.background} 100%)`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🥢 Il tuo ordine
          <span style={{
            background: COLORS.primary, color: COLORS.badgeText,
            fontSize: '13px', fontWeight: '800', padding: '2px 10px', borderRadius: '12px',
          }}>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {cart.map(item => (
            <div key={item.cartId} style={{
              display: 'flex', gap: '12px', alignItems: 'center',
              background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '12px',
            }}>
              <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: COLORS.textPrimary }}>{item.name}</div>
                {item.size && <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{item.size}</div>}
                {item.extras && item.extras.length > 0 && (
                  <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{item.extras.join(', ')}</div>
                )}
                <div style={{ fontSize: '14px', fontWeight: '700', color: COLORS.primary, marginTop: '4px' }}>
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => onUpdateQuantity(item.cartId, -1)}
                  style={{ background: COLORS.cardBgHover, border: `1px solid ${COLORS.border}`, borderRadius: '8px', width: '28px', height: '28px', color: COLORS.textPrimary, fontSize: '16px', cursor: 'pointer', fontWeight: '700' }}>−</button>
                <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.cartId, 1)}
                  style={{ background: COLORS.cardBgHover, border: `1px solid ${COLORS.border}`, borderRadius: '8px', width: '28px', height: '28px', color: COLORS.primary, fontSize: '16px', cursor: 'pointer', fontWeight: '700' }}>+</button>
                <button onClick={() => onRemove(item.cartId)}
                  style={{ background: 'none', border: 'none', color: COLORS.danger, fontSize: '18px', cursor: 'pointer', marginLeft: '4px' }}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo code */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: COLORS.textPrimary }}>🎟 Codice promo</h3>
          {appliedPromo ? (
            <div style={{
              background: '#0D2B0D', border: '1px solid #1a5c1a',
              borderRadius: '12px', padding: '12px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <span style={{ color: COLORS.success, fontWeight: '700', fontSize: '14px' }}>✓ {appliedPromo.code}</span>
                <span style={{ color: COLORS.success, fontSize: '13px', marginLeft: '8px' }}>−{appliedPromo.discount}%</span>
              </div>
              <button onClick={() => { setAppliedPromo(null); setPromoCode(''); }}
                style={{ background: 'none', border: 'none', color: COLORS.textMuted, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Inserisci codice (es. VIETNAM10)"
                  value={promoCode}
                  onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); }}
                  style={{
                    flex: 1, padding: '11px 14px',
                    background: COLORS.cardBg, border: `1px solid ${promoError ? COLORS.danger : COLORS.border}`,
                    borderRadius: '12px', color: COLORS.textPrimary, fontSize: '13px', outline: 'none',
                  }}
                />
                <button onClick={applyPromo}
                  style={{
                    background: COLORS.gradientCTA, border: 'none',
                    borderRadius: '12px', padding: '11px 18px',
                    color: COLORS.badgeText, fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                  }}>Applica</button>
              </div>
              {promoError && <div style={{ color: COLORS.danger, fontSize: '12px', marginTop: '6px' }}>{promoError}</div>}
            </div>
          )}
        </div>

        {/* Tip */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: COLORS.textPrimary }}>💛 Mancia (opzionale)</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {TIP_OPTIONS.map(tip => (
              <button key={tip} onClick={() => setTipPercent(tip)}
                style={{
                  flex: 1, padding: '9px 4px',
                  borderRadius: '12px',
                  border: `1.5px solid ${tipPercent === tip ? COLORS.primary : COLORS.border}`,
                  background: tipPercent === tip ? `${COLORS.primary}15` : COLORS.cardBg,
                  color: tipPercent === tip ? COLORS.primary : COLORS.textSecondary,
                  fontSize: '13px', fontWeight: tipPercent === tip ? '700' : '500', cursor: 'pointer',
                }}
              >{tip === 0 ? 'No' : `${tip}%`}</button>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div style={{
          background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
          borderRadius: '16px', padding: '16px', marginBottom: '20px',
        }}>
          {[
            { label: 'Subtotale', value: subtotal },
            ...(discountAmount > 0 ? [{ label: `Sconto (${appliedPromo?.discount}%)`, value: -discountAmount }] : []),
            { label: 'Consegna', value: delivery },
            ...(tipAmount > 0 ? [{ label: `Mancia (${tipPercent}%)`, value: tipAmount }] : []),
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ color: COLORS.textSecondary }}>{row.label}</span>
              <span style={{ color: row.value < 0 ? COLORS.success : COLORS.textPrimary, fontWeight: '600' }}>
                {row.value < 0 ? '−' : ''}€{Math.abs(row.value).toFixed(2)}
              </span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '800', fontSize: '16px', color: COLORS.textPrimary }}>Totale</span>
            <span style={{ fontWeight: '800', fontSize: '20px', color: COLORS.primary }}>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        maxWidth: '430px', width: '100%',
        background: COLORS.navBg, borderTop: `1px solid ${COLORS.border}`,
        padding: '14px 16px 24px',
      }}>
        <button
          onClick={() => setOrderPlaced(true)}
          style={{
            width: '100%', background: COLORS.gradientCTA,
            border: 'none', borderRadius: '16px',
            padding: '16px', fontSize: '16px', fontWeight: '800',
            color: COLORS.badgeText, cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <span>🏮 Conferma ordine</span>
          <span>€{total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
