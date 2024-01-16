/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useModal from '../../hooks/use-modal';
import Modal from '../modal';

const handleUploadFile = (file, username) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('username', username); // добавляем имя пользователя в formData

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => {
  })
  .catch(error => {
  });
}


export default function Photos({ photos, username }) {
  const inputRef = useRef(null);

  const {isOpen, openModal, closeModal} = useModal();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleAddPhoto = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    setImageUrl(URL.createObjectURL(file));
  };

useEffect(() => {
    const element = inputRef.current;

    element.addEventListener('change', handleAddPhoto, false);    

    return () => {
      element.removeEventListener('change', handleAddPhoto, false);
    }
  });

  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid md:grid-cols-3 gap-8 mt-4 mb-12">
        <div className="relative group">
          <div onClick={openModal} className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded flex">
          <input ref={inputRef} type="file" />

          <p className="flex items-center text-white font-bold">
            +
          </p>
        </div>
        </div>


        {!photos
          ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)
          : photos.length > 0
            ? photos.map((photo) => (
              <div key={photo.docId} className="relative group">
                <img src={photo.imageSrc} alt={photo.caption} />

                <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
            : null}
      </div>

      {!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}

      <Modal isOpen={isOpen} onClose={closeModal}>
        {imageUrl && (<img src={imageUrl} alt="Selected file" style={{ maxWidth: '100%', marginBottom: '15px' }} />)}

        <button onClick={() => handleUploadFile(selectedFile, username)} className="block my-15 mx-auto p-4 bg-blue-medium font-bold text-sm rounded text-white">
          Upload Image
        </button>
      </Modal>
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array,
  username: PropTypes.string
};
