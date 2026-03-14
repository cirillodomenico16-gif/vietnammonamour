import { useState } from 'react';
import { COLORS, FONTS } from '../config/theme';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ORDERS = [
  { id: '#VN-2847', date: '10 Mar 2025', items: 'Phở Bò Đặc Biệt, Gỏi Cuốn Tôm', total: '€22.50', status: 'Consegnato', statusColor: COLORS.success },
  { id: '#VN-2841', date: '5 Mar 2025', items: 'Bánh Mì Thịt Nướng, Cà Phê Sữa Đá', total: '€14.00', status: 'Consegnato', statusColor: COLORS.success },
  { id: '#VN-2835', date: '28 Feb 2025', items: 'Bún Bò Đặc Biệt, Sinh Tố Xoài', total: '€19.50', status: 'Consegnato', statusColor: COLORS.success },
];

const ACHIEVEMENTS = [
  { icon: '🍜', label: 'Amante del Phở', desc: '10 Phở ordinati', earned: true },
  { icon: '⭐', label: 'Cliente VIP', desc: '20+ ordini', earned: true },
  { icon: '🔥', label: 'Fan del Piccante', desc: '5 piatti speziati', earned: false },
  { icon: '🎯', label: 'Esploratore', desc: 'Tutte le categorie', earned: false },
];

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'ordini' | 'premi' | 'impostazioni'>('ordini');

  const tabStyle = (tab: typeof activeTab) => ({
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    background: activeTab === tab ? COLORS.gradient : 'transparent',
    color: activeTab === tab ? '#fff' : COLORS.textMuted,
    fontSize: '13px',
    fontWeight: '700' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── HEADER CARD ──────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(160deg, #8B0000 0%, #1A0500 60%)`,
        padding: '40px 20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,215,0,0.06)' }} />
        <div style={{ position: 'absolute', top: 10, right: 40, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,215,0,0.04)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: COLORS.gradient,
            border: `3px solid ${COLORS.secondary}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', flexShrink: 0,
          }}>🍜</div>

          <div>
            <div style={{ color: COLORS.textPrimary, fontSize: '20px', fontWeight: '800', fontFamily: FONTS.title }}>
              Marco Rossi
            </div>
            <div style={{ color: COLORS.textSecondary, fontSize: '13px', marginTop: '2px' }}>
              marco.rossi@email.com
            </div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,215,0,0.15)',
              border: `1px solid rgba(255,215,0,0.4)`,
              borderRadius: '20px',
              padding: '3px 10px',
              color: COLORS.secondary,
              fontSize: '11px',
              fontWeight: '700',
              marginTop: '6px',
            }}>⭐ Cliente VIP</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'Ordini', value: '23' },
            { label: 'Punti', value: '460' },
            { label: 'Risparmio', value: '€18' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '12px',
              padding: '10px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ color: COLORS.secondary, fontSize: '18px', fontWeight: '800' }}>{value}</div>
              <div style={{ color: COLORS.textMuted, fontSize: '11px', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* ── LOYALTY PROGRESS ──────────────────────────────────────── */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: '16px',
          border: `1px solid ${COLORS.border}`,
          padding: '14px 16px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '700' }}>
              🏆 Livello: VIP Gold
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: '11px' }}>460 / 600 pt → Elite</div>
          </div>
          <div style={{ background: COLORS.border, borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{
              width: '76%',
              height: '100%',
              background: COLORS.gradientGold,
              borderRadius: '10px',
            }} />
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: '11px', marginTop: '6px', textAlign: 'center' }}>
            140 punti per raggiungere Elite ✨
          </div>
        </div>

        {/* ── TABS ──────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          background: COLORS.cardBg,
          borderRadius: '14px',
          border: `1px solid ${COLORS.border}`,
          padding: '4px',
          marginBottom: '16px',
          gap: '4px',
        }}>
          <button style={tabStyle('ordini')} onClick={() => setActiveTab('ordini')}>📦 Ordini</button>
          <button style={tabStyle('premi')} onClick={() => setActiveTab('premi')}>🎖️ Premi</button>
          <button style={tabStyle('impostazioni')} onClick={() => setActiveTab('impostazioni')}>⚙️ Info</button>
        </div>

        {/* ── ORDINI TAB ─────────────────────────────────────────────── */}
        {activeTab === 'ordini' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ORDERS.map(order => (
              <div key={order.id} style={{
                background: COLORS.cardBg,
                borderRadius: '14px',
                border: `1px solid ${COLORS.border}`,
                padding: '14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '700' }}>{order.id}</div>
                    <div style={{ color: COLORS.textMuted, fontSize: '11px', marginTop: '2px' }}>{order.date}</div>
                  </div>
                  <div style={{
                    background: `${order.statusColor}22`,
                    border: `1px solid ${order.statusColor}55`,
                    borderRadius: '20px',
                    padding: '4px 10px',
                    color: order.statusColor,
                    fontSize: '11px',
                    fontWeight: '700',
                  }}>{order.status}</div>
                </div>
                <div style={{ color: COLORS.textSecondary, fontSize: '12px', marginBottom: '8px' }}>{order.items}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: COLORS.secondary, fontSize: '14px', fontWeight: '700' }}>{order.total}</div>
                  <button
                    onClick={() => onNavigate('menu')}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${COLORS.primary}`,
                      borderRadius: '10px',
                      padding: '6px 14px',
                      color: COLORS.primary,
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >Riordina</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PREMI TAB ──────────────────────────────────────────────── */}
        {activeTab === 'premi' && (
          <div>
            {/* Promo code banner */}
            <div style={{
              background: 'linear-gradient(135deg, #8B0000, #CC9900)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              <div style={{ color: '#fff', fontSize: '13px', marginBottom: '6px' }}>Il tuo codice sconto personale</div>
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                padding: '10px 20px',
                color: COLORS.secondary,
                fontSize: '20px',
                fontWeight: '800',
                letterSpacing: '2px',
                display: 'inline-block',
              }}>MARCO10</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '6px' }}>10% di sconto sul prossimo ordine</div>
            </div>

            {/* Achievements grid */}
            <div style={{ color: COLORS.textPrimary, fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>🎖️ Traguardi</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {ACHIEVEMENTS.map(a => (
                <div key={a.label} style={{
                  background: COLORS.cardBg,
                  borderRadius: '14px',
                  border: `1px solid ${a.earned ? COLORS.secondary + '44' : COLORS.border}`,
                  padding: '14px',
                  opacity: a.earned ? 1 : 0.5,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>{a.icon}</div>
                  <div style={{ color: a.earned ? COLORS.textPrimary : COLORS.textMuted, fontSize: '12px', fontWeight: '700' }}>{a.label}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: '10px', marginTop: '3px' }}>{a.desc}</div>
                  {a.earned && <div style={{ color: COLORS.secondary, fontSize: '10px', marginTop: '4px' }}>✓ Conquistato</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── IMPOSTAZIONI TAB ──────────────────────────────────────── */}
        {activeTab === 'impostazioni' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '📍', label: 'Indirizzo di consegna', value: 'Via Roma 42, Milano' },
              { icon: '📞', label: 'Telefono', value: '+39 331 456 7890' },
              { icon: '🔔', label: 'Notifiche ordini', value: 'Attive' },
              { icon: '🌶️', label: 'Livello piccante preferito', value: '🔥 Medio' },
            ].map(item => (
              <div key={item.label} style={{
                background: COLORS.cardBg,
                borderRadius: '14px',
                border: `1px solid ${COLORS.border}`,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{ fontSize: '20px' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: COLORS.textMuted, fontSize: '11px' }}>{item.label}</div>
                  <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>{item.value}</div>
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: '18px' }}>›</div>
              </div>
            ))}

            {/* Restaurant info */}
            <div style={{
              background: COLORS.cardBg,
              borderRadius: '14px',
              border: `1px solid ${COLORS.border}`,
              padding: '16px',
              marginTop: '6px',
            }}>
              <div style={{ color: COLORS.textPrimary, fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>🍜 Vietnamour</div>
              {[
                { label: 'Indirizzo', value: 'Via Garibaldi 88, Milano' },
                { label: 'Orari', value: 'Lun–Dom 11:30–22:30' },
                { label: 'Telefono', value: '+39 02 1234 5678' },
                { label: 'Consegna', value: '20–25 min · €2.50' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: COLORS.textMuted, fontSize: '12px' }}>{row.label}</span>
                  <span style={{ color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
