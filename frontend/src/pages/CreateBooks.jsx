import React, {useState} from 'react';
import Backbutton from '../componenets/BackButton';
import Spinner from '../componenets/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 const CreateBooks = () =>{
  const [title, setTtile] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () =>{
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.post('http://localhost:5555/books', data)
    .then(() => {
      setLoading(false);
      navigate('/');
      
    })
    .catch((error) => {
      setLoading(false);
      alert('An error happend. Please check console');
      console.log(error);
    })
  }

 
  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3x1 my-4'>Create Book </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'> Title</label>
          <input type="text" value={title} onChange={(e) => setTtile(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
          <label htmlFor="" className='text-x1 mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
          <label htmlFor="" className='text-x1 mr-4 text-gray-500'>PublishYear</label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
      </div>
      <button className='p-2 bg-sky-300 mr-8' onClick={handleSaveBook}>Create book</button>
    </div>
  )
}
export default CreateBooks