import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TezroInvoice = ({ orderData }) => {
    const invoiceRef = useRef();

    // 📥 PDF ڈاؤن لوڈ کرنے کا فنکشن
    const downloadPDF = () => {
        const element = invoiceRef.current;
        html2canvas(element, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Tezro_Invoice_${orderData.id}.pdf`);
        });
    };

    // 🖼️ JPG (Image) ڈاؤن لوڈ کرنے کا فنکشن
    const downloadJPG = () => {
        const element = invoiceRef.current;
        html2canvas(element).then((canvas) => {
            const link = document.createElement('a');
            link.download = `Tezro_Label_${orderData.id}.jpg`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <div className="p-4 bg-[#050505] min-h-screen">
            {/* اصلی رسید جو پرنٹ ہوگی */}
            <div 
                ref={invoiceRef} 
                className="w-[380px] mx-auto bg-white text-black p-6 rounded-sm shadow-2xl font-sans"
                style={{ border: '2px dashed #ccc' }} // قینچی سے کاٹنے کا نشان
            >
                {/* ہیڈر: لوگو اور آرڈر آئی ڈی */}
                <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter">TEZRO <span className="text-[#D4AF37]">.</span></h1>
                        <p className="text-[9px] uppercase font-bold text-gray-500">Official Secure Receipt</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold">Order ID: #{orderData.id.slice(-8)}</p>
                        <p className="text-[8px]">{new Date().toLocaleString()}</p>
                    </div>
                </div>

                {/* درمیانی حصہ: آئٹمز کی تفصیل */}
                <div className="mb-6">
                    <table className="w-full text-[10px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-2">Item Description</th>
                                <th className="text-right">Qty</th>
                                <th className="text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.items.map(item => (
                                <tr key={item.id} className="border-b border-gray-50">
                                    <td className="py-2 font-medium">{item.title}</td>
                                    <td className="text-right">{item.quantity}</td>
                                    <td className="text-right">Rs. {item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <p className="text-sm font-black">Total Paid: PKR {orderData.total}</p>
                    </div>
                </div>

                {/* 📦 شپنگ لیبل سیکشن (یہی پارسل پر لگے گا) */}
                <div className="mt-8 pt-6 border-t-2 border-dashed border-black bg-gray-50 p-4 relative">
                    <span className="absolute -top-3 left-4 bg-white px-2 text-[8px] font-bold border border-black">SHIPMENT LABEL</span>
                    
                    <div className="flex justify-between">
                        <div className="space-y-2">
                            <div>
                                <p className="text-[8px] font-bold text-gray-500 uppercase">From (Sender):</p>
                                <p className="text-[10px] font-bold">{orderData.vendorName}</p>
                                <p className="text-[8px]">{orderData.vendorAddress}</p>
                            </div>
                            <div className="pt-2">
                                <p className="text-[8px] font-bold text-gray-500 uppercase">To (Receiver):</p>
                                <p className="text-[12px] font-black">{orderData.userName}</p>
                                <p className="text-[10px]">{orderData.shippingAddress}</p>
                                <p className="text-[10px] font-bold">📞 {orderData.userPhone}</p>
                            </div>
                        </div>
                        
                        {/* QR Code Placeholder (پارسل ٹریکنگ کے لیے) */}
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white border border-black flex items-center justify-center p-1">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderData.id}`} alt="QR" />
                            </div>
                            <p className="text-[8px] mt-1 font-bold">SCAN TO VERIFY</p>
                        </div>
                    </div>
                </div>

                {/* فوٹر */}
                <p className="text-center text-[7px] mt-6 uppercase tracking-widest text-gray-400">
                    Generated by Tezro Vault • Secure Logistics Protocol
                </p>
            </div>

            {/* کنٹرول بٹنز (ایپ میں نظر آئیں گے، پرنٹ میں نہیں) */}
            <div className="mt-8 flex gap-4 justify-center">
                <button onClick={downloadPDF} className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-black text-xs uppercase shadow-lg">
                    Download PDF
                </button>
                <button onClick={downloadJPG} className="bg-white/10 text-white px-6 py-3 rounded-xl font-black text-xs uppercase border border-white/10">
                    Save as Image (JPG)
                </button>
            </div>
        </div>
    );
};

export default TezroInvoice;
