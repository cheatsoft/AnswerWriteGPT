function run() {
	let prompt = '';
	const questions = document.querySelectorAll('[id^="LblQText"]');
	const answers = document.querySelectorAll(
		'[id^="LblQ"]:not([id^="LblQText"]):not([id^="LblQAsterisk"])'
	);
	console.log(answers);
	for (let i = 0; i < questions.length; i++) {
		prompt += 'Question  ' + questions[i].innerText + '\n' + 'Answers: \n';
		const questionAnswers = answers[i].querySelectorAll('label');
		for (let j = 0; j < questionAnswers.length; j++) {
			if (questionAnswers[j].innerText !== '') {
				prompt += questionAnswers[j].innerText + '\n';
			}
		}
	}
	console.log(prompt);
	chrome.runtime.sendMessage(
		{
			type: 'gptComplete',
			query: prompt,
		},
		(result) => {
			console.log(result);
			document.body.appendChild(document.createTextNode(result));
			result = result.split('\n');
			for (let i = 0; i < questions.length; i++) {
				questions[i].prepend(result[i].replace(/\d+\.\s*/g, ''));
			}
		}
	);
}
run();
