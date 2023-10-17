// Valen Tran
// 9/20/2023

import { useState } from "react";
import logo from "../../media/t2meLogo.png";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validates that new password and confirmation match.
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            setMessage('');
            return;
        }

        // Send request to backend to reset the password
        // Send new Password request to backend

        // Password Reset went through
        setMessage('Password has been reset successfully.');
        setError('');
    };

    return (
        <div>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
        </div>
    );
};

export default ResetPasswordPage;