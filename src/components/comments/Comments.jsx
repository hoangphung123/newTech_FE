import { useState, useContext } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';

const Comments = () => {
  const { currentUser } = useContext(AuthContext);

  // State to manage comments
  const [comments, setComments] = useState([
    {
      id: 1,
      desc: "Wow i want it, plz",
      name: "Thanh Sang",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "It's so lovely, check your ib",
      name: "Minh Hung",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ]);

  // State to manage the new comment input
  const [newComment, setNewComment] = useState('');

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return; // Do not add empty comments
    }

    const newCommentObject = {
      id: comments.length + 1, // Generate a unique ID (replace with your logic)
      desc: newComment,
      name: currentUser.displayName,
      userId: currentUser.uid,
      profilePicture: currentUser.profileImg,
    };

    // Update the comments state with the new comment
    setComments((prevComments) => [...prevComments, newCommentObject]);

    // Clear the new comment input
    setNewComment('');
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profileImg} alt="" />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
