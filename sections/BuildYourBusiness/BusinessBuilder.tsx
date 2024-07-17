const BusinessBuilder = () => {
  return (
    <div class="max-w-7xl mx-auto w-full flex gap-6 justify-between my-8">
      <div class="max-w-[280px] w-full">
        <p class="text-sm mb-4">
          Escolha o equipamento que neste momento faz sentido para o seu
          negócio*:
        </p>
        <nav class="mb-4">
          <ul></ul>
        </nav>
        <p class="text-sm font-bold">
          *Nenhum destes equipamentos é obrigatório para finalização ou adição
          ao carrinho.
        </p>
      </div>
      <div class="max-w-[592px] w-full">
        <p class="text-sm  mb-4">Escolha o modelo:</p>
      </div>
      <div class="max-w-[298px] w-full">
        <p class="text-sm mb-4">Resumo do pedido:</p>
      </div>
    </div>
  );
};

export default BusinessBuilder;
