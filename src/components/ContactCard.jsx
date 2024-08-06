import React from "react";
import { Link } from "react-router-dom";

import { useDeleteContactMutation } from "../store/api";

import ContactUserInfo from "./ContactUserInfo";

import { ReactComponent as Close } from "../sources/svg/close.svg";
import TagList from "./UI/TagList";

const ContactCard = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation();
  const { avatar_url, fields, tags } = contact;
  const firstName = fields?.["first name"]?.[0]?.value || "";
  const lastName = fields?.["last name"]?.[0]?.value || "";
  const email = fields?.["email"]?.[0]?.value || "";

  const handleDelete = (e) => {
    e.preventDefault();
    deleteContact(contact.id);
  };

  return (
    <Link
      className="flex py-5 pl-5 pr-14 relative transition duration-200 ease-in-out bg-gray-200 hover:bg-gray-300 rounded-lg"
      to={`/${contact.id}`}
    >
      <ContactUserInfo
        avatar_url={avatar_url}
        firstName={firstName}
        lastName={lastName}
        email={email}
        TagList={
          tags.length > 0
            ? () => <TagList className="mt-3" tags={tags} />
            : null
        }
      />

      <button className="absolute top-3 right-3" onClick={handleDelete}>
        <Close className="transition duration-200 ease-in-out fill-gray-500 hover:fill-gray-700" />
      </button>
    </Link>
  );
};

export default ContactCard;
