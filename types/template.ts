export interface Template {
  id: string;
  title: string;
  category: 'Presentation' | 'Pitch Deck' | 'Proposal' | 'Contract';
  views: number;
  imageUrl: string;
  tags: ('PRO')[];
}
