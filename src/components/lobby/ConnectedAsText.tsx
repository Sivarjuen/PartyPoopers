import { h } from "tsx-dom";
import "../components.scss";

export default function ConnectedAsText(name: string) {
    return (
    <h3 class="h3 is-size-3">
        Connected as: <span class="is-underlined has-text-weight-medium">{name}</span>
    </h3>
    ) as HTMLElement
}