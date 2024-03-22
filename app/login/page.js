"use client"

import { useFormState } from "react-dom"
import { login } from "./action"

export default function Page() {
  const initState = {
    message: null,
  }
  const [state, formAction] = useFormState(login, initState)

  return (
    <form action={formAction}>
      <div>
        Email <input className="border-2 " type="email" name="email" />
      </div>
      <div>
        Password <input className="border-2" type="password" name="password" />
      </div>
      Message: {state?.message}
      <div>
        <button className="bg-blue-300 p-4">Login</button>
      </div>
    </form>
  )
}
