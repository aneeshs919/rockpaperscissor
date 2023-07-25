import { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import rock from '@asset/assets/stone.png'
import paper from '@asset/assets/paper.png'
import scissor from '@asset/assets/scissor.png'
import Firework from './Firework'
import { Inter, Press_Start_2P } from '@next/font/google'
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' })

const computerChoices = ['Rock', 'Paper', 'Scissor']
const image = {
  Rock: rock,
  Paper: paper,
  Scissor: scissor
}

const PointBoard = ({ userPoint, computerPoint }) => {
  const board = {
    computer: computerPoint || 0,
    user: userPoint || 0
  }
  console.log('userPoint')
  return (
    <div className={styles.pointBoardWrap}>
      <div className={styles.pointItem}>
        {Object.keys(board)?.map(item => (
          <div key={item} className={styles.number}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.pointItem}>
        <div className={styles.number}>{board.computer}</div>
        <div className={styles.number}>{board.user}</div>
      </div>
    </div>
  )
}

const Home = () => {
  const [computerChoice, setComputerChoice] = useState('')
  const [userChoice, setUserChoice] = useState('')
  const [userPoint, setUserPoint] = useState(0)
  const [computerPoint, setComputerPoint] = useState(0)
  const [changeField, setChangeField] = useState(false)
  const handleClickUser = choice => {
    setChangeField(true)
    setUserChoice(choice)
    handlePlay(choice)
  }
  const handlePlay = choice => {
    const index = Math.floor(Math.random() * computerChoices.length)
    const randomComValue = computerChoices[index]
    setComputerChoice(randomComValue)
    const userChoice = choice
    setTimeout(() => {
      setChangeField(false)
    }, 300)
    if (
      (userChoice === 'Rock' && randomComValue === 'Paper') ||
      (userChoice === 'Paper' && randomComValue === 'Scissor') ||
      (userChoice === 'Scissor' && randomComValue === 'Rock')
    ) {
      setComputerPoint(computerPoint + 1)
    } else if (
      (randomComValue === 'Rock' && userChoice === 'Paper') ||
      (randomComValue === 'Paper' && userChoice === 'Scissor') ||
      (randomComValue === 'Scissor' && userChoice === 'Rock')
    ) {
      setUserPoint(userPoint + 1)
    } else {
      setComputerPoint(computerPoint)
      setUserPoint(userPoint)
    }
  }
  return (
    <>
      <main className={`${styles.main} ${pressStart2P.className}`}>
        <div className={styles.mainTitles}>
          <h3>
            Computer Choice:{' '}
            <span
              className={`${styles.computerGreen} ${
                changeField ? styles.shake : ''
              }`}
            >
              {computerChoice}
            </span>
          </h3>
          <h3>
            User Choice: <span className={styles.userPink}>{userChoice}</span>
          </h3>
        </div>
        <div className={styles.computerChoice}>
          {computerChoices.map(item => (
            <div
              key={item}
              className={styles.item}
              style={{
                backgroundColor: userChoice === item ? 'white' : 'black'
              }}
              onClick={() => handleClickUser(item)}
            >
              <Image
                src={image[item]}
                width={50}
                height={'100%'}
                alt='Picture of the author'
              />
            </div>
          ))}
        </div>
        {/* <div onClick={handlePlay} className={styles.playButton}>
          Play button
        </div> */}
        <PointBoard computerPoint={computerPoint} userPoint={userPoint} />
        {computerPoint === 5 && (
          <div>
            <h1 className={styles.zoomInOutBox}>Computer Won</h1> <Firework />
          </div>
        )}
        {userPoint === 5 && (
          <div>
            <h1 className={styles.zoomInOutBox}>User Won</h1> <Firework />
          </div>
        )}
      </main>
    </>
  )
}

export default Home
