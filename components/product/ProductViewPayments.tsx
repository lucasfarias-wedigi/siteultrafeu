import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import Icon from "../../components/ui/Icon.tsx";
import { formatPrice } from "../../sdk/format.ts";

export interface ProductViewPaymentsProps {
    price: number;
}

export default function ProductViewPayments(
    { price }: ProductViewPaymentsProps,
) {
    const openModal = useSignal(false);
    const [activeTab, setActiveTab] = useState(0);

    const renderInstallments = (
        maxInstallments: number,
        price: number,
        sliceStart: number,
        sliceEnd: number,
    ) => {
        const installments = [];
        for (let i = 1; i <= maxInstallments; i++) {
            if (i <= 6) {
                installments.push(
                    <div
                        class="text-center text-base text-black flex flex-col items-center gap-[15px] p-4 min-w-[120px] max-w-[120px]"
                        key={i}
                    >
                        <span class="font-bold">{i}x</span>
                        <span class="font-normal">{formatPrice(price / i, "BRL")}</span>
                    </div>,
                );
            } else {
                installments.push(
                    <div
                        class="w-1/6 text-center text-base text-black flex flex-col items-center gap-[15px] p-4 min-w-[120px] max-w-[120px]"
                        key={i}
                    >
                        <span class="font-bold">{i}x</span>
                        <span class="font-normal">{formatPrice(price / i, "BRL")}</span>
                    </div>,
                );
            }
        }
        return (
            <div class="flex flex-col">
                <div class="flex">{installments.slice(sliceStart, sliceEnd)}</div>
                <div class="flex border-t-[1px] border-grayTertiary">
                    {installments.slice(sliceEnd)}
                </div>
            </div>
        );
    };

    const tabs = [
        { id: 0, title: "Pix", content: <div>Conteúdo do Pix</div> },
        {
            id: 1,
            title: "Cartão BNDES",
            content: <div>Conteúdo do Cartão BNDES</div>,
        },
        {
            id: 2,
            title: "12x",
            content: (
                <div class="flex overflow-x-auto bg-whitePrimary">
                    {renderInstallments(12, price, 0, 6)}
                </div>
            ),
        },
        {
            id: 3,
            title: "21x",
            content: (
                <div class="flex overflow-x-auto bg-whitePrimary">
                    {renderInstallments(21, price, 0, 11)}
                </div>
            ),
        },
    ];

    return (
        <>
            <div
                class="flex justify-between bg-white rounded-[5px] py-[9px] px-2 my-4 cursor-pointer"
                onClick={() => openModal.value = true}
            >
                <div class="flex gap-4">
                    <Icon
                        id={"CreditCard"}
                        width={28}
                        height={19}
                        fill="currentColor"
                    />
                    <Icon
                        id={"NewPix"}
                        width={22}
                        height={22}
                        fill="currentColor"
                    />
                    <span class="text-sm font-medium underline text-grayPrimary">
                        Ver mais formas de pagamento
                    </span>
                </div>
                <Icon
                    id={"ChevronRight"}
                    width={24}
                    height={24}
                    fill="currentColor"
                    class="text-grayPrimary"
                />
            </div>

            {openModal.value &&
                (
                    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                        <div class="bg-white rounded-lg max-w-[350px] lg:max-w-[682px] w-full">
                            <div class="flex justify-between mb-4 px-4 pt-4">
                                <span class="text-base font-medium">
                                    Formas de pagamento em parcelas
                                </span>
                                <button onClick={() => openModal.value = false}>
                                    <Icon
                                        id={"Close"}
                                        width={24}
                                        height={24}
                                        fill="currentColor"
                                    />
                                </button>
                            </div>
                            <div class="border-b border-gray-200 mb-4 px-4 flex items-center justify-between">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        class={`px-4 py-2 font-bold ${activeTab === tab.id
                                                ? "border-b-[5px] border-[#228042]"
                                                : ""
                                            }`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.title === "Pix"
                                            ? (
                                                <Icon
                                                    id={"Pix2"}
                                                    width={51}
                                                    height={30}
                                                    fill="green"
                                                    strokeWidth={1}
                                                />
                                            )
                                            : tab.title === "Cartão BNDES"
                                                ? (
                                                    <Icon
                                                        id={"CartaoBndes"}
                                                        width={51}
                                                        height={30}
                                                        fill="green"
                                                        strokeWidth={1}
                                                    />
                                                )
                                                : (
                                                    tab.title
                                                )}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <div class="pl-4">{tabs[activeTab].content}</div>
                            </div>
                            <div class="flex flex-col p-4">
                                <Icon
                                    id={"ScrollbarPdp"}
                                    width={325}
                                    height={8}
                                    fill="currentColor"
                                    class="mb-2"
                                />
                                <div class="flex justify-between items-center">
                                    <span class="text-xs">Arraste para o lado.</span>
                                    <Icon
                                        id={"ScrollRightHand"}
                                        width={23}
                                        height={21}
                                        fill="currentColor"
                                        class=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}
