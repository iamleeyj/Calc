const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value) {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Handle equals button
equalsButton.addEventListener('click', () => {
    try {
        const result = eval(currentInput);
        updateDisplay(result);
        currentInput = result.toString();
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
    }
});

// Handle clear button
clearButton.addEventListener('click', () => {
    currentInput = '';
    updateDisplay(0);
});

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

let history = []; // 계산 기록을 저장할 배열

// 'View History' 버튼 클릭 시 기록 표시
document.getElementById('view-history').addEventListener('click', () => {
    const historyContainer = document.getElementById('history-container');
    historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
    updateHistory();
});

// 기록 업데이트 함수
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// equals 버튼 클릭 시 계산 결과 저장
equalsButton.addEventListener('click', () => {
    try {
        const result = eval(currentInput);
        history.push(`${currentInput} = ${result}`); // 계산 기록 저장
        updateDisplay(result);
        currentInput = result.toString();
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
    }
});

const toggleThemeButton = document.getElementById('toggle-theme');

// 다크모드 / 라이트모드 전환
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.calculator-container').classList.toggle('dark-mode');
});

// CSS에서 다크모드 스타일 정의
