import React, { useState, useCallback, useEffect } from 'react';
import HeaderBar from '../components/layout/HeaderBar';
import QuestionList from '../components/Assessment/QuestionList';
import { Question } from '../components/Assessment/QuestionCard';
import AIQResultDisplay, { AIQLevel } from '../components/Assessment/AIQResultDisplay';
import ScreenerNotes from '../components/Assessment/ScreenerNotes';
import { cn } from '@/lib/utils';

const AIQAssessmentPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [aiqLevel, setAiqLevel] = useState<AIQLevel>(null);
  const [screenerNotes, setScreenerNotes] = useState<string>("");

  const handleQuestionsStateChange = useCallback((updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions);
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      setAiqLevel(null);
      return;
    }

    const relevantCount = questions.filter(q => q.relevance === 'Relevant').length;
    const totalQuestions = questions.length;
    const relevancePercentage = (relevantCount / totalQuestions) * 100;

    if (relevancePercentage >= 70) {
      setAiqLevel('High' as const);
    } else if (relevancePercentage >= 40) {
      setAiqLevel('Medium' as const);
    } else {
      setAiqLevel('Low' as const);
    }
  }, [questions]);

  const handleNotesChange = useCallback((notes: string) => {
    setScreenerNotes(notes);
    // console.log("Screener Notes Updated:", notes); // For debugging or further integration
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <HeaderBar />
      
      <main className={cn(
        "w-full flex-grow", // Takes full width, grows to fill vertical space
        "pt-16", // Clearance for fixed header (h-16 from HeaderBar)
        "flex flex-col items-center" // Centers the main content card horizontally
      )}>
        {/* Main Content Card */}
        <div className={cn(
          "my-8", // Vertical margin for the card (top and bottom)
          "flex flex-col px-6 py-8 gap-6", // Internal padding and gap, as per layout requirements
          "w-[80%] max-w-4xl", // Width constraint as per layout requirements
          "bg-card rounded-md shadow-md" // Styling: uses 'card' which maps to 'surface'
        )}>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              AI QUOTIENT (AIQ) ASSESSMENT
            </h1>
            <p className="text-md text-muted-foreground mt-1">
              SCREENING AI-FRIENDLY TALENT
            </p>
          </div>

          <QuestionList onQuestionsStateChange={handleQuestionsStateChange} />
          <AIQResultDisplay level={aiqLevel} className="mt-2" />
          <ScreenerNotes 
            initialNotes={screenerNotes} 
            onNotesChange={handleNotesChange} 
            className="mt-2"
          />
        </div>
      </main>
    </div>
  );
};

export default AIQAssessmentPage;
