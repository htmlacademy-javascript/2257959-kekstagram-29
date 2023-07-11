const sliderConfigs = {
  chrome: {
    option: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: (value) => Number.isInteger(value)
          ? value.toFixed(0)
          : value.toFixed(1),
        from: (value) => parseFloat(value),
      },
    },
    filter: 'grayscale',
  },
  sepia: {
    option: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: (value) => Number.isInteger(value)
          ? value.toFixed(0)
          : value.toFixed(1),
        from: (value) => parseFloat(value),
      },
    },
    filter: 'sepia',
  },
  marvin: {
    option: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      format: {
        to: (value) => `${value}%`,
        from: (value) => parseFloat(value),
      },
    },
    filter: 'invert',
  },
  phobos: {
    option: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to: (value) => Number.isInteger(value)
          ? `${value.toFixed(0)}px`
          : `${value.toFixed(1)}px`,
        from: (value) => parseFloat(value),
      },
    },
    filter: 'blur',
  },
  heat: {
    option: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to: (value) => Number.isInteger(value)
          ? value.toFixed(0)
          : value.toFixed(1),
        from: (value) => parseFloat(value),
      },
    },
    filter: 'brightness',
  },
};

const createFormSlider = (form, image) => {
  const inputForEffect = form.querySelector('.effect-level__value');
  const sliderContainer = form.querySelector('.img-upload__effect-level');
  const slider = form.querySelector('.effect-level__slider');
  const radioButtons = form.querySelectorAll('.effects__radio ');
  const effectsList = form.querySelector('.effects__list');

  noUiSlider.create(slider, {
    range: {
      'min': 0,
      'max': 0,
    },
    start: 0,
    connect: 'lower',
  });

  slider.noUiSlider.on('update', (values, handle) => {
    const newValue = values[handle];
    const newFilterValue = image.style.filter.replace(/\(.*\)/, `(${newValue})`);

    inputForEffect.value = newValue;
    image.style.filter = newFilterValue;
  });

  const onEffectsListChange = () => {
    const checkedRadioButton = [...radioButtons].find((radioButton) => radioButton.checked);
    const effect = checkedRadioButton.id.split('-').at(-1);

    if (effect !== 'none') {
      const config = sliderConfigs[effect];

      image.style.setProperty('filter', `${config.filter}()`);
      slider.noUiSlider.updateOptions(config.option);

      sliderContainer.classList.remove('hidden');
    } else {
      sliderContainer.classList.add('hidden');
      image.style.removeProperty('filter');
      inputForEffect.value = '';
    }
  };

  effectsList.addEventListener('change', onEffectsListChange);

  return {
    reset: () => {
      image.style.removeProperty('filter');
      sliderContainer.classList.add('hidden');
    },
  };
};

export { createFormSlider };
