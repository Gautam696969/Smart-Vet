import React from 'react';
import Button from './Button';

const App: React.FC = () => {
  return (
    <div>
      {/* This file is misplaced and should be removed or moved */}
      App component
      <div style={{ marginTop: 16 }}>
        <Button mui>Material UI Button</Button>
      </div>
    </div>
  );
};

export default App;
