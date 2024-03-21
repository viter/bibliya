export function scroller(this: any) {
  this.rozdily.forEach((rozdil: Element) => {
    const rect = rozdil.getBoundingClientRect();
    if (rect.top < 350 && rect.top > 50) {
      this.activeItem = this.contentsDiv.querySelector(`#item_${rozdil.id.split('_')[1]}`);

      if (!this.activeItem.classList.contains('font-bold')) {
        this.activeItem.classList.add('font-bold');
        if (this.prevItem) {
          this.prevItem.classList.remove('font-bold');
        }
      }

      if (this.activeItem.getBoundingClientRect().bottom > this.contentsDiv.clientHeight) {
        this.activeItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (this.activeItem.getBoundingClientRect().top < 0) {
        this.activeItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      this.prevItem = this.activeItem;
    }
  });
}

export function scrollerMobile(this: any) {
  const rozdily = document.querySelectorAll('.rozdil');
  rozdily.forEach((rozdil: Element) => {
    const rect = rozdil.getBoundingClientRect();
    if (rect.top < 350 && rect.top > 50) {
      this.currentItem.current = rozdil.getAttribute('id');
    }
  });
}
