import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from '../../ui/SpinnerMini'

//tornike@example.com
//password

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginMutateData, isLoginLoading } = useLogin()

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    loginMutateData({ email, password }, {
      onSettled: () => {
        setEmail('')
        setPassword('')
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoginLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoginLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoginLoading}>{isLoginLoading ? <SpinnerMini /> : 'Login'}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
