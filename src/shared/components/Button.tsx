import React from 'react';
import MuiButton from '@mui/material/Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  mui?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, mui = false, ...props }) => {
  if (mui) {
    // Filter out className and type to avoid React warnings with MUI Button
    // and map HTML button props to MUI Button props as needed
    const { className, type, ...muiProps } = props;
    // TypeScript: MUI Button expects its own prop types, not HTMLButtonElement props.
    // For demo purposes, cast muiProps to any to avoid type error.
    return (
      <MuiButton
        variant="contained"
        color={"primary"}
        type={type ?? "button"}
        {...(muiProps as any)}
      >
        {children}
      </MuiButton>
    );
  }
  return (
    <button
      {...props}
      className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;