import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';
import { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');

  const changeQuery = query => {
    setQuery(query);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery query={query} />
    </div>
  );
};

export default App;
