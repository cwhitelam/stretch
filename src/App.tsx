import React from 'react';
import { Timer } from './components/Timer';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 lg:ml-72 min-h-screen">
          <Timer />
        </main>
      </div>
    </div>
  );
}

export default App;