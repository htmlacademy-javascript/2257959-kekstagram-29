const PHOTO_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 30;
const MIN_COMMENT_ID = 100;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

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

const createSequence = (startNumber = 1) => {
  let index = startNumber;
  return () => index++;
};

const generateCommentId = createSequence(MIN_COMMENT_ID);
const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomIntegerInclusive(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: Array.from({ length: getRandomIntegerInclusive(1, 2) }, () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createComments = () =>
  Array.from(
    { length: getRandomIntegerInclusive(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT) },
    () => createComment(generateCommentId()),
  );

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: PHOTO_DESCRIPTIONS[id - 1],
  likes: getRandomIntegerInclusive(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: createComments(),
});

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));
createPhotos();
