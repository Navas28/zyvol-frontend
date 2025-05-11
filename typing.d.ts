export interface Product {
    id: string;
    faq: any;
    name: string | undefined;
    _id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    brand: string;
    color: string;
    productDetails: {
        manufacturer: string;
        countryOfOrigin: string;
        importedBy: string;
        weight: string;
    };
    sizes: number[];
    additionalImages: string[];
    createdAt: string;
    updatedAt: string;
}
