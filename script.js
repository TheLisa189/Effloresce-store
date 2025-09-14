const indexTexts = {
  ru: {
    shopTitle: "Магазин цветов",
    description: "Наш магазин цветов в Жмеринке выполняет доставку букетов на любой адрес города в самые сжатые сроки. Цветочный магазин работает ежедневно, поэтому заказать цветы с доставкой по Жмеринке можно в любой день.",
    socialTitle: "Социальные сети",
    socialInstagram: "EffloresceStore (Instagram)",
    socialFacebook: "EffloresceStore (Facebook)",
    socialAddress: "Zmerynka, vul. Shevchenka 5"
  },
  ua: {
    shopTitle: "Магазин квітів",
    description: "Наш магазин квітів у Жмеринці виконує доставку букетів на будь-яку адресу міста у найкоротші терміни. Квітковий магазин працює щодня, тому замовити квіти з доставкою по Жмеринці можна у будь-який день.",
    socialTitle: "Соціальні мережі",
    socialInstagram: "EffloresceStore (Instagram)",
    socialFacebook: "EffloresceStore (Facebook)",
    socialAddress: "Zmerynka, vul. Shevchenka 5"
  },
  en: {
    shopTitle: "Flower Shop",
    description: "Our flower shop in Zhmerynka delivers bouquets to any city address in the shortest possible time. The flower shop operates daily, so you can order flowers with delivery any day.",
    socialTitle: "Social Networks",
    socialInstagram: "EffloresceStore (Instagram)",
    socialFacebook: "EffloresceStore (Facebook)",
    socialAddress: "Zmerynka, vul. Shevchenka 5"
  }
};

const bouquetNames = {
  ru: [
    "Нежный, игривый букет",
    "Воздушный, лёгкий букет",
    "Яркий, задорный букет",
    "Элегантный букет в стиле медузы",
    "Строгий, деловой букет",
    "Пышный, острый букет"
  ],
  ua: [
    "Ніжний, грайливий букет",
    "Повітряний, легкий букет",
    "Яскравий, заводний букет",
    "Елегантний букет у стилі медузи",
    "Суворий, діловий букет",
    "Пишний, гострий букет"
  ],
  en: [
    "Tender, playful bouquet",
    "Airy, light bouquet",
    "Bright, cheerful bouquet",
    "Elegant bouquet in jellyfish style",
    "Strict, business bouquet",
    "Lush, sharp bouquet"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  
  const lang = localStorage.getItem("language") || "ru";
  const t = indexTexts[lang];

  const shopTitle = document.querySelector("header h1");
  const description = document.querySelector(".description p");
  const socialTitle = document.querySelector(".social h2");
  const socialItems = document.querySelectorAll(".social ul li");

  if (shopTitle) shopTitle.textContent = t.shopTitle;
  if (description) description.textContent = t.description;
  if (socialTitle) socialTitle.textContent = t.socialTitle;
  if (socialItems.length >= 3) {
    socialItems[0].textContent = t.socialInstagram;
    socialItems[1].textContent = t.socialFacebook;
    socialItems[2].textContent = t.socialAddress;
  }

  const bouquetElements = document.querySelectorAll(".bouquet .bouquet-name");
  const names = bouquetNames[lang];
  bouquetElements.forEach((el, index) => {
    if (names[index]) el.textContent = names[index];
  });

  const buttons = document.querySelectorAll(".order-button");
  const prices = [980, 600, 1080, 1200, 580, 1500];

  buttons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      const bouquet = event.target.closest(".bouquet");
      const name = bouquet.querySelector(".bouquet-name").textContent;
      const img = bouquet.querySelector("img").src;
      const price = prices[index];

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, img, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      window.location.href = "cart.html";
    });
  });

  const icons = document.querySelectorAll(".icons-section");
  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      const action = icon.getAttribute("data-action");
      switch(action) {
        case "home": window.location.href = "index.html"; break;
        case "settings": window.location.href = "settings.html"; break;
        case "cart": window.location.href = "cart.html"; break;
      }
    });
  });
});
