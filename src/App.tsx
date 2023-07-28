import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { config } from './routes/Routes';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import css from './App.module.scss';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className={css.wrap}>
          <Routes>
            {config.map((c, index) => (
              <Route key={index} path={c.path} element={<c.element />} />
            ))}
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
