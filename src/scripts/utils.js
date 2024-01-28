import { openPopup, сardPopup, profilePopup, avatarEditImage, nameInputNewCard, jobInputNewCard, inputList, buttonElement, profileTitle, profileDescription, profileForm, newCardForm } from "./modal.js";
import { toggleButtonState, clearValidation } from "./validation.js";
export function openAddCardModalWindow() {
    openPopup(сardPopup);
    clearValidation(newCardForm);
  }
  
  export function openEditAvatarWindow() {
    openPopup(avatarEditImage);
  }

  export function openProfileModalWindow() {
    openPopup(profilePopup);
  
    nameInputNewCard.value = profileTitle.textContent;
    jobInputNewCard.value = profileDescription.textContent;
  
    clearValidation(profileForm); 
    toggleButtonState(inputList, buttonElement);
  }