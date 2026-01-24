Password Management Flow

1. The "Secure Change" (Authenticated)

   Where: /account page.

   Component: ResetPasswordForm.

   Action: updatePassword.

   Requirement: User must be logged in AND know their current password.

   Purpose: Security. Prevents someone from changing a password just because a user left their laptop unlocked.

2. The "Emergency Recovery" (Unauthenticated)

   Where: /reset-password page (reached via email).

   Component: ResetPasswordConfirmForm.

   Action: confirmPasswordReset.

   Requirement: User must have a valid, unexpired token from their email.

   Purpose: Recovery. Allows access when the current password is forgotten.
