
import React from 'react'
import {Link} from 'react-router-dom'

const SimpleRender = ({text}) => {
    const components = text.split(/(@\w+)/).map((a: string) =>
        a.startsWith("@") ? (
        // @ts-ignore
        <Link
            contenteditable="false"
            to={"/p/" + a.slice(1)}
            onFocus={e => e.stopPropagation()}
        >
            {a}
        </Link>
        ) : (
        a
        )
    );
    return components;
};

export default SimpleRender