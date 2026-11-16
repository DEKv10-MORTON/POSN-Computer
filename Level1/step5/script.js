let globalScore = 0;
let globalStreak = 0;

const cppStep5Quiz = [
  {
    sentence: "ในภาษา C++ ช่องแรกสุด (Index เริ่มต้น) ของอาเรย์ (Array) คือหมายเลขใด?",
    ans: "0",
    options: ["0", "1", "-1", "กำหนดเองได้เสมอ"],
    hint: "เรียกว่า Zero-based indexing",
    exp: "ตอบ <b>0</b> ช่องแรกสุดของอาเรย์ใน C++ จะเริ่มต้นที่ดัชนี (Index) 0 เสมอ"
  },
  {
    sentence: "ไลบรารีใดใน C++ ที่จำเป็นต้องประกาศใช้งานร่วมกับคำสั่ง sort() สำหรับจัดเรียงข้อมูล?",
    ans: "#include <algorithm>",
    options: ["#include &lt;algorithm&gt;", "#include &lt;vector&gt;", "#include &lt;math.h&gt;", "#include &lt;string&gt;"],
    hint: "รวมชุดคำสั่งการประมวลผล ค้นหา และจัดเรียง",
    exp: "ตอบ <b>#include &lt;algorithm&gt;</b> เป็นไลบรารีหลักที่มีฟังก์ชัน <code>sort()</code> ให้เรียกใช้งาน"
  },
  {
    sentence: "ข้อดีหลักของ vector &lt;int&gt; เมื่อเทียบกับอาเรย์แบบดั้งเดิมคืออะไร?",
    ans: "สามารถขยายหรือลดขนาดของอาเรย์ได้แบบไดนามิก (Dynamic Size)",
    options: [
      "สามารถขยายหรือลดขนาดของอาเรย์ได้แบบไดนามิก (Dynamic Size)",
      "ทำงานเร็วกว่าอาเรย์ปกติ 10 เท่าเสมอ",
      "ใช้หน่วยความจำน้อยกว่าเป็นศูนย์",
      "ไม่ต้องประกาศหัวข้อไลบรารี"
    ],
    hint: "ความยืดหยุ่นในการจัดการขนาดหน่วยความจำขณะโปรแกรมรัน",
    exp: "ตอบ <b>สามารถขยายหรือลดขนาดของอาเรย์ได้แบบไดนามิก</b> ทำให้สะดวกมากเวลาไม่รู้จำนวนข้อมูลล่วงหน้า"
  },
  {
    sentence: "หากต้องการตรวจสอบความยาว (จำนวนตัวอักษร) ของข้อความชนิด string s ในภาษา C++ ควรใช้คำสั่งใด?",
    ans: "s.length() หรือ s.size()",
    options: ["s.length() หรือ s.size()", "s.count()", "len(s)", "s.size_of()"],
    hint: "เป็นเมธอดมาตรฐานของสตริงใน C++",
    exp: "ตอบ <b>s.length() หรือ s.size()</b> ใช้ตรวจสอบจำนวนตัวอักษรของสตริงนั้นๆ"
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
    cppQueue = shuffle([...cppStep5Quiz]);
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
  cppQueue = shuffle([...cppStep5Quiz]);
  generateCppQuestion();
};