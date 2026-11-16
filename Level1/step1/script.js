let globalScore = 0;
let globalStreak = 0;

const cppStep1Quiz = [
  {
    sentence: "คำสั่งใดใช้สำหรับนำเข้าไลบรารีรับ-ส่งข้อมูลพื้นฐาน (เช่น cout และ cin) ในภาษา C++?",
    ans: "#include &lt;iostream&gt;",
    options: ["#include &lt;iostream&gt;", "#include (stdio.h)", "import std.iostream;", "using namespace std;"],
    hint: "เป็นคำสั่ง Preprocessor Directive ที่ขึ้นต้นด้วย #",
    exp: "ตอบ <b>#include &lt;iostream&gt;</b> เป็นไลบรารีมาตรฐานสำหรับจัดการ Input/Output ใน C++"
  },
  {
    sentence: "ในภาษา C++ สัญลักษณ์ใดที่ใช้ปิดท้ายบรรทัดคำสั่งเกือบทุกบรรทัดเสมอ?",
    ans: "; (Semicolon)",
    options: ["; (Semicolon)", ": (Colon)", ". (Dot)", ", (Comma)"],
    hint: "หากขาดสัญลักษณ์นี้ คอมไพเลอร์จะขึ้นข้อผิดพลาด Compile Error ทันที",
    exp: "ตอบ <b>; (Semicolon)</b> คือสัญลักษณ์บังคับใช้บอกจุดสิ้นสุดของคำสั่งนั้นๆ ในภาษา C++"
  },
  {
    sentence: "จุดเริ่มต้นที่คอมพิวเตอร์จะเริ่มอ่านและทำงานตามโค้ด C++ คือฟังก์ชันใด?",
    ans: "int main()",
    options: ["int main()", "void start()", "function init()", "cpp_main()"],
    hint: "เรียกว่า Entry Point ของโปรแกรม C++",
    exp: "ตอบ <b>int main()</b> คือฟังก์ชันหลักที่ระบบปฏิบัติการจะเรียกใช้เป็นจุดแรกสุดเสมอ"
  },
  {
    sentence: "หากต้องการแสดงข้อความ 'Hello' ออกทางหน้าจอ ต้องใช้คำสั่งใดใน C++?",
    ans: "cout << \"Hello\";",
    options: ["cout << \"Hello\";", "cin >> \"Hello\";", "print(\"Hello\");", "console.log(\"Hello\");"],
    hint: "เครื่องหมายลูกศรจะชี้ออกจากตัวอักษรไปยังหน้าจอ (<<)",
    exp: "ตอบ <b>cout &lt;&lt; \"Hello\";</b> คำสั่ง <code>cout</code> ใช้แสดงผลข้อมูล และใช้เครื่องหมาย <code>&lt;&lt;</code> ในการส่งค่า"
  },
  {
    sentence: "สัญลักษณ์ใดใช้สำหรับเขียนคอมเมนต์บรรทัดเดียว (Single-line Comment) ในภาษา C++?",
    ans: "//",
    options: ["//", "/* ... */", "#", "--"],
    hint: "ใช้เครื่องหมายขีดทับสองครั้งติดกัน",
    exp: "ตอบ <b>//</b> ใช้สำหรับเขียนคอมเมนต์บรรทัดเดียว โค้ดส่วนนี้คอมไพเลอร์จะข้ามไปและไม่นำไปประมวลผล"
  },
  {
    sentence: "ภาษา C++ มีความไวต่อตัวพิมพ์เล็ก-พิมพ์ใหญ่ (Case-sensitive) คำว่า cout กับ COUT จะถือว่าเป็นสิ่งเดียวกันหรือไม่?",
    ans: "ไม่ใช่สิ่งเดียวกัน (คอมไพเลอร์จะฟ้อง Error)",
    options: ["ไม่ใช่สิ่งเดียวกัน (คอมไพเลอร์จะฟ้อง Error)", "เป็นสิ่งเดียวกัน", "ใช้แทนกันได้เสมอ", "ขึ้นอยู่กับระบบปฏิบัติการ"],
    hint: "C++ แยกแยะตัวอักษรพิมพ์เล็กและพิมพ์ใหญ่อย่างเข้มงวด",
    exp: "ตอบ <b>ไม่ใช่สิ่งเดียวกัน</b> C++ เป็น Case-sensitive ดังนั้น <code>cout</code> (พิมพ์เล็ก) ถึงจะถูกต้องตามมาตรฐาน"
  },
  {
    sentence: "คำสั่ง `return 0;` ในฟังก์ชัน `main()` มีความหมายหลักว่าอย่างไร?",
    ans: "บอกระบบว่าโปรแกรมทำงานจบสมบูรณ์ไม่มีข้อผิดพลาด",
    options: [
      "บอกระบบว่าโปรแกรมทำงานจบสมบูรณ์ไม่มีข้อผิดพลาด",
      "สั่งให้โปรแกรมวนลูปกลับไปเริ่มใหม่",
      "ล้างค่าหน่วยความจำทั้งหมดทันที",
      "เป็นการบังคับปิดหน้าจอคอมพิวเตอร์"
    ],
    hint: "ส่งค่ารหัสสถานะ (Exit Code 0) กลับไปยังระบบปฏิบัติการ",
    exp: "ตอบ <b>บอกระบบว่าโปรแกรมทำงานจบสมบูรณ์ไม่มีข้อผิดพลาด</b> เป็นการส่งค่า 0 กลับไปบอก OS ว่าโปรแกรมรันจบอย่างปกติ"
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
    cppQueue = shuffle([...cppStep1Quiz]);
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
  const isCorrect = selected === currentAns;
  document.querySelectorAll('#cpp-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentAns) b.classList.add('correct');
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
  generateCppQuestion();
};