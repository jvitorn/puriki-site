import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta } = createLocalePageRoute("es", "home");

export { handle, meta };
export default Component;
