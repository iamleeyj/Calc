const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const toggleThemeButton = document.getElementById('toggle-theme');
const viewHistoryButton = document.getElementById('view-history');

let currentInput = '';
let history = []; 

// 튜토리얼 
let tutorialStep = 0;
const tutorialMessages = [
    "환영합니다! 이 계산기는 다양한 기능을 제공합니다.",
    "먼저, 숫자와 연산 기호를 입력할 수 있습니다. 버튼을 클릭해 보세요.",
    "계산을 완료한 후, '=' 버튼을 클릭하여 결과를 확인하세요.",
    "C 버튼을 눌러 입력된 내용을 초기화할 수 있습니다.",
    "기록 보기 버튼을 눌러 이전 계산 기록을 확인할 수 있습니다.",
    "다크모드와 라이트모드를 전환하려면, 화면 상단의 아이콘을 클릭하세요."
];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

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

function updateDisplay(value) {
    display.textContent = value;
}

// 계산 기록 표시
viewHistoryButton.addEventListener('click', () => {
    const historyContainer = document.getElementById('history-container');
    historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
    updateHistory();
});

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // 기존 기록 초기화
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item; // 계산 기록을 리스트 아이템으로 추가
        historyList.appendChild(li);
    });
}

// 다크모드 전환
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

function showTutorialMessage(message) {
    const tutorialBox = document.createElement('div');
    tutorialBox.classList.add('tutorial-box');
    tutorialBox.textContent = message;
    document.body.appendChild(tutorialBox);

    setTimeout(() => {
        tutorialBox.remove();
        tutorialStep++;
        if (tutorialStep < tutorialMessages.length) {
            showTutorialMessage(tutorialMessages[tutorialStep]);
        }
    }, 3000); 
}

window.onload = () => {
    showTutorialMessage(tutorialMessages[tutorialStep]);
};
