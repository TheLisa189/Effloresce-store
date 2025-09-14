const texts = {
  ru: {
    cartTitle: "Корзина",
    cartEmpty: "Корзина пуста",
    delete: "Удалить",
    promoValid: "Промокод действителен! Скидка 10% ✅",
    promoInvalid: "Неверный промокод ❌",
    promoEmpty: "Пожалуйста, введите промокод ❌",
    total: "Итого",
    enterPromo: "Введите промокод",
    applyPromo: "Применить"
  },
  ua: {
    cartTitle: "Кошик",
    cartEmpty: "Кошик порожній",
    delete: "Видалити",
    promoValid: "Промокод дійсний! Знижка 10% ✅",
    promoInvalid: "Невірний промокод ❌",
    promoEmpty: "Будь ласка, введіть промокод ❌",
    total: "Всього",
    enterPromo: "Введіть промокод",
    applyPromo: "Застосувати"
  },
  en: {
    cartTitle: "Cart",
    cartEmpty: "Cart is empty",
    delete: "Delete",
    promoValid: "Promo code applied! 10% discount ✅",
    promoInvalid: "Invalid promo code ❌",
    promoEmpty: "Please enter promo code ❌",
    total: "Total",
    enterPromo: "Enter promo code",
    applyPromo: "Apply"
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
    "Gentle, playful bouquet",
    "Airy, light bouquet",
    "Bright, cheerful bouquet",
    "Elegant bouquet in jellyfish style",
    "Strict, business bouquet",
    "Lush, sharp bouquet"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("language") || "ru";
  const t = texts[lang];
  const names = bouquetNames[lang];

  const h1 = document.querySelector("h1");
  if (h1) h1.textContent = t.cartTitle;

  const promoInput = document.getElementById("promo-code");
  const promoButton = document.getElementById("apply-promo");
  const promoMessage = document.getElementById("promo-message");

  if (promoInput) promoInput.placeholder = t.enterPromo;
  if (promoButton) promoButton.textContent = t.applyPromo;

  promoButton.addEventListener("click", () => {
    const code = promoInput.value.trim();
    if (code === "F10werPr0moSale4") {
      sessionStorage.setItem("promoApplied", "true");
      promoMessage.textContent = t.promoValid;
    } else if (code === "") {
      promoMessage.textContent = t.promoEmpty;
    } else {
      promoMessage.textContent = t.promoInvalid;
    }
    renderCart();
  });

  renderCart();
});

function renderCart() {
  const cartContainer = document.getElementById("cart");
  const totalContainer = document.getElementById("total");
  const lang = localStorage.getItem("language") || "ru";
  const t = texts[lang];
  const names = bouquetNames[lang];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const promoApplied = sessionStorage.getItem("promoApplied") === "true";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>${t.cartEmpty}</p>`;
    totalContainer.textContent = "";
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  if (promoApplied) total *= 0.9;

  cartContainer.innerHTML = cart.map((item, index) => {
    const bouquetName = names[index] || item.name;
    return `
      <div class="cart-item">
        <img src="${item.img}" width="80" alt="${bouquetName}">
        <span>${bouquetName} — ${item.price}₴</span>
        <button onclick="removeFromCart(${index})">${t.delete}</button>
      </div>
    `;
  }).join("");

  totalContainer.textContent = `${t.total}: ${total.toFixed(0)}₴`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
