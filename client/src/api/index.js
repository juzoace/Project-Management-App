

// CLIENT ORIGIN
import { CLIENT_ORIGIN } from "../config"

// Auth
export const registerurl = `${CLIENT_ORIGIN}access/register`;
export const loginurl = `${CLIENT_ORIGIN}/access/login`;
export const confirmationTokenurl = `${CLIENT_ORIGIN}/access/tokenConfirm`;
export const resetPasswordurl = `${CLIENT_ORIGIN}/access/resetPassword`;
export const confirmRestTokenurl = `${CLIENT_ORIGIN}/access/confirmResetToken`;
export const PasswordChangeurl = `${CLIENT_ORIGIN}/access/passwordChange`;

// Project
export const fetchProjectsUrl = `${CLIENT_ORIGIN}/project/fetchProjects`;