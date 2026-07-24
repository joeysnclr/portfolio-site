export interface Book {
  id: string;
  title: string;
  author: string;
  thought: string;
  coverSrc: string;
}

export const books: Book[] = [
  {
    id: "the-man-who-solved-the-market",
    title: "The Man Who Solved the Market",
    author: "Gregory Zuckerman",
    thought: "Jim Simons is the goat. Be guided by beauty.",
    coverSrc: "/books/themanwhosolvedmarket.jpg",
  },
  {
    id: "1929",
    title: "1929",
    author: "Andrew Sorkin",
    thought: "",
    coverSrc: "/books/1929.jpeg",
  },
  {
    id: "bayesian-sports-models",
    title: "Bayesian Sports Models in R",
    author: "Andrew Mack",
    thought: "Great book on modeling sports systems.",
    coverSrc: "/books/bayesiansportsmodelsr.jpg",
  },
  {
    id: "the-alignment-problem",
    title: "The Alignment Problem",
    author: "Brian Christian",
    thought: "",
    coverSrc: "/books/alignmentproblem.jpg",
  },
  {
    id: "the-creative-act",
    title: "The Creative Act",
    author: "Rick Rubin",
    thought: "Every decision is creative.",
    coverSrc: "/books/creativeact.jpg",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    thought: "Be yourself by escaping competition.",
    coverSrc: "/books/zerotoone.jpg",
  },
  {
    id: "the-age-of-reason",
    title: "The Age of Reason",
    author: "Jean-Paul Sartre",
    thought: "",
    coverSrc: "/books/theageofreason.jpg",
  },
  {
    id: "a-hunger-artist",
    title: "A Hunger Artist",
    author: "Franz Kafka",
    thought: "",
    coverSrc: "/books/hungerartist.jpg",
  },
  {
    id: "old-man-and-the-sea",
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    thought: "",
    coverSrc: "/books/oldmansea.jpg",
  },
  {
    id: "the-sun-also-rises",
    title: "The Sun Also Rises",
    author: "Ernest Hemingway",
    thought: "",
    coverSrc: "/books/sunalsorises.jpg",
  },
  {
    id: "siddhartha",
    title: "Siddhartha",
    author: "Hermann Hesse",
    thought: "",
    coverSrc: "/books/siddhartha.jpeg",
  },
  {
    id: "on-the-shortness-of-life",
    title: "On the Shortness of Life",
    author: "Seneca",
    thought: "",
    coverSrc: "/books/shortnessoflife.jpg",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey",
    author: "Homer",
    thought: "",
    coverSrc: "/books/odyssey.jpeg",
  },
  {
    id: "the-iliad",
    title: "The Iliad",
    author: "Homer",
    thought: "",
    coverSrc: "/books/theiliad.jpg",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    thought: "",
    coverSrc: "/books/meditations.jpeg",
  },
];
