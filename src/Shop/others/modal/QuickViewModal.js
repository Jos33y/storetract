import React from "react";


export default function QuickViewModal({ open, children, onClose }) {
    if (!open) return null;

    return (
        <>
            <div className="Modal-one">
                <div className="Overlay-styles" />

                <div className="Qv-Modal-styles">
                    <div className="Close-button">
                        <button onClick={onClose}  className="btn btn-md btn-primary" ><i className="fas fa-times"></i></button>
                    </div>
                    {children}
                </div>
            </div>

        </>
    );
}
