import { HTMLWidget } from "apps/admin/widgets.ts";
import RichText from "../Content/RichText.tsx";
import ContactForm from "../../islands/ContactForm.tsx";

export interface Props {
  otherContacts: HTMLWidget;
}

const InstitutionalContactForm = ({ otherContacts }: Props) => {
  return (
    <div class="w-full flex gap-8 flex-col lg:flex-row px-4 lg:px-0">
      <ContactForm />
      <RichText style="w-full" text={otherContacts} />
    </div>
  );
};

export default InstitutionalContactForm;
