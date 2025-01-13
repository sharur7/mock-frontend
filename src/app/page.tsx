'use client';

import { useState } from 'react';
import {
  GlassWater,
  Loader2,
  Download,
  Book,
  Info,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateMocktailRecipe } from './actions';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'; // Updated import

const EXTRA_BOOK_CONTENT = `
1. Classic Virgin Mojito
...
`;

export default function MocktailGenerator() {
  const [recipe, setRecipe] = useState('');
  const [recipeBook, setRecipeBook] = useState<string[]>([]); // Keep if recipeBook is used
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');
    
    const result = await generateMocktailRecipe(formData);
    
    if (result.success) {
      setRecipe(result.recipe as string);
      setRecipeBook(prevBook => [...prevBook, result.recipe]); // Uncomment to use recipeBook
    } else {
      setError(result.error as string);
    }
    
    setLoading(false);
  }

  function handleDownload(content: string, filename: string) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="min-h-screen bg-[url('/cocktail-pattern.svg')] bg-repeat bg-pink-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2 relative">
          <h1 className="text-4xl font-bold text-pink-600 flex items-center justify-center gap-2">
            <span className="text-5xl animate-bounce">🍹</span>
            Mocktail Magic Mixer
          </h1>
          <p className="text-gray-600">Tell me what mocktail you want, and I&apos;ll mix up a recipe! 🍹</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleDownload(EXTRA_BOOK_CONTENT, 'mocktail-recipe-book.txt')}
                  className="absolute top-0 right-0 rounded-full w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
                >
                  <Book className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download the recipe book</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setShowHelp(!showHelp)}
                  className="absolute top-0 left-0 rounded-full w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
                >
                  <HelpCircle className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>How to use this app</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {showHelp && (
          <Card className="backdrop-blur-sm bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardTitle className="text-2xl">🍹 How to Use Mocktail Magic Mixer 🧙‍♂️</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="list-decimal list-inside space-y-4">
                <li className="text-lg">
                  <span className="font-semibold text-pink-600">Dream It:</span> Enter a mocktail name or description in the magical input field.
                </li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Further UI here */}
      </div>
    </div>
  );
}
