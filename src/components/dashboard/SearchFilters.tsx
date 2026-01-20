import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onExport: () => void;
}

interface FilterState {
  sources: string[];
  minScore: number;
}

const sourceOptions = [
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'pubmed', label: 'PubMed' },
  { id: 'conference', label: 'Conferences' },
  { id: 'funding', label: 'Funding' },
  { id: 'grants', label: 'Grants' },
];

export function SearchFilters({ onSearch, onFilterChange, onExport }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sources: [],
    minScore: 0,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const toggleSource = (sourceId: string) => {
    const newSources = filters.sources.includes(sourceId)
      ? filters.sources.filter(s => s !== sourceId)
      : [...filters.sources, sourceId];
    
    const newFilters = { ...filters, sources: newSources };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { sources: [], minScore: 0 };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFiltersCount = filters.sources.length + (filters.minScore > 0 ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, company, location..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && "bg-accent")}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Filter Leads</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-1 h-3 w-3" />
                Clear all
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Source Filter */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Data Sources
              </label>
              <div className="flex flex-wrap gap-2">
                {sourceOptions.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      filters.sources.includes(source.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Filter */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Minimum Score: {filters.minScore}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minScore}
                onChange={(e) => {
                  const newFilters = { ...filters, minScore: Number(e.target.value) };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-full max-w-xs accent-primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
