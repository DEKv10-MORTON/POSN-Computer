let globalScore = 0;
let globalStreak = 0;

const cppStep4Quiz = [
  {
    sentence: "หากเขียนคำสั่ง `for (int i = 0; i < 5; i++)` โค้ดที่อยู่ข้างในปีกกาจะทำงานทั้งหมดกี่รอบ?",
    ans: "5 รอบ",
    options: ["5 รอบ", "4 รอบ", "6 รอบ", "ทำซ้ำไม่สิ้นสุด"],
    hint: "ตัวแปร i เริ่มที่ 0 และทำตราบใดที่ i < 5 (ได้แก่ i = 0, 1, 2, 3, 4)",
    exp: "ตอบ <b>5 รอบ</b> ค่าของ i จะเป็น 0, 1, 2, 3, 4 เมื่อ i กลายเป็น 5 เงื่อนไขจะเป็นเท็จและออกจากลูป"
  },
  {
    sentence: "คำสั่งใดใช้สำหรับบังคับให้โปรแกรมกระโดดออกจากลูปสั่งการทันที โดยไม่ทำรอบที่เหลือต่อ?",
    ans: "break;",
    options: ["break;", "continue;", "exit(0);", "return;"],
    hint: "แปลว่า หัก หรือ หยุด การทำงานของลูป",
    exp: "ตอบ <b>break;</b> สั่งให้หยุดและออกจากโครงสร้างลูปทันที"
  },
  {
    sentence: "คำสั่งใดใช้ข้ามการทำงานส่วนที่เหลือในรอบปัจจุบัน แล้วกระโดดไปเริ่มวนลูปรอบถัดไปทันที?",
    ans: "continue;",
    options: ["continue;", "break;", "skip;", "next;"],
    hint: "แปลว่า ทำงานต่อ หรือ ข้ามไปรอบถัดไป",
    exp: "ตอบ <b>continue;</b> ข้ามโค้ดบรรทัดด้านล่างในรอบนั้น แล้วย้อนไปเช็กเงื่อนไขเริ่มรอบถัดไป"
  },
  {
    sentence: "หากเขียน `while (1)` หรือ `while (true)` โดยไม่มีคำสั่ง break อยู่ข้างใน จะเกิดผลลัพธ์อย่างไร?",
    ans: "เกิดลูปไม่สิ้นสุด (Infinite Loop)",
    options: [
      "เกิดลูปไม่สิ้นสุด (Infinite Loop)",
      "โปรแกรมจะไม่ทำงานเลย",
      "โปรแกรมทำงานเพียงรอบเดียว",
      "คอมไพเลอร์ฟ้อง Error"
    ],
    hint: "เงื่อนไขเป็นจริงเสมอ (True) ทำให้ไม่เคยหลุดออกจากลูป",
    exp: "ตอบ <b>เกิดลูปไม่สิ้นสุด (Infinite Loop)</b> เพราะเงื่อนไขในวงเล็บเป็นจริงตลอดเวลา"
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
    cppQueue = shuffle([...cppStep4Quiz]);
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
  cppQueue = shuffle([...cppStep4Quiz]);
  generateCppQuestion();
};