import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Product } from "@/typing";

export default function AccordianComponent({ product }: { product: Product }) {
    const items = [
        {
            id: "1",
            title: "About Product",
            content: <p className="text-base text-black">{product?.description}</p>,
        },
        {
            id: "2",
            title: "Product Details",
            content: (
                <div className="text-base text-black">
                    <p>Manufacturer: {product?.productDetails?.manufacturer}</p>
                    <p>Country of Origin: {product?.productDetails?.countryOfOrigin}</p>
                    <p>Imported By: {product?.productDetails?.importedBy}</p>
                    <p>Weight: {product?.productDetails?.weight}</p>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Product Details</h2>
            <Accordion type="single" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="py-2">
                        <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                                {item.title}
                                <PlusIcon
                                    size={16}
                                    className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                                    aria-hidden="true"
                                />
                            </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>
                        <AccordionContent className="text-muted-foreground pb-2">{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
