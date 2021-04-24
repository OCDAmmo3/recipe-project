import { siftAboutData } from '../../services/recipe';

const data = {
  image: 'jon\'s face',
  name: 'Jon Struve',
  team: 'Recipe Team'
};

const getAboutPage = async (request, h) => {
  const result = await siftAboutData(request.data);

  if(!result) {
    return h.BadRequest('That user is a loser');
  }
  
  return h.Ok();
}
