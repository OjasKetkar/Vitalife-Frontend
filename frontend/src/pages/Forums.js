import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ForumCard from '../components/ForumCard';
import '../styles/forums.css';
import { toast, ToastContainer } from 'react-toastify';

export default function Forums(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [forumData, setForumData] = useState([]);
  const [totalTweetCount, setTotalTweetCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [forum, setForum] = useState({
    forumtitle: '',
    forumContent: '',
    forumAuth: '',
    forumDate: '',
  });

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResize = () => {
    if (window.innerWidth > 376) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://vitalife-api.onrender.com/getAllForums');
        if (response.ok) {
          const data = await response.json();
          setForumData(data.data);
          setTotalTweetCount(data.data.length);
        } else {
          console.error('Error fetching forum data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching forum data:', error);
      }
    };

    fetchData();

    // Add a listener for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setForum((prevForum) => ({ ...prevForum, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { forumtitle, forumContent, forumAuth, forumDate, forumReplies } = forum;

    const formData = new FormData();
    formData.append("forumtitle", forumtitle);
    formData.append("forumContent", forumContent);
    formData.append("forumAuth", forumAuth);
    formData.append("forumDate", forumDate);

    try {
      const res = await fetch('https://vitalife-api.onrender.com/forums', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      if (res.status === 200) {
        toast.success('Forum uploaded successfully');
        console.log('Forum uploaded successfully');
        // window.location.reload();
      } else {
        toast.error('Try Again');
        console.error('Could not upload the forum');
      }
    } catch (error) {
      console.error('Error uploading the forum:', error);
      toast.error('An error occurred while uploading the forum');
    }
  };

  return (
    <>
      <div className="forums">
        <div className="forums-left">
          <div className="forum-card">
            {forumData
              .filter((val) => {
                const lowercaseQuery = searchQuery.toLowerCase();
                return (
                  val.forumtitle.toLowerCase().includes(lowercaseQuery) ||
                  val.forumContent.toLowerCase().includes(lowercaseQuery)
                );
              })
              .map((val, key) => (
                <ForumCard key={key} forum={val} />
              ))}
          </div>
        </div>

        <div className="forums-right">
          <div className="search-bar">
            <h2 className='search_header'>Search</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className='searchBar'
            />
          </div>

          <div className="forumuploadBtn">
            <button onClick={toggleFormVisibility}>Upload</button>
          </div>

          {showForm && (
            <div className="upload-forum">
              <h2 className=''>Send Your thoughts</h2>
              <form onSubmit={handleSubmit} className="uploadforum-form">
                <input
                  type="text"
                  placeholder="Title"
                  name="forumtitle"
                  onChange={handleInputs}
                  value={forum.forumtitle}
                  className="forumform-inputs"
                />
                <textarea
                  placeholder="Content"
                  name="forumContent"
                  onChange={handleInputs}
                  value={forum.forumContent}
                  className="forumform-inputs"
                  style={{ resize: 'none' }}
                />

                <input
                  type="text"
                  placeholder="Author"
                  name="forumAuth"
                  onChange={handleInputs}
                  value={forum.forumAuth}
                  className="forumform-inputs"
                />
                <input
                  type="text"
                  placeholder="Date (dd/mm/yyyy)"
                  name="forumDate"
                  onChange={handleInputs}
                  value={forum.forumDate}
                  className="forumform-inputs"
                />
                <button className="forumBtn">Tweet</button>
              </form>
            </div>
          )}
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
