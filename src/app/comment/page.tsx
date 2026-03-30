





"use client"
import React, { useState } from 'react'

// 1. Define the structure of a Comment
type CommentItem = {
  id: string;
  text: string;
  replies: string[]; // Each comment holds its own specific array of replies
}

const NestedComments = () => {
  // Input fields state
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState("")

  // Data state (Stores everything)
  const [comments, setComments] = useState<CommentItem[]>([])

  // UI state (Tracks which comment's reply box is open)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

  // Submits a main comment
  const handleAddComment = () => {
    if (commentText.trim() === "") return;

    const newComment: CommentItem = {
      id: Date.now().toString(), // Creates a unique ID based on the current time
      text: commentText,
      replies: []
    }

    setComments(prev => [...prev, newComment])
    setCommentText("")
  }

  // Opens the reply box for a specific comment
  const handleOpenReplyBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveReplyId(e.currentTarget.id)
    setReplyText("") // Clear out any old text when opening a new reply box
  }

  // Submits a reply to a specific comment
  const handleSubmitReply = (parentId: string) => {
    if (replyText.trim() === "") return;

    // Loop through comments. If we find the matching ID, add the reply to ITS array.
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, replyText] }
        }
        return comment;
      })
    )

    setReplyText("")
    setActiveReplyId(null) // Closes the reply box after submitting
  }

  return (
    <div className='flex flex-col items-center min-h-screen w-screen mt-10'>
<h1 className='text-green-800 text-3xl p-6 m-6'>Nested Comment <hr /></h1>
      {/* --- MAIN COMMENT INPUT --- */}
      <div>
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className='mx-4 text-black p-1 rounded'
          type="text"
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment} className='bg-blue-600 h-8 w-20 text-white rounded-xl'>
          Comment
        </button>
      </div>

      {/* --- COMMENTS DISPLAY --- */}
      <div className='w-full max-w-md mt-6'>
        {comments.map((comment) => (
          <div className='flex flex-col gap-2 p-3 bg-gray-700 m-3 rounded shadow' key={comment.id}>

            <div className='flex justify-between items-center'>
              <h1 className='text-white text-lg'>{comment.text}</h1>
              <button
                id={comment.id}
                onClick={handleOpenReplyBox}
                className='bg-blue-500 w-16 text-sm text-white rounded-xl p-1'
              >
                Reply
              </button>
            </div>

            {/* --- REPLIES DISPLAY --- */}
            {comment.replies.length > 0 && (
              <div className='ml-6 mt-2 flex flex-col gap-1'>
                {comment.replies.map((reply, ind) => (
                  <div key={ind} className='bg-gray-600 text-white p-2 rounded text-sm'>
                    ↳ {reply}
                  </div>
                ))}
              </div>
            )}

            {/* --- REPLY INPUT BOX (Only shows if active) --- */}
            {activeReplyId === comment.id && (
              <div className='ml-6 mt-2 flex gap-2'>
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)} // Fixed this!
                  className="p-1 rounded text-black text-sm w-full"
                  type="text"
                  placeholder="Type your reply..."
                />
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  className='bg-red-500 text-white text-sm rounded-xl p-1 whitespace-nowrap px-3'
                >
                  Submit
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  )
}

export default NestedComments

