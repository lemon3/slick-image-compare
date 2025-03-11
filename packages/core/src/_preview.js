import SlickImageCompare from '@/js/main.js';
import '@/_preview.css';

import '@/styles/main.css';

const sets = [
  {
    beforeImage: '01_before.png',
    afterImage: '01_after.png',
  },
  {
    beforeImage: '03_before.png',
    afterImage: '03_after.png',
  },
];

const options = {
  beforeLabel: 'before',
  afterLabel: 'before',
};
let active = 1;

const startOptions = { ...options, ...sets[active] };

const ce = ({ el, props, style }) => {
  const _el = document.createElement(el);
  if (props)
    Object.entries(props).forEach(([key, value]) => (_el[key] = value));
  if (style)
    Object.entries(style).forEach(([key, value]) => (_el.style[key] = value));
  return _el;
};

const app = document.querySelector('#app');
const main = ce({
  el: 'div',
  props: { className: 'main' },
  style: { maxWidth: '600px' },
});
const button1 = ce({ el: 'button', props: { className: 'button', id: 0 } });
button1.innerHTML = 'set1';
const button2 = ce({ el: 'button', props: { className: 'button', id: 1 } });
button2.innerHTML = 'set2';

const buttonGroup = ce({ el: 'div', props: { className: 'button-group' } });
buttonGroup.append(button1, button2);

const myTextBox = ce({ el: 'div', props: { className: 'text-box' } });
const h1 = ce({ el: 'h1' });
h1.innerText = 'DEMO';

// cover | contain | exact

const sic = new SlickImageCompare(main, startOptions);
const changeText = (evt) => {
  const afterShown = evt.detail.afterShown;
  myTextBox.innerHTML = afterShown ? 'After' : 'Before';
};

// listen for events
sic.addEventListener('viewchange', changeText);

const df = document.createDocumentFragment();
df.append(h1, buttonGroup, main, myTextBox);

app.append(df);

const buttons = document.querySelectorAll('.button');
const buttonClicked = (evt) => {
  const id = evt.target.id;
  if (+id === active) return;
  sic.destroy();
  const opt = { ...options, ...sets[id] };
  sic.init(opt);
  buttons[active].classList.remove('active');
  buttons[id].classList.add('active');
  active = id;
};

buttons[active].classList.add('active');

buttons.forEach((b) => {
  b.addEventListener('click', buttonClicked);
});
