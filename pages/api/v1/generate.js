import Cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';
import initMiddleware from '../../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here:
  // https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST
    methods: ['GET', 'POST'],
  }),
);

async function generateResponse(req, res) {
  await cors(req, res);

  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const engineId = 'text-curie-001';
  const {
    productTitle,
    productType,
    hasVariants,
    productAvailVars,
    productNumOfVars,
    productTargetMarket,
    maxCharLength,
  } = req.body;

  const prompt = `Write a product description for a ${productType}. The product title is "${productTitle}". ${
    hasVariants &&
    `The product has ${productNumOfVars} options for ${productAvailVars}.`
  } The description should be targeted towards ${productTargetMarket}, and the maximum length of the description should be ${maxCharLength} characters or less, rounded to the nearest full sentence.`;

  const response = await openai.createCompletion(engineId, {
    prompt: prompt,
    max_tokens: 64,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 1.79,
    best_of: 4,
  });
  res.json(response.data);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return generateResponse(req, res);
  } else {
    res.json({error: 'Method not allowed'});
  }
}
