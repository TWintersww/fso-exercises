const Notification = ({notifMsg}) => {

    const statusClass = notifMsg.includes('wrong')
        ? 'error'
        : 'success'

    if (notifMsg) {
        return (
            <div className={`notif ${statusClass}`}>
                {notifMsg}
            </div>
        )
    }
    else {
        return
    }
}

export default Notification
