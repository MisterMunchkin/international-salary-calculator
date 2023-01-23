export interface Symbols {
  motd: MOTD;
  success: boolean;
  symbols: { [key: string]: Symbol };
}

export interface Symbol {
  description: string;
  code: string;
}

export interface MOTD {
  msg: string;
  url: string;
}
