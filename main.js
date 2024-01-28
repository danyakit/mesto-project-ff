(()=>{"use strict";function e(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input-error"),n.classList.remove("popup__input-error_active"),n.textContent=""}function t(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button_disabled")):(t.disabled=!0,t.classList.add("popup__button_disabled"))}function n(n){var r=Array.from(n.querySelectorAll(".popup__input")),o=n.querySelector(".popup__button");r.forEach((function(t){e(n,t)})),t(r,o)}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"02a29a47-c4b8-4283-90ff-394df3316f4b","Content-Type":"application/json"}},o=function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},c=function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},u=function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},a=document.querySelector(".places__list"),i=document.querySelector(".popup_type_edit .popup__form"),l=document.querySelector(".popup_type_new-card .popup__form"),s=document.querySelector(".edit__avatar .popup__form"),p=document.querySelector(".popup__input_type_name"),d=document.querySelector(".popup__input_type_description"),f=document.querySelector(".popup__input_type_card-name"),_=document.querySelector(".popup__input_type_url"),m=document.querySelector(".popup__input_type_url-avatar"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_image"),S=h.querySelector(".popup__image"),b=h.querySelector(".popup__caption"),q=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),k=document.querySelector(".edit__avatar"),E=Array.from(i.querySelectorAll(".popup__input")),L=i.querySelector(".popup__button"),C=document.querySelector(".profile__image");function j(e){e.currentTarget.querySelector(".popup__content").contains(e.target)||P(e.currentTarget)}function A(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&P(t)}}function x(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),e.addEventListener("click",j),document.addEventListener("keydown",A)}function P(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",j),document.removeEventListener("keydown",A)}function T(e,t,n,r,o){var c=document.getElementById("card-template"),u=document.importNode(c.content,!0).querySelector(".card");u.dataset.cardId=e._id;var a=u.querySelector(".card__title"),i=u.querySelector(".card__image"),l=u.querySelector(".card__like-count");a.textContent=e.name,i.src=e.link,i.alt=e.name,l.textContent=e.likes.length;var s=u.querySelector(".card__delete-button");return o?s.addEventListener("click",(function(){t(u,e._id)})):s.style.display="none",u.querySelector(".card__like-button").addEventListener("click",(function(t){n(t,l,e._id)})),i.addEventListener("click",(function(){r(e.link,e.name)})),u}function U(e,t){o(t).then((function(){e.remove()})).catch((function(e){console.error(e)}))}function w(e,t,n){e.target.classList.contains("card__like-button_is-active")?u(n).then((function(n){O(e.target,t,n.likes.length)})).catch((function(e){console.log(e)})):c(n).then((function(n){O(e.target,t,n.likes.length)})).catch((function(e){console.log(e)}))}function O(e,t,n){e.classList.toggle("card__like-button_is-active"),t.textContent=n}function D(e,t){!function(e,t){S.src=e,S.alt=t,b.textContent=t,x(h)}(e,t)}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var M,N=document.querySelector(".profile__title"),B=document.querySelector(".profile__description"),J=document.querySelector(".profile__image");function H(e){Array.isArray(e)&&e.forEach((function(e){var t=T(e,U,w,D,!1);a.appendChild(t)}))}i.addEventListener("submit",(function(e){e.preventDefault();var t,n=p.value,o=d.value;L.textContent="Сохранение...",(t={name:n,about:o},fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){q.textContent=e.name,g.textContent=e.about,P(v),i.reset()})).catch((function(e){console.log(e)})).finally((function(){L.textContent="Сохранить"}))})),l.addEventListener("submit",(function(e){e.preventDefault();var n,o={name:f.value,link:_.value};L.textContent="Сохранение...",(n=o,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var n=T(e,U,w,D,!0);a.prepend(n),P(y),l.reset(),t(Array.from(l.querySelectorAll(".popup__input")),L)})).catch((function(e){console.error(e)})).finally((function(){L.textContent="Сохранить"}))})),s.addEventListener("submit",(function(e){e.preventDefault();var t=m.value;L.textContent="Сохранение...",function(e){return fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){console.log("Аватар успешно обновлен:",e),C.style.backgroundImage="url(".concat(t,")"),P(k),s.reset()})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})).finally((function(){L.textContent="Сохранить"}))})),document.querySelector(".profile__add-button").addEventListener("click",(function(){x(y),n(l)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){x(v),p.value=q.textContent,d.value=g.textContent,n(i),t(E,L)})),document.querySelector(".profile__image").addEventListener("click",(function(){x(k)})),document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return P(t)}))})),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(M.formSelector)).forEach((function(n){n.addEventListener("submit",(function(e){e.preventDefault()})),function(n){var r=Array.from(n.querySelectorAll(".popup__input")),o=n.querySelector(".popup__button");t(r,o),r.forEach((function(c){c.addEventListener("input",(function(){!function(t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?e(t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input-error"),r.textContent=n,r.classList.add("popup__input-error_active")}(t,n,n.validationMessage)}(n,c),t(r,o)}))}))}(n)})),n(i),document.addEventListener("DOMContentLoaded",(function(){Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return Array.isArray(e)?e:Promise.reject("Данные не являются массивом")}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];!function(e){N.textContent=e.name,B.textContent=e.about,J.style.backgroundImage="url(".concat(e.avatar,")")}(o),H(c)})).catch((function(e){console.error("Ошибка при получении данных:",e)}))})),H()})();