import { AcceptIcon, CancelIcon, TrashIcon } from '../../assets';
import { useAppDispatch } from '../../redux/hooks';
import {
  deleteTodo,
  ITodo,
  toggleStatus,
} from '../../redux/reducers/todoSlice';
import styles from './styles.module.scss';

interface ISingleTodoProps {
  todo: ITodo;
}

export const SingleTodo = ({ todo }: ISingleTodoProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <span>{todo.todo}</span>
      <div className={styles.buttons}>
        <button onClick={() => dispatch(toggleStatus(todo))}>
          {todo.completed === false ? <AcceptIcon /> : <CancelIcon />}
        </button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
