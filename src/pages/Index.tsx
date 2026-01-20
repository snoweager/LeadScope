import { useState, useMemo } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { LeadTable } from '@/components/dashboard/LeadTable';
import { SearchFilters } from '@/components/dashboard/SearchFilters';
import { ScoringCriteriaPanel } from '@/components/dashboard/ScoringCriteriaPanel';
import { mockLeads } from '@/data/mockLeads';
import { Users, Target, TrendingUp, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface FilterState {
  sources: string[];
  minScore: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ sources: [], minScore: 0 });

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          lead.name.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query) ||
          lead.title.toLowerCase().includes(query) ||
          lead.personLocation.toLowerCase().includes(query) ||
          lead.companyHQ.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Source filter
      if (filters.sources.length > 0 && !filters.sources.includes(lead.source)) {
        return false;
      }

      // Score filter
      if (lead.probability < filters.minScore) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const stats = useMemo(() => {
    const highProbability = mockLeads.filter(l => l.probability >= 80).length;
    const avgScore = Math.round(mockLeads.reduce((sum, l) => sum + l.probability, 0) / mockLeads.length);
    
    return {
      totalLeads: mockLeads.length,
      highProbability,
      avgScore,
      newThisWeek: 24,
    };
  }, []);

  const handleExport = () => {
    // Create CSV content
    const headers = ['Rank', 'Score', 'Name', 'Title', 'Company', 'Location', 'HQ', 'Email', 'Source'];
    const rows = filteredLeads.map(lead => [
      lead.rank,
      lead.probability,
      lead.name,
      lead.title,
      lead.company,
      lead.personLocation,
      lead.companyHQ,
      lead.email,
      lead.source
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(`Exported ${filteredLeads.length} leads to CSV`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-8">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Lead Intelligence Dashboard</h1>
              <p className="text-sm text-muted-foreground">3D In-Vitro Models • Therapy Development</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Last sync:</span>
              <span className="text-sm font-medium">2 hours ago</span>
              <div className="ml-2 h-2 w-2 rounded-full bg-score-high animate-pulse-subtle" />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Leads"
              value={stats.totalLeads}
              change="+24 this week"
              changeType="positive"
              icon={Users}
              iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            />
            <StatsCard
              title="High Probability (80+)"
              value={stats.highProbability}
              change={`${Math.round((stats.highProbability / stats.totalLeads) * 100)}% of total`}
              changeType="neutral"
              icon={Target}
              iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
            />
            <StatsCard
              title="Average Score"
              value={stats.avgScore}
              change="+5 from last month"
              changeType="positive"
              icon={TrendingUp}
              iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            />
            <StatsCard
              title="New This Week"
              value={stats.newThisWeek}
              change="From 5 sources"
              changeType="neutral"
              icon={Zap}
              iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
            {/* Lead Table Section */}
            <div className="xl:col-span-3 space-y-6">
              <SearchFilters 
                onSearch={setSearchQuery}
                onFilterChange={setFilters}
                onExport={handleExport}
              />
              
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Qualified Leads
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({filteredLeads.length} results)
                    </span>
                  </h2>
                </div>
                <LeadTable leads={filteredLeads} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScoringCriteriaPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
