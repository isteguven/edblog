/* eslint-disable react/prop-types */
//import moment from "moment";
import moment from 'moment/min/moment-with-locales';
import "moment/locale/tr";
moment.locale("tr");
//import tr from 'moment/locale/tr'
import { useEffect, useState } from 'react';
import { FaThumbsUp,FaThumbsDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import { set } from 'mongoose';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
   useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 
  
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200 border-2 border-amber-300'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : 'Anonim kullanıcı'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow() } 
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='greenToBlue'
                onClick={handleSave}
              >
                Kaydet
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToPink'
                outline
                onClick={() => setIsEditing(false)}
              >
               İptal
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-4'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-green-300 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-green-300' 
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'beğeni' : 'beğeni')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      Güncelle
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      Sil
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}