import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { verifyAndExecute } from '../firebase/voiceAuth';
import { CommandResolver } from '../utils/CommandResolver';
import SuperSearchBar from './SuperSearchBar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [adminClicks, setAdminClicks] = useState(0);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState("");
    
    const { user, logout, verifyAdminKeys } = useAuth();
    const { theme } = useTheme(); 
    const navigate = useNavigate();
    const location = useLocation();

    // لوگو کا درست پاتھ (Public فولڈر کے لیے)
    const TezroLogo = "/assists/logo.png"; 

    const startUniversalVoice = async () => {
        setIsVoiceActive(true);
        setVoiceStatus("TEZRO IS LISTENING...");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            let chunks = [];
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                const auth = await verifyAndExecute(audioBlob, user?.voiceSignature);
                if (auth.authorized) {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();
                    recognition.lang = user?.preferredLang || 'ur-PK';
                    recognition.onresult = async (event) => {
                        const transcript = event.results[0][0].transcript;
                        setVoiceStatus(`EXECUTING: ${transcript}`);
                        const result = await CommandResolver.execute(audioBlob, transcript, user?.voiceSignature);
                        if (result.success) {
                            if (result.action === 'BOOK_RIDE') navigate('/ride');
                            if (result.action === 'CHECK_BALANCE') navigate('/banking');
                        }
                        setTimeout(() => setIsVoiceActive(false), 2000);
                    };
                    recognition.start();
                } else {
                    setVoiceStatus("❌ VOICE MISMATCH!");
                    setTimeout(() => setIsVoiceActive(false), 2000);
                }
            };
            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 3000); 
        } catch (err) {
            setVoiceStatus("MIC ERROR!");
            setIsVoiceActive(false);
        }
    };

    const handleSecretClick = async () => {
        const newCount = adminClicks + 1;
        setAdminClicks(newCount);
        if (newCount === 15) {
            setAdminClicks(0);
            const secretKey = prompt("🔒 ENTER ADMIN KEY:");
            if (secretKey) {
                const isAuthorized = await verifyAdminKeys(secretKey);
                if (isAuthorized) navigate('/admin');
            }
        }
    };

    return (
        <div style={{ background: '#050505', minHeight: '100vh', color: 'white', position: 'relative', overflow: 'hidden' }}>
            
            {/* Sidebar */}
            <div style={{
                position: 'fixed', top: 0, left: isSidebarOpen ? 0 : '-300px',
                width: '300px', height: '100%', background: '#0a0a0a',
                zIndex: 3000, transition: '0.3s ease', padding: '30px',
                borderRight: '1px solid rgba(212,175,55,0.2)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <img src={user?.photo || "https://via.placeholder.com/80"} style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #D4AF37' }} alt="u" />
                    <h4 style={{ color: '#D4AF37', marginTop: '15px' }}>{user?.name || "REHMAN"}</h4>
                </div>
                <button onClick={() => {navigate('/'); setSidebarOpen(false)}} style={styles.navBtn}>🏠 Dashboard</button>
                <button onClick={() => {navigate('/banking'); setSidebarOpen(false)}} style={styles.navBtn}>💳 Tezro Vault</button>
                <button onClick={logout} style={{ ...styles.navBtn, color: '#ff4444', marginTop: '50px' }}>Terminate Session</button>
            </div>

            {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} style={styles.backdrop} />}

            {/* Voice Overlay */}
            {isVoiceActive && (
                <div style={styles.voiceOverlay}>
                    <div style={styles.micCircle}>🎤</div>
                    <h3 style={{ color: '#D4AF37' }}>{voiceStatus}</h3>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <header style={styles.header}>
                    <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>☰</button>
                    <div style={{ position: 'relative' }}>
                        {/* لوگو یہاں لوڈ ہوگا */}
                        <img src={TezroLogo} style={{ height: '30px' }} alt="Tezro" onError={(e) => {e.target.style.display='none'}} />
                        <span onClick={handleSecretClick} style={styles.secretBtn}>®</span>
                    </div>
                    <div onClick={() => navigate('/profile')} style={styles.profileBox}>
                        <img src={user?.photo || "https://via.placeholder.com/40"} style={{ width: '100%' }} alt="p" />
                    </div>
                </header>

                <main style={{ flex: 1, overflowY: 'auto' }}>
                    {location.pathname === '/' && <div style={{ padding: '0 20px' }}><SuperSearchBar /></div>}
                    {children}
                </main>

                <footer style={styles.footer}>
                    <button onClick={() => navigate('/')} style={{ ...styles.footBtn, color: location.pathname === '/' ? '#D4AF37' : '#555' }}>🏠</button>
                    <button onClick={() => navigate('/banking')} style={{ ...styles.footBtn, color: location.pathname === '/banking' ? '#D4AF37' : '#555' }}>💳</button>
                    <div onClick={startUniversalVoice} style={styles.mainMic}>🎤</div>
                    <button onClick={() => navigate('/history')} style={{ ...styles.footBtn, color: location.pathname === '/history' ? '#D4AF37' : '#555' }}>🕒</button>
                    <button onClick={() => setSidebarOpen(true)} style={styles.footBtn}>👤</button>
                </footer>
            </div>
        </div>
    );
};

const styles = {
    header: { padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    navBtn: { width: '100%', padding: '15px', background: 'none', border: 'none', color: 'white', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' },
    backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2500 },
    voiceOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    micCircle: { width: '80px', height: '80px', background: '#D4AF37', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', marginBottom: '20px', boxShadow: '0 0 30px rgba(212,175,55,0.5)' },
    profileBox: { width: '35px', height: '35px', borderRadius: '10px', border: '1px solid #D4AF37', overflow: 'hidden' },
    footer: { padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' },
    footBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' },
    mainMic: { width: '60px', height: '60px', background: '#D4AF37', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', marginTop: '-45px', border: '5px solid #050505', color: '#000', cursor: 'pointer' },
    secretBtn: { position: 'absolute', top: '-5px', right: '-15px', fontSize: '8px', opacity: 0.2 }
};

export default Layout;
