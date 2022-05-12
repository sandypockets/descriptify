import {useState} from 'react';

export default function CopyToClipboard({text}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (copyText) => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <p
        className={`mt-1 relative bottom-2 -right-6 bg-white pt-0.5 px-1 rounded h-8 border border-opacity-60 border-black transition-all duration-200 ${
          copied ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Copied!
      </p>
      <div onClick={() => handleCopy(text)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
    </>
  );
}
