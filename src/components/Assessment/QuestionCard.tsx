import React from 'react';
import { cn } from '@/lib/utils';
import TagControlsComponent, { QuestionRelevance as QuestionRelevanceType } from './TagControls';

export interface Question {
  id: string;
  number: string;
  text: string;
  context: string;
  relevance: QuestionRelevanceType;
}

interface QuestionCardProps {
  question: Question;
  onRelevanceChange: (questionId: string, newRelevance: 'Relevant' | 'Non-Relevant') => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onRelevanceChange }) => {
  const handleInternalRelevanceChange = (newRelevance: 'Relevant' | 'Non-Relevant') => {
    onRelevanceChange(question.id, newRelevance);
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 py-4 border-b border-border last:border-b-0">
      {/* Column 1: Question Number */}
      <div className="pt-0.5">
        <span className="text-2xl font-bold text-accentOrange">{question.number}</span>
      </div>

      {/* Column 2: Question Text and Context */}
      <div className="pl-1">
        <p className="text-base font-medium text-foreground">{question.text}</p>
        {question.context && (
          <p className="mt-1 text-sm text-muted-foreground">{question.context}</p>
        )}
      </div>

      {/* Column 3: TagControls */}
      <div className="pt-1">
        <TagControlsComponent
          questionIdSuffix={question.id}
          currentRelevance={question.relevance}
          onRelevanceChange={handleInternalRelevanceChange}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
