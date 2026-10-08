// Begin visible entrances after the hero and fonts have finished loading.
const cover = document.querySelector(".cover");
function positionHeadlineBehindSofa() {
  const photo = cover.querySelector(document.documentElement.dataset.theme === "night" ? ".hero-photo.hero-night" : ".hero-photo.hero-day");
  if (!photo.naturalWidth) return;
  const width = cover.clientWidth;
  const height = cover.clientHeight;
  const scale = Math.max(width / photo.naturalWidth, height / photo.naturalHeight);
  const photoHeight = photo.naturalHeight * scale;
  const sofaTop = (height - photoHeight) / 2 + photoHeight * .57;
  const headline = cover.querySelector(".cover-headline");
  const mainText = cover.querySelector(".headline-main");
  const fontSize = parseFloat(getComputedStyle(mainText).fontSize);
  const top = sofaTop + fontSize * .25 - headline.offsetHeight;
  cover.style.setProperty("--headline-top", `${Math.max(150, top)}px`);
}
new ResizeObserver(positionHeadlineBehindSofa).observe(cover);
new MutationObserver(positionHeadlineBehindSofa).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
async function startCoverMotion() {
  await document.fonts.ready;
  positionHeadlineBehindSofa();
  requestAnimationFrame(() => {
    cover.classList.add("motion-ready");
    document.documentElement.classList.remove("motion-pending");
  });
}
if (document.readyState === "complete") startCoverMotion();
else window.addEventListener("load", startCoverMotion, { once: true });

document.querySelectorAll("[data-theme-toggle]").forEach(button => {
  button.addEventListener("click", () => {
    const animated = cover.querySelectorAll(".brand, .headline-intro, .headline-main");
    animated.forEach(element => { element.style.animation = "none"; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      animated.forEach(element => { element.style.animation = ""; });
    }));
  });
});

// Verified contact details only. Fill the two empty values when supplied by the studio.
const studioContact = { email: "", facebook: "" };

const dialog = document.querySelector("#contact-dialog");
const form = document.querySelector("#contact-form");
const note = document.querySelector("#form-note");
let contactOpener;

if (studioContact.facebook) {
  document.querySelectorAll("[data-facebook]").forEach(link => {
    link.href = studioContact.facebook;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
    link.setAttribute("aria-label", "Primo Studio na Facebooku (nowa karta)");
    link.title = "Facebook";
  });
}

if (studioContact.email) {
  document.querySelectorAll("[data-email]").forEach(link => {
    link.href = `mailto:${studioContact.email}`;
    link.removeAttribute("aria-disabled");
  });
  document.querySelector("[data-email-label]").textContent = studioContact.email;
  form.querySelector("button[type=submit]").disabled = false;
  note.textContent = "Formularz otworzy gotową wiadomość w Twojej aplikacji pocztowej.";
}

document.querySelectorAll("[data-open-contact]").forEach(link => {
  link.addEventListener("click", event => {
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    contactOpener = link;
    dialog.showModal();
    document.body.classList.add("contact-open");
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("contact-open");
  contactOpener?.focus();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!studioContact.email || !form.reportValidity()) return;
  const data = new FormData(form);
  const subject = "Porozmawiajmy o moim wnętrzu — Primo Studio";
  const body = `Imię: ${data.get("name")}\nE-mail do odpowiedzi: ${data.get("email")}\n\n${data.get("message")}`;
  window.location.href = `mailto:${studioContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
