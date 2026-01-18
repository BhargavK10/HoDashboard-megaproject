import "./Approvals.css";
import { useState } from "react";

/* ---------- main card ---------- */

export default function ApprovalsOverviewCard({
    setActive,
    data,
    loading = false,
    error = null,
}) {

    const [selectedRequest, setSelectedRequest] = useState(null);

    // Temporary mock data (REMOVE when backend is ready)
    const mockApprovals = [
        {
            id: 1,
            applicant: "Prof. A. Sharma",
            subject: "Casual Leave Application",
            body: "I request leave for personal reasons on 12th March.",
            date: "12 Mar",
        },
        {
            id: 2,
            applicant: "Prof. R. Kulkarni",
            subject: "Medical Leave",
            body: "I am suffering from fever and require rest.",
            date: "11 Mar",
        },
    ];

    const approvals = data || mockApprovals;

    if (loading) {
        return (
            <div className="overview-card approvals">
                <h3 className="card-title">Pending Approvals</h3>
                <p className="subtle">Loading requests...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="overview-card approvals error">
                <h3 className="card-title">Pending Approvals</h3>
                <p className="danger">Failed to load approval requests</p>
            </div>
        );
    }

    return (
        <div className="overview-card approvals">
            <h3
                onClick={() => setActive("Approvals")}
                className="card-title clickable"
            >
                Pending Approvals
            </h3>

            <div className="card-body">
                <ul className="card-section approvals-list">
                    {approvals.slice(0, 4).map((req) => (
                        <li
                            key={req.id}
                            className="approval-item clickable"
                            onClick={() => setSelectedRequest(req)}
                        >
                            <div className="approval-main">
                                <span className="approval-name">
                                    {req.applicant}
                                </span>
                                <span className="approval-type">
                                    {req.type}
                                </span>
                            </div>

                            <span className="approval-date">
                                {req.date}
                            </span>
                        </li>
                    ))}
                </ul>

                <p className="subtle">
                    Click a request to review and approve
                </p>
            </div>
            {selectedRequest && (
                <ApprovalModal
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    onApprove={(id) => {
                        console.log("Approved:", id);
                        setSelectedRequest(null);
                    }}
                    onReject={(id) => {
                        console.log("Rejected:", id);
                        setSelectedRequest(null);
                    }}
                />
            )}
        </div>
    );
}



// Approval modal

function ApprovalModal({
    request,
    onClose,
    onApprove,
    onReject,
}) {
    if (!request) return null; // safety

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()} // prevent close on inner click
            >
                {/* Header */}
                <div className="modal-header">
                    <h3>Leave Approval</h3>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <p>
                        <strong>Faculty Name:</strong> {request.applicant}
                    </p>

                    <p>
                        <strong>Subject:</strong> {request.subject}
                    </p>

                    <p className="leave-body">
                        {request.body}
                    </p>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button
                        className="btn reject"
                        onClick={() => onReject(request.id)}
                    >
                        Disapprove
                    </button>

                    <button
                        className="btn approve"
                        onClick={() => onApprove(request.id)}
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}