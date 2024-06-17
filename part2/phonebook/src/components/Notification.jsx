const Notification = ({message, status}) => {
    const color = (status === 'error' ? 'red' : 'green')
    const notifStyle = {
        color: `${color}`,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    //console.log('render notif')

    if (message === '') {
        return null
    }
    else {
        return (
            <div style={notifStyle}>
                {message}
            </div>
        )
    }
}

export default Notification
