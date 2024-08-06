import React from "react";
import { useGetContactsQuery } from "../store/api";
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import Title from "../components/UI/Title";

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
        <div className="max-w-[280px] md:pr-8 mx-auto mt-6">
          <ContactForm />
        </div>
        <div className="flex-1 pt-6">
          <Title className="mb-4 md:mb-8">Contacts</Title>
          {resources.length > 0 ? (
            <div className="flex flex-col gap-4">
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
