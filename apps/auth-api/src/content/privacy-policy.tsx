export function PrivacyPolicy() {
  return (
    <>
      <p>
        This PurpleBot account service is self-hosted. The person or organization that deployed it operates it and is
        responsible for it.
      </p>
      <p>
        What this service stores: your email address, your account, one-time sign-in codes (as hashes), teams and
        memberships, and connection tickets. It does not store your chats, files, or agent conversations. Those stay on
        the PurpleBot server that you connect to.
      </p>
      <p>Sign-in codes are sent by email from this deployment's own mail account.</p>
      <p>Analytics and error reports to the upstream project are switched off.</p>
      <p>To ask for a copy or the deletion of your account, contact the operator of this instance.</p>
    </>
  );
}
