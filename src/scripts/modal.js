function handleOverlayClick(event) {
  const popupContent = event.currentTarget.querySelector(".popup__content");
  const isClickPopup = popupContent.contains(event.target);
  if (!isClickPopup) {
    closePopup(event.currentTarget);
  }
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscape);
}