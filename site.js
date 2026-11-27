'use strict';
const translations = {
  skip:'К содержимому', manifesto:'Манифест', about:'О проекте', eyebrow:'Независимое интерактивное искусство',
  lead:'Воображаемое отправление.<br>Настоящее несогласие.',
  intro:'Для тех, кто любит жизнь и отказывается считать жестокость, ложь и равнодушие нормой.',
  read:'Читать манифест', declaration:'Я вижу, что происходит.<br>Я устал от этого.<br><span>И я отказываюсь называть это нормой.</span>',
  meaningLabel:'Смысл', meaningTitle:'Придать чувству<br>форму.',
  meaning:'Stop This Planet придаёт форму знакомому чувству: можно любить жизнь и при этом глубоко разочаровываться в том, как люди порой относятся друг к другу. Манифест выражает несогласие с жестокостью, унижением и ненужными страданиями.',
  experience:'В мобильном приложении эта идея становится вымышленным опытом отправления: личный цифровой билет, номер и подпись пассажира, аватар и тихая капсула в космосе.',
  free:'Манифест можно читать бесплатно. Билет — созданный цифровой объект, который поддерживает независимый проект и его автора.',
  statusLabel:'Приложение', statusTitle:'В разработке.',
  status:'Сейчас приложение проходит внутреннее тестирование. Публичные продажи билетов ещё не открыты. На этом сайте размещены манифест и информация о проекте; платежи здесь не принимаются.',
  contact:'Связаться с автором', privacy:'Конфиденциальность', deletion:'Удаление аккаунта', support:'Поддержка',
  legal:'Вымышленное интерактивное произведение для искусства и развлечения. Билет — символический цифровой арт-объект без обещания перевозки или космического полёта.'
};
const originals = new Map();
document.querySelectorAll('[data-i18n]').forEach(el => originals.set(el, el.innerHTML));
let language = new URLSearchParams(location.search).get('lang') === 'ru' ? 'ru' : 'en';
function renderLanguage(){
  document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;el.innerHTML=language==='ru'&&translations[key]?translations[key]:originals.get(el);});
  const button=document.getElementById('language');button.textContent=language==='en'?'RU':'EN';button.setAttribute('aria-label',language==='en'?'Switch language to Russian':'Переключить язык на английский');
  document.querySelectorAll('a[href^="/manifesto.html"]').forEach(el=>el.href='/manifesto.html?lang='+language);
}
document.getElementById('language').addEventListener('click',()=>{language=language==='en'?'ru':'en';const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);renderLanguage();});
renderLanguage();
