"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '6536713689:AAFDWgcFMSf4L0SyG2Or6rGQe-GYjWq99Kk';
const TELEGRAM_CHAT_ID = '@SentofMessage';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formButton = document.querySelector('.form__submit-button');
    const fromSendResult = document.querySelector('.form__send-result');
    fromSendResult.textContent = '';
    
    const { name, email, phone } = Object.fromEntries(new FormData(form).entries());

    const text = `Имя: ${name}!\nEmail: ${email}\nСообщение: ${phone}`;

    try {
        formButton.textContent = 'Loading...';
        const response = await fetch(API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
          });
          if(response.ok) {
            fromSendResult.textContent = 'Спсибо за сообщение! мы скоро с вами свяжемся';
            form.reset();
          }
          else {
            throw new Error(response.statusText);
          }
    } catch (error) {
        console.error(error);
        fromSendResult.textContent = 'Сервис отправки сообщений не работает! Попробуйте позже';
    }
    finally{
        formButton.textContent = 'Отправить';
    }
}

/* const text = 'Заявка  от ' + name + '}!nEmail: ' + email + '/nТелефон: ' + phone +'/nПаспортные данные: ' + pass; */