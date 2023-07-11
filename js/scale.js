const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const createFormScaling = (form, image) => {
  const buttonToScaleUp = form.querySelector('.scale__control--bigger');
  const buttonToScaleDown = form.querySelector('.scale__control--smaller');
  const inputForScale = form.querySelector('.scale__control--value');

  const changeScale = (direction) => {
    const value = parseInt(inputForScale.value, 10);

    let newValue = value;
    switch (direction) {
      case 'up': {
        if (value < SCALE_MAX) {
          newValue += SCALE_STEP;
        }
        break;
      }
      case 'down': {
        if (value > SCALE_MIN) {
          newValue -= SCALE_STEP;
        }
        break;
      }
    }

    if (value !== newValue) {
      const transformValue = newValue / 100;

      inputForScale.value = `${newValue}%`;
      image.style.transform = `scale(${transformValue})`;
    }
  };

  const onButtonToScaleUpClick = () => changeScale('up');
  const onButtonToScaleDownClick = () => changeScale('down');

  buttonToScaleUp.addEventListener('click', onButtonToScaleUpClick);
  buttonToScaleDown.addEventListener('click', onButtonToScaleDownClick);

  return {
    reset: () => image.style.removeProperty('transform'),
  };
};

export { createFormScaling };
