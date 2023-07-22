import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {TextField } from '@mui/material';
function PollCreate() {
  const navigate = useNavigate();

  return (
    <div className='w-3/5 mx-auto'>
      <div className='my-5'>
        <h3 className='text-center text-3xl font-bold'>Create a Poll</h3>
        <p className='text-center text-gray-400'>Complete the below fields to create your poll.</p>
      </div>
      <div className='border border-t-2 border-t-orange-300 rounded-md p-5'>
        <div>
          <h2 className='text-start text-xl font-bold'>Title <i className='text-red-500'>*</i></h2>
          <div className='my-3'>
            <TextField fullWidth size='small' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollCreate