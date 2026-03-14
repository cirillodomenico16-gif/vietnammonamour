import { useState } from 'react';
import { COLORS } from '../config/theme';
import type { CartItem } from '../App';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onNavigate: (page: string) => void;
}

export default function CartPage({ cart, onUpdateQuantity, onRemove, onNavigate }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedTip, setSelectedTip] = useState(15);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = 2.50;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tipAmount = (subtotal * selectedTip) / 100;
  const total = subtotal + delivery - discount + tipAmount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'VIETNAMOUR10') {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ background: COLORS.background, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>🛒</div>
        <div style={{ color: COLORS.textPrimary, fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Carrello vuoto</div>
        <div style={{ color: COLORS.textMuted, fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>Aggiungi qualcosa dal menu!</div>
        <button
          onClick={() => onNavigate('menu')}
          style={{
            background: COLORS.gradient, color: '#fff',
            border: 'none', borderRadius: '20px',
            padding: '14px 32px', fontSize: '15px', fontWeight: '700', cursor: 'pointer',
          }}
        >Vai al Menu 🍜</button>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div style={{ padding: '16px', borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ color: COLORS.textPrimary, fontSize: '20px', fontWeight: '800' }}>
          🛒 Il tuo Ordine
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '2px' }}>
          {cart.reduce((s, i) => s + i.quantity, 0)} articoli · Vietnamour
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* ── CART ITEMS ──────────────────────────────────────────── */}
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {cart.map(item => (
            <div key={`${item.id}-${item.size}`} style={{
              background: COLORS.cardBg,
              borderRadius: '16px',
              border: `1px solid ${COLORS.border}`,
              padding: '12px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}>
              <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '700', lineHeight: 1.3 }}>{item.name}</div>
                {item.size && <div style={{ color: COLORS.textMuted, fontSize: '11px', marginTop: '2px' }}>{item.size}</div>}
                {item.extras && item.extras.length > 0 && (
                  <div style={{ color: COLORS.textMuted, fontSize: '10px' }}>+{item.extras.join(', ')}</div>
                )}
                <div style={{ color: COLORS.secondary, fontSize: '14px', fontWeight: '700', marginTop: '4px' }}>€{(item.price * item.quantity).toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: COLORS.background, borderRadius: '12px', border: `1px solid ${COLORS.border}`, padding: '4px 8px' }}>
                  <button onClick={() => onUpdateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '16px', cursor: 'pointer', fontWeight: '700', lineHeight: 1 }}>−</button>
                  <span style={{ color: COLORS.textPrimary, fontSize: '14px', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: COLORS.primary, fontSize: '16px', cursor: 'pointer', fontWeight: '700', lineHeight: 1 }}>+</button>
                </div>
                <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: COLORS.textMuted, fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>Rimuovi</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── PROMO CODE ──────────────────────────────────────────── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: COLORS.textPrimary, fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>🎟️ Codice Promo</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Es. VIETNAMOUR10"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value.toUpperCase())}
              disabled={promoApplied}
              style={{
                flex: 1, background: COLORS.inputBg, border: `1px solid ${promoApplied ? COLORS.success : COLORS.border}`,
                borderRadius: '12px', padding: '12px 14px', color: COLORS.textPrimary,
                fontSize: '13px', outline: 'none',
              }}
            />
            <button
              onClick={handlePromo}
              disabled={promoApplied}
              style={{
                background: promoApplied ? COLORS.success : COLORS.gradient,
                color: '#fff', border: 'none', borderRadius: '12px',
                padding: '12px 18px', fontSize: '13px', fontWeight: '700', cursor: promoApplied ? 'default' : 'pointer',
                flexShrink: 0,
              }}
            >{promoApplied ? '✓ OK' : 'Applica'}</button>
          </div>
          {promoApplied && <div style={{ color: COLORS.success, fontSize: '12px', marginTop: '6px' }}>✓ Sconto 10% applicato!</div>}
        </div>

        {/* ── TIP ──────────────────────────────────────────────────── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: COLORS.textPrimary, fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>💝 Lascia una Mancia</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 10, 15, 20].map(pct => (
              <button
                key={pct}
                onClick={() => setSelectedTip(pct)}
                style={{
                  flex: 1,
                  padding: '10px 6px',
                  borderRadius: '12px',
                  border: `2px solid ${selectedTip === pct ? COLORS.primary : COLORS.border}`,
                  background: selectedTip === pct ? COLORS.gradient : COLORS.cardBg,
                  color: selectedTip === pct ? '#fff' : COLORS.textSecondary,
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                {pct === 0 ? 'Nessuna' : `${pct}%`}
                {pct > 0 && (
                  <div style={{ fontSize: '10px', marginTop: '2px', color: selectedTip === pct ? COLORS.secondary : COLORS.textMuted }}>
                    €{((subtotal * pct) / 100).toFixed(2)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── ORDER SUMMARY ────────────────────────────────────────── */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          border: `1px solid ${COLORS.border}`,
          padding: '16px',
          marginBottom: '20px',
        }}>
          <div style={{ color: COLORS.textPrimary, fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>📋 Riepilogo Ordine</div>
          {[
            { label: 'Subtotale', value: subtotal },
            { label: 'Consegna', value: delivery },
            ...(promoApplied ? [{ label: 'Sconto (10%)', value: -discount }] : []),
            ...(selectedTip > 0 ? [{ label: `Mancia (${selectedTip}%)`, value: tipAmount }] : []),
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: COLORS.textSecondary, fontSize: '13px' }}>{label}</span>
              <span style={{ color: value < 0 ? COLORS.success : COLORS.textPrimary, fontSize: '13px', fontWeight: '600' }}>
                {value < 0 ? '-' : ''}€{Math.abs(value).toFixed(2)}
              </span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: '10px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: COLORS.textPrimary, fontSize: '15px', fontWeight: '800' }}>Totale</span>
            <span style={{ color: COLORS.secondary, fontSize: '18px', fontWeight: '800' }}>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* ── CHECKOUT CTA ────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)',
        maxWidth: '430px', width: '100%', padding: '12px 16px',
        background: `linear-gradient(to top, ${COLORS.background} 80%, transparent)`,
      }}>
        <button style={{
          width: '100%', background: COLORS.gradient, color: '#fff',
          border: 'none', borderRadius: '20px', padding: '16px',
          fontSize: '16px', fontWeight: '800', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingLeft: '24px', paddingRight: '24px',
        }}>
          <span>🚀 Conferma Ordine</span>
          <span style={{ color: COLORS.secondary, fontSize: '18px' }}>€{total.toFixed(2)}</span>
        </button>
        <div style={{ color: COLORS.textMuted, fontSize: '11px', textAlign: 'center', marginTop: '6px' }}>
          🔒 Pagamento sicuro · 🛵 Consegna 20-25 min
        </div>
      </div>
    </div>
  );
}
