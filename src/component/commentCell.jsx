import React from 'react';

export const CommentCell = ({ row, onChange, isEditable, columnWidth }) => {
  const handleCommentChange = (event) => {
    onChange(row.id, event.target.value);
  };

  const textareaStyle = {
    width: columnWidth ? columnWidth : '100%', // Set width based on columnWidth prop or default to 100%
    height: '100%', // Adjust height as needed
    boxSizing: 'border-box', // Ensures padding and borders are included in the element's total width and height
  };

  return (
    <textarea
      value={row.comment || ''}
      onChange={handleCommentChange}
      disabled={!isEditable}
      placeholder={isEditable ? 'Add a comment' : ''}
      style={textareaStyle}
    />
  );
};
