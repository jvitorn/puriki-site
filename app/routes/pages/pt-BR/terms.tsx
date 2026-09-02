import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta, links } = createLocalePageRoute("pt-BR", "terms");

export { handle, meta, links };
export default Component;
