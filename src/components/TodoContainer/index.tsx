import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SingleTodo } from '../SingleTodo';
import styles from './styles.module.scss';
import { addTodo, fetchTodos } from '../../redux/reducers/todoSlice';

export const TodoContainer = () => {
  const todos = useAppSelector((state) => state.todos);
  const loading = useAppSelector((state) => state.loading)
  const dispatch = useAppDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const handleStatus = () => {
    setIsEdit(!isEdit);
    if (newTodo.length > 0) {
      dispatch(addTodo(newTodo));
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {loading ? <div className={styles.loader}>Loading...</div> : <>
      <button onClick={handleStatus} className={styles.add_button}>Добавить</button>
      {isEdit && (
        <input
          type="text"
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)}
        />
      )}
      <div className={styles.done_todos}>
        <h1>Выполнить:</h1>
        {todos
          .filter((item) => item.completed === false)
          .map((todo) => (
            <SingleTodo key={todo.id} todo={todo} />
          ))}
      </div>
      <div className={styles.done_todos}>
        <h1>Выполненные:</h1>
        {todos
          .filter((item) => item.completed === true)
          .map((todo) => (
            <SingleTodo key={todo.id} todo={todo} />
          ))}
      </div>
      </> }
    </div>
  );
};
