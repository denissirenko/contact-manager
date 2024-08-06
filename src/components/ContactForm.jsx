import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateContactMutation } from "../store/api";
import FormField from "./UI/FormField";
import Button from "./UI/Button";
import Title from "./UI/Title";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

const ContactForm = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    try {
      await createContact({
        fields: {
          "first name": [
            {
              label: "first name",
              modifier: "",
              value: data.firstName,
              is_primary: true,
            },
          ],
          "last name": [
            {
              label: "last name",
              modifier: "",
              value: data.lastName,
              is_primary: true,
            },
          ],
          email: [
            {
              label: "email",
              modifier: "other",
              value: data.email,
              is_primary: true,
            },
          ],
        },
        record_type: "person",
        privacy: { edit: null, read: null },
        owner_id: null,
      }).unwrap();
      reset();
    } catch (error) {
      console.error("Failed to create contact", error);
    }
  };

  return (
    <div className="sticky top-6">
      <Title className="mb-2">Create Contact</Title>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          id="firstName"
          label="First Name"
          type="text"
          placeholder="First Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Last Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          register={register}
          errors={errors}
        />
        <Button
          className="mt-2"
          type="submit"
          disabled={isLoading || !isValid || !isDirty}
          isLoading={isLoading}
          loadingText="Creating..."
        >
          Create Contact
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
