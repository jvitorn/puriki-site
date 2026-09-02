import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta } = createLocalePageRoute("pt-BR", "privacy");

export { handle, meta };
export default Component;
