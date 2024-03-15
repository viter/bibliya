const rozdily = document.querySelectorAll('.rozdil');
const contentsItems = document.querySelectorAll('.content');
const contentDiv = document.querySelector('#content');
const stubDiv = document.querySelector('#stub');
const tekstDiv = document.querySelector('#tekst');

const contentsLinks = document.querySelector('div#content > nav > ul');
let activeItem = document.querySelector('div#content > nav > ul > li > a.font-bold');
if (!activeItem) {
  activeItem = document.querySelector('#item_1');
  activeItem.classList.add('font-bold');
}

let prevItem;
let scrollOffset = 0;

tekstDiv.addEventListener('scroll', () => {
  rozdily.forEach((rozdil) => {
    const rect = rozdil.getBoundingClientRect();
    if (rect.top < 350 && rect.top > 50) {
      activeItem = document.querySelector(`#item_${rozdil.id.split('_')[1]}`);

      if (!activeItem.classList.contains('font-bold')) {
        activeItem.classList.add('font-bold');
        if (prevItem) {
          prevItem.classList.remove('font-bold');
        }
      }

      if (activeItem.getBoundingClientRect().bottom > document.documentElement.clientHeight) {
        scrollOffset += document.documentElement.clientHeight / 2;
        contentDiv.scrollTop = scrollOffset;
      }

      if (activeItem.getBoundingClientRect().top < 0) {
        scrollOffset -= document.documentElement.clientHeight / 2;
        contentDiv.scrollTop = scrollOffset;
      }
    } else {
      prevItem = activeItem;
    }
  });
});

contentsLinks.addEventListener('click', (e) => {
  activeItem.classList.remove('font-bold');
  activeItem = e.target;
  activeItem.classList.add('font-bold');
});
