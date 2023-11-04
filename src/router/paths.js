export const ME = "/me";

export const USERS = "/users";
export const USER = (userId) => `/users/user${userId ? `/${userId}` : ''}`;

export const SHORTCUT = (shortcutId) => `/shortcut${shortcutId ? `/${shortcutId}` : ''}`;

export const SHORTCUT_VIEW = (shortcutId) => `/shortcut${shortcutId ? `/${shortcutId}/details` : ''}`;

export const VERSION = (shortcutId, versionNumber) => `${SHORTCUT(shortcutId)}/versions${versionNumber ? `/${versionNumber}` : ''}`;

export const VERSION_VIEW = (shortcutId, versionNumber) => `${SHORTCUT(shortcutId)}/versions${versionNumber ? `/${versionNumber}/detail` : ''}`;