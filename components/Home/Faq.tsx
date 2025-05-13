import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";

const Faq = () => {
    const items = [
        {
            id: "1",
            title: "How long does delivery take?",
            content:
                "Standard delivery typically takes 3-5 business days within the country. International shipping may take 7-14 business days depending on your location. Express delivery options are available at checkout for faster delivery. You'll receive a tracking number via email once your order ships.",
        },
        {
            id: "2",
            title: "What is your return and refund policy?",
            content:
                "We offer a 30-day return policy for unworn sneakers in their original packaging. Returns are free if the item is defective or if we made an error. Otherwise, a small shipping fee may apply. Refunds are processed within 5-7 business days after we receive the returned items. Store credit options are also available and never expire.",
        },
        {
            id: "3",
            title: "How can I check the authenticity of my sneakers?",
            content:
                "All our sneakers come with authenticity certificates and official brand tags. You can verify your purchase through the QR code on the box or by checking the unique product code on our website under 'Verify Product'. We only source directly from official manufacturers and authorized distributors to ensure 100% authenticity.",
        },
        {
            id: "4",
            title: "Do you offer size exchanges?",
            content:
                "Yes, we offer free size exchanges within 14 days of delivery. Simply request an exchange through your account or contact customer service. Keep the original packaging intact and don't wear the sneakers outdoors. Once we receive your return, we'll ship the new size as soon as it's available in stock.",
        },
        {
            id: "5",
            title: "How do I care for my sneakers?",
            content:
                "For optimal longevity, clean your sneakers with a soft brush or cloth and mild soap. Allow them to air dry naturally, away from direct heat or sunlight. For suede or special materials, use appropriate cleaning products. We recommend rotating between different pairs and using shoe trees to maintain shape. Check our blog for detailed care guides specific to different sneaker materials.",
        },
        {
            id: "6",
            title: "Do you offer international shipping?",
            content:
                "Yes, we ship to over 60 countries worldwide. International shipping costs are calculated at checkout based on weight, destination, and shipping method selected. Please note that any customs fees, import duties, or taxes are the responsibility of the customer and are not included in our shipping charges.",
        },
        {
            id: "7",
            title: "Are there any discounts for regular customers?",
            content:
                "We value our loyal customers! Join our free Sneaker Club to earn points with each purchase that can be redeemed for discounts. Members also get early access to limited releases, birthday rewards, and exclusive promotions. Additionally, sign up for our newsletter to receive periodic special offers and seasonal sales notifications.",
        },
    ];

    return (
        <div className="px-4 mx-auto max-w-3xl">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
                <p className="text-gray-600">Got questions? We've got answers.</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="py-2 border-b border-gray-200">
                        <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-3 text-left text-base font-medium transition-all outline-none focus-visible:ring-[2px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-45">
                                {item.title}
                                <PlusIcon
                                    size={18}
                                    className="pointer-events-none shrink-0 opacity-70 transition-transform duration-200"
                                    aria-hidden="true"
                                />
                            </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>
                        <AccordionContent className="text-gray-600 pb-4 pt-2 leading-relaxed text-sm">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                    Still have questions? Contact our customer support team at{" "}
                    <span className="font-medium">support@sneakerstore.com</span>
                </p>
            </div>
        </div>
    );
};

export default Faq;
