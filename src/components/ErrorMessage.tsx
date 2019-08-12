import React from 'react';

interface Props {
  field: string;
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ field, message }) => (
  <span>
    Поле {field} {message}
  </span>
);

export default ErrorMessage;
