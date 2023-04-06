import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';
import { getSearchPhoto } from '../../servises/hpotoAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ query }) => {
  const [Images, setImages] = useState([]);
  const [isLoadding, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getSearchPhoto(query, page);
        if (data.hits.length === 0) {
          throw new Error('No photos data');
        }

        setImages(prevImages =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
        setTotalImages(data.total);

        if (page === 1) {
          toast(`Found ${data.total} images`);
        } else if (data.hits.length > 0) {
          toast(`Loaded ${data.hits.length} more images`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query && (page === 1 || query !== '')) {
      fetchImages();
    }
  }, [query, page]);

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = data => {
    setModalData(data);
    console.log(modalData);
  };

  const closeModal = () => {
    setModalData(null);
  };

  console.log(1);
  return (
    <>
      {isLoadding && <Loader />}
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <ImageGalleryItem Images={Images} openModal={openModal} />
          {Images.length > 0 && Images.length !== totalImages && (
            <Button onClick={changePage} />
          )}
          <ToastContainer />
        </>
      )}
      {modalData && <Modal {...modalData} closeModal={closeModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
