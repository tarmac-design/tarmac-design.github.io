// ============================================================
// TARMAC Design System — Color Data (from Figma)
// ============================================================

export type Shade = { s: string; h: string };
export type ColorFamily = { name: string; shades: Shade[] };

// --- Brand / Accent Colors (13 shades each: 15→950) ---
export const brandAccentColors: ColorFamily[] = [
  { name: 'Red (Velocity Red)', shades: [
    {s:'15',h:'#FEF1F3'},{s:'25',h:'#FDE8EB'},{s:'50',h:'#FBD1D7'},{s:'100',h:'#F9B3BC'},{s:'200',h:'#F68D9A'},{s:'300',h:'#F36779'},{s:'400',h:'#F04158'},{s:'500',h:'#ED1B36'},{s:'600',h:'#C5172D'},{s:'700',h:'#9E1224'},{s:'800',h:'#770E1B'},{s:'900',h:'#4F0912'},{s:'950',h:'#2F050B'},
  ]},
  { name: 'Blue (Atlantic Blue)', shades: [
    {s:'15',h:'#F0F8FF'},{s:'25',h:'#E6F3FE'},{s:'50',h:'#D3EAFE'},{s:'100',h:'#B6DCFE'},{s:'200',h:'#91CAFD'},{s:'300',h:'#6CB9FC'},{s:'400',h:'#48A7FC'},{s:'500',h:'#2396FB'},{s:'600',h:'#1D7DD1'},{s:'700',h:'#1764A7'},{s:'800',h:'#124B7E'},{s:'900',h:'#0C3254'},{s:'950',h:'#071E32'},
  ]},
  { name: 'Green (Kinetic Green)', shades: [
    {s:'15',h:'#F4FBF8'},{s:'25',h:'#ECF8F3'},{s:'50',h:'#D1EEE2'},{s:'100',h:'#B3E2CF'},{s:'200',h:'#8DD3B6'},{s:'300',h:'#67C59E'},{s:'400',h:'#41B686'},{s:'500',h:'#1BA86E'},{s:'600',h:'#178C5C'},{s:'700',h:'#127049'},{s:'800',h:'#0E5437'},{s:'900',h:'#093825'},{s:'950',h:'#052216'},
  ]},
  { name: 'Cyan', shades: [
    {s:'15',h:'#F3FAFC'},{s:'25',h:'#EBF7FA'},{s:'50',h:'#CCECF2'},{s:'100',h:'#AAE0E9'},{s:'200',h:'#80D0DE'},{s:'300',h:'#55C1D3'},{s:'400',h:'#2BB1C8'},{s:'500',h:'#00A2BD'},{s:'600',h:'#00879D'},{s:'700',h:'#006C7E'},{s:'800',h:'#00515F'},{s:'900',h:'#00363F'},{s:'950',h:'#002026'},
  ]},
  { name: 'Yellow', shades: [
    {s:'15',h:'#FCFAF2'},{s:'25',h:'#FBF7EA'},{s:'50',h:'#F5ECCC'},{s:'100',h:'#EFDFAB'},{s:'200',h:'#E7CF80'},{s:'300',h:'#DFBF56'},{s:'400',h:'#D7AF2C'},{s:'500',h:'#CF9F02'},{s:'600',h:'#AC8402'},{s:'700',h:'#8A6A01'},{s:'800',h:'#685001'},{s:'900',h:'#453501'},{s:'950',h:'#292000'},
  ]},
  { name: 'Crimson', shades: [
    {s:'15',h:'#FDF2F4'},{s:'25',h:'#FCE9ED'},{s:'50',h:'#F8D0D8'},{s:'100',h:'#F3B1BE'},{s:'200',h:'#ED899D'},{s:'300',h:'#E8627D'},{s:'400',h:'#E23B5D'},{s:'500',h:'#DC143C'},{s:'600',h:'#B71132'},{s:'700',h:'#930D28'},{s:'800',h:'#6E0A1E'},{s:'900',h:'#490714'},{s:'950',h:'#2C040C'},
  ]},
  { name: 'Cardbox', shades: [
    {s:'15',h:'#FAF8F4'},{s:'25',h:'#F7F3ED'},{s:'50',h:'#F1E8DE'},{s:'100',h:'#E7D8C9'},{s:'200',h:'#DBC5AD'},{s:'300',h:'#D0B292'},{s:'400',h:'#C49E77'},{s:'500',h:'#B88B5C'},{s:'600',h:'#99744D'},{s:'700',h:'#7B5D3D'},{s:'800',h:'#5C462E'},{s:'900',h:'#3D2E1F'},{s:'950',h:'#292000'},
  ]},
  { name: 'Orange', shades: [
    {s:'15',h:'#FDF5F1'},{s:'25',h:'#FCEFE8'},{s:'50',h:'#FAE3D7'},{s:'100',h:'#F7D0BC'},{s:'200',h:'#F3B99B'},{s:'300',h:'#EFA27A'},{s:'400',h:'#EB8A58'},{s:'500',h:'#E77337'},{s:'600',h:'#C0602E'},{s:'700',h:'#9A4D25'},{s:'800',h:'#743A1C'},{s:'900',h:'#4D2612'},{s:'950',h:'#2E170B'},
  ]},
  { name: 'Purple', shades: [
    {s:'15',h:'#F6F1FE'},{s:'25',h:'#F0E8FD'},{s:'50',h:'#E5D8FB'},{s:'100',h:'#D3BDF9'},{s:'200',h:'#BD9CF6'},{s:'300',h:'#A87CF3'},{s:'400',h:'#925BF0'},{s:'500',h:'#7C3AED'},{s:'600',h:'#6730C5'},{s:'700',h:'#53279E'},{s:'800',h:'#3E1D77'},{s:'900',h:'#29134F'},{s:'950',h:'#190C2F'},
  ]},
  { name: 'Pink', shades: [
    {s:'15',h:'#FDF2F7'},{s:'25',h:'#F9DCE9'},{s:'50',h:'#F9DCE9'},{s:'100',h:'#F5C5DB'},{s:'200',h:'#F0A8C8'},{s:'300',h:'#EC8CB6'},{s:'400',h:'#E76FA4'},{s:'500',h:'#E25292'},{s:'600',h:'#BC447A'},{s:'700',h:'#973761'},{s:'800',h:'#712949'},{s:'900',h:'#4B1B31'},{s:'950',h:'#2D101D'},
  ]},
];

// --- Neutral Colors (11 shades each: 25→500) ---
export const neutralColors: ColorFamily[] = [
  { name: 'Black (Tar Black)', shades: [
    {s:'25',h:'#454545'},{s:'50',h:'#404040'},{s:'100',h:'#3B3B3B'},{s:'150',h:'#333333'},{s:'200',h:'#2B2B2B'},{s:'250',h:'#262626'},{s:'300',h:'#212121'},{s:'350',h:'#1A1A1A'},{s:'400',h:'#121212'},{s:'450',h:'#0D0D0D'},{s:'500',h:'#000000'},
  ]},
  { name: 'White (Optic White)', shades: [
    {s:'25',h:'#BFBFBF'},{s:'50',h:'#C4C4C4'},{s:'100',h:'#CCCCCC'},{s:'150',h:'#D4D4D4'},{s:'200',h:'#D9D9D9'},{s:'250',h:'#DEDEDE'},{s:'300',h:'#E6E6E6'},{s:'350',h:'#EDEDED'},{s:'400',h:'#F2F2F2'},{s:'450',h:'#F7F7F7'},{s:'500',h:'#FFFFFF'},
  ]},
  { name: 'Grey (Cargo Grey)', shades: [
    {s:'25',h:'#E6E5E5'},{s:'50',h:'#D9D8D8'},{s:'100',h:'#CDCBCB'},{s:'150',h:'#C0BFBF'},{s:'200',h:'#B3B2B2'},{s:'250',h:'#A6A5A5'},{s:'300',h:'#999999'},{s:'350',h:'#8C8C8C'},{s:'400',h:'#808080'},{s:'450',h:'#737373'},{s:'500',h:'#666666'},
  ]},
  { name: 'Charcoal (Coal)', shades: [
    {s:'25',h:'#C2C6D6'},{s:'50',h:'#B2B8CC'},{s:'100',h:'#A3AAC2'},{s:'150',h:'#949CB8'},{s:'200',h:'#848EAE'},{s:'250',h:'#7580A3'},{s:'300',h:'#667199'},{s:'350',h:'#5C668A'},{s:'400',h:'#515B7B'},{s:'450',h:'#474F6B'},{s:'500',h:'#3D445C'},
  ]},
];

// --- Alpha Colors ---
export type AlphaColor = { name: string; hex: string; opacities: string[] };
export const alphaColors: AlphaColor[] = [
  { name: 'Alpha Black', hex: '#000000', opacities: ['5%','10%','20%','40%','60%','80%'] },
  { name: 'Alpha White', hex: '#FFFFFF', opacities: ['5%','10%','20%','40%','60%','80%'] },
  { name: 'Alpha Red', hex: '#ED1B36', opacities: ['5%','10%','20%','40%','60%','80%'] },
  { name: 'Alpha Green', hex: '#1BA86E', opacities: ['5%','10%','20%','40%','60%','80%'] },
  { name: 'Alpha Blue', hex: '#2396FB', opacities: ['5%','10%','20%','40%','60%','80%'] },
  { name: 'Alpha Yellow', hex: '#CF9F02', opacities: ['5%','10%','20%','40%','60%','80%'] },
];

// --- Semantic Surface Tokens ---
export type SemanticToken = { level: string; ref: string };
export type SemanticGroup = { token: string; light: SemanticToken[]; dark: SemanticToken[] };

export const surfaceTokens: SemanticGroup[] = [
  { token: 'surface.background', light: [
    {level:'Default',ref:'White.500'},{level:'Strongest',ref:'White.450'},{level:'Stronger',ref:'White.400'},{level:'Strong',ref:'White.350'},{level:'Solid',ref:'White.300'},{level:'Base',ref:'White.250'},{level:'Medium',ref:'White.200'},{level:'Subtle',ref:'White.150'},{level:'Weak',ref:'White.100'},{level:'Weaker',ref:'White.50'},{level:'Weakest',ref:'White.25'},
  ], dark: [
    {level:'Default',ref:'Black.500'},{level:'Strongest',ref:'Black.450'},{level:'Stronger',ref:'Black.400'},{level:'Strong',ref:'Black.350'},{level:'Solid',ref:'Black.300'},{level:'Base',ref:'Black.250'},{level:'Medium',ref:'Black.200'},{level:'Subtle',ref:'Black.150'},{level:'Weak',ref:'Black.100'},{level:'Weaker',ref:'Black.50'},{level:'Weakest',ref:'Black.25'},
  ]},
  { token: 'surface.neutral', light: [
    {level:'Default',ref:'Grey.500'},{level:'Strongest',ref:'Grey.450'},{level:'Stronger',ref:'Grey.400'},{level:'Strong',ref:'Grey.350'},{level:'Solid',ref:'Grey.300'},{level:'Base',ref:'Grey.250'},{level:'Medium',ref:'Grey.200'},{level:'Subtle',ref:'Grey.150'},{level:'Weak',ref:'Grey.100'},{level:'Weaker',ref:'Grey.50'},{level:'Weakest',ref:'Grey.25'},
  ], dark: [
    {level:'Default',ref:'Coal.500'},{level:'Strongest',ref:'Coal.450'},{level:'Stronger',ref:'Coal.400'},{level:'Strong',ref:'Coal.350'},{level:'Solid',ref:'Coal.300'},{level:'Base',ref:'Coal.250'},{level:'Medium',ref:'Coal.200'},{level:'Subtle',ref:'Coal.150'},{level:'Weak',ref:'Coal.100'},{level:'Weaker',ref:'Coal.50'},{level:'Weakest',ref:'Coal.25'},
  ]},
  { token: 'surface.accent', light: [
    {level:'Default',ref:'Red.500'},{level:'Strongest',ref:'Red.600'},{level:'Stronger',ref:'Red.700'},{level:'Base',ref:'Red.300'},{level:'Medium',ref:'Red.200'},{level:'Subtle',ref:'Red.100'},{level:'Weak',ref:'Red.50'},{level:'Weaker',ref:'Red.25'},{level:'Weakest',ref:'Red.15'},
  ], dark: [
    {level:'Default',ref:'Red.600'},{level:'Strongest',ref:'Red.500'},{level:'Stronger',ref:'Red.400'},{level:'Base',ref:'Red.300'},{level:'Medium',ref:'Red.600'},{level:'Subtle',ref:'Red.700'},{level:'Weak',ref:'Red.800'},{level:'Weaker',ref:'Red.900'},{level:'Weakest',ref:'Red.950'},
  ]},
  { token: 'surface.info', light: [
    {level:'Default',ref:'Blue.500'},{level:'Strongest',ref:'Blue.600'},{level:'Stronger',ref:'Blue.700'},{level:'Base',ref:'Blue.300'},{level:'Medium',ref:'Blue.200'},{level:'Subtle',ref:'Blue.100'},{level:'Weak',ref:'Blue.50'},{level:'Weaker',ref:'Blue.25'},{level:'Weakest',ref:'Blue.15'},
  ], dark: [
    {level:'Default',ref:'Blue.600'},{level:'Strongest',ref:'Blue.500'},{level:'Stronger',ref:'Blue.400'},{level:'Base',ref:'Blue.300'},{level:'Medium',ref:'Blue.600'},{level:'Subtle',ref:'Blue.700'},{level:'Weak',ref:'Blue.800'},{level:'Weaker',ref:'Blue.900'},{level:'Weakest',ref:'Blue.950'},
  ]},
  { token: 'surface.success', light: [
    {level:'Default',ref:'Green.500'},{level:'Strongest',ref:'Green.600'},{level:'Stronger',ref:'Green.700'},{level:'Base',ref:'Green.300'},{level:'Medium',ref:'Green.200'},{level:'Subtle',ref:'Green.100'},{level:'Weak',ref:'Green.50'},{level:'Weaker',ref:'Green.25'},{level:'Weakest',ref:'Green.15'},
  ], dark: [
    {level:'Default',ref:'Green.600'},{level:'Strongest',ref:'Green.500'},{level:'Stronger',ref:'Green.400'},{level:'Base',ref:'Green.300'},{level:'Medium',ref:'Green.600'},{level:'Subtle',ref:'Green.700'},{level:'Weak',ref:'Green.800'},{level:'Weaker',ref:'Green.900'},{level:'Weakest',ref:'Green.950'},
  ]},
  { token: 'surface.error', light: [
    {level:'Default',ref:'Crimson.500'},{level:'Strongest',ref:'Crimson.600'},{level:'Stronger',ref:'Crimson.700'},{level:'Base',ref:'Crimson.300'},{level:'Medium',ref:'Crimson.200'},{level:'Subtle',ref:'Crimson.100'},{level:'Weak',ref:'Crimson.50'},{level:'Weaker',ref:'Crimson.25'},{level:'Weakest',ref:'Crimson.15'},
  ], dark: [
    {level:'Default',ref:'Crimson.600'},{level:'Strongest',ref:'Crimson.500'},{level:'Stronger',ref:'Crimson.400'},{level:'Base',ref:'Crimson.300'},{level:'Medium',ref:'Crimson.600'},{level:'Subtle',ref:'Crimson.700'},{level:'Weak',ref:'Crimson.800'},{level:'Weaker',ref:'Crimson.900'},{level:'Weakest',ref:'Crimson.950'},
  ]},
  { token: 'surface.warning', light: [
    {level:'Default',ref:'Yellow.500'},{level:'Strongest',ref:'Yellow.600'},{level:'Stronger',ref:'Yellow.700'},{level:'Base',ref:'Yellow.300'},{level:'Medium',ref:'Yellow.200'},{level:'Subtle',ref:'Yellow.100'},{level:'Weak',ref:'Yellow.50'},{level:'Weaker',ref:'Yellow.25'},{level:'Weakest',ref:'Yellow.15'},
  ], dark: [
    {level:'Default',ref:'Yellow.600'},{level:'Strongest',ref:'Yellow.500'},{level:'Stronger',ref:'Yellow.400'},{level:'Base',ref:'Yellow.300'},{level:'Medium',ref:'Yellow.600'},{level:'Subtle',ref:'Yellow.700'},{level:'Weak',ref:'Yellow.800'},{level:'Weaker',ref:'Yellow.900'},{level:'Weakest',ref:'Yellow.950'},
  ]},
];

// --- Semantic Text Tokens ---
export type TextToken = { token: string; light: SemanticToken[]; dark: SemanticToken[] };
export const textTokens: TextToken[] = [
  { token: 'text.heading', light: [
    {level:'Disabled',ref:'Grey.100'},{level:'Base',ref:'Grey.500'},{level:'Primary',ref:'Black.400'},{level:'Secondary',ref:'Black.300'},{level:'Tertiary',ref:'Black.200'},
  ], dark: [
    {level:'Disabled',ref:'Black.100'},{level:'Base',ref:'Grey.200'},{level:'Primary',ref:'White.400'},{level:'Secondary',ref:'White.300'},{level:'Tertiary',ref:'White.200'},
  ]},
  { token: 'text.body', light: [
    {level:'Disabled',ref:'Grey.100'},{level:'Base',ref:'Grey.450'},{level:'Primary',ref:'Black.400'},{level:'Secondary',ref:'Black.100'},{level:'Tertiary',ref:'Black.50'},
  ], dark: [
    {level:'Disabled',ref:'Black.100'},{level:'Base',ref:'Grey.350'},{level:'Primary',ref:'White.300'},{level:'Secondary',ref:'White.200'},{level:'Tertiary',ref:'White.100'},
  ]},
  { token: 'text.info', light: [
    {level:'Disabled',ref:'Blue.200'},{level:'Base',ref:'Blue.300'},{level:'Primary',ref:'Blue.500'},{level:'Secondary',ref:'Blue.600'},{level:'Tertiary',ref:'Blue.700'},
  ], dark: [
    {level:'Disabled',ref:'Blue.700'},{level:'Base',ref:'Blue.600'},{level:'Primary',ref:'Blue.500'},{level:'Secondary',ref:'Blue.400'},{level:'Tertiary',ref:'Blue.300'},
  ]},
  { token: 'text.error', light: [
    {level:'Disabled',ref:'Crimson.200'},{level:'Base',ref:'Crimson.300'},{level:'Primary',ref:'Crimson.500'},{level:'Secondary',ref:'Crimson.600'},{level:'Tertiary',ref:'Crimson.700'},
  ], dark: [
    {level:'Disabled',ref:'Crimson.700'},{level:'Base',ref:'Crimson.600'},{level:'Primary',ref:'Crimson.500'},{level:'Secondary',ref:'Crimson.400'},{level:'Tertiary',ref:'Crimson.300'},
  ]},
  { token: 'text.success', light: [
    {level:'Disabled',ref:'Green.200'},{level:'Base',ref:'Green.300'},{level:'Primary',ref:'Green.500'},{level:'Secondary',ref:'Green.600'},{level:'Tertiary',ref:'Green.700'},
  ], dark: [
    {level:'Disabled',ref:'Green.700'},{level:'Base',ref:'Green.600'},{level:'Primary',ref:'Green.500'},{level:'Secondary',ref:'Green.400'},{level:'Tertiary',ref:'Green.300'},
  ]},
  { token: 'text.warning', light: [
    {level:'Disabled',ref:'Yellow.200'},{level:'Base',ref:'Yellow.300'},{level:'Primary',ref:'Yellow.500'},{level:'Secondary',ref:'Yellow.600'},{level:'Tertiary',ref:'Yellow.700'},
  ], dark: [
    {level:'Disabled',ref:'Yellow.700'},{level:'Base',ref:'Yellow.600'},{level:'Primary',ref:'Yellow.500'},{level:'Secondary',ref:'Yellow.400'},{level:'Tertiary',ref:'Yellow.300'},
  ]},
  { token: 'text.accent', light: [
    {level:'Disabled',ref:'Red.200'},{level:'Base',ref:'Red.300'},{level:'Primary',ref:'Red.500'},{level:'Secondary',ref:'Red.600'},{level:'Tertiary',ref:'Red.700'},
  ], dark: [
    {level:'Disabled',ref:'Red.200'},{level:'Base',ref:'Red.300'},{level:'Primary',ref:'Red.500'},{level:'Secondary',ref:'Red.600'},{level:'Tertiary',ref:'Red.700'},
  ]},
];

// --- Border Tokens ---
export const borderTokens: TextToken[] = [
  { token: 'border.neutral', light: [
    {level:'Disabled',ref:'White.450'},{level:'Primary',ref:'White.300'},{level:'Secondary',ref:'White.200'},{level:'Tertiary',ref:'White.100'},
  ], dark: [
    {level:'Disabled',ref:'Black.300'},{level:'Primary',ref:'Black.200'},{level:'Secondary',ref:'Black.100'},{level:'Tertiary',ref:'Black.25'},
  ]},
  { token: 'border.info', light: [
    {level:'Disabled',ref:'Blue.15'},{level:'Base',ref:'Blue.200'},{level:'Primary',ref:'Blue.400'},{level:'Secondary',ref:'Blue.500'},{level:'Tertiary',ref:'Blue.700'},
  ], dark: [
    {level:'Disabled',ref:'Blue.950'},{level:'Base',ref:'Blue.500'},{level:'Primary',ref:'Blue.400'},{level:'Secondary',ref:'Blue.300'},{level:'Tertiary',ref:'Blue.200'},
  ]},
  { token: 'border.success', light: [
    {level:'Disabled',ref:'Green.15'},{level:'Base',ref:'Green.200'},{level:'Primary',ref:'Green.400'},{level:'Secondary',ref:'Green.500'},{level:'Tertiary',ref:'Green.700'},
  ], dark: [
    {level:'Disabled',ref:'Green.950'},{level:'Base',ref:'Green.500'},{level:'Primary',ref:'Green.400'},{level:'Secondary',ref:'Green.300'},{level:'Tertiary',ref:'Green.200'},
  ]},
  { token: 'border.error', light: [
    {level:'Disabled',ref:'Red.15'},{level:'Base',ref:'Red.200'},{level:'Primary',ref:'Red.400'},{level:'Secondary',ref:'Red.500'},{level:'Tertiary',ref:'Red.700'},
  ], dark: [
    {level:'Disabled',ref:'Red.950'},{level:'Base',ref:'Red.500'},{level:'Primary',ref:'Red.400'},{level:'Secondary',ref:'Red.300'},{level:'Tertiary',ref:'Red.200'},
  ]},
  { token: 'border.warning', light: [
    {level:'Disabled',ref:'Yellow.15'},{level:'Base',ref:'Yellow.200'},{level:'Primary',ref:'Yellow.400'},{level:'Secondary',ref:'Yellow.500'},{level:'Tertiary',ref:'Yellow.700'},
  ], dark: [
    {level:'Disabled',ref:'Yellow.950'},{level:'Base',ref:'Yellow.500'},{level:'Primary',ref:'Yellow.400'},{level:'Secondary',ref:'Yellow.300'},{level:'Tertiary',ref:'Yellow.200'},
  ]},
];
