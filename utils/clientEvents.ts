export function scroller(this: any) {
  this.rozdily.forEach((rozdil: Element) => {
    const rect = rozdil.getBoundingClientRect();
    if (rect.top < 350 && rect.top > 50) {
      this.activeItem = document.querySelector(`#item_${rozdil.id.split('_')[1]}`);

      if (!this.activeItem.classList.contains('font-bold')) {
        this.activeItem.classList.add('font-bold');
        if (this.prevItem) {
          this.prevItem.classList.remove('font-bold');
        }
      }

      if (this.activeItem.getBoundingClientRect().bottom > document.documentElement.clientHeight) {
        this.scrollOffset += document.documentElement.clientHeight / 2;
        if (this.contentsDiv) {
          this.contentsDiv.scrollTop = this.scrollOffset;
        }
      }

      if (this.activeItem.getBoundingClientRect().top < 0) {
        this.scrollOffset -= document.documentElement.clientHeight / 2;
        if (this.contentsDiv) {
          this.contentsDiv.scrollTop = this.scrollOffset;
        }
      }
    } else {
      this.prevItem = this.activeItem;
    }
  });
}
