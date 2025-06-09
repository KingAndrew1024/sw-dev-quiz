/* 
{
  question: "",
  type: "radio",
  options: [
    {text: "", correct: true},
  ],
  selectedOptions: []
},

{
  question: "",
  type: "check",
  options: [
    {text: "", correct: true},
  ],
  selectedOptions: []
},

{question: "",
type: "sort", options: [
{ text: '', order: 1 },
], selectedOptions: []}, 
*/

//types: radio | check | sort

const QUIZ = [
  {
    question: 'What is the main reason we use CSS',
    type: 'radio',
    options: [
      {
        id: 1,
        text: 'Html is just structure, its styling ability is limited',
        correct: true,
      },
      { id: 2, text: 'With CSS we get functionality' },
      { id: 3, text: 'JavaScript cannot replace CSS' },
      { id: 4, text: 'CSS has colors' },
    ],
    selectedOptions: [],
  },
  {
    question: 'What is the purpose of a CSS reset',
    type: 'radio',
    options: [
      {
        id: 1,
        text: 'Enables you to change the default base styles of a browser',
        correct: true,
      },
      {
        id: 2,
        text: "Forces a browser's default style to be applied to all HTML pages",
      },
      {
        id: 3,
        text: 'Enables the browser to download alternative default styles',
      },
      { id: 4, text: "To clean up the browser's cache" },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which 3 types of CSS can be used to style a html document',
    type: 'check',
    options: [
      { id: 1, text: 'External', correct: true },
      { id: 2, text: 'Internal (embedded)', correct: true },
      { id: 3, text: 'Inline', correct: true },
      { id: 4, text: 'Extended' },
      { id: 5, text: 'Intermediary' },
      { id: 6, text: 'In place' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which type of CSS holds the highest priority?',
    type: 'sort',
    options: [
      { id: 3, text: 'External style', order: 3 },
      { id: 1, text: 'Inline', order: 1 },
      { id: 2, text: 'Internal or Embedded ', order: 2 },
    ],
    selectedOptions: [],
  },
  {
    question:
      'Sequence the stylesheet application method in the order it will be applied to an element',
    type: 'sort',
    options: [
      { id: 1, text: 'External link stylesheet ', order: 1 },
      { id: 2, text: 'embedded stylesheet', order: 2 },
      { id: 3, text: 'inline style definition', order: 3 },
    ],
    selectedOptions: [],
  },
  {
    question:
      'Sequence the specificity of a CSS selector in descending order, starting with the least specific',
    type: 'sort',
    options: [
      { id: 1, text: 'Elements and pseudo elements', order: 1 },
      { id: 2, text: 'pseudo classes', order: 2 },
      { id: 3, text: 'attributes', order: 3 },
      { id: 4, text: 'classes', order: 4 },
      { id: 5, text: 'inline style', order: 5 },
    ],
    selectedOptions: [],
  },
  {
    question:
      'When adding an internal CSS, where you should place your style definitions?',
    type: 'radio',
    options: [
      { id: 1, text: 'Between the head tags', correct: true },
      { id: 2, text: 'Between the body tags' },
      { id: 3, text: 'Between de CSS tags' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which options can act as selector',
    type: 'check',
    options: [
      { id: 1, text: 'id', correct: true },
      { id: 2, text: 'tag name', correct: true },
      { id: 3, text: 'CSS classes', correct: true },
      { id: 4, text: 'innerHTML' },
      { id: 5, text: 'head tags' },
    ],
    selectedOptions: [],
  },
  {
    question:
      'In order to add color to an element we can use the color name. What else can be used?',
    type: 'radio',
    options: [
      { id: 1, text: 'A hexadecimal code', correct: true },
      { id: 2, text: 'A color picker' },
      { id: 3, text: 'An element’s property' },
      { id: 4, text: 'A binary code' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which are border properties',
    type: 'check',
    options: [
      { id: 1, text: 'border-width ', correct: true },
      { id: 2, text: 'border-style', correct: true },
      { id: 3, text: 'border-text' },
      { id: 4, text: 'border-font' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which 3 properties of text can be changed with CSS',
    type: 'check',
    options: [
      { id: 1, text: 'letter-spacing', correct: true },
      { id: 2, text: 'color', correct: true },
      { id: 3, text: 'font-family', correct: true },
      { id: 4, text: 'size' },
      { id: 5, text: 'hover' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which rule will set the font of the selected element to Arial',
    type: 'radio',
    options: [
      { id: 1, text: 'font-family: Arial;', correct: true },
      { id: 2, text: 'style-family: Arial;' },
      { id: 3, text: 'font-style: Arial;' },
    ],
    selectedOptions: [],
  },
  {
    question:
      'Which option provide a CSS style that will select and style every &lt;p&gt; element that is the first child of its parent?',
    type: 'radio',
    options: [
      {
        id: 1,
        text: 'p:first-child {background-color: yellow}',
        correct: true,
      },
      { id: 2, text: 'p:first*child {background-color: yellow}' },
      { id: 3, text: 'p.first-child {background-color: yellow}' },
    ],
    selectedOptions: [],
  },
  {
    question:
      'Which selector will apply a style to the adjacent sibling of the h1 tag?',
    type: 'radio',
    options: [
      { id: 1, text: 'h1 + p {color: blue}', correct: true },
      { id: 2, text: 'h1 p {color: blue}' },
      { id: 3, text: 'h1 > p {color: blue}' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which options will correctly define a paragraph font size style',
    type: 'check',
    options: [
      { id: 1, text: 'p {font-size: 0.8em}', correct: true },
      { id: 2, text: 'p {font-size: 180%}', correct: true },
      { id: 3, text: 'p:{ font-size:1.8}' },
      { id: 4, text: 'p:{ font-size:1.8px}' },
    ],
    selectedOptions: [],
  },
  {
    question: 'What does the unit <b>fr</b> refer to?',
    type: 'radio',
    options: [
      { id: 1, text: 'columns', correct: true },
      { id: 2, text: 'frames' },
      { id: 3, text: 'rows' },
      { id: 4, text: 'grids' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which are considered transformations:?',
    type: 'check',
    options: [
      { id: 1, text: 'rotate', correct: true },
      { id: 2, text: 'scale', correct: true },
      { id: 3, text: 'translate', correct: true },
      { id: 4, text: 'slide' },
      { id: 5, text: 'move' },
    ],
    selectedOptions: [],
  },
  {
    question: 'Which are animation properties?',
    type: 'check',
    options: [
      { id: 1, text: 'animation-name', correct: true },
      { id: 2, text: 'animation-duration', correct: true },
      { id: 3, text: 'animation-keyframes' },
      { id: 4, text: '@keyframes' },
      { id: 5, text: 'animation-pane' },
    ],
    selectedOptions: [],
  },
];
