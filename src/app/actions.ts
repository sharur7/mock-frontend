'use server';

export async function generateMocktailRecipe(formData: FormData): Promise<{ success: boolean; recipe?: string; error?: string }> {
  try {
    const mocktail = formData.get('mocktail') as string;
    const response = await fetch(`https://render-mock-0wyd.onrender.com/ask?question=${encodeURIComponent(mocktail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }

    const data: { answer: string } = await response.json();
    return { success: true, recipe: data.answer };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating mocktail recipe:', errorMessage);
    return { success: false, error: 'Failed to generate mocktail recipe. Please try again!' };
  }
}
