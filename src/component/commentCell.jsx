import React from 'react';

export const CommentCell = ({ row, onChange, isEditable }) => {
  const handleCommentChange = (event) => {
    onChange(row.id, event.target.value);
  };

  return (
    <input
      type="text"
      value={row.comment || ''}
      onChange={handleCommentChange}
      disabled={!isEditable} // Enable based on isEditable prop
      placeholder={isEditable ? 'Add a comment' : ''}
    />
  );
};
