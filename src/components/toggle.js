import React from 'react';
import Form from 'react-bootstrap/Form';

// Drop-in replacement for react-toggle's <Toggle>, backed by a BS5 switch.
export default function Toggle({ checked, defaultChecked, onChange, disabled, id, className }) {
    return <Form.Check type="switch" className={className} id={id}
        checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} />;
}
