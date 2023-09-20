
import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"


function AddCabins() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button>Create New Cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>
            </Modal >
        </div>
    )
}

// function AddCabins() {
//     const [showModal, setShowModal] = useState(false)

//     return (
//         <div>
//             <Button onClick={() => setShowModal(!showModal)}>Create new Cabin</Button>
//             {showModal &&
//                 <Modal onClose={() => setShowModal(false)}>
//                     <CreateCabinForm onClose={() => setShowModal(false)} />
//                 </Modal>}
//         </div>
//     )
// }

export default AddCabins
