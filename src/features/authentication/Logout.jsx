import { useLogout } from "./useLogout";
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from "../../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";


function Logout() {
    const { isLoading, mutateLogout } = useLogout()

    function handleLogout() {
        mutateLogout();
    }
    return (
        <ButtonIcon onClick={handleLogout}>
            {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    )
}

export default Logout
