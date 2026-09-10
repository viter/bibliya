/* eslint-disable @typescript-eslint/no-explicit-any */
export function scroller(this: any) {
  let activeRozdilId: string | null = null;

  this.rozdily.forEach((rozdil: Element) => {
    const rect = rozdil.getBoundingClientRect();
    if (rect.top < 350 && rect.top > 50) {
      activeRozdilId = rozdil.id.split('_')[1];
    }
  });

  if (!activeRozdilId) {
    return;
  }

  this.activeItem = this.contentsDiv.querySelector(`#item_${activeRozdilId}`);
  if (!this.activeItem) {
    return;
  }

  if (this.prevItem && this.prevItem !== this.activeItem) {
    this.prevItem.classList.remove('font-bold', 'dark:text-neutral-100');
    this.prevItem.classList.add('dark:text-neutral-300');
  }

  this.activeItem.classList.add('font-bold', 'dark:text-neutral-100');
  this.activeItem.classList.remove('dark:text-neutral-300');
  this.prevItem = this.activeItem;

  if (this.activeItem.getBoundingClientRect().bottom > this.contentsDiv.clientHeight) {
    this.activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (this.activeItem.getBoundingClientRect().top < 0) {
    this.activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
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
