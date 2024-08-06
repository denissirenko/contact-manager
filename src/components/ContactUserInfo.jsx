import React from "react";

const ContactUserInfo = ({
  avatar_url,
  firstName,
  lastName,
  email,
  isLarge = false,
}) => {
  return (
    <div className={isLarge ? "large-card" : "small-card"}>
      <img src={avatar_url} alt={`${firstName} ${lastName}`} />
      <h2>{`${firstName} ${lastName}`}</h2>
      <p>{email}</p>
    </div>
  );
};

export default ContactUserInfo;
