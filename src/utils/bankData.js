
// src/utils/bankData.js



export const billProviders = {

  "بجلی": [

    { id: 'e1', shortName: 'LESCO', name: 'Lahore Electric', logo: '/assets/lesco.png', routingCode: '7001' },

    { id: 'e2', shortName: 'KE', name: 'K-Electric', logo: '/assets/ke.png', routingCode: '7002' },

    { id: 'e3', shortName: 'IESCO', name: 'Islamabad Electric', logo: '/assets/iesco.png', routingCode: '7003' },

    { id: 'e4', shortName: 'MEPCO', name: 'Multan Electric', logo: '/assets/mepco.png', routingCode: '7004' },

    { id: 'e5', shortName: 'FESCO', name: 'Faisalabad Electric', logo: '/assets/logo.png', routingCode: '7005' },

    { id: 'e6', shortName: 'PESCO', name: 'Peshawar Electric', logo: '/assets/logo.png', routingCode: '7006' },

    { id: 'e7', shortName: 'GEPCO', name: 'Gujranwala Electric', logo: '/assets/logo.png', routingCode: '7007' },

    { id: 'e8', shortName: 'HESCO', name: 'Hyderabad Electric', logo: '/assets/logo.png', routingCode: '7008' },

    { id: 'e9', shortName: 'SEPCO', name: 'Sukkur Electric', logo: '/assets/logo.png', routingCode: '7009' },

    { id: 'e10', shortName: 'QESCO', name: 'Quetta Electric', logo: '/assets/logo.png', routingCode: '7110' }

  ],

  "گیس": [

    { id: 'g1', shortName: 'SNGPL', name: 'Sui Northern Gas', logo: '/assets/sngpl.png', routingCode: '8001' },

    { id: 'g2', shortName: 'SSGC', name: 'Sui Southern Gas', logo: '/assets/ssgc.png', routingCode: '8002' }

  ],

  "پانی": [

    { id: 'w1', shortName: 'WASA LHR', name: 'Wasa Lahore', logo: '/assets/wasa lahore.png', routingCode: '9001' },

    { id: 'w2', shortName: 'WASA KHI', name: 'KWSC Karachi', logo: '/assets/logo.png', routingCode: '9002' },

    { id: 'w3', shortName: 'WASA ISB', name: 'Wasa Islamabad', logo: '/assets/logo.png', routingCode: '9003' },

    { id: 'w4', shortName: 'WASA MUX', name: 'Wasa Multan', logo: '/assets/wasa multan.png', routingCode: '9004' },

    { id: 'w5', shortName: 'WASA FSD', name: 'Wasa Faisalabad', logo: '/assets/logo.png', routingCode: '9005' }

  ],

  "انٹرنیٹ": [

    { id: 'i1', shortName: 'STORM', name: 'StormFiber', logo: '/assets/transworld.png', routingCode: '6001' },

    { id: 'i2', shortName: 'NAYATEL', name: 'Nayatel', logo: '/assets/nayatel.png', routingCode: '6002' },

    { id: 'i3', shortName: 'OPTIX', name: 'Optix', logo: '/assets/optix.jpg', routingCode: '6003' }

  ],

  "ٹیلی فون": [

    { id: 't1', shortName: 'PTCL', name: 'PTCL', logo: '/assets/ptcl.png', routingCode: '5001' },

    { id: 't2', shortName: 'JAZZ', name: 'Jazz Postpaid', logo: '/assets/jazz.png', routingCode: '5002' },

    { id: 't3', shortName: 'TELENOR', name: 'Telenor Postpaid', logo: '/assets/telenor.png', routingCode: '5003' },

    { id: 't4', shortName: 'ZONG', name: 'Zong Postpaid', logo: '/assets/zong.png', routingCode: '5004' },

    { id: 't5', shortName: 'UFONE', name: 'Ufone Postpaid', logo: '/assets/ufone.png', routingCode: '5005' },

    { id: 't6', shortName: 'SCO', name: 'SCO', logo: '/assets/logo.png', routingCode: '5006' }

  ]

};



export const banks = [

  { id: 'b1', name: 'EasyPaisa', shortName: 'EP', logo: '/assets/easypaysa.png', gateway: 'MNET' },

  { id: 'b2', name: 'JazzCash', shortName: 'JC', logo: '/assets/jazzcash.png', gateway: 'MNET' },

  { id: 'b3', name: 'SadaPay', shortName: 'SADA', logo: '/assets/sadapay.png', gateway: '1LINK' },

  { id: 'b4', name: 'NayaPay', shortName: 'NAYA', logo: '/assets/nayapay.png', gateway: '1LINK' },

  { id: 'b5', name: 'UPaisa', shortName: 'UP', logo: '/assets/upaisa.jpg', gateway: 'MNET' },

  { id: 'b6', name: 'HBL', shortName: 'HBL', logo: '/assets/hbl.png', gateway: '1LINK' },

  { id: 'b7', name: 'MCB Bank', shortName: 'MCB', logo: '/assets/mcb.png', gateway: '1LINK' },

  { id: 'b8', name: 'National Bank', shortName: 'NBP', logo: '/assets/nbp.JPG', gateway: '1LINK' },

  { id: 'b9', name: 'Bank of Punjab', shortName: 'BOP', logo: '/assets/bop.jpg', gateway: '1LINK' },

  { id: 'b10', name: 'UBL', shortName: 'UBL', logo: '/assets/ubl.png', gateway: '1LINK' },

  { id: 'b11', name: 'Allied Bank', shortName: 'ABL', logo: '/assets/abl.jpg', gateway: '1LINK' },

  { id: 'b12', name: 'Meezan Bank', shortName: 'MEEZAN', logo: '/assets/meezan.png', gateway: '1LINK' },

  { id: 'b13', name: 'BankIslami', shortName: 'BISL', logo: '/assets/bank Islami.jpg', gateway: '1LINK' },

  { id: 'b14', name: 'Al Baraka', shortName: 'ALBARAKA', logo: '/assets/AL baraka.jpg', gateway: '1LINK' },

  { id: 'b15', name: 'Dubai Islamic', shortName: 'DIB', logo: '/assets/Dubai Islamic Bank.jpg', gateway: '1LINK' },

  { id: 'b16', name: 'Bank Alfalah', shortName: 'ALF', logo: '/assets/alfalah.png', gateway: '1LINK' },

  { id: 'b17', name: 'Faysal Bank', shortName: 'FAYSAL', logo: '/assets/Faisal bank.jpg', gateway: '1LINK' },

  { id: 'b18', name: 'Askari Bank', shortName: 'ASK', logo: '/assets/askari.jpg', gateway: '1LINK' },

  { id: 'b19', name: 'Bank Al Habib', shortName: 'BAHL', logo: '/assets/AL Habeeb.jpg', gateway: '1LINK' },

  { id: 'b20', name: 'Standard Chartered', shortName: 'SC', logo: '/assets/stendurd charterd.png', gateway: '1LINK' },

  { id: 'b21', name: 'Soneri Bank', shortName: 'SNB', logo: '/assets/soneri.jpg', gateway: '1LINK' },

  { id: 'b22', name: 'Habib Metro', shortName: 'HMB', logo: '/assets/Habeeb metro.jpg', gateway: '1LINK' },

  { id: 'b23', name: 'JS Bank', shortName: 'JS', logo: '/assets/Js bank.jpg', gateway: '1LINK' },

  { id: 'b24', name: 'Summit Bank', shortName: 'SUM', logo: '/assets/Sumit bank.jpg', gateway: '1LINK' },

  { id: 'b25', name: 'Sindh Bank', shortName: 'SND', logo: '/assets/Sindh Bank.jpg', gateway: '1LINK' },

  { id: 'b26', name: 'Bank of Khyber', shortName: 'BOK', logo: '/assets/Bank of Khyber.jpg', gateway: '1LINK' },

  { id: 'b27', name: 'Samba Bank', shortName: 'SMBA', logo: '/assets/logo.png', gateway: '1LINK' },

  { id: 'b28', name: 'Silkbank', shortName: 'SILK', logo: '/assets/silk bank.jpg', gateway: '1LINK' },

  { id: 'b29', name: 'Telenor Bank', shortName: 'TEL', logo: '/assets/telenor.png', gateway: 'MNET' },

  { id: 'b30', name: 'Jazz Bank', shortName: 'JAZZB', logo: '/assets/Jazz bank.jpg', gateway: 'MNET' },

  { id: 'b31', name: 'U Bank', shortName: 'UBANK', logo: '/assets/ubank.jpg', gateway: '1LINK' },

  { id: 'b32', name: 'NRSP Bank', shortName: 'NRSP', logo: '/assets/nrsp.jpg', gateway: '1LINK' },

  { id: 'b33', name: 'FINCA', shortName: 'FIN', logo: '/assets/logo.png', gateway: '1LINK' },

  { id: 'b34', name: 'Khushhali Bank', shortName: 'KHL', logo: '/assets/khushhal.jpg', gateway: '1LINK' },

  { id: 'b35', name: 'First Microfinance', shortName: 'FMFB', logo: '/assets/logo.png', gateway: '1LINK' },

  { id: 'b36', name: 'Apna Bank', shortName: 'APNA', logo: '/assets/logo.png', gateway: '1LINK' },

  { id: 'b37', name: 'Advans Bank', shortName: 'ADV', logo: '/assets/logo.png', gateway: '1LINK' },

  { id: 'b38', name: 'ICBC', shortName: 'ICBC', logo: '/assets/logo.png', gateway: '1LINK' },

  { id: 'b39', name: 'Bank of China', shortName: 'BOC', logo: '/assets/bank of China.jpg', gateway: '1LINK' },

  { id: 'b40', name: 'ZTBL', shortName: 'ZTBL', logo: '/assets/logo.png', gateway: '1LINK' }

];

