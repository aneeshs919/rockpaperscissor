import styles from './firework.module.scss'

const Firework = () => {
  return (
    <div className={styles.pyro}>
      <div className={styles.before}></div>
      <div className={styles.after}></div>
    </div>
  )
}

export default Firework
