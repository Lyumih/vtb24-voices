var topic = new Vue({
  el: '#app',
  data: {
    topic: 'Тема',
    date: new Date().toLocaleString(),
    percent: '100%',
    todos: [
      { name: 'Анита' },
      { name: 'Никита' },
      { name: 'Михаил' },
      { name: 'Владислав' }
    ],
    comment: 'ccccccccc',
    vote: [
      { text: 'За - 10%' },
      { text: 'Против - 80%' },
      { text: 'Воздержался -10%' },
    ],
    decision: "Перенести голосование на следующую дату",
    signature: '21eefwfwegsdgsffgdfgd'
  }
});
