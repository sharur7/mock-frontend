'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'
import { GlassWater, Loader2, Download, Book, Info, HelpCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { generateMocktailRecipe } from './actions'
import ReactMarkdown from 'react-markdown'

const EXTRA_BOOK_CONTENT = `
1. Classic Virgin Mojito
Ingredients:
- 10 fresh mint leaves
- 1/2 lime, cut into wedges
- 2 tablespoons sugar
- 1/2 cup club soda
- 1 cup crushed ice

Instructions:
1. In a glass, muddle the mint leaves with sugar and lime wedges.
2. Fill the glass with crushed ice.
3. Top with club soda and stir well.
4. Garnish with a sprig of mint and a lime wheel.
5. Enjoy your refreshing Virgin Mojito!

2. Sunrise Splash (Mocktail with Orange Juice)
Ingredients:
- 1/2 cup orange juice
- 1/4 cup pineapple juice
- 1/4 cup coconut cream
- 1 tablespoon grenadine
- Ice cubes
- Orange slice and maraschino cherry for garnish

Instructions:
1. Fill a tall glass with ice cubes.
2. In a shaker, combine orange juice, pineapple juice, and coconut cream. Shake well.
3. Pour the mixture over the ice in the glass.
4. Slowly pour the grenadine over the back of a spoon to create a layered effect.
5. Garnish with an orange slice and a maraschino cherry.
6. Serve and enjoy your tropical Sunrise Splash!
`

export default function MocktailGenerator() {
  const [recipe, setRecipe] = useState('')
  const [recipeBook, setRecipeBook] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    
    const result = await generateMocktailRecipe(formData) 
    
    if (result.success) {
      setRecipe(result.recipe as string)
      // setRecipeBook(prevBook => [...prevBook, result.recipe])
    } else {
      setError(result.error as string)
    }
    
    setLoading(false)
  }

  function handleDownload(content: string, filename: string) {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
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
          <p className="text-gray-600">Tell me what mocktail you want, and I'll mix up a recipe! 🍹</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleDownload(EXTRA_BOOK_CONTENT, "mocktail-recipe-book.txt")}
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
                <li className="text-lg"><span className="font-semibold text-pink-600">Dream It:</span> Enter a mocktail name or description in the magical input field.</li>
                <li className="text-lg"><span className="font-semibold text-pink-600">Mix It:</span> Click the "Generate Mocktail" button to conjure your recipe.</li>
                <li className="text-lg"><span className="font-semibold text-pink-600">Enjoy It:</span> Marvel at your generated recipe in the enchanted output card.</li>
                <li className="text-lg"><span className="font-semibold text-pink-600">Save It:</span> Download individual recipes or create your own spell book of mocktails.</li>
                <li className="text-lg"><span className="font-semibold text-pink-600">Explore More:</span> Use the book icon to download a pre-made recipe grimoire.</li>
              </ol>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Card */}
          <Card className="min-h-[400px] backdrop-blur-sm bg-white/90 flex flex-col relative z-10">
            <CardHeader>
              <CardTitle>What mocktail would you like?</CardTitle>
              <CardDescription>Enter any mocktail name and get a detailed recipe!</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="mb-4 flex-grow">
                <img
                  src="/mocktail-illustration.svg"
                  alt="Mocktail Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
              <form action={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input 
                    name="mocktail" 
                    placeholder="e.g. Virgin Mojito, Tropical Sunrise..."
                    required
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={5} className="z-[60]">
                        <p>Try "Virgin Mojito" or "Mocktail with orange juice"</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mixing up your mocktail...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate Mocktail
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="min-h-[400px] backdrop-blur-sm bg-white/90">
            <CardHeader>
              <CardTitle>Your Mocktail Recipe</CardTitle>
              <CardDescription>Follow these steps to mocktail mastery! 🎉</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : recipe ? (
                <div className="space-y-4">
                  <div className="prose prose-pink max-w-none whitespace-pre-wrap">
                    <ReactMarkdown>{recipe}</ReactMarkdown>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => handleDownload(recipe, "mocktail-recipe.txt")} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Recipe
                    </Button>
                    <Button onClick={() => handleDownload(recipeBook.join('\n\n---\n\n'), "mocktail-recipe-book.txt")} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white" disabled={recipeBook.length === 0}>
                      <Book className="mr-2 h-4 w-4" />
                      Download Recipe Book
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <GlassWater className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your mocktail recipe will appear here...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <footer className="text-center text-gray-600 py-4 mt-8">
          <p>© {new Date().getFullYear()} Mocktail Magic Mixer. Made with 💗 by your mixology companion.</p>
        </footer>
      </div>
    </div>
  )
}
