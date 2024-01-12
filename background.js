const apiKey = 'YOUR_API_KEY'; // Replace with your OPENAI API key

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === 'gptComplete') {
		console.log('Received message from content script');
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo-1106',
				messages: [
					{
						role: 'system',
						content:
							'You are answering a test, ONLY provide the multiple choice option you choose per question in a list that goes from 1 to 100. Do NOT provide any reasoning or anything other than the final answer.',
					},
					{
						role: 'user',
						content: request.query,
					},
				],
			}),
		};
		fetch('https://api.openai.com/v1/chat/completions', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				console.log(data.choices[0].message.content);
				sendResponse(data.choices[0].message.content);
			})
			.catch((error) => {
				console.error('Error:', error);
				sendResponse(error);
			});
		return true;
	}
});
