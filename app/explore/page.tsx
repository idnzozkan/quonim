import React from 'react'

import data from '@/data/feed'
import Masonry from '@/components/core/masonry'
import QuestionAnswerCard from '@/components/custom/question-answer-card'

const Page = () => {
  return (
    <Masonry breakpointColumns={{ default: 3, '1280': 2, '1024': 1 }}>
      {data.map((question) => (
        <QuestionAnswerCard question={question} key={question.id} />
      ))}
    </Masonry>
  )
}

export default Page
