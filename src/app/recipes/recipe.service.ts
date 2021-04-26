import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Lentil Soup', 
            "A tasty and warm recipe for the cold winter days", 
            "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg", 
            [ 
                new Ingredient('Lentils', 1), 
                new Ingredient('Onions', 2)
        ]),
        new Recipe(
            'Burger', 
            "Yummy lean burger", 
            "https://media.istockphoto.com/photos/hamburger-with-fries-picture-id617364554?k=6&m=617364554&s=612x612&w=0&h=BifDNyNdMMMPvE3q9MX3PmBPmmIfG_9v5jbarS7vHLo=", 
            [
                new Ingredient('Meat', .5),
                new Ingredient( 'Onion', 2)
            ]),
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
    //   get a copy only: 
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());

    }
}