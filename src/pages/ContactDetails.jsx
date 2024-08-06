import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetContactQuery, useAddTagsMutation } from "../store/api";
import { useForm } from "react-hook-form";
import ContactUserInfo from "../components/ContactUserInfo";
import TagList from "../components/UI/TagList";
import Title from "../components/UI/Title";
import FormField from "../components/UI/FormField";
import Button from "../components/UI/Button";

const ContactDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetContactQuery(id);
  const [addTags, { isLoading: isAdding }] = useAddTagsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm({
    defaultValues: {
      tags: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = (formData) => {
    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
    addTags({ id, tags: tagsArray });
    reset();
  };

  if (isLoading) return <div className="px-4 pt-6">Loading...</div>;
  if (error)
    return <div className="px-4 pt-6">Error fetching contact details</div>;

  if (data && data.resources.length === 0) {
    return (
      <div className="px-4 pt-6">
        This contact has been deleted.{" "}
        <Link className="underline text-sky-700 font-semibold" to="/">
          Return to the contact list
        </Link>
      </div>
    );
  }

  if (data && data.resources.length > 0) {
    const { avatar_url, fields, tags: contactTags } = data.resources[0];
    const firstName = fields?.["first name"]?.[0]?.value || "";
    const lastName = fields?.["last name"]?.[0]?.value || "";
    const email = fields?.["email"]?.[0]?.value || "";

    return (
      <div className="flex justify-center pt-6">
        <div className="max-w-[460px] px-4 w-full flex flex-col">
          <ContactUserInfo
            avatar_url={avatar_url}
            firstName={firstName}
            lastName={lastName}
            email={email}
            isLarge={true}
          />
          {contactTags && (
            <>
              <Title className="font-medium mt-3" tag="h3">
                Tags
              </Title>
              <TagList className="mt-3" tags={contactTags} />
            </>
          )}
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField
              id="tags"
              type="text"
              placeholder="Enter tags separated by commas"
              register={register}
              errors={errors}
            />
            <Button
              className="mt-2"
              type="submit"
              disabled={isAdding || !isValid || !isDirty}
              isLoading={isAdding}
              loadingText="Updating tags..."
            >
              Add Tags
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default ContactDetails;
