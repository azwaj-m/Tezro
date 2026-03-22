import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useShopStats } from '../../hooks/useShopStats';
import { CommissionLogic } from '../../services/CommissionLogic';
import { SecurityEngine } from '../../utils/security/SecurityEngine';

const VendorPortal = () => {
    // تھیم اور ڈیٹا ہکس
    const theme = useTheme() || { bg: '#1A0F0A', border: '#D4AF37', text: '#F3E5AB' };
    const { stats, loading } = useShopStats();
    const [recentOrders, setOrders] = useState([]);

    useEffect(() => {
        if (stats?.activeOrders) {
            setOrders(stats.activeOrders);
        }
    }, [stats]);

    // پی ڈی ایف رپورٹ اور سیکیورٹی چیک
    const handleDownloadReport = () => {
        const auditRecord = SecurityEngine.generateAuditTrail(
            "VND-7860", 
            "REPORT_DOWNLOAD", 
            stats?.revenue || 0
        );
        console.log("Security Audit:", auditRecord);
        alert(`Tezro Business Report Generated\nRef: ${auditRecord.logId}\nStatus: ${auditRecord.integrity}`);
    };

    return (
        <div style={{ ...styles.page, background: theme.bg }}>
            {/* ہیڈر سیکشن */}
            <header style={styles.header}>
                <h2 style={{ color: theme.border, fontSize: '24px', fontWeight: '900' }}>Tezro Command Center</h2>
                <div style={styles.vendorBadge}>
                    <span style={{ color: theme.border }}>VND-7860</span>
                </div>
            </header>

            {/* مانیٹری کارڈز - وائرڈ ود کمیشن لاجک */}
            <div style={styles.grid}>
                <div style={styles.statCard}>
                    <p style={styles.label}>Total Gross Revenue</p>
                    <h3 style={{ color: theme.text }}>Rs. {stats?.revenue?.toLocaleString() || "0"}</h3>
                </div>

                <div style={styles.statCard}>
                    <p style={styles.label}>System Commission (10%)</p>
                    <h3 style={{ color: '#ff4d4d' }}>
                        - Rs. {CommissionLogic.calculate(stats?.revenue || 0).toLocaleString()}
                    </h3>
                </div>

                <div style={{ ...styles.statCard, background: `${theme.border}15`, border: `2px solid ${theme.border}` }}>
                    <p style={{ ...styles.label, color: theme.border, fontWeight: 'bold' }}>Net Payable Balance</p>
                    <h2 style={{ color: theme.border, fontSize: '28px' }}>
                        Rs. {(stats?.revenue - CommissionLogic.calculate(stats?.revenue || 0)).toLocaleString()}
                    </h2>
                </div>
            </div>

            {/* ایکشن بٹن */}
            <button 
                onClick={handleDownloadReport} 
                style={{ ...styles.mainBtn, borderColor: theme.border, color: theme.border }}
            >
                📄 Export Monthly Financial Statement
            </button>

            {/* لائیو ٹرانزیکشنز */}
            <div style={styles.orderSection}>
                <h4 style={{ color: theme.text, borderBottom: `1px solid ${theme.border}33`, paddingBottom: '12px' }}>
                    Live Orders & Transaction Logs
                </h4>
                {recentOrders.length > 0 ? recentOrders.map(order => (
                    <div key={order.id} style={styles.orderRow}>
                        <div style={{ flex: 1 }}>
                            <span style={{ color: '#fff', display: 'block', fontWeight: 'bold' }}>{order.customerName}</span>
                            <small style={{ color: '#888' }}>ID: {order.id.slice(-6)} | {new Date().toLocaleDateString()}</small>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ color: theme.border, fontWeight: 'bold' }}>Rs. {order.amount}</span>
                            <div style={{ ...styles.statusTag, color: order.status === 'Completed' ? '#00ff00' : '#ffa500' }}>
                                ● {order.status || 'Processing'}
                            </div>
                        </div>
                    </div>
                )) : (
                    <p style={{ color: '#666', textAlign: 'center', marginTop: '20px' }}>No active transactions found.</p>
                )}
            </div>

            <footer style={styles.footer}>
                <p>* All transactions are secured by Tezro Vault Encryption</p>
            </footer>
        </div>
    );
};

// پروفیشنل اسٹائلنگ آبجیکٹ
const styles = {
    page: { padding: '25px', paddingTop: '90px', minHeight: '100vh', fontFamily: 'system-ui' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    vendorBadge: { background: 'rgba(212, 175, 55, 0.1)', padding: '6px 15px', borderRadius: '30px', border: '1px solid rgba(212, 175, 55, 0.3)' },
    grid: { display: 'grid', gap: '15px', marginBottom: '25px' },
    statCard: { padding: '20px', borderRadius: '22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' },
    label: { margin: '0 0 8px 0', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#aaa' },
    mainBtn: { width: '100%', padding: '18px', borderRadius: '15px', background: 'transparent', border: '1px solid', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' },
    orderSection: { marginTop: '30px' },
    orderRow: { display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #222' },
    statusTag: { fontSize: '10px', marginTop: '4px', fontWeight: 'bold' },
    footer: { marginTop: '40px', textAlign: 'center', fontSize: '10px', color: '#555', fontStyle: 'italic' }
};

export default VendorPortal;
