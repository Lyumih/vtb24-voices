const app = new Vue({
  el: "#app",
  data: {
    selectedQuiz: 0,
    myUser: {
      id: 1,
      username: "Никита"
    },
    quizzes: [
      {
        id: 0,
        text:
          "Одежда есть оружие красоты, которая слагает ее после сражения, как воин перед своим победителем."
      },
      {
        id: 1,
        text:
          "Браки совершаются на небесах, но там не заботятся, чтобы они были удачны."
      },
      {
        id: 2,
        text: "Многих вещей нет потому, что их не смогли никак назвать."
      },
      {
        id: 3,
        text:
          "Хорошее воспитание состоит в том, чтобы скрывать, как много мы думаем о себе и как мало о других."
      },
      {
        id: 4,
        text: "Тайна быть скучным - это высказать все."
      },
      {
        id: 5,
        text:
          "Терпение должно быть одним из первых принципов в искусстве переговоров."
      },
      {
        id: 6,
        text: "Понимать – значит чувствовать."
      },
      {
        id: 7,
        text: "Чтобы делать добро, надо прежде всего им обладать."
      },
      {
        id: 8,
        text:
          "Приверженность к любой системе воззрений - не что иное, как результат привычки; уму так же трудно отказаться от привычного образа мышления и усвоить новые представления, как телу - действовать и жить, не пользуясь свойственными ему способностями и органами."
      },
      {
        id: 9,
        text:
          "Как бы ни была женщина счастлива замужем, она всегда с удовольствием замечает, что есть на свете мужчины, которые хотели бы видеть ее незамужней."
      },
      {
        id: 10,
        text:
          "Свободным я считаю того, кто ни на что не надеется и ничего не боится."
      },
      {
        id: 11,
        text:
          "Сказка - это когда женился на лягушке, а она оказалась царевной. А быль - это когда женился на царевне, а она оказалась лягушкой."
      },
      {
        id: 12,
        text:
          "Мудрость требует от нас быть мужественными, беззаботными, насмешливыми, буйными: ведь она женщина и может любить лишь воина."
      },
      {
        id: 13,
        text: "Ничто так быстро не проходит, как новизна."
      },
      {
        id: 14,
        text:
          "Организованная преступность есть не что иное, как партизанская война против общества."
      },
      {
        id: 15,
        text:
          "Что такое сорняк? Это растение, достоинства которого еще не раскрыты."
      }
    ],
    votes: [
      {
        id: 0,
        yes: [0, 1, 2, 3, 4, 5],
        no: [6, 7, 8, 9, 10],
        quite: [11, 12, 13, 14, 15]
      },
      {
        id: 1,
        yes: [0, 2, 3, 4, 5],
        no: [6, 7, 8, 9, 10],
        quite: [11, 12, 13, 14, 15]
      },
      {
        id: 4,
        yes: [0, 2, 3, 4, 5],
        no: [1, 7, 8, 9, 10],
        quite: [11, 12, 13, 14, 15]
      }
    ],
    users: [
      {
        id: 0,
        username: "Михаил"
      },
      {
        id: 1,
        username: "Никита"
      },
      {
        id: 2,
        username: "Владислав"
      },
      {
        id: 3,
        username: "Анита"
      }
    ],
    answers: [
      {
        userId: 0,
        quizId: 1,
        text: "Это мой ответ"
      },
      {
        userId: 2,
        quizId: 5,
        text: "А это ещё один мой комментарий"
      }
    ],
    author: {
      username: "Шикарный К."
    }
  },
  computed: {
    activeQuiz() {
      return this.quizzes[this.selectedQuiz];
    },
    allAnswers() {
      return this.answers.map(answer => {
        return {
          user: this.users.find(user => user.id === answer.userId),
          quiz: this.quizzes.find(quiz => quiz.id === answer.quizId),
          answer
        };
      });
    },
    activeAnswers() {
      return this.allAnswers.filter(
        answer => answer.answer.quizId == this.selectedQuiz
      );
    },
    allUsers() {
      return this.users;
    },
    canVote() {
      return this.quizzes.map(quiz => {
        let vote = this.votes.find(vote => vote.id === quiz.id);
        console.log(vote);
        if (vote === undefined) {
          quiz.status = "new";
        } else {
          if (vote["yes"].includes(this.myUser.id)) {
            quiz.status = "yes";
          } else if (vote["no"].includes(this.myUser.id)) {
            quiz.status = "no";
          } else if (vote["quite"].includes(this.myUser.id)) {
            quiz.status = "quite";
          } else {
            console.log("found");
            quiz.status = "free";
          }
        }
        return quiz;
      });
    },
    myVotes() {
      let myVote = [];
      return this.quizzes.map(quiz => {
        let vote = this.votes.find(vote => vote.id === quiz.id);
        console.log(vote);
        if (vote === undefined) {
          return "new";
        } else if (vote.yes.includes(this.myUser.id)) {
          return "yes";
        } else if (vote.no.includes(this.myUser.id)) {
          return "no";
        } else if (vote.quite.includes(this.myUser.id)) {
          return "quite";
        }
        return "empty";
      });
    }
  },

  methods: {
    makeVote(idQuiz, userId, newVote) {
      let vote = this.votes.find(vote => vote.id === idQuiz);
      console.log(vote, idQuiz, newVote);
      if (vote === undefined) {
        vote = { id: idQuiz, yes: [], no: [], quite: [] };
        vote[newVote].push(userId);
        this.votes.push(vote);
      } else {
        console.log("have id");
        console.log(this.votes.find(vote => vote.id === idQuiz));
        this.votes.find(vote => vote.id === idQuiz)[newVote].push(userId);
      }

      console.log(vote);
    }
  }
});
