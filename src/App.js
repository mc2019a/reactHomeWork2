import './App.css';
import styles from "./app.module.css"
import { useState } from 'react';



function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState();

  let isValueValid = value.length >= 3;
  let isListEmpty = list.length === 0;


  const onInputButtonClick = () => {
    let promptValue = prompt();
    if (promptValue) {
      if (promptValue.trim().length < 3) {
        setError("Введенное значение должно содержать минимум 3 символа");
      } else {
        setError("");
        setValue(promptValue);
      }
    }

  }

  const formatDate = (date) => {
    let zeroToMinutes, zeroToSeconds;
    date.getMinutes() < 10 ? zeroToMinutes = "0": zeroToMinutes = "";
    date.getSeconds() < 10 ? zeroToSeconds = "0" : zeroToSeconds = "";
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${zeroToMinutes}${date.getMinutes()}:${zeroToSeconds}${date.getSeconds()}`;
  }


  const onAddButtonClick = () => {
    if (isValueValid) {
      let id = Date.now();
      let time = new Date();
      let updatedList = [...list, {id, value, time}];
      setList(updatedList)
      setValue("");
      setError("");
    }

  }

  return (
      <div className={styles.app}>
        <h1 className={styles["page-heading"]}>Ввод значения</h1>
        <p className={styles["no-margin-text"]}>
          Текущее значение <code>value</code>: "
          <output className={styles["current-value"]}>{value}</output>
          "
        </p>
        {error !== "" && <div className={styles.error}>{error}</div>}
        <div className={styles["buttons-container"]}>
          <button
              className={styles.button}
              onClick={onInputButtonClick}
          >Ввести новое</button>
          <button
              className={styles.button}
              disabled={!isValueValid}
              onClick={onAddButtonClick}
          >Добавить в список</button>
        </div>
        <div className={styles["list-container"]}>
          <h2 className={styles["list-heading"]} hidden={isListEmpty}>Список:</h2>
          <p className={styles["no-margin-text"]} hidden={!isListEmpty}>Нет добавленных элементов</p>
          <ul className={styles.list}>
            {list.map(({id, value, time}) => <li className={styles["list-item"]} key={id}>{value} {formatDate(time)}</li>)}
          </ul>
        </div>
      </div>

  );
}

export default App;
