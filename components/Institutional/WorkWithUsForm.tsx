import { invoke } from "../../runtime.ts";
import type { JSX } from "preact";

const WorkWithUsForm = () => {
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const nome = (
      e.currentTarget.elements.namedItem("fullName") as RadioNodeList
    )?.value;
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const mensagem = (
      e.currentTarget.elements.namedItem("message") as RadioNodeList
    )?.value;
    const telefone = (
      e.currentTarget.elements.namedItem("phone") as RadioNodeList
    )?.value;
    try {
      await invoke.site.actions.tableMasterData({
        tableId: "TC",
        nome: nome,
        email: email,
        mensagem: mensagem,
        telefone: telefone,
      });
    } catch (error) {
      console.error(error, "contactform component");
    }
  };
  return (
    <form class="w-full px-4 lg:px-0" onSubmit={handleSubmit}>
      <h1 class="text-2xl font-semibold mb-4">TRABALHE CONOSCO</h1>
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
  );
};

export default WorkWithUsForm;
