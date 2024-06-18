import { useState } from "react";

const useNotif = () => {
    const [notif, setNotif] = useState({message: '', status: ''})

    const handleNotifChange = (message, status) => {
        const newNotif = {
            message: `${message}`,
            status: `${status}`,
          }
          setNotif(newNotif)
          setTimeout(() => {
            setNotif({message:'', status:''})
          }, 2000)
    }

    return {
        notif,
        handleNotifChange,
    }
}

export default useNotif
