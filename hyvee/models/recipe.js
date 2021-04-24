export const mapToRecipeModel = (recipe) => ({
  recipeName: recipe.Name,
  recipeIngredients: mapToIngredientsModel(recipe.Ingredients),
  recipeInstructions: mapToInstructionsModel(recipe.Instructions),
  rating: recipe.Rating,
  prepTime: {
    cookTemperature: recipe.CookTemp,
    cookTime: recipe.CookTime,
    prepTime: recipe.PrepTime,
    cleanupTime: recipe.CleanupTime
  },
  totalTime: reduceTotalTime(prepTime)
});

const mapToIngredientsModel = (ingredients) => ingredients.map(ing => ({
  name: ing.Name,
  amount: ing.Amount,
  amountUom: ing.Measurement
}));

const mapToInstructionsModel = (instructions) => instructions.map(inst => ({
  number: inst.Step,
  title: inst.Name,
  details: inst.Description,
  tools: inst.Tools,
  ingredients: inst.Ingredients
}));

const finalResult = {
  recipeName: 'Jeff',
  recipeIngredients: [{
    name: 'Jeff',
    amount: '100%',
    amountUom: 'Human'
  }],
  recipeInstructions: [{
    number: 1,
    title: 'Birth Jeff',
    details: 'NSFW',
    tools: 'Doctor things',
    ingredients: 'Also NSFW'
  },
  {
    number: 2,
    title: 'Death of Jeff',
    details: 'Jeff forgot about everything he did as he passed at the age of 345',
    tools: 'Casket, shovel, priest',
    ingredients: 'Dirt, Jeff'
  }]
}