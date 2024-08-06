import React from "react";

const ContactUserInfo = ({
  avatar_url,
  firstName,
  lastName,
  email,
  isLarge = false,
  TagList = null,
}) => {
  return (
    <div className="flex gap-4">
      <div
        className={`${
          isLarge ? "w-[80px] h-[80px]" : "w-[60px] h-[60px]"
        } rounded-full overflow-hidden flex-shrink-0`}
      >
        <img src={avatar_url} alt={`${firstName} ${lastName}`} />
      </div>
      <div className={`flex flex-col ${isLarge ? "mt-2" : "mt-1"}`}>
        <h2 className="font-medium">{`${firstName} ${lastName}`}</h2>
        <p className="font-medium">{email}</p>
        {TagList && <TagList />}
      </div>
    </div>
  );
};

export default ContactUserInfo;
