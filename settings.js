const settingsTexts = {
  ru: {
    title: "Настройки",
    backHome: "Вернуться на главную"
  },
  ua: {
    title: "Налаштування",
    backHome: "Повернутися на головну"
  },
  en: {
    title: "Settings",
    backHome: "Back to Home"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-button");
  const title = document.getElementById("settings-title");
  const backHome = document.getElementById("back-home-text");

  const currentLang = localStorage.getItem("language") || "ru";
  const t = settingsTexts[currentLang];
  title.textContent = t.title;
  backHome.textContent = t.backHome;

  langButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedLang = button.getAttribute("data-lang");
      localStorage.setItem("language", selectedLang);

      const newTexts = settingsTexts[selectedLang];
      title.textContent = newTexts.title;
      backHome.textContent = newTexts.backHome;

    });
  });
});
