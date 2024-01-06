import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['active'];

const html = `
  <div class="pet-container" data-select="pet-container">
    <p class="pet-container__title" data-select="pet-title"></p>
    <img class="pet-container__image" data-select="pet-image" src="" alt="">
  </div>
`;

export default function PetCard({ title, imgSrc, imgAlt }) {
  Component.call(this, { html, events });

  const petContainer = this.selected.get('pet-container');

  petContainer.addEventListener('click', () => {
    this.toggle();
    this.active();
  });

  if (title) this.setTitle(title);
  if (imgSrc) this.setImgSrc(imgSrc);
  if (imgAlt) this.setImgAlt(imgAlt);
}

PetCard.prototype = Object.assign(PetCard.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('pet-title').textContent = text;
  },
  setImgSrc(src) {
    this.selected.get('pet-image').src = src;
  },
  setImgAlt(alt) {
    this.selected.get('pet-image').alt = alt;
  },
  toggle() {
    const petContainer = this.selected.get('pet-container');
    petContainer.classList.add('pet-container--active');
  },
  active() {
    this.emit('active');
  },
});
