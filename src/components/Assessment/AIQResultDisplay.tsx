import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface AIQResultDisplayProps {
  level: AIQLevel;
  className?: string;
}

const AIQResultDisplay: React.FC<AIQResultDisplayProps> = ({ level, className }) => {
  const levels: { id: AIQLevel; label: string }[] = [
    { id: 'High' as const, label: 'High' },
    { id: 'Medium' as const, label: 'Medium' },
    { id: 'Low' as const, label: 'Low' },
  ];

  return (
    <div className={cn("py-4", className)}>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <h3 className="text-base font-semibold text-foreground">AIQ Level:</h3>
        {levels.map((item) => (
          <div key={item.id || 'none'} className="flex items-center space-x-2">
            <Checkbox
              id={`aiq-${item.label.toLowerCase()}`}
              checked={level === item.id}
              disabled
              className="w-5 h-5 border-border data-[state=checked]:bg-accentTeal data-[state=checked]:text-primary-foreground data-[state=checked]:border-accentTeal rounded-sm"
              aria-label={`${item.label} AIQ Level ${level === item.id ? 'selected' : 'not selected'}`}
            />
            <Label
              htmlFor={`aiq-${item.label.toLowerCase()}`}
              className={cn(
                "text-base cursor-default",
                level === item.id ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Label>
          </div>
        ))}
         <span className="text-sm text-muted-foreground">(Auto calculated using above inputs)</span>
      </div>
    </div>
  );
};

export default AIQResultDisplay;
