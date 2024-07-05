import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useState } from "preact/hooks";
import Icon from "../../ui/Icon.tsx";
export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButton({ seller, productID, eventParams }: Props) {
  const { addItems } = useCart();
  const [itemsQuantity, setItemsQuantity] = useState(1);

  const increment = () => {
    setItemsQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (itemsQuantity > 1) {
      setItemsQuantity((prev) => prev - 1);
    }
  };

  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: itemsQuantity,
      }],
    });

  return (
    <div class="flex gap-2">
      <div class="min-w-[103px] flex justify-center gap-4 text-black border-[1px] border-solid border-grayTertiary py-4 px-2">
        <button class="text-sm font-bold" onClick={decrement}>
          <Icon
            id={"Minus"}
            width={24}
            height={24}
            strokeWidth={3}
          />
        </button>
        <span class="text-base font-bold">{itemsQuantity}</span>
        <button class="text-sm font-bold" onClick={increment}>
          <Icon
            id={"Plus"}
            width={24}
            height={24}
            strokeWidth={3}
          />
        </button>
      </div>
      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </div>
  );
}

export default AddToCartButton;
