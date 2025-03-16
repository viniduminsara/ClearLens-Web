export interface Product {
    _id: string;
    qty: number;
    name: string;
    description: string;
    brand: string;
    category: string;
    gender: string;
    weight: string;
    quantity: number;
    image: string;
    rating: number;
    price: number;
    newPrice: number;
    trending: boolean;
}

export interface UserObject {
    id: string;
    username: string;
    email: string;
    cart: Product[];
    wishlist: Product[];
}

export interface Address {
    _id?: string;
    fullName: string;
    mobileNumber: string;
    houseNo: string;
    street: string;
    city: string;
    postalCode: string;
}

export interface OrderItem {
    product: Product;
    qty: number;
}

export interface Order {
    _id?: string;
    amount?: number;
    orderItems?: OrderItem[];
    paymentStatus?: string;
}
