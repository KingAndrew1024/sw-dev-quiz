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
      if(this.quizFinished) return true;

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
        this.quizFinished = true;
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

      //console.log(this.quiz[this.currentQuestionIndex].selectedOptions);
    },  
    saveCheckboxQuestion() {
      let selected = this.getSelectedItems();

      this.quiz[this.currentQuestionIndex].selectedOptions = selected;

      //console.log(this.quiz[this.currentQuestionIndex].selectedOptions);
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

      //console.log(this.quiz[this.currentQuestionIndex].selectedOptions);
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
      setTimeout(() => {
        alert(
          `Your score is ${((score / this.totalQuestions) * 100).toFixed(2)}`
        );
      }, 100);
      
    },
  },
});

app.mount('#app');

function addDraggableCapabilities(id) {
  $(function () {
    $(`#${id}`).sortable();
  });
}

function shuffleSimpleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
