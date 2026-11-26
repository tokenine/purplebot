// PurpleBot has no social accounts, so the app does not ask people to follow or to post.
// The conversation context still calls these two functions at the same moments.
export function noteSocialFollowMessageSent(): void {}
export function noteSocialFollowReplyCompleted(): void {}
