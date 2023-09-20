import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { mutateSignup, signupLoading } = useSignup()
  const { register, getValues, handleSubmit, formState, reset } = useForm()

  const { errors } = formState

  function onSubmit({ fullName, password, email }) {
    mutateSignup({ fullName, password, email }, {
      onSettled: reset
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input disabled={signupLoading} type="text" id="fullName" {...register('fullName', {
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input disabled={signupLoading} type="email" id="email" {...register('email', {
          required: 'This field is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please provide valid email address'
          }
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input disabled={signupLoading} type="password" id="password" {...register('password', {
          required: 'This field is required',
          minLength: {
            value: 8,
            message: 'Password should be at least 8'
          }
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input disabled={signupLoading} type="password" id="passwordConfirm" {...register('passwordConfirm', {
          required: 'This field is required',
          validate: value => value === getValues().password || 'Password need to match'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{signupLoading ? <SpinnerMini /> : 'Create new user'}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;