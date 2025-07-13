import { removeData } from "../storage/app.storage";

export const logout = () => {
  removeData("accessToken"); 
  window.location.href = "/login";        
};