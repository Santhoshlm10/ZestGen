import React from 'react';

interface ICustomIconRendererProps {
  content: string
}

function CustomIconRenderer(props: ICustomIconRendererProps) {
  return (
    <p className='inline-block bg-gray-200 p-2 rounded-full text-base text-gray-700 w-9 h-9'>{props.content}</p>
  )
}

export default CustomIconRenderer