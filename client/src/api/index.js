

// CLIENT ORIGIN
import { CLIENT_ORIGIN } from "../config"

// Auth
export const registerurl = `${CLIENT_ORIGIN}/access/register`;
export const loginurl = `${CLIENT_ORIGIN}/access/login`;
export const confirmationTokenurl = `${CLIENT_ORIGIN}/access/tokenConfirm`;
export const resetPasswordurl = `${CLIENT_ORIGIN}/access/resetPassword`;
export const confirmRestTokenurl = `${CLIENT_ORIGIN}/access/confirmResetToken`;
export const PasswordChangeurl = `${CLIENT_ORIGIN}/access/passwordChange`;

// Project
export const fetchProjectsUrl = `${CLIENT_ORIGIN}/project/fetchProjects`;
export const createProjectUrl = `${CLIENT_ORIGIN}/project/createProject`;
export const deleteProjectUrl = `${CLIENT_ORIGIN}/project/deleteProject`;
export const updateProjectUrl = `${CLIENT_ORIGIN}/project/updateProject`