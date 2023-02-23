import "../components.css";

export const ConnectedAsText = (name: string) => {
    return (
    <h3 class="h3 is-size-3">
        Connected as: <span class="is-underlined has-text-weight-semibold">{name}</span>
    </h3>
    )
}