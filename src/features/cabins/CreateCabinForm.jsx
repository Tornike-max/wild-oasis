

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";


function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const { errors } = formState



  const { isCreating, createCabin } = useCreateCabin()

  const { isEditing, editCabin } = useEditCabin()

  const isWorking = isEditing || isCreating

  function onSubmit(data) {

    console.log(data)
    const image = typeof data?.image === 'string' ? data.image : data.image[0]

    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: (data) => {
        reset()
        onClose?.()
      }
    })
    else createCabin({ ...data, image: image }, {
      onSuccess: (data) => {
        reset()
        onClose?.()
      }
    })

  }

  function onError(errors) {
    console.log(errors)
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>

      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name', {
          required: 'This field must be specified',
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This field must be specified',
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field must be specified',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          },
          validate: (value) => value >= 1 || 'Value Should be greater or equal to 1'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This field must be specified',
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description')} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking} />
        <FileInput id="image" accept="image/*" {...register('image', {
          required: isEditSession ? false : 'This field is required.'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow>
        <Button onClick={() => onClose?.()} variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button>{isEditSession ? 'Edit cabin' : 'Create new Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
