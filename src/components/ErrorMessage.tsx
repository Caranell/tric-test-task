import React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => <span>{message}</span>;

export default ErrorMessage;
