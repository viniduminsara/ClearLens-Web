import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store.ts";
import {logout} from "../../features/auth/authSlice.ts";

const LogoutConfirmationModal = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <dialog id="logout_confirmation_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Logout</h3>
                <p className="py-4">Are you sure you want to log out? You'll need to sign in again to access your account.</p>
                <div className="modal-action">
                    <div className="modal-action">
                        <button
                            className="btn"
                            // @ts-expect-error close() comes with daisyUI and not recognized by TypeScript
                            onClick={() => document.getElementById("logout_confirmation_modal")?.close()
                            }>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleLogout}>
                            Yes, Logout
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default LogoutConfirmationModal;
