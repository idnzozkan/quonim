import styles from './form-input.error.module.scss'

interface FormInputErrorProps {
  message: string | undefined
}

const FormInputError = ({ message }: FormInputErrorProps) => {
  if (!message) return null

  return <p className={styles.errorMessage}>{message}</p>
}

export default FormInputError
