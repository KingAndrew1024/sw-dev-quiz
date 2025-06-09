QUIZ.forEach((q) => {
  q.options = shuffleSimpleArray(q.options);
});

const app = Vue.createApp({
  data() {
    return {
      quiz: shuffleSimpleArray(QUIZ),
      currentQuestionIndex: 0,
      hasOptionsSelected: false,
      checkboxexChecked: 0,
      quizFinished: false,
      totalQuestions: QUIZ.length,
    };
  },
  mounted() {
    this.quiz.forEach((q, index) => {
      if (q.type === 'sort') {
        addDraggableCapabilities(`question_${index}`);
      }
    });
  },
  computed: {
    disableNextButton() {
      if (this.quiz[this.currentQuestionIndex].type === 'sort') {
        return false;
      } else if (this.quiz[this.currentQuestionIndex].type === 'check') {
        return this.checkboxexChecked === 0;
      }

      return !this.hasOptionsSelected;
    },
  },
  methods: {
    next() {
      this.saveQuestionData();
      this.hasOptionsSelected = false;
      this.checkboxexChecked = 0;
      if (this.currentQuestionIndex + 1 < this.totalQuestions) {
        this.currentQuestionIndex++;
      } else {
        this.calculateScore();
      }
    },
    saveQuestionData() {
      switch (this.quiz[this.currentQuestionIndex].type) {
        case 'radio':
          this.saveRadioQuestion();
          break;
        case 'check':
          this.saveCheckboxQuestion();
          break;
        case 'sort':
          this.saveSortQuestion();
          break;
        default:
          console.error('No suitable option to save!');
      }
    },
    saveRadioQuestion() {
      let selected = this.getSelectedItems()[0];

      this.quiz[this.currentQuestionIndex].selectedOptions = [selected];

      console.log(this.quiz[this.currentQuestionIndex].selectedOptions);
    },
    saveCheckboxQuestion() {
      let selected = this.getSelectedItems();

      this.quiz[this.currentQuestionIndex].selectedOptions = selected;

      console.log(this.quiz[this.currentQuestionIndex].selectedOptions);
    },
    saveSortQuestion(order) {
      if (!order) {
        const items = document
          .querySelector('#question_' + this.currentQuestionIndex)
          .querySelectorAll('.sortable-item');

        order = [];
        items.forEach((i) => {
          order.push(+i.getAttribute('data-order'));
        });
      }

      this.quiz[this.currentQuestionIndex].selectedOptions = order;

      console.log(this.quiz[this.currentQuestionIndex].selectedOptions);
    },
    getSelectedItems() {
      const question = document.querySelector(
        '#question_' + this.currentQuestionIndex
      );

      if (!question) return [];

      const inputs = question.querySelectorAll('input');

      let selected = [];
      inputs.forEach((i) => {
        if (i.checked) {
          selected.push(+i.getAttribute('data-id'));
        }
      });

      return selected;
    },
    checkboxChanged(val) {
      this.checkboxexChecked += val ? 1 : -1;
    },
    calculateScore() {
      //console.log('--- Calculating your score...');
      let score = 0;
      this.quiz.forEach((q, index) => {
        if (q.type === 'radio') {
          const correct = q.options.filter((o) => o.correct)[0];

          score += correct.id === q.selectedOptions[0] ? 1 : 0;
          /* if (correct.id !== q.selectedOptions[0]) {
            console.log(
              '--- incorrect',
              index + 1,
              correct,
              q.selectedOptions[0]
            );
          } */
        } else if (q.type === 'check') {
          const correct = q.options.filter((o) => o.correct);
          const optionValue = 1 / correct.length; // value of every correct option
          questionScore = 0;
          correct.forEach((o) => {
            questionScore += q.selectedOptions.includes(o.id)
              ? optionValue
              : optionValue * -1;
          });
          score += questionScore > 0 ? questionScore : 0;
          /* if (score !== 1) {
            console.log('--- incorrect', index + 1, correct);
          } */
        } else {
          const correct = q.options.sort((a, b) => a.order - b.order);
          const optionValue = 1 / correct.length; // value of every correct option
          questionScore = 0;
          correct.forEach((o, index) => {
            questionScore +=
              q.selectedOptions[index] === o.order
                ? optionValue
                : optionValue * -1;
          });
          score += questionScore > 0 ? questionScore : 0;
        }
      });
      console.log(
        '--- Final Score:',
        score,
        (score / this.totalQuestions) * 100
      );
      alert(`Your score is ${((score / this.totalQuestions) * 100).toFixed(2)}`)
    },
  },
});

app.mount('#app');

function addDraggableCapabilities(id) {
  const list = document.querySelector(`#${id}.sortable-list`);
  let draggingItem = null;

  list.addEventListener('dragstart', (e) => {
    draggingItem = e.target;
    e.target.classList.add('dragging');
  });

  list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');

    document
      .querySelector(`#${id}.sortable-list`)
      .querySelectorAll('.sortable-item')
      .forEach((item) => {
        item.classList.remove('over');
      });

    draggingItem = null;
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);

    // Remove .over from all items
    document
      .querySelectorAll('.sortable-item')
      .forEach((item) => item.classList.remove('over'));

    if (draggingOverItem) {
      draggingOverItem.classList.add('over'); // Add .over to the hovered item
      list.insertBefore(draggingItem, draggingOverItem);
    } else {
      list.appendChild(draggingItem); // Append to the end if no item below
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll('.sortable-item:not(.dragging)'),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}

function shuffleSimpleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
