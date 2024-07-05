import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "../../components/ui/Button.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 bg-transparent border-[1px] border-grayTertiary">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-grayTertiary [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:pt-[10px]">
          <span class="min-w-[56px] text-button text-left text-sm text-grayPrimary">
            {method.name}
          </span>
          <span class="text-button text-sm text-grayPrimary">
            em até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-sm font-normal text-black text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, [items, postalCode.value]);

  return (
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <span class="text-base text-black font-semibold">
          Calcular o Frete:
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
        class="flex gap-2"
      >
        <input
          as="input"
          type="text"
          class="input bg-transparent border-grayTertiary border-[1px] rounded-none join-item w-full"
          placeholder="Digite o CEP"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="join-item text-purplePrimary text-base font-bold border-[1px] border-purplePrimary border-solid p-[10px]"
        >
          Calcular
        </Button>
      </form>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
