const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let history = []; 

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// '=' 버튼 클릭 시 계산 실행 및 기록 저장
equalsButton.addEventListener('click', () => {
    try {
        const result = eval(currentInput);
        history.push(`${currentInput}=${result}`); // 계산 기록을 '수식=결과' 형식으로 저장
        updateDisplay(result);
        currentInput = result.toString();
        updateHistory();
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
    }
});

clearButton.addEventListener('click', () => {
    currentInput = '';
    updateDisplay(0);
});

// 계산기 디스플레이 업데이트
function updateDisplay(value) {
    display.textContent = value;
}

// 계산 기록 표시
document.getElementById('view-history').addEventListener('click', () => {
    const historyContainer = document.getElementById('history-container');
    historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
    updateHistory();
});

// 계산 기록 업데이트 함수
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // 기존 기록 초기화
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item; // 계산 기록을 리스트 아이템으로 추가
        historyList.appendChild(li);
    });
}

// 다크모드 전환 버튼 기능
const toggleThemeButton = document.getElementById('toggle-theme');

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});