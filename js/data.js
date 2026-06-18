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

// Traditional / public-domain nursery rhymes (one verse each).
export const rhymes = [
  { sym: "Twinkle Twinkle", word: "Twinkle Twinkle Little Star", icon: "star", lines: [
    "Twinkle, twinkle, little star,",
    "How I wonder what you are.",
    "Up above the world so high,",
    "Like a diamond in the sky.",
    "Twinkle, twinkle, little star,",
    "How I wonder what you are.",
  ]},
  { sym: "Baa Baa", word: "Baa Baa Black Sheep", icon: "sheep", lines: [
    "Baa, baa, black sheep,",
    "Have you any wool?",
    "Yes sir, yes sir,",
    "Three bags full.",
    "One for the master,",
    "And one for the dame,",
    "And one for the little boy",
    "Who lives down the lane.",
  ]},
  { sym: "Humpty Dumpty", word: "Humpty Dumpty", icon: "egg", lines: [
    "Humpty Dumpty sat on a wall,",
    "Humpty Dumpty had a great fall.",
    "All the king's horses and all the king's men,",
    "Couldn't put Humpty together again.",
  ]},
  { sym: "Jack and Jill", word: "Jack and Jill", icon: "hill", lines: [
    "Jack and Jill went up the hill,",
    "To fetch a pail of water.",
    "Jack fell down and broke his crown,",
    "And Jill came tumbling after.",
  ]},
  { sym: "Hickory Dickory", word: "Hickory Dickory Dock", icon: "clock", lines: [
    "Hickory, dickory, dock,",
    "The mouse ran up the clock.",
    "The clock struck one,",
    "The mouse ran down,",
    "Hickory, dickory, dock.",
  ]},
  { sym: "Itsy Bitsy Spider", word: "Itsy Bitsy Spider", icon: "spider", lines: [
    "The itsy bitsy spider",
    "Climbed up the water spout.",
    "Down came the rain",
    "And washed the spider out.",
    "Out came the sun",
    "And dried up all the rain,",
    "And the itsy bitsy spider",
    "Climbed up the spout again.",
  ]},
  { sym: "Row Your Boat", word: "Row Row Row Your Boat", icon: "boat", lines: [
    "Row, row, row your boat,",
    "Gently down the stream.",
    "Merrily, merrily, merrily, merrily,",
    "Life is but a dream.",
  ]},
  { sym: "Mary Had a Lamb", word: "Mary Had a Little Lamb", icon: "lamb", lines: [
    "Mary had a little lamb,",
    "Its fleece was white as snow.",
    "And everywhere that Mary went,",
    "The lamb was sure to go.",
  ]},
];

export const DECKS = {
  letters: { data: letters, label: "ABC", emoji: "🔤", isLetters: true },
  numbers: { data: numbers, label: "123", emoji: "🔢", isNumbers: true },
  colors:  { data: colors,  label: "Colors", emoji: "🎨" },
  shapes:  { data: shapes,  label: "Shapes", emoji: "🔷" },
  animals: { data: animals, label: "Animals", emoji: "🐾" },
  fruits:  { data: fruits,  label: "Fruits", emoji: "🍓" },
  rhymes:  { data: rhymes,  label: "Rhymes", emoji: "📖", isRhymes: true },
};
