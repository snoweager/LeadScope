import { Lead } from '@/types/lead';
import { cn } from '@/lib/utils';

interface ScoreBreakdownProps {
  lead: Lead;
}

const scoreCategories = [
  { key: 'scientificIntent', label: 'Scientific Intent', max: 40, color: 'bg-emerald-500' },
  { key: 'roleFit', label: 'Role Fit', max: 30, color: 'bg-blue-500' },
  { key: 'companyIntent', label: 'Company Intent', max: 20, color: 'bg-purple-500' },
  { key: 'technographic', label: 'Technographic', max: 15, color: 'bg-amber-500' },
  { key: 'location', label: 'Location', max: 10, color: 'bg-pink-500' },
] as const;

export function ScoreBreakdown({ lead }: ScoreBreakdownProps) {
  return (
    <div className="space-y-3">
      {scoreCategories.map((cat) => {
        const score = lead.scoreBreakdown[cat.key as keyof typeof lead.scoreBreakdown];
        const percentage = (score / cat.max) * 100;
        
        return (
          <div key={cat.key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{cat.label}</span>
              <span className="font-medium">{score}/{cat.max}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all", cat.color)}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
