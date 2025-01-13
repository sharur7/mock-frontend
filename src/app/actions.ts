'use server'

export async function generateMocktailRecipe(formData: FormData) {
  try {
    const mocktail = formData.get('mocktail') as string
    const response = await fetch(`https://render-mock-0wyd.onrender.com/ask?question=${encodeURIComponent(mocktail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: "",
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe')
    }

    const data = await response.json()
    return { success: true, recipe: data.answer }
  } catch (error) {
    return { success: false, error: 'Failed to generate mocktail recipe. Please try again!' }
  }
}

