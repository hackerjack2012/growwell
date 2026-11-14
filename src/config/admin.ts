/**
 * Staff Admin Portal configuration
 * ------------------------------------------------------------------
 * TO CHANGE THE STAFF PASSCODE:
 *   1. Edit the value of STAFF_PASSCODE below (letters and numbers supported).
 *   2. Save this file and redeploy / rebuild the website.
 *
 * IMPORTANT SECURITY NOTE:
 * This is a front-end gate only. The value below is compiled into the
 * public website files, so anyone who inspects the code could find it.
 * For real protection of patient inquiries, connect a backend login
 * (e.g. Supabase Auth, Firebase Auth, or your own server-side session).
 */
export const STAFF_PASSCODE = '9646';

/** Number of failed attempts allowed before a short cool-down. */
export const MAX_LOGIN_ATTEMPTS = 5;

/** Cool-down duration (in seconds) after too many failed attempts. */
export const LOCKOUT_SECONDS = 60;
