// создаем карточки
function createCard(row = 4, col = 4) {
    const container = document.getElementById('game-area');
    const volumeCard = row * col;
    let cardItem;
    let cardBack;
    let cardFront;
    for (let card = 1; card <= volumeCard; card++) {
        cardItem = document.createElement('div');
        cardBack = document.createElement('div');
        cardFront = document.createElement('div');
        cardItem.classList.add('card');
        cardBack.classList.add('card-back');
        cardFront.classList.add('card-front');
        cardItem.append(cardBack);
        cardItem.append(cardFront);
        container.append(cardItem);
    }

    // создаем кнопку для перезагрузки сайта
    const buttonUpdate = document.createElement('button');
    const mainContent = document.querySelector('.main-content');
    buttonUpdate.classList.add('btn-update');
    buttonUpdate.innerHTML = 'Начать заново';
    mainContent.prepend(buttonUpdate);

    // придаем значение карточкам
    createCardValue(volumeCard / 2);
}

// создать значения для карточек и присвоить
function createCardValue(volumeCard) {
    let cardValue = [];
    for (let value = 1; value <= volumeCard; value++) {
        // заполняем цифрами
        cardValue.push(value);
        cardValue.push(value);
    }
    // перемешиваем массив
    for (let i = cardValue.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardValue[i], cardValue[j]] = [cardValue[j], cardValue[i]]
    }
    // присваиваем карточкам цифры
    const cardFrontValue = document.querySelectorAll('.card-front');
    for (let value in cardValue) {
        cardFrontValue[value].innerHTML = cardValue[value];
        cardFrontValue[value].style.backgroundImage = `url('./img/playground/${cardValue[value]}.svg')`;
    }
    // console.log(cardValue)
}

// проверяем кол-во активных карт, если нужно переворачиваем или удаляем
function moderateActiveCards() {
    this.firstChild.classList.add('card-back_active');
    this.lastChild.classList.add('card-front_active');
    let cardActive = document.getElementsByClassName('card-front_active');
    if (cardActive.length === 2) {
        if (cardActive[0].innerHTML === cardActive[1].innerHTML) {
            cardActive[0].classList.add('card_remove');
            cardActive[1].classList.add('card_remove');
        }
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.removeEventListener('click', moderateActiveCards);
        });
        setTimeout(unactiveCards, 2000);
    }
}

// перезагрузка или удаление карточек, когда перевернули 2 карточки
function unactiveCards() {
    let cardActive = document.getElementsByClassName('card-front_active');
    if (cardActive[0].innerHTML === cardActive[1].innerHTML) {
        cardActive[0].parentNode.style.visibility = 'hidden';
        cardActive[1].parentNode.style.visibility = 'hidden';
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.firstChild.classList.remove('card-back_active');
        card.lastChild.classList.remove('card-front_active');
        card.addEventListener('click', moderateActiveCards);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCard();

    // переворот карточки
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', moderateActiveCards);
    });

    const buttonUpdate = document.querySelector('.btn-update');
    buttonUpdate.addEventListener('click', () => {
        window.location.reload();
    });

});