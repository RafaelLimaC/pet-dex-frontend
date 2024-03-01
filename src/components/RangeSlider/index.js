import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'value:change',
  'unit:change',
  'interactionEnd',
  'interactionStart',
];

const html = `
  <div class="range-slider" data-select="range-slider">
    <div>
      <span class="range-slider__info" data-select="range-slider-value"></span>
      <span class="range-slider__info" data-select="range-slider-unit"></span>
    </div>
    <div class="range-slider__content" data-select="range-slider-content">
      <button class="range-slider__button" data-select="range-slider-button">I I I</button>
    </div>
  </div>
`;

export default function RangeSlider({
  minimum = 0,
  maximum = 100,
  unit = 'kg',
  value = 10,
  stepSize = 0.05,
} = {}) {
  Component.call(this, { html, events });

  this.setMinimum(minimum);
  this.setMaximum(maximum);
  this.setUnit(unit);
  this.setValue(value);
  this.setStepSize(stepSize);

  const unitElement = this.selected.get('range-slider-unit');
  const containerElement = this.selected.get('range-slider-content');

  let isMouseDown = false;
  let startX = 0;
  let currentValue = Math.min(Math.max(value, minimum), maximum);

  const handleStart = (clientX) => {
    isMouseDown = true;
    startX = clientX;
    this.emit('interactionStart', currentValue);
  };

  const moveBackground = (clientX) => {
    if (!isMouseDown) return;

    const mouseX = clientX;
    const offsetX = mouseX - startX;

    containerElement.style.backgroundPositionX = `${parseInt(containerElement.style.backgroundPositionX || 0, 10) - offsetX}px`;

    currentValue = mouseX > startX
      ? Math.min(maximum, currentValue + this.getStepSize())
      : Math.max(minimum, currentValue - this.getStepSize());

    this.setValue(currentValue);
    unitElement.textContent = unit;

    startX = mouseX;
    this.emit('value:change', currentValue);
  };

  const handleEnd = () => {
    isMouseDown = false;
    this.emit('interactionEnd', currentValue);
  };

  const handleMove = (event) => {
    event.preventDefault();
    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    moveBackground(clientX);
  };

  containerElement.addEventListener('mousedown', (event) => {
    event.preventDefault();
    handleStart(event.clientX);
  });

  containerElement.addEventListener('touchstart', (event) => {
    event.preventDefault();
    handleStart(event.touches[0].clientX);
  });

  this.listen('mount', () => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  });

  this.listen('unmount', () => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  });
}

RangeSlider.prototype = Object.assign(
  RangeSlider.prototype,
  Component.prototype,
  {
    getValue() {
      return parseFloat(this.selected.get('range-slider-value').textContent);
    },
    setValue(value) {
      this.selected.get('range-slider-value').textContent = value.toFixed(1);
      this.emit('value:change', value);
    },
    getUnit() {
      return this.selected.get('range-slider-unit').textContent;
    },
    setUnit(unit) {
      this.selected.get('range-slider-unit').textContent = unit;
      this.emit('unit:change', unit);
    },
    getMinimum() {
      return this.minimum;
    },
    setMinimum(value) {
      this.minimum = value;
    },
    getMaximum() {
      return this.maximum;
    },
    setMaximum(value) {
      this.maximum = value;
    },
    getStepSize() {
      return this.stepSize;
    },
    setStepSize(value) {
      this.stepSize = value;
    },
  },
);
