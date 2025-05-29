import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ScreenerNotesProps {
  initialNotes?: string;
  onNotesChange?: (notes: string) => void;
  className?: string;
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({
  initialNotes = "",
  onNotesChange,
  className,
}) => {
  const [notes, setNotes] = useState<string>(initialNotes);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(newNotes);
    }
  }, [onNotesChange]);

  return (
    <div className={cn("py-4 space-y-3", className)}>
      <Label htmlFor="screener-notes-textarea" className="text-base font-semibold text-foreground">
        Screener Notes / Comments:
      </Label>
      <Textarea
        id="screener-notes-textarea"
        value={notes}
        onChange={handleChange}
        placeholder="Enter feedback and observations here..."
        className="min-h-[120px] w-full bg-background border-border focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-ring rounded-md p-3"
        rows={5} 
      />
    </div>
  );
};

export default ScreenerNotes;
