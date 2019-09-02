# Project Food

Team Members: Jon Struve, Jon Schwamman, Andy Fiedler, and Jacob Swenson
Description: Site to search for and save recipes across multiple recipe sites.

Problem Domain: 
 - There are a lot of different recipe sites however its difficult to search through and save recipes from multiple sources.
 - Out site aggregates recipes from multiple different sources in one place and allows users to save them to their own cookbook.

Versions:
  1.0.0 

Resource(s):
 - jQuery
 - Express

API Endpoint(s):
 - Recipe Search Results
    https://api.spoonacular.com/recipes/search

    Sample Response:

        {
        "results": [
            {
                "id": 219957,
                "title": "Carrot & sesame burgers",
                "readyInMinutes": 50,
                "servings": 6,
                "image": "Carrot---sesame-burgers-219957.jpg",
                "imageUrls": [
                    "Carrot---sesame-burgers-219957.jpg"
                ]
            },
            {
                "id": 864633,
                "title": "Banh Mi Burgers with Spicy Sriracha Mayo",
                "readyInMinutes": 35,
                "servings": 4,
                "image": "banh-mi-burgers-with-spicy-sriracha-mayo-864633.jpg",
                "imageUrls": [
                    "banh-mi-burgers-with-spicy-sriracha-mayo-864633.jpg"
                ]
            },
            {
                "id": 219871,
                "title": "Halloumi aubergine burgers with harissa relish",
                "readyInMinutes": 20,
                "servings": 4,
                "image": "Halloumi-aubergine-burgers-with-harissa-relish-219871.jpg",
                "imageUrls": [
                    "Halloumi-aubergine-burgers-with-harissa-relish-219871.jpg"
                ]
            },
            {
                "id": 245343,
                "title": "Herbed Turkey Burger",
                "readyInMinutes": 30,
                "servings": 8,
                "image": "Herbed-Turkey-Burger-245343.jpg",
                "imageUrls": [
                    "Herbed-Turkey-Burger-245343.jpg"
                ]
            },
            {
                "id": 593801,
                "title": "Turkey Burgers with Mango Chutney",
                "readyInMinutes": 30,
                "servings": 12,
                "image": "Ground-Turkey-Burger-Sliders-with-Mango-Chutney-593801.jpg",
                "imageUrls": [
                    "Ground-Turkey-Burger-Sliders-with-Mango-Chutney-593801.jpg"
                ]
            },
            {
                "id": 210685,
                "title": "The great breakfast burger",
                "readyInMinutes": 115,
                "servings": 8,
                "image": "The-great-breakfast-burger-210685.jpg",
                "imageUrls": [
                    "The-great-breakfast-burger-210685.jpg"
                ]
            },
            {
                "id": 521885,
                "title": "Pesto & Mozzarella Turkey Burger",
                "readyInMinutes": 20,
                "servings": 6,
                "image": "Pesto---Mozzarella-Turkey-Burger-521885.jpg",
                "imageUrls": [
                    "Pesto---Mozzarella-Turkey-Burger-521885.jpg"
                ]
            },
            {
                "id": 220182,
                "title": "Turkey burgers with beetroot relish",
                "readyInMinutes": 25,
                "servings": 4,
                "image": "Turkey-burgers-with-beetroot-relish-220182.jpg",
                "imageUrls": [
                    "Turkey-burgers-with-beetroot-relish-220182.jpg"
                ]
            },
            {
                "id": 573337,
                "title": "Spicy Mango Black Bean Turkey Burgers",
                "readyInMinutes": 45,
                "servings": 6,
                "image": "Spicy-Mango-Black-Bean-Turkey-Burgers-573337.jpg",
                "imageUrls": [
                    "Spicy-Mango-Black-Bean-Turkey-Burgers-573337.jpg"
                ]
            },
            {
                "id": 210827,
                "title": "Tangy tuna burgers",
                "readyInMinutes": 25,
                "servings": 2,
                "image": "Tangy-tuna-burgers-210827.jpg",
                "imageUrls": [
                    "Tangy-tuna-burgers-210827.jpg"
                ]
            }
        ],
        "baseUri": "https://spoonacular.com/recipeImages/",
        "offset": 0,
        "number": 10,
        "totalResults": 80,
        "processingTimeMs": 201,
        "expires": 1567455438619,
        "isStale": false
    }
 - Recipe Details 
    https://api.spoonacular.com/recipes/informationBulk

    Sample Response:

      [
      {
          "vegetarian": false,
          "vegan": false,
          "glutenFree": false,
          "dairyFree": false,
          "veryHealthy": false,
          "cheap": false,
          "veryPopular": true,
          "sustainable": false,
          "weightWatcherSmartPoints": 13,
          "gaps": "no",
          "lowFodmap": false,
          "ketogenic": false,
          "whole30": false,
          "preparationMinutes": 30,
          "cookingMinutes": 20,
          "sourceUrl": "https://www.bbcgoodfood.com/recipes/11011/carrot-and-sesame-burgers",
          "spoonacularSourceUrl": "https://spoonacular.com/carrot-sesame-burgers-219957",
          "aggregateLikes": 910,
          "spoonacularScore": 98.0,
          "healthScore": 36.0,
          "creditsText": "BBC Good Food",
          "sourceName": "BBC Good Food",
          "pricePerServing": 147.75,
          "extendedIngredients": [
              {
                  "id": 11124,
                  "aisle": "Produce",
                  "image": "sliced-carrot.png",
                  "consitency": "solid",
                  "name": "carrots",
                  "original": "750g carrots, peeled and grated",
                  "originalString": "750g carrots, peeled and grated",
                  "originalName": "carrots, peeled and grated",
                  "amount": 750.0,
                  "unit": "g",
                  "meta": [
                      "grated",
                      "peeled"
                  ],
                  "metaInformation": [
                      "grated",
                      "peeled"
                  ],
                  "measures": {
                      "us": {
                          "amount": 1.653,
                          "unitShort": "lb",
                          "unitLong": "pounds"
                      },
                      "metric": {
                          "amount": 750.0,
                          "unitShort": "g",
                          "unitLong": "grams"
                      }
                  }
              },
              {
                  "id": 16058,
                  "aisle": "Canned and Jarred",
                  "image": "chickpeas.png",
                  "consitency": "solid",
                  "name": "canned chickpeas",
                  "original": "410g can chickpeas, drained and rinsed",
                  "originalString": "410g can chickpeas, drained and rinsed",
                  "originalName": "chickpeas, drained and rinsed",
                  "amount": 410.0,
                  "unit": "g",
                  "meta": [
                      "drained and rinsed",
                      "canned"
                  ],
                  "metaInformation": [
                      "drained and rinsed",
                      "canned"
                  ],
                  "measures": {
                      "us": {
                          "amount": 14.462,
                          "unitShort": "oz",
                          "unitLong": "ounces"
                      },
                      "metric": {
                          "amount": 410.0,
                          "unitShort": "g",
                          "unitLong": "grams"
                      }
                  }
              },
              {
                  "id": 11282,
                  "aisle": "Produce",
                  "image": "brown-onion.png",
                  "consitency": "solid",
                  "name": "onion",
                  "original": "1 small onion, roughly chopped",
                  "originalString": "1 small onion, roughly chopped",
                  "originalName": "onion, roughly chopped",
                  "amount": 1.0,
                  "unit": "small",
                  "meta": [
                      "roughly chopped"
                  ],
                  "metaInformation": [
                      "roughly chopped"
                  ],
                  "measures": {
                      "us": {
                          "amount": 1.0,
                          "unitShort": "small",
                          "unitLong": "small"
                      },
                      "metric": {
                          "amount": 1.0,
                          "unitShort": "small",
                          "unitLong": "small"
                      }
                  }
              },
              {
                  "id": 12698,
                  "aisle": "Ethnic Foods;Health Foods",
                  "image": "tahini-paste.png",
                  "consitency": "solid",
                  "name": "tahini paste",
                  "original": "2 tbsp tahini paste, plus 1 tsp to serve",
                  "originalString": "2 tbsp tahini paste, plus 1 tsp to serve",
                  "originalName": "tahini paste, plus 1 tsp to serve",
                  "amount": 2.0,
                  "unit": "tbsp",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 2.0,
                          "unitShort": "Tbsps",
                          "unitLong": "Tbsps"
                      },
                      "metric": {
                          "amount": 2.0,
                          "unitShort": "Tbsps",
                          "unitLong": "Tbsps"
                      }
                  }
              },
              {
                  "id": 1002014,
                  "aisle": "Spices and Seasonings",
                  "image": "ground-cumin.jpg",
                  "consitency": "solid",
                  "name": "ground cumin",
                  "original": "1 tsp ground cumin",
                  "originalString": "1 tsp ground cumin",
                  "originalName": "ground cumin",
                  "amount": 1.0,
                  "unit": "tsp",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 1.0,
                          "unitShort": "tsp",
                          "unitLong": "teaspoon"
                      },
                      "metric": {
                          "amount": 1.0,
                          "unitShort": "tsp",
                          "unitLong": "teaspoon"
                      }
                  }
              },
              {
                  "id": 1123,
                  "aisle": "Milk, Eggs, Other Dairy",
                  "image": "egg.png",
                  "consitency": "solid",
                  "name": "egg",
                  "original": "1 egg",
                  "originalString": "1 egg",
                  "originalName": "egg",
                  "amount": 1.0,
                  "unit": "",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 1.0,
                          "unitShort": "",
                          "unitLong": ""
                      },
                      "metric": {
                          "amount": 1.0,
                          "unitShort": "",
                          "unitLong": ""
                      }
                  }
              },
              {
                  "id": 4053,
                  "aisle": "Oil, Vinegar, Salad Dressing",
                  "image": "olive-oil.jpg",
                  "consitency": "liquid",
                  "name": "olive oil",
                  "original": "3 tbsp olive oil",
                  "originalString": "3 tbsp olive oil",
                  "originalName": "olive oil",
                  "amount": 3.0,
                  "unit": "tbsp",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 3.0,
                          "unitShort": "Tbsps",
                          "unitLong": "Tbsps"
                      },
                      "metric": {
                          "amount": 3.0,
                          "unitShort": "Tbsps",
                          "unitLong": "Tbsps"
                      }
                  }
              },
              {
                  "id": 18079,
                  "aisle": "Pasta and Rice",
                  "image": "breadcrumbs.jpg",
                  "consitency": "solid",
                  "name": "breadcrumbs",
                  "original": "100g wholemeal breadcrumbs",
                  "originalString": "100g wholemeal breadcrumbs",
                  "originalName": "wholemeal breadcrumbs",
                  "amount": 100.0,
                  "unit": "g",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 3.527,
                          "unitShort": "oz",
                          "unitLong": "ounces"
                      },
                      "metric": {
                          "amount": 100.0,
                          "unitShort": "g",
                          "unitLong": "grams"
                      }
                  }
              },
              {
                  "id": 9156,
                  "aisle": "Produce",
                  "image": "zest-lemon.jpg",
                  "consitency": "solid",
                  "name": "lemon zest",
                  "original": "zest 1 lemon, plus 1 tsp juice",
                  "originalString": "zest 1 lemon, plus 1 tsp juice",
                  "originalName": "zest lemon, plus 1 tsp juice",
                  "amount": 1.0,
                  "unit": "",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 1.0,
                          "unitShort": "",
                          "unitLong": ""
                      },
                      "metric": {
                          "amount": 1.0,
                          "unitShort": "",
                          "unitLong": ""
                      }
                  }
              },
              {
                  "id": 1001116,
                  "aisle": "Milk, Eggs, Other Dairy",
                  "image": "plain-yogurt.jpg",
                  "consitency": "liquid",
                  "name": "natural yogurt",
                  "original": "150ml pot natural yogurt",
                  "originalString": "150ml pot natural yogurt",
                  "originalName": "pot natural yogurt",
                  "amount": 150.0,
                  "unit": "ml",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 5.073,
                          "unitShort": "fl. oz",
                          "unitLong": "fl. ozs"
                      },
                      "metric": {
                          "amount": 150.0,
                          "unitShort": "ml",
                          "unitLong": "milliliters"
                      }
                  }
              },
              {
                  "id": 98940,
                  "aisle": "Bakery/Bread",
                  "image": "french-rolls.jpg",
                  "consitency": "solid",
                  "name": "sub buns",
                  "original": "6 buns, rocket leaves, sliced red onion, sliced avocado and chilli sauce, to serve",
                  "originalString": "6 buns, rocket leaves, sliced red onion, sliced avocado and chilli sauce, to serve",
                  "originalName": "buns, rocket leaves, sliced red onion, sliced avocado and chilli sauce, to serve",
                  "amount": 6.0,
                  "unit": "",
                  "meta": [
                      "red",
                      "sliced"
                  ],
                  "metaInformation": [
                      "red",
                      "sliced"
                  ],
                  "measures": {
                      "us": {
                          "amount": 6.0,
                          "unitShort": "",
                          "unitLong": ""
                      },
                      "metric": {
                          "amount": 6.0,
                          "unitShort": "",
                          "unitLong": ""
                      }
                  }
              },
              {
                  "id": 12023,
                  "aisle": "Ethnic Foods;Spices and Seasonings",
                  "image": "sesame-seeds.png",
                  "consitency": "solid",
                  "name": "sesame seeds",
                  "original": "3 tbsp sesame seeds",
                  "originalString": "3 tbsp sesame seeds",
                  "originalName": "sesame seeds",
                  "amount": 3.0,
                  "unit": "tbsp",
                  "meta": [],
                  "metaInformation": [],
                  "measures": {
                      "us": {
                          "amount": 3.0,
                          "unitShort": "Tbsps",
                          "unitLong": "Tbsps"
                      },
                      "metric": {
                          "amount": 3.0,
                          "unitShort": "Tbsps",
                          "unitLong": "Tbsps"
                      }
                  }
              }
          ],
          "id": 219957,
          "title": "Carrot & sesame burgers",
          "readyInMinutes": 50,
          "servings": 6,
          "image": "https://spoonacular.com/recipeImages/219957-556x370.jpg",
          "imageType": "jpg",
          "cuisines": [
              "american"
          ],
          "dishTypes": [
              "lunch",
              "main course",
              "main dish",
              "dinner"
          ],
          "diets": [],
          "occasions": [],
          "winePairing": {
              "pairedWines": [
                  "malbec",
                  "merlot",
                  "zinfandel"
              ],
              "pairingText": "Burger on the menu? Try pairing with Malbec, Merlot, and Zinfandel. Merlot will be perfectly adequate for a classic burger with standard toppings. Bolder toppings call for bolder wines, such as a malbec or peppery zinfandel. The Nieto Senetiner Malbec with a 4.2 out of 5 star rating seems like a good match. It costs about 15 dollars per bottle.",
              "productMatches": [
                  {
                      "id": 440601,
                      "title": "Nieto Senetiner Malbec",
                      "description": "Wine of well defined profile, deep red color and great intensity. Aromas of small red fruits and plums dominate the nose; the vanilla scents from the oak barrel add elegance. Mouthfeel shows a great personality, great body and is fruity, well balanced and sensual.This wine pairs well with grilled meats, pasta with red sauce, salmon and veal.",
                      "price": "$14.99",
                      "imageUrl": "https://spoonacular.com/productImages/440601-312x231.jpg",
                      "averageRating": 0.8400000000000001,
                      "ratingCount": 13.0,
                      "score": 0.8150000000000001,
                      "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fnieto-senetiner-malbec-2011%2F124685"
                  }
              ]
          },
          "instructions": "Put a third of the grated carrot in a food processor with the chickpeas, onion, 2 tbsp tahini, cumin and egg. Whizz to a thick paste, then scrape into a large bowl. Heat 1 tbsp oil in your largest frying pan, tip in the remaining carrot and cook for 8-10 mins, stirring until the carrot is softened  it will become more golden as it is cooked. Add this cooked carrot to the whizzed paste with the breadcrumbs, lemon zest and sesame seeds. Add seasoning, then mix together well with your hands.\nDivide the mixture into 6, then using wet hands shape into burgers. Cover and chill until serving. Mix the yogurt with the remaining tahini and lemon juice, then chill.\nFire up the barbecue, or heat a non-stick frying pan and brush the burgers with the remaining oil. Cook the burgers for 5 mins on each side, until golden and crisp. Meanwhile warm or toast the buns (or sit them on the barbecue alongside the burgers). When the burgers are ready, spread each bun with some of the lemony sesame yogurt, add the avocado, top with the burger, onion and rocket. Finish with a drizzle of chilli sauce.",
          "analyzedInstructions": [
              {
                  "name": "",
                  "steps": [
                      {
                          "number": 1,
                          "step": "Put a third of the grated carrot in a food processor with the chickpeas, onion, 2 tbsp tahini, cumin and egg. Whizz to a thick paste, then scrape into a large bowl.",
                          "ingredients": [
                              {
                                  "id": 11124,
                                  "name": "carrot",
                                  "image": "sliced-carrot.png"
                              },
                              {
                                  "id": 12698,
                                  "name": "tahini",
                                  "image": "tahini-paste.png"
                              },
                              {
                                  "id": 1002014,
                                  "name": "cumin",
                                  "image": "ground-cumin.jpg"
                              },
                              {
                                  "id": 11282,
                                  "name": "onion",
                                  "image": "brown-onion.png"
                              },
                              {
                                  "id": 1123,
                                  "name": "egg",
                                  "image": "egg.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404771,
                                  "name": "food processor",
                                  "image": "food-processor.png"
                              },
                              {
                                  "id": 404783,
                                  "name": "bowl",
                                  "image": "bowl.jpg"
                              }
                          ]
                      },
                      {
                          "number": 2,
                          "step": "Heat 1 tbsp oil in your largest frying pan, tip in the remaining carrot and cook for 8-10 mins, stirring until the carrot is softened  it will become more golden as it is cooked.",
                          "ingredients": [
                              {
                                  "id": 11124,
                                  "name": "carrot",
                                  "image": "sliced-carrot.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "image": "pan.png"
                              }
                          ],
                          "length": {
                              "number": 10,
                              "unit": "minutes"
                          }
                      },
                      {
                          "number": 3,
                          "step": "Add this cooked carrot to the whizzed paste with the breadcrumbs, lemon zest and sesame seeds.",
                          "ingredients": [
                              {
                                  "id": 12023,
                                  "name": "sesame seeds",
                                  "image": "sesame-seeds.png"
                              },
                              {
                                  "id": 18079,
                                  "name": "breadcrumbs",
                                  "image": "breadcrumbs.jpg"
                              },
                              {
                                  "id": 9156,
                                  "name": "lemon zest",
                                  "image": "zest-lemon.jpg"
                              },
                              {
                                  "id": 11124,
                                  "name": "carrot",
                                  "image": "sliced-carrot.png"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 4,
                          "step": "Add seasoning, then mix together well with your hands.",
                          "ingredients": [],
                          "equipment": []
                      },
                      {
                          "number": 5,
                          "step": "Divide the mixture into 6, then using wet hands shape into burgers. Cover and chill until serving.",
                          "ingredients": [],
                          "equipment": []
                      },
                      {
                          "number": 6,
                          "step": "Mix the yogurt with the remaining tahini and lemon juice, then chill.",
                          "ingredients": [
                              {
                                  "id": 12698,
                                  "name": "tahini",
                                  "image": "tahini-paste.png"
                              },
                              {
                                  "id": 1116,
                                  "name": "yogurt",
                                  "image": "plain-yogurt.jpg"
                              }
                          ],
                          "equipment": []
                      },
                      {
                          "number": 7,
                          "step": "Fire up the barbecue, or heat a non-stick frying pan and brush the burgers with the remaining oil. Cook the burgers for 5 mins on each side, until golden and crisp. Meanwhile warm or toast the buns (or sit them on the barbecue alongside the burgers). When the burgers are ready, spread each bun with some of the lemony sesame yogurt, add the avocado, top with the burger, onion and rocket. Finish with a drizzle of chilli sauce.",
                          "ingredients": [
                              {
                                  "id": 12023,
                                  "name": "sesame seeds",
                                  "image": "sesame-seeds.png"
                              },
                              {
                                  "id": 1116,
                                  "name": "yogurt",
                                  "image": "plain-yogurt.jpg"
                              },
                              {
                                  "id": 11282,
                                  "name": "onion",
                                  "image": "brown-onion.png"
                              }
                          ],
                          "equipment": [
                              {
                                  "id": 404645,
                                  "name": "frying pan",
                                  "image": "pan.png"
                              }
                          ],
                          "length": {
                              "number": 5,
                              "unit": "minutes"
                          }
                      }
                  ]
              }
          ]
      }
  ]


Database Schema:
  Recipes Table
    recipe_id: INTEGER;
    time_added: BIGINT;