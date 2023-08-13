const Data = [
  {id: 1,	label: "In all your ways acknowledge Him, and He will make straight your paths.", value:	"3:6"},
  {id: 2,	label: "The simple believes everything, but the prudent gives thought to his steps.", value:	"14:15"},
  {id: 3,	label: "Death and life are in the power of the tongue, and those who love it will eat its fruits.", value:	"18:21"},
  {id: 4,	label: "When a man's ways please the Lord, he makes even his enemies to be at peace with him.", value:	"16:7"},
  {id: 5,	label: "A good name is to be chosen rather than great riches, and favour is better than silver or gold.", value:	"22:1"},
  {id: 6,	label: "Whoever despises his neighbor is a sinner, but blessed is he who is generous to the poor.", value:	"14:21"},
  {id: 7,	label: "Scoffers set a city aflame, but the wise turn away wrath.", value:	"29:8"},
  {id: 8,	label: "My son, if sinners entice you, do not consent.", value:	"1:10"},
  {id: 9,	label: "Let your eyes look directly forward, and your gaze be straight before you.", value:	"4:25"},
  {id: 10,	label:"Whoever conceals his transgressions will not prosper, but he who confesses and forsakes them will obtain mercy.",	value: "28:13"},
  {id: 11,	label:"Make plans by seeking advice; if you wage war, obtain guidance.",	value: "20:18"},
  {id: 12,	label:"The wicked flee when no one pursues, but the righteous are bold as a lion.",value:	"28:1"},
  {id: 13,	label:"In the path of righteousness is life, and in its pathway there is no death.",	value: "12:28"},
  ]

const wordsList = [
  "a",
  "A",
  "acknowledge",
  "advice;",
  "aflame,",
  "all",
  "and",
  "are",
  "as",
  "at",
  "away",
  "be",
  "before",
  "believes",
  "better",
  "blessed",
  "bold",
  "but",
  "by",
  "chosen",
  "city",
  "conceals",
  "confesses",
  "consent.",
  "Death",
  "death.",
  "despises",
  "directly",
  "do",
  "eat",
  "enemies",
  "entice",
  "even",
  "everything,",
  "eyes",
  "favour",
  "flee",
  "forsakes",
  "forward,",
  "fruits.",
  "gaze",
  "generous",
  "gives",
  "gold.",
  "good",
  "great",
  "guidance.",
  "He",
  "he",
  "Him,",
  "him.",
  "his",
  "if",
  "In",
  "in",
  "is",
  "it",
  "its",
  "Let",
  "life",
  "life,",
  "lion.",
  "look",
  "Lord,",
  "love",
  "Make",
  "make",
  "makes",
  "man's",
  "mercy.",
  "My",
  "name",
  "neighbor",
  "no",
  "not",
  "obtain",
  "of",
  "one",
  "or",
  "path",
  "paths.",
  "pathway",
  "peace",
  "plans",
  "please",
  "poor.",
  "power",
  "prosper,",
  "prudent",
  "pursues,",
  "rather",
  "riches,",
  "righteous",
  "righteousness",
  "Scoffers",
  "seeking",
  "set",
  "silver",
  "simple",
  "sinner,",
  "sinners",
  "son,",
  "steps.",
  "straight",
  "than",
  "the",
  "The",
  "them",
  "there",
  "those",
  "thought",
  "to",
  "tongue,",
  "transgressions",
  "turn",
  "wage",
  "war,",
  "ways",
  "When",
  "when",
  "who",
  "Whoever",
  "wicked",
  "will",
  "wise",
  "with",
  "wrath.",
  "you",
  "you,",
  "you.",
  "your",
];

const newWordList = []
let counter = 0;
const indicesList = [];


let words = Data[0].label.split(' ');
const blanksCount = Math.floor(words.length / 2);
const selectedIndices = new Set();

while (selectedIndices.size < blanksCount) {
  const randomIndex = Math.floor(Math.random() * words.length);
  selectedIndices.add(randomIndex);
}

words = words.map((word, index) => {
  if (selectedIndices.has(index)) {
    counter += 1;
    indicesList.push(counter)
    newWordList.push(word)
    return `(${counter})____`;
  }
  return word;
});

newWordList.map((word, index) => {
  console.log(index, ': ', word)
  return (
    word
  )
})

let uniqueWords = [...new Set(newWordList)];

uniqueWords.map((word, index) => {
  console.log(index, ': ', word)
  return (
    word
  )
})

while (uniqueWords.length < 20) {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  if (!uniqueWords.includes(wordsList[randomIndex])) {
    uniqueWords.push(wordsList[randomIndex]);
  }
}

const sortedList = uniqueWords.sort((a, b) => {
  return a.localeCompare(b, undefined, {sensitivity: 'base'});
});

sortedList.map((word, index) => {
  console.log(index, ': ', word)
  return (
    word
  )
})

