import Cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';
import initMiddleware from '../../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here:
  // https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST
    methods: ['GET'],
  }),
);

async function getEngines(req, res) {
  await cors(req, res);

  const {Configuration, OpenAIApi} = require('openai');
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listEngines();
  res.json(response.data);
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    return getEngines(req, res);
  } else {
    res.json({error: 'Method not allowed'});
  }
}
