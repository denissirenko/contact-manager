import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetContactQuery, useAddTagsMutation } from "../store/api";
import { useForm } from "react-hook-form";

const ContactDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetContactQuery(id);
  const [addTags] = useAddTagsMutation();
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      tags: "",
    },
  });

  const tags = watch("tags");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching contact details</div>;

  if (data && data.resources.length === 0) {
    return (
      <div>
        This contact has been deleted.{" "}
        <Link to="/">Return to the contact list</Link>
      </div>
    );
  }

  if (data && data.resources.length > 0) {
    const { avatar_url, fields, tags: contactTags } = data.resources[0];
    const firstName = fields?.["first name"]?.[0]?.value || "";
    const lastName = fields?.["last name"]?.[0]?.value || "";
    const email = fields?.["email"]?.[0]?.value || "";

    const onSubmit = (formData) => {
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
      addTags({ id, tags: tagsArray });
      reset();
    };

    return (
      <div className="contact-details">
        <img src={avatar_url} alt={`${firstName} ${lastName}`} />
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{email}</p>
        <div>
          {contactTags.map(({ id, tag }) => (
            <p key={id}>{tag}</p>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Add tags" {...register("tags")} />
          <button type="submit" disabled={!tags}>
            Add Tags
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default ContactDetails;
