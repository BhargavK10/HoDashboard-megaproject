import { useEffect, useState, useRef } from "react";
import logo from '../assets/favicon.png';

export default function Topbar({ setActive }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={logo} alt="Logo" height="50px" />
                <h1>Eduara</h1>
            </div>

            <div className="user-menu" ref={menuRef}>
                <div
                    className="profile"
                    onClick={() => setOpen(!open)}
                >
                    H
                </div>

                {open && (
                    <div className="dropdown">
                        <div
                            className="dropdown-item"
                            onClick={() => {
                                setActive("Profile");
                                setOpen(false);
                            }}
                        >
                            My Profile
                        </div>

                        <div
                            className="dropdown-item"
                            onClick={() => {
                                setActive("Settings");
                                setOpen(false);
                            }}
                        >
                            Settings
                        </div>

                        <div className="dropdown-divider"></div>

                        <div
                            className="dropdown-item logout"
                            onClick={() => {
                                alert("logout function");
                                setOpen(false);
                            }}
                        >
                            log out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}