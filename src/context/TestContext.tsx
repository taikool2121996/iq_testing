import { createContext, useState } from 'react'

interface ITestContext {
  test: any[]
  setTest: React.Dispatch<React.SetStateAction<any[]>>
  handleAddAnswer: (questionIndex: number) => void
  handleSetCorrectAnswer: (questionIndex: number, answerIndex: number) => void
  handleUpdateQuestionText: (questionIndex: number, newText: string) => void
}

const TestContext = createContext<ITestContext>({
  test: [],
  setTest: () => {
    throw new Error('setTest function must be overridden')
  },
  handleAddAnswer: () => {
    throw new Error('handleAddAnswer function must be overridden')
  },
  handleSetCorrectAnswer: () => {
    throw new Error('handleSetCorrectAnswer function must be overridden')
  },
  handleUpdateQuestionText: () => {
    throw new Error('handleUpdateQuestionText function must be overridden')
  }
})

const TestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [test, setTest] = useState<any[]>([
    {
      questionName: 'Question 1',
      questionText: 'Question 1',
      answers: [],
      correctAnswer: -1
    }
  ])

  // Add logic to handle adding an answer to a specific question
  const handleAddAnswer = (questionIndex: number) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      const newQuestion = {
        ...newTest[questionIndex],
        answers: [...newTest[questionIndex].answers, `Answer ${newTest[questionIndex].answers.length + 1}`]
      }
      newTest[questionIndex] = newQuestion

      return newTest
    })
  }

  const handleSetCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      newTest[questionIndex].correctAnswer = answerIndex

      return newTest
    })
  }

  const handleUpdateQuestionText = (questionIndex: number, newText: string) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      newTest[questionIndex].questionText = newText

      return newTest
    })
  }

  const handleAddQuestion = () => {
    setTest(prevTest => [
      ...prevTest,
      {
        questionName: `Question ${prevTest.length + 1}`, // thêm questionName
        questionText: `Question ${prevTest.length + 1}`,
        answers: [],
        correctAnswer: -1
      }
    ])
  }

  const value = { test, setTest, handleAddAnswer, handleSetCorrectAnswer, handleUpdateQuestionText, handleAddQuestion }

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>
}

export { TestContext, TestProvider }
