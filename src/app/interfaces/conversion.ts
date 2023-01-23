export interface Conversion {
  motd:       MOTD;
  success:    boolean;
  query:      Query;
  info:       Info;
  historical: boolean;
  date:       Date;
  result:     number;
}

export interface Info {
  rate: number;
}

export interface MOTD {
  msg: string;
  url: string;
}

export interface Query {
  from:   string;
  to:     string;
  amount: number;
}
