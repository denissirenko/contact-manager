import React from "react";
import { useGetContactsQuery } from "../store/api";
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";

const ContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery({
    sort: "created:desc",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching contacts</div>;

  const resources = data?.resources || [];

  return (
    <div className="flex justify-center">
      <div className="max-w-[1312px] px-4 w-full flex flex-col md:flex-row">
        <div className="md:w-1/3 md:pr-8">
          <ContactForm />
        </div>
        <div className="md:w-2/3">
          {resources.length > 0 ? (
            <div className="flex flex-col">
              {resources.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          ) : (
            <div>No contacts available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
