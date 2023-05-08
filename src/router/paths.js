export const ME = "/me";

export const SHORTCUT = (shortcutId) => `/shortcut${shortcutId ? `/${shortcutId}` : ''}`;

export const VERSION = (shortcutId, versionNumber) => `${SHORTCUT(shortcutId)}/versions${versionNumber ? `/${versionNumber}` : ''}`;