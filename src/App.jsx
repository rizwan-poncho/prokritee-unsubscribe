import { useState } from 'react';
import prokriteeLogo from "/Prokritee Logo-01.png";
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

function App() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isValid && email) {
      emailjs
        .send(
          'service_j1eemct',
          'template_31ratio',
          { email: email }, // Pass the email as a param
          'wsWwdWjS2SBRK1Nwm'
        )
        .then(
          (result) => {
            toast.success(`Successfully Unsubscribed ${email}`);
            console.log('Unsubscribing:', result.text);
            setEmail('');
          },
          (error) => {
            toast.error('Something went wrong. Please try again later.');
            console.error('Error:', error.text);
          }
        );
    }
  };

  return (
    <>
      <Toaster />
      <main id="content" role="main" className="w-full xl:px-80 lg:px-40 md:px-40 p-6">
        <div className="mt-7 bg-white xl:px-40 xl:py-20 lg:px-20 lg:py-20 md:px-20 md:py-20 sm:px-10 sm:py-10 rounded-xl shadow-lg border-2 border-[#00A950]">
          <div className="p-4 sm:p-7">
            <div className="text-center w-full">
              <div className="!flex justify-center">
                <img src={prokriteeLogo} className="h-20 pb-2 " alt="Prokritee Logo" />
              </div>
              <h1 className="block text-2xl font-bold text-gray-800">
                Unsubscribe from Prokritee Newsletter
              </h1>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2">
                      Email address
                    </label>
                    <div className="relative w-full">
                      <input
                        type="email"
                        id="email"
                        name="email" // This must match the template param in EmailJS
                        value={email}
                        onChange={handleEmailChange}
                        className={`py-3 px-4 block w-full border-2 rounded-md text-sm focus:ring-2 focus:ring-offset-2 shadow-sm ${
                          isValid
                            ? 'border-gray-200 focus:border-[#00A950] focus:ring-[#00A950]'
                            : 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        }`}
                        required
                        aria-describedby="email-error"
                        placeholder="Enter your email"
                      />
                    </div>
                    <p
                      className={`text-xs text-red-600 mt-2 ${
                        isValid || !email ? 'hidden' : ''
                      }`}
                      id="email-error"
                    >
                      Please include a valid email address
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={!isValid || !email}
                    className={`w-full py-3 mt-5 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm ${
                      !isValid || !email
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#00A950] hover:bg-[#00A950] focus:ring-[#00A950]'
                    }`}
                  >
                    Unsubscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center divide-x divide-gray-300">
          <strong>Did you mistakenly Unsubscribe from Prokritee's Newsletter? |</strong> | Mail us at contact@prokritee.com to subscribe again.
        </p>
      </main>
    </>
  );
}

export default App;