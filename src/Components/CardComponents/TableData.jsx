import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import MarathonModal from "./MarathonModal";

function TableData({ marathon, setMarathons, idx, handelDelete, applies = false }) {

    const { _id, title, registrationStartDate, registrationEndDate, marathonStartDate, location, runningDistance, description, image, createdAt, totalRegistrations } = marathon || {};
    // const [modal, setModal] = useState(null);

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    const handelDeleteData = (id) => {
        handelDelete(id)
            .then(() => {
                setMarathons((prev) => prev.filter((item, index) => index !== idx))
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     setModal(document?.getElementById('my_modal_1'))
    // }, []);

    const handelShowModal = (id) => {
        document?.getElementById(`my_modal_${id}`).showModal()
    }

    const handelUpdateDate = (id) => {
        // document?.getElementById(`my_modal_${id}`).close()
    }

    return (
        <>
            <tr className="border-l-base-content border-l-2 text-center">
                <td className="border border-base-content border-r-2">{idx + 1}</td>
                <td className="border border-base-content border-r-2">{title}</td>
                {
                    applies ?
                        <>
                            <td className="border border-base-content border-r-2">{new Date(marathonStartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        </> :
                        <>
                            <td className="border border-base-content border-r-2">{location}</td>
                            <td className="border border-base-content border-r-2 hidden lg:table-cell">{runningDistance}</td>
                        </>
                }
                <td className="space-x-2 space-y-2 text-center border border-base-content border-r-2">
                    <button onClick={() => handelShowModal(_id)} className="p-2 border rounded-full hover:border-transparent hover:text-white duration-150 hover:bg-teal-400"><MdEdit /></button>
                    <button onClick={() => handelDeleteData(_id)} className="p-2 border rounded-full hover:border-transparent hover:text-white duration-150 hover:bg-[#f70000]"><ImCross /></button>
                    {/* Dialog Box For Modal - */}
                    <>
                        <dialog id={`my_modal_${_id}`} className="modal">
                            <div className="modal-box max-w-max">
                                <MarathonModal handelUpdateDate={() => handelUpdateDate(_id)} marathon={marathon} />
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn btn-warning text-lg text-white outline-2 outline outline-black outline-offset-0">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </>
                </td>
            </tr>

        </>
    )
}

export default TableData
