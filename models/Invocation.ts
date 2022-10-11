export interface Invocation {
  name: string;
  details: string;
  category: string;
  modifier: number;
  active?: boolean;
  dependencies?: string[];
}