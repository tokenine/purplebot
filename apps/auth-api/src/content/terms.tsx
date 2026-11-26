const UPSTREAM_REPOSITORY_URL = "https://github.com/nightly-labs/openbot";

export function Terms() {
  return (
    <>
      <p>
        PurpleBot is a noncommercial fork of OpenBot (<a href={UPSTREAM_REPOSITORY_URL}>{UPSTREAM_REPOSITORY_URL}</a>),
        licensed under the PolyForm Noncommercial License 1.0.0.
      </p>
      <p>
        This account service is operated by the person or organization that deployed it, not by the upstream project.
        There is no warranty, and no support is promised.
      </p>
      <p>
        Use it only for noncommercial purposes, in line with the license, and only for accounts and servers that you are
        allowed to use.
      </p>
      <p>The operator of this instance can set additional rules and can end access.</p>
    </>
  );
}
