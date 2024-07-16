export interface Props {
  tableId: string;
  email: string;
  mensagem: string;
  nome: string;
  telefone: string;
}

const action = async (props: Props, _req: Request): Promise<unknown> => {
  const { tableId, nome, email, telefone, mensagem } = props;
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const res = await fetch(
      `https://ultrafeu.myvtex.com/api/dataentities/${tableId}/documents`,
      {
        signal,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          mensagem: mensagem,
          nome: nome,
          telefone: telefone,
        }),
      },
    );
    const response = await res.json();

    return response;
  } catch (err) {
    console.log(err, "ERRO CATCH");
    return null;
  }
};

export default action;
