import cat from "../asset/profile/cat.png";
import dog from "../asset/profile/dog.png";
import elephant from "../asset/profile/elephant.png";
import fox from "../asset/profile/fox.png";
import koala from "../asset/profile/koala.png";
import toucan from "../asset/profile/toucan.png";
import turtle from "../asset/profile/turtle.png";
import whale from "../asset/profile/whale.png";

const pickArray = [
  cat,
  dog,
  elephant,
  fox,
  koala,
  toucan,
  turtle,
  whale,
];

const getRandomImage = () => {
  return pickArray[Math.trunc(Math.random() * pickArray.length-1)];
}

export default getRandomImage;