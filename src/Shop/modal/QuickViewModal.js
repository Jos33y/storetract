import React from "react";


export default function QuickViewModal({ open, children, onClose }) {
    if (!open) return null;

    return (
        <>
            <div className="Overlay-styles" />
            <div className="Pr-Modal-styles">
                {children}
                <div className="Close-button">
                    <button onClick={onClose}  className="btn btn-md btn-primary" >
                        Close window
                    </button>
                </div>
            </div>
        </>
    );
}
