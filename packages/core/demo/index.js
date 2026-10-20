import SlickImageCompare from '@/js/main.js';
import { createElObj as ce } from '@/js/utils';
import './index.css';
import '../src/styles/main.css';

const sets = [
  {
    beforeImage: '01_before.png',
    afterImage: '01_after.png',
  },
  {
    beforeImage: '02_before.png',
    afterImage: '02_after.png',
  },
];

const options = {
  beforeLabel: 'before',
  afterLabel: 'after',
  onlyHandleDraggable: true,
  clickable: true,
  init() {
    console.log('init');
  },
  drag() {
    console.log('drag');
  },
  update() {
    console.log('update');
  },
  viewchange() {
    console.log('viewchange');
  },
  beforeshown() {
    console.log('beforeshown');
  },
  aftershown() {
    console.log('aftershown');
  },
  interactionstart() {
    console.log('interactionstart');
  },
  interactionend() {
    console.log('interactionend');
  },
};
let active = 1;

const startOptions = { ...options, ...sets[active] };

const app = document.querySelector('#app');
const main = ce({
  el: 'div',
  props: { className: 'main' },
  style: { maxWidth: '600px', aspectRatio: 1.5 },
});
const button1 = ce({
  el: 'button',
  props: { className: 'switch button', id: 0 },
});
button1.innerHTML = 'set1';
const button2 = ce({
  el: 'button',
  props: { className: 'switch button', id: 1 },
});
button2.innerHTML = 'set2';

const buttonGroup = ce({
  el: 'div',
  props: { className: 'button-group' },
});
buttonGroup.append(button1, button2);

const myTextBox = ce({ el: 'div', props: { className: 'text-box' } });
const h1 = ce({ el: 'h1' });
h1.innerText = 'DEMO';

// cover | contain | exact
const sic = new SlickImageCompare(main, startOptions);
const changeText = (evt) => {
  const afterShown = evt.detail.afterShown;
  let instance = evt.detail.instance;
  myTextBox.innerHTML = afterShown
    ? instance.getAfterLabel()
    : instance.getBeforeLabel();
};

// listen for events
sic.addEventListener('viewchange', changeText);

const actionButtons = ce({
  el: 'div',
  props: { className: 'button-group' },
});

const actionButton1 = ce({
  el: 'button',
  props: {
    className: 'button',
    onclick() {
      sic.animateTo(10);
    },
  },
  innerHTML: '10',
});

const actionButton2 = ce({
  el: 'button',
  props: {
    className: 'button',
    onclick() {
      sic.animateTo(90);
    },
  },
  innerHTML: '90',
});

actionButtons.append(actionButton1, actionButton2);

const df = document.createDocumentFragment();
df.append(h1, buttonGroup, main, myTextBox, actionButtons);

app.append(df);

const switchBtns = document.querySelectorAll('.switch');
const buttonClicked = (evt) => {
  const id = evt.target.id;
  if (+id === active) return;
  sic.destroy();
  const opt = { ...options, ...sets[id] };
  sic.init(opt);
  switchBtns[active].classList.remove('active');
  switchBtns[id].classList.add('active');
  active = id;
};

if (switchBtns && switchBtns.length > 0) {
  switchBtns[active].classList.add('active');
}

switchBtns.forEach((b) => {
  b.addEventListener('click', buttonClicked);
});
