import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useToast} from "./ToastContext.tsx";
import {
    addCartItemService,
    addWishlistItemService,
    deleteCartItemService,
    deleteWishlistItemService,
    userDetailsService
} from "../services/apiServices.ts";
import {UserObject} from "../interfaces/user.ts";
import {CartItem} from "../interfaces/cart.ts";

interface AppContextType {
    user: UserObject | null;
    cartItems: CartItem[];
    isAuthenticated: boolean,
    isAuthLoading: boolean,
    token: string,
    login: (data :{user: UserObject, token: string}) => void;
    logout: () => void;
    addCartItem: (productId: string) => void;
    deleteCartItem: (productId: string) => void;
    addWishlistItem: (productId: string) => void;
    deleteWishlistItem: (productId: string) => void;
    updateUser: (userData : UserObject) => void;
    updateQtyOfCart: (productId: string, newQty: number) => void;
}

const defaultContext: AppContextType = {
    user: null,
    cartItems: [],
    isAuthenticated: false,
    isAuthLoading: false,
    token: "",
    login: () => {},
    logout: () => {},
    addCartItem: () => {},
    deleteCartItem: () => {},
    addWishlistItem: () => {},
    deleteWishlistItem: () => {},
    updateUser: () => {},
    updateQtyOfCart: () => {},
};

const AppContext = createContext(defaultContext);

interface AppProviderProps {
    children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);  // New loading state
    const [token, setToken] = useState("");
    const [user, setUser] = useState<UserObject | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const {showToast} = useToast();

    useEffect(() => {
        setCartItems(user?.cart.map(value => ({ product: value, qty: 1 })) || []);
    }, [user]);

    const login = async (data :{user: UserObject, token: string}) => {
        setToken(data.token);
        setUser(data.user);
        setIsAuthLoading(true);
        localStorage.setItem("accessToken", data.token);
        setIsAuthenticated(true);
        setIsAuthLoading(false);
    }

    const logout = () => {
        setToken("");
        setUser(null)
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
    }

    const getUserDetails = async () => {
        try {
            const res = await userDetailsService();
            if (res.success) {
                setUser(res.body as UserObject);
                setIsAuthenticated(true);
            } else {
                if (res.statusCode !== 401) showToast({ type: "error", message: res.message})
            }
        } catch (err) {
            return;
        } finally {
            setIsAuthLoading(false);
        }
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        if (savedToken) {
            setToken(savedToken);
            getUserDetails();
        }
    }, []);

    const addCartItem = async (productId: string) => {
        const res = await addCartItemService(productId);

        if (res.success) {
            await updateUser(res.body as UserObject);
            showToast({type: 'success', message: 'Added to cart successfully'});
        } else {
            showToast({type: 'error', message: res.message})
        }
    }

    const addWishlistItem = async (productId: string) => {
        const res = await addWishlistItemService(productId);

        if (res.success) {
            await updateUser(res.body as UserObject);
            showToast({type: 'success', message: 'Added to wishlist successfully'});
        } else {
            showToast({type: 'error', message: res.message})
        }
    }

    const deleteCartItem = async (productId: string) => {
        const res = await deleteCartItemService(productId);

        if (res.success) {
            await updateUser(res.body as UserObject);
            showToast({type: 'success', message: 'Removed from cart'});
        } else {
            showToast({type: 'error', message: res.message})
        }
    }

    const deleteWishlistItem = async (productId: string) => {
        const res = await deleteWishlistItemService(productId);

        if (res.success) {
            await updateUser(res.body as UserObject);
            showToast({type: 'success', message: 'Removed from wishlist'});
        } else {
            showToast({type: 'error', message: res.message})
        }
    }

    const updateUser = async (userData: UserObject) => {
        setIsAuthenticated(true);
        setUser(userData);
    }

    const updateQtyOfCart = (productId: string, newQty: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product._id === productId ? { ...item, qty: newQty } : item
            )
        );
    };


    return (
        <AppContext.Provider
            value={{
                user,
                cartItems,
                isAuthenticated,
                isAuthLoading,
                token,
                login,
                logout,
                addCartItem,
                deleteCartItem,
                addWishlistItem,
                deleteWishlistItem,
                updateUser,
                updateQtyOfCart
            }}
        >
            {children}
        </AppContext.Provider>
    )
}


export const useApp = (): AppContextType => {
    return useContext(AppContext);
}
