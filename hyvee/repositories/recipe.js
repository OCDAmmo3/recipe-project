import { getQueryBuilder } from 'knex-builder';

export const insertGoodRecipes = async (recipes) => {
  const knexQuery = getQueryBuilder();

  await knexQuery
    .insert(recipes)
    .table('recipes')
    .schema('recipe')
    .catch(() => false);

  return true;
}