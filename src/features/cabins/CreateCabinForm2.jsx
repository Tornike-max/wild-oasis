

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import FormRow from "../../ui/FormRow";


function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState
  console.log(errors)

  const queryClient = useQueryClient()

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Successfully added new cabin')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      reset()
    },
    onError: (err) => toast.error(err.message)
  })

  function onSubmit(data) {
    mutate({ ...data, image: data?.image[0] })
    console.log(data)
  }

  function onError(errors) {
    console.log(errors)
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name', {
          required: 'This field must be specified',
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This field must be specified',
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field must be specified',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          },
          validate: (value) => value >= 1 || 'Value Should be greater or equal to 1'
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This field must be specified',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          },
          validate: (value) => value <= getValues().regularPrice || 'Value should be less or equal to regular Price',

        })} disabled={isCreating} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating} />
        <FileInput id="image" accept="image/*" {...register('image')} disabled={isCreating} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
