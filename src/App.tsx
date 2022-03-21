import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';

function App() {
  const [term, setTerm] = useState<any>("");

  return (
    <div className="App">
      <Search getTerm={setTerm} />
      {term && <Results searchTerm={term}/>}
    </div>
  );
}

export default App;
