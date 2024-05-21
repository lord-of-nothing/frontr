let galleryCurrentImage = 1;
const galleryImageCount = 6;
let isInverted = false;


// const gallery = document.querySelector(".gallery");
// const document = document.querySelector(".document");
// const pageContent = document.querySelector(".page-content");


function invert() {
  if (isInverted) {
    document.documentElement.classList.remove("inversion");
  } else {
    document.documentElement.classList.add("inversion");
  }
  isInverted = !isInverted;
}

function NextImage() {
  if (galleryCurrentImage === galleryImageCount - 1) {
    return;
  }

  const gallery = document.querySelector(".gallery");
  const leftImage = gallery.querySelector(".gallery__image-container_left");
  const rightImage = gallery.querySelector(".gallery__image-container_right");
  const nextImage = gallery.querySelector(".gallery__image-container_next");
  const prevImage = gallery.querySelector(".gallery__image-container_previous");
  const nextButton = gallery.querySelector(".gallery__move-button_right");
  const prevButton = gallery.querySelector(".gallery__move-button_left");

  nextButton.classList.remove("gallery__move-button_active");
  prevButton.classList.remove("gallery__move-button_active");
  nextButton.classList.add("gallery__move-button_inactive");
  prevButton.classList.add("gallery__move-button_inactive");

  leftImage.classList.add("gallery__animation_left-to-previous");
  rightImage.classList.add("gallery__animation_right-to-left");
  nextImage.classList.add("gallery__animation_next-to-right");

  setTimeout(() => {
    leftImage.classList.remove("gallery__animation_left-to-previous");
    rightImage.classList.remove("gallery__animation_right-to-left");
    nextImage.classList.remove("gallery__animation_next-to-right");
    prevImage.innerHTML = `<img src="images/${galleryCurrentImage}.webp" class="gallery__image"></img>`;
    leftImage.innerHTML = `<img src="images/${galleryCurrentImage + 1}.webp" class="gallery__image"></img>`;
    rightImage.innerHTML = `<img src="images/${galleryCurrentImage + 2}.webp" class="gallery__image"></img>`;
    nextImage.innerHTML = `<img src="images/${galleryCurrentImage + 3}.webp" class="gallery__image"></img>`;
    ++galleryCurrentImage;
    if (galleryCurrentImage < (galleryImageCount - 1)) {
      nextButton.classList.remove("gallery__move-button_inactive");
      nextButton.classList.add("gallery__move-button_active");
    }
    prevButton.classList.remove("gallery__move-button_inactive");
    prevButton.classList.add("gallery__move-button_active");
  }, 1000);
}

function PreviousImage() {
  if (galleryCurrentImage === 1) {
    return;
  }

  const gallery = document.querySelector(".gallery");
  const leftImage = gallery.querySelector(".gallery__image-container_left");
  const rightImage = gallery.querySelector(".gallery__image-container_right");
  const nextImage = gallery.querySelector(".gallery__image-container_next");
  const prevImage = gallery.querySelector(".gallery__image-container_previous");
  const nextButton = gallery.querySelector(".gallery__move-button_right");
  const prevButton = gallery.querySelector(".gallery__move-button_left");

  nextButton.classList.remove("gallery__move-button_active");
  prevButton.classList.remove("gallery__move-button_active");
  nextButton.classList.add("gallery__move-button_inactive");
  prevButton.classList.add("gallery__move-button_inactive");

  prevImage.classList.add("gallery__animation_previous-to-left");
  leftImage.classList.add("gallery__animation_left-to-right");
  rightImage.classList.add("gallery__animation_right-to-next");

  setTimeout(() => {
    prevImage.classList.remove("gallery__animation_previous-to-left");
    leftImage.classList.remove("gallery__animation_left-to-right");
    rightImage.classList.remove("gallery__animation_right-to-next");
    prevImage.innerHTML = `<img src="images/${galleryCurrentImage - 2}.webp" class="gallery__image"></img>`;
    leftImage.innerHTML = `<img src="images/${galleryCurrentImage - 1}.webp" class="gallery__image"></img>`;
    rightImage.innerHTML = `<img src="images/${galleryCurrentImage}.webp" class="gallery__image"></img>`;
    nextImage.innerHTML = `<img src="images/${galleryCurrentImage + 1}.webp" class="gallery__image"></img>`;
    nextButton.classList.remove("gallery__move-button_inactive");
    nextButton.classList.add("gallery__move-button_active");
    --galleryCurrentImage;
    if (galleryCurrentImage > 1) {
      prevButton.classList.remove("gallery__move-button_inactive");
      prevButton.classList.add("gallery__move-button_active");
    }
  }, 1000)
}

function initGallery() {
  document.querySelector(".gallery__move-button_right").addEventListener('click', NextImage);
  document.querySelector(".gallery__move-button_left").addEventListener('click', PreviousImage);
}

function OpenGallery() {
  const galleryModalContainer = document.querySelector(".gallery-modal-container");
  const galleryModal = document.querySelector(".gallery-modal__content");
  const arrowLeft = galleryModalContainer.querySelector(".gallery-modal-arrow_left");
  const arrowRight = galleryModalContainer.querySelector(".gallery-modal-arrow_right");

  const img = this.querySelector("img");
  const imgNumber = Number(img.getAttribute("src").slice(-6)[0]);
  if (imgNumber === galleryImageCount) {
    if (!isInverted) {
      invert();
    }
    return;
  }

  if (imgNumber === 1) {
    arrowLeft.classList.add("gallery-modal-arrow_disabled");
  }
  if (imgNumber === (galleryImageCount - 1)) {
    arrowRight.classList.add("gallery-modal-arrow_disabled");
  }
  document.documentElement.classList.add("page_inactive");
  galleryModalContainer.classList.add("modal_active");
  galleryModal.innerHTML = `<img src="${img.getAttribute('src')}" class="gallery__image"></img>`;
}

function CloseGallery() {
  const galleryModalContainer = document.querySelector(".gallery-modal-container");
  const galleryModal = document.querySelector(".gallery-modal__content");
  const arrowLeft = galleryModalContainer.querySelector(".gallery-modal-arrow_left");
  const arrowRight = galleryModalContainer.querySelector(".gallery-modal-arrow_right");

  galleryModalContainer.classList.add("hide");
  setTimeout(() => {
    galleryModalContainer.classList.remove("modal_active");
    document.querySelector(".page").classList.remove("page_inactive");
    galleryModal.innerHTML = ``;
    arrowLeft.classList.remove("gallery-modal-arrow_disabled");
    arrowRight.classList.remove("gallery-modal-arrow_disabled");
    galleryModalContainer.classList.remove("hide");
  }, 500);
}

function ModalNextImage(e) {
  const galleryModalContainer = document.querySelector(".gallery-modal-container");
  const galleryModal = document.querySelector(".gallery-modal__content");
  const arrowLeft = galleryModalContainer.querySelector(".gallery-modal-arrow_left");
  const arrowRight = galleryModalContainer.querySelector(".gallery-modal-arrow_right");

  e.stopPropagation();
  if (arrowRight.getAttribute("visibility") === "hidden") {
    return;
  }
  const middleman = galleryModalContainer.querySelector(".gallery-modal");
  middleman.classList.add("gallery-modal-switch");
  setTimeout(() => middleman.classList.remove("gallery-modal-switch"), 500);
  const img = galleryModal.querySelector("img");
  let imgNumber = Number(img.getAttribute("src").slice(-6)[0]);
  ++imgNumber;
  galleryModal.innerHTML = `<img src="images/${imgNumber}.webp" class="gallery__image"></img>`;
  arrowLeft.classList.remove("gallery-modal-arrow_disabled");
  if (imgNumber === (galleryImageCount - 1)) {
    arrowRight.classList.add("gallery-modal-arrow_disabled");
  }
}

function ModalPreviousImage(e) {
  const galleryModalContainer = document.querySelector(".gallery-modal-container");
  const galleryModal = document.querySelector(".gallery-modal__content");
  const arrowLeft = galleryModalContainer.querySelector(".gallery-modal-arrow_left");
  const arrowRight = galleryModalContainer.querySelector(".gallery-modal-arrow_right");

  e.stopPropagation();
  if (arrowLeft.getAttribute("visibility") === "hidden") {
    return;
  }
  const middleman = galleryModalContainer.querySelector(".gallery-modal");
  middleman.classList.add("gallery-modal-switch");
  setTimeout(() => middleman.classList.remove("gallery-modal-switch"), 500);
  const img = galleryModal.querySelector("img");
  let imgNumber = Number(img.getAttribute("src").slice(-6)[0]);
  --imgNumber;
  galleryModal.innerHTML = `<img src="images/${imgNumber}.webp" class="gallery__image"></img>`;
  arrowRight.classList.remove("gallery-modal-arrow_disabled");
  if (imgNumber === 1) {
    arrowLeft.classList.add("gallery-modal-arrow_disabled");
  }
}

function initGalleryModal() {
  const leftImage = document.querySelector(".gallery__image-container_left");
  const rightImage = document.querySelector(".gallery__image-container_right");
  const galleryModalContainer = document.querySelector(".gallery-modal-container");
  const galleryModal = document.querySelector(".gallery-modal__content");
  const arrowLeft = galleryModalContainer.querySelector(".gallery-modal-arrow_left");
  const arrowRight = galleryModalContainer.querySelector(".gallery-modal-arrow_right");

  leftImage.addEventListener("click", OpenGallery);
  rightImage.addEventListener("click", OpenGallery);
  galleryModalContainer.addEventListener("click", CloseGallery);
  galleryModal.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  });
  arrowRight.addEventListener('click', ModalNextImage);
  arrowLeft.addEventListener('click', ModalPreviousImage);

  for (let i = 1; i <= galleryImageCount; ++i) {
    document.querySelector(`.gallery-mobile__image_${i}`).addEventListener("click", OpenGallery);
  }
}

function feed() {
  const feedbackModalContainer = document.querySelector(".feedback-modal-container");
  const feedbackModal = document.querySelector(".feedback-modal");


  const feedback = feedbackModal.querySelector(".feedback");
  feedback.reset();
  const origForm = feedback.innerHTML;
  let fieldsGood = [false, false, false, false, false, false];

  function OpenForm() {
    document.querySelector(".page").classList.add("page_inactive");
    feedbackModalContainer.classList.add("modal_active");
  }

  function CloseForm() {
    feedbackModalContainer.classList.add("hide");
    setTimeout(() => {
      feedbackModalContainer.classList.remove("modal_active");
      feedback.reset();
      document.querySelector(".page").classList.remove("page_inactive");
      feedbackModalContainer.classList.remove("hide");
      feedback.innerHTML = origForm;
    }, 500);
  }

  function ToggleSubmit() {
    return (fieldsGood.every(c => c === true));;
  }

  function ValidateEmail() {
    const error = feedback.querySelector(".feedback__error_email");
    if (emailField.value && emailField.validity.valid) {
      error.classList.remove("feedback__error_active");
      fieldsGood[0] = true;
    } else {
      fieldsGood[0] = false;
      error.classList.add("feedback__error_active");
    }
    ToggleSubmit();
  }

  function ValidateSecret() {
    const error = feedback.querySelector(`.feedback__error_secret`);
    // from https://stackoverflow.com/a/57132397
    const regex = /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
    if (secretField.value && regex.test(secretField.value)) {
      error.classList.remove("feedback__error_active");
      fieldsGood[4] = true;
    } else {
      fieldsGood[4] = false;
      error.classList.add("feedback__error_active");
    }
    ToggleSubmit();
  }

  function ValidateName() {
    const error = feedback.querySelector(`.feedback__error_true-name`);
    if (nameField.value) {
      fieldsGood[1] = true;
      error.classList.remove("feedback__error_active");
    } else {
      fieldsGood[1] = false;
      error.classList.add("feedback__error_active");
    }
    ToggleSubmit();
  }

  function ValidateSong() {
    const error = feedback.querySelector(`.feedback__error_song`);
    if (feedback.querySelector("#artist").value && feedback.querySelector("#song").value) {
      fieldsGood[2] = true;
      error.classList.remove("feedback__error_active");
    } else {
      fieldsGood[2] = false;
      error.classList.add("feedback__error_active");
    }
    ToggleSubmit();
  }

  function ValidateColor() {
    const error = feedback.querySelector(`.feedback__error_color`);
    if (colorField.value !== "#000000") {
      fieldsGood[3] = true;
      error.classList.remove("feedback__error_active");
    } else {
      fieldsGood[3] = false;
      error.classList.add("feedback__error_active");
    }
    ToggleSubmit();
  }

  function ValidateOpinion() {
    const error = feedback.querySelector(`.feedback__error_joost`);
    console.log(opinionField.value.length);
    if (opinionField.value.length >= 135) {
      fieldsGood[5] = true;
      error.classList.remove("feedback__error_active");
    } else {
      fieldsGood[5] = false;
      error.classList.add("feedback__error_active");
    }
    ToggleSubmit();
  }

  function Validate() {
    ValidateEmail();
    ValidateName();
    ValidateSong();
    ValidateColor();
    ValidateSecret();
    ValidateOpinion();
    return ToggleSubmit();
  }

  const emailField = feedback.querySelector("#email");

  const nameField = feedback.querySelector("#true-name");

  const songField = feedback.querySelector("#song");

  const artistField = feedback.querySelector("#song");

  const colorField = feedback.querySelector("#color");

  const secretField = feedback.querySelector("#secret");

  const opinionField = feedback.querySelector("#joost");

  function submit() {
    submitButton.setAttribute("disabled", true);
    submitButton.textContent = "screaming...";
    const formData = new FormData(feedback);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      // body: formData,
      body: "",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          feedback.innerHTML = '<p class="feedback__paragraph">thank you for your service.</p>';
          setTimeout(() => {
            CloseForm();
          }, 3000);
        } else {
          submitButton.textContent = "no one heard you, try again";
        }
      })
      .then((json) => console.log(json));
  }

  const submitButton = feedback.querySelector(".feedback__button");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (Validate()) {
      submit();
    }
  })

  feedbackModalContainer.addEventListener("click", CloseForm);
  feedbackModal.addEventListener("click", (e) => {
    e.stopPropagation();
  })

  OpenForm();
}

function updateCountdown() {
  const target = new Date(Date.UTC(2038, 1, 19, 3, 14, 7));
  const now = new Date().getTime();
  let delta = target - now;

  const years = Math.floor(delta / (1000 * 60 * 60 * 24 * 365));
  delta -= years * (1000 * 60 * 60 * 24 * 365);
  const months = Math.floor(delta % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24 * 30));
  delta -= months * (1000 * 60 * 60 * 24 * 30);
  const days = Math.floor(delta % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));
  delta -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(delta % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  delta -= hours * ((1000 * 60 * 60));
  const minutes = Math.floor(delta % (1000 * 60 * 60) / (1000 * 60));
  delta -= minutes * (1000 * 60);
  const seconds = Math.floor(delta % (1000 * 60) / 1000);

  const yearBlock = document.querySelector(".countdown__block_type_year .countdown__number");
  yearBlock.textContent = years;
  const monthBlock = document.querySelector(".countdown__block_type_month .countdown__number");
  monthBlock.textContent = months;
  const dayBlock = document.querySelector(".countdown__block_type_day .countdown__number");
  dayBlock.textContent = days;
  const hourBlock = document.querySelector(".countdown__block_type_hour .countdown__number");
  hourBlock.textContent = hours;
  const minuteBlock = document.querySelector(".countdown__block_type_minute .countdown__number");
  minuteBlock.textContent = minutes;
  const secondBlock = document.querySelector(".countdown__block_type_second .countdown__number");
  secondBlock.textContent = seconds;
}

function popup() {
  const popupModalContainer = document.querySelector(".popup-modal-container");

  function showPopup() {
    document.querySelector(".page").classList.add("page_inactive");
    popupModalContainer.classList.add("modal_active");
    generateLabels();
  }

  function hidePopup() {
    popupModalContainer.classList.remove("modal_active");
    document.querySelector(".page").classList.remove("page_inactive");
    labelContainer.innerHTML = "";
    sessionStorage["seenPopup"] = true;
  }

  const labelContainer = popupModalContainer.querySelector(".popup-modal-labels");

  function generateLabels() {
    const prompt = "go away."
    for (let i = 0; i < 75; ++i) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const font = Math.random() * (50 - 20) + 20;
      labelContainer.insertAdjacentHTML("beforeend", `<p style="position: absolute; color: white; top: ${top}vh; left: ${left}vw; font-size: ${font}px;">${prompt}</p>`)
    }
  }

  const closeButton = popupModalContainer.querySelector(".popup-modal__button");
  closeButton.addEventListener("click", hidePopup);
  showPopup();
}

function init() {
  initGallery();
  initGalleryModal();

  document.querySelector(".form-invite__button").addEventListener("click", feed);

  updateCountdown();
  setInterval(updateCountdown, 1000);

  if (!sessionStorage["seenPopup"]) {
    setTimeout(popup, 30000);
  }

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    const scrolled = document.documentElement.scrollTop;

    if (scrolled >= window.innerHeight) {
      header.classList.add("header_sticky");
    } else {
      header.classList.remove("header_sticky");
    }
  })

  document.querySelector(".header__spiral").addEventListener("transitionend", () => {
    if (isInverted) {
      invert();
    }
  });
}

init();
