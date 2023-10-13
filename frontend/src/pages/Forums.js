import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ForumCard from '../components/ForumCard';
import '../styles/forums.css';
import { toast, ToastContainer } from 'react-toastify';

export default function Forums() {
  const [searchQuery, setSearchQuery] = useState('');
  const [forumData, setForumData] = useState([]);
  const [totalTweetCount, setTotalTweetCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [forum, setForum] = useState({
    forumtitle: '',
    forumContent: '',
    forumAuth: '',
    forumDate: '',
    forumReplies: '',
    forumId: ''
  });

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const checkWindowWidth = () => {
    if (window.innerWidth > 376) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  useEffect(() => {
    // Fetch forum data from your API when the component mounts
    fetch('https://vitalife-api.onrender.com/getAllForums')
      .then((response) => response.json())
      .then((data) => {
        setForumData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching forum data:', error);
      });

    // Calculate total tweet count from the forum data
    setTotalTweetCount(forumData.length);

    // Add a listener for window resize events
    window.addEventListener('resize', checkWindowWidth);

    // Initial check for window width
    checkWindowWidth();

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, [forumData]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setForum((prevForum) => ({ ...prevForum, [name]: value }));
  };

  const handleReplySubmit = async (e, forumId) => {
    const { forumReplies } = forum;

    try {
      const res = await fetch(`https://vitalife-api.onrender.com/forumReply/${forumId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ forumReplies }),
      });

      if (res.status === 200) {
        toast.success('Reply submitted successfully');
        console.log('Reply submitted successfully');
        window.location.reload();
      } else {
        toast.error('Try Again');
        console.log('Could not submit reply');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { forumtitle, forumContent, forumAuth, forumDate, forumReplies } = forum;

    try {
      const res = await fetch('https://vitalife-api.onrender.com/forums', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ forumtitle, forumContent, forumAuth, forumDate, forumReplies }),
      });

      if (res.status === 200) {
        toast.success('Forum uploaded successfully');
        console.log('Forum uploaded successfully');
        window.location.reload();
      } else {
        toast.error('Try Again');
        console.log('Could not upload the forum');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
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
                <ForumCard
                  key={key}
                  forum={val}
                  onReplySubmit={(e) => handleReplySubmit(e, val._id)}
                />
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
              </form>
              <button className="forumBtn">Tweet</button>
            </div>
          )}
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
