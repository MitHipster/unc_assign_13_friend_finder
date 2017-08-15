/*jslint esversion: 6, browser: true*/
const $quesCont = $('.question-container');
const $surveyForm = $('#survey-form');
const $submitBtn = $('#submit');
const $nameInput = $('#name');
const $linkInput = $('#link');

// Array of survey questions
let questions = [
  'Your mind is always buzzing with unexplored ideas and plans.',
  'Generally speaking, you rely more on your experience than your imagination.',
  'You find it easy to stay relaxed and focused even when there is some pressure.',
  'You rarely do something just out of sheer curiosity.',
  'People can rarely upset you.',
  'It is often difficult for you to relate to other people’s feelings.',
  'In a discussion, truth should be more important than people’s sensitivities.',
  'You rarely get carried away by fantasies and ideas.',
  'You think that everyone’s views should be respected regardless of whether they are supported by facts or not.',
  'You feel more energetic after spending time with a group of people.'
];

// Function to generate html for survey questions and select inputs
let createQuestions = function () {
  questions.forEach(function (q, i) {
    let html =
    `<h3>Question ${i + 1}</h3>
    <div class="form-group">
      <label for="q${i + 1}">${q}</label>
      <select class="form-control questions" id="q${i + 1}" required>
        <option value="" disabled selected>Select an option</option>
        <option value="1">1 (Strongly disagree)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Strongly agree)</option>
      </select><br/>
    </div>`;
    $($quesCont).append(html);
  });
};

$surveyForm.submit(function (e) {
  e.preventDefault();

  const $quesClass = $('.questions');
  let answers = [];
  $quesClass.each(function(i){
    answers.push($('#q' + (i + 1)).val());
  });

  var newFriend = {
    name: $nameInput.val().trim(),
    photo: $linkInput.val().trim(),
    scores: answers,
  };
  console.log(newFriend);
  let currentURL = window.location.origin;
  let apiPath = '/api/friends';

  $.ajax({
    type: 'POST',
    url: currentURL + apiPath,
    data: JSON.stringify(newFriend),
    contentType: 'application/json',
  }).done(function () {
    $surveyForm[0].reset();
  });
});
