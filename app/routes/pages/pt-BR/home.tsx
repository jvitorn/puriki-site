import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta } = createLocalePageRoute("pt-BR", "home");

export { handle, meta };
export default Component;
