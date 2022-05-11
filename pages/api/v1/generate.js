import Cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';
import initMiddleware from '../../../lib/init-middleware';
import {supabase} from '../../../lib/supabaseClient';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here:
  // https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST
    methods: ['POST'],
  }),
);

async function saveToDb(body, prompt, aiResponse) {
  try {
    const {data, error} = await supabase.from('product_descriptions').insert([
      {
        title: body.productTitle,
        type: body.productType,
        has_variants: body.hasVariants,
        options: body.productAvailVars,
        target_audience: body.productTargetMarket,
        ai_engine: body.aiEngine,
        ai_response: aiResponse,
        ai_prompt: prompt,
      },
    ]);
    if (data) console.log('Successfully saved to database');
    if (error) console.error('Error saving to database: ', error);
  } catch (err) {
    console.error('Description could not be saved to the database: ', err);
  }
}

async function generateResponse(req, res) {
  await cors(req, res);

  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const {
    productTitle,
    productType,
    hasVariants,
    productAvailVars,
    productTargetMarket,
    maxCharLength,
    aiEngine,
  } = req.body;

  const promptTypeAndTitle = `Write a product description for a ${productType}. The product title is "${productTitle}".`;
  const promptVariants = `The product has options for ${productAvailVars}.`;
  const promptInterests = `The product description should be written for an audience that is interested in ${productTargetMarket}.`;
  const promptRequirements = `The maximum length of the description should be ${maxCharLength} characters or less, rounded to the nearest full sentence.`;
  const prompt = `${promptTypeAndTitle}. ${promptInterests}. ${
    hasVariants && promptVariants
  }. ${promptRequirements}`;

  try {
    const response = await openai.createCompletion(aiEngine, {
      prompt: prompt,
      max_tokens: 64,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0.75,
      presence_penalty: 2,
      best_of: 5,
    });
    if (response) {
      res.json(response.data);
      await saveToDb(req.body, prompt, response.data.choices[0].text);
    }
  } catch (err) {
    console.error('Error generating response: ', err);
  }
}

async function getAllDescriptions(req, res) {
  try {
    const {data, error} = await supabase.from('product_descriptions').select();
    if (data) res.json(data);
    if (error) console.error('Error getting descriptions: ', error);
  } catch (err) {
    console.error('Error. Could not descriptions: ', err);
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return generateResponse(req, res);
  } else if (req.method === 'GET') {
    return getAllDescriptions(req, res);
  } else {
    res.json({error: 'Method not allowed'});
  }
}
