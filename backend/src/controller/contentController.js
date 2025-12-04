
export function GetRecipesByCategory(req, res, next){
  try{
    const category = req.query.category;

  }catch(error){
    next(error);
  }
}
export function GetRecipesById(req, res, next){
  try{
    const id = req.query.id;

  }catch(error){
    next(error);
  }
}
export function GetRecipesByName(req, res, next){
  try{
    const name = req.query.name;

  }catch(error){
    next(error);
  }
}
export function UploadRecipe(req, res, next){
  try{
    const {name, ingredients, descripiton, instructions} = req.body;

    

  }catch(error){
    next(error);
  }
}