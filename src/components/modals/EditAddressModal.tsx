import {useToast} from "../../context/ToastContext.tsx";
import {useEffect, useState} from "react";
import {Address} from "../../interfaces/user.ts";
import {updateUserAddressService} from "../../services/apiServices.ts";

interface EditAddressModalProps {
    currentAddress: Address;
    updateAddressHandler: (address: Address[]) => void;
}

const EditAddressModal = ({ currentAddress, updateAddressHandler }: EditAddressModalProps) => {

    const { showToast } = useToast();
    const [address, setAddress] = useState<Address>({
        _id: currentAddress._id,
        fullName: currentAddress.fullName,
        mobileNumber: currentAddress.mobileNumber,
        houseNo: currentAddress.houseNo,
        street: currentAddress.street,
        city: currentAddress.city,
        postalCode: currentAddress.postalCode,
    });

    useEffect(() => {
        setAddress(currentAddress)
    }, [currentAddress]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!address._id || !address.fullName || !address.mobileNumber || !address.houseNo || !address.street || !address.city || !address.postalCode) {
            showToast({ type: "error", message: "All fields are required" });
            return;
        }

        const res = await updateUserAddressService(address._id,address)
        if (res.success) {
            updateAddressHandler(res.body as Address[]);
            // @ts-expect-error close() comes with daisyUI and not recognized by TypeScript
            document.getElementById("edit_address_modal")?.close();
            showToast({ type: "success", message: "Address updated successfully!" });
        } else {
            showToast({ type: "error", message: res.message})
        }
    };

    return (
        <dialog id="edit_address_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Address</h3>
                <p className="text-sm text-gray-600 mb-4">Enter your address details below:</p>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="input input-bordered w-full"
                        value={address.fullName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        className="input input-bordered w-full"
                        value={address.mobileNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="houseNo"
                        placeholder="House No"
                        className="input input-bordered w-full"
                        value={address.houseNo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        className="input input-bordered w-full"
                        value={address.street}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="input input-bordered w-full"
                        value={address.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="input input-bordered w-full"
                        value={address.postalCode}
                        onChange={handleChange}
                    />
                </div>

                <div className="modal-action">

                    <button
                        className="btn btn-outline"
                        // @ts-expect-error close() comes with daisyUI and not recognized by TypeScript
                        onClick={() => document.getElementById("edit_address_modal")?.close()
                        }>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default EditAddressModal;
