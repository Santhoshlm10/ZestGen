import React from 'react';

interface ICustomIconRendererProps {
    content:string
}

function CustomIconRenderer(props:ICustomIconRendererProps) {
  return (
        <span className='bg-gray-200 p-2 rounded-full text-base text-gray-700'>{props.content}</span>
  )
}

export default CustomIconRenderer