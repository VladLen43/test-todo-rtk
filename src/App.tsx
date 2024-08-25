import styles from './App.module.scss'
import { TodoContainer } from './components/TodoContainer'

function App() {


  return (
    <div className={styles.container}>
        <TodoContainer />
    </div>
  )
}

export default App
