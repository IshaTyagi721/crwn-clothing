import React from 'react'

import './custom-button.styles.scss'

// const CustomButton = ({children,...otherProps}) => (
//     <button className = 'custom-button' {...otherProps}>
//         {children}
//     </button>
// )

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);


// const CustomButton = ({ children, ...otherProps }) => {
//     console.log('children: ', children);
//     console.log('otherProps: ', otherProps);
//     return (
//       <button className='custom-button' {...otherProps}>
//         {children}
//       </button>
//     )
//   };


export default CustomButton