import Cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';
import initMiddleware from '../../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here:
  // https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST
    methods: ['POST'],
  }),
);

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

  const response = await openai.createCompletion(aiEngine, {
    prompt: prompt,
    max_tokens: 64,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0.75,
    presence_penalty: 2,
    best_of: 5,
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
