import React, { useState } from 'react';
import '../styles/forumcard.css'
import blogImage from '../utils/person1.png'


export default function ForumCard({ forum, onReplySubmit }) {
  const [reply, setReply] = useState('');

  return (
    <div className="forumcard">
      <div className="forumcard-image">
      <img src={blogImage} alt="" />
      </div>

      <div className="forumcard-content">

      <h2 className='forum-header'>{forum.forumtitle}</h2>
      <p>{forum.forumContent}</p>
      <p>{forum.forumDate} | {forum.forumAuth}</p>
      {forum.forumReplies ? (
        <p>Replies: {forum.forumReplies}</p>
        ) : (
          ''
          )}

      </div>
    </div>
  );
}
