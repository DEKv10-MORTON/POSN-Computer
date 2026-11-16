let globalScore = 0;
let globalStreak = 0;

const cppStep2Quiz = [
  {
    sentence: "หากโจทย์ สอวน. กำหนดให้รับค่าตัวเลขจำนวนเต็มที่มีค่ามหาศาล (เช่น สูงถึง 10¹⁸) ควรเลือกใช้ชนิดตัวแปรใดเพื่อป้องกันค่าล้น (Integer Overflow)?",
    ans: "long long",
    options: ["int", "long long", "short", "double"],
    hint: "เป็นชนิดข้อมูลจำนวนเต็มที่จองพื้นที่หน่วยความจำมากกว่า int ปกติ",
    exp: "ตอบ <b>long long</b> เหมาะสำหรับเก็บเลขจำนวนเต็มค่ามากๆ ในโจทย์แข่งขันเพื่อกันค่าล้น"
  },
  {
    sentence: "คำสั่งใดในภาษา C++ ที่ใช้สำหรับรับค่าข้อมูลจากคีย์บอร์ดเข้ามาเก็บไว้ในตัวแปร x?",
    ans: "cin >> x;",
    options: ["cin &gt;&gt; x;", "cout &lt;&lt; x;", "scanf(x);", "input(x);"],
    hint: "ใช้เครื่องหมายลูกศรชี้เข้าหาตัวแปร (>>)",
    exp: "ตอบ <b>cin &gt;&gt; x;</b> ใช้คู่กับเครื่องหมาย <code>&gt;&gt;</code> เพื่อรับค่าจาก Standard Input"
  },
  {
    sentence: "ข้อใดคือชุดคำสั่งเทคนิคที่นิยมใส่ไว้ใน int main() เพื่อเร่งความเร็วในการรับ-ส่งข้อมูล (Fast I/O) สำหรับงานแข่ง สอวน.?",
    ans: "ios_base::sync_with_stdio(false); cin.tie(NULL);",
    options: [
      "ios_base::sync_with_stdio(false); cin.tie(NULL);",
      "fast_io = true;",
      "speed_up_io();",
      "include (fast_io.h)"
    ],
    hint: "เป็นการปิดการซิงค์กับมาตรฐาน C เพื่อลดเวลาการทำงานของ I/O",
    exp: "ตอบ <b>ios_base::sync_with_stdio(false); cin.tie(NULL);</b> ช่วยเร่งความเร็วการทำงานเมื่อข้อมูลทดสอบมีขนาดใหญ่มาก"
  },
  {
    sentence: "หากต้องการประกาศตัวแปรเพื่อเก็บตัวอักษรภาษาอังกฤษเพียง 1 ตัว (เช่น 'A') ควรใช้ชนิดข้อมูลใด?",
    ans: "char",
    options: ["char", "string", "int", "bool"],
    hint: "ย่อมาจากคำว่า Character และใช้เครื่องหมาย Single Quote ('')",
    exp: "ตอบ <b>char</b> ใช้สำหรับเก็บตัวอักษรเดี่ยวๆ 1 ตัว เช่น <code>char grade = 'A';</code>"
  },
  {
    sentence: "หากต้องการแสดงผลค่าตัวแปร score และขึ้นบรรทัดใหม่ คำสั่งใดเขียนได้ถูกต้อง?",
    ans: "cout << score << \"\\n\";",
    options: [
      "cout &lt;&lt; score &lt;&lt; \"\\n\";",
      "cin &gt;&gt; score &gt;&gt; \"\\n\";",
      "print(score + \"\\n\");",
      "cout &gt;&gt; score &gt;&gt; endl;"
    ],
    hint: "ใช้ cout คู่กับเครื่องหมาย << และส่งผ่านการขึ้นบรรทัดใหม่ด้วย \\n หรือ endl",
    exp: "ตอบ <b>cout &lt;&lt; score &lt;&lt; \"\\n\";</b> เขียนได้ถูกต้อง และการใช้ <code>\\n</code> รันเร็วกว่า <code>endl</code> เล็กน้อย"
  },
  {
    sentence: "ชนิดข้อมูล double ในภาษา C++ ใช้สำหรับจัดเก็บข้อมูลประเภทใด?",
    ans: "ตัวเลขทศนิยม",
    options: ["ตัวเลขทศนิยม", "ตัวเลขจำนวนเต็มลบเท่านั้น", "ข้อความยาว", "ค่าความจริง True/False"],
    hint: "เช่น ค่า 3.14159 หรือ 99.50",
    exp: "ตอบ <b>ตัวเลขทศนิยม</b> <code>double</code> ใช้เก็บตัวเลขที่มีจุดทศนิยมได้อย่างแม่นยำ"
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
    cppQueue = shuffle([...cppStep2Quiz]);
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
  // สร้าง element ชั่วคราวเพื่อแปลง HTML Entities กลับมาเป็นข้อความปกติสำหรับการเปรียบเทียบ
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
  generateCppQuestion();
};