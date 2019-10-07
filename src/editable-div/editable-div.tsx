import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {makeGetNoteByLabel} from '../notes/selectors'
import {setNote} from '../notes/actions'
import SimpleRender from './simple-render'

const defaultContent = "Type here..."

const EditableDiv = ({
    name,
    note,
    setContent,
}) => {
    // const [content, setContent] = React.useState(initialContent);
    const [editing, setEditing] = React.useState(false);
    const editableDiv = React.useRef(null);
    const {
        id = null,
        content = defaultContent,
    } = note || {}

    const handleBlur = e => {
        setEditing(false);
        setContent(id, editableDiv.current.innerText);
    };

    return (
        <div
        id={name}
        ref={editableDiv}
        contentEditable
        style={{
            fontFamily: "inherit",
            outline: "none",
            maxWidth: "100%",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            caretColor: "rgba(0, 0, 0, 0.9)",
            padding: "3px 2px",
            minHeight: "1em",
            color: "rgba(0, 0, 0, 0.9)"
        }}
        onFocus={e => setEditing(true)}
        onBlur={handleBlur}
        >
        {editing
            ? content
            : <SimpleRender text={content}/>}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const getContentByLabel = makeGetNoteByLabel(ownProps.name)
    return {
        note: getContentByLabel(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    setContent: (id, content) => setNote({label: ownProps.name, id, content}),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditableDiv)