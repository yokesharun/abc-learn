/* Content decks. Each item: { sym, word, sound?, icon, iconArg?, color? }
   `icon` is a key into ICONS (js/svg.js). */

export const letters = [
  { sym: "A", word: "Apple", sound: "ah", icon: "apple" },
  { sym: "B", word: "Ball", sound: "buh", icon: "ball" },
  { sym: "C", word: "Cat", sound: "kuh", icon: "cat" },
  { sym: "D", word: "Dog", sound: "duh", icon: "dog" },
  { sym: "E", word: "Elephant", sound: "eh", icon: "elephant" },
  { sym: "F", word: "Fish", sound: "fuh", icon: "fish" },
  { sym: "G", word: "Grapes", sound: "guh", icon: "grapes" },
  { sym: "H", word: "Hat", sound: "huh", icon: "hat" },
  { sym: "I", word: "Ice cream", sound: "ih", icon: "icecream" },
  { sym: "J", word: "Juice", sound: "juh", icon: "juice" },
  { sym: "K", word: "Kite", sound: "kuh", icon: "kite" },
  { sym: "L", word: "Lion", sound: "luh", icon: "lion" },
  { sym: "M", word: "Monkey", sound: "muh", icon: "monkey" },
  { sym: "N", word: "Nest", sound: "nuh", icon: "nest" },
  { sym: "O", word: "Orange", sound: "oh", icon: "orange" },
  { sym: "P", word: "Pig", sound: "puh", icon: "pig" },
  { sym: "Q", word: "Queen", sound: "kwuh", icon: "queen" },
  { sym: "R", word: "Rabbit", sound: "ruh", icon: "rabbit" },
  { sym: "S", word: "Sun", sound: "sss", icon: "sun" },
  { sym: "T", word: "Tiger", sound: "tuh", icon: "tiger" },
  { sym: "U", word: "Umbrella", sound: "uh", icon: "umbrella" },
  { sym: "V", word: "Van", sound: "vuh", icon: "van" },
  { sym: "W", word: "Watermelon", sound: "wuh", icon: "watermelon" },
  { sym: "X", word: "Xylophone", sound: "ks", icon: "xylophone" },
  { sym: "Y", word: "Yak", sound: "yuh", icon: "yak" },
  { sym: "Z", word: "Zebra", sound: "zzz", icon: "zebra" },
];

// each number gets a themed object that is tiled `n` times
const numTheme = [
  "apple", "balloon", "star", "fish", "flower", "car", "balloon", "strawberry",
  "duck", "butterfly", "grapes", "orange", "strawberry", "butterfly", "star",
  "flower", "fish", "balloon", "apple", "butterfly",
];
const numWords = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
  "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"];

export const numbers = numWords.map((word, i) => ({
  sym: String(i + 1),
  word,
  count: i + 1,
  icon: numTheme[i],
}));

export const colors = [
  { sym: "Red", word: "Red", icon: "blob", iconArg: "#e84a5f" },
  { sym: "Blue", word: "Blue", icon: "blob", iconArg: "#3498db" },
  { sym: "Yellow", word: "Yellow", icon: "blob", iconArg: "#ffd400" },
  { sym: "Green", word: "Green", icon: "blob", iconArg: "#2ecc71" },
  { sym: "Orange", word: "Orange", icon: "blob", iconArg: "#ff9f1c" },
  { sym: "Purple", word: "Purple", icon: "blob", iconArg: "#9b59b6" },
  { sym: "Pink", word: "Pink", icon: "blob", iconArg: "#ff6fa5" },
  { sym: "Brown", word: "Brown", icon: "blob", iconArg: "#8a5a3b" },
  { sym: "Black", word: "Black", icon: "blob", iconArg: "#2c2c2c" },
  { sym: "White", word: "White", icon: "blob", iconArg: "#f3f3f3" },
];

export const shapes = [
  { sym: "Circle", word: "Circle", icon: "shCircle" },
  { sym: "Square", word: "Square", icon: "shSquare" },
  { sym: "Triangle", word: "Triangle", icon: "shTriangle" },
  { sym: "Rectangle", word: "Rectangle", icon: "shRectangle" },
  { sym: "Star", word: "Star", icon: "shStar" },
  { sym: "Heart", word: "Heart", icon: "shHeart" },
  { sym: "Diamond", word: "Diamond", icon: "shDiamond" },
  { sym: "Oval", word: "Oval", icon: "shOval" },
];

export const animals = [
  { sym: "Cat", word: "Cat", icon: "cat" },
  { sym: "Dog", word: "Dog", icon: "dog" },
  { sym: "Lion", word: "Lion", icon: "lion" },
  { sym: "Elephant", word: "Elephant", icon: "elephant" },
  { sym: "Fish", word: "Fish", icon: "fish" },
  { sym: "Rabbit", word: "Rabbit", icon: "rabbit" },
  { sym: "Monkey", word: "Monkey", icon: "monkey" },
  { sym: "Tiger", word: "Tiger", icon: "tiger" },
  { sym: "Pig", word: "Pig", icon: "pig" },
  { sym: "Zebra", word: "Zebra", icon: "zebra" },
  { sym: "Duck", word: "Duck", icon: "duck" },
  { sym: "Yak", word: "Yak", icon: "yak" },
];

export const fruits = [
  { sym: "Apple", word: "Apple", icon: "apple" },
  { sym: "Orange", word: "Orange", icon: "orange" },
  { sym: "Grapes", word: "Grapes", icon: "grapes" },
  { sym: "Watermelon", word: "Watermelon", icon: "watermelon" },
  { sym: "Banana", word: "Banana", icon: "banana" },
  { sym: "Strawberry", word: "Strawberry", icon: "strawberry" },
  { sym: "Cherry", word: "Cherry", icon: "cherry" },
  { sym: "Pear", word: "Pear", icon: "pear" },
];

export const DECKS = {
  letters: { data: letters, label: "ABC", emoji: "🔤", isLetters: true },
  numbers: { data: numbers, label: "123", emoji: "🔢", isNumbers: true },
  colors:  { data: colors,  label: "Colors", emoji: "🎨" },
  shapes:  { data: shapes,  label: "Shapes", emoji: "🔷" },
  animals: { data: animals, label: "Animals", emoji: "🐾" },
  fruits:  { data: fruits,  label: "Fruits", emoji: "🍓" },
};
