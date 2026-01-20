export interface Lead {
  id: string;
  rank: number;
  probability: number;
  name: string;
  title: string;
  company: string;
  personLocation: string;
  companyHQ: string;
  email: string;
  phone?: string;
  linkedInUrl: string;
  source: 'linkedin' | 'pubmed' | 'conference' | 'funding' | 'grants';
  
  // Scoring breakdown
  scoreBreakdown: {
    roleFit: number;
    companyIntent: number;
    technographic: number;
    location: number;
    scientificIntent: number;
  };
  
  // Additional metadata
  recentPublication?: string;
  fundingStatus?: string;
  conferencePresence?: string;
  lastActivity?: string;
}

export interface LeadFilter {
  search: string;
  source: string[];
  minScore: number;
  location: string;
  company: string;
}

export interface ScoringCriteria {
  id: string;
  category: string;
  criteria: string;
  weight: number;
  maxScore: number;
}
