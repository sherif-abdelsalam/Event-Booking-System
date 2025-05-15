import CurrentEvents from "../../components/admin/currentEvents";
import { ToastContainer } from "react-toastify";
import AddEventHeader from "../../components/admin/addEventHeader";
import AdminNavbar from "../../components/admin/adminNavbar";

export default function EventList() {

    return (
        <>
            <AdminNavbar />
            <div className='my-14 mx-32'>
                <AddEventHeader title={"Current Events"} hasDes={true} />
                <CurrentEvents />

                <ToastContainer
                    position="top-right"
                />
            </div>
        </>
    );
}