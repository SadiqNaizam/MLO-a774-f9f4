import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export type QuestionRelevance = 'Relevant' | 'Non-Relevant' | null;

interface TagControlsProps {
  questionIdSuffix: string; 
  currentRelevance: QuestionRelevance;
  onRelevanceChange: (newRelevance: 'Relevant' | 'Non-Relevant') => void;
  className?: string;
}

const TagControls: React.FC<TagControlsProps> = ({
  questionIdSuffix,
  currentRelevance,
  onRelevanceChange,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-end", className)}> 
      {/* Relevant Checkbox */}
      <div className="flex justify-center w-20">
        <Checkbox
          id={`relevant-${questionIdSuffix}`}
          checked={currentRelevance === 'Relevant'}
          onCheckedChange={(checked) => {
            if (checked === true) onRelevanceChange('Relevant');
          }}
          className="w-6 h-6 border-2 border-border data-[state=checked]:bg-accentTeal data-[state=checked]:text-primary-foreground data-[state=checked]:border-accentTeal rounded-sm"
          aria-label="Relevant"
        />
      </div>
      {/* Non-Relevant Checkbox */}
      <div className="flex justify-center w-24">
        <Checkbox
          id={`non-relevant-${questionIdSuffix}`}
          checked={currentRelevance === 'Non-Relevant'}
          onCheckedChange={(checked) => {
            if (checked === true) onRelevanceChange('Non-Relevant');
          }}
          className="w-6 h-6 border-2 border-border data-[state=checked]:bg-accentTeal data-[state=checked]:text-primary-foreground data-[state=checked]:border-accentTeal rounded-sm"
          aria-label="Non-Relevant"
        />
      </div>
    </div>
  );
};

export default TagControls;
