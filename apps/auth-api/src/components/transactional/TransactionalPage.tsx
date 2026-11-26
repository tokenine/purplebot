import type { JSX } from "@solidjs/web";
import { Show } from "solid-js";
import { BareHeader } from "../bare/BareHeader";

export interface TransactionalPageProps {
  titleId: string;
  layout?: "message" | "form";
  class?: string;
  lang?: string;
  bare?: boolean;
  legal?: { privacy: string; terms: string };
  children: JSX.Element;
}

export function TransactionalPage(props: TransactionalPageProps) {
  return (
    <div class="landing-page transactional-page">
      <Show when={!props.bare}>
        <BareHeader />
      </Show>
      <main class="transactional-main" lang={props.lang}>
        <section
          class={props.class ? `join-card transactional-card ${props.class}` : "join-card transactional-card"}
          data-layout={props.layout ?? "message"}
          aria-labelledby={props.titleId}
        >
          {props.children}
        </section>
        <Show when={!props.bare && props.legal}>
          {(legal) => (
            <p class="join-card-alternatives">
              <a href="/privacy">{legal().privacy}</a> · <a href="/terms">{legal().terms}</a>
            </p>
          )}
        </Show>
      </main>
    </div>
  );
}
