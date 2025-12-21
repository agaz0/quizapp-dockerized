/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const QuizCard = ({ quiz }) => {
  const [attempted, setAttempted] = useState(false)
  const { user } = useSelector(state => state.auth)

  if (!quiz) return null

  useEffect(() => {
    if (Array.isArray(user?.attemptedQuizzes)) {
      setAttempted(user.attemptedQuizzes.includes(quiz._id))
    }
  }, [user, quiz._id])

  return (
    <Link
      to={`/quiz/${quiz._id}`}
      className='border border-slate-600 bg-slate-900 p-3 rounded-lg relative overflow-hidden'
    >
      <h2 className='text-xl line-clamp-2 border-b border-slate-600 pb-3 mb-2'>
        {quiz.title}
      </h2>

      <span className='font-thin'>
        <p className='line-clamp-2'>{quiz.description}</p>

        <span className='flex gap-3'>
          <p>{quiz.createdBy?.username || "Unknown"}</p>
          |
          <p>
            {quiz.createdAt
              ? formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })
              : "Just now"}
          </p>
        </span>
      </span>

      {attempted && (
        <span className='absolute top-[10%] right-[-10%] rotate-[30deg]'>
          <span className='bg-green-600 text-white px-10 py-1 text-sm'>
            Completed
          </span>
        </span>
      )}
    </Link>
  )
}

export default QuizCard
