import { useEffect, useState } from "react";
import { Address } from "../interfaces/user.ts";
import {deleteUserAddressService, getUserAddressesService} from "../services/apiServices.ts";
import { useToast } from "../context/ToastContext.tsx";
import { useApp } from "../context/AppContext.tsx";
import NewAddressModal from "../components/modals/NewAddressModal.tsx";
import EditAddressModal from "../components/modals/EditAddressModal.tsx";

const Profile = () => {
    const [userAddresses, setUserAddresses] = useState<Address[] | null>(null);
    const [editingAddress, setEditingAddress] = useState<Address>({
        _id: "",
        fullName: "",
        mobileNumber: "",
        houseNo: "",
        street: "",
        city: "",
        postalCode: "",
    });
    const { user } = useApp();
    const { showToast } = useToast();

    const getUserAddresses = async () => {
        const res = await getUserAddressesService();
        if (res.success) {
            setUserAddresses(res.body as Address[]);
        } else {
            showToast({ type: "error", message: res.message });
        }
    };

    const updateAddress = async (addressData: Address[]) => {
        setUserAddresses(addressData);
    };

    const editAddressHandler = (address: Address) => {
        setEditingAddress(address);
        // @ts-expect-error showModal() comes with daisyUI and not recognized by TypeScript
        document.getElementById("edit_address_modal")?.showModal();
    };

    const deleteAddressHandler = async (address: Address) => {
        if (!address._id) return;

        const res = await deleteUserAddressService(address._id);
        if (res.success) {
            setUserAddresses(res.body as Address[]);
            showToast({ type: "success", message: "Address deleted successfully!" });
        } else {
            showToast({ type: "error", message: res.message });
        }
    }

    useEffect(() => {
        getUserAddresses();
    }, []);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="alert alert-error shadow-lg max-w-md">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>User data not available. Please login again.</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 pt-28 pb-8 md:px-24">
            <div className="mx-auto">
                <h2 className='text-3xl mb-4'>Profile</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Account Information Section */}
                    <div className="shadow-lg rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dl className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content w-32 rounded-full">
                                            <span className="text-5xl">{user?.username.toUpperCase().slice(0, 1)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                                    <dd className="text-sm col-span-2">
                                        {user.username}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="text-sm col-span-2">
                                        {user.email}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Addresses Section */}
                    <div className="shadow-lg rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <h3 className="text-xl leading-6">
                            Saved Addresses
                            </h3>
                            <button
                                onClick={() => {
                                    if (userAddresses && userAddresses.length < 3) {
                                        // @ts-expect-error showModal() comes with daisyUI and not recognized by TypeScript
                                        document.getElementById("new_address_modal")?.showModal()
                                    } else {
                                        showToast({ type: "error", message: "You can only save up to 3 addresses."})
                                    }
                                }}
                                className="btn btn-sm btn-primary"
                            >
                                + Add new Address
                            </button>
                        </div>
                        <div className="p-4">
                            {userAddresses && userAddresses.length > 0 ? (
                                <div className="space-y-4">
                                    {userAddresses.map((address) => (
                                        <div key={address._id} className="border border-gray-500 rounded-lg p-4">
                                            <h4 className="font-medium">{address.fullName}</h4>
                                            <p className="text-sm mt-1">
                                                <span className="text-gray-500">Phone: </span>
                                                {address.mobileNumber}
                                            </p>
                                            <p className="text-sm">
                                                {address.houseNo}, {address.street}
                                            </p>
                                            <p className="text-sm">
                                                {address.city}, {address.postalCode}
                                            </p>
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button className="btn btn-xs btn-outline" onClick={() => editAddressHandler(address)}>Edit</button>
                                                <button className="btn btn-xs btn-outline btn-error" onClick={() => deleteAddressHandler(address)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No saved addresses found.</p>
                                    <button className="btn btn-outline mt-4">Add Your First Address</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <NewAddressModal updateAddressHandler={updateAddress}/>
            <EditAddressModal currentAddress={editingAddress} updateAddressHandler={updateAddress}/>
        </div>
    );
};

export default Profile;
