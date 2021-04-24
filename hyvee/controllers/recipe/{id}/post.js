import { siftRecipeData } from '../../services/recipe';

const postRecipeData = async (request, h) => {
  const result = await siftRecipeData(request.data);

  if(!result) {
    return h.BadRequest('That recipe is faulty and gross.');
  }
  
  return h.Ok();
}

// recipewebsite.com/recipe/24