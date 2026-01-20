import { cn } from '@/lib/utils';

interface ProbabilityBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ProbabilityBadge({ score, size = 'md' }: ProbabilityBadgeProps) {
  const getScoreStyle = (score: number) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold",
        getScoreStyle(score),
        size === 'sm' && "h-7 w-10 text-xs",
        size === 'md' && "h-9 w-12 text-sm",
        size === 'lg' && "h-12 w-16 text-base"
      )}
    >
      {score}
    </div>
  );
}
