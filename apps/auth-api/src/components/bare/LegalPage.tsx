import type { JSX } from "@solidjs/web";
import { TransactionalPage } from "../transactional/TransactionalPage";

export function LegalPage(props: { titleId: string; title: string; children: JSX.Element }) {
  return (
    <TransactionalPage titleId={props.titleId} layout="form">
      <h1 id={props.titleId}>{props.title}</h1>
      <div class="post-prose">{props.children}</div>
      <p class="join-card-alternatives">
        <a href="/">Home</a>
      </p>
    </TransactionalPage>
  );
}
