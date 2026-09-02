import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta } = createLocalePageRoute("en", "home");

export { handle, meta };
export default Component;
