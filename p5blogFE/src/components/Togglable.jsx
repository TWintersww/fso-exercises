import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const show = {display: (visible) ? '' : 'none'}
    const hide = {display: (visible) ? 'none' : ''}

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hide}>
                <button onClick={toggleVisible} data-testid='togglebutton'>{props.buttonLabel}</button>
            </div>
            <div style={show}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
