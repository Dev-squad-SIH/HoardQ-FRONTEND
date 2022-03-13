import styles from './styles.module.css'


const UploadQuestion = () => {
  return (
    <div className={styles.container}>
      <div className={styles.uploadquestion}>
        <div className={styles.header}>
          Upload Questions
        </div>
        <div className={styles.divider}></div>
        <div className={styles.card}>
        <form>
          <div className={styles.contain} >
              <b className={styles.sub}>Subject</b>
              <select name="languages" className={styles.subject}>
                <option className={styles.inputElements} value="subject1">Subject1</option>
                <option className={styles.inputElements} value="subject2">Subject2</option>
                <option className={styles.inputElements} value="subject3">Subject3</option>
              </select>
              <b className={styles.typ}>Type</b>
              <select name="languages" className={styles.type}>
                <option className={styles.inputElements} value="mcq1">MCQs1</option>
                <option className={styles.inputElements} value="mcq2">MCQ2</option>
                <option className={styles.inputElements} value="mcq3">MCQ3</option>
              </select>
              <b className={styles.top}>Topic</b>
              <select name="languages" className={styles.topic}>
                <option className={styles.inputElements} value="topic1">Topic1</option>
                <option className={styles.inputElements} value="topic2">Topic2</option>
                <option className={styles.inputElements} value="topic3">Topic3</option>
              </select>
            </div>
            <div className={styles.group} >
              <b className={styles.question}>Question</b>
              <input
                type="text"
                className={styles.inputElementQuestion}
                placeholder="Enter Question"
                required
              />
            </div>
            <div className={styles.group} >
              <b className={styles.option}>Options</b>
              <input
                type="text"
                className={styles.inputElement}
                required
              />
            </div>
            <div className={styles.group} >
              <b className={styles.answer}>Answer</b>
              <select name="languages" className={styles.answers}>
                <option className={styles.inputElements} value="1">1</option>
                <option className={styles.inputElements} value="2">2</option>
                <option className={styles.inputElements} value="3">3</option>
                <option className={styles.inputElements} value="4">4</option>
              </select>
            </div>
            <div className={styles.group} >
              <b className={styles.solution}>Solution</b>
              <input
                type="text"
                className={styles.inputElement}
                placeholder="Enter Solution"
                required
              />
            </div>
            <div className={styles.group} >
              <input
                type="submit"
                value="Upload"
                className={styles.submitBtn}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadQuestion