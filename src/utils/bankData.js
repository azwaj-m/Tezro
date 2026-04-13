// src/utils/bankData.js

export const billProviders = {
  "بجلی": [
    { id: 'e1', shortName: 'LESCO', name: 'Lahore Electric', logo: '/assets/lesco.png', routingCode: '7001', accountPrefix: 'LEC' },
    { id: 'e2', shortName: 'KE', name: 'K-Electric', logo: '/assets/ke.png', routingCode: '7002', accountPrefix: 'KEL' },
    { id: 'e3', shortName: 'IESCO', name: 'Islamabad Electric', logo: '/assets/iesco.png', routingCode: '7003', accountPrefix: 'IEC' },
    { id: 'e4', shortName: 'MEPCO', name: 'Multan Electric', logo: '/assets/mepco.png', routingCode: '7004', accountPrefix: 'MPC' },
    { id: 'e5', shortName: 'FESCO', name: 'Faisalabad Electric', logo: '/assets/fesco.png', routingCode: '7005', accountPrefix: 'FEC' },
    { id: 'e6', shortName: 'PESCO', name: 'Peshawar Electric', logo: '/assets/pesco.png', routingCode: '7006', accountPrefix: 'PEC' },
    { id: 'e7', shortName: 'GEPCO', name: 'Gujranwala Electric', logo: '/assets/gepco.png', routingCode: '7007', accountPrefix: 'GEC' },
    { id: 'e8', shortName: 'HESCO', name: 'Hyderabad Electric', logo: '/assets/hesco.png', routingCode: '7008', accountPrefix: 'HEC' },
    { id: 'e9', shortName: 'SEPCO', name: 'Sukkur Electric', logo: '/assets/sepco.png', routingCode: '7009', accountPrefix: 'SEC' },
    { id: 'e10', shortName: 'QESCO', name: 'Quetta Electric', logo: '/assets/qesco.png', routingCode: '7110', accountPrefix: 'QEC' }
  ],
  "گیس": [
    { id: 'g1', shortName: 'SNGPL', name: 'Sui Northern Gas', logo: '/assets/sngpl.png', routingCode: '8001', accountPrefix: 'SNG' },
    { id: 'g2', shortName: 'SSGC', name: 'Sui Southern Gas', logo: '/assets/ssgc.png', routingCode: '8002', accountPrefix: 'SSG' }
  ],
  "پانی": [
    { id: 'w1', shortName: 'WASA LHR', name: 'Wasa Lahore', logo: '/assets/wasa lahore.png', routingCode: '9001', accountPrefix: 'WLH' },
    { id: 'w2', shortName: 'WASA KHI', name: 'KWSC Karachi', logo: '/assets/wasa khi.png', routingCode: '9002', accountPrefix: 'WKH' },
    { id: 'w3', shortName: 'WASA ISB', name: 'Wasa Islamabad', logo: '/assets/wasa.png', routingCode: '9003', accountPrefix: 'WIS' },
    { id: 'w4', shortName: 'WASA MUX', name: 'Wasa Multan', logo: '/assets/wasa multan.png', routingCode: '9004', accountPrefix: 'WMU' },
    { id: 'w5', shortName: 'WASA FSD', name: 'Wasa Faisalabad', logo: '/assets/wasa.png', routingCode: '9005', accountPrefix: 'WFS' }
  ],
  "انٹرنیٹ": [
    { id: 'i1', shortName: 'STORM', name: 'StormFiber', logo: '/assets/transworld.png', routingCode: '6001', accountPrefix: 'STM' },
    { id: 'i2', shortName: 'NAYATEL', name: 'Nayatel', logo: '/assets/nayatel.png', routingCode: '6002', accountPrefix: 'NTL' },
    { id: 'i3', shortName: 'OPTIX', name: 'Optix', logo: '/assets/nayapay.png', routingCode: '6003', accountPrefix: 'OPT' }
  ],
  "ٹیلی فون": [
    { id: 't1', shortName: 'PTCL', name: 'PTCL', logo: '/assets/ptcl.png', routingCode: '5001', accountPrefix: 'PTC' },
    { id: 't2', shortName: 'JAZZ', name: 'Jazz Postpaid', logo: '/assets/jazz.png', routingCode: '5002', accountPrefix: 'JAZ' },
    { id: 't3', shortName: 'TELENOR', name: 'Telenor Postpaid', logo: '/assets/telenor.png', routingCode: '5003', accountPrefix: 'TEL' },
    { id: 't4', shortName: 'ZONG', name: 'Zong Postpaid', logo: '/assets/zong.png', routingCode: '5004', accountPrefix: 'ZNG' },
    { id: 't5', shortName: 'UFONE', name: 'Ufone Postpaid', logo: '/assets/ufone.png', routingCode: '5005', accountPrefix: 'UFN' },
    { id: 't6', shortName: 'SCO', name: 'SCO', logo: '/assets/logo.png', routingCode: '5006', accountPrefix: 'SCO' }
  ]
};

export const banks = [
  { id: 'b1', name: 'EasyPaisa', shortName: 'EP', logo: '/assets/easypaisa.png', routingCode: '0001', gateway: 'MNET' },
  { id: 'b2', name: 'JazzCash', shortName: 'JC', logo: '/assets/jazzcash.png', routingCode: '0002', gateway: 'MNET' },
  { id: 'b3', name: 'SadaPay', shortName: 'SADA', logo: '/assets/sadapay.png', routingCode: '0003', gateway: '1LINK' },
  { id: 'b4', name: 'NayaPay', shortName: 'NAYA', logo: '/assets/nayapay.png', routingCode: '0004', gateway: '1LINK' },
  { id: 'b5', name: 'UPaisa', shortName: 'UP', logo: '/assets/logo.png', routingCode: '0005', gateway: 'MNET' },
  { id: 'b6', name: 'HBL', shortName: 'HBL', logo: '/assets/hbl.png', routingCode: '0006', gateway: '1LINK' },
  { id: 'b7', name: 'MCB Bank', shortName: 'MCB', logo: '/assets/mcb.png', routingCode: '0007', gateway: '1LINK' },
  { id: 'b8', name: 'National Bank', shortName: 'NBP', logo: '/assets/nbp.png', routingCode: '0008', gateway: '1LINK' },
  { id: 'b9', name: 'Bank of Punjab', shortName: 'BOP', logo: '/assets/bop.png', routingCode: '0009', gateway: '1LINK' },
  { id: 'b10', name: 'UBL', shortName: 'UBL', logo: '/assets/ubl.png', routingCode: '0010', gateway: '1LINK' },
  { id: 'b11', name: 'Allied Bank', shortName: 'ABL', logo: '/assets/allied.png', routingCode: '0011', gateway: '1LINK' },
  { id: 'b12', name: 'Meezan Bank', shortName: 'MEEZAN', logo: '/assets/meezan.png', routingCode: '0012', gateway: '1LINK' },
  { id: 'b13', name: 'BankIslami', shortName: 'BISL', logo: '/assets/bubai Islami.png', routingCode: '0013', gateway: '1LINK' },
  { id: 'b14', name: 'Al Baraka', shortName: 'ALBARAKA', logo: '/assets/logo.png', routingCode: '0014', gateway: '1LINK' },
  { id: 'b15', name: 'Dubai Islamic', shortName: 'DIB', logo: '/assets/bubai Islami.png', routingCode: '0015', gateway: '1LINK' },
  { id: 'b16', name: 'Bank Alfalah', shortName: 'ALF', logo: '/assets/alfalah.png', routingCode: '0016', gateway: '1LINK' },
  { id: 'b17', name: 'Faysal Bank', shortName: 'FAYSAL', logo: '/assets/faisal bank.png', routingCode: '0017', gateway: '1LINK' },
  { id: 'b18', name: 'Askari Bank', shortName: 'ASK', logo: '/assets/logo.png', routingCode: '0018', gateway: '1LINK' },
  { id: 'b19', name: 'Bank Al Habib', shortName: 'BAHL', logo: '/assets/bank alhabeb.png', routingCode: '0019', gateway: '1LINK' },
  { id: 'b20', name: 'Standard Chartered', shortName: 'SC', logo: '/assets/stendurd charterd.png', routingCode: '0020', gateway: '1LINK' },
  { id: 'b21', name: 'Soneri Bank', shortName: 'SNB', logo: '/assets/logo.png', routingCode: '0021', gateway: '1LINK' },
  { id: 'b22', name: 'Habib Metro', shortName: 'HMB', logo: '/assets/logo.png', routingCode: '0022', gateway: '1LINK' },
  { id: 'b23', name: 'JS Bank', shortName: 'JS', logo: '/assets/logo.png', routingCode: '0023', gateway: '1LINK' },
  { id: 'b24', name: 'Summit Bank', shortName: 'SUM', logo: '/assets/logo.png', routingCode: '0024', gateway: '1LINK' },
  { id: 'b25', name: 'Sindh Bank', shortName: 'SND', logo: '/assets/logo.png', routingCode: '0025', gateway: '1LINK' },
  { id: 'b26', name: 'Bank of Khyber', shortName: 'BOK', logo: '/assets/bop.png', routingCode: '0026', gateway: '1LINK' },
  { id: 'b27', name: 'Samba Bank', shortName: 'SMBA', logo: '/assets/logo.png', routingCode: '0027', gateway: '1LINK' },
  { id: 'b28', name: 'Silkbank', shortName: 'SILK', logo: '/assets/logo.png', routingCode: '0028', gateway: '1LINK' },
  { id: 'b29', name: 'Telenor Bank', shortName: 'TEL', logo: '/assets/telenor.png', routingCode: '0029', gateway: 'MNET' },
  { id: 'b30', name: 'Mobilink Bank', shortName: 'MOB', logo: '/assets/logo.png', routingCode: '0030', gateway: 'MNET' },
  { id: 'b31', name: 'U Microfinance', shortName: 'UBANK', logo: '/assets/logo.png', routingCode: '0031', gateway: '1LINK' },
  { id: 'b32', name: 'NRSP Bank', shortName: 'NRSP', logo: '/assets/logo.png', routingCode: '0032', gateway: '1LINK' },
  { id: 'b33', name: 'FINCA', shortName: 'FIN', logo: '/assets/logo.png', routingCode: '0033', gateway: '1LINK' },
  { id: 'b34', name: 'Khushhali Bank', shortName: 'KHL', logo: '/assets/logo.png', routingCode: '0034', gateway: '1LINK' },
  { id: 'b35', name: 'First Microfinance', shortName: 'FMFB', logo: '/assets/logo.png', routingCode: '0035', gateway: '1LINK' },
  { id: 'b36', name: 'Apna Bank', shortName: 'APNA', logo: '/assets/logo.png', routingCode: '0036', gateway: '1LINK' },
  { id: 'b37', name: 'Advans Bank', shortName: 'ADV', logo: '/assets/logo.png', routingCode: '0037', gateway: '1LINK' },
  { id: 'b38', name: 'ICBC', shortName: 'ICBC', logo: '/assets/logo.png', routingCode: '0038', gateway: '1LINK' },
  { id: 'b39', name: 'Bank of China', shortName: 'BOC', logo: '/assets/logo.png', routingCode: '0039', gateway: '1LINK' },
  { id: 'b40', name: 'ZTBL', shortName: 'ZTBL', logo: '/assets/logo.png', routingCode: '0040', gateway: '1LINK' }
];
