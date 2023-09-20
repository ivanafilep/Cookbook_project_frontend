import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ShowRecipes from './recipe/ShowRecipes';
import RecipeDetails from './recipe/RecipeDetails';
import RecipeEdit from './recipe/RecipeEdit';
import RecipeForm from './recipe/RecipeForm';
import ShowMyCookbook from './Cookbook/MyCookbook';
import MyAllergens from './allergens/MyAllergens';
import ShowAllergens from './allergens/ShowAllergens';
import AllergenEdit from './allergens/AllergenEdit';
import AllergenForm from './allergens/AllergenForm';
import { check_login } from './login_logic';
import Login from './Login';
import Error from './Error';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import ProtectedRoute from './ProtectedRoute';
import ShowRegUsers from './regularuser/ShowRegUsers';
import RegUserForm from './regularuser/RegUserForm';
import ShowIngredients from './ingredients/ShowIngredients';
import RegUserDetails from './regularuser/RegUserDetails';
import RegUserEdit from './regularuser/RegUserEdit';
import ChefEdit from './chef/ChefEdit';
import ShowChefs from './chef/ShowChefs';
import ChefDetails from './chef/ChefDetails';
import ChefForm from './chef/ChefForm';
import IngredientDetails from './ingredients/IngredientDetails';
import IngredientForm from './ingredients/IngredientForm';
import IngredientEdit from './ingredients/IngredientEdit';
import ChefRecipeEdit from './chefRecipes/ChefRecipeEdit';
import ChefRecipes from './chefRecipes/ChefRecipes';
import ChefRecipeDetails from './chefRecipes/ChefRecipeDetails';
import ChefRecipeForm from './chefRecipes/ChefRecipeForm';
import MyCookbook from './Cookbook/MyCookbook';
import MyCookbookRecipeDetails from './Cookbook/MyCookbookRecipeDetails';
import Signin from './Signin';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Navigate to= "/recipe" />
    },
    {
      path: 'error',
      element: <Error />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'signin',
      element: <Signin />
    },
    {
      path: 'recipe',
      element: <ShowRecipes />
    },
    {
      path: 'recipe/new_recipe',
      element: <RecipeForm />
    },
    {
      path: 'recipe/edit_recipe/:id',
      element: <RecipeEdit />,
      loader: async ({ params }) => {
        const user = check_login(['ROLE_ADMIN', 'ROLE_CHEF']);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: 'recipe/recipe_details/:id',
      element: <RecipeDetails />,
      loader: async ({ params }) => {
        console.log(params.id);
        console.log(params);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'myCookbook',
      element: <MyCookbook />
    },
    {
      path: 'myCookbook/recipe_details/:id',
      element: <MyCookbookRecipeDetails />,
      loader: async ({ params }) => {
        console.log(params.id);
        console.log(params);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },

    {
      path: 'myAllergens',
      element: <MyAllergens />
    },
    {
      path: 'allAllergens',
      element: <ShowAllergens />
    },
    {
      path: 'allergen_edit/:id',
      element: <AllergenEdit />,
      loader: async ({ params }) => {
        const user = check_login(['ROLE_ADMIN', 'ROLE_CHEF']);
        return fetch(`http://localhost:8080/project/allergens/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: 'add-allergen',
      element: <AllergenForm />,
    },
    {
      path: 'ingredients',
      element: <ShowIngredients />
    },
    {
      path: 'ingredients/ingredient_details/:id',
      element: <IngredientDetails />,
      loader: async ({ params }) => {
        console.log(params.id);
        console.log(params);
        return fetch(`http://localhost:8080/project/ingredients/id/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'ingredients/newIngredient',
      element: <IngredientForm />
    },
    {
      path: 'ingredients/edit_ingredient/:id',
      element: <IngredientEdit />,
      loader: async ({ params }) => {
        let result = await fetch(`http://localhost:8080/project/ingredients/id/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify()
        });
        if (result.ok) {
          let r = await result.json();
          return r;
        } 
      }
    },
    {
      path: 'regularuser',
      element: <ShowRegUsers />
    },
    {
      path: "regularuser/newregularuser",
      element: <RegUserForm />,
    },
    {
      path: 'regularuser/edit_regularuser/:id',
      element: <RegUserEdit />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        return fetch(`http://localhost:8080/project/regularuser/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: "regularuser/regularuser_details/:id",
      element: <RegUserDetails />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        // console.log(params.id);
        // console.log(params);
        return fetch(`http://localhost:8080/project/regularuser/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'chef',
      element: <ShowChefs />
    },
    {
      path: "chef/newChef",
      element: <ChefForm />,
    },
    {
      path: 'chef/edit_chef/:id',
      element: <ChefEdit />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        return fetch(`http://localhost:8080/project/chef/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: "chef/chef_details/:id",
      element: <ChefDetails />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        // console.log(params.id);
        // console.log(params);
        return fetch(`http://localhost:8080/project/chef/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'chefRecipes',
      element: <ChefRecipes />
    },
    ,
    {
      path: 'chefRecipes/edit_recipe/:id',
      element: <ChefRecipeEdit />,
      loader: async ({ params }) => {
        const user = check_login(['ROLE_ADMIN', 'ROLE_CHEF']);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    ,
    {
      path: 'chefRecipes/recipe_details/:id',
      element: <ChefRecipeDetails />,
      loader: async ({ params }) => {
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'chefRecipes/new_recipe',
      element: <ChefRecipeForm />
    },
  ]
}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
