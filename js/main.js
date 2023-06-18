/* eslint-disable no-console */
const PHOTOS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 30;
const MAX_COMMENTS_ID_COUNT = 750;
const MAX_AVATARS_COUNT = 6;

const PHOTO_DESCRIPTIONS = [
  'Отель Eden в городе Ровинь, Хорватия.',
  'Уличный знак с направлением к пляжу в травянистом поле.',
  'Голубая лагуна на фоне неба и зелени.',
  'Женщина в бикини стоит на пляже с фотоаппаратом.',
  'Две миски супа с морковью рисом.',
  'McLaren P1.',
  'Клубника на деревянной тарелке.',
  'Кисель из ягод.',
  'Девушка смотрит на мимо пролетающий самолет.',
  'Органайзер для хранение обуви под кроватью.',
  'Пляж с деревянным забором.',
  'Audi RS5.',
  'Как приготовить салат "Цезарь" с семгой.',
  'Суши-кот.',
  'Гигантские тапочки робота.',
  'Аэрофотосъемка гор.',
  'Академический большой хор.',
  'Chevrolet Biscayne.',
  'Тапочки с подсветкой.',
  'Отель Long Beach на восточном побережье Маврикия.',
  'Курица по-тайски.',
  'Закат на пляже.',
  'Пресноводный краб.',
  'Люди на концерте.',
  'Бегемоты в сафари-парке на Бали.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Андрей',
  'Яков',
  'Юрий',
  'Татьяна',
  'Мария',
  'Авдотья',
  'Елизавета',
  'Игорь',
  'Руслан',
  'Семён',
  'Сергей',
  'Жанна',
  'Полина',
  'Юлия',
  'Нина',
];

const getRandomIntegerInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomUniqId = (min, max) => {
  const values = new Set;

  return () => {
    let currentValue = getRandomIntegerInclusive(min, max);

    if (values.size >= (max - min + 1)) {
      return null;
    }

    while (values.has(currentValue)) {
      currentValue = getRandomIntegerInclusive(min, max);
    }

    values.add(currentValue);
    return currentValue;
  };
};

const generatePhotoId = getRandomUniqId(1, PHOTOS_COUNT);
const generateCommentId = getRandomUniqId(1, MAX_COMMENTS_ID_COUNT);
const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];

class Comment {
  id = generateCommentId();
  avatar = `img/avatar-${getRandomIntegerInclusive(1, MAX_AVATARS_COUNT)}.svg`;
  message = Array.from({ length: getRandomIntegerInclusive(1, 2) }, () => getRandomArrayElement(MESSAGES)).join(' ');
  name = getRandomArrayElement(NAMES);
}

class Photo {
  id = generatePhotoId();
  url = `photos/${this.id}.jpg`;
  description = PHOTO_DESCRIPTIONS[this.id - 1];
  likes = getRandomIntegerInclusive(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  comments = Array.from({ length: getRandomIntegerInclusive(0, MAX_COMMENTS_COUNT) }, () => new Comment());
}

const photos = Array.from({ length: PHOTOS_COUNT }, () => new Photo());
console.log(photos);
