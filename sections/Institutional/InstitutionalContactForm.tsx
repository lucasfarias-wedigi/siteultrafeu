import { HTMLWidget } from "apps/admin/widgets.ts";
import RichText from "../Content/RichText.tsx";

export interface Props {
  otherContacts: HTMLWidget;
}

const InstitutionalContactForm = ({ otherContacts }: Props) => {
  return (
    <div class="w-full flex gap-8 flex-col lg:flex-row px-4 lg:px-0">
      <form class="max-w-[487px] w-full">
        <h1 class="text-2xl font-semibold mb-4">CONTATO</h1>
        <p class="text-sm mb-4">
          Preencha o formulário que entraremos em contato.
        </p>
        <div class="flex flex-col gap-2 mb-4">
          <label htmlFor="fullName" class="text-base font-semibold">
            Nome
          </label>
          <input
            class="border border-grayTertiary px-2 py-2 text-sm placeholder-grayPrimary"
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Digite seu nome completo"
          />
        </div>
        <div class="flex flex-col lg:flex-row lg:gap-4">
          <div class="w-full flex flex-col gap-2 mb-4">
            <label htmlFor="email" class="text-base font-semibold">
              Email
            </label>
            <input
              class="border border-grayTertiary px-2 py-2 text-sm placeholder-grayPrimary"
              type="text"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div class="w-full flex flex-col gap-2 mb-4">
            <label htmlFor="phone" class="text-base font-semibold">
              Telefone
            </label>
            <input
              class="border border-grayTertiary px-2 py-2 text-sm placeholder-grayPrimary"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Ex:(99)99999-9999"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label htmlFor="message" class="text-base font-semibold">
            Mensagem
          </label>
          <textarea
            class="border border-grayTertiary px-2 py-2 text-sm placeholder-grayPrimary min-h-[136px]"
            name="message"
            id="message"
            placeholder="Digite sua mensagem"
          />
        </div>
        <button
          type="submit"
          class="text-white bg-purplePrimary w-full max-w-[246px] py-2"
        >
          Enviar
        </button>
      </form>
      <RichText style="w-full" text={otherContacts} />
    </div>
  );
};

// export const loader = (props: Props, _req: Request) => {
//   const requestBody = {
//     email: formData.get("email") as string,
//     mensagem: formData.get("message") as string,
//     nome: formData.get("fullName") as string,
//     telefone: formData.get("phone") as string,
//   };

//   const headers = {
//     Accept: "application/vnd.vtex.ds.v10+json",
//     "Content-Type": "application/json",
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(requestBody),
//   };

//   try {
//     const response = await fetch(
//       "https://ultrafeu.myvtex.com/api/dataentities/FC/documents",
//       requestOptions
//     );
//     const data = await response.json<Data[]>();
//     console.log(data, "log do Loader");
//     return data;
//   } catch (error) {
//     console.error("Erro ao enviar o formulário:", error);
//   }
//   return {
//     ...props,
//     data,
//   };
// };

export default InstitutionalContactForm;
