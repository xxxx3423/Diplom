const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// ===== ВІДКРИТТЯ ЧАТУ =====
chatToggle.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");

  if (!chatBox.classList.contains("hidden") && !chatMessages.dataset.started) {

    botMessage("Вітаємо у готелі «Затишок»");
    
    setTimeout(() => {
      botMessage("Оберіть популярне питання або напишіть своє повідомлення 👇");
      quickButtons();
    }, 700);

    chatMessages.dataset.started = "true";
  }
});

// ===== НАДСИЛАННЯ =====
sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ===== ФУНКЦІЯ ВІДПРАВКИ =====
function sendMessage() {

  const msg = chatInput.value.trim();

  if (!msg) return;

  appendMessage("you", msg);

  chatInput.value = "";

  setTimeout(() => {
    botReply(msg.toLowerCase());
  }, 700);
}

// ===== ДОДАТИ ПОВІДОМЛЕННЯ =====
function appendMessage(type, text) {

  const msgDiv = document.createElement("div");

  msgDiv.classList.add("message", type);

  msgDiv.innerHTML = text;

  chatMessages.appendChild(msgDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== ПОВІДОМЛЕННЯ БОТА =====
function botMessage(text) {
  appendMessage("bot", text);
}

// ===== ВІДПОВІДІ БОТА =====
function botReply(msg) {

  // ===== ЧАС ЗАЇЗДУ =====
  if (msg.includes("заїзд") || msg.includes("check in")) {

    botMessage(`
      <strong>🕑 Час заїзду</strong><br>
      Заїзд у готель можливий з <b>14:00</b>.
    `);

    returnButtons();
    return;
  }

  // ===== ЧАС ВИЇЗДУ =====
  if (msg.includes("виїзд") || msg.includes("check out")) {

    botMessage(`
      <strong>🕛 Час виїзду</strong><br>
      Виїзд здійснюється до <b>12:00</b>.
    `);

    returnButtons();
    return;
  }

  // ===== СНІДАНОК =====
  if (msg.includes("снідан")) {

    botMessage(`
      <strong>🍳 Сніданок</strong><br>
      Сніданок включений у вартість проживання.<br>
      Час подачі: <b>07:00 – 10:30</b>.
    `);

    returnButtons();
    return;
  }

  // ===== ПАРКОВКА =====
  if (msg.includes("парков")) {

    botMessage(`
      <strong>🚗 Парковка</strong><br>
      Для гостей доступна <b>безкоштовна парковка</b>.
    `);

    returnButtons();
    return;
  }

  // ===== РЕСТОРАН =====
  if (
    msg.includes("ресторан") ||
    msg.includes("їжа") ||
    msg.includes("food")
  ) {

    botMessage(`
      <strong>🍽 Ресторан</strong><br>
      На території готелю працює ресторан української та європейської кухні.
    `);

    returnButtons();
    return;
  }

  // ===== ТВАРИНИ =====
  if (
    msg.includes("тварин") ||
    msg.includes("pets") ||
    msg.includes("собак") ||
    msg.includes("кот")
  ) {

    botMessage(`
      <strong>🐾 Домашні тварини</strong><br>
      Проживання з тваринами можливе за попереднім узгодженням.
    `);

    returnButtons();
    return;
  }

  // ===== ТРАНСФЕР =====
  if (
    msg.includes("трансфер") ||
    msg.includes("airport")
  ) {

    botMessage(`
      <strong>🚐 Трансфер</strong><br>
      Ми можемо організувати трансфер з вокзалу або аеропорту.
    `);

    returnButtons();
    return;
  }

  // ===== WIFI =====
  if (
    msg.includes("wifi") ||
    msg.includes("wi-fi")
  ) {

    botMessage(`
      <strong>📶 Wi-Fi</strong><br>
      Безкоштовний Wi-Fi доступний на всій території готелю.
    `);

    returnButtons();
    return;
  }

  // ===== АДРЕСА =====
  if (
    msg.includes("адрес") ||
    msg.includes("де") ||
    msg.includes("локац")
  ) {

    botMessage(`
      <strong>📍 Адреса</strong><br>
      м. Львів, вул. Центральна, 10
    `);

    returnButtons();
    return;
  }

  // ===== КОНТАКТИ =====
  if (
    msg.includes("контакт") ||
    msg.includes("телефон") ||
    msg.includes("підтрим")
  ) {

    botMessage(`
      <strong>📞 Підтримка</strong><br>
      Телефон: +380 50 887 57 67<br>
      Email: info@zatyshok.ua
    `);

    returnButtons();
    return;
  }

  // ===== SPA =====
  if (
    msg.includes("spa") ||
    msg.includes("спа")
  ) {

    botMessage(`
      <strong>💆 SPA & Wellness</strong><br>
      SPA-зона працює щодня з <b>09:00 до 22:00</b>.
    `);

    returnButtons();
    return;
  }

  // ===== ПРИВІТАННЯ =====
  if (
    msg.includes("прив") ||
    msg.includes("hello") ||
    msg.includes("hi")
  ) {

    botMessage(`
      👋 Вітаємо! Раді бачити вас у готелі «Затишок».
    `);

    returnButtons();
    return;
  }

  // ===== ЯКЩО НЕ ЗНАЙШОВ =====
  botMessage(`
    ✨ Дякуємо за повідомлення!<br>
    Наш адміністратор скоро зв’яжеться з вами.
  `);

  returnButtons();
}

// ===== FAQ КНОПКИ =====
function quickButtons() {

  const oldButtons = document.querySelector(".quick-buttons");

  if (oldButtons) oldButtons.remove();

  const wrapper = document.createElement("div");

  wrapper.classList.add("quick-buttons");

  // ===== ЗАГОЛОВОК FAQ =====
  const title = document.createElement("div");

  title.classList.add("faq-title");

  title.innerHTML = `
    <i class="fas fa-circle-question"></i>
    Часті запитання
  `;

  wrapper.appendChild(title);

  // ===== КНОПКИ =====
  const buttonsWrap = document.createElement("div");

  buttonsWrap.classList.add("faq-buttons");

  const buttons = [
    "Час заїзду",
    "Час виїзду",
    "Сніданок",
    "Парковка",
    "Ресторан",
    "Домашні тварини",
    "Трансфер",
    "Wi-Fi",
    "SPA",
    "Адреса",
    "Підтримка"
  ];

  buttons.forEach(text => {

    const btn = document.createElement("button");

    btn.classList.add("faq-btn");

    btn.innerHTML = `
      <i class="fas fa-angle-right"></i>
      ${text}
    `;

    btn.addEventListener("click", () => {

      appendMessage("you", text);

      wrapper.remove();

      botReply(text.toLowerCase());
    });

    buttonsWrap.appendChild(btn);
  });

  wrapper.appendChild(buttonsWrap);

  chatMessages.appendChild(wrapper);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== ПОВЕРНУТИ FAQ =====
function returnButtons() {
  setTimeout(() => {
    quickButtons();
  }, 700);
}