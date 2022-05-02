export interface ICoin {
  id: string;
  baseSymbol: string;
  ticker: ITicker;
}

export interface ITicker {
  lastPrice: string;
}
