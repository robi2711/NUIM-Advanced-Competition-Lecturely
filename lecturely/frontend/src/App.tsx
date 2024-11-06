import React, { useEffect, useState } from 'react';

interface Message {
  message: string;
}

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('/api/hello')
        .then(response => response.json())
        .then((data: Message) => setMessage(data.message))
        .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
      <div>
        <h1>React with TypeScript</h1>
        <p>{message}</p>
      </div>
  );
}

export default App;

