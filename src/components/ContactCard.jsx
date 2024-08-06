import React from "react";
import { Link } from "react-router-dom";
import { useDeleteContactMutation } from "../store/api";
import ContactUserInfo from "./ContactUserInfo";

const ContactCard = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation();
  const { avatar_url, fields, tags } = contact;
  const firstName = fields?.["first name"]?.[0]?.value || "";
  const lastName = fields?.["last name"]?.[0]?.value || "";
  const email = fields?.["email"]?.[0]?.value || "";

  return (
    <div className="contact-card">
      <ContactUserInfo
        avatar_url={avatar_url}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />

      <p>
        {tags.map(({ id, tag }) => (
          <p key={id}>{tag}</p>
        ))}
      </p>
      <button onClick={() => deleteContact(contact.id)}>Delete</button>
      <Link to={`/${contact.id}`}>View Details</Link>
    </div>
  );
};

export default ContactCard;
