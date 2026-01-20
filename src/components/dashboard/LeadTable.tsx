import { useState } from 'react';
import { Lead } from '@/types/lead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProbabilityBadge } from './ProbabilityBadge';
import { ScoreBreakdown } from './ScoreBreakdown';
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadTableProps {
  leads: Lead[];
}

const sourceLabels: Record<Lead['source'], string> = {
  linkedin: 'LinkedIn',
  pubmed: 'PubMed',
  conference: 'Conference',
  funding: 'Funding',
  grants: 'Grants',
};

export function LeadTable({ leads }: LeadTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Lead
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Company
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <>
                <tr 
                  key={lead.id}
                  className={cn(
                    "transition-colors hover:bg-muted/30",
                    expandedRow === lead.id && "bg-muted/30"
                  )}
                >
                  <td className="px-4 py-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {lead.rank}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <ProbabilityBadge score={lead.probability} />
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.company}</p>
                      {lead.fundingStatus && (
                        <p className="text-xs text-muted-foreground">{lead.fundingStatus}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{lead.personLocation}</span>
                      </div>
                      {lead.personLocation !== lead.companyHQ && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          <span>HQ: {lead.companyHQ}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={lead.source}>
                      {sourceLabels[lead.source]}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={`mailto:${lead.email}`} title="Send email">
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                      {lead.phone && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <a href={`tel:${lead.phone}`} title="Call">
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={lead.linkedInUrl} target="_blank" rel="noopener noreferrer" title="View LinkedIn">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setExpandedRow(expandedRow === lead.id ? null : lead.id)}
                      >
                        {expandedRow === lead.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedRow === lead.id && (
                  <tr key={`${lead.id}-expanded`}>
                    <td colSpan={7} className="bg-muted/20 px-4 py-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-foreground">Score Breakdown</h4>
                          <ScoreBreakdown lead={lead} />
                        </div>
                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-foreground">Contact Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                                {lead.email}
                              </a>
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-foreground">Intelligence</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            {lead.recentPublication && (
                              <p>📄 {lead.recentPublication}</p>
                            )}
                            {lead.conferencePresence && (
                              <p>🎤 {lead.conferencePresence}</p>
                            )}
                            {lead.lastActivity && (
                              <p>🕐 Last activity: {lead.lastActivity}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
