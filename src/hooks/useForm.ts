import { useState } from 'react'

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function reset() {
    setValues(initialValues)
  }

  return { values, handleChange, reset }
}
