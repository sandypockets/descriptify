import Layout from '../components/Layout/Layout';
import {useState} from 'react';
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
  const [currentAiDescription, setCurrentAiDescription] = useState(
    'Add your product information to the fields above to generate a description.',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        <h1 className="flex justify-center text-5xl">Descriptify</h1>
        <section className="flex justify-center">
          <div className="flex flex-col p-2">
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
                  ? 'mt-4 px-2 w-96 text-red-500'
                  : 'mt-4 px-2 w-96 invisible'
              }
            >
              Please fill in all required fields.
            </p>
            <div className="mt-6 mx-auto px-2 w-96">
              <p>{currentAiDescription}</p>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
