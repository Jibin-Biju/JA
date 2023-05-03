import Swal from "sweetalert2"
function useSwal() {
    const fire = (icon, heading, text) => {
        Swal.fire({
            icon: icon || "info",
            title: heading,
            text
        })
    }
    return fire
}

export default useSwal