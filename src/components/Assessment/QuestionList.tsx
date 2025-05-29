import React, { useState, useCallback, useEffect } from 'react';
import QuestionCard, { Question } from './QuestionCard';
import { QuestionRelevance as QuestionRelevanceType } from './TagControls'; // Import type

// Dummy Data based on the image
const initialQuestionsData: Question[] = [
  { id: 'q1', number: '01', text: "Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?", context: "(Looks for curiosity and initiative)", relevance: 'Relevant' as const },
  { id: 'q2', number: '02', text: "How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?", context: "(Assesses awareness and interest)", relevance: 'Non-Relevant' as const },
  { id: 'q3', number: '03', text: "Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)", context: "(Gauges willingness to experiment)", relevance: 'Relevant' as const },
  { id: 'q4', number: '04', text: "Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?", context: "(Tests ability to identify practical AI opportunities)", relevance: 'Non-Relevant' as const },
  { id: 'q5', number: '05', text: "Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?", context: "(Evaluates adaptability)", relevance: 'Relevant' as const },
  { id: 'q6', number: '06', text: "Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step", context: "", relevance: 'Non-Relevant' as const },
];

interface QuestionListProps {
  onQuestionsStateChange?: (questions: Question[]) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ onQuestionsStateChange }) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestionsData);

  const handleRelevanceChange = useCallback((questionId: string, newRelevance: 'Relevant' | 'Non-Relevant') => {
    setQuestions(prevQuestions => 
      prevQuestions.map(q =>
        q.id === questionId ? { ...q, relevance: newRelevance } : q
      )
    );
  }, []);

  useEffect(() => {
    if (onQuestionsStateChange) {
      onQuestionsStateChange(questions);
    }
  }, [questions, onQuestionsStateChange]);

  return (
    <div className="w-full">
      {/* Headers for Relevant/Non-Relevant columns */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 mb-3">
        <div /> {/* Spacer for Number column */}
        {/* Optional header for question text, not shown in image, so keep empty or minimal styling */}
        <div className="text-sm font-medium text-muted-foreground pl-1">Question</div> 
        <div className="flex items-center justify-end">
           <div className="text-sm font-semibold text-foreground text-center w-20">Relevant</div>
           <div className="text-sm font-semibold text-foreground text-center w-24">Non-Relevant</div>
        </div>
      </div>

      <div className="flex flex-col">
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            onRelevanceChange={handleRelevanceChange}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
