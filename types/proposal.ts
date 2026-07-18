export interface Proposal {
  customerName: string;
  projectSummary: string;
  scope: string[];
  price: string;
  timeline: string;
}


export interface Contractor {
  name: string;
  phone: string;
  email: string;
}


interface QuotePreviewProps {
  proposal: Proposal;
  contractor: Contractor;
}