import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta, links } = createLocalePageRoute("pt-BR", "privacy");

export { handle, meta, links };
export default Component;
