//цитаты

const allquotes = [
    {
        quote: "Сложнее всего начать действовать, все остальное зависит только от упорства.",
        author: "Амелия Эрхарт",
    },
    {
        quote: "Надо любить жизнь больше, чем смысл жизни.",
        author: "Федор Достоевский",
    },
    {
        quote: "Начинать всегда стоит с того, что сеет сомнения.",
        author: "Борис Стругацкий",
    },
    {
        quote: "В моем словаре нет слова «невозможно».",
        author: "Наполеон Бонапарт",
    },
    {
        quote: "Свобода ничего не стоит, если она не включает в себя свободу ошибаться.",
        author: "Махатма Ганди",
    },
]

const quote = document.getElementById('quote');
const author = document.getElementById('author');

var quotes = Math.floor(Math.random() * 5);
quote.textContent = allquotes[quotes].quote;
author.textContent = allquotes[quotes].author;

