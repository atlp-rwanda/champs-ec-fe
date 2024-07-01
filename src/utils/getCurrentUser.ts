export const getCurrentUser = ():string | null  =>{
   const userLocalStorage = localStorage.getItem("profile");
   if(userLocalStorage){
    const user = JSON.parse(userLocalStorage);
    return user.id;
   }
   return null;
}