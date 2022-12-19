const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
const prompt = require('prompt');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

gpt = async (question) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: "izmire en son ne zaman kar yağdı?",
        prompt: question,
        max_tokens: 256,
        temperature: 0.7,
    });
    const msg = await response.data.choices[0].text;
    return msg;
    //console.log(msg);
}

prompt.start();

prompt.get('Question', async (err, result) => {
    if (err) {
      console.log(err.message);
    }else{
        const chatGptResponse = await gpt(result.Question);
        console.log(chatGptResponse);
    }
  });
  
