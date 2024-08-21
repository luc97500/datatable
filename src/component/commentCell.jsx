import { TextField } from '@mui/material';
import React from 'react';

export const CommentCell = ({ row, onChange, isEditable }) => {
  const handleCommentChange = (event) => {
    onChange(row.id, event.target.value);
  };

  return (
    <TextField
      type="text"
      value={row.comment || ''}
      onChange={handleCommentChange}
      disabled={!isEditable} // Enable based on isEditable prop
      placeholder={isEditable ? 'Add a comment' : ''}
      fullWidth
      variant='outlined'
    />
  );
};
