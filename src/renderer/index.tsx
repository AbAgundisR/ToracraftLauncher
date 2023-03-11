import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import './App.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <Router>
        <Routes>
            <Route index element={<App></App>} />
        </Routes>
    </Router>
);
