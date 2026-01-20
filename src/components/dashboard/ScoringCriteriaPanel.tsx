import { scoringCriteria } from '@/data/mockLeads';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  'Role Fit': 'bg-blue-500',
  'Company Intent': 'bg-purple-500',
  'Technographic': 'bg-amber-500',
  'NAMs Openness': 'bg-pink-500',
  'Location': 'bg-rose-500',
  'Scientific Intent': 'bg-emerald-500',
};

export function ScoringCriteriaPanel() {
  const totalWeight = scoringCriteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">Propensity to Buy Score</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Leads are scored 0-{totalWeight} based on weighted signals that indicate likelihood to adopt 3D in-vitro models.
      </p>

      <div className="space-y-4">
        {scoringCriteria.map((criterion) => (
          <div key={criterion.id} className="flex items-start gap-3">
            <div 
              className={cn(
                "mt-1 h-3 w-3 rounded-full flex-shrink-0",
                categoryColors[criterion.category] || 'bg-gray-400'
              )} 
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{criterion.category}</span>
                <span className="text-sm font-semibold text-primary">+{criterion.weight}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {criterion.criteria}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">Maximum Score</span>
          <span className="text-lg font-bold text-foreground">{totalWeight}</span>
        </div>
      </div>
    </div>
  );
}
