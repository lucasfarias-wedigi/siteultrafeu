import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  phone?: number;
}

function WhatsApp({ phone }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-1/2 translate-y-1/2 right-0 z-40"
      aria-label="Chat on WhatsApp"
    >
      <button
        class="bg-[#25D366] rounded-tl-[30px] rounded-bl-[30px] py-5 px-[6px] shadow-lg"
        aria-label="Chat on WhatsApp"
      >
        <Icon
          id={"WhatsAppWhite"}
          width={43}
          height={43}
          fill="white"
          strokeWidth={1}
        />
      </button>
    </a>
  );
}

export default WhatsApp;
