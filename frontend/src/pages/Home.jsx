import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../componenets/Spinner';
import {Link} from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../componenets/home/BooksCard';
import BooksTable from '../componenets/home/BooksTable';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect( () => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        // console.log(response);
        setBooks(response.data.data);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 haver:bg-sky-300 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>
          Table
        </button>

        <button className='bg-sky-300 hover:bg-sky-300 px-4 py-1 rounded-lg' onClick={ () => setShowType('card')}>
          Card
        </button>

      </div>
      <div className='flex justfy-between items-center'>
        <h1 className='text-3x1 my-8'> Books List</h1>
        <Link to='/books/create' >
          <MdOutlineAddBox className=' text-sky-800 text-4x1' />
        </Link>
      </div>
      {loading ? <Spinner/> : showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />}
    </div>
  )
}

export default Home