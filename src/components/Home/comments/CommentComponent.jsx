import { useState, useEffect, useRef } from "react";

const CommentComponent = ({
  comment,
  user,
  handleDeleteComment,
  handleEditComment,
  handleAddReply,
  handleDeleteReply,
  replies,
  handleEditReply,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [newCommentText, setNewCommentText] = useState(comment.text);
  const [reply, setReply] = useState("");
  const [replyText, setReplyText] = useState("");
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [newReplyText, setNewReplyText] = useState("");
  const [replyPromptOpen, setReplyPromptOpen] = useState({});

  const replyTextAreaRef = useRef(null);
  const replyPromptTextAreaRef = useRef(null);

  useEffect(() => {
    if (isReplying) {
      replyTextAreaRef.current.focus();
    }
  }, [isReplying]);

  useEffect(() => {
    if (isEditingReply) {
      replyPromptTextAreaRef.current.focus();
    }
  }, [isEditingReply]);

  const handleEditReplyButtonClick = (replyId, replyText) => {
    setIsEditingReply(true);
    setEditingReplyId(replyId);
    setNewReplyText(replyText);
  };

  const handleSaveReplyButtonClick = () => {
    handleEditReply(comment.id, editingReplyId, newReplyText);
    setIsEditingReply(false);
    setEditingReplyId(null);
    setNewReplyText("");
  };

  const handleReplyPromptButtonClick = (replyId) => {
    setReplyPromptOpen((prevState) => ({
      ...prevState,
      [replyId]: !prevState[replyId],
    }));
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    handleEditComment(comment.id, newCommentText);
    setIsEditing(false);
  };

  const handleReplyButtonClick = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = () => {
    handleAddReply(comment.id, reply);
    setReply("");
    setIsReplying(false);
  };

  const handleReplyTextChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplyTextKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  const handleReplyPromptSubmit = (replyId) => {
    handleAddReply(comment.id, replyText);
    setReplyText("");
    setReplyPromptOpen((prevState) => ({ ...prevState, [replyId]: false }));
  };

  const handleReplyPromptTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplyPromptTextKeyDown = (e, replyId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplyPromptSubmit(replyId);
    }
  };



  return (
    <div>
      <div className="flex items-start ">
        <img
          src={comment.avatar}
          alt="Avatar"
          className="rounded-full w-10 h-10 m-4 mr-2 border-white border-2"
        />
        <div className="flex flex-col">
          <p className="text-m  mt-4 font-bold">{comment.username}:</p>
          <p className="text-xs  font-light color text-gray-400">
            {comment.edited && "(edited)"}
          </p>
          <p className="text-xs text-gray-500">
            {`${new Date(comment.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} ${new Date(comment.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
          </p>
          {isEditing ? (
            <>
              <div style={{ position: 'relative', display: "flex", justifyContent: "space-between" }}>
                <textarea
                  className="m-2 px-2"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  style={{
                    width: "450px",
                    height: "auto",
                    resize: "vertical",
                    wordWrap: "break-word",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(10px)",
                    paddingRight: "95px",
                  }}
                  rows={3}
                />
                <button
                  className=" py-6 px-4 text-xs hover:text-cyan-500"
                  onClick={handleSaveButtonClick}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '2px',
                    zIndex: 1,
                    backgroundColor: 'transparent',
                  }}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <p
                className="m-0 py-2 -mb-6 max-w-fit"
                style={{
                  width: "450px",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {comment.text}
              </p>
              {user && (
                <div className="flex space-x-2 mt-2 py-2 relative">
                  {user && comment.userId === user.Id && (
                    <>
                      <button
                        className="px-1 py-0.5 text-gray-400 text-xs hover:text-cyan-500"
                        onClick={handleEditButtonClick}
                      >
                        Edit
                      </button>
                      <button
                        className="px-1 py-0.5 text-xs text-gray-400 hover:text-cyan-500"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    className="px-1 py-0.5 text-gray-400 text-xs hover:text-cyan-500"
                    onClick={handleReplyButtonClick}
                  >
                    Reply
                  </button>
                </div>
              )}
            </>
          )}
          {isReplying && (
            <>
              <div style={{ position: 'relative', display: "flex", justifyContent: "space-between" }}>  <textarea
                ref={replyTextAreaRef}
                className="m-2 px-2 py-4 "
                value={reply}
                onChange={handleReplyTextChange}
                onKeyDown={handleReplyTextKeyDown}
                style={{
                  width: "450px",
                  height: "auto",
                  resize: "vertical",
                  wordWrap: "break-word",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(10px)",
                }}
                rows={3}
              />
                <button
                  className=" py-6 px-4 text-xs hover:text-cyan-500"
                  onClick={handleReplySubmit}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '2px',
                    zIndex: 1,
                    backgroundColor: 'transparent',
                  }}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {replies &&
        replies.map((reply, index) => (
          <div key={index} className="flex flex-col pl-14 pt-1">
            <div className="flex items-start">
              <img
                src={reply.avatar}
                alt="Avatar"
                className="rounded-full mr-2 w-10 h-10 border-white border-2"
                style={{ paddingRight: "10px" }}
              />
              <div className="flex flex-col">
                <p className=" text-m font-bold">{reply.username}:</p>
                <p className="text-xs  font-light color text-gray-400">
                  {reply.edited && "(edited)"}
                </p>
                <p className="text-xs text-gray-500">
                  {`${new Date(reply.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} ${new Date(reply.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                </p>

                {isEditingReply && editingReplyId === reply.id ? (
                  <>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <textarea
                        ref={replyPromptTextAreaRef}
                        className="m-2 px-2 py-2 "
                        value={newReplyText}
                        onChange={(e) => setNewReplyText(e.target.value)}
                        style={{
                          width: "450px",
                          height: "auto",
                          resize: "vertical",
                          wordWrap: "break-word",
                          color: "white",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          backdropFilter: "blur(10px)",
                        }}
                        rows={3}
                      />
                      <button
                        className=" py-6 px-4 text-xs hover:text-cyan-500"
                        onClick={handleSaveReplyButtonClick}
                        style={{
                          position: 'absolute',
                          bottom: '5px',
                          right: '2px',
                          zIndex: 1,
                          backgroundColor: 'transparent',
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      className=" py-2 -mb-2 max-w-fit"
                      style={{
                        width: "450px",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {reply.text}
                    </p>
                    {user && (
                      <div className="flex space-x-2">
                       {user && reply.userId === user.Id && (
  <>
    <button
      className="px-0.5 py-0.25 text-gray-400 text-xs hover:text-cyan-500"
      onClick={() =>
        handleDeleteReply(comment.id, reply.id)
      }
    >
      Delete
    </button>
    <button
      className="px-0.5 py-0.25 text-gray-400 text-xs hover:text-cyan-500"
      onClick={() =>
        handleEditReplyButtonClick(reply.id, reply.text)
      }
    >
      Edit
    </button>
  </>
)}
                        <button
                          className="px-0.5 py-0.25 text-gray-400 text-xs hover:text-cyan-500"
                          onClick={() => handleReplyPromptButtonClick(reply.id)}
                        >
                          Reply
                        </button>
                      </div>
                    )}
                    {replyPromptOpen[reply.id] && (
                      <div>
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <textarea
                          className="m-2 px-2 py-2"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={handleReplyPromptTextChange}
                            onKeyDown={(e) =>
                              handleReplyPromptTextKeyDown(e, reply.id)
                            }
                            style={{
                              width: "450px",
                              height: "auto",
                              resize: "vertical",
                              wordWrap: "break-word",
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              backdropFilter: "blur(10px)",
                            }}
                            rows={3}
                          />
                        
                          <button
                            className="py-6 px-4 text-xs hover:text-cyan-500"
                            onClick={() => handleReplyPromptSubmit(reply.id)}
                            style={{
                              position: 'absolute',
                              bottom: '5px',
                              right: '2px',
                              zIndex: 1,
                              backgroundColor: 'transparent',
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentComponent;
