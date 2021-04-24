import { mapToRecipeModel } from '../models/recipe';
import { insertGoodRecipes } from '../repositories/recipe';

const siftRecipeData = (recipes) => {
  let goodRecipes = [],
      possibleRecipe;

      // diet = [vegetarian, keto, vegan, dairy free, ]
  recipes.forEach(recipe => {
    if(recipe.diet.Includes('vegetarian')) {
      possibleRecipe = mapToRecipeModel(recipe);
      if(possibleRecipe.rating > .75) {
        goodRecipes.push(possbileRecipe);
      }
    }
  });

  return await insertGoodRecipes(goodRecipes);
}


describe('recipe', () => {
  test('siftRecipeData', () => {
    mapToRecipeModel.mockReturnValue({rating: .8});
    siftRecipeData([{diet: ['vegetarian', 'string']}]);

    expect(mapToRecipeModel)
      .toHaveBeenCalledTimes(1);
    expect(insertGoodRecipes)
      .toHaveBeenCalledTimes(1)
      .toHaveBeenCalledWith([{rating: .8}]);
  });
});
