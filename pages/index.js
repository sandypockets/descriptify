import Layout from '../components/Layout/Layout';
import {useState, useEffect} from 'react';
import Form from '../components/Forms/Form';

export default function Home() {
  const [productData, setProductData] = useState({
    productTitle: '',
    productType: '',
    hasVariants: false,
    productAvailVars: '',
    productTargetMarket: '',
    maxCharLength: 200,
    useCustomAiEngine: false,
    aiEngine: 'text-curie-001',
  });
  const [currentAiDescription, setCurrentAiDescription] = useState('');
  const [previousAiDescriptions, setPreviousAiDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/v1/generate')
      .then((response) => response.json())
      .then((data) => {
        setPreviousAiDescriptions(data);
      });
  }, [currentAiDescription]);

  function validateForm(formData) {
    let counter = 0;
    for (const field in formData) {
      if (typeof formData[field] === 'string' && formData[field].length === 0) {
        if (field !== 'productAvailVars') {
          counter++;
        }
      }
    }
    return counter === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const formIsValid = validateForm(productData);
    setError(!formIsValid);
    if (formIsValid) {
      setPreviousAiDescriptions([
        ...previousAiDescriptions,
        currentAiDescription,
      ]);
      setCurrentAiDescription('Generating AI description...');
      fetch('/api/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setCurrentAiDescription(data?.choices[0]?.text);
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
    }
  }

  return (
    <div>
      <Layout>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <h1 className="mx-auto text-7xl font-bold">Descriptify</h1>
            <h3 className="mx-auto mt-5 mb-2 text-md font-light">
              Generate enticing product descriptions in just a few clicks!
            </h3>
            <p className="mx-auto mb-6 text-xs font-thin">
              Powered by{' '}
              <a
                className="hover:text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 transition-colors duration-200"
                href="https://beta.openai.com/"
              >
                OpenAI
              </a>
            </p>
          </div>
        </div>
        <section className="flex justify-center">
          <div className="flex flex-col">
            <Form
              productData={productData}
              setProductData={setProductData}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
            <p
              className={
                error
                  ? 'mt-4 px-2 max-w-2xl text-red-500'
                  : 'mt-4 px-2 max-w-2xl invisible'
              }
            >
              Please fill in all required fields.
            </p>
            <div className="mt-6">
              {previousAiDescriptions.length > 0 &&
                previousAiDescriptions
                  .sort((a, b) => b.id - a.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="mt-4 mx-auto max-w-lg font-light shadow-xl rounded-md p-5 bg-white"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-semibold">
                            <span>{item.title}</span>
                            <span> - </span>
                            <span>{item.type}</span>
                          </h4>
                          <h5 className="text-sm">
                            <p>
                              Generated with the{' '}
                              <code className="text-xs border-2 rounded-md px-1 bg-gray-50">
                                {item.ai_engine}
                              </code>{' '}
                              AI engine
                            </p>
                            <p>
                              {item.has_variants ? 'Options for ' : ''}
                              {item.options}
                            </p>
                          </h5>
                        </div>
                        <span>Copy</span>
                      </div>
                      <div className="mt-3">
                        <h5 className="font-semibold">Description</h5>
                        <p>{item.ai_response}</p>
                        <hr className="my-3" />
                        <h5 className="font-semibold">AI Prompt</h5>
                        <p>{item.ai_prompt}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
