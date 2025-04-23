'use client'

import { useState } from "react";
import * as Newsletter from './newsletter';

export default function Home() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [email, setEmail] = useState('');

  function handleOnClose() {
    setEmail('');
    setShowFeedback(false)
  }

  function handleOnSuccess() {
    setShowFeedback(Boolean(email))
  }

  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div className="h-screen sm:max-w-4xl sm:h-fit sm:rounded-4xl bg-White">
        { showFeedback
          ? <Newsletter.Success 
              email={email}
              onClose={handleOnClose} 
            />
          : <Newsletter.Form 
              email={email} 
              onChange={(e) => setEmail(e.target.value)}
              onSuccess={handleOnSuccess} 
            />
        }
      </div>
    </main>
  );
}
