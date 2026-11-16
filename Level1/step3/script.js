let globalScore = 0;
let globalStreak = 0;

const cppStep3Quiz = [
  {
    sentence: "เครื่องหมายในข้อใดใช้แทนตรรกะ AND (และ) สำหรับเชื่อมเงื่อนไขในภาษา C++?",
    ans: "&&",
    options: ["&&", "||", "!", "=="],
    hint: "ใช้ตัวอักษรแอม퍼ซันต์ (Ampersand) เบิ้ลสองครั้ง",
    exp: "ตอบ <b>&amp;&amp;</b> ใช้แทนเงื่อนไขแบบ AND ซึ่งจะเป็นจริงก็ต่อเมื่อทุกเงื่อนไขรอบข้างเป็นจริงทั้งหมด"
  },
  {
    sentence: "หากต้องการตรวจสอบว่าตัวแปร x มีค่าเท่ากับ 10 หรือไม่ ต้องเขียนสัญลักษณ์เปรียบเทียบข้อใดในคำสั่ง if?",
    ans: "x == 10",
    options: ["x == 10", "x = 10", "x === 10", "x != 10"],
    hint: "เครื่องหมายเท่ากับสองตัวติดกันใช้เช็กความเท่ากัน ส่วนตัวเดียวใช้กำหนดค่า",
    exp: "ตอบ <b>x == 10</b> ใช้เครื่องหมายเท่ากับสองตัว <code>==</code> ในการเปรียบเทียบค่า"
  },
  {
    sentence: "เครื่องหมายใดใช้แทนตรรกะ OR (หรือ) ในภาษา C++?",
    ans: "||",
    options: ["||", "&&", "!", "+"],
    hint: "เป็นขีดตั้งตรงสองขีด (Pipe)",
    exp: "ตอบ <b>||</b> ใช้แทนตรรกะ OR ซึ่งจะเป็นจริงหากมีเงื่อนไขใดเงื่อนไขหนึ่งเป็นจริง"
  },
  {
    sentence: "คำสั่งใดใช้สำหรับตรวจสอบทางเลือกสำรองสุดท้าย หากเงื่อนไขด้านบนทั้งหมดไม่เป็นจริง?",
    ans: "else",
    options: ["else", "elseif", "otherwise", "default_if"],
    hint: "ไม่ต้องใส่เงื่อนไขวงเล็บตามหลัง ดักรับทุกกรณีที่เหลือ",
    exp: "ตอบ <b>else</b> ใช้เป็นทางเลือกสุดท้ายเมื่อไม่มีเงื่อนไขใดในกลุ่ม if / else if เป็นจริงเลย"
  }
];

let cppQueue = [];
let currentAns = "";
let currentExp = "";

function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
  btnEl?.classList.add('active');
}

function updateScoreBoard(isCorrect) {
  if (isCorrect) {
    globalScore += 10;
    globalStreak++;
  } else {
    globalStreak = 0;
  }
  document.getElementById('score-val').innerText = globalScore;
  document.getElementById('streak-val').innerText = globalStreak;
}

function generateCppQuestion() {
  if (cppQueue.length === 0) {
    cppQueue = shuffle([...cppStep3Quiz]);
  }

  const qData = cppQueue.pop();
  currentAns = qData.ans;
  currentExp = qData.exp;

  document.getElementById('cpp-q-text').innerText = qData.sentence;
  document.getElementById('cpp-q-hint').innerText = `คำใบ้: ${qData.hint}`;
  document.getElementById('cpp-feedback').classList.add('hidden');
  document.getElementById('cpp-next-btn').classList.add('hidden');

  const container = document.getElementById('cpp-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkAnswer(selected, btn) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = selected;
  const decodedSelected = tempDiv.innerText.trim();

  const isCorrect = decodedSelected === currentAns;

  document.querySelectorAll('#cpp-options-container .option-btn').forEach(b => {
    b.disabled = true;
    tempDiv.innerHTML = b.innerHTML;
    if (tempDiv.innerText.trim().includes(currentAns)) {
      b.classList.add('correct');
    }
  });

  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('cpp-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('cpp-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้อง!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('cpp-fb-desc').innerHTML = currentExp;

  document.getElementById('cpp-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  cppQueue = shuffle([...cppStep3Quiz]);
  generateCppQuestion();
};